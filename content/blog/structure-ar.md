---
title: "The Cache That Was Never Used: Fixing an AR App That Overheated Phones"
date: "2026-08-17"
tags: ["engineering"]
description: "A sonar visualization was cloning over 100 entities a second. The fix wasn't a caching bug — it was the wrong architecture for something that fires every frame."
readTime: "7 min read"
---

# The Cache That Was Never Used: Fixing an AR App That Overheated Phones

Some performance bugs hide behind a stack trace. This one hid behind a cache that looked correct, was never actually wrong, and was simply never on the path that needed it.

---

**TL;DR** — If you're in a hurry:
- `Entity.clone(recursive:)` on every frame-rate event is the kind of bug that doesn't show up in a code review — it shows up as a hot phone
- A cache that exists but isn't consulted on the hot path is functionally the same as no cache at all
- RealityKit's native ECS (`Component` + `System`) isn't just organization — a pre-allocated entity pool driven by a `System` is what actually removes the clone from the per-frame path

---

## The problem I kept ignoring

SonAR — the AR app I've been writing about, a robotics teaching tool that visualizes an ultrasonic sensor's wave as it travels, hits a surface, and echoes back — worked. It also made test devices noticeably warm within a couple of minutes of a sensor being placed. I'd assumed the wave visualization was expensive because AR rendering is expensive, and left it there for longer than I should have.

The actual cause was two lines, and they'd been sitting in plain sight: `WaveRenderer.getArrowTemplate` / `getDecalTemplate` called `cached.clone(recursive: true)` — on every single invocation, not just the first. `Wave.startLoop` fires once a second, and each firing spawns a ring of directions — up to 57 of them — each direction potentially producing an outbound pulse plus an echo or reflection pulse. That's upward of 100 full recursive entity clones, scene insertions, animations, and `asyncAfter` teardowns, every second, for as long as a sensor stayed placed.

## The turn

The word "cache" in `getArrowTemplate` was doing a lot of unearned work. There was a cached template entity sitting there the whole time — but the function's job, as written, was to clone that template and hand back a fresh instance every time it was called. The cache wasn't broken; it was just never the thing standing between a request and a clone. Fixing this by "using the cache correctly" wasn't actually possible within that shape of code, because the shape of the code was: *one entity per pulse, discarded after use*. Any fix that kept that shape would still be creating and destroying entities on a per-pulse basis — the clone was a symptom, not the disease.

The real fix meant asking a different question: instead of *how do I avoid re-cloning this template*, it became *why does a pulse need a new entity at all*? A pulse is a short-lived visual — travel from A to B, then disappear. Nothing about that requires a fresh `Entity` each time. It requires a fixed number of entities that get reused, positioned, and made visible or invisible on a schedule. That reframing is what RealityKit's Entity-Component-System model is actually for.

## The pattern: pre-allocate, don't clone

The rewrite splits into three pieces, and the split itself is the point — each piece has exactly one job.

**A pool, built once.** `WavePool` pre-creates a fixed number of arrow entities and decal entities at setup — not per pulse, not per placement, once, when the `ARView` is configured.

```swift
// Sources/ECS/WavePool.swift — built once, reused forever
private init(arrowCount: Int = 96, decalCount: Int = 48) {
    let shaftMesh = MeshResource.generateCylinder(height: pulseRadius * 7.5, radius: pulseRadius * 0.65)
    let tipMesh = MeshResource.generateCone(height: pulseRadius * 6.0, radius: pulseRadius * 1.0)
    for _ in 0..<arrowCount {
        let slot = Self.makeArrowSlot(shaftMesh: shaftMesh, tipMesh: tipMesh, material: arrowMaterials[.outbound]!, pulseRadius: pulseRadius)
        slot.container.isEnabled = false
        arrowSlots.append(slot)
        arrowFree.append(arrowSlots.count - 1)
    }
    // decalEntities built the same way, disabled and parked
}
```

96 arrows, 48 decals — sized for a worst-case simultaneous burst across outbound, echo, and reflection pulses. `activateArrow` and `activateDecal` pull a free index, reposition and re-enable that *same* entity, and attach a `WavePulseComponent` describing where it's going and for how long. No `Entity(...)` call, no `.clone()`, anywhere on this path.

**A component, holding only data.** `WavePulseComponent` doesn't do anything by itself — it's a struct RealityKit's `Component` protocol lets you attach to an entity as pure state:

```swift
// Sources/ECS/Components/WavePulseComponent.swift
struct WavePulseComponent: Component {
    var startTime: TimeInterval
    var duration: TimeInterval
    var startPosition: SIMD3<Float>
    var endPosition: SIMD3<Float>
    var poolIndex: Int
    var poolKind: WavePool.Kind
}
```

