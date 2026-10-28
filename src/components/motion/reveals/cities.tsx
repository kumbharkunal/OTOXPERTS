"use client";

import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { gsap, useGSAP, MOTION_OK, sectionRef } from "../gsap";

gsap.registerPlugin(DrawSVGPlugin);

/** Routes draw out from the Delhi NCR base, then each city lights up. */
export default function CitiesReveal() {
  const scope = sectionRef("cities");
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: "[data-map]", start: "top 75%", toggleActions: "play none none none" } });
        tl.from("[data-map] [data-hub]", { opacity: 0, duration: 0.4, stagger: 0.1 })
          .from("[data-map] [data-route]", { drawSVG: 0, duration: 0.9, ease: "power2.out", stagger: 0.05 }, "-=0.1")
          .from("[data-map] [data-city]", { opacity: 0, duration: 0.3, stagger: 0.05 }, "-=0.6");
      });
      return () => mm.revert();
    },
    { scope },
  );
  return null;
}
