---
name: human-in-the-loop-agents
description: "Escalation, approval flows, and feedback loops for AI agents; when to ask and how to resume."
risk: safe
source: community
---

# Human-in-the-Loop Agents

## When to use

Use this skill when the user needs **human-in-the-loop** behavior for agents. Triggers: "human in the loop", "approval flow", "escalate to human", "agent escalation", "feedback loop", "confirm before action".

## Overview

Design when and how agents hand off to humans: escalation triggers, approval flows, and feedback collection; then resume or adjust agent behavior.

## Deliverables

1. **When to escalate** – Low confidence; sensitive action (payment, delete, share); user request ("talk to human"); policy or guardrail triggered; error after retries.
2. **Approval flows** – Present proposed action and context to user; accept, reject, or edit; timeout and default (e.g. reject or notify); audit log of approvals.
3. **Handoff** – Seamless handoff to human (live or async); pass context (summary, history, tool results); avoid losing state; allow human to add instructions and resume agent.
4. **Feedback** – Collect explicit feedback (thumbs, rating, correction); use for fine-tuning or reward model; store and tag for review.
5. **Resume** – After approval or human input, resume agent with updated context; idempotency if the same action was already applied; clear "waiting on human" state in UI.
6. **Safety** – Sensitive actions always require approval or explicit user confirmation; document escalation and approval in runbooks.

## Principles

- Default to escalate when in doubt for high-impact or irreversible actions.
- Keep approval UX simple: clear options, minimal steps, and visible consequences.
- Preserve full context for the human and for audit.
