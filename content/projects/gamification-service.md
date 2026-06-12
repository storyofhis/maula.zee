---
title: "Gamification Service"
tagline: "An API service powering points, streaks, and achievement unlocks for Lingotalk's language-learning platform — built to handle bursty engagement spikes without dropping a single event."
tags: ["Node.js", "TypeScript", "FaunaDB", "Docker"]
year: "2022"
role: "Backend Engineer"
timeline: "3 months"
metric: "Streak retention up 34% in the first cohort after launch"
status: "Archived"
---

## The Problem

Language learning has a retention problem. The research is consistent: most learners quit within the first 30 days. Not because the content is bad, but because the feedback loop is too slow. Progress in a language is measured in months; a learner needs feedback in minutes.

Lingotalk's product team had a hypothesis: if learners could see their progress accumulate — points earned, streaks maintained, achievements unlocked — daily engagement would improve. The feature had been on the roadmap for two quarters. The blocker wasn't product conviction; it was the engineering complexity of building a points and state system that could handle spikes without corrupting streaks or double-awarding achievements.

The specific user this was designed for: **Reza**, a 24-year-old Jakarta professional who opens the app during his commute. He has 7 minutes. He wants to feel like he made progress before he closes the app. A streak counter and a daily points badge give him that in the first 30 seconds.

## Constraints

- **Bursty traffic:** Lesson completions cluster around commute hours — 7–9am and 5–7pm. The service needed to absorb 10× normal load twice a day without queueing visible to users.
- **FaunaDB as the primary store:** The existing infrastructure used FaunaDB, and the gamification service was expected to integrate with it. Its transaction model and serverless nature shaped every design decision.
- **No dedicated infrastructure team:** The service had to be self-contained, Dockerized, and deployable by the two-person backend team with no DevOps support.
- **Streak integrity:** A streak is a social contract. If the service incorrectly resets a streak due to a bug or race condition, users notice — and they churn.

## Approach

### 1. Event-sourced state for streaks

Streaks are deceptively hard to get right. A streak is not a counter — it's a derived property of a sequence of timestamped events. Storing just the current streak number means you can never answer "did this user complete a lesson yesterday, or did we just fail to reset the counter?"

The service stored raw completion events, and streak state was derived at read time from the event log. This made bugs auditable: given a user's event history, you could always reproduce their current streak exactly.

### 2. Idempotent achievement unlocking

Achievement events are the most user-visible part of the system. An achievement unlocked twice is jarring; an achievement that silently fails to unlock is a broken promise.

Each achievement unlock was keyed on `(userId, achievementId)` with a FaunaDB unique index. The unlock mutation was written as an upsert — if the document already existed, the write was a no-op. This made the endpoint safe to call multiple times from the client without risk of duplication.

### 3. Points as an append-only ledger

Rather than updating a running total in place, each point award wrote a new ledger entry with a source tag (lesson completion, streak bonus, achievement). The user's point balance was the sum of the ledger.

Append-only design meant the audit trail was free. When a user disputed their point count (it happened), the support team could reconstruct the full history without touching production data.

## The Turn

Halfway through development, load testing revealed a race condition in streak calculation. Two rapid lesson completions — both within the same 60-second window — could create two streak-increment events for the same day, incrementing the streak twice.

The fix I initially reached for was a distributed lock. But FaunaDB's transaction model gave us a cleaner answer: **make the day boundary the natural idempotency key**. The streak increment mutation checked for an existing event on the same calendar day before writing. If one existed, the mutation aborted. No lock, no coordination overhead.

The insight: **the data model can absorb correctness guarantees that you'd otherwise have to enforce in application logic.** When the schema itself makes a bad state unrepresentable, you don't need to defend against it at runtime.

## Result

| Metric | Before launch | 30 days post-launch |
|--------|--------------|---------------------|
| Day-7 retention | 41% | 55% |
| Daily active users (lesson completions) | baseline | +28% |
| Streak-related support tickets | N/A | 0 in first month |
| Avg. lessons per session | 2.1 | 3.4 |

## What I'd Do Differently

I'd use a proper event queue (even a simple Redis stream) for the points ledger rather than synchronous FaunaDB writes during the lesson completion request. Under peak load, the write latency was occasionally visible to users — the points badge would update half a second after the lesson completion animation ended. It's a small thing, but the timing of the reward matters as much as the reward itself.

The gamification literature is clear on this: **feedback delayed is feedback denied**. If I was building this today, the lesson completion API would return immediately, and the points/streak/achievement updates would process asynchronously from a queue.
