---
name: rate-limiting-backend
description: "Token bucket, sliding window, per-user and per-IP limits, 429 responses, and backpressure."
risk: safe
source: community
---

# Rate Limiting (Backend)

## When to use

Use this skill when the user needs **rate limiting** for APIs or backends. Triggers: "rate limit", "throttling", "429", "API quota", "token bucket", "per-user limit", "DDoS mitigation".

## Overview

Design and implement rate limiting to protect backends, ensure fairness, and enforce quotas; return clear 429 responses and headers.

## Deliverables

1. **Algorithm** – Token bucket, sliding window, or fixed window; choice by accuracy and storage (e.g. Redis counters); per key (user, IP, API key, endpoint).
2. **Limits** – Global, per-user, per-IP, per-endpoint; different limits for auth vs anonymous; configurable per environment.
3. **Response** – HTTP 429 Too Many Requests; Retry-After header (seconds or date); optional JSON body with limit, remaining, reset time.
4. **Headers** – Expose X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset (or similar) for client visibility.
5. **Backpressure** – When downstream is slow, apply stricter limits or queue; circuit breaker or degraded mode if store (e.g. Redis) is unavailable.
6. **Testing** – Unit tests for limits; integration test that 429 is returned; verify headers and Retry-After.

## Principles

- Prefer distributed state (e.g. Redis) for multi-instance consistency.
- Always return Retry-After so clients can back off correctly.
- Document limits and behavior in API docs and status pages.
