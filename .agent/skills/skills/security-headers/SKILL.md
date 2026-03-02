---
name: security-headers
description: "CSP, HSTS, X-Frame-Options, CORS, and secure cookie flags for web and API responses."
risk: safe
source: community
---

# Security Headers

## When to use

Use this skill when the user needs to **configure security-related HTTP headers** for web apps or APIs. Triggers: "security headers", "CSP", "Content-Security-Policy", "HSTS", "X-Frame-Options", "CORS", "secure cookie", "clickjacking", "XSS headers".

## Overview

Set and validate HTTP security headers to reduce XSS, clickjacking, and transport risks; align with OWASP and platform best practices.

## Deliverables

1. **Content-Security-Policy (CSP)** – default-src, script-src, style-src, img-src; avoid 'unsafe-inline' where possible; report-uri or report-to; gradual tightening (report-only first).
2. **Strict-Transport-Security (HSTS)** – max-age; includeSubDomains; preload consideration.
3. **X-Frame-Options** – DENY or SAMEORIGIN; or frame-ancestors in CSP.
4. **X-Content-Type-Options** – nosniff.
5. **CORS** – Allow origin list (no wildcard for credentials); methods and headers; preflight; credentials and cookie behavior.
6. **Cookies** – Secure; HttpOnly; SameSite (Strict/Lax); __Host- prefix where applicable.
7. **Validation** – How to test (browser devtools, securityheaders.com, automated checks in CI).

## Principles

- Prefer CSP over legacy X-* headers where CSP covers the case.
- Start CSP in report-only mode; fix violations; then enforce.
- Document any relaxed directive and revisit periodically.
