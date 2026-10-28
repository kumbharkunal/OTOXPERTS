"use client";

import dynamic from "next/dynamic";

/**
 * Per-section scroll choreography, each in its own chunk loaded after hydration.
 * Content is fully visible before (and without) these modules.
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
  const Module = modules[name];
  return <Module />;
}
