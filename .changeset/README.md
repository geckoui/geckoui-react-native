# Changesets

This folder is managed by [`@changesets/cli`](https://github.com/changesets/changesets).

## Workflow

```sh
# 1. After making changes, create a changeset
pnpm changeset
# → pick which packages changed, choose patch/minor/major, write a summary

# 2. When ready to release
pnpm bump             # consumes pending changesets, bumps versions, updates per-package CHANGELOGs
pnpm release          # runs build, then publishes bumped packages to npm
```

## Notes

- `playground` is ignored — it's an Expo app, not a publishable package
- `access: public` ensures scoped packages (`@geckoui/*`) are published as public
- `updateInternalDependencies: patch` bumps cross-package workspace deps when one shifts

For full docs see https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md
