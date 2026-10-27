> Source snapshot: public PR #1 at `6c098d7add95c6dbd93df7dadea6bd7efd61ee46`. PR status at preparation: OPEN. Commands for PR-added files require that revision; these pages do not imply that the additions are merged into main.

# Getting started with the public ACL tree

## Prerequisites

Use a fresh checkout of this public repository, Node.js and Python 3.11. No tenant, tunnel, signed-in browser or cloud account is required for the included synthetic checks. The CI workflow selects Node.js 20; other versions are not established by that workflow.

## First run

```sh
node examples/evidence-gate/run.js
python scripts/release_check.py
```

The example reports named checks and exits nonzero when an assertion fails. The gate prints a JSON report whose `passed` field covers only the listed checks. It does not deploy adapters, call platform APIs or populate missing operational evidence.

## Inspect the artifacts

Read `release4/agent-construct.schema.json`, then one `*.adapter.json`, then `behavioral-equivalence-matrix.json`. Follow the [contract reference](https://github.com/jordanmrash/agent-construct-lab/blob/6c098d7add95c6dbd93df7dadea6bd7efd61ee46/docs/CONTRACTS.md) to distinguish an intended capability from its mapping and its evidence. A construct is a description; an adapter is a mapping; neither is an installed tool.

## Safe experimentation

Change synthetic evidence in the example, not private operational records. A required failure should prevent the scorer from certifying its fixture even when other criteria pass. A missing result should be reported as a problem. Keep examples in memory or in temporary directories and review all proposed public data before committing.

## What setup does not provide

This checkout does not supply the private workspace layout assumed by some older utilities. The adapter self-test now resolves its shipped files beside itself. Other Release 4 utilities may still require external workspace inputs; the offline gate does not execute every utility. See [troubleshooting](https://github.com/jordanmrash/agent-construct-lab/blob/6c098d7add95c6dbd93df7dadea6bd7efd61ee46/docs/TROUBLESHOOTING.md) before treating a missing input as a platform failure.


---
[Source document](https://github.com/jordanmrash/agent-construct-lab/blob/6c098d7add95c6dbd93df7dadea6bd7efd61ee46/docs/GETTING_STARTED.md) | [Wiki home](Home)
