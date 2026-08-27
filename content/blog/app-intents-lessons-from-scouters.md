---
title: "Three Intents, Three Surfaces: What Scouters Taught Me About App Intents"
description: "Siri, the Shortcuts app, and a Live Activity's own buttons all run App Intents — but they're not interchangeable. What each one is actually for, and the bugs that showed up when I treated them as the same thing."
date: "2026-08-27"
tags: ["engineering"]
readTime: "7 min read"
project: "scouters-apple-challenge-4"
---

# Three Intents, Three Surfaces: What Scouters Taught Me About App Intents

App Intents looks like one framework with one job: let something outside your UI trigger code inside your app. Build Scouters' Nudge and Live Activity alarm and it stops looking like one job. Three different surfaces call into intents, and each one hands you different guarantees — or takes some away.

---

**TL;DR** — If you're short on time:
- App Intents exists because a parent mid-errand shouldn't have to open the app to nudge their kid — the use case is "act without launching," not "a Siri version of a button"
- `AppIntent` (Siri/Shortcuts), `LiveActivityIntent` (Dynamic Island buttons), and a plain in-app action are three different contracts, not one intent wearing three hats
- Which intent runs isn't decided at runtime by the system guessing — it's wired statically, per surface, at configuration time
- The real bugs weren't in the intent logic; they were in what a headless intent *can't* assume: no live view model, no reliable ID threading, no synchronous authorization

---

## Why an app needs intents at all

The naive version of Nudge is a button in `ParentView` that calls `NudgeSignalService().sendNudge(to: childId)`. That's fine until the actual use case is "Mama Zizi wants to check in from her lock screen without unlocking her phone, finding the app, and finding the button." The app being open was never a real requirement of the feature — it was just the default cost of not having thought about it yet.

That's what App Intents buys you: the same action, callable from Siri, the Shortcuts app, or a widget, without the app needing to be running. `openAppWhenRun = false` is the line that makes the promise real:

```swift
// SendNudgeIntent.swift — runs without the app in the foreground
struct SendNudgeIntent: AppIntent {
    static var title: LocalizedStringResource = "Nudge My Child"
    static var openAppWhenRun: Bool = false

    func perform() async throws -> some IntentResult & ProvidesDialog {
        guard let childId = await AppContainer.pairedChildId else {
            throw NotPairedError()
        }
        await NudgeSignalService().sendNudge(to: childId)
        return .result(dialog: "Nudge sent.")
    }
}
```

If the only goal were "give Siri a button to press," `openAppWhenRun = true` plus a deep link would've been less code. The reason it's `false` is the actual use case: this has to work at 9pm with the phone locked, one hand free, no time to unlock and navigate.

## Three surfaces, three contracts — not one intent, three costumes

Scouters ended up with intents on three different surfaces, and it's tempting to think of them as the same mechanism triggered from different places. They're not — each protocol makes a different promise about what's available when `perform()` runs.

| Surface | Protocol | What's guaranteed | What isn't |
|---|---|---|---|
| Siri / Shortcuts app | `AppIntent` | Runs async, anywhere, any time | No live view model, no guaranteed foreground app |
| Live Activity / Dynamic Island button | `LiveActivityIntent` | Fires from the widget extension process | Runs outside the main app target entirely |
| In-app button | Plain method call | Live `@Observable` view model, full app state | Nothing — this is the easy case |

The Live Activity intents are the strictest of the three:

```swift
// NudgeAlarmIntents.swift — wired to the alarm's own buttons
struct CheckInSafeIntent: LiveActivityIntent {
    static var title: LocalizedStringResource = "I am safe"

    @Parameter(title: "Alarm ID")
    var alarmIDString: String

    func perform() async throws -> some IntentResult {
        await NudgeSignalService().respond(childId: sessionIDString, safe: true)
        for alarm in (try? AlarmManager.shared.alarms) ?? [] {
            try? await AlarmManager.shared.stop(id: alarm.id)
        }
        return .result()
    }
}
```

`LiveActivityIntent` isn't `AppIntent` with an annotation — it runs from the widget extension's process, which means the widget extension needs its own target membership for this file *and* every service it touches. The first time I ran this, the button did nothing. Not a crash, not a log — nothing, because `NudgeSignalService.swift` was only checked into the main app target. Xcode compiled the file into the wrong binary silently.

## How iOS decides which intent runs

This is the part that isn't obvious from the docs: nothing at runtime is "deciding" between intents that could plausibly both apply. The dispatch is static, declared once, at the point where you configure the surface — not resolved dynamically when the user acts.

For the alarm, the wiring happens right where the alarm itself is scheduled:

