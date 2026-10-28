"use client";

import { gsap, useGSAP, MOTION_OK, sectionRef, splitLines } from "../gsap";

/** Bookend: the logo's car line sweeps across as you arrive, and the tagline rises. */
export default function BookReveal() {
  const scope = sectionRef("book");
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-book-line]",
          { clipPath: "inset(0% 100% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: scope.current, start: "top 85%", end: "top 25%", scrub: true },
          },
        );
        const undoSplit = splitLines(document.getElementById("book-title"), document.getElementById("book"));
        return () => undoSplit?.();
      });
      return () => mm.revert();
    },
    { scope },
  );
  return null;
}
