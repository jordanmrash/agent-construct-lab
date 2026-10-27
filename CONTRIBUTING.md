# Contributing to ACL

This public tree focuses on Release 4 constructs, adapter descriptions and evidence evaluation. Contributions should explain which contract or utility changes and how a reader can reproduce the result from a fresh public checkout.

## Local validation

Run `python scripts/release_check.py` with Python 3.11 and Node.js available. Include accepted and rejected synthetic cases for changes to evaluation behavior. Review the diff and preserve unresolved limitations. The gate does not certify live platform operation or full schema validity.

## Pull requests

Describe the problem, changed files, reproducible command and observed result. Keep documentation aligned with the actual public tree. Do not claim packaged runtimes, operated platforms or CI results without evidence. A new adapter mapping is not a live integration.

## Public data

Use fictional fixtures. Keep private databases, credentials, client data, tenant settings, operational logs and machine-specific configuration outside the public repository. The automated scanner checks selected patterns only; manual review is still necessary.

## Documentation and support

Use the [documentation index](docs/README.md), [release-check scope](docs/RELEASE_CHECKS.md), [security page](SECURITY.md) and [support page](SUPPORT.md). Proposed future capabilities belong in the [roadmap](docs/ROADMAP.md), not in current capability claims.
