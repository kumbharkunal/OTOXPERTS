import localFont from "next/font/local";
import { Mona_Sans } from "next/font/google";

/**
 * Display: "OX Display", a 47 KB subset of Hubot Sans Italic (OFL) limited to the axes the
 * site uses (weight 700–800, width 100–112). Self-hosted and preloaded because the H1, the
 * LCP element, waits for it. Origin and licence: src/app/fonts/README.md.
 */
export const display = localFont({
  src: "./fonts/OXDisplay-Italic.woff2",
  style: "italic",
  weight: "700 800",
  display: "swap",
  variable: "--font-hubot",
  declarations: [{ prop: "font-stretch", value: "100% 112%" }],
  adjustFontFallback: "Arial",
});

/**
 * Body and readings: Mona Sans roman, variable weight. Not preloaded, so it never competes
 * with the display face the H1 needs; the size-adjusted fallback keeps the swap shift-free.
 */
export const sans = Mona_Sans({
  subsets: ["latin"],
  style: "normal",
  display: "swap",
  preload: false,
  variable: "--font-mona",
});
