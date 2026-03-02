---
name: owasp-asvs
description: "OWASP ASVS: application security verification levels L1–L3, requirement mapping, and verification evidence for design and code."
risk: safe
source: community
---

# OWASP ASVS

## When to use

Use this skill when the user needs **OWASP Application Security Verification Standard (ASVS)** alignment. Triggers: "ASVS", "application security verification", "OWASP ASVS", "L1 L2 L3", "verification level", "secure development checklist".

## Overview

Apply ASVS requirements to design, implementation, and testing; map controls to levels L1 (opportunistic), L2 (standard), L3 (high assurance); produce verification evidence.

## Deliverables

1. **Level selection** – L1 (baseline), L2 (most apps), L3 (high security); choose by data sensitivity and threat model; document level and scope.
2. **Requirement mapping** – Map ASVS chapters (e.g. V1 Architecture, V2 Authentication, V5 Validation) to components; assign owners; track status (met / not met / N/A).
3. **Architecture (V1)** – Secure design; threat model; data flow; trust boundaries; document and review.
4. **Authentication & session (V2, V3)** – Strong auth; session management; password policy; MFA where required; secure logout.
5. **Validation & encoding (V5, V6)** – Input validation; output encoding; parameterized queries; no injection.
6. **Cryptography & config (V7, V8)** – Strong crypto; key management; secure config; no defaults in production.
7. **Data protection & resilience (V9–V14)** – Access control; error handling; logging; business logic; files; API; config.
8. **Verification evidence** – For each requirement: design doc, code reference, test result, or attestation; ready for assessor review.

## Principles

- Use ASVS as the checklist; complete all in-scope requirements before claiming compliance.
- Link requirements to concrete artifacts (docs, code, tests); avoid vague claims.
- Re-verify on major releases and when scope or level changes.
