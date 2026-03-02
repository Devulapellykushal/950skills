---
name: incident-response-runbook
description: "Runbook structure, severity levels, comms, post-incident review, and linking to observability."
risk: safe
source: community
---

# Incident Response Runbook

## When to use

Use this skill when the user needs **incident response or runbook** structure. Triggers: "incident response", "runbook", "outage", "severity", "postmortem", "on-call", "war room", "status page".

## Overview

Define how to detect, triage, communicate, and resolve incidents; tie runbooks to alerts and observability; capture learnings in blameless postmortems.

## Deliverables

1. **Severity levels** – Define P0/P1/P2 (or equivalent): impact (users, revenue, SLO) and urgency; who is paged and escalation path.
2. **Runbook structure** – Per alert or failure mode: symptom, likely causes, diagnostic steps (queries, logs, dashboards), remediation steps, rollback; owner and link to playbook.
3. **Detection and alerting** – Link runbooks to alerts; avoid alert fatigue; use runbook URLs in alert payloads (PagerDuty, Opsgenie, Slack).
4. **Communication** – Status page updates; internal comms (Slack, email); customer-facing messaging templates; when to escalate to leadership.
5. **Post-incident** – Blameless postmortem: timeline, root cause, contributing factors, action items (fix, monitor, doc); share and store for search.

## Principles

- Runbooks should be actionable: next step always clear.
- Keep postmortems blameless and focused on systems and process.
- Review and update runbooks after each incident and during drills.
