---
name: forms-accessible
description: "Accessible forms: labels, validation, errors, focus, and ARIA for all users and assistive tech."
risk: safe
source: community
---

# Accessible Forms

## When to use

Use this skill when the user needs **accessible form** design and implementation. Triggers: "accessible form", "form labels", "validation accessibility", "error messages", "WCAG form", "screen reader form".

## Overview

Build forms that are usable by keyboard and assistive technologies: proper labels, validation, error handling, focus management, and ARIA where needed.

## Deliverables

1. **Labels** – Every input has a visible label; use <label for="id"> or aria-label/aria-labelledby; avoid placeholder-only labels; group with fieldset/legend for radio/checkbox groups.
2. **Validation** – Inline and on submit; associate error message with input (aria-describedby, aria-errormessage); aria-invalid when invalid; announce errors to screen readers (live region or focus move).
3. **Errors** – Clear, specific messages; place near field; summarize at top (e.g. "3 errors") with links to fields; don’t rely only on color.
4. **Focus** – Logical tab order; visible focus ring (don’t remove without replacement); focus first error on submit; optional focus trap in modals.
5. **Required and optional** – Indicate required (aria-required, * or "required"); optional can be implied; document in help text if needed.
6. **Autocomplete** – Use autocomplete attributes for common fields (name, email, etc.) to help users and assistive tech.

## Principles

- Test with keyboard only and with one screen reader (e.g. NVDA, VoiceOver).
- Errors must be programmatically associated and announced; avoid only visual indication.
- Keep validation messages helpful and actionable, not technical.
