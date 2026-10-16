# Agent Construct Lab (ACL)

Agent Construct Lab is a governed workspace automation project for constructing, validating, and testing portable agent constructs and platform adapters.

## Repository layout

- `release4/` - current ACL schemas, adapters, validation utilities, and project identity.
- `docs/` - project documentation.
- `examples/` - safe examples and demonstrations.
- `scripts/` - repository maintenance and validation scripts.
- `CoworkConfig/` - portable workspace configuration surface.
- `Startup/` - startup/bootstrap assets when required.
- `.github/` - GitHub community and repository metadata.

## Validation

The Release 4 utilities are designed to validate construct schemas, platform evidence, behavioral equivalence, adapter contracts, and certification handoffs. Machine-specific state and internal execution evidence are intentionally excluded from the public repository.

## Security

Do not commit secrets, credentials, browser state, machine-specific paths, private workspace logs, or internal-only status artifacts. See `SECURITY.md`.

## Contributing

See `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`.