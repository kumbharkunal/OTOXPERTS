import type { AutomotiveBusiness, FAQPage, Service, WithContext } from "schema-dts";
import { site, isTodo } from "@/content/site";

/**
 * Structured data built from site.ts. Only confirmed or published facts go in:
 * no prices (awaiting confirmation), no opening hours (unconfirmed), and only
 * FAQ items that have an answer.
 */
export function buildJsonLd(siteUrl: string) {
  const { brand, cities, faq, services } = site;
  const org: WithContext<AutomotiveBusiness> = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": `${siteUrl}/#business`,
    name: brand.name,
    url: siteUrl,
    logo: `${siteUrl}/logo/otoxperts-on-light@2x.png`,
    image: `${siteUrl}/opengraph-image`,
    slogan: brand.tagline,
    telephone: brand.phone.tel,
    email: brand.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: brand.address.lines[0],
      addressLocality: "Faridabad",
      postalCode: "121002",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    areaServed: cities.hubs.map((h) => ({ "@type": "City", name: h.name })),
    sameAs: Object.values(brand.social),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: brand.phone.tel,
      email: brand.email,
      availableLanguage: ["en", "hi"],
    },
  };

  const serviceList: WithContext<Service>[] = [
    { title: services.pdi.title, body: services.pdi.body },
    ...services.others.map((o) => ({ title: o.title, body: o.body })),
  ].map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.body,
    serviceType: "Vehicle inspection",
    provider: { "@id": `${siteUrl}/#business` },
    areaServed: cities.hubs.map((h) => ({ "@type": "City", name: h.name })),
  }));

  const faqPage: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items
      .filter((i) => !isTodo(i.a))
      .map((i) => ({
        "@type": "Question",
        name: i.q,
        acceptedAnswer: { "@type": "Answer", text: i.a as string },
      })),
  };

  return [org, ...serviceList, faqPage];
}

/** Serialise for a <script> tag, escaping "<" so the payload can't close the tag. */
export function serialiseJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
