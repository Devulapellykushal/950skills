---
name: supply-chain-security
description: "SBOM generation, dependency and container image signing, vulnerability scanning in CI, and attestations for secure supply chain."
risk: safe
source: community
---

# Supply Chain Security

## When to use

Use this skill when the user needs **supply chain security** for dependencies or container images. Triggers: "SBOM", "software bill of materials", "dependency scanning", "container image signing", "attestation", "supply chain", "lockfile", "vulnerability scan CI", "SLSA", "sigstore".

## Overview

Secure the software supply chain by generating and consuming SBOMs, scanning dependencies and images in CI, and using attestations and signing where applicable.

## Deliverables

1. **SBOM (Software Bill of Materials)** – Generate SPDX or CycloneDX for applications and container images; integrate into CI and artifact storage.
2. **Dependency scanning** – Use lockfile and registry data to find known vulnerabilities; fail or warn in CI; suggest upgrades and patches.
3. **Container image security** – Base image choice, image scanning (CVEs), non-root user, minimal layers; signing and verification (e.g. sigstore/cosign).
4. **Attestations** – Build provenance and attestations (what was built, from what source); verify before deploy.
5. **CI integration** – Where to run scans (PR, main, release); gates and reporting; no secrets in SBOM or attestations.

## Principles

- Prefer signed artifacts and verified attestations for critical paths.
- SBOM and scan results should be stored and available for audit.
- Document which tools and formats the team uses (e.g. Syft, Grype, Trivy, SPDX).
