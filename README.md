# RobotECS — FRC Team 12394

React/Vite pixel-art website for the student robotics team at Evergreen Christian School in Loudoun, Virginia.

## Local development

```sh
npm ci
npm run dev
```

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `out`
- Project root: repository root
- Node.js: 22 recommended

The build creates `out/` for compatibility with the previous Cloudflare Pages configuration. It also preserves `dist/client`, `dist/server` and Sites hosting metadata. No Next.js runtime or Mapbox token is needed.

`public/_redirects` supports client-side routes and redirects legacy `.html` URLs. Contact forms open a draft in the visitor's email app; they do not submit to a backend or send email automatically.

See ASSET-CREDITS.md for artwork origins and licensing notes.
