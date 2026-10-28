"use client";

import { useEffect } from "react";

/**
 * Development only: open /?calibrate, then click a point on the car. The coordinates
 * (in % of the photo, the same units as hero.callouts[].pos in site.ts) are shown,
 * logged and copied to the clipboard. Desktop values at ≥768px, mobile below.
 */
export default function Calibrate() {
  useEffect(() => {
    if (!new URLSearchParams(location.search).has("calibrate")) return;
    const stage = document.querySelector<HTMLElement>("[data-hero-stage]");
    const cover = stage?.querySelector<HTMLElement>(".hero-calloutLayer .hero-cover");
    if (!stage || !cover) return;

    const badge = document.createElement("div");
    Object.assign(badge.style, {
      position: "fixed", left: "12px", bottom: "12px", zIndex: "999", padding: "8px 12px", borderRadius: "8px",
      background: "#ED0C0C", color: "#fff", font: "600 13px/1.3 ui-monospace, monospace",
    });
    badge.textContent = "Calibrate: click a point on the car";
    document.body.appendChild(badge);

    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) return;
      const r = cover.getBoundingClientRect();
      const x = (((e.clientX - r.left) / r.width) * 100).toFixed(1);
      const y = (((e.clientY - r.top) / r.height) * 100).toFixed(1);
      const text = `${window.innerWidth >= 768 ? "desktop" : "mobile"}: { x: ${x}, y: ${y} }`;
      badge.textContent = text;
      console.log(text);
      navigator.clipboard?.writeText(text).catch(() => {});
    };
    stage.addEventListener("click", onClick, true);
    return () => {
      stage.removeEventListener("click", onClick, true);
      badge.remove();
    };
  }, []);
  return null;
}
