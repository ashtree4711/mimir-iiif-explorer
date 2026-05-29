# Mimir IIIF Explorer

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/npm/@mimir-iiif/explorer@latest/src/assets/mimir_logo_blue.png">
  <img alt="Mimir logo" src="https://cdn.jsdelivr.net/npm/@mimir-iiif/explorer@latest/src/assets/mimir_logo_blue.png" width="320">
</picture>

## Idea
Mimir IIIF Explorer is a modular IIIF viewer focused on image, AV, and 3D experiences with a clean, modern UI. It is designed as a small, embeddable library that renders a complete interface inside a host container.

## Current Features
- IIIF Presentation v2/v3 manifest parsing with multi-language labels and metadata.
- OpenSeadragon image viewer with sequence navigation, book mode, and continuous mode.
- Audio/video playback with timeline controls and start-time support.
- 3D model viewing with Three.js controls (lighting and camera).
- Image filters: rotate, flip, brightness, contrast, greyscale, RGB channels.
- Region focus for ImageApiSelector with optional blur outside region.
- Download current image as full-res JPEG.
- Dark mode with auto/light/dark/app modes.
- Responsive layout with adaptive panel behavior.
- Cookie-based bookmarks (grouped by manifest and page).
- Annotations with list + overlays, single/select and show-all modes.
- Fulltext OCR (ALTO + HOCR) with line overlays, list sync, and user-selectable overlay colors.
- Collections view with gallery, pagination, list/grid toggle, and collection linking.
- URL query support (`?manifest=...`, `?page=...`, `?time=...`) for auto-loading.

## Future Features
- Keyboard navigation and accessibility pass.
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
  primaryColor: '#009dcc',
  darkMode: 'auto'
});

explorer.loadManifest('https://example.org/iiif/manifest.json');
```

## Theme Modes
- `auto`: follow browser `prefers-color-scheme`
- `light`: force light mode
- `dark`: force dark mode
- `app`: follow host-app theme state

For host-controlled theme setups, prefer `darkMode: 'app'` and either:
- call `explorer.setDarkMode(isDark)` from the host, or
- expose a host-side `window.toggleDarkMode()` so the viewer toggle can delegate back into the app

## Local Development
The package can be consumed in two ways by host applications:
- npm package mode
- local source alias mode during active development

See the integration guide for the recommended Vite alias pattern and env variables.

## Documentation
- [API](docs/api.md)
- [Integration](docs/integration.md)
- [Architecture](docs/architecture.md)
