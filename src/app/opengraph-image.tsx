import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";
import { LOGO_PATHS, LOGO_VIEWBOX } from "@/components/brand/logo-paths";

// Built in code from the traced logo and the display face (no AI imagery).
export const alt = "OtoXperts: Don't buy blind. Inspect before you accept.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const hubot = await readFile(join(process.cwd(), "src/app/og/HubotSansExpanded-ExtraBoldItalic.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000",
          color: "#fff",
          padding: "64px 72px",
          fontFamily: "Hubot",
        }}
      >
        <svg width="300" height="97" viewBox={LOGO_VIEWBOX}>
          <path fill="#fff" fillRule="evenodd" d={LOGO_PATHS.carline} />
          <path fill="#fff" fillRule="evenodd" d={LOGO_PATHS.oto} />
          <path fill="#ED0C0C" fillRule="evenodd" d={LOGO_PATHS.xperts} />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, lineHeight: 0.95, letterSpacing: -3 }}>{site.hero.h1}</div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 28 }}>
            <div style={{ width: 56, height: 3, background: "#ED0C0C", marginRight: 20 }} />
            <div style={{ fontSize: 40, letterSpacing: -1 }}>{site.brand.tagline}</div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "rgba(255,255,255,0.72)" }}>
          <span>Car PDI by certified engineers</span>
          <span>{site.brand.phone.display}</span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Hubot", data: hubot, style: "italic", weight: 800 }] },
  );
}
