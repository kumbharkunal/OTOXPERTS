import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { display, sans } from "./fonts";
import "./globals.css";
import { site } from "@/content/site";
import { Navbar } from "@/components/nav/Navbar";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { HapticsProvider } from "@/components/motion/HapticsProvider";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://otoxperts.vercel.app";
// The demo stays out of search results until OtoXperts adopts it (docs/PLAN.md, U1).
const indexable = process.env.NEXT_PUBLIC_INDEXABLE === "true";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.seo.title,
  description: site.seo.description,
  applicationName: site.brand.name,
  alternates: { canonical: "/" },
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: site.brand.name,
    title: site.seo.ogTitle,
    description: site.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.ogTitle,
    description: site.seo.description,
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** Runs before first paint: swaps no-js for js so enhancements never flash. */
const jsClass = `document.documentElement.classList.replace('no-js','js')`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable} no-js`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsClass }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only-focusable left-4 top-4 z-[100] rounded-full bg-paper px-5 py-3 font-[620] text-carbon"
        >
          Skip to content
        </a>
        <HapticsProvider />
        <SmoothScroll />
        <Navbar />
        {children}
        <WhatsAppFloat />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
