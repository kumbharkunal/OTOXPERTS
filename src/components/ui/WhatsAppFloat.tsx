"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppGlyph } from "./WhatsAppGlyph";
import { cn } from "@/lib/cn";

/** Appears once the hero is behind you, steps aside at the booking form. */
export function WhatsAppFloat() {
  const [pastHero, setPastHero] = useState(false);
  const [atBook, setAtBook] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setPastHero(window.scrollY > window.innerHeight * 0.9);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const book = document.getElementById("book");
    const footer = document.querySelector("footer");
    const near = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? near.add(e.target) : near.delete(e.target)));
        setAtBook(near.size > 0);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    if (book) io.observe(book);
    if (footer) io.observe(footer);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const shown = pastHero && !atBook;

  return (
    <a
      href={waLink(site.whatsapp.book)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${site.footer.whatsappLabel} (opens in a new tab)`}
      aria-hidden={!shown || undefined}
      tabIndex={shown ? undefined : -1}
      className={cn(
        "pressable fixed z-30 grid size-14 place-items-center rounded-full bg-paper",
        "right-[max(16px,env(safe-area-inset-right))] bottom-[max(16px,env(safe-area-inset-bottom))]",
        "shadow-[0_10px_28px_-10px_rgb(0_0_0/0.5),0_0_0_1px_rgb(0_0_0/0.06)]",
        "transition-[opacity,translate] duration-240 ease-ui motion-reduce:transition-opacity",
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <WhatsAppGlyph className="size-7" />
    </a>
  );
}
