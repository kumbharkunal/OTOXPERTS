import { PlusIcon } from "@phosphor-icons/react/ssr";
import { site, isTodo } from "@/content/site";

const { faq } = site;

/** Native <details>: works without JS and opens on find-in-page. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" data-theme="light" className="bg-concrete text-graphite">
      <div className="container-x section-y grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <h2 id="faq-title" className="display-2 text-carbon lg:sticky lg:top-32">
            {faq.h2}
          </h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          {faq.items.map((item) => {
            const pending = isTodo(item.a);
            return (
              <details key={item.q} className="group border-b border-black/12 first:border-t" name="faq">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.0625rem] font-[600] text-carbon marker:hidden [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <PlusIcon
                    aria-hidden="true"
                    className="size-5 shrink-0 transition-transform duration-240 ease-ui group-open:rotate-45 motion-reduce:transition-none"
                  />
                </summary>
                <div className="pb-6 pr-10 text-[1rem] leading-relaxed motion-safe:group-open:animate-[ox-faq-in_200ms_var(--ease-ui)]">
                  {pending ? <p className="italic text-muted">{faq.pending}</p> : <p className="max-w-[60ch]">{item.a as string}</p>}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
