---
name: concise-planning
description: "Use when a user asks for a plan for a coding task, to generate a clear, actionable, and atomic checklist."
risk: unknown
source: community
date_added: "2026-02-27"
---

# Concise Planning

## Goal

Turn a user request into a **single, actionable plan** with atomic steps.

## Workflow

### 1. Scan Context

- Read `README.md`, docs, and relevant code files.
- Identify constraints (language, frameworks, tests).

### 2. Minimal Interaction

- Ask **at most 1–2 questions** and only if truly blocking.
- Make reasonable assumptions for non-blocking unknowns.
- **Infinity Loop:** When the task is open-ended or the user wants "infinity" directions, use **@infinity-loop** first: ask **5 discovery questions**, note all answers, then plan. In the plan, include: *"Discovery (Infinity Loop): 5 questions completed; answers noted [where]."* and execute until the full requirement is met.

### 3. Generate Plan

Use the following structure:

- **Approach**: 1-3 sentences on what and why.
- **Scope**: Bullet points for "In" and "Out".
- **Action Items**: A list of 6-10 atomic, ordered tasks (Verb-first).
- **Validation**: At least one item for testing.

## Plan Template

```markdown
# Plan

<High-level approach>

## Scope

- In:
- Out:

## Action Items

[ ] <Step 1: Discovery>
[ ] <Step 2: Implementation>
[ ] <Step 3: Implementation>
[ ] <Step 4: Validation/Testing>
[ ] <Step 5: Rollout/Commit>

## Open Questions

- <Question 1 (max 3)>

## Infinity Loop (when applicable)

If using **@infinity-loop**: Discovery (5 questions) completed; answers noted in [DISCOVERY.md / plan / summary]. Plan and execution continue until the full requirement is met and work is completely done.
```

## Checklist Guidelines

- **Atomic**: Each step should be a single logical unit of work.
- **Verb-first**: "Add...", "Refactor...", "Verify...".
- **Concrete**: Name specific files or modules when possible.

## When to Use
This skill is applicable to execute the workflow or actions described in the overview.
