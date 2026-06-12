---
title: "zee.dev"
tagline: "A portfolio that reads like a product — designed to earn attention from engineering teams who've seen every generic GitHub page."
tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"]
year: "2026"
role: "Solo Engineer & Designer"
timeline: "4 weeks"
metric: "Built and shipped from zero in one month"
status: "Live"
github: "https://github.com/storyofhis/portfolio"
url: "#"
---

## The Problem

Most engineering portfolios are a list. A grid of GitHub repos. A table of job titles. They answer "what did you build?" but never "why does that matter?"

The hiring engineer at a FAANG company opens your portfolio while reviewing a stack of 80 candidates. They spend 15 seconds deciding whether to keep scrolling. A generic Next.js template with three repos and a headshot isn't a neutral signal — it's a negative one. It signals that you build things without thinking about who uses them.

I wanted to build something that felt like a product: one that engineers could open and immediately understand not just *what* I'd built, but *how I think*.

## Constraints

- **No designer:** Every visual decision was mine — type scale, color tokens, motion, spacing. No hand-off, no Figma file from someone else.
- **Speed:** The goal was one month from idea to live. Too long and it becomes a perfectionism trap; too short and it becomes a template with my name on it.
- **Authenticity:** Nothing that feels borrowed. Every component had to feel like a deliberate choice I could defend.

## Approach

### 1. Design system before components

Before writing a single component, I built the full token system: color, type scale, spacing, radius, shadow. The constraint was simple — any value that appears twice must be a token. No magic numbers.

The aesthetic landed on a three-way hybrid: **Apple**'s spatial clarity and generous whitespace, **Notion**'s editorial warmth for long-form reading, **Linear**'s developer precision and dark-mode mastery. The combination gives the site a voice that reads as serious without feeling corporate.

### 2. Content-first architecture

The blog and case study system is built on local `.md` files with gray-matter frontmatter — no CMS, no vendor lock-in, no build-time API calls. Writing a new post is `touch content/blog/post.md`. The reading experience is deliberately editorial: wide leading, restrained type, no sidebar noise.

### 3. Lightweight interactivity at the edge

View counts, likes, and comments are powered by a Prisma + PostgreSQL backend on Vercel. The API routes are intentionally minimal — no WebSocket complexity, no real-time subscription overhead. Optimistic updates handle the perceived latency on the client side.

## The Turn

The insight that reframed everything: **a portfolio is an argument, not a résumé.**

A résumé lists things that happened. An argument makes a claim and supports it with evidence. Every section of this site should answer a question a hiring manager would ask, in the order they'd ask it:

1. *Is this person real and credible?* → The hero section.
2. *What have they actually shipped?* → Projects with case studies.
3. *How do they think?* → The blog.
4. *Would I want to work with them?* → The writing voice throughout.

That reframe turned a list of projects into a narrative. The design choices became deliberate rather than aesthetic.

## Result

| Metric | Target | Achieved |
|--------|--------|----------|
| Time to ship | 6 weeks | 4 weeks |
| Lighthouse performance | 90+ | 98 |
| Core Web Vitals | Pass | All green |
| Bundle size (initial JS) | <150kB | 112kB |

## What I'd Do Differently

Start with the case studies. The project grid was the first thing I built because it felt concrete and fast — cards are easy. But case studies are the highest-signal content on any engineering portfolio. They show process, judgment, and taste in a way that no README can. Next iteration: they lead, not the grid.
