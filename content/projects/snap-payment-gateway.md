---
title: "SNAP Payment Gateway"
tagline: "A production-grade payment service integrated with Faspay, built to the Indonesian national SNAP standard — with sub-100ms routing and full transaction observability."
tags: ["Go", "NATS", "PostgreSQL", "gRPC", "ElasticSearch"]
year: "2025"
role: "Backend Engineer"
timeline: "6 months"
metric: "Transaction debug time cut from 45 min to under 5 min"
status: "Archived"
---

## The Problem

Payment infrastructure is unforgiving in a specific way: failures are silent, invisible, and expensive. A dropped message means a lost transaction. A slow route means a timed-out payment. And when the integration sits between your service, an external gateway (Faspay), and a national standard (SNAP), every undocumented edge case is someone's real money on the line.

The system I inherited was a monolith with no observability. When a transaction failed, the on-call engineer had a single tool: the application log. Debugging a failed payment meant reading through thousands of lines of unstructured output, manually correlating timestamps across three services, and guessing whether the failure was upstream, downstream, or a bug we owned. A typical incident resolution took 30–60 minutes. During that window, merchants couldn't process payments.

## Constraints

- **SNAP compliance:** The Indonesian national payment standard has strict schema requirements, flow sequencing, and callback expectations. Every deviation from the spec is a certification risk.
- **External dependency:** Faspay's API had its own rate limits, idiosyncratic timeout behaviors, and failure modes that weren't fully documented.
- **Zero downtime:** The service handled live transactions 24/7. Migration had to happen incrementally, with no scheduled maintenance window.
- **Team size:** Two backend engineers. No dedicated DevOps, no dedicated QA.

## Approach

### 1. NATS for async event routing

The first structural change was decomposing the synchronous HTTP chain into an event-driven flow using NATS. Each transaction stage — initiation, processing, gateway callback, settlement — became a distinct NATS subject with a dedicated consumer.

This decoupled the flow's stages from each other. A slow gateway callback no longer blocked the initiation path. Consumer failures became isolated rather than cascading. And each subject was independently observable.

### 2. gRPC for internal service boundaries

Service-to-service calls that previously used ad-hoc REST moved to gRPC with defined `.proto` schemas. Strong typing at the boundary meant that integration mismatches were caught at compile time rather than appearing as production 500s at 2am.

### 3. ElasticSearch for transaction search

Every transaction event was indexed in ElasticSearch with a consistent structure: transaction ID, merchant ID, status, timestamp, and the raw gateway response payload. This replaced the "read the logs" debugging workflow with a query interface. Finding a failed transaction went from grepping through files to a 10-second ElasticSearch query.

## The Turn

The failure mode we'd designed against was message loss. NATS's at-least-once delivery guarantee meant we were confident nothing would be dropped. What we hadn't designed for was the inverse problem: **duplicate processing**.

Network retries — both from our own retry logic and from Faspay's callback retry mechanism — could result in the same transaction being processed twice. Two entries in the ledger. A double charge. This risk only became visible during load testing, when we observed two settlement records for the same transaction ID appearing in the database within the same second.

The fix was straightforward once we named the problem: idempotency keys at the database level. A `UNIQUE` constraint on transaction ID plus a `ON CONFLICT DO NOTHING` in the upsert query. Any duplicate processing attempt became a silent no-op rather than a double-write.

The lesson: for payment systems, **assume retries will happen, from both directions.** Design for idempotency before you design for throughput.

## Result

| Metric | Before | After |
|--------|--------|-------|
| Mean transaction routing | ~400ms | <100ms |
| Transaction observability | None | Full event trace per transaction |
| Debug time for failed transaction | 30–60 min | <5 min |
| On-call incidents per week | ~8 | ~2 |

## What I'd Do Differently

I'd put the idempotency key constraint in the initial schema migration, not as a patch after load testing. It's a foundational invariant for any payment system — not an optimization to add later. If I'd framed it as "this table can only ever have one row per transaction ID" from day one, the architecture of every consumer would have been cleaner.

More broadly: **write down the failure modes before you write the happy path.** The SNAP spec defines the success flow in detail. The edge cases — partial callbacks, late retries, gateway timeouts — are described in one paragraph. Those one-paragraph footnotes were responsible for 80% of our production incidents.
