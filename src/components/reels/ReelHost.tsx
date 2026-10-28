"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

export type Reel = { code: string; src: string; title: string; poster: string; ratio: string };
type Request = { items: Reel[]; index: number; trigger: HTMLElement };

/** The player is its own chunk, fetched when a reel link is first hovered, focused or pressed. */
const loadDialog = () => import("./ReelDialog").then((m) => m.ReelDialog);
const ReelDialog = dynamic(loadDialog, { ssr: false });

function readReel(a: HTMLAnchorElement): Reel {
  return {
    code: a.dataset.reel ?? "",
    src: a.getAttribute("href") ?? "",
    title: a.dataset.reelTitle ?? "",
    poster: a.dataset.reelPoster ?? "",
    ratio: a.dataset.reelRatio ?? "9 / 16",
  };
}

/**
 * Opens reel links (see ReelLink) in the on-site player. Previous and next step through
 * the links that share the clicked one's group, in page order.
 */
export function ReelHost() {
  const [request, setRequest] = useState<Request | null>(null);

  useEffect(() => {
    const reelLink = (e: Event) => (e.target as Element | null)?.closest?.<HTMLAnchorElement>("a[data-reel]") ?? null;

    let warmed = false;
    const warm = (e: Event) => {
      if (warmed || !reelLink(e)) return;
      warmed = true;
      void loadDialog();
    };

    const onClick = (e: MouseEvent) => {
      // New-tab and download gestures keep the plain link to the MP4.
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = reelLink(e);
      if (!a) return;
      e.preventDefault();
      const group = a.dataset.reelGroup;
      const links = group ? document.querySelectorAll<HTMLAnchorElement>(`a[data-reel-group="${CSS.escape(group)}"]`) : [a];
      const items: Reel[] = [];
      for (const link of links) {
        if (!items.some((r) => r.code === link.dataset.reel)) items.push(readReel(link));
      }
      setRequest({ items, index: Math.max(0, items.findIndex((r) => r.code === a.dataset.reel)), trigger: a });
    };

    document.addEventListener("pointerover", warm, { passive: true });
    document.addEventListener("focusin", warm);
    document.addEventListener("pointerdown", warm, { passive: true });
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("pointerover", warm);
      document.removeEventListener("focusin", warm);
      document.removeEventListener("pointerdown", warm);
      document.removeEventListener("click", onClick);
    };
  }, []);

  if (!request) return null;
  return (
    <ReelDialog
      items={request.items}
      start={request.index}
      onClose={() => {
        setRequest(null);
        request.trigger.focus({ preventScroll: true });
      }}
    />
  );
}
