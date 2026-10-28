import { CheckIcon, WarningIcon, XIcon } from "@phosphor-icons/react/ssr";
import type { Status } from "@/content/site";
import { cn } from "@/lib/cn";

const meta: Record<Status, { word: string; className: string; Icon: typeof CheckIcon }> = {
  pass: { word: "Pass", className: "text-pass", Icon: CheckIcon },
  attn: { word: "Attention", className: "text-attn", Icon: WarningIcon },
  fail: { word: "Fail", className: "text-fail", Icon: XIcon },
};

/** Status is never colour alone: glyph plus the word. */
export function StatusMark({ status, className, hideWord = false }: { status: Status; className?: string; hideWord?: boolean }) {
  const { word, className: tone, Icon } = meta[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-[620]", tone, className)} data-status={status}>
      <Icon weight="bold" className="size-[1.05em] shrink-0" aria-hidden="true" />
      <span className={hideWord ? "sr-only" : undefined}>{word}</span>
    </span>
  );
}

export const statusWord = (s: Status) => meta[s].word;
