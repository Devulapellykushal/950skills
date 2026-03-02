---
name: container-security
description: "Container image scanning, base image choice, non-root user, runtime security, and Kubernetes pod hardening."
risk: safe
source: community
---

# Container Security

## When to use

Use this skill when the user needs **container and image security** for Docker or Kubernetes. Triggers: "container security", "image scanning", "non-root container", "Dockerfile security", "Kubernetes security", "runtime security", "CVE scan image".

## Overview

Harden container images and runtime: minimal base images, vulnerability scanning, non-root user, and sensible defaults for orchestration (e.g. Kubernetes).

## Deliverables

1. **Image build** – Use minimal or distroless base images; multi-stage builds; no secrets in layers; pin versions.
2. **Vulnerability scanning** – Scan images in CI and registry (e.g. Trivy, Snyk); fail or gate on critical/high CVEs; remediate via base upgrade or patching.
3. **Run as non-root** – Define USER in Dockerfile; ensure app and volumes work; adjust file permissions if needed.
4. **Runtime** – Read-only root filesystem where possible; drop capabilities; no privilege escalation; resource limits (CPU/memory).
5. **Kubernetes** – Pod security standards (restricted/baseline); no hostPath or privileged unless justified; network policies; image pull policy and provenance.

## Principles

- Least privilege: minimal base, non-root, least capabilities.
- Scan early and often; treat scan results as actionable.
- Document any exception (e.g. privileged pod) and review periodically.
