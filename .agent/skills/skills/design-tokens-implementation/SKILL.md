---
name: design-tokens-implementation
description: "Design tokens: colors, spacing, typography; format (JSON, CSS vars), build pipeline, and theming."
risk: safe
source: community
---

# Design Tokens Implementation

## When to use

Use this skill when the user needs **design tokens** for a design system or theming. Triggers: "design tokens", "design system tokens", "CSS variables", "theming", "Style Dictionary", "color tokens", "spacing scale".

## Overview

Define, transform, and consume design tokens: single source of truth, format (JSON, CSS vars, SCSS), build pipeline, and theme switching.

## Deliverables

1. **Token structure** – Semantic naming (color.background.primary, spacing.md); primitives vs semantic; group by: color, typography, spacing, radius, shadow, etc.
2. **Format** – Author in JSON or YAML; reference and alias (e.g. color.brand → color.blue.500); version and extend (platform-specific overrides).
3. **Build** – Use Style Dictionary or similar; transform to CSS variables, SCSS, iOS/Android assets; output to repo or package; run in CI.
4. **CSS variables** – Expose tokens as --token-name; theme as data-theme or .theme-dark; fallbacks for older browsers; use in components via var().
5. **Theming** – Light/dark and optional themes; switch at runtime (class or attribute); prefer-scheme for system; document how to add a theme.
6. **Documentation** – Token table or catalog; usage guidelines; do’s and don’ts; link from design (Figma) to code.

## Principles

- One source of truth; platforms consume generated outputs.
- Prefer semantic tokens in components; map primitives in token layer.
- Document naming and structure so design and dev stay aligned.
