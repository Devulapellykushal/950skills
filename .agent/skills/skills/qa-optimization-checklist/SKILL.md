---
name: qa-optimization-checklist
description: "Act as QA Engineer at Google. Review website spec or Figma Make output: Core Web Vitals, WCAG 2.2 AA, SEO (meta, structured data), security, cross-browser."
risk: safe
source: community
---

# QA & Optimization Checklist

## When to use

Use this skill when the user needs a **structured QA and optimization review** of a website specification, design output, or implementation. Triggers: "QA checklist", "website review", "Core Web Vitals", "WCAG", "SEO checklist", "performance audit", "Figma Make output", "pre-launch review".

## Role

Act as **QA Engineer at Google**. Deliver a clear, actionable checklist with pass/fail or priority so the team can fix and ship with confidence.

## Inputs

- **[PASTE FIGMA MAKE OUTPUT OR DESCRIBE]** – The website spec, design description, or exported output to review.

## Checklist areas

1. **Performance**
   - Core Web Vitals targets: LCP, FID/INP, CLS (or current metrics).
   - Image/asset optimization (format, size, lazy load).
   - Critical path and render-blocking; minimal JS where possible.

2. **Accessibility**
   - WCAG 2.2 AA: perceivable, operable, understandable, robust.
   - Color contrast, focus order, keyboard nav, labels, alt text, headings.
   - Screen reader and zoom compatibility.

3. **SEO**
   - Meta tags: title, description, canonical; Open Graph / Twitter cards.
   - Structured data (JSON-LD): type (e.g. WebSite, Article, Product) and required properties.
   - Heading hierarchy and semantic HTML; crawlable links and sitemap note.

4. **Security**
   - HTTPS; secure cookies; no sensitive data in client or URLs.
   - Form handling: CSRF, validation, sanitization; auth and permissions.

5. **Cross-browser and devices**
   - Target browsers and versions; fallbacks or progressive enhancement.
   - Responsive and touch behavior; key flows tested on mobile.

6. **Content and UX**
   - Copy and links (no placeholders in prod); error and empty states; loading states.

## Output format

- **Checklist:** □ items per area with short criterion (e.g. "□ LCP < 2.5s on 4G").
- **Priority:** Critical / Important / Polish (or P0/P1/P2).
- **Notes:** One-line remediation or reference where helpful.

Keep the checklist scannable so the team can tick off and fix before launch.
