import { PlayIcon } from "@phosphor-icons/react/ssr";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import { ReelLink } from "@/components/reels/ReelLink";
import { RevealMount } from "@/components/motion/RevealMount";

const { cities } = site;

/*
 * Schematic map: real coordinates on a graticule, routes out from the Delhi NCR base.
 * Deliberately no country outline (official-boundary rules for maps of India; docs/PLAN.md R5).
 */
const LON0 = 68;
const LON1 = 88;
const LAT0 = 8;
const LAT1 = 33;
const K = 20; // units per degree of latitude
const COS = Math.cos((20.5 * Math.PI) / 180);
const W = (LON1 - LON0) * COS * K;
const H = (LAT1 - LAT0) * K;
const px = (lon: number) => (lon - LON0) * COS * K;
const py = (lat: number) => (LAT1 - lat) * K;

// Clustered near Delhi or Ahmedabad: dot only, named in the list beside the map.
const UNLABELLED = new Set(["Narnaul", "Mathura", "Agra", "Himmatnagar"]);

export function Cities() {
  const base = cities.hubs.find((h) => "base" in h && h.base) ?? cities.hubs[0];
  const bx = px(base.lon);
  const by = py(base.lat);

  return (
    <section id="cities" aria-labelledby="cities-title" data-theme="light" className="bg-paper text-graphite">
      <div className="container-x section-y grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="cities-title" className="display-2 text-carbon">
            {cities.h2}
          </h2>
          <p className="body-l mt-6 max-w-[36ch]">{cities.body}</p>

          <h3 className="mt-10 text-[0.875rem] font-[620] text-carbon">{cities.hubsLabel}</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {cities.hubs.map((h) => (
              <li key={h.name}>
                <ReelLink
                  code={h.video}
                  title={h.name}
                  group="cities"
                  className="pressable inline-flex min-h-11 items-center gap-2 rounded-full bg-carbon px-4 text-[0.9375rem] font-[600] text-paper"
                  fallback={
                    <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-carbon px-4 text-[0.9375rem] font-[600] text-paper">
                      <span aria-hidden="true" className="size-2 rounded-full bg-signal" />
                      {h.name}
                    </span>
                  }
                >
                  {() => (
                    <>
                      <span aria-hidden="true" className="size-2 rounded-full bg-signal" />
                      {h.name}
                      <PlayIcon weight="fill" aria-hidden="true" className="-mr-0.5 size-3.5 text-white/70" />
                    </>
                  )}
                </ReelLink>
              </li>
            ))}
          </ul>
          <p className="mt-3 max-w-[40ch] text-[0.8125rem] text-muted">{cities.ncrNote}</p>

          <h3 className="mt-8 text-[0.875rem] font-[620] text-carbon">{cities.inspectedLabel}</h3>
          <ul className="mt-2 flex flex-wrap gap-x-1 text-[0.9375rem]">
            {cities.inspected.map((c, i) => (
              <li key={c.name}>
                <ReelLink
                  code={c.video}
                  title={c.name}
                  group="cities"
                  className="inline-flex min-h-11 items-center underline decoration-black/20 underline-offset-4 hover:decoration-black"
                  fallback={<span className="inline-flex min-h-11 items-center">{c.name}</span>}
                >
                  {() => c.name}
                </ReelLink>
                {i < cities.inspected.length - 1 && <span aria-hidden="true">,&nbsp;</span>}
              </li>
            ))}
          </ul>

          <a
            href={waLink(site.whatsapp.city)}
            target="_blank"
            rel="noopener noreferrer"
            className="pressable mt-10 inline-flex min-h-12 items-center rounded-full bg-carbon px-6 font-[620] text-paper"
          >
            {cities.ask}
          </a>
        </div>

        <figure className="lg:col-span-6 lg:col-start-7" aria-hidden="true">
          <svg viewBox={`-28 -14 ${W + 56} ${H + 28}`} className="h-auto w-full max-w-[34rem] text-carbon lg:ml-auto" data-map>
            {/* Graticule every 5 degrees */}
            <g stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" vectorEffect="non-scaling-stroke">
              {[70, 75, 80, 85].map((lon) => (
                <line key={lon} x1={px(lon)} y1={0} x2={px(lon)} y2={H} />
              ))}
              {[10, 15, 20, 25, 30].map((lat) => (
                <line key={lat} x1={0} y1={py(lat)} x2={W} y2={py(lat)} />
              ))}
            </g>
            <g fill="currentColor" fillOpacity="0.4" fontSize="9" className="reading">
              {[70, 75, 80, 85].map((lon) => (
                <text key={lon} x={px(lon)} y={H + 12} textAnchor="middle">
                  {lon}°E
                </text>
              ))}
              {[10, 15, 20, 25, 30].map((lat) => (
                <text key={lat} x={-6} y={py(lat) + 3} textAnchor="end">
                  {lat}°N
                </text>
              ))}
            </g>

            {/* Routes out from base */}
            <g stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke">
              {[...cities.hubs.filter((h) => h !== base), ...cities.inspected].map((c) => (
                <line key={c.name} x1={bx} y1={by} x2={px(c.lon)} y2={py(c.lat)} data-route />
              ))}
            </g>

            {/* Inspected cities */}
            <g>
              {cities.inspected.map((c) => (
                <g key={c.name} data-city>
                  <circle cx={px(c.lon)} cy={py(c.lat)} r="3" fill="currentColor" />
                  {!UNLABELLED.has(c.name) && (
                    <text x={px(c.lon) + 7} y={py(c.lat) + 3.5} fontSize="10.5" fill="currentColor" fillOpacity="0.75">
                      {c.name}
                    </text>
                  )}
                </g>
              ))}
            </g>

            {/* Live hubs */}
            <g>
              {cities.hubs.map((h) => (
                <g key={h.name} data-hub>
                  <circle cx={px(h.lon)} cy={py(h.lat)} r="11" fill="none" stroke="#ED0C0C" strokeOpacity="0.5" className="origin-center motion-safe:animate-[ox-ping_2.4s_var(--ease-ui)_infinite] [transform-box:fill-box]" />
                  <circle cx={px(h.lon)} cy={py(h.lat)} r="5.5" fill="#ED0C0C" />
                  <text x={px(h.lon) + 11} y={py(h.lat) + 4} fontSize="12.5" fontWeight="650" fill="currentColor">
                    {h.name}
                  </text>
                </g>
              ))}
            </g>
          </svg>
          <figcaption className="sr-only">Map of cities where OtoXperts inspects cars</figcaption>
        </figure>
      </div>
      <RevealMount name="cities" />
    </section>
  );
}
