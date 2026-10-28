"use client";

import { useEffect, useRef, useState } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

type Item = { key: string; n: number; title: string; tip: string; url: string; linkLabel: string };

/**
 * The 10-day series as a draggable rail. A native scroll container (touch keeps its
 * momentum, keyboard and screen readers work), plus mouse drag-to-scroll on desktop.
 */
export function Rail({ title, intro, items, prevLabel, nextLabel }: { title: string; intro: string; items: Item[]; prevLabel: string; nextLabel: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });

    // Mouse drag-to-scroll with a short glide on release.
    let down = false;
    let moved = false;
    let x0 = 0;
    let s0 = 0;
    let v = 0;
    let lastX = 0;
    let lastT = 0;
    let raf = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true;
      moved = false;
      x0 = lastX = e.clientX;
      s0 = el.scrollLeft;
      lastT = performance.now();
      v = 0;
      cancelAnimationFrame(raf);
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - x0;
      if (!moved && Math.abs(dx) > 4) {
        moved = true;
        el.setPointerCapture(e.pointerId);
        el.style.scrollSnapType = "none";
        el.style.cursor = "grabbing";
      }
      if (!moved) return;
      el.scrollLeft = s0 - dx;
      const now = performance.now();
      v = (e.clientX - lastX) / Math.max(1, now - lastT);
      lastX = e.clientX;
      lastT = now;
    };
    const onUp = (e: PointerEvent) => {
      if (!down) return;
      down = false;
      if (!moved) return;
      el.releasePointerCapture?.(e.pointerId);
      el.style.cursor = "";
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let vel = reduce ? 0 : v * 16;
      const glide = () => {
        if (Math.abs(vel) < 0.5) {
          el.style.scrollSnapType = "";
          return;
        }
        el.scrollLeft -= vel;
        vel *= 0.92;
        raf = requestAnimationFrame(glide);
      };
      glide();
    };
    // Swallow the click that ends a drag so cards don't open by accident.
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", update);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const w = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * w, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <div className="container-x flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id="days-title" className="display-2 text-carbon">
            {title}
          </h2>
          <p className="body-l mt-4">{intro}</p>
        </div>
        <div className="hidden gap-2 js:flex">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={edge.start}
            aria-controls="days-track"
            aria-label={prevLabel}
            className="pressable grid size-12 place-items-center rounded-full bg-paper text-carbon transition-opacity duration-180 disabled:opacity-35"
          >
            <CaretLeftIcon className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={edge.end}
            aria-controls="days-track"
            aria-label={nextLabel}
            className="pressable grid size-12 place-items-center rounded-full bg-paper text-carbon transition-opacity duration-180 disabled:opacity-35"
          >
            <CaretRightIcon className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul
        id="days-track"
        ref={track}
        tabIndex={0}
        aria-label={title}
        data-lenis-prevent-wheel
        className={cn(
          "relative mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:mt-12",
          "scroll-px-(--gutter) px-(--gutter) md:cursor-grab",
          "[scrollbar-color:var(--color-signal)_transparent] [scrollbar-width:thin]",
          "lg:scroll-px-[max(var(--gutter),calc((100vw-1320px)/2))] lg:px-[max(var(--gutter),calc((100vw-1320px)/2))]",
        )}
      >
        {items.map((it) => (
          <li key={it.key} className="relative w-[min(82vw,20rem)] shrink-0 snap-start">
            <article className="flex h-full flex-col rounded-md bg-paper p-6 select-none">
              <p className="flex items-baseline gap-1 text-carbon">
                <span className="display-2 leading-none">{it.n}</span>
                <span className="reading text-[0.875rem] text-muted">/10</span>
              </p>
              <h3 className="title mt-6 text-carbon">{it.title}</h3>
              <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed">{it.tip}</p>
              <a
                href={it.url}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                className="mt-6 inline-flex min-h-11 items-center self-start font-[600] text-carbon underline decoration-black/25 underline-offset-4 hover:decoration-black"
              >
                {it.linkLabel}
                <span className="sr-only">: day {it.n}, {it.title} (Instagram, opens in a new tab)</span>
              </a>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
