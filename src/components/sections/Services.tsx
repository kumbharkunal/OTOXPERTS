import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import { PlanTable } from "./PlanTable";
import { RevealMount } from "@/components/motion/RevealMount";

const { services } = site;

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" data-theme="light" className="bg-paper text-graphite">
      <div className="container-x section-y">
        <h2 id="services-title" className="display-2 text-carbon">
          {services.h2}
        </h2>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <h3 className="display-3 text-carbon">{services.pdi.title}</h3>
            <p className="mt-2 text-[1.0625rem]">{services.pdi.body}</p>
            <p className="mt-6 max-w-[30ch] text-[0.9375rem] text-muted">{services.pdi.reserve}</p>
          </div>
          <div className="lg:col-span-9">
            <PlanTable />
          </div>
        </div>

        <ul className="mt-20 grid border-t border-rule lg:mt-28">
          {services.others.map((o) => (
            <li key={o.id} className="grid gap-3 border-b border-rule py-6 md:grid-cols-12 md:items-baseline md:gap-6" data-service>
              <h3 className="title text-carbon md:col-span-4">{o.title}</h3>
              <p className="text-[1rem] md:col-span-5">{o.body}</p>
              <a
                href={waLink(o.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="justify-self-start font-[600] text-carbon underline decoration-black/25 underline-offset-4 transition-colors hover:decoration-black md:col-span-3 md:justify-self-end"
              >
                {services.askLabel}
                <span className="sr-only">: {o.title} (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <RevealMount name="services" />
    </section>
  );
}
