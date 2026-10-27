> Source snapshot: public PR #1 at `6c098d7add95c6dbd93df7dadea6bd7efd61ee46`. PR status at preparation: OPEN. Commands for PR-added files require that revision; these pages do not imply that the additions are merged into main.

# Contract reference

## Construct: agent-construct.schema.json

The schema requires `schema_version`, `id`, `name`, `purpose`, `capabilities`, `components`, `governance`, `memory`, `evaluation` and `targets`. The declared version is 1.0.0. Governance contains approval policy, prohibited actions, evidence requirement and rollback requirement. Memory contains durable-memory, incident-learning and promotion-review flags. Evaluation contains a shared-suite identifier and a minimum score.

These fields describe the intended construct. The public gate parses JSON but does not perform full JSON Schema validation. Schema metadata in the published tree includes sanitized URL placeholders; a generic schema resolver may need separately reviewed metadata repair before use.

## Adapter: platform-adapter.schema.json and *.adapter.json

The adapter self-test checks the five target set, unique adapter identifiers, canonical `input_contract`, filesystem/command/browser mapping presence, and required validation flags. Those checks are structural contract checks, not a handshake with any host. Inspect the schema and each adapter before relying on a mapping.

## Evidence: platform-evidence.schema.json

The scoring example uses `construct_id`, `target` and `results`. Each result has `criterion_id`, `status` and an evidence list. The matrix is the source for criterion identifiers. Inventing an identifier, omitting a criterion or repeating one is not equivalent to supplying valid evidence.

## Scoring: score-platform-evidence.js

The public example imports `score(matrix, evidence)`. It reads the shipped matrix, constructs fictional result records and checks the returned `certified` decision and problem handling. The scoring regression suite additionally checks a complete fixture and required-failure arithmetic. Neither test establishes authenticity or sufficiency of real-world evidence.

## Other utilities

The tree also contains evidence assembly, compatibility-manifest generation and Claude handoff/kit validation utilities. They are not all executed by the new offline gate. Their external inputs and private-workspace assumptions require separate review. Do not infer their operational readiness from syntax checks.


---
[Source document](https://github.com/jordanmrash/agent-construct-lab/blob/6c098d7add95c6dbd93df7dadea6bd7efd61ee46/docs/CONTRACTS.md) | [Wiki home](Home)
