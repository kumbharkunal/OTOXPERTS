import { site, isTodo } from "@/content/site";
import { telLink, mailLink, waLink } from "@/lib/whatsapp";
import { SocialLinks } from "@/components/ui/SocialLinks";

const { footer, brand } = site;

function LegalLink({ label, url }: { label: string; url: string | { todo: string } }) {
  if (isTodo(url)) {
    return <span className="text-white/55" title="To be supplied by OtoXperts">{label}</span>;
  }
  return (
    <a href={url} className="hover:text-paper">
      {label}
    </a>
  );
}

export function Footer() {
  const legal = isTodo(brand.legalName) ? brand.name : brand.legalName;
  return (
    <footer data-theme="dark" className="bg-carbon pb-[calc(env(safe-area-inset-bottom)+32px)] text-white/75">
      <div className="container-x border-t border-white/12 pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            {/* A cached file rather than a second inline copy of the logo paths. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/otoxperts-on-dark.svg" alt="OtoXperts" width={192} height={62} loading="lazy" decoding="async" />
            <p className="mt-5 text-paper">{brand.tagline}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="text-[0.875rem] font-[620] text-paper">{footer.contactTitle}</h2>
              <ul className="mt-4 space-y-1 text-[0.9375rem]">
                <li>
                  <a href={telLink} className="reading inline-flex min-h-11 items-center hover:text-paper">
                    {brand.phone.display}
                  </a>
                </li>
                <li>
                  <a href={waLink(site.whatsapp.general)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-paper">
                    WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <a href={mailLink} className="inline-flex min-h-11 items-center break-all hover:text-paper">
                    {brand.email}
                  </a>
                </li>
                <li className="pt-2 leading-relaxed">
                  <address className="not-italic">
                    {brand.address.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-[0.875rem] font-[620] text-paper">{footer.citiesTitle}</h2>
              <ul className="mt-4 space-y-2 text-[0.9375rem]">
                {site.cities.hubs.map((h) => (
                  <li key={h.name}>{h.name}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[0.875rem] font-[620] text-paper">{footer.followTitle}</h2>
              <SocialLinks className="-ml-2.5 mt-2" />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/12 pt-6 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {legal}. <span className="text-white/55">{brand.credit}.</span>
          </p>
          <p className="flex gap-5">
            <LegalLink label={footer.privacy} url={brand.privacyUrl} />
            <LegalLink label={footer.terms} url={brand.termsUrl} />
          </p>
        </div>
      </div>
    </footer>
  );
}
