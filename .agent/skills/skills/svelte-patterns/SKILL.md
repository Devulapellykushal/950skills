---
name: svelte-patterns
description: "Svelte 4/5 reactivity, stores, actions, and component patterns for lean bundles and clear code."
risk: safe
source: community
---

# Svelte Patterns

## When to use

Use this skill when the user is building or refactoring **Svelte** applications. Triggers: "Svelte", "SvelteKit", "reactive", "store", "Svelte 5 runes", "actions", "component".

## Overview

Apply Svelte patterns: reactivity (including runes in Svelte 5), stores, component composition, and SvelteKit for routing and SSR.

## Deliverables

1. **Reactivity** – Assignments trigger updates; reactive declarations ($:); in Svelte 5 use runes ($state, $derived, $effect) for fine-grained reactivity; avoid unnecessary subscriptions.
2. **Stores** – writable, readable, derived; subscribe and auto-subscription ($store); use for cross-component or async state; unsubscribe on destroy.
3. **Components** – Props and slot (default, named); export let and typing; use:action for DOM or third-party lifecycle; bind: for two-way where appropriate.
4. **SvelteKit** – +page.svelte, +page.server.ts, +layout; load functions and form actions; adapters for deploy; handle errors and redirects.
5. **Performance** – Compile-time reactivity; small bundle; use {#key} for list identity; lazy load with dynamic import.
6. **Accessibility** – Semantic HTML; bind:this for focus; consider transitions and reduced motion.

## Principles

- Leverage Svelte’s compile-time model; prefer declarative reactivity over manual DOM.
- Use stores for shared state; keep component state local when possible.
- Document runes vs legacy reactivity when mixing Svelte 4 and 5.
