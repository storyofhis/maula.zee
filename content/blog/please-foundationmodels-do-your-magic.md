---
title: "Please Foundation Models, Do Your Magic"
description: "A practical guide to Apple's on-device Foundation Models framework — from your first LanguageModelSession to structured outputs with @Generable."
date: "April 27, 2026"
readTime: "6 min read"
tags: ["iOS", "Swift", "AI", "Foundation Models", "Apple"]
---

Apple's on-device AI story just became something worth paying attention to. Foundation Models isn't another cloud wrapper — it runs locally, respects privacy by default, and exposes a Swift API that feels like it belongs in UIKit. This is what it looks like to actually build with it.

---

**TL;DR** — If you're short on time:
- Foundation Models runs on-device via Apple Silicon, with Private Cloud Compute as a fallback for heavier tasks
- `LanguageModelSession` is your main interface — stateful, context-aware, async
- `@Generable` and `@Guide` let you turn model output into typed Swift structs instead of raw strings

---

## What Foundation Models actually are

Foundation Models are large-scale AI systems trained on broad datasets to understand and generate language. Apple's implementation works through two layers: most inference happens on-device, leveraging the Neural Engine; for tasks that exceed on-device capacity, it escalates to Private Cloud Compute — Apple's server-side infrastructure that extends the privacy guarantees of your device to the cloud.

Three things make this interesting from a developer's perspective:

1. **Privacy by default.** Your users' prompts don't leave their device for common tasks. No API keys, no data retention policy to explain in your privacy nutrition label.
2. **A high-level Swift API.** You're not writing tensor ops or managing tokenizers. The framework handles session state, context windows, and safety filtering.
3. **System integration.** The same model backing Siri and Writing Tools is available to your app — same weights, same guardrails, same latency characteristics.

Before you write a single line, always check availability:

```swift
// Always gate on availability — not all devices support Foundation Models
guard case .available = SystemLanguageModel.default.availability else {
    // Fall back gracefully — older devices or unsupported configurations
    return
}
```

Skipping this check will crash on devices that don't meet the hardware requirements.

---

## Your first session

`LanguageModelSession` is stateful — it remembers the conversation. You initialize it with `instructions` (the system prompt that shapes behavior across all turns) and then call `respond(to:)` for each user message.

```swift
// CoffeeAdvisor.swift — a simple single-turn recommendation session
import FoundationModels

let session = LanguageModelSession(
    instructions: "You are a specialty coffee expert. Give concise, opinionated recommendations based on the user's taste preferences."
)

let response = try await session.respond(
    to: "I like bright, fruity coffees with low bitterness. What should I try?"
)

print(response.content)
// → "Try a washed Ethiopian — Yirgacheffe specifically. Look for light roast. 
//    You'll get jasmine, blueberry, and almost no bitterness."
```

The session maintains context across calls, so subsequent prompts can reference earlier exchanges without you managing a message history manually.

---

## Tuning output behavior

`GenerationOptions` gives you control over how the model samples. The two parameters you'll reach for most:

**Temperature** ranges from `0.1` to `2.0`. Low values produce deterministic, consistent output — right for structured data or factual answers. High values introduce variety — right for brainstorming or creative generation.

**Sampling strategy** makes this concrete:
- `.greedy` — always picks the highest-probability token. Zero randomness, maximum consistency.
- `.random(temperature:)` — samples from the probability distribution at the given temperature.

```swift
// Consistent extraction — greedy sampling for structured tasks
let extractionOptions = GenerationOptions(
    sampling: .greedy,
    maximumResponseTokens: 200
)

// Creative suggestion — random sampling with elevated temperature
let creativeOptions = GenerationOptions(
    sampling: .random(temperature: 1.3),
    maximumResponseTokens: 500
)

let response = try await session.respond(
    to: prompt,
    options: creativeOptions
)
```

The tradeoff is real: high temperature gives you variety, but it also gives you hallucinations. For anything user-facing that claims to be factual, stay below `0.7`.

---

## Specialized model variants

The default model is general-purpose, but Foundation Models exposes task-specific variants through `SystemLanguageModel`:

```swift
// Use the content tagging variant for classification tasks
let tagger = LanguageModelSession(
    model: SystemLanguageModel(useCase: .contentTagging),
    instructions: "Extract topic tags from article text. Return only the tags, comma-separated."
)
```

`.contentTagging` is optimized for extraction and classification — lower latency than the general model for these tasks, and less prone to generating prose when you only want labels.

---

## Guardrails

Foundation Models ships with a content safety layer that filters harmful outputs before they reach your app. You can configure guardrail behavior through the session:

```swift
let safeSession = LanguageModelSession(
    instructions: "You are a customer support agent for a children's educational app.",
    guardrails: .default  // Strict filtering — appropriate for minors
)
```

The guardrails aren't a checkbox — they actively shape what the model will generate. For consumer-facing features, this is the right default. For developer tools or admin surfaces where you've authenticated the user, you might relax them. Know the tradeoff before you disable anything.

---

## Structured output with `@Generable`

Raw strings are the wrong return type for most app features. If you're asking the model to extract data, you want a typed struct — not a string you have to parse.

`@Generable` makes the model's output conform to your type. `@Guide` adds a natural-language constraint on each property, steering generation toward valid values.

```swift
// CoffeeRecommendation.swift — structured output from the model
import FoundationModels

@Generable
struct CoffeeRecommendation {
    @Guide("The specific coffee name and origin, e.g. 'Yirgacheffe, Ethiopia'")
    var name: String

    @Guide("Tasting notes as a short phrase, e.g. 'blueberry, jasmine, citrus'")
    var tastingNotes: String

    @Guide("Recommended roast level: light, medium, or dark")
    var roastLevel: String

    @Guide("Why this matches the user's stated preferences, in one sentence")
    var rationale: String
}

// Usage — the model returns a CoffeeRecommendation, not a String
let session = LanguageModelSession(
    instructions: "You are a specialty coffee expert."
)

let recommendation: CoffeeRecommendation = try await session.respond(
    to: "I want something fruity and low bitterness",
    generating: CoffeeRecommendation.self
)

print(recommendation.name)         // "Yirgacheffe, Ethiopia"
print(recommendation.tastingNotes) // "blueberry, jasmine, citrus"
```

This is where Foundation Models earns its place in production code. You're not doing string parsing or JSON decoding — you're working with a typed model your compiler can verify.

The `@Guide` annotations aren't just documentation. They're part of the prompt — the framework passes them to the model as constraints during generation. More specific guides produce more reliable outputs.

---

## What I'd keep in mind going forward

Foundation Models is still a 1.0 API on a 1.0 deployment — the on-device model is capable but not unlimited, and availability is gated by hardware generation. Build with graceful degradation from the start, not as an afterthought.

The `@Generable` pattern is the most production-ready part of the framework. Start there, with constrained structured types, before reaching for open-ended text generation. Constrained output is easier to test, easier to validate, and much harder to break unexpectedly.

The privacy story is genuinely differentiating. If your app handles sensitive data — health, finance, personal communications — the on-device guarantee is worth architecting around. It's not just a marketing bullet; it changes what features you can responsibly build.

What I'm most curious about is how the model evolves across OS versions without developer intervention. If the weights update silently, does your `@Generable` output stay stable? Apple hasn't said much about this yet, and it seems like the question worth asking before you ship anything critical.

---

*Originally published on [Medium](https://medium.com/@dedeolaaa/please-foundationmodels-do-your-magic-62e25a6e6468).*
