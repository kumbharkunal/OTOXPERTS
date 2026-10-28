"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

/** Motion allowed: everything else gets the static, fully visible page. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/** A section element by id, resolved once on the client (these modules never render on the server). */
export function sectionRef(id: string) {
  return { current: typeof document === "undefined" ? null : document.getElementById(id) };
}

/**
 * Headings rise line by line inside a mask. Used once per section at most,
 * and only where the heading opens a new idea.
 *
 * Split once, after fonts load, and revert when done. No autoSplit: re-splitting on
 * layout changes kills and recreates the ScrollTrigger mid-refresh, which can recurse
 * inside ScrollTrigger and take the page down (seen in WebKit).
 */
export function splitLines(el: Element | null, trigger: Element | null) {
  if (!el) return;
  let split: SplitText | null = null;
  let cancelled = false;
  document.fonts.ready.then(() => {
    if (cancelled || !el.isConnected) return;
    split = SplitText.create(el, { type: "lines", mask: "lines" });
    gsap.from(split.lines, {
      yPercent: 105,
      duration: 0.9,
      ease: "expo.out",
      stagger: 0.08,
      scrollTrigger: { trigger: trigger ?? el, start: "top 82%", toggleActions: "play none none none" },
      onComplete: () => {
        split?.revert();
        split = null;
      },
    });
  });
  return () => {
    cancelled = true;
    split?.revert();
  };
}
