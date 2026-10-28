"use client";

import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, sectionRef } from "../gsap";

gsap.registerPlugin(DrawSVGPlugin);

const STEPS = 8;

/**
 * Explorer: the diagram draws itself once, and on desktop the sticky stage maps
 * scroll progress to the active category (Explorer listens for ox:explorer-step).
 */
export default function ExplorerReveal() {
  const scope = sectionRef("checks");
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-diagram] [data-draw]", {
          drawSVG: 0,
          duration: 1.4,
          ease: "power2.inOut",
          stagger: 0.06,
          scrollTrigger: { trigger: "[data-diagram]", start: "top 80%", toggleActions: "play none none none" },
        });
      });
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const track = document.querySelector<HTMLElement>("[data-explorer-track]");
        if (!track) return;
        track.dataset.scrolly = "on";
        let last = -1;
        const st = ScrollTrigger.create({
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          onUpdate(self) {
            const i = Math.min(STEPS - 1, Math.floor(self.progress * STEPS));
            if (i !== last) {
              last = i;
              window.dispatchEvent(new CustomEvent("ox:explorer-step", { detail: i }));
            }
          },
        });
        return () => {
          delete track.dataset.scrolly;
          st.kill();
        };
      });
      return () => mm.revert();
    },
    { scope },
  );
  return null;
}
