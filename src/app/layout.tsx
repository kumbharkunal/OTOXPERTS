import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { display, sans } from "./fonts";
import "./globals.css";
import { site } from "@/content/site";
import { Navbar } from "@/components/nav/Navbar";
import { Logo } from "@/components/brand/Logo";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { HapticsProvider } from "@/components/motion/HapticsProvider";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { ReelHost } from "@/components/reels/ReelHost";

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

/**
 * Runs before first paint: swaps no-js for js so enhancements never flash. torch-ready lets
 * the hero paint dark for its light (hero.css). If the light still hasn't started 5 s after
 * the page has loaded (20 s at most), the class goes and the hero shows fully lit. Counting
 * from load keeps a slow connection from lighting the frame just before the light arrives.
 */
const jsClass = `(function(c){c.replace('no-js','js');c.add('torch-ready');var off=function(){c.remove('torch-ready')},t=setTimeout(off,20000);addEventListener('load',function(){clearTimeout(t);setTimeout(off,5000)})})(document.documentElement.classList)`;

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
        <Navbar logo={<Logo id="nav-logo" drawable className="w-21.5 lg:w-24.5" title="OtoXperts" />} />
        {children}
        <WhatsAppFloat />
        <ReelHost />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
