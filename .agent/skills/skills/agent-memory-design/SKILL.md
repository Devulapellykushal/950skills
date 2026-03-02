---
name: agent-memory-design
description: "Short-term and long-term memory for agents: context window, summarization, and retrieval."
risk: safe
source: community
---

# Agent Memory Design

## When to use

Use this skill when the user needs **memory design** for conversational or long-horizon agents. Triggers: "agent memory", "conversation memory", "long-term memory", "context window", "RAG for agent", "summarization", "user preferences".

## Overview

Design how agents retain and use information across turns and sessions: context management, summarization, and optional long-term storage and retrieval.

## Deliverables

1. **Context window** – What goes in the prompt (recent messages, tool results, system prompt); order and truncation; token budget per section.
2. **Short-term** – Sliding window of last N turns or tokens; or summarization of older turns to stay within budget; what to keep raw vs summarized.
3. **Summarization** – When to summarize (e.g. every K turns or when near limit); what to preserve (facts, decisions, user preferences); format (bullet list, narrative).
4. **Long-term** – Persistent store (user profile, preferences, key facts); when to read and when to write; retrieval (vector search or keyed) and injection into context.
5. **Privacy and scope** – User data isolation; retention and deletion; avoid leaking other users’ data into context; comply with policy and regulations.
6. **Testing** – Test with long conversations; verify important facts are retained or retrievable; test summarization quality and retrieval relevance.

## Principles

- Prioritize recent and relevant information; drop or summarize the rest.
- Long-term memory should be explicit and auditable; avoid implicit "memory" that is hard to correct.
- Document what is stored, where, and for how long.
