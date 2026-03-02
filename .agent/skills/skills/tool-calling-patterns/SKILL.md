---
name: tool-calling-patterns
description: "Tool schema design, parameter validation, streaming tool calls, and error handling for LLM agents."
risk: safe
source: community
---

# Tool Calling Patterns

## When to use

Use this skill when the user needs **tool-calling design** for LLM agents or APIs. Triggers: "tool calling", "function calling", "tool schema", "OpenAI tools", "agent tools", "tool result".

## Overview

Design tools that agents can call reliably: clear schemas, validation, streaming behavior, and consistent error handling.

## Deliverables

1. **Schema** – Name, description (used for model selection), parameters as JSON Schema; required vs optional; types and enums; examples in description if helpful.
2. **Parameter validation** – Validate before execution; return clear errors (invalid type, missing required); avoid executing with invalid or unsafe input.
3. **Execution** – Execute in sandbox or with permission checks; timeout; cap payload size; return structured result (success + data or error + message).
4. **Streaming** – If agent streams, handle tool_call chunks and buffer until complete; then run tool and inject result; support streaming tool results where API allows.
5. **Errors** – Tool failure: return error message to model so it can retry or explain; never crash the agent loop; log for debugging.
6. **Safety** – No tools that bypass safety (e.g. arbitrary code execution) unless strictly controlled; document dangerous tools and restrict access.

## Principles

- Tool descriptions directly influence when the model calls them; be precise and concise.
- Always validate and sanitize inputs; never trust raw model output for security-sensitive operations.
- Return machine- and human-readable results so the agent and logs are useful.
