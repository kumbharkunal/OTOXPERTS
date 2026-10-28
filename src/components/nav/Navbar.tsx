"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { site } from "@/content/site";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/cn";

/**
 * The mobile sheet (and Motion's spring with it) is its own chunk: prefetched when the
 * browser is idle, or on the first tap, so it never weighs on the first load.
 */
const MobileSheet = dynamic(() => import("./MobileSheet").then((m) => m.MobileSheet), { ssr: false });

type Theme = "dark" | "light";

/** Last element in document order wins: later sections paint over earlier ones (the hero curtain). */
function lastInDocOrder(els: Iterable<Element>) {
  let last: Element | null = null;
  for (const el of els) {
    if (!last || last.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) last = el;
  }
  return last;
}

export function Navbar({ logo }: { logo: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [sheetReady, setSheetReady] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");
  const [active, setActive] = useState<string | null>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  // Section theme under the nav: a 1px line through the pill's centre.
  useEffect(() => {
    const seen = new Set<Element>();
    let io: IntersectionObserver | null = null;
    const build = () => {
      io?.disconnect();
      seen.clear();
      const pill = pillRef.current?.getBoundingClientRect();
      const y = Math.round(pill ? pill.top + pill.height / 2 : 40);
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) seen.add(e.target);
            else seen.delete(e.target);
          }
          const top = lastInDocOrder(seen) as HTMLElement | null;
          const t = (top?.dataset.theme as Theme | undefined) ?? "dark";
          setTheme(t);
          document.documentElement.dataset.under = t;
        },
        { rootMargin: `-${y}px 0px -${Math.max(0, window.innerHeight - y - 1)}px 0px` },
      );
      document.querySelectorAll("[data-theme]").forEach((el) => io!.observe(el));
    };
    build();
    window.addEventListener("resize", build);
    return () => {
      window.removeEventListener("resize", build);
      io?.disconnect();
    };
  }, []);

  // Scroll-spy for the in-page links.
  useEffect(() => {
    const seen = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) seen.add(e.target);
          else seen.delete(e.target);
        }
        setActive((lastInDocOrder(seen) as HTMLElement | null)?.id ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    site.nav.links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // The red dot slides under the active link (transform only).
  useEffect(() => {
    const dot = dotRef.current;
    const link = listRef.current?.querySelector<HTMLElement>('a[aria-current="location"]');
    if (!dot) return;
    if (!link) {
      dot.style.opacity = "0";
      return;
    }
    dot.style.transform = `translateX(${link.offsetLeft + link.offsetWidth / 2 - 3}px)`;
    dot.style.opacity = "1";
  }, [active]);

  // Hide going down, return going up; compact after the hero.
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const dy = y - lastY;
        setCompact(y > window.innerHeight * 0.6);
        const focusInside = navRef.current?.contains(document.activeElement) ?? false;
        if (y < 120 || focusInside) setHidden(false);
        else if (dy > 8) setHidden(true);
        else if (dy < -8) setHidden(false);
        if (Math.abs(dy) > 8 || y < 120) lastY = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Load moment, part one: the logo's car line draws itself (CSS transition, see globals.css).
  // Then, once the browser is idle, fetch the mobile sheet so the first tap is instant.
  useEffect(() => {
    const t = window.setTimeout(() => document.querySelector('[data-logo="nav-logo"]')?.setAttribute("data-drawn", ""), 120);
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(() => setSheetReady(true), { timeout: 4000 })
      : window.setTimeout(() => setSheetReady(true), 2500);
    return () => {
      window.clearTimeout(t);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  const go = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToId(id);
  }, []);

  const isHidden = hidden && !open;

  return (
    <>
      <header
        ref={navRef}
        data-nav-theme={open ? "dark" : theme}
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4",
          "pt-[calc(env(safe-area-inset-top)+12px)] lg:pt-[calc(env(safe-area-inset-top)+16px)]",
          "transition-transform duration-320 ease-ui motion-reduce:transition-none",
          isHidden && "translate-y-[-130%]",
        )}
      >
        <div
          ref={pillRef}
          data-compact={compact || undefined}
          className={cn(
            "glass pointer-events-auto flex h-14 w-full items-center justify-between rounded-full pl-5 pr-1.5",
            "shadow-[0_10px_30px_-12px_rgb(0_0_0/0.45)] lg:h-15 lg:w-auto lg:gap-2 lg:pl-6",
            "text-paper transition-colors duration-240 in-data-[nav-theme=light]:text-carbon",
            "data-compact:before:scale-y-[0.9] data-compact:after:scale-y-[0.9] before:transition-[opacity,scale] after:transition-[opacity,scale] before:duration-320 after:duration-320",
          )}
        >
          <a
            href="#top"
            onClick={(e) => {
              setOpen(false);
              go(e, "top");
            }}
            className="pressable -my-1 flex min-h-11 items-center rounded-full pr-2"
            aria-label="OtoXperts, back to top"
          >
            {logo}
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul ref={listRef} className="relative flex items-center">
              {site.nav.links.map((l) => {
                const isActive = active === l.id;
                return (
                  <li key={l.id}>
                    <a
                      href={`#${l.id}`}
                      onClick={(e) => go(e, l.id)}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "relative flex min-h-11 items-center px-3.5 text-[0.9375rem] font-[540] transition-opacity duration-180",
                        isActive ? "opacity-100" : "opacity-75 hover:opacity-100",
                      )}
                    >
                      {l.label}
                    </a>
                  </li>
                );
              })}
              <span
                ref={dotRef}
                aria-hidden="true"
                className="pointer-events-none absolute bottom-1.5 left-0 size-1.5 rounded-full bg-signal opacity-0 transition-[transform,opacity] duration-350 ease-ui motion-reduce:transition-none"
              />
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <a
              href="#book"
              onClick={(e) => {
                setOpen(false);
                go(e, "book");
              }}
              className={cn(
                "pressable inline-flex min-h-11 items-center rounded-full px-4 text-[0.9375rem] font-[640] transition-colors duration-240 lg:ml-2 lg:px-5",
                "bg-paper text-carbon in-data-[nav-theme=light]:bg-carbon in-data-[nav-theme=light]:text-paper",
              )}
            >
              <span className="lg:hidden">{site.nav.ctaShort}</span>
              <span className="hidden lg:inline">{site.nav.cta}</span>
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="pressable relative grid size-11 place-items-center rounded-full lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? site.nav.menuClose : site.nav.menuOpen}
              onClick={() => {
                setSheetReady(true);
                setOpen((v) => !v);
              }}
            >
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-[1.5px] w-5 rounded-full bg-current transition-transform duration-320 ease-ui",
                    open && "translate-y-[5.25px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-[1.5px] w-5 rounded-full bg-current transition-transform duration-320 ease-ui",
                    open && "translate-y-[-5.25px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {sheetReady && <MobileSheet open={open} onClose={() => setOpen(false)} pillRef={pillRef} toggleRef={toggleRef} />}
    </>
  );
}
