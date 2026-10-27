# Synthetic evidence gate

Run `node examples/evidence-gate/run.js` from the repository root. The example imports the actual scoring engine and shipped matrix. All evidence labels are fictional and generated in memory; no files or platforms are modified.

The complete fixture should be accepted by the scorer. A required failure, missing criterion, duplicate criterion and target mismatch should each prevent certification. A failed assertion produces a nonzero exit. The final message explicitly identifies the result as synthetic scorer behavior.

This demonstrates the decision boundary, not the authenticity of evidence. It is useful for understanding why a score and a live certification claim are different. See [evidence limits](../../docs/EVIDENCE_AND_LIMITATIONS.md).
