"use client";

import { gsap, useGSAP, MOTION_OK, sectionRef, splitLines } from "../gsap";

/**
 * Problem: the daylight curtain dims the night bay as it slides over, the heading
 * rises line by line, and each published finding is marked with a red dot first,
 * then its text, like an inspector ticking a list.
 */
export default function ProblemReveal() {
  const scope = sectionRef("problem");
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.to(document.querySelector("[data-hero-stage]"), {
          opacity: 0.3,
          ease: "none",
          scrollTrigger: { trigger: scope.current, start: "top bottom", end: "top top", scrub: true },
        });

        splitLines(document.getElementById("problem-title"), document.getElementById("problem-title"));

        const finds = gsap.utils.toArray<HTMLElement>("[data-find]");
        finds.forEach((row) => {
          const dot = row.querySelector("[data-find-dot]");
          const body = row.querySelector("div");
          gsap
            .timeline({ scrollTrigger: { trigger: row, start: "top 88%", once: true } })
            .from(dot, { scale: 0.6, opacity: 0, duration: 0.35, ease: "back.out(2)" })
            .from(body, { opacity: 0, x: -8, duration: 0.5, ease: "power2.out" }, "-=0.15");
        });

        gsap.from("[data-selfcheck]", {
          opacity: 0,
          y: 14,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: "[data-selfcheck]", start: "top 86%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope },
  );
  return null;
}
