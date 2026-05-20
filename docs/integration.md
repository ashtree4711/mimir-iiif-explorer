# Integration

This document explains how to embed `@mimir-iiif/explorer` into host applications and how to work on the package locally while consuming it from another app.

## Standard npm integration

Install the package:

```bash
npm i @mimir-iiif/explorer
```

Basic usage:

```js
import MimirExplorer from '@mimir-iiif/explorer';

const explorer = new MimirExplorer('mimir-container', {
  primaryColor: '#451F8D',
  darkMode: 'auto'
});

explorer.loadManifest('https://example.org/iiif/manifest.json');
```

Host markup:

```html
<div id="mimir-container"></div>
```

Host layout guidance
- Give the container a real layout box.
- In app shells, prefer a flex or grid container with explicit height handling.
- If the viewer should fill the remaining viewport, make sure parent elements allow height contraction with patterns like `min-height: 0` where needed.

## Dark mode integration

### Standalone websites

Use:

```js
new MimirExplorer('mimir-container', { darkMode: 'auto' });
```

This makes the viewer follow the browser's `prefers-color-scheme`.

### Host-owned app theme

Use:

```js
new MimirExplorer('mimir-container', { darkMode: 'app' });
```

Recommended host contract
- The host toggles a shared `dark` class on `html`, `body`, or both.
- The host provides `window.toggleDarkMode()` if the viewer's own theme button should control the app too.
- The host may also call `explorer.setDarkMode(isDark)` directly if it wants explicit one-way control.

Example:

```js
const getDark = () =>
  document.documentElement.classList.contains('dark') ||
  document.body.classList.contains('dark');

window.toggleDarkMode = function toggleDarkMode(forceValue) {
  const next = typeof forceValue === 'boolean' ? forceValue : !getDark();
  document.documentElement.classList.toggle('dark', next);
  document.body.classList.toggle('dark', next);
  return next;
};

const explorer = new MimirExplorer('mimir-container', { darkMode: 'app' });
explorer.setDarkMode(getDark());
```

## Local package development from a consumer app

There are two common modes:

### 1. npm package mode

The consumer app installs the published package and uses it as any other dependency.

Best for
- release verification
- production-like testing
- consumers that should stay decoupled from local source trees

### 2. local source alias mode

The consumer app aliases `@mimir-iiif/explorer` to the local `src/mimir.js` from a checked-out sibling repository.

Best for
- developing the package and consumer at the same time
- testing integration changes quickly
- debugging theme, layout, and embedding issues

Recommended Vite pattern:

```js
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const useLocalExplorer = (env.MIMIR_EXPLORER_SOURCE ?? 'npm') === 'local';
  const explorerRoot = path.resolve(process.cwd(), env.MIMIR_EXPLORER_PATH || '../mimir-iiif-explorer');
  const explorerEntry = path.resolve(explorerRoot, 'src/mimir.js');

  if (useLocalExplorer && !fs.existsSync(explorerEntry)) {
    throw new Error(`Missing local explorer source at ${explorerEntry}`);
  }

  return {
    resolve: {
      alias: useLocalExplorer
        ? {
            '@mimir-iiif/explorer': explorerEntry,
          }
        : {},
    },
    server: {
      fs: useLocalExplorer ? { allow: [process.cwd(), explorerRoot] } : undefined,
    },
  };
});
```

Recommended env variables

```env
MIMIR_EXPLORER_SOURCE=npm
MIMIR_EXPLORER_PATH=../mimir-iiif-explorer
```

Switch to local mode only when needed:

```env
MIMIR_EXPLORER_SOURCE=local
MIMIR_EXPLORER_PATH=../mimir-iiif-explorer
```

## Integration examples in nearby projects

Current local examples
- `mimir-presentation`: optional npm-vs-local source switching for development
- `laradigi`: optional npm-vs-local source switching plus host-app dark-mode synchronization

These are useful reference consumers when testing embedding behavior changes.
