---
name: prompt-injection
description: "Detect and mitigate LLM prompt injection: instruction override, data exfiltration, privilege escalation, and safe prompt design."
risk: safe
source: community
---

# Prompt Injection (LLM Security)

## When to use

Use this skill when the user needs **prompt injection** defense or testing for LLM applications. Triggers: "prompt injection", "LLM security", "instruction override", "jailbreak", "adversarial prompt", "safe prompt design".

## Overview

Design prompts and systems to resist prompt injection: separate instructions from user content, validate outputs, enforce privilege boundaries, and test with adversarial inputs.

## Deliverables

1. **Threat model** – Instruction override (user text interpreted as system instructions); data exfiltration; privilege escalation; unintended tool use; jailbreaks.
2. **Prompt design** – Clear delimiter between system instructions and user input; no user content inside instruction block; structured output format to detect tampering.
3. **Input handling** – Treat all user and third-party content as untrusted; do not concatenate unsanitized input into system prompt; consider separate "user message" channel.
4. **Output validation** – Validate structure and content of model output before using (e.g. tool calls, displayed text); reject or sanitize suspicious output; log for review.
5. **Privilege boundaries** – Limit what the model can do (tools, data); require confirmation or human approval for sensitive actions; principle of least privilege.
6. **Testing** – Adversarial prompts (ignore previous, reveal instructions, act as admin); test with diverse languages and encodings; regression suite; red-team exercises.
7. **Monitoring** – Log prompts and responses where policy allows; detect anomaly or known attack patterns; alert on suspected injection.

## Principles

- Assume user input can contain instructions; design so that it cannot override intended behavior.
- Defense in depth: prompt design, output validation, and least-privilege tools together.
- Document prompt-injection risks and mitigations in security and design docs.
