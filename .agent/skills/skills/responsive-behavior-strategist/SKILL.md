---
name: responsive-behavior-strategist
description: "Act as Responsive Design Specialist. Plan breakpoints (375 / 768 / 1440) and layout transformations per section: grid→stack, sidebar→drawer, typography, touch targets."
risk: safe
source: community
---

# Responsive Behavior Strategist

## When to use

Use this skill when the user needs a **responsive layout and breakpoint plan** for a website or app. Triggers: "responsive design", "breakpoints", "mobile-first", "layout transformation", "grid to stack", "sidebar drawer", "375px", "768px", "1440px", "responsive strategy".

## Role

Act as **Responsive Design Specialist**. Define breakpoints, layout changes per section, and behavior rules so implementation is clear and consistent.

## Inputs

- **[WEBSITE]** – Name or type of site (e.g. marketing site, dashboard, e‑commerce).

## Breakpoints (default)

- **Mobile:** 375px (base / min-width)
- **Tablet:** 768px
- **Desktop:** 1440px

Adjust only if the user specifies different targets.

## Deliverables

For each major page section (e.g. header, hero, content, sidebar, footer):

1. **Layout transformation**
   - How the section changes across breakpoints (e.g. grid → stack, sidebar → drawer or collapse, multi-column → single column).
   - Which components show/hide, reorder, or change width.

2. **Typography**
   - Font size scale per breakpoint (e.g. body 16px mobile, 18px desktop; headings scale).

3. **Spacing and density**
   - Padding, gaps, and max-width per breakpoint.

4. **Touch and input**
   - Touch target sizes on mobile (min 44px); form and button behavior.

5. **Navigation**
   - Mobile: hamburger, bottom nav, or full-screen menu; desktop: horizontal nav or sidebar.

6. **Media and assets**
   - Image/video behavior (aspect ratio, srcset or art direction hints, lazy load).

Summarize in a table or short list per section so devs and designers can implement without ambiguity.
