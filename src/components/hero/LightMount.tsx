"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

/**
 * The torch controller is its own chunk, started once the browser is idle after load.
 * Until then the hero is the fully lit, server-rendered frame; then the bay goes dark
 * and the light sweeps in. GSAP never blocks the H1.
 */
const InspectionLight = dynamic(() => import("./InspectionLight"), { ssr: false });

/** Development-only callout calibration (/?calibrate); compiled out of production. */
const Calibrate = process.env.NODE_ENV === "production" ? null : dynamic(() => import("./Calibrate"), { ssr: false });

export function LightMount() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => setReady(true);
    if (window.requestIdleCallback) {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(start, 600);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      {ready && <InspectionLight />}
      {Calibrate && <Calibrate />}
    </>
  );
}
