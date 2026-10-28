"use client";

import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, sectionRef } from "../gsap";

gsap.registerPlugin(DrawSVGPlugin);

/**
 * The report fills in: rows tick in as they reach the reading line, numeric readings
 * settle like a gauge (widths reserved, so nothing shifts), then the verdict and the
 * engineer's signature.
 */
export default function ReportReveal() {
  const scope = sectionRef("report");
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const rows = gsap.utils.toArray<HTMLElement>("[data-report-row]");
        const below = rows.filter((r) => r.getBoundingClientRect().top > window.innerHeight * 0.9);
        gsap.set(below, { opacity: 0, x: -6 });

        ScrollTrigger.batch(below, {
          start: "top 90%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, { opacity: 1, x: 0, duration: 0.45, ease: "power2.out", stagger: 0.06 });
            batch.forEach((row) => {
              const span = (row as HTMLElement).querySelector<HTMLElement>("[data-count]");
              if (!span) return;
              const target = Number(span.dataset.count);
              const text = span.textContent ?? "";
              const suffix = text.replace(/^[\d.,\s]+/, "");
              span.style.display = "inline-block";
              span.style.minWidth = `${span.offsetWidth}px`;
              const o = { v: 0 };
              gsap.to(o, {
                v: target,
                duration: 0.7,
                ease: "power3.out",
                onUpdate: () => (span.textContent = `${Math.round(o.v)} ${suffix}`.trim()),
                onComplete: () => (span.textContent = text),
              });
            });
          },
        });

        gsap.from("[data-report-photo]", {
          opacity: 0,
          y: 10,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.07,
          scrollTrigger: { trigger: "[data-report-photo]", start: "top 88%", once: true },
        });

        const verdict = gsap.timeline({ scrollTrigger: { trigger: "[data-report-verdict]", start: "top 85%", once: true } });
        verdict
          .from("[data-report-verdict] > div:first-child", { opacity: 0, scale: 0.97, duration: 0.3, ease: "power2.out", transformOrigin: "left center" })
          .from("[data-signature]", { drawSVG: 0, duration: 0.9, ease: "power1.inOut" }, "+=0.1");

        return () => {
          gsap.set(rows, { clearProps: "opacity,transform" });
        };
      });
      return () => mm.revert();
    },
    { scope },
  );
  return null;
}
