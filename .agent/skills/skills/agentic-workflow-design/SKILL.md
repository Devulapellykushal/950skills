---
name: agentic-workflow-design
description: "Design agentic flows: planning, tool use, multi-step reasoning, and error recovery."
risk: safe
source: community
---

# Agentic Workflow Design

## When to use

Use this skill when the user needs to **design agentic or LLM-driven workflows**. Triggers: "agentic workflow", "LLM agent", "multi-step reasoning", "plan and execute", "ReAct", "tool use", "agent loop".

## Overview

Structure workflows where an agent plans, uses tools, and recovers from errors; balance autonomy with guardrails and observability.

## Deliverables

1. **Loop design** – Plan (or single-step) → act (tool call) → observe (tool result) → repeat or conclude; max steps and timeout to avoid runaway.
2. **Tool use** – Clear tool schemas (name, description, parameters); when to call which tool; validation of inputs and outputs; cost and latency awareness.
3. **State** – What to keep in context (conversation, tool results, plan); summarization or truncation when context is limited; checkpoint for long runs.
4. **Error recovery** – Retry with backoff; fallback (e.g. human handoff, default path); surface errors to user or operator; avoid silent failure.
5. **Guardrails** – Input/output validation; PII and safety filters; scope limits (e.g. only allowed tools and data); audit trail for sensitive actions.
6. **Evaluation** – Success criteria; regression tests with example conversations; monitor latency, cost, and failure rate in production.

## Principles

- Prefer bounded loops and clear termination; avoid unbounded "think forever".
- Document tool contracts and failure modes; test with adversarial or edge inputs.
- Design for observability: log decisions, tool calls, and outcomes.
