> Source snapshot: public PR #1 at `6c098d7add95c6dbd93df7dadea6bd7efd61ee46`. PR status at preparation: OPEN. Commands for PR-added files require that revision; these pages do not imply that the additions are merged into main.

# Evidence and limitations

## Reproducible from this checkout

The adapter self-test checks JSON and mapping invariants. The scoring self-test exercises accepted and rejected result sets. The evidence-gate example demonstrates the distinction between complete synthetic evidence and invalid or failing evidence. The release gate runs these checks and reports their outcomes.

## Not established

- Live behavioral equivalence across the five target platforms.
- Authentication or provenance of a submitted evidence producer.
- Runtime enforcement of every governance declaration.
- Installation of a complete agent from this public checkout.
- End-to-end operation of every Release 4 assembly and handoff utility.

## Naming is not proof

A filename containing `certified`, an adapter listing a platform, or a scorer returning `certified: true` for fictional evidence must not be represented as independent platform certification. The synthetic example deliberately makes this boundary visible.

## Evidence required for a stronger claim

Proposed acceptance evidence includes a fresh target deployment, exact construct and adapter revisions, independently captured positive and negative cases, authentic operation receipts and reproducible scoring output. Those are roadmap criteria, not evidence already supplied here.

## Public safety

The repository does not need private logs, tenant identifiers, client data or live endpoints to explain its contracts. Preserve negative results and unresolved gaps. A green offline gate covers only its declared scope, described in [release checks](https://github.com/jordanmrash/agent-construct-lab/blob/6c098d7add95c6dbd93df7dadea6bd7efd61ee46/docs/RELEASE_CHECKS.md).


---
[Source document](https://github.com/jordanmrash/agent-construct-lab/blob/6c098d7add95c6dbd93df7dadea6bd7efd61ee46/docs/EVIDENCE_AND_LIMITATIONS.md) | [Wiki home](Home)
