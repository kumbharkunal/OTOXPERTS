import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "light" | "dark" | "ghost-on-dark" | "ghost-on-light";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  // White pill on dark grounds, black pill on light grounds (red stays for evidence).
  light: "bg-paper text-carbon hover:bg-concrete",
  dark: "bg-carbon text-paper hover:bg-graphite",
  "ghost-on-dark": "text-paper ring-1 ring-inset ring-white/30 hover:ring-white/70 hover:bg-white/5",
  "ghost-on-light": "text-carbon ring-1 ring-inset ring-black/20 hover:ring-black/60 hover:bg-black/[0.03]",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-[0.9375rem] gap-2.5",
  lg: "min-h-13 px-6 text-base gap-3",
};

const base =
  "pressable inline-flex items-center justify-center rounded-full font-[620] leading-none whitespace-nowrap select-none transition-[background-color,box-shadow,color] duration-180 ease-ui";

type AnchorProps = ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
};

export function ButtonLink({ variant = "light", size = "md", icon, className, children, ...rest }: AnchorProps) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {icon}
      <span>{children}</span>
    </a>
  );
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
};

export function Button({ variant = "light", size = "md", icon, className, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {icon}
      <span>{children}</span>
    </button>
  );
}

/** Opens in a new tab with the right rel; label gains a visually hidden hint. */
export const external = { target: "_blank", rel: "noopener noreferrer" } as const;
