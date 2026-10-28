import { Hubot_Sans, Mona_Sans } from "next/font/google";

/** Display: Hubot Sans italic, variable width (wdth 75–125) and weight. One file. */
export const display = Hubot_Sans({
  subsets: ["latin"],
  style: "italic",
  axes: ["wdth"],
  display: "swap",
  variable: "--font-hubot",
});

/** Body and readings: Mona Sans roman, variable weight. One file. */
export const sans = Mona_Sans({
  subsets: ["latin"],
  style: "normal",
  display: "swap",
  variable: "--font-mona",
});
