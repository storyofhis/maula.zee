---
title: "Presently"
tagline: "A reminder app that nudges you through daily activities in a voice you actually want to hear."
tags: ["SwiftUI", "Swift", "Apple Foundation Model"]
year: "2026"
role: "Product Engineer"
timeline: "4 Weeks"
# metric: "Develop an app within a week"
# status: "Archived"
---

## Design — final screens from the Figma file, covering the 3-step onboarding

Pick activities, set a schedule, then choose how each reminder should sound.

<div class="design-grid">
  <img src="/images/project/AppleChallenge/first/design/pick-activities.png" alt="Pick activities to be reminded of" />
  <img src="/images/project/AppleChallenge/first/design/set-schedule.png" alt="Set schedule per activity" />
  <img src="/images/project/AppleChallenge/first/design/notification-style.png" alt="Choose notification tone per activity" />
</div>

## App Flow — one decision per screen, from activity list to notification tone

```mermaid
flowchart LR
    Pick["1. Pick Activities\nEating · Sleeping · Water\nTasks · Custom"] --> Schedule["2. Set Schedule\nTime · Repeat · Days"]
    Schedule --> Tone["3. Notification Style\nNeutral · Humor · Manis"]
    Tone --> Live["Reminders go live"]
```

**Pick activities** — daily things to be reminded about, or a custom one. **Set schedule** — one or more times per activity, repeat daily or on specific days. **Notification style** — each activity gets its own tone, and the reminder copy is generated to match (e.g. *"Hai sayang, waktunya makan ya! Tubuhmu butuh energi hari ini 🥰"* for Manis).

## Tech — on-device Foundation Model generates the reminder copy per tone

```mermaid
flowchart LR
    Input["Activity + Tone\ne.g. Drink Water, Manis"] --> FM["Apple Foundation Model\n(on-device, no network call)"]
    FM --> Copy["Generated copy\nreads like a different\nvoice per tone"]
    Copy -->|Doesn't land| Regen["Regenerate"] --> FM
    Copy -->|Good| Sent["Notification Sent"]
```

Copy isn't a static template swapping a word or two — it's generated per activity and tone, so "Manis" and "Humor" genuinely read like different voices. Running it on-device means no round-trip and no user data leaving the phone for something as small as a reminder string.
