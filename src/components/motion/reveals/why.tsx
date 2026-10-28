"use client";

import { gsap, useGSAP, MOTION_OK, sectionRef } from "../gsap";

/** Comparison: each OtoXperts tick lands as its row reaches the reading line. */
export default function WhyReveal() {
  const scope = sectionRef("why");
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>("[data-why-row]").forEach((row) => {
          gsap.from(row.querySelector("[data-why-tick]"), {
            scale: 0.4,
            opacity: 0,
            duration: 0.4,
            ease: "back.out(2.2)",
            scrollTrigger: { trigger: row, start: "top 82%", once: true },
          });
        });
        gsap.from("[data-pillar]", {
          opacity: 0,
          y: 12,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.07,
          scrollTrigger: { trigger: "[data-pillar]", start: "top 88%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope },
  );
  return null;
}
