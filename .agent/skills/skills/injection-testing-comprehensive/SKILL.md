---
name: injection-testing-comprehensive
description: "Test all injection types: SQL, NoSQL, command, LDAP, XSS, template (SSTI), XXE, CRLF, log, prompt; detection and mitigation."
risk: safe
source: community
---

# Comprehensive Injection Testing

## When to use

Use this skill when the user needs **full coverage of injection vulnerabilities** in apps or APIs. Triggers: "all injections", "injection testing", "SQL NoSQL command LDAP", "SSTI", "XXE", "log injection", "prompt injection", "injection checklist".

## Overview

Systematically test and mitigate every major injection type: SQL, NoSQL, OS command, LDAP, XSS/HTML, template (SSTI), XML (XXE), CRLF/header, log injection, and LLM prompt injection.

## Deliverables

1. **SQL injection** – Parameterized queries; input validation; error handling; use @sql-injection-testing and @sqlmap-database-pentesting for testing.
2. **NoSQL injection** – Mongo/other query operators in user input; sanitize and validate; avoid eval or raw operator injection.
3. **Command / OS injection** – User input in exec, shell, or system calls; allowlists; avoid shell interpolation; use safe APIs.
4. **LDAP injection** – Escape filter special chars; parameterized or safe LDAP APIs; test with malicious filter strings.
5. **XSS / HTML injection** – Output encoding; CSP; use @xss-html-injection for testing; stored, reflected, DOM.
6. **Template (SSTI)** – User input in templates (Jinja, Freemarker, etc.); sandbox or no user-controlled templates; test with expression payloads.
7. **XML (XXE)** – Disable external entities; use safe parser config; test with XXE payloads.
8. **CRLF / header injection** – Validate headers and redirect URLs; no user input in status line or headers without encoding.
9. **Log injection** – Sanitize user input before logging; structured logging; avoid newlines and control chars.
10. **Prompt injection (LLM)** – Separate instructions from user content; output validation; privilege boundaries; use @prompt-injection for design and testing.

## Principles

- One skill to reference all injection types; link to specialized skills (SQL, XSS, prompt) where they exist.
- Prefer allowlists and parameterized/safe APIs over sanitization alone.
- Document which injection types apply to each component and how they are tested.
