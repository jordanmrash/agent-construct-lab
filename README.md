# Agent Construct Lab (ACL)

**A reference laboratory for describing an agent once, mapping it to platform adapters, and testing the evidence used to judge compatibility.** The public tree contains Release 4 contracts and evaluation utilities. It does not install a complete workspace agent or establish live behavioral equivalence across platforms.

## See the evidence boundary first

With Node.js installed, run from the repository root:

```sh
node examples/evidence-gate/run.js
```

The example creates fictional evidence in memory and calls the shipped scoring engine. It checks a complete synthetic set, a required failure, a missing result, a duplicate result and a target mismatch. Nothing is deployed and no real platform evidence is generated. The example distinguishes a scorer accepting a fixture from a platform earning certification.

## Why this exists

A platform name is not a behavioral guarantee. A portable agent needs a shared description, explicit tool mappings, approval requirements and evidence that the target preserves the intended contract. ACL makes those artifacts inspectable rather than hiding compatibility assumptions in prompts.

## Start here

- [Getting started](docs/GETTING_STARTED.md): prerequisites, runnable commands and expected boundaries.
- [Architecture](docs/ARCHITECTURE.md): construct, adapter, evidence and scoring responsibilities.
- [Contract reference](docs/CONTRACTS.md): fields and source files to inspect.
- [Evidence and limitations](docs/EVIDENCE_AND_LIMITATIONS.md): what is shipped, what is measured and what is not established.
- [Troubleshooting](docs/TROUBLESHOOTING.md): clean-checkout failures and interpretation errors.
- [Roadmap](docs/ROADMAP.md): proposed next work and acceptance evidence.
- [Release checks](docs/RELEASE_CHECKS.md): repeatable offline gate and blind spots.
- [Example walkthrough](examples/evidence-gate/README.md): accepted and rejected fixtures.

## Repository map

`release4/` contains schemas, five target adapter descriptions, a behavioral equivalence matrix, an evidence template, scoring utilities and handoff utilities. `examples/` contains the public synthetic demonstration. `scripts/` contains the offline gate. `docs/` explains the public contracts and boundaries. `CoworkConfig/` and `Startup/` currently contain overview pages, not a complete packaged runtime.

## Validation

```sh
python scripts/release_check.py
```

Python 3.11 and Node.js are required for this gate. It parses source, checks selected disclosure patterns and local links, and runs the adapter, scoring and example checks. [Scope and exclusions](docs/RELEASE_CHECKS.md) matter as much as the exit code.

## Relationship to AoR and Helo

AoR is the operating-foundation reference; ACL focuses on portable constructs and adapter evidence; Helo focuses on isolated memory and procedural lessons. Shared design concerns do not make the projects interchangeable. This repository does not inherit either project's private memory or operational evidence.

## Status and contribution

Reference source, not a hosted service or an official platform product. The presence of a file named `certified-workspace-agent.construct.json` is not independently verified certification. See [evidence limits](docs/EVIDENCE_AND_LIMITATIONS.md), [contribution guidance](CONTRIBUTING.md), [security](SECURITY.md) and [support](SUPPORT.md).
