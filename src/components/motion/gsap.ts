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
 */
export function splitLines(el: Element | null, trigger: Element | null) {
  if (!el) return;
  SplitText.create(el, {
    type: "lines",
    mask: "lines",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.lines, {
        yPercent: 105,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: trigger ?? el, start: "top 82%", once: true },
      });
    },
  });
}
