---
name: database-migrations-safe
description: "Zero-downtime migrations, expand-contract, backfills, and rollback strategy for schema changes."
risk: safe
source: community
---

# Safe Database Migrations

## When to use

Use this skill when the user needs **safe, zero-downtime database migrations**. Triggers: "migration", "schema change", "zero downtime", "expand contract", "backfill", "rollback", "ALTER TABLE".

## Overview

Apply schema and data migrations with minimal downtime: expand-contract pattern, backfills, and rollback plans; avoid long locks and blocking writes.

## Deliverables

1. **Expand-contract** – Add new column/index as nullable or with default; deploy app that writes both old and new; backfill; deploy app that uses new only; drop old (contract). Reverse for removals.
2. **Indexes** – Create concurrently where supported (PostgreSQL CREATE INDEX CONCURRENTLY); avoid blocking writes; monitor progress.
3. **Data migrations** – Backfill in batches (limit/offset or cursor); avoid long transactions; run during low traffic or with throttling; verify counts and checksums.
4. **Rollback** – Plan backward-compatible steps; keep old columns until new code is stable; document rollback order (app first, then schema if needed).
5. **Tooling** – Use migration framework (e.g. Flyway, Liquibase, Alembic); version migrations; test on copy of prod data; run in staging with similar size.
6. **Safety** – No destructive DROP without expand-contract or backup; avoid locking entire table when possible; timeouts and statement limits.

## Principles

- Every migration should be reversible or have a documented rollback path.
- Prefer multiple small migrations over one large change.
- Test migrations against production-like data and load.
