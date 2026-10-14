import { cpSync, copyFileSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'out');
// This directory contains generated output only. Never merge with a previous build.
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
cpSync(path.join(root, 'dist/client'), output, { recursive: true });
// Explicit entry files replace any previously deployed Next.js page at these paths.
for (const route of ['about', 'sponsors', 'packages', 'contact']) {
  const directory = path.join(output, route);
  mkdirSync(directory, { recursive: true });
  copyFileSync(path.join(output, 'index.html'), path.join(directory, 'index.html'));
}
console.log('Prepared clean Cloudflare Pages build with explicit page entries: out/');
