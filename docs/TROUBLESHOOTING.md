# Troubleshooting

## Adapter self-test cannot find its files

Run the current public checkout. The test resolves Release 4 beside its own script, avoiding the older private-workspace assumption. A missing adapter file remains a real checkout problem; do not create a fake adapter to obtain a pass.

## JavaScript checks cannot start

Verify Node.js is available in the current shell. Python alone cannot execute the JavaScript checks. The gate reports subprocess failures rather than treating an unavailable runtime as success.

## JSON parses but a schema consumer refuses it

Parsing establishes valid JSON syntax only. The published schema metadata contains sanitized URL placeholders. Full schema validation and metadata normalization are not part of this gate.

## A fixture passes but the platform is untested

That is expected. The example measures scorer behavior with fictional result records. It makes no platform calls. Obtain independently verified target evidence before claiming operated support.

## Another utility asks for private workspace inputs

Not every shipped utility is portable or executed by the offline gate. Inspect its source and input contract. Do not point it at production data merely to satisfy an assumed directory layout.

## Disclosure or link check fails

Review the named file. Remove private material rather than weakening the scanner to publish it. For local links, check filename case and target existence; the gate does not verify anchors or external URLs.
