---
name: background-jobs-patterns
description: "Job queues, retries, dead-letter, idempotency, and observability for async workers."
risk: safe
source: community
---

# Background Jobs Patterns

## When to use

Use this skill when the user needs **background or async job** design. Triggers: "background job", "job queue", "worker", "retry", "dead letter", "Celery", "Bull", "Sidekiq", "async task".

## Overview

Design reliable background job systems: queue choice, retries, dead-letter handling, idempotency, and observability.

## Deliverables

1. **Queue and workers** – Choice of queue (Redis, SQS, RabbitMQ, DB-backed); worker concurrency and scaling; job payload size and serialization.
2. **Retries** – Retry count and backoff (exponential or fixed); which errors are retriable; max age or attempts before DLQ.
3. **Dead-letter** – Move failed jobs to DLQ after max retries; alert on DLQ depth; manual or automated replay and inspection.
4. **Idempotency** – Jobs may run more than once; design for idempotency (keyed by job id or business key); avoid duplicate side effects.
5. **Scheduling** – Cron-like or delayed jobs; timezone and idempotency for recurring tasks.
6. **Observability** – Logs and traces; metrics (queue depth, processing time, failure rate); dashboards and alerts for backlog and errors.

## Principles

- Assume at-least-once delivery; make job handlers idempotent.
- Limit retries and always have a DLQ or equivalent for unprocessable jobs.
- Expose queue depth and latency so operators can scale and debug.
