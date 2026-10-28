import { getImageProps } from "next/image";
import { getImage } from "@/content/images";
import { LOGO_PATHS } from "@/components/brand/logo-paths";

/**
 * The hero photograph, art-directed (16:9 from 768px, 9:16 below). The base layer is
 * the LCP image; the lit layer uses identical props, so the browser downloads it once.
 * Until the photos exist, a line drawing of the car stands in at the same ratios.
 */
export function HeroArt({ layer, alt }: { layer: "base" | "lit"; alt: string }) {
  const desktop = getImage("hero-bay");
  const mobile = getImage("hero-bay-mobile");
  const isBase = layer === "base";

  if (!desktop) return <HeroPlaceholder label={isBase ? alt : undefined} />;

  const common = { alt: isBase ? alt : "", sizes: "100vw", quality: 75 } as const;
  const { props: img } = getImageProps({
    ...common,
    src: desktop.src,
    width: desktop.width,
    height: desktop.height,
    loading: "eager",
    ...(isBase ? { fetchPriority: "high" as const } : {}),
  });
  const mobileSet = mobile
    ? getImageProps({ ...common, src: mobile.src, width: mobile.width, height: mobile.height }).props.srcSet
    : undefined;

  return (
    <picture>
      {mobileSet && <source media="(max-width: 767px)" srcSet={mobileSet} sizes="100vw" />}
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
      <img {...img} aria-hidden={isBase ? undefined : true} decoding={isBase ? "sync" : "async"} />
    </picture>
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
        className="max-md:hidden"
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
        <line x1="420" y1="640" x2="1600" y2="640" stroke="rgb(255 255 255 / 0.22)" strokeWidth="2" />
        <path d={LOGO_PATHS.carline} fill="#fff" transform="translate(1525 448) scale(-1 1)" />
      </svg>
      <svg
        viewBox="0 0 900 1600"
        preserveAspectRatio="xMidYMid slice"
        className="md:hidden"
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
