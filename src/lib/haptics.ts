export type HapticKind = "tap" | "select" | "success" | "warn";

const PATTERNS: Record<HapticKind, number | number[]> = {
  tap: 10,
  select: 6,
  success: [10, 50, 10],
  warn: [24, 40, 24],
};

/**
 * iOS Safari has no Vibration API. On iOS 18+, toggling a native switch control
 * inside a user gesture fires the system haptic. Set false to drop the workaround.
 */
const IOS_SWITCH_FALLBACK = true;

let last = 0;
let iosLabel: HTMLLabelElement | null = null;

function coarsePointer() {
  return typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
}

function isIOS() {
  if (typeof navigator === "undefined") return false;
  return /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function iosSwitch(): HTMLLabelElement | null {
  if (iosLabel) return iosLabel;
  const input = document.createElement("input");
  input.type = "checkbox";
  input.setAttribute("switch", "");
  input.id = "ox-haptic-switch";
  input.tabIndex = -1;
  input.setAttribute("aria-hidden", "true");
  const label = document.createElement("label");
  label.htmlFor = input.id;
  label.setAttribute("aria-hidden", "true");
  label.dataset.haptic = "off";
  Object.assign(label.style, { position: "fixed", left: "-9999px", top: "0", width: "1px", height: "1px", overflow: "hidden", opacity: "0", pointerEvents: "none" });
  label.appendChild(input);
  document.body.appendChild(label);
  iosLabel = label;
  return label;
}

/** Short vibration on touch devices. Never fires on desktop pointers. */
export function haptic(kind: HapticKind = "tap") {
  if (!coarsePointer()) return;
  const now = performance.now();
  if (now - last < 80) return;
  last = now;

  if (typeof navigator.vibrate === "function") {
    navigator.vibrate(PATTERNS[kind]);
    return;
  }
  if (IOS_SWITCH_FALLBACK && isIOS()) {
    iosSwitch()?.click();
  }
}
