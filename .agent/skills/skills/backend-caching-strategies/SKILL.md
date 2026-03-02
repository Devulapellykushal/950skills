---
name: backend-caching-strategies
description: "Cache-aside, write-through, TTL, invalidation, and when to use Redis or CDN for APIs."
risk: safe
source: community
---

# Backend Caching Strategies

## When to use

Use this skill when the user needs **caching strategy** for backends or APIs. Triggers: "caching strategy", "cache invalidation", "Redis cache", "CDN cache", "cache-aside", "TTL", "stale-while-revalidate".

## Overview

Choose where and how to cache: cache-aside, write-through, TTL, invalidation, and consistency trade-offs; apply to APIs, DB, and CDN.

## Deliverables

1. **Placement** – In-process, Redis (or similar), CDN; what to cache where (e.g. API response in Redis, static in CDN).
2. **Cache-aside** – App reads from cache; on miss, load from DB and populate cache; writes go to DB and invalidate or update cache.
3. **Write-through / write-behind** – Write to cache and DB (sync or async); when to use and consistency implications.
4. **TTL and invalidation** – TTL per key or tier; explicit invalidation on update (by key, tag, or pattern); avoid thundering herd (single-flight or lock).
5. **Consistency** – Acceptable staleness; cache version or generation for invalidation; avoid caching user-specific sensitive data in shared cache unless keyed and secured.
6. **Observability** – Hit/miss metrics; latency; cache size and eviction; alerts on error rate or backend load.

## Principles

- Document what is cached and invalidation rules; keep TTLs and keys in config.
- Prefer cache-aside unless write-through is required for the use case.
- Design for cache failure: backend must still work (degraded) if cache is down.
