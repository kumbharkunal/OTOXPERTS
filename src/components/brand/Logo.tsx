import { LOGO_PATHS, LOGO_VIEWBOX } from "./logo-paths";
import { cn } from "@/lib/cn";

type Props = {
  /** Unique per instance: used for the car-line reveal mask. */
  id: string;
  className?: string;
  title?: string;
  /** Wrap the car line in a left-to-right reveal mask that the motion layer animates. */
  drawable?: boolean;
};

/**
 * OTOXPERTS lockup traced from the client's logo. "OTO" and the car line use
 * currentColor (white on dark, black on light); "XPERTS" is always signal red.
 */
export function Logo({ id, className, title = "OtoXperts", drawable = false }: Props) {
  const maskId = `${id}-carline`;
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={cn("block h-auto", className)}
      role="img"
      aria-label={title}
      focusable="false"
      data-logo={id}
    >
      {drawable && (
        <defs>
          <linearGradient id={`${maskId}-edge`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#fff" />
            <stop offset="0.92" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="924" height="298">
            {/* Rest state covers the whole line, so it shows without JS. */}
            <rect className="logo-wipe" x="-40" y="0" width="1100" height="200" fill={`url(#${maskId}-edge)`} />
          </mask>
        </defs>
      )}
      <path fill="currentColor" fillRule="evenodd" d={LOGO_PATHS.carline} mask={drawable ? `url(#${maskId})` : undefined} />
      <path fill="currentColor" fillRule="evenodd" d={LOGO_PATHS.oto} />
      <path fill="#ED0C0C" fillRule="evenodd" d={LOGO_PATHS.xperts} />
    </svg>
  );
}
