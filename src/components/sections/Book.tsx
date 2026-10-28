import { PhoneIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/ssr";
import { site } from "@/content/site";
import { telLink, mailLink } from "@/lib/whatsapp";
import { LOGO_PATHS } from "@/components/brand/logo-paths";
import { BookingForm } from "./BookingForm";
import { RevealMount } from "@/components/motion/RevealMount";

const { book } = site;

/** The night bookend and the page's one centred moment. */
export function Book() {
  return (
    <section id="book" aria-labelledby="book-title" data-theme="dark" className="relative overflow-hidden bg-carbon text-paper">
      {/* The logo's car line, large and quiet; the scroll layer draws it in. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 924 180"
        className="pointer-events-none absolute left-1/2 top-12 w-[min(1400px,160vw)] -translate-x-1/2 text-white/[0.07] lg:top-16"
        data-book-line
      >
        <path d={LOGO_PATHS.carline} fill="currentColor" />
      </svg>

      <div className="container-x section-y relative text-center">
        <h2 id="book-title" className="display-1 mx-auto max-w-[14ch]">
          {book.h2}
        </h2>
        <p className="body-l mx-auto mt-6 max-w-[32ch] text-white/75">{book.sub}</p>

        <div className="mx-auto mt-12 max-w-3xl text-left">
          <BookingForm />
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-2 text-[0.9375rem] text-white/75 sm:flex-row sm:gap-6">
          <a href={telLink} className="inline-flex min-h-11 items-center gap-2 hover:text-paper">
            <PhoneIcon className="size-5" aria-hidden="true" />
            <span>
              {book.or} <span className="reading text-paper">{site.brand.phone.display}</span>
            </span>
          </a>
          <a href={mailLink} className="inline-flex min-h-11 items-center gap-2 hover:text-paper">
            <EnvelopeSimpleIcon className="size-5" aria-hidden="true" />
            <span className="text-paper">{site.brand.email}</span>
          </a>
        </div>
      </div>
      <RevealMount name="book" />
    </section>
  );
}
