---
name: event-driven-backend
description: "Event sourcing, event bus design, at-least-once delivery, idempotent handlers, and schema evolution."
risk: safe
source: community
---

# Event-Driven Backend

## When to use

Use this skill when the user needs **event-driven architecture** for backends or services. Triggers: "event-driven", "event bus", "publish subscribe", "event sourcing", "message queue", "Kafka", "RabbitMQ", "at-least-once", "idempotent consumer".

## Overview

Design backends around events: event models, transport (message bus/queue), delivery guarantees, idempotent handling, and schema evolution.

## Deliverables

1. **Event model** – Domain events; payload schema (versioned); correlation and causation IDs for tracing.
2. **Transport** – Choice of broker (Kafka, RabbitMQ, SQS, etc.); topics/queues and partitioning; retention and replay where needed.
3. **Delivery** – At-least-once vs exactly-once semantics; acknowledgments and retries; dead-letter handling and alerting.
4. **Handlers** – Idempotent processing (keyed by event ID or business key); ordering requirements and partition keys; idempotency window or store.
5. **Schema evolution** – Backward/forward compatibility; schema registry or version in payload; deprecation and migration path.

## Principles

- Design for duplicate delivery: consumers must be idempotent or deduplicated.
- Use correlation IDs across services for debugging and tracing.
- Document event contracts and ownership; version events explicitly.
