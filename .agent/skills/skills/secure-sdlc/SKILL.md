---
name: secure-sdlc
description: "Security touchpoints in the SDLC: threat modeling, secure design, secure code review, and security testing."
risk: safe
source: community
---

# Secure SDLC

## When to use

Use this skill when the user needs to **integrate security into the development lifecycle**. Triggers: "secure SDLC", "security in development", "threat modeling", "secure design", "security review", "shift left security".

## Overview

Embed security at each phase of the SDLC: design (threat modeling), implementation (secure coding and review), and verification (testing and release).

## Deliverables

1. **Design phase** – Threat modeling (STRIDE or similar) for new features or services; document threats and mitigations; security requirements and assumptions.
2. **Implementation** – Secure coding guidelines; use of safe APIs and libraries; avoid known anti-patterns (injection, weak crypto, hardcoded secrets).
3. **Code review** – Security checklist for PRs; focus on auth, input validation, secrets, and data handling; automate where possible (SAST, secrets scan).
4. **Testing** – Security tests (authz, injection, fuzz); dependency and container scanning; DAST or API security tests in CI/staging.
5. **Release and operate** – Security sign-off or gates; vulnerability management and patching; incident response linkage.

## Principles

- Shift left: address security as early as design and code, not only at release.
- Automate repeatable checks; use human review for context and design.
- Tailor depth to risk: critical paths get more threat modeling and review.
