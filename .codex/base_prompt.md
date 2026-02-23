# Base Prompt for mimir-iiif-explorer

Project identity
- Name: mimir-iiif-explorer
- Purpose: IIIF explorer/viewer library (image, presentation, AV, 3D) built on OpenSeadragon.
- Runtime deps: openseadragon, @google/model-viewer, @tabler/icons.
- Tooling: Vite library build (ESM + UMD) with ES module package type.

Build outputs
- Library entry: src/index.js -> src/mimir.js.
- Outputs: dist/mimir.es.js (ESM) and dist/mimir.umd.cjs (UMD/CJS wrapper).
- Package exports: import uses dist/mimir.es.js, require uses dist/mimir.umd.cjs.
- Build script: node scripts/check-assets.js && vite build.
- Published files: dist and src.

Consumer model
- Consumed as a library: import { MimirExplorer } from 'mimir-iiif-explorer' or default import.
- Expected use: instantiate in browser with a container id and options; class builds its own DOM and styles.
- No framework assumptions; direct DOM manipulation and OpenSeadragon integration.

Coding conventions
- Plain JavaScript (ES modules), no TypeScript.
- Classes with instance state; constructor sets up options, UI, and default state.
- 4-space indentation, semicolons, single quotes.
- Prefer clear, descriptive names (e.g., MimirExplorer, currentManifest).
- UI markup built via template strings in JS; assets imported as URLs or raw SVG.
- Keep changes compatible with Vite library build and existing exports.
