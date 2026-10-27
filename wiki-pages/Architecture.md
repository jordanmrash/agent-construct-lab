> Source snapshot: public PR #1 at `6c098d7add95c6dbd93df7dadea6bd7efd61ee46`. PR status at preparation: OPEN. Commands for PR-added files require that revision; these pages do not imply that the additions are merged into main.

# Architecture and trust boundaries

## Four separate responsibilities

1. The construct describes purpose, capabilities, components, governance, memory, evaluation and target platforms.
2. Each adapter describes a target-specific mapping from the canonical input contract to tool and validation expectations.
3. The equivalence matrix supplies the criteria used to assess platform evidence.
4. The scoring engine judges supplied result records against that matrix.

The public tree ships these descriptions and utilities. It does not authenticate evidence producers or demonstrate that a target actually invoked every mapped tool.

## Data flow

A construct is paired with a target adapter. An evaluator gathers result records for the matrix criteria. The scorer receives the matrix and evidence object, then returns a score, certification decision and problems. The synthetic example supplies those records itself to exercise the decision logic. Its evidence strings are fictional labels, not live receipts.

## Governance boundary

Approval, evidence and rollback fields are declared in the construct schema. Adapter validation flags are checked by the adapter self-test. A declaration is not runtime enforcement. Enforcement needs an actual host/tool boundary and negative tests that show prohibited actions are refused there.

## Portability boundary

The shipped adapter targets are Microsoft 365, Claude, ChatGPT, Gemini and open-runtime. Target coverage in a JSON file is not operated support. The scoring tests exercise result consistency, not model behavior, connector availability or host permissions.

## Publication boundary

Public contracts and synthetic demonstrations are separate from private workspaces, live receipts and machine configuration. The new gate checks selected disclosure patterns, but manual review remains necessary. See [release checks](https://github.com/jordanmrash/agent-construct-lab/blob/6c098d7add95c6dbd93df7dadea6bd7efd61ee46/docs/RELEASE_CHECKS.md) and [evidence limits](https://github.com/jordanmrash/agent-construct-lab/blob/6c098d7add95c6dbd93df7dadea6bd7efd61ee46/docs/EVIDENCE_AND_LIMITATIONS.md).


---
[Source document](https://github.com/jordanmrash/agent-construct-lab/blob/6c098d7add95c6dbd93df7dadea6bd7efd61ee46/docs/ARCHITECTURE.md) | [Wiki home](Home)
