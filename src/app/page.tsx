import { Hero } from "@/components/hero/Hero";
import { Problem } from "@/components/sections/Problem";
import { Explorer } from "@/components/sections/Explorer";
import { Process } from "@/components/sections/Process";
import { Report } from "@/components/sections/Report";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Cities } from "@/components/sections/Cities";
import { Days } from "@/components/sections/Days";
import { Proof } from "@/components/sections/Proof";
import { Faq } from "@/components/sections/Faq";
import { Book } from "@/components/sections/Book";
import { Footer } from "@/components/sections/Footer";
import { buildJsonLd, serialiseJsonLd } from "@/lib/jsonld";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://otoxperts.vercel.app";

export default function Home() {
  return (
    <>
      <main id="main" tabIndex={-1} className="outline-none">
        {/* The night bay stays put while the daylight section slides over it. */}
        <div className="hero-curtain">
          <Hero />
          <Problem />
        </div>
        <Explorer />
        <Process />
        <Report />
        <Services />
        <WhyUs />
        <Cities />
        <Days />
        <Proof />
        <Faq />
        <Book />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialiseJsonLd(buildJsonLd(siteUrl)) }} />
    </>
  );
}
