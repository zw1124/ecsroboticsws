# RobotECS Website

The official website for RobotECS, FIRST Robotics Competition Team 12394 at Evergreen Christian School.

## Stack

- Next.js App Router
- React and TypeScript
- shadcn/ui with Radix UI
- Tailwind CSS v4
- Static export for flexible hosting

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run build
```

The production-ready static site is generated in `out/`.

## Mapbox on Cloudflare Pages

Set `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` to your `pk.` public token in the Pages project's **Production** environment variables, then redeploy. Next.js includes this value when it builds the static site, so changing the variable alone does not update an existing deployment. The map fills the homepage location section; if the token is missing or Mapbox fails to load, the section displays a red RobotECS fallback.
