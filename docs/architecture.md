# Architecture

This document gives a practical mental model of how `MimirExplorer` is organized.

## High-level flow

1. A host app creates `new MimirExplorer(containerId, options)`.
2. The constructor prepares state, injects the full viewer DOM, wires UI handlers, and initializes theme behavior.
3. The host calls `loadManifest(url)`.
4. The viewer fetches the manifest, normalizes it through `parseManifest()`, detects the effective content type, and renders the matching mode.
5. Secondary resources such as annotation pages and OCR/fulltext sources are fetched after the first render and progressively enrich the UI.

## Main responsibilities in `src/mimir.js`

### 1. Shell and UI bootstrapping

The constructor is responsible for:
- validating the host container
- storing options
- injecting the main DOM structure
- collecting DOM references into `this.els`
- injecting the viewer stylesheet
- wiring toolbar and panel behavior
- initializing dark mode behavior

This file intentionally keeps the project as a single embeddable library entry point rather than splitting the runtime across many modules.

### 2. Manifest normalization

`parseManifest()` transforms IIIF Presentation v2 and v3 manifests into a single normalized representation stored on `this.currentParsed`.

Important outputs include:
- canvases
- image sources
- AV items
- 3D model items
- outline ranges
- collection members and collection links
- annotations by canvas
- fulltext and ALTO/HOCR references
- language metadata
- start canvas and start time
- sequence options

The normalized model is documented internally for maintainers and is intentionally not part of the public package documentation surface.

### 3. Content-type detection

After normalization, the viewer chooses one of the main rendering branches:
- `image`
- `av`
- `3d`
- `collection`
- `unknown`

Collection is treated as a first-class mode and can override pure media heuristics.

### 4. Rendering branches

#### Image rendering

`renderImage()` handles:
- OpenSeadragon initialization
- page navigation
- single page, book mode, and continuous mode
- region focus
- image filters and transforms
- overlay synchronization

#### AV rendering

`renderAV()` handles:
- audio and video media element creation
- transport controls
- volume and timeline controls
- optional placeholder/accompanying visuals
- start-time support

#### 3D rendering

`render3D()` handles:
- Three.js scene setup
- model loading
- camera and orbit controls
- lighting and exposure controls
- model-specific toolbar state

#### Collection rendering

`renderCollection()` handles:
- collection member gallery/list views
- pagination
- manifest link-through behavior
- collection-to-manifest navigation

## Progressive enrichment

Some data is rendered immediately from the manifest, while other data is resolved after initial paint.

### Annotation pages

The viewer can fetch remote annotation pages after the main manifest is loaded and merge those into `annotationsByCanvasId`.

### Fulltext / OCR

The viewer can discover and fetch:
- ALTO XML
- HOCR
- OCR-related annotation pages

Those are then rendered as:
- text lists
- line overlays
- synchronized focus and hover states

## State model

The runtime state is mostly held on the `MimirExplorer` instance.

Examples
- `currentManifest`
- `currentParsed`
- `osdExplorer`
- `threeState`
- `avItems`
- `annotationsByCanvasId`
- `fulltextSourcesByCanvasId`
- `isDark`
- `isBookMode`
- `isContinuousMode`

Not all state fields are intended as public API. External consumers should prefer documented methods over direct mutation.

## Theme model

There are two distinct theme layers:
- host-application theme
- viewer-internal theme

The viewer supports:
- `darkMode: 'auto'`
- `darkMode: 'light'`
- `darkMode: 'dark'`
- `darkMode: 'app'`

In `app` mode, the intended model is:
- the host owns the canonical theme state
- the viewer mirrors that state
- optional `window.toggleDarkMode()` lets the viewer delegate theme toggles back to the host

## External runtime dependencies

The main runtime depends on:
- OpenSeadragon for tiled image viewing
- Three.js for 3D
- browser media elements for audio/video playback

The package bundles its own UI shell around those tools and exposes them as one cohesive viewer.

## Architectural caveat

`src/mimir.js` is intentionally large and centralizes a lot of behavior. That keeps embedding straightforward, but it also means:
- code navigation is harder than in a more modular design
- documentation is especially important
- behavioral regressions can span multiple media modes

For now, the tradeoff favors an easy-to-embed single-entry library over a heavily abstracted internal architecture.
