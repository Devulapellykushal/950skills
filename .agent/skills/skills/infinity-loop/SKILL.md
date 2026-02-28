---
name: infinity-loop
description: "Infinity Loop workflow: ask 5 discovery questions, note answers, then develop until the full requirement is complete. Use for open-ended or infinity-scope work. Integrates with concise-planning."
risk: safe
source: personal
date_added: "2026-02-28"
---

## When to Use

Use this skill when the user wants to work on something open-ended, "infinity" possible directions, or when they want a **discovery-first, then execute-until-done** workflow. Follow the workflow in **infinityloop.md** (project root).

# Infinity Loop

## Goal

1. **Phase 1:** Ask **5 questions** to clarify what the user wants and possible directions; **note all answers**; do not start building until captured.
2. **Phase 2:** **Develop efficiently** until the **whole requirement is met** and you consider the work **completely done**.

## Workflow (see infinityloop.md)

### Phase 1 — Discovery (5 Questions)

- Ask **5 questions** tailored to the request (goal, audience, constraints, direction, done criteria).
- **Record every answer** (e.g. in plan, `DISCOVERY.md`, or conversation).
- **Do not start implementation** until all 5 answers are captured.

### Phase 2 — Develop Until Done

- Use the 5 answers as source of truth.
- Plan (use **@concise-planning**; in the plan state: "Discovery (Infinity Loop): 5 questions completed; answers noted.").
- Execute until all planned work is done and the **full requirement is met**; do not stop early.

## Integration With Concise Planning

When using **@concise-planning** for Infinity Loop work:

- Run Phase 1 first; record answers.
- In the plan, include: **"Discovery (Infinity Loop): 5 questions completed; answers noted [where]."**
- Plan and execute until the deliverable is complete.

## Reference

Full workflow: **infinityloop.md** (project root).