```swift
// ChildAlarmManager.swift — which intent fires is decided here, not at tap-time
let configuration = NudgeConfiguration.alarm(
    schedule: .fixed(Date().addingTimeInterval(1)),
    attributes: attributes,
    stopIntent: CheckInSafeIntent(alarmID: alarmID, sessionID: sessionID),
    secondaryIntent: RequestAssistanceIntent(alarmID: alarmID, sessionID: sessionID),
    sound: .default
)
```

`stopIntent` and `secondaryIntent` look like two peers competing for the same tap — they're not. Each is bound to a specific button slot on `AlarmPresentation.Alert` before the alarm ever fires. The system doesn't inspect intent, dialog text, or user history to pick one; the button the user physically pressed already determined which struct's `perform()` runs, fixed at schedule time.

Siri works the same way, one layer up — `ScoutersShortcuts` declares the phrase-to-intent mapping in advance:

```swift
// ScoutersShortcuts.swift — phrase → intent, decided at registration, not at recognition
AppShortcut(
    intent: SendNudgeIntent(),
    phrases: [
        "Nudge my child with \(.applicationName)",
        "Send a check-in with \(.applicationName)"
    ],
    shortTitle: "Nudge Child",
    systemImageName: "bell.badge"
)
```

Siri's NLU resolves *which phrase* was said — that's the only ambiguity the system actually handles for you. Once a phrase matches, the intent it's registered against is fixed; there's no separate "and now decide which intent handles it" step to reason about. Two intents that could both plausibly apply to a vague phrase aren't disambiguated by the framework — they're prevented from that situation existing at all, by giving each intent phrases distinct enough not to collide.

## What broke, and why it wasn't the intent code

**Alarm ID threading is a lie for buttons that live outside your view hierarchy.** `CheckInSafeIntent` takes an `alarmIDString` parameter so it can, in theory, stop *that specific alarm*. In practice, the Dynamic Island's custom secondary button doesn't reliably carry the real alarm ID through to `perform()`. The honest fix wasn't to chase that plumbing bug — it was to notice Scouters never has more than one nudge alarm active at once, so both intents just stop every currently active alarm:

```swift
for alarm in (try? AlarmManager.shared.alarms) ?? [] {
    try? await AlarmManager.shared.stop(id: alarm.id)
}
```

That's a real corner cut, not an oversight — it only holds because of a one-active-alarm invariant elsewhere in the app. The moment that invariant changes, this needs the real ID threaded through.

**Read from a stable store, never from the view layer.** `SendNudgeIntent` reads `AppContainer.pairedChildId`, not `ParentViewModel.pairedChildId`. A `LiveActivityIntent` or a Siri-triggered `AppIntent` can run with zero view hierarchy alive — there is no view model to read from. Any state an intent needs has to live somewhere that survives the app not running, which is the actual design constraint App Intents imposes and the one most tutorials skip past.

**A synchronous API will look async until it bites you.** `AlarmManager.shared.authorizationState` reads like it should be `await`-ed alongside `requestAuthorization()` next to it — it isn't. Assuming it was async cost a debugging session before the fix was just removing the `await` that shouldn't have been there.

**"Respond once" has to mean once, from any surface.** The first version of `RequestAssistanceIntent` deliberately left the alarm ringing after "I need assistance" was tapped, on the theory that assistance requests shouldn't silence the alert. That produced the opposite of the intended behavior: the alarm played again after the parent had already been notified. The fix was to stop the alarm on *every* response path, safe or not-safe — one response, from any surface, has to fully resolve the nudge, or the two intents disagree with each other about what "handled" means.

## Best practices, distilled

- **Design for "no app running," not "Siri version of my button."** If an intent's `perform()` assumes a live view model, it'll work in Xcode previews and fail the first time it actually runs headless.
- **`AppEntity` + `EntityQuery` over raw strings, once a parameter needs a picker.** `MeetingPointEntity` gives Siri and Shortcuts the same named-location list the map uses, instead of asking the user to type a location by hand.
- **Only write what the async listener needs.** `SendMeetingPointIntent` writes the Firestore fields `ChildViewModel` listens for and stops there — it doesn't try to replicate the in-app map's pin-drawing or route-decoration, because those need a live view to render into and the intent has none.
- **Widget-extension intents need their own target membership, every time.** This one won't show up as a compile error — it shows up as a button that silently does nothing.
- **Treat "resolved" as a cross-surface guarantee, not a per-button one.** If two intents can both close out the same piece of state, make sure both actually do — a state a user can leave half-resolved from one surface but not another is a bug waiting for the surface you didn't test.

---

None of this required more code than the naive in-app button — `SendNudgeIntent` is nineteen lines. What it required was accepting, before writing any of it, that "runs without the app open" isn't a deployment detail. It's a different set of guarantees, and the bugs above were all cases of borrowing an assumption from the surface that has a view model and carrying it somewhere that doesn't.
