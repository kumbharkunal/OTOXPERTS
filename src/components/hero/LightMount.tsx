"use client";

import dynamic from "next/dynamic";

/** The torch controller is its own chunk, fetched after hydration. GSAP never blocks the H1. */
const InspectionLight = dynamic(() => import("./InspectionLight"), { ssr: false });

export function LightMount() {
  return <InspectionLight />;
}
