import Image from "next/image";
import { PlayIcon } from "@phosphor-icons/react/ssr";
import { site } from "@/content/site";
import { formatDuration } from "@/content/videos";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { ReelLink } from "@/components/reels/ReelLink";

const { proof } = site;

/** Only real, attributable proof: their verified Instagram and customers on camera. */
export function Proof() {
  return (
    <section id="proof" aria-labelledby="proof-title" data-theme="light" className="bg-paper text-graphite">
      <div className="container-x section-y grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="proof-title" className="display-2 text-carbon">
            {proof.h2}
          </h2>
          <p className="body-l mt-6 max-w-[34ch]">{proof.body}</p>
          <a
            href={site.brand.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="pressable mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-carbon pl-2 pr-6 font-[620] text-paper"
          >
            <span className="grid size-9 place-items-center rounded-full bg-paper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brands/instagram.svg" alt="" width={22} height={22} loading="lazy" decoding="async" />
            </span>
            {proof.follow}
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <div className="mt-8 flex items-center gap-3 text-[0.875rem] text-muted">
            {proof.elsewhere}
            <SocialLinks className="-ml-1" />
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <h3 className="text-[0.875rem] font-[620] text-carbon">{proof.reelsTitle}</h3>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {proof.reels.map((r) => (
              <li key={r.video}>
                <ReelLink
                  code={r.video}
                  title={`${r.label}, ${r.detail}`}
                  group="customers"
                  className="group/reel relative block overflow-hidden rounded-md bg-carbon text-paper"
                  fallback={
                    <div className="grid aspect-[9/16] content-end rounded-md bg-concrete p-3">
                      <span className="block text-[1rem] font-[620] text-carbon">{r.label}</span>
                      <span className="block text-[0.8125rem] text-muted">{r.detail}</span>
                    </div>
                  }
                >
                  {(v) => (
                    <>
                      <Image
                        src={v.poster}
                        alt=""
                        width={v.width}
                        height={v.height}
                        sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 46vw"
                        placeholder="blur"
                        blurDataURL={v.blurDataURL}
                        quality={75}
                        className="aspect-[9/16] w-full object-cover transition-transform duration-500 ease-ui group-hover/reel:scale-[1.03]"
                      />
                      {/* Neutral scrim so the caption reads over any frame */}
                      <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-transparent" />
                      <span aria-hidden="true" className="absolute left-3 top-3 grid size-10 place-items-center rounded-full bg-paper/92 text-carbon transition-transform duration-180 ease-ui group-active/reel:scale-95">
                        <PlayIcon weight="fill" className="size-4 translate-x-px" />
                      </span>
                      <span aria-hidden="true" className="reading absolute right-3 top-3.5 rounded-full bg-black/55 px-2 py-0.5 text-[0.75rem] text-paper">
                        {formatDuration(v.duration)}
                      </span>
                      <span className="absolute inset-x-3 bottom-3 block">
                        <span className="block text-[1rem] font-[620] leading-tight text-paper">{r.label}</span>
                        <span className="mt-0.5 block text-[0.8125rem] leading-snug text-white/80">{r.detail}</span>
                      </span>
                    </>
                  )}
                </ReelLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
