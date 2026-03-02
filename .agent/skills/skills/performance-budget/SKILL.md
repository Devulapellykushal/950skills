---
name: performance-budget
description: "Performance budgets: bundle size, LCP, CLS; CI enforcement and regression alerts."
risk: safe
source: community
---

# Performance Budget

## When to use

Use this skill when the user needs **performance budgets** or regression prevention. Triggers: "performance budget", "bundle size", "LCP budget", "CI performance", "budget Lighthouse", "size limit".

## Overview

Define and enforce performance budgets for bundle size, metrics (LCP, FID, CLS), and optional resource limits; fail CI or alert on breach.

## Deliverables

1. **What to budget** – JS/CSS total size; per-route or per-chunk size; LCP, FCP, TTI, CLS (and INP if available); number of requests or transfer size per page.
2. **Thresholds** – Set max values (e.g. main bundle < 200 KB, LCP < 2.5 s); optional warning vs error; different for mobile if measured.
3. **CI integration** – Run on PR or main (e.g. Lighthouse CI, size-limit, bundlesize); fail or warn when over budget; report in PR comment or dashboard.
4. **Regression** – Compare to baseline (previous build or main); block merge if regression above X%; track trend over time.
5. **Tooling** – size-limit for JS/CSS; Lighthouse CI for metrics; custom script for API or resource count; run in consistent environment (e.g. same runner, throttling).
6. **Documentation** – Document budget values and rationale; who owns increases; process for temporary or permanent budget raise.

## Principles

- Budgets should be achievable and measurable; review and adjust with product goals.
- Enforce in CI so regressions are caught before merge.
- Treat budget as a team contract; document and communicate changes.
