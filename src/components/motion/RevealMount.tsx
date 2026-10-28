"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

/**
 * Per-section scroll choreography, each in its own chunk. A module mounts only when its
 * section comes within ~1.5 screens of the viewport, so the first load does no scroll
 * work for sections far below; content is fully visible before (and without) them.
 */
const modules = {
  problem: dynamic(() => import("./reveals/problem"), { ssr: false }),
  explorer: dynamic(() => import("./reveals/explorer"), { ssr: false }),
  process: dynamic(() => import("./reveals/process"), { ssr: false }),
  report: dynamic(() => import("./reveals/report"), { ssr: false }),
  services: dynamic(() => import("./reveals/services"), { ssr: false }),
  why: dynamic(() => import("./reveals/why"), { ssr: false }),
  cities: dynamic(() => import("./reveals/cities"), { ssr: false }),
  book: dynamic(() => import("./reveals/book"), { ssr: false }),
};

export type RevealName = keyof typeof modules;

export function RevealMount({ name }: { name: RevealName }) {
  const marker = useRef<HTMLSpanElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const section = marker.current?.closest("section");
    if (!section) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "150% 0px 150% 0px" },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  const Module = modules[name];
  return (
    <>
      <span ref={marker} hidden />
      {near && <Module />}
    </>
  );
}
