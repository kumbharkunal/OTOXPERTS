"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { m, useReducedMotion, type Variants } from "motion/react";
import { PhoneIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/ssr";
import { site } from "@/content/site";
import { waLink, telLink, mailLink } from "@/lib/whatsapp";
import { lockScroll, unlockScroll, scrollToId } from "@/lib/scroll";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import { SocialLinks } from "@/components/ui/SocialLinks";

type Props = {
  open: boolean;
  onClose: () => void;
  pillRef: RefObject<HTMLDivElement | null>;
  toggleRef: RefObject<HTMLButtonElement | null>;
};

const FULL = "inset(0px 0px 0px 0px round 0px)";

/** The pill's own rectangle, so the sheet grows out of it and shrinks back into it. */
function pillClip(pill: HTMLElement | null) {
  if (!pill) return "inset(12px 16px calc(100% - 68px) 16px round 28px)";
  const r = pill.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  return `inset(${r.top}px ${vw - r.right}px ${vh - r.bottom}px ${r.left}px round ${r.height / 2}px)`;
}

export function MobileSheet({ open, onClose, pillRef, toggleRef }: Props) {
  const reduce = useReducedMotion();
  const sheetRef = useRef<HTMLDivElement>(null);
  const pending = useRef<string | null>(null);
  // Motion reports a "closed" completion when its features load; only act after a real open.
  const wasOpen = useRef(false);
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState("inset(12px 16px calc(100% - 68px) 16px round 28px)");

  // Measure the pill each time we open, so the morph starts exactly on it.
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      setClosed(pillClip(pillRef.current));
      setVisible(true);
      lockScroll();
      document.getElementById("main")?.setAttribute("inert", "");
      requestAnimationFrame(() => sheetRef.current?.querySelector<HTMLElement>("a, button")?.focus({ preventScroll: true }));
    } else {
      document.getElementById("main")?.removeAttribute("inert");
    }
  }, [open, pillRef]);

  const afterClose = useCallback(() => {
    if (!wasOpen.current) return;
    wasOpen.current = false;
    setVisible(false);
    unlockScroll();
    toggleRef.current?.focus({ preventScroll: true });
    const id = pending.current;
    pending.current = null;
    if (id) requestAnimationFrame(() => scrollToId(id));
  }, [toggleRef]);

  // Esc closes; Tab stays inside the sheet plus the toggle that now reads "Close menu".
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const sheet = sheetRef.current;
      const toggle = toggleRef.current;
      if (!sheet || !toggle) return;
      const items = [toggle, ...sheet.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")];
      const i = items.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : i === items.length - 1 ? 0 : i + 1;
      e.preventDefault();
      items[next]?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, toggleRef]);

  const sheet: Variants = reduce
    ? {
        open: { opacity: 1, clipPath: FULL, transition: { duration: 0.15 } },
        closed: { opacity: 0, clipPath: FULL, transition: { duration: 0.15 } },
      }
    : {
        open: { opacity: 1, clipPath: FULL, transition: { type: "spring", duration: 0.42, bounce: 0, delayChildren: 0.12, staggerChildren: 0.04 } },
        closed: { opacity: 1, clipPath: closed, transition: { type: "spring", duration: 0.38, bounce: 0, when: "afterChildren" } },
      };

  const item: Variants = reduce
    ? { open: { opacity: 1 }, closed: { opacity: 0 } }
    : {
        open: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.23, 1, 0.32, 1] } },
        closed: { opacity: 0, y: 8, transition: { duration: 0.08 } },
      };

  return (
    <m.div
      id="mobile-menu"
      ref={sheetRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      data-theme="dark"
      inert={!open}
      initial={false}
      animate={open ? "open" : "closed"}
      variants={sheet}
      onAnimationComplete={(def) => {
        if (def === "closed") afterClose();
      }}
      style={{ visibility: visible || open ? "visible" : "hidden", clipPath: closed }}
      className="fixed inset-0 z-40 flex h-dvh flex-col bg-[rgb(0_0_0/0.86)] text-paper backdrop-blur-[18px] backdrop-saturate-[160%] lg:hidden"
    >
      <nav aria-label="Menu" className="flex flex-1 flex-col justify-center px-6 pt-[calc(env(safe-area-inset-top)+96px)]">
        <m.ul variants={{ open: { transition: { staggerChildren: 0.04 } }, closed: {} }} className="flex flex-col gap-1">
          {site.nav.links.map((l) => (
            <m.li key={l.id} variants={item}>
              <a
                href={`#${l.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  pending.current = l.id;
                  onClose();
                }}
                data-haptic="success"
                className="pressable flex min-h-14 items-center display-3"
              >
                {l.label}
              </a>
            </m.li>
          ))}
        </m.ul>
      </nav>

      <m.div variants={item} className="border-t border-white/14 px-6 pb-[calc(env(safe-area-inset-bottom)+24px)] pt-6">
        <p className="mb-3 text-sm text-muted-dark">{site.nav.sheetContact}</p>
        <div className="flex flex-col gap-2">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="pressable inline-flex min-h-12 items-center gap-3 rounded-full bg-paper px-5 font-[620] text-carbon"
          >
            <WhatsAppGlyph className="size-5" />
            {site.hero.primary}
          </a>
          <div className="flex flex-wrap items-center gap-x-5">
            <a href={telLink} className="inline-flex min-h-11 items-center gap-2 reading">
              <PhoneIcon className="size-5" aria-hidden="true" />
              {site.brand.phone.display}
            </a>
            <a href={mailLink} className="inline-flex min-h-11 items-center gap-2">
              <EnvelopeSimpleIcon className="size-5" aria-hidden="true" />
              {site.brand.email}
            </a>
          </div>
          <SocialLinks className="-ml-2.5 mt-1" />
        </div>
      </m.div>
    </m.div>
  );
}
