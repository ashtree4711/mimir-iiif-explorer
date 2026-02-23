# Library Spec: mimir-iiif-explorer

Public exports
- Package exports: import -> dist/mimir.es.js, require -> dist/mimir.umd.cjs (see package.json exports).
- Entry: src/index.js re-exports `MimirExplorer` as named and default export from src/mimir.js.
- Browser global fallback: `window.MimirExplorer` assigned when window is available.

Expected options (constructor)
- `primaryColor` (string, default `#451F8D`): used to set CSS var `--mimir-primary`.
- `darkMode` (string, default `auto`): `auto`, `light`, `dark`, or `app`.
- `logoUrl` (string, default light logo asset).
- `logoUrlDark` (string, default dark logo asset; falls back to `logoUrl`).
- Any other options are ignored unless added in src/mimir.js.

Initialization flow
- `new MimirExplorer(containerId, options)` looks up the container via `document.getElementById`.
- If container missing: logs error and returns without initialization.
- Merges options with defaults; sets `--mimir-primary` on the container.
- Replaces container `innerHTML` with the full app layout markup.
- Caches element refs; initializes dark mode; injects styles; binds toolbar, layout, and tab events.
- Hides panels, resets layout, shows initial “Ready to Explore” message.

Side effects
- Injects a `<style id="mimir-styles">` tag into `document` once.
- Mutates the provided container’s DOM and CSS variables.
- Attaches many event listeners to UI controls.
- Imports `@google/model-viewer`, which registers the custom element globally.
- Creates/tears down OpenSeadragon instances during runtime.

CSS/assets expectations
- The component expects the host container to have explicit size; internal root uses `position: absolute; inset: 0`.
- CSS is injected dynamically; no external stylesheet required.
- Uses embedded SVG icons from `@tabler/icons` via `?raw` and local assets from `src/assets` (logos, CC icons).
- Uses `font-family: 'Instrument Sans', ui-sans-serif, system-ui, sans-serif`; app does not load the font.
