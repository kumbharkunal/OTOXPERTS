"use client";

import { useEffect } from "react";
import { setLenis } from "@/lib/scroll";

/**
 * Lenis driven by GSAP's ticker, synced to ScrollTrigger on one RAF.
 * Loaded after hydration (never on the H1's critical path) and never under reduced motion.
 * Touch keeps native scrolling (syncTouch off).
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    let cancelled = false;
    let teardown: (() => void) | undefined;

    const init = async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ autoRaf: false, lerp: 0.11, wheelMultiplier: 1, syncTouch: false });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);

      const onReduce = () => {
        if (reduce.matches) teardown?.();
      };
      reduce.addEventListener("change", onReduce);

      teardown = () => {
        reduce.removeEventListener("change", onReduce);
        gsap.ticker.remove(tick);
        lenis.destroy();
        setLenis(null);
      };
    };

    // Smooth scrolling is a nicety: start it once the browser is idle after load.
    const idle = window.requestIdleCallback ? window.requestIdleCallback(() => void init(), { timeout: 2000 }) : window.setTimeout(() => void init(), 800);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      teardown?.();
    };
  }, []);

  return null;
}
