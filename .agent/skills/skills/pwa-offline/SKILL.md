---
name: pwa-offline
description: "Service worker, caching strategies, offline fallback, and installability for progressive web apps."
risk: safe
source: community
---

# PWA & Offline

## When to use

Use this skill when the user needs **PWA or offline** behavior for a web app. Triggers: "PWA", "offline", "service worker", "cache strategy", "install app", "workbox", "manifest".

## Overview

Implement reliable offline and installability: service worker, caching strategies, offline fallback, and web app manifest.

## Deliverables

1. **Service worker** – Register with scope; lifecycle (install, activate, fetch); use Workbox or vanilla; update strategy (skipWaiting, clients.claim); version and cache names for safe updates.
2. **Caching strategies** – Cache-first for static assets; network-first or stale-while-revalidate for API; precache shell; runtime cache for images/dynamic; max entries and age to avoid quota.
3. **Offline fallback** – Offline page or in-app message; serve from cache when network fails; optional offline queue for forms (submit when back online).
4. **Manifest** – name, short_name, start_url, display (standalone), icons (192, 512), theme_color, background_color; link from index; validate with Lighthouse.
5. **Installability** – Criteria (HTTPS, manifest, SW, icons); beforeinstallprompt for custom install UI; track install and engagement.
6. **Testing** – Test offline in DevTools; test update flow; test on real devices; measure Core Web Vitals with SW.

## Principles

- Prefer Workbox for maintainability; document custom strategies.
- Cache version must change when assets change; avoid stale shell.
- Offline experience should degrade gracefully; never block critical path on SW.
