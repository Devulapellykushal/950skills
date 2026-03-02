---
name: vue-patterns
description: "Vue 3 Composition API, reactivity, composables, Pinia, and best practices for components and routing."
risk: safe
source: community
---

# Vue Patterns

## When to use

Use this skill when the user is building or refactoring **Vue.js** applications. Triggers: "Vue", "Vue 3", "Composition API", "composables", "Pinia", "Vue Router", "reactivity", "script setup".

## Overview

Apply Vue 3 patterns: Composition API, script setup, composables for reuse, Pinia for state, and clear component and routing structure.

## Deliverables

1. **Composition API** – Prefer `<script setup>`; reactive(), ref(), computed(); lifecycle (onMounted, onUnmounted); expose only what the template or parent need.
2. **Composables** – Extract shared logic into composables (useX); return reactive state and methods; document inputs and side effects.
3. **State** – Pinia stores for global state; define stores by feature; avoid prop drilling with provide/inject when appropriate.
4. **Components** – Single responsibility; props and emits typed; slots and scoped slots for layout; keep templates readable (extract subcomponents if long).
5. **Routing** – Vue Router; lazy-loaded routes; guards for auth; meta and scrollBehavior; useRouter/useRoute in setup.
6. **Performance** – v-once and v-memo where beneficial; shallowRef for large objects; async components for code splitting; avoid unnecessary re-renders.

## Principles

- Prefer Composition API and composables for new code; document Options API usage if maintained.
- Keep components small and composables pure where possible.
- Type props and emits (TypeScript or JSDoc) for maintainability.
