"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Anchor = { el: HTMLElement; id: string; x: number; y: number };

/**
 * The inspection light (docs/PLAN.md §7). With JS and motion, CSS already paints the
 * stage torch-ready (dark bay, one readout slot); this controller switches on the light.
 * If it never runs, the frame lights itself after 8 s (html.torch-ready, see layout).
 * Under reduced motion it does nothing and the server-rendered frame stays fully lit.
 *
 * Per frame the work is two transforms (beam + counter-moved inner) and a few
 * distance checks, so the light stays on the compositor.
 */
export default function InspectionLight() {
  const scope = useRef<HTMLElement | null>(typeof document === "undefined" ? null : document.querySelector<HTMLElement>("[data-hero-stage]"));

  useGSAP(
    () => {
      const stage = scope.current;
      if (!stage) return;
      const beam = stage.querySelector<HTMLElement>("[data-beam]");
      const inner = stage.querySelector<HTMLElement>("[data-beam-inner]");
      if (!beam || !inner) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          fine: "(pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          touch: "((pointer: coarse) or (max-width: 1023px)) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { fine, touch } = ctx.conditions as { fine: boolean; touch: boolean };
          if (!fine && !touch) return;

          let W = 0;
          let H = 0;
          let R = 0;
          let anchors: Anchor[] = [];
          const pos = { x: 0, y: 0 };
          let running = true;
          let activeId: string | null = null;

          const measure = () => {
            const s = stage.getBoundingClientRect();
            W = stage.clientWidth;
            H = stage.clientHeight;
            R = beam.offsetWidth / 2;
            inner.style.width = `${W}px`;
            inner.style.height = `${H}px`;
            anchors = [...stage.querySelectorAll<HTMLElement>("[data-callout]")]
              .filter((el) => el.offsetParent !== null)
              .map((el) => {
                const hs = el.querySelector<HTMLElement>("[data-hotspot]")!.getBoundingClientRect();
                return { el, id: el.dataset.callout!, x: hs.left + hs.width / 2 - s.left, y: hs.top + hs.height / 2 - s.top };
              });
          };

          const render = () => {
            if (!running) return;
            const tx = pos.x - R;
            const ty = pos.y - R;
            beam.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
            inner.style.transform = `translate3d(${-tx}px, ${-ty}px, 0)`;
            // Light the callouts inside the beam; the nearest one drives the readout.
            let nearest: Anchor | null = null;
            let best = Infinity;
            for (const a of anchors) {
              const d = Math.hypot(a.x - pos.x, a.y - pos.y);
              const lit = d < R * 0.62;
              if (lit !== a.el.hasAttribute("data-lit")) a.el.toggleAttribute("data-lit", lit);
              if (lit && d < best) {
                best = d;
                nearest = a;
              }
            }
            const id = nearest?.id ?? null;
            if (id && id !== activeId) {
              activeId = id;
              stage.querySelectorAll<HTMLElement>("[data-readout-item]").forEach((li) => li.toggleAttribute("data-active", li.dataset.readoutItem === id));
            }
          };

          measure();
          const first = anchors[0] ?? { x: W * 0.7, y: H * 0.6 };
          pos.x = -R;
          pos.y = first.y;
          stage.dataset.torch = "on";
          gsap.ticker.add(render);

          const qx = gsap.quickTo(pos, "x", { duration: 0.6, ease: "power3" });
          const qy = gsap.quickTo(pos, "y", { duration: 0.6, ease: "power3" });
          const moveTo = (x: number, y: number) => {
            qx(x);
            qy(y);
          };

          // Load moment: in the dark bay the light comes on and finds the first flaw.
          const intro = gsap.timeline({ delay: 0.25 });
          intro.to(beam, { opacity: 1, duration: 0.3, ease: "power1.out" }, 0);
          if (fine) {
            intro.to(pos, { x: first.x, y: first.y, duration: 0.9, ease: "expo.out" }, 0);
          } else {
            const path = anchors.length ? [...anchors, anchors[0]] : [first];
            path.forEach((a, i) => intro.to(pos, { x: a.x, y: a.y, duration: i === 0 ? 0.55 : 0.4, ease: "power2.inOut" }));
          }

          const cleanups: Array<() => void> = [];

          if (fine) {
            const onMove = (e: PointerEvent) => {
              if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
              const s = stage.getBoundingClientRect();
              intro.progress(1);
              moveTo(e.clientX - s.left, e.clientY - s.top);
            };
            const onLeave = () => anchors[0] && moveTo(anchors[0].x, anchors[0].y);
            stage.addEventListener("pointermove", onMove, { passive: true });
            stage.addEventListener("pointerleave", onLeave);
            cleanups.push(() => {
              stage.removeEventListener("pointermove", onMove);
              stage.removeEventListener("pointerleave", onLeave);
            });
          }

          if (touch) {
            // Scroll moves the light along the callouts while the stage holds still.
            const st = ScrollTrigger.create({
              trigger: stage,
              start: "top top",
              end: () => `+=${Math.max(1, window.innerHeight * 0.55)}`,
              scrub: 0.4,
              onUpdate: (self) => {
                if (anchors.length < 2 || intro.isActive()) return;
                const p = self.progress * (anchors.length - 1);
                const i = Math.min(anchors.length - 2, Math.floor(p));
                const t = p - i;
                pos.x = anchors[i].x + (anchors[i + 1].x - anchors[i].x) * t;
                pos.y = anchors[i].y + (anchors[i + 1].y - anchors[i].y) * t;
              },
            });
            cleanups.push(() => st.kill());
          }

          // Hotspots (tap, click, keyboard focus) move the light to themselves.
          const onHotspot = (e: Event) => {
            const li = (e.target as HTMLElement).closest<HTMLElement>("[data-callout]");
            const a = anchors.find((x) => x.el === li);
            if (!a) return;
            intro.progress(1);
            gsap.to(pos, { x: a.x, y: a.y, duration: 0.5, ease: "power3.out", overwrite: true });
          };
          stage.querySelectorAll<HTMLElement>("[data-hotspot]").forEach((b) => {
            b.addEventListener("click", onHotspot);
            b.addEventListener("focus", onHotspot);
            cleanups.push(() => {
              b.removeEventListener("click", onHotspot);
              b.removeEventListener("focus", onHotspot);
            });
          });

          // Pause once the next section has covered the stage.
          const cover = ScrollTrigger.create({
            trigger: document.getElementById("problem"),
            start: "top top",
            onEnter: () => (running = false),
            onLeaveBack: () => (running = true),
          });
          cleanups.push(() => cover.kill());

          const onResize = () => {
            measure();
            render();
          };
          window.addEventListener("resize", onResize);
          cleanups.push(() => window.removeEventListener("resize", onResize));

          return () => {
            gsap.ticker.remove(render);
            cleanups.forEach((fn) => fn());
            delete stage.dataset.torch;
            beam.style.transform = "";
            inner.style.transform = "";
            stage.querySelectorAll("[data-lit]").forEach((el) => el.removeAttribute("data-lit"));
          };
        },
      );

      return () => mm.revert();
    },
    { scope },
  );

  return null;
}
