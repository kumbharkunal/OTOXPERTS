import { preload } from "react-dom";
import { getImage, type GeneratedImage } from "@/content/images";
import { LOGO_PATHS } from "@/components/brand/logo-paths";

const PORTRAIT = "(orientation: portrait)";
const LANDSCAPE = "(orientation: landscape)";
/** The cover box is wider than the screen whenever the screen's shape differs from the crop. */
const SIZES = { portrait: "max(100vw, 56.25vh)", landscape: "max(100vw, 177.78vh)" };

/**
 * The hero photograph, art-directed by orientation (16:9 landscape, 9:16 portrait, so a
 * portrait tablet keeps the whole car). It is the LCP image, so it uses static AVIF and
 * WebP sizes from `npm run images` rather than the on-demand optimiser, and the matching
 * crop is preloaded with the HTML. The lit layer repeats the same sources, so the browser
 * downloads it once. Until the photos exist, a line drawing stands in at the same ratios.
 */
export function HeroArt({ layer, alt }: { layer: "base" | "lit"; alt: string }) {
  const desktop = getImage("hero-bay");
  const mobile = getImage("hero-bay-mobile");
  const isBase = layer === "base";

  if (!desktop) return <HeroPlaceholder label={isBase ? alt : undefined} />;

  if (isBase) {
    for (const [img, media, sizes] of [
      [mobile, PORTRAIT, SIZES.portrait],
      [desktop, LANDSCAPE, SIZES.landscape],
    ] as const) {
      if (img?.sources) {
        preload(img.src, { as: "image", type: "image/avif", imageSrcSet: img.sources.avif, imageSizes: sizes, media, fetchPriority: "high" });
      }
    }
  }

  return (
    <picture>
      {mobile && <Sources img={mobile} media={PORTRAIT} sizes={SIZES.portrait} />}
      <Sources img={desktop} media={LANDSCAPE} sizes={SIZES.landscape} />
      <img
        src={desktop.src}
        width={desktop.width}
        height={desktop.height}
        alt={isBase ? alt : ""}
        aria-hidden={isBase ? undefined : true}
        loading="eager"
        fetchPriority={isBase ? "high" : undefined}
        decoding={isBase ? undefined : "async"}
      />
    </picture>
  );
}

/** AVIF, then WebP, then the JPG master, for one orientation. */
function Sources({ img, media, sizes }: { img: GeneratedImage; media: string; sizes: string }) {
  return (
    <>
      {img.sources && <source media={media} type="image/avif" srcSet={img.sources.avif} sizes={sizes} />}
      {img.sources && <source media={media} type="image/webp" srcSet={img.sources.webp} sizes={sizes} />}
      <source media={media} srcSet={img.src} />
    </>
  );
}

/** Night bay in hairlines: wall panels, a shutter, the floor and the logo's car line, mirrored to face the copy. */
function HeroPlaceholder({ label }: { label?: string }) {
  const wall = "rgb(255 255 255 / 0.07)";
  return (
    <>
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="portrait:hidden"
        role={label ? "img" : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
      >
        <rect width="1600" height="900" fill="#08090a" />
        <g stroke={wall} strokeWidth="2">
          {[880, 1160, 1440].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="640" />
          ))}
          <rect x="1010" y="150" width="380" height="490" fill="none" />
          {Array.from({ length: 26 }, (_, i) => (
            <line key={i} x1="1010" y1={168 + i * 18} x2="1390" y2={168 + i * 18} strokeWidth="1" />
          ))}
        </g>
        <line x1="560" y1="622" x2="1600" y2="622" stroke="rgb(255 255 255 / 0.22)" strokeWidth="2" />
        <path d={LOGO_PATHS.carline} fill="#fff" transform="translate(1582.5 465.5) scale(-0.9 0.9)" />
      </svg>
      <svg
        viewBox="0 0 900 1600"
        preserveAspectRatio="xMidYMid slice"
        className="landscape:hidden"
        aria-hidden="true"
      >
        <rect width="900" height="1600" fill="#08090a" />
        <g stroke={wall} strokeWidth="2">
          {[240, 520, 800].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="1300" />
          ))}
        </g>
        <line x1="0" y1="1312" x2="900" y2="1312" stroke="rgb(255 255 255 / 0.22)" strokeWidth="2" />
        <path d={LOGO_PATHS.carline} fill="#fff" transform="translate(810.75 1176) scale(-0.78 0.78)" />
      </svg>
    </>
  );
}
