> Source snapshot: public PR #1 at `6c098d7add95c6dbd93df7dadea6bd7efd61ee46`. PR status at preparation: OPEN. Commands for PR-added files require that revision; these pages do not imply that the additions are merged into main.

# Synthetic evidence gate

Run `node examples/evidence-gate/run.js` from the repository root. The example imports the actual scoring engine and shipped matrix. All evidence labels are fictional and generated in memory; no files or platforms are modified.

The complete fixture should be accepted by the scorer. A required failure, missing criterion, duplicate criterion and target mismatch should each prevent certification. A failed assertion produces a nonzero exit. The final message explicitly identifies the result as synthetic scorer behavior.

This demonstrates the decision boundary, not the authenticity of evidence. It is useful for understanding why a score and a live certification claim are different. See [evidence limits](https://github.com/jordanmrash/agent-construct-lab/blob/6c098d7add95c6dbd93df7dadea6bd7efd61ee46/docs/EVIDENCE_AND_LIMITATIONS.md).


---
[Source document](https://github.com/jordanmrash/agent-construct-lab/blob/6c098d7add95c6dbd93df7dadea6bd7efd61ee46/examples/evidence-gate/README.md) | [Wiki home](Home)
