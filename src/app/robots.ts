import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://otoxperts.vercel.app";
const indexable = process.env.NEXT_PUBLIC_INDEXABLE === "true";

/** The pitch demo stays out of search until OtoXperts adopts it (NEXT_PUBLIC_INDEXABLE=true). */
export default function robots(): MetadataRoute.Robots {
  return indexable
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteUrl}/sitemap.xml`, host: siteUrl }
    : { rules: { userAgent: "*", disallow: "/" } };
}
