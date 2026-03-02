---
name: feature-flags-backend
description: "Feature flag storage, evaluation, targeting, and rollout; integration with config and experiments."
risk: safe
source: community
---

# Feature Flags (Backend)

## When to use

Use this skill when the user needs **feature flags** in the backend. Triggers: "feature flag", "feature toggle", "gradual rollout", "A/B backend", "kill switch", "LaunchDarkly", "split".

## Overview

Implement and operate feature flags: storage, evaluation, targeting (user, segment, percentage), and safe rollout and rollback.

## Deliverables

1. **Storage and evaluation** – Flag key, type (boolean, string, number), and rules; evaluate in app or via SDK; cache rules with TTL and refresh on change.
2. **Targeting** – By user id, segment, attribute, or percentage rollout; stickiness (consistent for same user); allow override for internal or test.
3. **Rollout** – Ramp percentage; canary by segment or region; automatic rollback on error rate or metric if supported.
4. **Lifecycle** – Create → enable for % or segment → full rollout → remove flag and code path; avoid long-lived flags; document owner and purpose.
5. **Performance** – Minimal latency (local cache); no blocking on network for evaluation; batch or async when logging for experiments.
6. **Security** – Restrict who can change flags; audit log for changes; no secrets in flag config; validate inputs for segment rules.

## Principles

- Flags are temporary; plan removal and cleanup to avoid tech debt.
- Default to off or safe behavior when flag service is unavailable.
- Use flags for rollout and kill switch; use experiment platform for statistical A/B when needed.
