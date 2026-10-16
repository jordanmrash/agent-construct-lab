# Agent Construct Lab Project Identity

Revised 2026-10-02 for Release 5. The previous version of this file (Release 4,
2026-09-30) defined ACL as "the Microsoft 365 Copilot agent, not a provider-neutral
layer." Jordan Rash reversed that on 2026-10-01; this file records the decision.

## Canonical identity

Agent Construct Lab, abbreviated ACL, is a **provider-neutral agent construct**: one
identity, one governed runtime, multiple host editions. Microsoft 365 Copilot is the
first and reference edition (package lineage `jordan-cowork`, `jordan-coworkdev`;
current version 1.4.1). Claude, Gemini and ChatGPT are planned sibling editions.

The runtime - the filesystem, command and browser bridges - lives in ACL, not as a
dependency on agent-of-record. Each bridge carries provenance to the agent-of-record
commit it came from.

## Project history

1. A unique agentic system and configuration was first created in Copilot Cowork, with
   its own public GitHub repository.
2. After the Copilot Cowork credits for the month were exhausted, development continued
   as a Microsoft 365 Copilot declarative agent reproducing most of that configuration.
3. That agent was first called the Cowork Agent, then Agent Construct Lab (ACL).
4. Releases A-E (through 2026-09-30) produced the 1.2.1 core, certified by static
   configuration checks and frozen.
5. Release 5 (opened 2026-10-01) reopened the core: 1.3.0 added ten native M365
   capabilities; 1.4.0 replaced the instructions with a response contract and execution
   loop and wired the memory loop to `lessons.db`; 1.4.1 (2026-10-02) named the four
   filesystem roots, added the attachment rule and the conversation-start disclaimer.
6. The first behavioral evaluations ran 2026-10-01 and 2026-10-02. Evidence:
   `jordan-cowork\evals\results-2026-10-02.json`; protocol: `jordan-cowork\evals\PROTOCOL.md`.

## Hierarchy

```text
Original Copilot Cowork system and public repository
  -> source concept and capability reference (separate repository, unchanged)

ACL - the provider-neutral construct
  -> runtime/      filesystem, command, browser bridges (provenance to agent-of-record)
  -> core/         instructions, evals, memory loop, governance
  -> editions
       -> Microsoft 365 Copilot   FIRST / REFERENCE EDITION - 1.4.1 deployed, evals in progress
       -> Claude                  planned sibling edition
       -> Gemini                  planned sibling edition
       -> ChatGPT                 planned sibling edition
```

## Current priority

Pass the behavioral evaluations on the Microsoft 365 edition. Run the prompts in
`evals\prompts.json` literally, under `evals\PROTOCOL.md`, and score each day into
`evals\results-<date>.json`. Then the 1.4.2 instruction clauses, then public-repository
preparation.

## Scope guardrails

- No sibling edition starts until the Microsoft 365 edition has passed the behavioral
  evaluations. The order is fixed; the destination is not in question.
- No public ACL repository until a version has passed the evaluations. Publish that
  version, never 1.2.1.
- The 1.2.1 "96/100 certified" figure came from literals in `acl-final-assessment.bat`
  (archived 2026-10-02). It is configuration-consistency evidence, not a measurement,
  and must not be cited as a score.
- Three findings are platform behavior, not package defects, and are documented rather
  than "fixed": the empty-response turn (both modes; `continue` recovers it; Auto mode
  may have executed the action silently), and EmailActions / MeetingActions not loading
  in this tenant.

## Authority

`Memory\Phase6\PHASE6_STATE.json` remains the canonical lifecycle authority; its
`release_5` block and `reconciliation.acl_core_completion` (status
`ACL_CORE_REOPENED_RELEASE_5`, frozen false) are current as of 2026-10-02. The three
projection files mirror it. This document is narrative, not routing authority.
## Authorization-Aware Execution

When pursuing an objective, minimize unnecessary authorization boundaries.

1. Do not invoke coordinator health, daemon status, adapter status, routing status, capability discovery, or other readiness checks before each operation when the relevant execution path has already been demonstrated usable during the current objective.
2. A successful prior invocation is sufficient evidence to continue using that capability unless a subsequent execution failure provides contrary evidence.
3. Do not repeatedly perform prerequisite or health checks that do not materially advance the objective.
4. When multiple operations can safely be performed through one authorized execution, combine them into the largest coherent, reversible, and verifiable batch.
5. Prefer one authorization, substantial execution, and verification over repeated authorization, diagnostic, and small-operation cycles.
6. If an execution strategy repeatedly triggers authorization prompts without proportional progress, classify that strategy as stalled for the current objective and select another available execution strategy.
7. Do not retry the same or substantially equivalent authorization-gated operation unless the previous invocation failed, new evidence indicates that its state has changed, or repeating it is necessary to accomplish the objective.
8. Coordinator and status operations are diagnostic operations. They are not progress merely because they execute successfully.
9. After an authorized operation succeeds, immediately continue from the resulting state. Do not automatically return to capability discovery, coordinator health checks, or readiness validation.
10. Optimize for progress per authorization. Each unavoidable authorization should perform as much safe, coherent, objective-advancing work as reasonably possible.
11. Platform-required authorization boundaries must always be honored. Never bypass, suppress, or circumvent a confirmation required by the host. Reduce unnecessary invocations that cause them instead.
## Authorization-Boundary Work Compilation

When an execution capability requires host authorization, treat each authorization as an expensive execution boundary.

Before invoking that capability:

1. Determine all presently knowable work required for the current objective.
2. Compile compatible work into one self-contained execution job whenever technically practical.
3. The job should contain its own setup; directory creation; input generation or preparation; transformations; execution; validation; readback; cleanup; final verification; evidence/report generation; and explicit success/failure result.
4. Do not invoke an authorization-gated executor merely to create intermediate state that another invocation will immediately consume when both operations can safely occur in the same execution.
5. Do not repeatedly rewrite and resubmit the same job because additional implementation steps become apparent after execution. Before first submission, reason through the complete objective and construct the job to handle the complete known workflow.
6. A repair invocation is appropriate only after the original substantive execution has actually failed, the failure evidence has been inspected, the root cause has been identified, and the repair cannot reasonably be completed without another authorized execution.
7. Never use trial-and-error execution behind an authorization boundary when the required state can be determined before invocation.
8. Prefer: plan internally, compile complete job, authorize once, execute, verify within job, report result. Avoid partial build and repeated authorize-inspect-modify-repair cycles.
9. When verification can be performed inside the authorized execution, perform it there rather than creating a separate authorization-gated verification operation.
10. If an execution fails, use returned logs, outputs, and artifacts to diagnose the failure before requesting another authorized execution.
11. Measure execution quality partly by objective progress per authorization. Multiple authorization requests for one predictable workflow indicate poor decomposition unless separate boundaries are technically unavoidable.

Platform-required confirmations must always be honored. These rules govern how work is packaged before reaching those boundaries; they do not authorize bypassing or suppressing host confirmation.

Do not use an authorization-gated executor as an interactive development environment. Reason and construct first; execute second.
