import { site } from "@/content/site";
import { SocialLinks } from "@/components/ui/SocialLinks";

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
          <ul className="mt-4 border-t border-rule">
            {proof.reels.map((r) => (
              <li key={r.url} className="border-b border-rule">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-16 items-center justify-between gap-6 py-4"
                >
                  <span>
                    <span className="title block text-carbon">{r.label}</span>
                    <span className="text-[0.9375rem] text-muted">{r.detail}</span>
                  </span>
                  <span className="shrink-0 text-[0.9375rem] font-[600] text-carbon underline decoration-black/25 underline-offset-4 transition-colors group-hover:decoration-black">
                    Watch
                    <span className="sr-only"> the reel from {r.label} on Instagram (opens in a new tab)</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
