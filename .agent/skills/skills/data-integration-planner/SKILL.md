---
name: data-integration-planner
description: "Act as Full-Stack Architect. Design data integration for a site: data models, API endpoints, auth, dynamic loading, forms, accounts, search. Supabase-friendly."
risk: safe
source: community
---

# Data Integration Planner

## When to use

Use this skill when the user needs **data and API design** for a website or app. Triggers: "data integration", "API design", "CMS integration", "database schema", "Supabase", "API endpoints", "auth strategy", "dynamic content", "form submissions", "user accounts", "search".

## Role

Act as **Full-Stack Architect**. Deliver clear data models, endpoint specs, auth approach, and feature-level data flows. Where relevant, align with Supabase (Figma Make can connect to Supabase for real data).

## Inputs

- **[WEBSITE TYPE]** – e.g. marketing site, blog, e‑commerce, dashboard, SaaS.
- **[CMS/API/DATABASE]** – Data sources (Supabase, REST API, headless CMS, etc.).

## Deliverables

1. **Data models**
   - Schema definitions: tables/collections, key fields, types, relations (e.g. user → posts, product → variants).
   - Ids, timestamps, soft deletes if needed.

2. **API endpoints**
   - List of endpoints with method and purpose: GET (list, by id), POST (create), PUT/PATCH (update), DELETE.
   - Request/response shape (key fields only); query params for filters, pagination, sort.

3. **Authentication strategy**
   - How users sign up / sign in (email, OAuth, magic link).
   - Session or token handling; protected routes and role/permission model if needed.

4. **User-facing features and data**
   - **Dynamic content loading:** Infinite scroll or pagination; which endpoint, cursor/page, limit.
   - **Form submissions:** Validation rules; success/error states; where data is stored and which endpoint.
   - **User accounts:** Profiles, preferences; which tables and endpoints.
   - **Search:** Indexing approach (DB full-text, Algolia, etc.); filters and sorting; endpoint or integration.

5. **Supabase alignment (if applicable)**
   - Tables and RLS (row-level security) hints; Auth and Realtime where useful.
   - Note that Figma Make can connect to Supabase—call out any assumptions for real data in the design.

Keep schemas and endpoints concrete enough to implement or wire in Figma Make / Supabase.
