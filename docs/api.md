# API

This document describes the currently supported integration surface of `@mimir-iiif/explorer`.

Important scope note
- `MimirExplorer` exposes a few practical public entry points, but the project does not yet maintain a large formally versioned API.
- Methods and state not documented here should be treated as internal implementation details.

## Import

```js
import MimirExplorer from '@mimir-iiif/explorer';
```

The package also exposes a browser-global fallback as `window.MimirExplorer` when loaded directly in a browser context.

## Constructor

```js
const explorer = new MimirExplorer('mimir-container', options);
```

Parameters
- `containerId`: required DOM id of the host element.
- `options`: optional configuration object.

Container expectations
- The container must already exist in the DOM.
- The viewer renders its complete UI into that container.
- The container should have a meaningful width and height from the host layout.
- If the host does not provide height, the viewer applies a defensive minimum height so it still remains visible.

## Options

### Core options

- `primaryColor: string`
  Default: `#451F8D`
  Used as the main accent color across controls and highlights.

- `darkMode: 'auto' | 'light' | 'dark' | 'app'`
  Default: `'auto'`
  Controls how the viewer resolves its light/dark theme.

  Meanings:
  - `'auto'`: follows `prefers-color-scheme`.
  - `'light'`: forces light mode.
  - `'dark'`: forces dark mode.
  - `'app'`: follows host-app theme state and expects the host to manage that state.

- `logoUrl: string`
  Default: bundled light logo
  Used in the empty state and watermark for light mode.

- `logoUrlDark: string`
  Default: bundled dark logo
  Used in the empty state and watermark for dark mode.

### Viewer behavior options

- `viewerLanguages: string[]`
  Default: `['it', 'fr', 'de', 'en', 'es', 'nl']`
  Supported UI language choices for the viewer chrome.

- `collectionPageSize: number`
  Default: `24`
  Minimum enforced size is `6`.

- `collectionViewMode: 'grid' | 'list'`
  Default: `'grid'`
  Initial presentation mode for collection members.

- `osdUseAjax: boolean`
  Default: `true`
  Passed through to OpenSeadragon tile loading.
  Set to `false` when the target image server does not behave well with AJAX tile requests.

- `debug: boolean`
  Default: `false`
  Enables additional console logging around viewer initialization and OpenSeadragon behavior.

## Public methods

### `loadManifest(url)`

```js
await explorer.loadManifest('https://example.org/iiif/manifest.json');
```

Loads a IIIF Presentation manifest from a URL, parses it into the internal normalized model, and renders the appropriate experience.

Behavior
- Supports IIIF Presentation v2 and v3.
- Auto-detects image, AV, 3D, and collection-oriented manifests.
- Resolves IIIF Content State style entry manifests when encountered.
- Rebuilds viewer state before rendering the new manifest.

On failure
- Logs an error to the console.
- Shows an inline viewer error message.

### `loadCollectionMembers(collectionId, collectionLabel = '')`

Loads a collection into the collection sidebar panel.

This is primarily useful for host-side custom integrations. Most consumers should let the built-in collection links trigger this automatically.

### `setDarkMode(isDark)`

```js
explorer.setDarkMode(true);
explorer.setDarkMode(false);
```

Explicitly forces the rendered viewer chrome into dark or light mode.

Use this when:
- the host owns theme state
- you do not want to rely on `prefers-color-scheme`
- you want to keep the viewer synchronized with a host toggle

### `parseManifest(manifest)`

Accepts a manifest object and returns the normalized internal representation used by the renderer.

This is useful for debugging, tests, or custom host-side inspection, but should still be treated as semi-internal because the normalized shape may evolve over time.

### `resetExplorers()`

Resets the currently rendered viewer state.

This exists and is used internally before loading a new manifest. Consumers generally should not need it unless building a custom host workflow around explicit viewer teardown and reload.

## Theme integration

Recommended patterns
- Use `darkMode: 'auto'` for standalone embeds.
- Use `darkMode: 'app'` when the host app owns theme state.
- In `app` mode, also provide a host-side `window.toggleDarkMode()` if you want the viewer's own dark-mode button to delegate back into the app.

Current implementation details
- In `app` mode, the viewer checks whether `html.dark` or `body.dark` is present.
- If `window.toggleDarkMode()` exists, the viewer's own dark-mode toggle calls it.
- Otherwise the viewer falls back to toggling only its own internal theme state.

## Host-side globals

Optional globals the viewer will use when available
- `window.toggleDarkMode()`
  Used by the viewer's own dark-mode buttons to ask the host app to switch theme state.

Exposed global from the package
- `window.MimirExplorer`
  Added automatically in browser environments as a direct-download fallback.

## Not yet formalized

The following areas are intentionally not documented as stable public API yet
- direct DOM hooks inside the viewer
- internal `this.els` references
- internal normalized state fields beyond the documented model
- cookie key formats for bookmarks
- renderer-specific helper methods
