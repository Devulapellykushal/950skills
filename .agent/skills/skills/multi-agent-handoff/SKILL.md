---
name: multi-agent-handoff
description: "Orchestrator patterns, handoff protocols, and shared context for multi-agent systems."
risk: safe
source: community
---

# Multi-Agent Handoff

## When to use

Use this skill when the user needs **multi-agent** coordination or handoff. Triggers: "multi-agent", "agent handoff", "orchestrator", "specialist agents", "routing", "delegate to agent".

## Overview

Design systems with multiple agents: orchestration, handoff protocol, shared context, and clear ownership of tasks and data.

## Deliverables

1. **Orchestrator** – Single router or orchestrator that decides which agent handles the request; criteria: intent, domain, or capability; fallback and default agent.
2. **Handoff protocol** – What is passed: user message, conversation summary, structured state (e.g. extracted entities, goal); format (prompt injection, API payload); handoff message to user optional ("Transferring you to X").
3. **Shared context** – Common state (session id, user id, tenant); what each agent can read and write; avoid conflicting writes; version or timestamp if needed.
4. **Specialist agents** – Each agent has clear scope (e.g. billing, support, search); orchestrator routes by classifier or keyword; document each agent’s inputs and outputs.
5. **Loop prevention** – Max handoffs per session; detect ping-pong (A→B→A); escalate to human or default agent after N handoffs.
6. **Observability** – Log handoffs (from, to, reason); trace across agents; metrics per agent (latency, success, handoff rate).

## Principles

- Handoff should be explicit and logged; avoid implicit or untracked transfers.
- Keep context minimal and serializable; avoid passing large raw history when summary suffices.
- Define clear boundaries so one agent does not override another’s committed state.
