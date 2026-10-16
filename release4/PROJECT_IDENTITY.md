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
