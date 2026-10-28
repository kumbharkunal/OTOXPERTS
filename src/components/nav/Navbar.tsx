"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LazyMotion, m } from "motion/react";
import { site } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { MobileSheet } from "./MobileSheet";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/cn";

const loadFeatures = () => import("@/components/motion/features").then((r) => r.default);

type Theme = "dark" | "light";

/** Last element in document order wins: later sections paint over earlier ones (the hero curtain). */
function lastInDocOrder(els: Iterable<Element>) {
  let last: Element | null = null;
  for (const el of els) {
    if (!last || last.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) last = el;
  }
  return last;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");
  const [active, setActive] = useState<string | null>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

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
    const ids = site.nav.links.map((l) => l.id);
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
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

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
  useEffect(() => {
    const t = window.setTimeout(() => document.querySelector('[data-logo="nav-logo"]')?.setAttribute("data-drawn", ""), 120);
    return () => window.clearTimeout(t);
  }, []);

  const go = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToId(id);
  }, []);

  const isHidden = hidden && !open;

  return (
    <LazyMotion features={loadFeatures} strict>
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
            <Logo id="nav-logo" drawable className="w-21.5 lg:w-24.5" title="OtoXperts" />
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center">
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
                      {isActive && (
                        <m.span
                          layoutId="nav-active"
                          aria-hidden="true"
                          className="absolute bottom-1.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-signal"
                          transition={{ type: "spring", duration: 0.35, bounce: 0.1 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
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
              onClick={() => setOpen((v) => !v)}
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

      <MobileSheet open={open} onClose={() => setOpen(false)} pillRef={pillRef} toggleRef={toggleRef} />
    </LazyMotion>
  );
}
