---
name: astro-patterns
description: "Astro islands, static vs server rendering, content collections, and integration with React/Vue/Svelte."
risk: safe
source: community
---

# Astro Patterns

## When to use

Use this skill when the user is building **Astro** sites or content-heavy apps. Triggers: "Astro", "astro build", "islands", "content collections", "partial hydration", "Astro component".

## Overview

Use Astro for content-first sites: islands architecture, static and server rendering, content collections, and minimal JS by default.

## Deliverables

1. **Islands** – Ship zero JS by default; add interactivity with client: directive (client:load, client:visible, client:idle); use framework islands (React, Vue, Svelte) only where needed.
2. **Rendering** – Static (default) for build-time HTML; server for dynamic (request-time); hybrid with prerender: false for specific pages; choose per page or layout.
3. **Content collections** – Define schema for Markdown/MDX; type-safe frontmatter; query and render; use for blog, docs, or CMS-like content.
4. **Components** – .astro components for layout and static UI; slot for composition; pass props and fragments; use framework components as islands with client:.
5. **Routing** – File-based routing; dynamic routes; middleware for redirects or auth; API routes in pages; SSR adapters (Node, Vercel, Netlify, etc.).
6. **Performance** – Inline critical CSS; optimize images (Image component); minimal JS; measure with Lighthouse; use View Transitions if desired.

## Principles

- Default to static and add JS only where interactivity is required.
- Prefer content collections for structured content; keep schema and types in sync.
- Document which pages are static vs server and which use which client directive.
