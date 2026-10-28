/**
 * Side profile of a generic car, drawn in hairlines, facing left like the hero.
 * The roofline borrows the long, sweeping curve of the OtoXperts logo's car line.
 * viewBox 1000 × 380; zone coordinates in site.ts are % of this box.
 */
export const DIAGRAM_W = 1000;
export const DIAGRAM_H = 380;

export function CarDiagram({ className }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${DIAGRAM_W} ${DIAGRAM_H}`} className={className} aria-hidden="true" fill="none" data-diagram>
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
        {/* ground */}
        <path d="M20 352 H980" strokeOpacity="0.35" data-draw />
        {/* body */}
        <path
          data-draw
          d="M70 302 C52 300 46 284 48 262 C50 244 60 232 82 224 C150 206 240 194 330 186 C372 150 420 122 470 112 C560 96 660 98 724 112 C786 128 842 160 880 180 C914 186 942 196 950 214 C958 236 958 268 950 290 C946 300 938 304 926 305 L842 305 C836 262 806 236 770 236 C734 236 704 262 698 305 L302 305 C296 262 266 236 230 236 C194 236 164 262 158 305 Z"
        />
        {/* greenhouse */}
        <path data-draw d="M352 190 C390 160 430 136 472 126 C560 108 650 110 712 124 C760 136 802 158 832 182 Z" strokeOpacity="0.8" />
        {/* pillars and door seams */}
        <path data-draw d="M560 114 L556 190 M372 194 C376 228 380 262 384 300 M556 194 L560 300 M738 192 C734 228 728 262 724 300" strokeOpacity="0.6" />
        {/* beltline and sill */}
        <path data-draw d="M332 196 C520 192 700 194 880 190 M320 288 H690" strokeOpacity="0.45" />
        {/* wheels */}
        <circle data-draw cx="230" cy="305" r="52" />
        <circle data-draw cx="230" cy="305" r="30" strokeOpacity="0.55" />
        <circle data-draw cx="770" cy="305" r="52" />
        <circle data-draw cx="770" cy="305" r="30" strokeOpacity="0.55" />
        {/* lights, mirror, handles */}
        <path data-draw d="M66 236 C92 226 122 220 150 216 M930 206 L950 222 M346 188 C356 176 372 172 384 176 L380 192 M468 214 H498 M640 214 H670" strokeOpacity="0.7" />
      </g>
    </svg>
  );
}
