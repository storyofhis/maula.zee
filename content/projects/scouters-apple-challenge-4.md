---
title: "Scouters - Apple Challenge 4"
tagline: ""
tags: ["SwiftUI", "Swift"]
year: "2026"
role: "Product Engineer"
timeline: "4 Weeks"
metric: "Develop an app within a week"
challenge: "Urban Living Experience"
status: "Archived"
---

## The Big Idea: Urban Living Experience

Everything started with one big idea: **Urban Living Experience**. We broke it down term by term before deciding what to build around it.

- **Urban** — something related to a city or town.
  - *City*: heavily populated, built-up areas with developed infrastructure.
  - *Town*: district from rural environments.
- **Living** — actively engaging in joy, purpose, and growth.
- **Experience** — personal knowledge and understanding gained through first-hand experience of everyday events.

From this framing, one essential question surfaced.

## Essential Question

> How might we create `livable` experiences for people in the city?

So what does "livable" mean? A condition that is suitable, comfortable, fit, pleasant, sustainable, acceptable, and meets `basic needs`.

Which raised the next question — what are those basic needs? Moving around, public spaces, service & daily needs, community & belonging, safety & comfort, and environment.

That framing became our initial challenge.

## Initial Challenge

> How can we elevate `Safety` & `Comfort` in `Moving Around` in `Public Space`

## Challenge Statement

- How can we create accesibility in public space
- How can we utilize existing access to elevate moving around experience

## Stakeholders

Because this project centers on mobility, we mapped out the people and systems involved:

- **Human** — based on our perspective, people think about comfort and psychological state (e.g. a blind date, an event).
- **Organization** — a group built from individuals to manage and control something (e.g. university, government, workplace).
- **Logistics** — the process of planning, moving, storing, and delivering goods from one place to another efficiently (e.g. JNE, Lalamove).
- **Facility** — a building or place used for a particular purpose (e.g. traffic light, zebra crossing).
- **Transportation** — how people or goods travel from one place to another (e.g. MRT, Transjakarta).

### Mobility

![Mobility](/images/project/AppleChallenge/fourth/mobility.png)

## Refining the Statement

Digging into what "comfort" really meant led us to a second, sharper draft.

### Initial Challenge Statement

> Elevate `safety & Comfort` for mobility in-between public spaces

Comfort, we realized, came down to two things: fast arrival and low cost. That pushed us toward one more refinement.

### Final Challenge Statement

> "Elevate cost-efficiency for moving in-between public spaces"

Two keywords carried this statement:

1. **`cost-efficiency`** — there are three types of cost that are: Money, Health and Time, because we realize that all three is support only. So it must be decrease cost money, increase health and decrease time to spend.
2. **`public spaces`** — what if we choose TOD (Transit Oriented Development) area?

![Finding Gap](/images/project/AppleChallenge/fourth/finding-gap.png)

### Improving safety for children while moving around in public spaces
after we have observed in several places especially in recreation area such as scientia park and taman mini indonesia indah (TMII) 
we have insight about our observation experience : 
- most of places in indonesia are not safety for children so that's why it's very rare indonesian parent giving their child to stay far away freely 

further exploration we realize that 
- how can we assure the parents that their children can move safely between places?


## Persona 
our persona it was busy working mom (mama zizi) "I want to make sure my children are safe, but I have minimal time and presence due to my work
 
### Context
what's my day-to-day like?
- has responsible in her work 
- her child likes to go
- need to make sure her child safe even he is not her side

### Motivation 
what do I want/need?
- Safety for my children
- time for work
- let my child explore but still under my control

why do I want/need it?
- my children's safety is important to me 
- public spaces in indonesia are not trust for security and much not safe
- lack of self awareness in child

### Behaviours and Pains
what do i do to get what I want/need?
- Trust the environment when letting her child (delegating)
- pay more to reassurance
- accompany her child to go

what are my struggles? what am I trying to avoid?
- Afraid their child might get lost or wander off.
- Afraid their child might be harassed or abused.
- Afraid their child might fall in with the wrong crowd.
- Worried that if they have to look after their child, they won't be able to keep up with their work.
- Their child rarely checks in once they're having fun while out and about.

