import { CheckIcon } from "@phosphor-icons/react/ssr";
import { site } from "@/content/site";
import { RevealMount } from "@/components/motion/RevealMount";

const { why } = site;

/** An honest comparison, not a grid of identical cards. */
export function WhyUs() {
  return (
    <section id="why" aria-labelledby="why-title" data-theme="light" className="bg-concrete text-graphite">
      <div className="container-x section-y">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <h2 id="why-title" className="display-2 text-carbon lg:col-span-6">
            {why.h2}
          </h2>
          <p className="body-l max-w-[40ch] lg:col-span-5 lg:col-start-8 lg:self-end">{why.intro}</p>
        </div>

        <table className="mt-14 w-full border-collapse text-left lg:mt-20">
          <caption className="sr-only">{"The dealer's PDI compared with an OtoXperts inspection"}</caption>
          <thead>
            <tr className="text-[0.875rem] text-muted">
              <th scope="col" className="w-1/4 pb-4 font-normal max-md:hidden">
                <span className="sr-only">Aspect</span>
              </th>
              <th scope="col" className="pb-4 pr-4 font-normal max-md:w-1/2">
                {why.columns[0]}
              </th>
              <th scope="col" className="pb-4 font-[620] text-carbon max-md:w-1/2">
                {why.columns[1]}
              </th>
            </tr>
          </thead>
          <tbody>
            {why.rows.map((r) => (
              <tr key={r.label} className="border-t border-black/12 align-top" data-why-row>
                <th scope="row" className="py-5 pr-4 text-[0.9375rem] font-[600] text-carbon max-md:hidden">
                  {r.label}
                </th>
                <td className="py-5 pr-4 text-[0.9375rem] md:text-[1rem]">
                  <span className="mb-1 block text-[0.8125rem] font-[600] text-carbon md:hidden">{r.label}</span>
                  {r.dealer}
                </td>
                <td className="py-5 text-[0.9375rem] text-carbon md:text-[1rem]">
                  <span className="mb-1 block text-[0.8125rem] md:hidden">&nbsp;</span>
                  <span className="flex gap-2">
                    <CheckIcon weight="bold" className="mt-[0.2em] size-4 shrink-0 text-signal" aria-hidden="true" data-why-tick />
                    {r.us}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <dl className="mt-16 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {why.pillars.map((p) => (
            <div key={p.title} data-pillar>
              <dt className="title text-carbon">{p.title}</dt>
              <dd className="mt-2 text-[0.9375rem]">{p.body}</dd>
            </div>
          ))}
        </dl>
      </div>
      <RevealMount name="why" />
    </section>
  );
}
