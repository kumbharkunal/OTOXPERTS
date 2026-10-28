import type { ReactNode } from "react";

/**
 * Inspection-category icons, authored for this site: 24px grid, 1.5px stroke,
 * round caps and joins (matches Phosphor's regular weight).
 */
const PATHS: Record<string, ReactNode> = {
  // Paint thickness gauge with its probe
  paint: (
    <>
      <rect x="7" y="2.75" width="10" height="13.5" rx="2" />
      <rect x="9.25" y="5.25" width="5.5" height="3.75" rx="0.75" />
      <path d="M12 16.25v2.5" />
      <circle cx="12" cy="20.25" r="1.5" />
    </>
  ),
  // Tyre with tread marks
  tyres: (
    <>
      <circle cx="12" cy="12" r="8.75" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3.25V6M12 18v2.75M3.25 12H6M18 12h2.75M5.8 5.8l1.9 1.9M16.3 16.3l1.9 1.9M18.2 5.8l-1.9 1.9M7.7 16.3l-1.9 1.9" />
    </>
  ),
  // Engine block
  engine: (
    <>
      <path d="M3.75 10.5h2.5l1.75-2h6l1.5 2h2.25v2h2.5v4h-2.5v2h-4.25l-1.75 1.75H8L6.25 18.5h-2.5z" />
      <path d="M9 5.25h5M11.5 5.25V8.5" />
    </>
  ),
  // OBD-II connector
  electrics: (
    <>
      <path d="M4.5 7.5h15l-2.25 8.25H6.75z" />
      <path d="M8.5 10.5h.5M11.75 10.5h.5M15 10.5h.5M10 13h.5M13.5 13h.5" />
      <path d="M12 15.75v4.5" />
    </>
  ),
  // Car on a lift, seen from the side
  underbody: (
    <>
      <path d="M3.5 10.5h17M5.5 10.5l2-4h9l2 4" />
      <circle cx="7.5" cy="12.75" r="1.75" />
      <circle cx="16.5" cy="12.75" r="1.75" />
      <path d="M4 19.5h16M8 15.5v4M16 15.5v4" />
    </>
  ),
  // Car seat
  interior: (
    <>
      <path d="M7.25 3.75c2.25-.75 4.25-.5 5 1.25L14 13H9.25z" />
      <path d="M8.75 13h8.5a1.5 1.5 0 0 1 1.5 1.5V17h-10z" />
      <path d="M10.5 17v3.25M16.5 17v3.25" />
    </>
  ),
  // Screen with a camera lens
  tech: (
    <>
      <rect x="3" y="4.75" width="18" height="12" rx="2" />
      <circle cx="12" cy="10.75" r="2.75" />
      <path d="M9 20.25h6M12 16.75v3.5" />
    </>
  ),
  // Document with a key
  docs: (
    <>
      <path d="M5.75 2.75h7.5l4 4v6.5M5.75 2.75v18.5h6" />
      <path d="M13.25 2.75v4h4M8.75 10h6M8.75 13h4" />
      <circle cx="16.25" cy="17.25" r="2" />
      <path d="M17.7 18.7l2.55 2.55M19.25 20.25l1-1" />
    </>
  ),
};

export function CategoryIcon({ id, className }: { id: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[id]}
    </svg>
  );
}
