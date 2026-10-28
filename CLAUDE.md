# OtoXperts homepage demo: conventions

The approved plan is `docs/PLAN.md` (research, sources, tokens, section specs, TODO list). Read it before changing anything substantial. `AGENTS.md` applies too: check the bundled docs in `node_modules/next/dist/docs/` before using a Next.js API (this is Next 16 with Cache Components).

## Content
- All copy, links, numbers, prices, callout coordinates and city data live in `src/content/site.ts`. Components never hard-code copy.
- Never invent facts. Unknowns are `{ todo: "..." }` (rendered as designed placeholders, listed by `npm run todos`). Facts found but not yet confirmed by the client carry `confirm: true` and a `source`.
- Brand spelling in running text: OtoXperts. Phone format: +91 92170 49330. Money via `formatINR` (en-IN grouping).
- Copy style: sentence case, Indian/British spelling (tyre, colour, centre), plain and specific, second person.
- Banned in copy: em and en dashes, emoji, "→" on links, ALL-CAPS labels, eyebrow labels above headings, middle-dot meta strings (the sample report sheet is the one exception). Run the stop-slop skill over new copy.

## Design
- Tokens live in `src/app/globals.css` (`@theme`). Six base colours: carbon #000, paper #FFF, concrete #EEF0F2, graphite #3A3D42, signal #ED0C0C, signal-ink #C40A0A. Status colours (pass/attn/fail) only inside report UI, always with a glyph and the word.
- Red marks the brand and the evidence (findings, flags, live position). Primary buttons are white on dark and black on light.
- Fonts: Hubot Sans italic for display, Mona Sans for everything else. Readings use `tabular-nums slashed-zero`. No third family, no monospace.
- Left-aligned layout; the final CTA is the one centred moment. Radius hierarchy: pill for anything you press, 14px for sheets and photos, 0 for data cells.

## Motion
- Animate only transform, opacity and clip-path (small SVG stroke draws are allowed).
- GSAP for scroll choreography (`useGSAP` with a scope, cleanup on unmount, `gsap.matchMedia` contexts for desktop, touch and reduced motion). Motion only for the nav `layoutId` indicator and sheet springs. CSS for hover and press.
- GSAP, ScrollTrigger and Lenis load through dynamic import after hydration. Nothing animates the H1.
- Never hide content with CSS that only JS can undo, unless it is gated on the `.js` class with a failsafe. Every animation has a reduced-motion path.

## Engineering
- Server Components by default; client components only for interactive islands.
- Haptics come from the global `HapticsProvider`; opt out per element with `data-haptic="off"`, override with `data-haptic="select|success|warn"`.
- Accessibility: WCAG 2.2 AA, 44px targets, visible focus rings, everything usable without JS.
- Images: numbered PNGs go in `_incoming-images/`, then `npm run images`. Code never references `_incoming-images/`.
- TypeScript stays on 5.9.x and ESLint on 9.x (TS 7 and ESLint 10 break eslint-config-next).

## Commands
`npm run dev` · `build` · `start` · `lint` · `typecheck` · `images` · `todos` · `budget` · `test:e2e`

## Git
Conventional commits, small and logical. Never force-push. Push as the `kumbharkunal` GitHub account.
