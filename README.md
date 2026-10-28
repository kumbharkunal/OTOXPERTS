# OtoXperts homepage (concept)

A homepage concept for OtoXperts, a car pre-delivery inspection (PDI) company in India. It's built to pitch a full rebuild of otoxperts.com: server-rendered, fast on Indian mobile networks, and grounded in OtoXperts' own published facts.

The research, design decisions and the client questions are in [`docs/PLAN.md`](docs/PLAN.md); working conventions are in [`CLAUDE.md`](CLAUDE.md).

- **Stack:** Next.js 16 (App Router, Turbopack, Cache Components), React 19, Tailwind CSS 4, GSAP 3 with ScrollTrigger, Motion, Lenis.
- **Hosting:** Vercel. The demo is set to `noindex` until OtoXperts adopts it.

## Setup

Requires Node 22.13 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

This folder lives in OneDrive. Pause OneDrive syncing while you install or build, or you may see slow installs and `EPERM` file-lock errors.

If `npm run build` or `npm run dev` fails while fetching Mona Sans from Google Fonts, your network is probably preferring a broken IPv6 route. Run the command with IPv4 first:

```bash
NODE_OPTIONS=--dns-result-order=ipv4first npm run build
```

## Editing content

All copy, links, prices, cities and callout positions live in [`src/content/site.ts`](src/content/site.ts). Components never hard-code text.

- Facts that OtoXperts hasn't supplied are written as `todo("...")`. They render as quiet placeholders, never as invented numbers.
- Facts found on their channels but not yet confirmed carry a `confirm` source.
- `npm run todos` prints every open item for the client.

## Swapping in the photographs

The page ships with designed placeholders at the exact aspect ratio of each photo, so swapping needs no code changes.

1. Generate the eight images with the prompts in [`IMAGE_PROMPTS.md`](IMAGE_PROMPTS.md). Download each as PNG.
2. Drop the files into `_incoming-images/`, named after the image (`hero-bay.png`) or starting with its number (`01.png`, `01-hero-bay.png`). Don't put originals in `public/`: everything there is published.
3. Run `npm run images`. It crops each file to its exact ratio (never enlarging it), writes `public/images/<name>.jpg`, generates blur placeholders and updates `src/content/images.generated.json`. The originals stay in `_incoming-images/`, which git ignores.
4. Re-place the hero callouts on the real car:
   - Run `npm run dev` and open `http://localhost:3000/?calibrate`.
   - Click each flaw on the car. The coordinates are copied to your clipboard.
   - Paste them into `hero.callouts[].pos` in `site.ts`.
   - Do this at a desktop width, and again below 768px for the phone crop.

## Adding the reels

Reels play in an on-site player. Nothing on the page links out to Instagram to watch a video, and a reel without a file shows as plain text until it's added.

1. Save each reel as `_incoming-videos/<reel code>.mp4`. The code is the part of the Instagram address after `/reel/`, e.g. `DdG0NxypRuM`. The codes the page uses are the `video: "..."` entries in `src/content/site.ts`.
2. Run `npm run videos`. It needs ffmpeg, on your PATH or set as `FFMPEG_PATH`. It writes `public/videos/<code>.mp4` (H.264 at up to 540×960, set to start playing before it finishes downloading) and a poster, updates `src/content/videos.generated.json`, and lists any reels still missing.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` / `npm run typecheck` | ESLint and TypeScript checks |
| `npm run images` | Process photos from `_incoming-images/` |
| `npm run videos` | Process reels from `_incoming-videos/` (needs ffmpeg) |
| `npm run todos` | List what's waiting on the client |
| `npm run budget [url]` | Initial JS (gzip) against the 170 KB budget; run against a production server |
| `npm run test:e2e` | Playwright tests: Chromium, WebKit and phone profiles, including axe accessibility checks |
| `node scripts/shots.mjs [desktop\|mobile] [--reduce]` | Section screenshots into `.shots/` |
| `node scripts/icons.mjs` | Rebuild the favicon, app icons and touch icon from the logo |

## Deploying

Production is the Vercel project `otoxperts` at https://otoxperts.vercel.app.

Once Vercel's GitHub app can see this repository, run `vercel git connect` once; every push to `main` then deploys to production. To grant access, open GitHub, Settings, Applications, Vercel, Configure, and add `OTOXPERTS` under repository access.

Until then, deploy from this folder with `vercel deploy --prod`. The CLI uploads the working folder rather than the git tree, so `.vercelignore` keeps the brand references, tool output and env files out of the upload.

| Environment variable | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | The canonical URL, e.g. `https://otoxperts.vercel.app` |
| `NEXT_PUBLIC_INDEXABLE` | `true` only once the site is official; otherwise robots and meta tags say `noindex` |

## Credits

- Hubot Sans and Mona Sans by GitHub, under the SIL Open Font License. The display face is a renamed subset of Hubot Sans Italic, "OX Display" ([`src/app/fonts/`](src/app/fonts/README.md)); the Open Graph image uses the original file (`src/app/og/OFL-HubotSans.txt`).
- Social logos from theSVG, shown unmodified.
- Icons from Phosphor (MIT). The inspection-category icons and the car diagram were drawn for this site.
- The OtoXperts logo was traced from the client's artwork. The original vector file is still requested from the client.
