"use client";

import { gsap, ScrollTrigger, useGSAP, MOTION_OK, sectionRef } from "../gsap";

/** How it works: a red line grows down the steps; each marker fills as the line reaches it. */
export default function ProcessReveal() {
  const scope = sectionRef("process");
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-steps-progress]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-steps]", start: "top 65%", end: "bottom 65%", scrub: true },
          },
        );
        const triggers = gsap.utils.toArray<HTMLElement>("[data-step]").map((step) =>
          ScrollTrigger.create({
            trigger: step,
            start: "top 65%",
            onEnter: () => step.setAttribute("data-on", ""),
            onLeaveBack: () => step.removeAttribute("data-on"),
          }),
        );
        return () => {
          triggers.forEach((t) => t.kill());
          document.querySelectorAll("[data-step][data-on]").forEach((el) => el.removeAttribute("data-on"));
        };
      });
      return () => mm.revert();
    },
    { scope },
  );
  return null;
}
