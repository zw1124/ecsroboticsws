import { cpSync, mkdirSync } from 'node:fs';

// Preserve the existing Cloudflare Pages output directory used by the prior site.
mkdirSync('out', { recursive: true });
cpSync('dist/client', 'out', { recursive: true });
console.log('Prepared Cloudflare Pages static build: out/');
