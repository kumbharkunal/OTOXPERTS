"use client";

import { gsap, useGSAP, MOTION_OK, sectionRef } from "../gsap";

/** Prices rise into place like a counter; the service list follows. */
export default function ServicesReveal() {
  const scope = sectionRef("services");
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("#services [data-price]", {
          yPercent: 40,
          opacity: 0,
          duration: 0.7,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: "#services table", start: "top 82%", toggleActions: "play none none none" },
        });
        gsap.from("[data-service]", {
          opacity: 0,
          y: 12,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.06,
          scrollTrigger: { trigger: "[data-service]", start: "top 88%", toggleActions: "play none none none" },
        });
      });
      return () => mm.revert();
    },
    { scope },
  );
  return null;
}
