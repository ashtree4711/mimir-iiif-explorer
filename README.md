# Mimir IIIF Explorer

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/mimir_dark.png">
  <img alt="Mimir logo" src="docs/mimir_light.png" width="320">
</picture>

## Idea
Mimir IIIF Explorer is a modular IIIF viewer focused on image, AV, and 3D experiences with a clean, modern UI. It is designed as a small, embeddable library that renders a complete interface inside a host container.

This project is developed with Codex and human oversight.

## Current Features
- IIIF Presentation v2/v3 manifest parsing.
- OpenSeadragon image viewer with sequence navigation and book mode.
- Audio/video playback with timeline controls.
- 3D model viewing via `@google/model-viewer`.
- Image filters: rotate, flip, brightness, contrast, greyscale, RGB channels.
- Download current image as full-res JPEG.
- Dark mode with auto/app/manual modes.
- Responsive layout with adaptive panel behavior.
- Cookie-based bookmarks (grouped by manifest).
- Annotations with list + overlays, single/select and show-all modes.
- Fulltext OCR (ALTO + HOCR) with line overlays and list sync.
- URL query support (`?manifest=...`) for auto-loading manifests.

## Future Features
- Better keyboard navigation and accessibility pass.
- Theming API for typography, spacing, and component overrides.
- Plugin hooks for custom panels and rendering modes.
- Optional externalized dependencies for smaller bundles.

## Install
```bash
npm i @mimir-iiif/explorer
```

## Basic Usage
```js
import MimirExplorer from '@mimir-iiif/explorer';

const explorer = new MimirExplorer('mimir-container', {
  primaryColor: '#451F8D',
  darkMode: 'auto'
});

// Later, when you have a manifest URL:
// explorer.loadManifest('https://example.org/iiif/manifest.json');
```
