---
name: security-logging-audit
description: "Audit logs, tamper resistance, retention, and what to log for auth and sensitive actions."
risk: safe
source: community
---

# Security Logging & Audit

## When to use

Use this skill when the user needs **security-relevant logging or audit trails**. Triggers: "audit log", "security logging", "tamper-proof log", "who did what", "compliance logging", "auth events", "access log".

## Overview

Design logging and audit trails for security and compliance: what to log, how to protect and retain logs, and how to query them for investigations.

## Deliverables

1. **What to log** – Auth events (login, logout, failure, MFA); privilege changes; access to sensitive data (PII, config); admin actions; API and resource access where relevant.
2. **Log content** – Timestamp (UTC), actor (user/id), action, resource, outcome, IP or context; avoid logging secrets or full PII unless required and protected.
3. **Tamper resistance** – Centralized logging; restricted write access; integrity (e.g. signing, WORM storage) where compliance requires it.
4. **Retention** – Retention policy by log type; legal and compliance requirements; secure deletion when no longer needed.
5. **Query and alerting** – How to search audit logs; alerts on suspicious patterns (e.g. bulk export, failed auth spike); integration with SIEM or security tools.

## Principles

- Log enough to answer "who did what, when, and from where" for critical actions.
- Protect audit logs as highly sensitive; limit who can read or delete.
- Document retention and access in security or compliance docs.
