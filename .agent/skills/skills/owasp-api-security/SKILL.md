---
name: owasp-api-security
description: "OWASP API Security Top 10: broken object level auth, broken auth, excessive data exposure, lack of resources, injection, misconfiguration."
risk: safe
source: community
---

# OWASP API Security Top 10

## When to use

Use this skill when the user needs **API-specific security** aligned to OWASP API Security Top 10. Triggers: "API security", "OWASP API", "API Top 10", "BOLA", "broken object level authorization", "API auth", "API injection".

## Overview

Address the OWASP API Security Top 10: object-level authorization, authentication, data exposure, resource limits, injection, misconfiguration, and related risks in REST, GraphQL, and other APIs.

## Deliverables

1. **API1: Broken object level authorization (BOLA)** – Authorize every request by resource and user; no IDOR; test with swapped IDs and cross-tenant access.
2. **API2: Broken authentication** – Strong auth (tokens, API keys); no credentials in URLs; token lifecycle and revocation; rate limit auth endpoints.
3. **API3: Broken object property level authorization** – Return only allowed fields; avoid mass assignment; validate response shape and permissions.
4. **API4: Unrestricted resource consumption** – Rate limiting; pagination limits; payload size limits; cost controls for expensive operations.
5. **API5: Broken function level authorization** – Check permission per action and role; no privilege escalation via different endpoints or methods.
6. **API6: Unrestricted access to sensitive business flows** – Protect critical flows (e.g. checkout, signup); anti-abuse and fraud checks.
7. **API7: Server-side request forgery (SSRF)** – Validate and allowlist URLs; block internal and sensitive targets; use @web-security-testing for SSRF tests.
8. **API8: Security misconfiguration** – Secure defaults; no debug in prod; headers (CSP, HSTS); inventory and harden all endpoints.
9. **API9: Improper inventory management** – Document all API versions and endpoints; deprecate safely; remove unused or legacy.
10. **API10: Unsafe consumption of APIs** – Validate and sanitize data from upstream APIs; treat as untrusted; schema validation.

## Principles

- Assume APIs are a primary attack surface; apply defense in depth.
- Test authorization (BOLA, function level) on every protected resource.
- Document API inventory and security controls; review on release.
