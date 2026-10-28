"use client";

import { useEffect, useRef, useState } from "react";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import { CaretLeftIcon } from "@phosphor-icons/react/dist/ssr/CaretLeft";
import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr/CaretRight";
import { site } from "@/content/site";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import type { Reel } from "./ReelHost";

const { player } = site;

/** Width that lets the reel fill the screen at its own ratio, leaving room for the bars. */
function widthFor(ratio: string) {
  const [w, h] = ratio.split("/").map((n) => Number(n.trim()));
  const wh = w && h ? w / h : 9 / 16;
  return `min(calc((100dvh - 10rem) * ${wh.toFixed(4)}), calc(100vw - 2rem))`;
}

/**
 * The on-site reel player: a native modal dialog (focus trap, Esc and an inert page come
 * from the browser). The video unmounts on close, which stops playback and the download.
 */
export function ReelDialog({ items, start, onClose }: { items: Reel[]; start: number; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  const [index, setIndex] = useState(start);
  const reel = items[index];
  const count = items.length;

  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    lockScroll();
    dialog.showModal();
    const onDialogClose = () => closeRef.current();
    // A press on the dimmed area around the player closes it.
    const onBackdrop = (e: MouseEvent) => {
      if (e.target === frameRef.current || e.target === dialog) dialog.close();
    };
    dialog.addEventListener("close", onDialogClose);
    dialog.addEventListener("click", onBackdrop);
    return () => {
      dialog.removeEventListener("close", onDialogClose);
      dialog.removeEventListener("click", onBackdrop);
      if (dialog.open) dialog.close();
      unlockScroll();
    };
  }, []);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || count < 2) return;
    // Arrow keys step through the group, except while the video has focus (they seek there).
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLVideoElement) return;
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % count);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + count) % count);
    };
    dialog.addEventListener("keydown", onKey);
    return () => dialog.removeEventListener("keydown", onKey);
  }, [count]);

  return (
    <dialog
      ref={ref}
      aria-label={reel.title}
      className="reel-dialog m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-transparent p-0 text-paper backdrop:bg-black/90"
    >
      <div
        ref={frameRef}
        className="flex h-full flex-col items-center justify-center px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-[calc(env(safe-area-inset-top)+1rem)]"
      >
        <div className="flex flex-col gap-3" style={{ width: widthFor(reel.ratio) }}>
          <div className="flex items-start justify-between gap-4">
            <p className="pt-2.5 text-[0.9375rem] leading-snug text-white/85" aria-live="polite">
              {reel.title}
            </p>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label={player.close}
              className="pressable grid size-11 shrink-0 place-items-center rounded-full bg-white/12 transition-colors hover:bg-white/20"
            >
              <XIcon className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div className="overflow-hidden rounded-md bg-black" style={{ aspectRatio: reel.ratio }}>
            <video
              key={reel.code}
              src={reel.src}
              poster={reel.poster}
              aria-label={reel.title}
              controls
              playsInline
              autoPlay
              preload="auto"
              className="size-full object-contain"
            />
          </div>

          {count > 1 && (
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIndex((i) => (i - 1 + count) % count)}
                aria-label={player.prev}
                className="pressable grid size-11 place-items-center rounded-full bg-white/12 transition-colors hover:bg-white/20"
              >
                <CaretLeftIcon className="size-5" aria-hidden="true" />
              </button>
              <p className="reading text-[0.875rem] text-white/70">
                {index + 1} of {count}
              </p>
              <button
                type="button"
                onClick={() => setIndex((i) => (i + 1) % count)}
                aria-label={player.next}
                className="pressable grid size-11 place-items-center rounded-full bg-white/12 transition-colors hover:bg-white/20"
              >
                <CaretRightIcon className="size-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
