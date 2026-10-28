import type { CSSProperties } from "react";
import { PhoneIcon, CheckIcon, MapPinIcon } from "@phosphor-icons/react/ssr";
import { site } from "@/content/site";
import { waLink, telLink } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import { StatusMark } from "@/components/ui/StatusMark";
import { HeroArt } from "./HeroArt";
import { LightMount } from "./LightMount";
import "./hero.css";

const { hero } = site;

function calloutStyle(pos: (typeof hero.callouts)[number]["pos"]) {
  return {
    "--x-d": `${pos.desktop.x}%`,
    "--y-d": `${pos.desktop.y}%`,
    "--x-m": `${pos.mobile.x}%`,
    "--y-m": `${pos.mobile.y}%`,
  } as CSSProperties;
}

/**
 * Server-rendered hero. The H1 and buttons paint from HTML with no animation
 * dependency; <LightMount /> adds the torch after hydration.
 */
export function Hero() {
  return (
    <>
      <section id="top" aria-labelledby="hero-title" data-theme="dark" className="hero-stage" data-hero-stage>
        {/* 1. Base photo (LCP) */}
        <div className="hero-media">
          <div className="hero-cover">
            <HeroArt layer="base" alt={hero.image.alt} />
          </div>
        </div>

        {/* 2. Dim overlay: the bay with the lights off (torch mode only) */}
        <div className="hero-dim" aria-hidden="true" />

        {/* 3. The beam: same photo, masked, moved by transforms only */}
        <div className="hero-beam" data-beam aria-hidden="true">
          <div className="hero-beamInner" data-beam-inner>
            <div className="hero-media">
              <div className="hero-cover">
                <HeroArt layer="lit" alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* 4. Scrim behind the copy */}
        <div className="hero-scrim" aria-hidden="true" />

        {/* 5. Callouts, glued to the car by the same cover-box geometry */}
        <div className="hero-calloutLayer">
          <ol className={`hero-cover hero-callouts`} aria-label={hero.listLabel}>
            {hero.callouts.map((c) => (
              <li
                key={c.id}
                className="hero-callout"
                style={calloutStyle(c.pos)}
                data-callout={c.id}
                data-side={c.side}
                data-desktop-only={"desktopOnly" in c && c.desktopOnly ? "" : undefined}
              >
                <button type="button" className="hero-hotspot" data-hotspot aria-describedby={`callout-${c.id}`} data-haptic="select">
                  <span className="sr-only">{c.title}</span>
                </button>
                <div className="hero-label" id={`callout-${c.id}`}>
                  <span className="hero-leader" aria-hidden="true" />
                  <p className="text-[0.8125rem] text-white/70">{c.title}</p>
                  <p className="reading mt-0.5 flex items-baseline gap-2 text-[1.375rem] leading-tight text-white max-[1023px]:justify-start [[data-side=left]_&]:justify-end">
                    {c.reading}
                    <StatusMark status={c.status} className="text-[0.75rem] text-white [&_svg]:text-signal" />
                  </p>
                  <p className="mt-1 text-[0.875rem] leading-snug text-white/80">{c.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Readout for phones and tablets: the lit callout, or all of them without JS */}
        <ul className="hero-readout" data-readout aria-live="polite">
          {hero.callouts
            .filter((c) => !("desktopOnly" in c && c.desktopOnly))
            .map((c, i) => (
              <li key={c.id} className="hero-readoutItem" data-readout-item={c.id} data-active={i === 0 ? "" : undefined}>
                <span className="size-2 self-center rounded-full bg-signal" aria-hidden="true" />
                <span className="text-white/75">{c.title}</span>
                <span className="reading text-right text-white">{c.reading}</span>
                <span className="col-start-2 col-end-4 text-[0.8125rem] text-white/65">{c.note}</span>
              </li>
            ))}
        </ul>

        {/* 6. Copy */}
        <div className="hero-copy">
          <div className="container-x">
            <div className="max-w-[34rem] lg:max-w-[37rem]">
              <h1 id="hero-title" className="display-1 text-paper">
                {hero.h1}
              </h1>
              <p className="body-l mt-5 max-w-[28rem] text-white/80 lg:mt-6">{hero.sub}</p>
              <div className="mt-7 flex flex-col gap-2.5 min-[420px]:flex-row min-[420px]:flex-wrap lg:mt-9">
                <ButtonLink
                  href={waLink(site.whatsapp.book)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                  size="lg"
                  icon={<WhatsAppGlyph className="size-5" />}
                >
                  {hero.primary}
                </ButtonLink>
                <ButtonLink
                  href={telLink}
                  variant="ghost-on-dark"
                  size="lg"
                  icon={<PhoneIcon className="size-5" aria-hidden="true" />}
                  className="reading"
                >
                  {hero.secondary}
                </ButtonLink>
              </div>
              <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[0.875rem] text-white/75 lg:mt-9">
                {hero.trust.map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <CheckIcon weight="bold" className="size-4 text-signal" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-3 flex items-center gap-1.5 text-[0.875rem] text-white/60">
                <MapPinIcon className="size-4" aria-hidden="true" />
                {hero.cities}
              </p>
            </div>
          </div>
          <p className="pointer-events-none absolute bottom-6 right-[var(--gutter)] hidden text-right text-[0.8125rem] text-white/55 lg:block">
            {hero.caption} <span className="hero-hint">{hero.hintPointer}</span>
          </p>
        </div>

        <LightMount />
      </section>
      <div className="hero-scrubSpace" aria-hidden="true" />
    </>
  );
}

