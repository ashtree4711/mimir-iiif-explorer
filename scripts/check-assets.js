import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('.', import.meta.url).pathname, '..');
const assets = path.join(root, 'src', 'assets');

const requiredFiles = [
  'mimir_logo_lightmode.png',
  'mimir_logo_darkmode.png',
  'cc/cc.svg',
  'cc/by.svg',
  'cc/nc.svg',
  'cc/nd.svg',
  'cc/sa.svg',
  'cc/zero.svg',
  'cc/pd.svg'
];

const missing = requiredFiles.filter((rel) => !fs.existsSync(path.join(assets, rel)));
if (missing.length) {
  console.error('Missing required asset files:');
  missing.forEach((m) => console.error(`- ${m}`));
  process.exit(1);
}

const placeholders = [];
for (const rel of requiredFiles.filter((r) => r.endsWith('.svg'))) {
  const p = path.join(assets, rel);
  const data = fs.readFileSync(p, 'utf8');
  if (data.includes('name^^') || data.includes('PLACEHOLDER')) {
    placeholders.push(rel);
  }
}

if (placeholders.length) {
  console.error('Placeholder SVGs detected. Replace with official Creative Commons icons:');
  placeholders.forEach((m) => console.error(`- ${m}`));
  process.exit(1);
}

console.log('Asset check passed.');
