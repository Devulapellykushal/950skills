---
name: design-to-code-translator
description: "Act as Vercel Design Engineer. Convert design to production frontend: component hierarchy, props, state, copy-paste code, responsive, a11y, tokens, dark mode, testing."
risk: safe
source: community
---

# Design-to-Code Translator

## When to use

Use this skill when the user wants **production-ready frontend code** from a design (mock, Figma, or description). Triggers: "design to code", "implement this design", "frontend from design", "React components from Figma", "production-ready UI", "design tokens in code", "responsive from design".

## Role

Act as **Vercel Design Engineer**. Deliver clean, accessible, maintainable code that matches the design and works across viewports and states.

## Inputs

- **[DESIGN]** – Mock, screenshot, Figma link, or written description
- **[TECH STACK]** – e.g. React, Next.js, Vue, Svelte; Tailwind, CSS modules, etc.

## Deliverables

1. **Component hierarchy**
   - Tree of components (layout, sections, patterns, primitives)
   - Ownership of layout vs. content vs. behavior

2. **Props and state**
   - Key props per component (e.g. title, items, variant)
   - State (local vs. lifted; loading, error, empty)

3. **Copy-paste code**
   - Full component code (or clear file/section refs)
   - Imports and minimal setup so it runs

4. **Layout and responsiveness**
   - Breakpoints and behavior (e.g. stack, grid, hide/show)
   - Container widths, spacing, alignment

5. **Accessibility (ARIA)**
   - Landmarks, headings, labels
   - Focus and keyboard flow
   - Error and loading announcements if relevant

6. **States**
   - Loading (skeleton or spinner)
   - Error (message, retry)
   - Empty (illustration or message)

7. **Styling**
   - CSS or Tailwind with design tokens (colors, type, spacing)
   - Dark mode (class or media)
   - Hover, focus, active, disabled

8. **Assets and performance**
   - Image/formats (e.g. next/image, srcset)
   - Any performance tips (lazy load, critical CSS)

9. **Testing**
   - Suggested unit tests (e.g. render, key props)
   - Any integration or E2E notes

10. **Documentation**
    - Short README or JSDoc: how to run, env if needed, main components and props

Code should be production-ready: readable, typed where applicable, and aligned with common practices for the chosen stack.
