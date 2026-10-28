import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/** Official logos from theSVG (public/brands), shown unmodified at their brand colours. */
const LOGOS = [
  { key: "instagram", label: "Instagram", href: site.brand.social.instagram, w: 24, h: 24 },
  { key: "facebook", label: "Facebook", href: site.brand.social.facebook, w: 24, h: 24 },
  { key: "youtube", label: "YouTube", href: site.brand.social.youtube, w: 34, h: 24 },
  { key: "linkedin", label: "LinkedIn", href: site.brand.social.linkedin, w: 24, h: 24 },
] as const;

export function SocialLinks({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {LOGOS.map((l) => {
        const scale = size / 24;
        return (
          <li key={l.key}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`OtoXperts on ${l.label} (opens in a new tab)`}
              className="pressable grid size-11 place-items-center rounded-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/brands/${l.key}.svg`}
                alt=""
                width={Math.round(l.w * scale)}
                height={Math.round(l.h * scale)}
                loading="lazy"
                decoding="async"
                className="object-contain"
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