**A system, running every frame.** This is the piece that actually replaces the discard-and-reclone cycle. `PulseMotionSystem` queries every entity carrying a `WavePulseComponent`, interpolates its position, and — critically — releases the slot back to the pool instead of destroying the entity, the moment a pulse finishes:

```swift
// Sources/ECS/Systems/PulseMotionSystem.swift
struct PulseMotionSystem: System {
    private static let query = EntityQuery(where: .has(WavePulseComponent.self))

    func update(context: SceneUpdateContext) {
        let now = CACurrentMediaTime()
        for entity in context.entities(matching: Self.query, updatingSystemWhen: .rendering) {
            guard let pulse = entity.components[WavePulseComponent.self] else { continue }
            let elapsed = now - pulse.startTime

            if elapsed >= pulse.duration {
                WavePool.shared.release(kind: pulse.poolKind, index: pulse.poolIndex)
                continue
            }

            let t = SIMD3<Float>(repeating: Float(elapsed / pulse.duration))
            entity.position = simd_mix(pulse.startPosition, pulse.endPosition, t)
        }
    }
}
```

`release` disables the entity, strips the component, and returns its index to the free list — ready for the next `activateArrow` call to claim, with zero allocation. The scheduling logic that decides *when* to fire a pulse (`Wave.startLoop`, still a plain `async Task` on a 1-second cadence, computing a ring of raycast directions from the sensor's orientation) didn't need to become part of the ECS at all — only the entity lifecycle did. That was a deliberate scoping call, not an oversight: ARKit raycasting is inherently async, and forcing an async operation into a synchronous per-frame `System.update` would have fought the engine instead of using it.

## What happens when the pool runs out

A fixed-size pool needs an answer for "what if more pulses are requested than slots exist," and the honest answer here is a ceiling, not a guarantee:

```swift
// Sources/ECS/WavePool.swift
private func takeIndex(free: inout [Int], activeOrder: inout [Int]) -> Int {
    if let index = free.popLast() {
        activeOrder.append(index)
        return index
    }
    // Fixed pool size — steal the oldest active slot instead of growing the pool.
    let stolen = activeOrder.removeFirst()
    activeOrder.append(stolen)
    return stolen
}
```

If all 96 arrow slots are active and a 97th is requested, the oldest active pulse gets reassigned mid-flight rather than the pool silently growing (which would reopen the exact allocation churn this rewrite exists to close). It's covered directly in `WavePoolTests`:

```swift
// Tests/WavePoolTests.swift
func testActivateArrowStealsOldestInsteadOfGrowingPool() {
    let anchor = AnchorEntity()
    WavePool.shared.attachToScene(anchor)

    for _ in 0..<200 {
        WavePool.shared.activateArrow(kind: .outbound, from: .zero, to: [0, 0, -1], duration: 10)
    }

    let activeArrows = anchor.children.filter { $0.isEnabled && $0.components[WavePulseComponent.self]?.poolKind == .arrow }
    XCTAssertEqual(activeArrows.count, 96)
}
```

200 requests, 96 active at the end, every time — the pool's size is a real constraint the test enforces, not an assumption.

## The tradeoff nobody should skip past

This rewrite explicitly did *not* try to port everything at once. Material detection, the guided walkthrough, robot feedback — all deferred, with `.hard` (reflective) behavior hardcoded into the wave logic for this phase instead of wiring up the real `MaterialCategory` system. That's a real regression in functionality, shipped on purpose: the goal of this pass was proving the ECS structure and the pooling fix in isolation, on a scope small enough that an Instruments comparison (Time Profiler + Energy Log, original SonAR against [refactor-ECS](https://github.com/storyofhis/refactor-ECS), sensor placed for an equivalent duration) would tell me unambiguously whether the fix worked — not whether the fix worked *and* five other features still behaved correctly at the same time. Proving the architecture and re-adding scope are two different kinds of work, and doing them in the same pass would have made a regression in either one much harder to attribute.

The other honest tradeoff is the sensor entity itself — the root `.usdz` (with its `_0` transmitter and `_1` receiver children) still gets cloned once per placement. That clone was explicitly left alone. It happens once, when a student places the sensor, not once a second for as long as it stays placed — the fix targets the *hot path*, not every `.clone()` call in the codebase. Not every clone is the same bug.

---

The version of this fix that would've felt fastest to ship — "just don't clone in `getArrowTemplate` when the cache is warm" — wouldn't have worked, because the function's contract was already "return a fresh entity." The real fix required changing what the function's job was, not patching how it did that job. That's usually the tell that a bug is architectural rather than a caching oversight: the fix that would satisfy the existing contract keeps failing, and the fix that actually works changes the contract.