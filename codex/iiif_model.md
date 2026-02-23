# IIIF Model: Normalized Internal Representation

Source
- Normalized model is produced by `parseManifest()` in `src/mimir.js` and stored on `this.currentParsed`.

Top-level normalized fields
- `type`: `collection | image | av | 3d | unknown` (collection overrides detectType).
- `label`: string (best-effort label from manifest).
- `summary`: string (from `summary` or `description`).
- `metadata`: array (raw `manifest.metadata` array, not further normalized).
- `iiifTypeLabel`: string (e.g., `IIIF Presentation v3 Manifest`).
- `attributionLabel`: string (from `requiredStatement.label` or default `Attribution`).
- `attribution`: string (from `requiredStatement.value` or `manifest.attribution`).
- `logoUrl`: string | null (from `manifest.logo`).
- `license`: string (from `manifest.license` or `rights`).
- `provider`: object with `label`, `homepage`, `logoUrl`.
- `canvases`: array of canvas summaries (see below).
- `canvasIndexById`: map of canvas id -> index in `canvases`.
- `imageSources`: array of image service ids (strings) or `{ type: 'image', url }`.
- `avItems`: array of AV items (see below).
- `modelItems`: array of 3D items (see below).
- `ranges`: nested outline/range tree (see below).
- `rangesFlat`: flattened range list; each range has `_idx` for lookup.
- `items`: array of `{ id, label, type }` from `manifest.items` or `manifest.members`.
- `collectionLinks`: array of `{ id, label }` from `partOf` / `within`.
- `fulltext`: string (currently always `''` in code).

Canvas model (normalized)
- Built from both v3 `manifest.items` and v2 `manifest.sequences[0].canvases`.
- Each entry in `canvases`:
  - `id`: canvas id.
  - `label`: canvas label.
  - `thumbnail`: URL (from canvas thumbnail or derived from first image source).
  - `imageSources`: array of IIIF image service ids or `{ type: 'image', url }`.
- `canvasIndexById` is built alongside for fast page navigation.

Image sources
- Extracted from annotation bodies and v2 images.
- If an ImageService is detected, the id is normalized to end with `/info.json`.
- If a raster URL is detected (`format` starts with `image/`), stored as `{ type: 'image', url }`.

AV items
- `avItems` elements: `{ id, mediaType, label }`.
- `mediaType` is `video` or `audio` based on `type`/`format`.
- AV timeline is not precomputed; runtime UI uses native media element duration/progress.

3D items
- `modelItems` elements: `{ id, label }`.
- 3D is detected from `type === 'Model'`, `format` containing `gltf`, or file extension `.glb`/`.gltf`.

Outline / ranges
- Parsed from `manifest.structures` or `manifest.ranges`.
- Range node shape:
  - `id`, `label`.
  - `items`: array of canvas ids.
  - `children`: array of nested range nodes.
  - `canvasIds`: union of `items` and descendants’ canvas ids.
  - `_idx`: assigned during flattening into `rangesFlat`.
- `rangesFlat` preserves traversal order and is used for outline click navigation.

Annotations and fulltext
- `fulltext` is currently a placeholder empty string; UI shows “No fulltext available.”
- Annotations panel is currently a placeholder and does not parse annotation lists.

Collections
- `items` is populated from `manifest.items` or `manifest.members` for collections.
- `collectionLinks` comes from `partOf` and `within`, used to drive the “Collection” tab.
