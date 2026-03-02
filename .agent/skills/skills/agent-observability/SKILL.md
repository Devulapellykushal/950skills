---
name: agent-observability
description: "Logging, tracing, and metrics for AI agents: token usage, latency, tool calls, and failures."
risk: safe
source: community
---

# Agent Observability

## When to use

Use this skill when the user needs **observability for AI agents**. Triggers: "agent observability", "LLM metrics", "token usage", "agent tracing", "tool call log", "agent dashboard", "cost tracking".

## Overview

Instrument agents for operational visibility: logs, traces, and metrics for prompts, tool calls, token usage, latency, and failures.

## Deliverables

1. **Logging** – Log each request: model, prompt length, response length, tool calls (name, args, result summary); redact PII and secrets; structured logs for search.
2. **Tracing** – Trace ID across agent loop; spans for each LLM call and tool invocation; parent-child relationship; export to Jaeger, OpenTelemetry, or vendor.
3. **Metrics** – Token usage (input/output) per request and per model; latency (TTFT, total); tool call count and duration; error rate and type; cost (if priced per token).
4. **Dashboards** – Latency percentiles; token and cost trends; tool usage and failure; error breakdown; per-user or per-session if needed.
5. **Alerts** – High error rate; latency SLO breach; cost anomaly; repeated tool failures; optionally low quality (e.g. user feedback drop).
6. **Sampling** – In high volume, sample for full trace or prompt logging; always aggregate metrics; comply with data retention and PII policy.

## Principles

- Treat agent runs as distributed traces; one trace per user request or session.
- Track cost and usage per tenant or product for billing and optimization.
- Never log full prompts or responses in plain text if they contain PII; use hashing or sampling.
