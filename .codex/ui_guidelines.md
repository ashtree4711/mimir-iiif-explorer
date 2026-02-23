# UI Guidelines: mimir-iiif-explorer

Zones
- Top: `#mimir-top-bar` floating title/action card (media icon, title, collection link, dark mode, fullscreen, book toggle, download).
- Left: `#mimir-sidebar` Structure panel with tabs (Items, Outline, Collection, Bookmarks).
- Right: `#mimir-info` Info panel with tabs (Metadata, Fulltext, Annotations).
- Bottom: `#mimir-bottom-bar` media/tool controls; optional filter bar `#mimir-filter-bar` above it.
- Center stage: render targets `#mimir-osd` (image), `#mimir-av` (AV), `#mimir-3d` (3D), plus message and loader overlays.

Panel behaviors
- Panels are hidden until a manifest is loaded; on render they become visible and edge toggles appear.
- Panel width is fixed at 20rem; open/close toggles add `mimir-sidebar-open` and set width to `20rem` or `0`.
- If both panels cannot fit, opening one will auto-close the other when available stage width < 720px.
- `enforcePanelRules()` opens both panels when there is a manifest and enough space; otherwise only one.

Tab rules
- Tabs use `.mimir-tab` with `data-tab`; panels use `.mimir-tab-panel` with `data-panel`.
- Clicking a tab sets `.is-active` on the tab and hides other panels via `mimir-hidden`.
- Switching left panel to `collection` triggers collection member loading if `collection.id` exists.

Responsive rules
- JS uses `getAvailableStageWidth()` and 720px threshold to decide if both panels can be open.
- On window resize: recalculates panel rules and bottom bar height.
- CSS media query at `max-width: 768px` positions sidebars as absolute overlays (left/right) with drop shadows.
- Bottom bar height is stored in CSS var `--mimir-bottom-height` for layout alignment.

Keyboard shortcuts
- No global shortcuts are defined.
- Page number input listens for `Enter` to jump to the requested page.
