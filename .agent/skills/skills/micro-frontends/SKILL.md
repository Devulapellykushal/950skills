---
name: micro-frontends
description: "Micro-frontend architecture: composition, routing, shared dependencies, and team boundaries."
risk: safe
source: community
---

# Micro-Frontends

## When to use

Use this skill when the user needs **micro-frontend** architecture or composition. Triggers: "micro-frontend", "module federation", "multiple teams", "compose apps", "shell app", "iframe", "Web Components".

## Overview

Design and implement micro-frontends: composition (shell + fragments), routing, shared dependencies, and clear ownership and versioning.

## Deliverables

1. **Composition** – Shell (host) loads fragments (remotes); at build time (Module Federation, Nx) or runtime (script tags, iframe); define integration points and contracts.
2. **Routing** – Shell owns top-level route or base path; fragments own sub-routes; sync URL and shell/fragment state; avoid duplicate history or conflict.
3. **Shared dependencies** – Share React/Vue (or other) and common libs; single version from shell or agreed version matrix; avoid duplicate instances unless isolated by design.
4. **Communication** – Cross-fragment events (custom events, message bus, or context); minimal surface; document payload and ownership.
5. **Styling** – Isolate (shadow DOM, CSS-in-JS scoped, or prefix); or shared design tokens; avoid global overrides that break fragments.
6. **Ownership** – Each fragment owned by a team; version and deploy independently; contract (props, events, route prefix); integration tests at shell level.

## Principles

- Start with clear boundaries: route, DOM node, or slot; document contracts.
- Prefer composition over iframe when possible for UX and performance.
- Version and test integration; avoid breaking the shell when a fragment updates.
