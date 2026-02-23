# Release Workflow

Context
- This package uses Vite library build (`npm run build`) and publishes `dist` + `src` as package files.
- Only defined script is `build` -> `node scripts/check-assets.js && vite build`.

Steps
1. Ensure working tree is clean and on the release branch.
2. Bump version in `package.json`.
   - Recommended: `npm version patch|minor|major` (creates git commit + tag).
   - Or edit manually and commit: `git add package.json package-lock.json && git commit -m "chore: bump version"`.
3. Install deps (if needed): `npm install`.
4. Build the library: `npm run build`.
5. Verify package contents locally:
   - `npm pack --dry-run`
   - Confirm `dist/mimir.es.js` and `dist/mimir.umd.cjs` are included.
6. Publish to npm:
   - `npm publish` (add `--access public` if publishing a scoped package for the first time).
7. Push git commits and tags:
   - `git push`
   - `git push --tags`

Notes
- `npm version` will update `package-lock.json` and create a tag like `vX.Y.Z`.
- If you prefer manual tagging: `git tag vX.Y.Z` after the version bump commit.
- There is no release automation configured here; releases are manual.
