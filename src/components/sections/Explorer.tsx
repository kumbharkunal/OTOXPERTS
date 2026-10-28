"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { site } from "@/content/site";
import { CarDiagram } from "./CarDiagram";
import { CategoryIcon } from "@/icons/CategoryIcon";
import { getLenis, prefersReducedMotion } from "@/lib/scroll";
import { RevealMount } from "@/components/motion/RevealMount";
import { cn } from "@/lib/cn";

const { explorer } = site;
const cats = explorer.categories;

/**
 * Checkpoint explorer. A WAI-ARIA tablist first; on desktop with motion allowed, the
 * stage is sticky inside a tall track and scroll progress picks the tab
 * (reveals/explorer). Panels share one grid cell, so switching never shifts layout.
 */
export function Explorer() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();

  // While we scroll to a chosen tab, ignore the steps passed on the way (no flicker back).
  const heading = useRef<{ to: number; until: number } | null>(null);

  // The scroll layer announces progress; we only follow it.
  useEffect(() => {
    const onStep = (e: Event) => {
      const step = (e as CustomEvent<number>).detail;
      const h = heading.current;
      if (h && performance.now() < h.until && step !== h.to) return;
      heading.current = null;
      setActive(step);
    };
    window.addEventListener("ox:explorer-step", onStep);
    return () => window.removeEventListener("ox:explorer-step", onStep);
  }, []);

  const select = useCallback((i: number, focus = false) => {
    setActive(i);
    if (focus) tabRefs.current[i]?.focus({ preventScroll: true });
    // In scroll-driven mode, move the page to that step so scroll and state agree.
    const track = document.querySelector<HTMLElement>("[data-explorer-track]");
    if (track?.dataset.scrolly === "on" && !prefersReducedMotion()) {
      heading.current = { to: i, until: performance.now() + 1200 };
      const start = track.getBoundingClientRect().top + window.scrollY;
      const span = track.offsetHeight - window.innerHeight;
      const y = start + (span * (i + 0.5)) / cats.length;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(y, { duration: 0.8 });
      else window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = cats.length - 1;
    const map: Record<string, number> = {
      ArrowDown: i === last ? 0 : i + 1,
      ArrowRight: i === last ? 0 : i + 1,
      ArrowUp: i === 0 ? last : i - 1,
      ArrowLeft: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    };
    if (e.key in map) {
      e.preventDefault();
      select(map[e.key], true);
    }
  };

  const zone = cats[active].zone;

  return (
    <section id="checks" aria-labelledby="checks-title" data-theme="light" className="relative bg-concrete text-graphite">
      <div data-explorer-track className="relative">
        <div data-explorer-stage className="container-x section-y lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:py-24">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 id="checks-title" className="display-2 max-w-[17ch] text-carbon">
              {explorer.h2}
            </h2>
            <p className="max-w-[26rem] text-[0.9375rem] text-muted md:text-right">
              <span className="reading block text-[1.0625rem] text-carbon">{explorer.total}</span>
              {explorer.intro} {explorer.totalNote}
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-10">
            {/* Diagram */}
            <div className="min-w-0 lg:col-span-7">
              <div className="relative text-carbon">
                <CarDiagram className="h-auto w-full" />
                {/* Hotspots mirror the tabs; the active ring moves with translate only */}
                <div className="pointer-events-none absolute inset-0 [container-type:size]">
                  <span
                    aria-hidden="true"
                    data-zone-ring
                    className="absolute left-0 top-0 size-14 rounded-full border-[1.5px] border-signal transition-[translate] duration-420 ease-ui motion-reduce:transition-none"
                    style={{ translate: `calc(${zone.x}cqw - 50%) calc(${zone.y}cqh - 50%)` }}
                  />
                  {cats.map((c, i) => (
                    <button
                      key={c.id}
                      type="button"
                      tabIndex={-1}
                      aria-hidden="true"
                      onClick={() => select(i)}
                      data-haptic="select"
                      className="pointer-events-auto absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
                      style={{ left: `${c.zone.x}%`, top: `${c.zone.y}%` }}
                    >
                      <span className={cn("size-2.5 rounded-full transition-colors duration-240", i === active ? "bg-signal" : "bg-carbon/35")} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs and panels */}
            <div className="min-w-0 lg:col-span-5">
              <div
                role="tablist"
                aria-label={explorer.h2}
                aria-orientation="vertical"
                className="-mx-[var(--gutter)] flex snap-x gap-2 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:thin] lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-x-4 lg:gap-y-1 lg:overflow-visible lg:px-0 lg:pb-0"
              >
                {cats.map((c, i) => {
                  const selected = i === active;
                  return (
                    <button
                      key={c.id}
                      ref={(el) => {
                        tabRefs.current[i] = el;
                      }}
                      role="tab"
                      id={`${uid}-tab-${c.id}`}
                      aria-selected={selected}
                      aria-controls={`${uid}-panel-${c.id}`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => select(i)}
                      onKeyDown={(e) => onKeyDown(e, i)}
                      className={cn(
                        "pressable flex min-h-11 shrink-0 snap-start items-center gap-2.5 rounded-full px-4 text-left text-[0.9375rem] transition-colors duration-180 lg:rounded-none lg:px-0",
                        selected
                          ? "bg-carbon text-paper lg:bg-transparent lg:text-carbon"
                          : "bg-paper text-graphite hover:text-carbon lg:bg-transparent lg:text-muted",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn("hidden size-1.5 rounded-full lg:block", selected ? "bg-signal" : "bg-transparent")}
                      />
                      <span className={cn(selected && "lg:font-[620]")}>{c.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Without JS every panel shows in sequence; with JS they share one cell (no layout shift). */}
              <div className="mt-6 space-y-3 js:grid js:space-y-0 lg:mt-8">
                {cats.map((c, i) => (
                  <div
                    key={c.id}
                    role="tabpanel"
                    id={`${uid}-panel-${c.id}`}
                    aria-labelledby={`${uid}-tab-${c.id}`}
                    aria-hidden={i !== active ? true : undefined}
                    className={cn(
                      "rounded-md bg-paper p-6 lg:p-7 js:col-start-1 js:row-start-1 js:transition-opacity js:duration-240",
                      i !== active && "js:invisible js:opacity-0",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <CategoryIcon id={c.id} className="size-7 text-carbon" />
                      <h3 className="title text-carbon">{c.name}</h3>
                    </div>
                    <ul className="mt-5 space-y-2.5">
                      {c.checks.map((check) => (
                        <li key={check} className="flex gap-3 text-[0.9375rem] leading-snug">
                          <span aria-hidden="true" className="mt-[0.55em] h-[1.5px] w-3 shrink-0 bg-signal" />
                          {check}
                        </li>
                      ))}
                    </ul>
                    {c.tools.length > 0 && (
                      <p className="mt-5 border-t border-rule pt-4 text-[0.875rem] text-muted">
                        <span className="font-[600] text-graphite">{explorer.toolsLabel}:</span> {c.tools.join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <RevealMount name="explorer" />
    </section>
  );
}