## The Problem

Mama Zizi wants her child to have a childhood that includes Scientia Park and TMII on his own terms — not always trailing an adult. Today that isn't a real option. Indonesian public spaces aren't built with a child's safety in mind: no reliable way to confirm a child arrived, is where he said he'd be, or is safe in the gap between two places. No infrastructure for it, no visibility into it.

So parents like Mama Zizi are left with three costly workarounds, and none of them work:

- **Escort the child in person** — safe, but it costs the time she needs for work.
- **Pay for extra supervision** — a driver, a helper — safe, but it costs money she'd rather not spend.
- **Keep the child close** — cheap and easy, but it costs the child the independence and exploration he wants.

Every option trades away something she can't afford to lose. She isn't choosing between "safe" and "independent" for her child — she's choosing between her job and his safety, because the public spaces around her offer no third way.

That's the gap `Scouters` set out to close: let children move independently between public spaces, without asking a parent to give up safety, time, or money to allow it.

## Value Proposition Statement
For parents who need reassurance of their children safety while roaming around recreation area, Our app offers to provide more personalized way for quick information & communication in closed-loop (community-parents, parents-parents, children-parents, recreation area-parents.)

## Value Proposition Canvas

Mapping how Scouters relieves Mama Zizi's pains and creates gains, against what the product actually delivers.

<div class="vpc-columns">
  <div class="vpc-col">
    <p class="vpc-col-label">Value Map — Scouters</p>
    <div class="vpc-card vpc-card--neutral">
      <h4>Products &amp; Services</h4>
      <ul>
        <li>Real-time parent-child location sharing</li>
        <li>Safe-zone (geofence) setup per recreation area</li>
        <li>One-tap check-in from the child's device</li>
        <li>Closed-loop alerts across community, parents, and recreation-area staff</li>
      </ul>
    </div>
    <div class="vpc-card vpc-card--gain">
      <h4>Gain Creators</h4>
      <ul>
        <li>Live status replaces constant phone calls</li>
        <li>Child can roam freely within a boundary the parent set</li>
        <li>Trusted community members can flag something off before it becomes a problem</li>
        <li>Parent stays focused on work instead of worrying</li>
      </ul>
    </div>
    <div class="vpc-card vpc-card--pain">
      <h4>Pain Relievers</h4>
      <ul>
        <li>Removes the need to personally escort or pay for extra supervision</li>
        <li>Automatic check-in nudges, so the child doesn't have to remember</li>
        <li>Immediate alert if the child leaves the safe zone or goes quiet</li>
        <li>Direct line to nearby trusted parents and recreation-area staff, not just after the fact</li>
      </ul>
    </div>
  </div>
  <div class="vpc-col">
    <p class="vpc-col-label">Customer Profile — Mama Zizi</p>
    <div class="vpc-card vpc-card--gain">
      <h4>Gains</h4>
      <ul>
        <li>Peace of mind without needing to be physically present</li>
        <li>Keeps her income and career on track</li>
        <li>Child gets real independence, inside a boundary she trusts</li>
        <li>One less thing competing for her limited time</li>
      </ul>
    </div>
    <div class="vpc-card vpc-card--neutral">
      <h4>Customer Job(s)</h4>
      <ul>
        <li>Know her child is safe while she's at work</li>
        <li>Let her child explore public spaces on his own</li>
        <li>Reach someone trustworthy fast if something feels wrong</li>
      </ul>
    </div>
    <div class="vpc-card vpc-card--pain">
      <h4>Pains</h4>
      <ul>
        <li>Afraid their child might get lost or wander off</li>
        <li>Afraid their child might be harassed or abused</li>
        <li>Afraid their child might fall in with the wrong crowd</li>
        <li>Worried that if she has to look after her child, she won't keep up with work</li>
        <li>Her child rarely checks in once he's having fun while out and about</li>
      </ul>
    </div>
  </div>
</div>

