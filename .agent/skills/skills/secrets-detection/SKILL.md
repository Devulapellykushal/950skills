---
name: secrets-detection
description: "Pre-commit and CI checks for leaked secrets (API keys, tokens), .env hygiene, and rotation guidance."
risk: safe
source: community
---

# Secrets Detection

## When to use

Use this skill when the user needs to **prevent or find leaked secrets** in code or config. Triggers: "secrets in code", "API key leaked", "detect secrets", "pre-commit secrets", "env files", "rotate credentials", "truffleHog", "gitleaks", ".env".

## Overview

Detect and prevent committed secrets using pre-commit hooks and CI; handle .env and config safely; recommend rotation when exposure is suspected.

## Deliverables

1. **Detection** – Integrate a secrets scanner (e.g. gitleaks, truffleHog, GitGuardian) in pre-commit and CI; scope to repo and history as needed.
2. **Patterns** – What to scan for: API keys, tokens, private keys, connection strings; exclude false positives (e.g. example placeholders) via allowlists.
3. **.env and config** – Never commit .env; use .env.example with placeholders; document where real secrets come from (vault, CI env, managed secrets).
4. **Rotation** – When a secret may be exposed: invalidate and rotate immediately; update all consumers and document the incident.
5. **Developer workflow** – Pre-commit hook setup; CI failure message; link to internal docs on where to store and inject secrets.

## Principles

- Fail fast: block commit or CI if high-confidence secrets are found.
- Keep allowlists minimal and reviewed.
- Prefer environment variables or secret managers over config files for production.
