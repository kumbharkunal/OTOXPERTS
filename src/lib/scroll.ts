import type Lenis from "lenis";

/**
 * Lenis is created lazily by <SmoothScroll /> (never under reduced motion).
 * Everything else reaches it through these helpers and falls back to native scrolling.
 */
let lenis: Lenis | null = null;
const listeners = new Set<(l: Lenis | null) => void>();

export function setLenis(instance: Lenis | null) {
  lenis = instance;
  listeners.forEach((fn) => fn(instance));
}

export function getLenis() {
  return lenis;
}

export function onLenis(fn: (l: Lenis | null) => void) {
  listeners.add(fn);
  fn(lenis);
  return () => {
    listeners.delete(fn);
  };
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Height of the floating nav plus breathing room, read from CSS. */
export function navOffset() {
  if (typeof window === "undefined") return 0;
  const v = getComputedStyle(document.documentElement).getPropertyValue("--nav-offset");
  return parseFloat(v) || 88;
}

export function scrollToId(id: string, opts: { offset?: number; immediate?: boolean } = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = -(opts.offset ?? navOffset());
  const immediate = opts.immediate || prefersReducedMotion();
  if (lenis && !immediate) {
    lenis.scrollTo(el, { offset, duration: 1.1 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
  }
  history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`);
}

export function scrollToY(y: number) {
  if (lenis && !prefersReducedMotion()) lenis.scrollTo(y, { duration: 0.9 });
  else window.scrollTo({ top: y, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

/* iOS-safe scroll lock: fix the body in place and restore the position afterwards. */
let lockedY = 0;
let locked = false;

export function lockScroll() {
  if (locked) return;
  locked = true;
  lockedY = window.scrollY;
  lenis?.stop();
  const b = document.body.style;
  b.position = "fixed";
  b.top = `-${lockedY}px`;
  b.left = "0";
  b.right = "0";
  b.width = "100%";
}

export function unlockScroll() {
  if (!locked) return;
  locked = false;
  const b = document.body.style;
  b.position = "";
  b.top = "";
  b.left = "";
  b.right = "";
  b.width = "";
  window.scrollTo(0, lockedY);
  lenis?.start();
}
