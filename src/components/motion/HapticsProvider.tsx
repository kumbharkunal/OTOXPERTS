"use client";

import { useEffect } from "react";
import { haptic, type HapticKind } from "@/lib/haptics";

const PRESSABLE =
  'a[href], button, [role="button"], [role="tab"], summary, label, select, input[type="checkbox"], input[type="radio"], input[type="submit"], [data-haptic]';

/**
 * One delegated listener gives every press a short vibration on touch devices.
 * `click` (not pointerdown) so it never fires when a scroll starts.
 * Opt out with data-haptic="off"; override with data-haptic="select|success|warn".
 */
export function HapticsProvider() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest<HTMLElement>(PRESSABLE);
      if (!target) return;
      if (target.closest('[data-haptic="off"]')) return;
      if (target.matches(":disabled, [aria-disabled='true']")) return;
      const kind = (target.dataset.haptic as HapticKind | undefined) ?? (target.matches('[role="tab"], summary') ? "select" : "tap");
      haptic(kind);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
