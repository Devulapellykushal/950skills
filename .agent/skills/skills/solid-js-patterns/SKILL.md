---
name: solid-js-patterns
description: "Solid.js reactivity, signals, components, and patterns for fine-grained updates and small bundles."
risk: safe
source: community
---

# Solid.js Patterns

## When to use

Use this skill when the user is building or refactoring **Solid.js** applications. Triggers: "Solid", "Solid.js", "signals", "createSignal", "createEffect", "fine-grained reactivity".

## Overview

Apply Solid.js patterns: signals and effects, components (once per element), control flow, and store patterns for predictable performance and small bundles.

## Deliverables

1. **Signals** – createSignal for reactive state; getter/setter; use in JSX (getter only in template to track); batch updates where needed.
2. **Effects** – createEffect for side effects; track dependencies automatically; onCleanup for teardown; avoid effects for derived state (use memo or derived signals).
3. **Components** – Functions that run once; props are reactive (access .property to track); children as function or helper (For, Show, Switch, etc.); no re-run of whole tree on update.
4. **Control flow** – <Show>, <For>, <Switch> for conditional and list rendering; keyed For for list identity; avoid wrapping in div when not needed.
5. **Stores** – createStore for nested reactive objects; produce for immutable updates; use with signals for mixed state; avoid unnecessary nesting.
6. **Performance** – Fine-grained updates (only what changed); no virtual DOM; use dynamic components (e.g. <Dynamic>) when needed; lazy load routes.

## Principles

- Components are run once; reactivity is in the template and effects.
- Prefer signals over store when state is flat; use store for nested or large objects.
- Use Solid’s control flow components instead of raw conditionals/loops for correct reactivity.
