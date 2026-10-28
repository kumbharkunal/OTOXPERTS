import { site } from "@/content/site";
import { Shot } from "@/components/ui/Shot";
import { RevealMount } from "@/components/motion/RevealMount";

const { process } = site;

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" data-theme="light" className="bg-paper text-graphite">
      <div className="container-x section-y grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <h2 id="process-title" className="display-2 text-carbon">
              {process.h2}
            </h2>
            <Shot
              name="engineer-walkround"
              alt={process.image.alt}
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="mt-10 max-lg:max-w-xl"
            />
          </div>
        </div>

        <ol className="relative lg:col-span-6 lg:col-start-7 lg:pt-24" data-steps>
          {/* Rail and the red progress line that the scroll layer draws */}
          <span aria-hidden="true" className="absolute bottom-6 left-[21px] top-6 w-px bg-rule lg:top-30" />
          <span aria-hidden="true" data-steps-progress className="absolute bottom-6 left-[21px] top-6 w-px origin-top bg-signal lg:top-30" />
          {process.steps.map((step, i) => (
            <li key={step.title} className="group relative flex gap-6 pb-12 last:pb-0 sm:gap-8" data-step>
              <span
                aria-hidden="true"
                data-step-marker
                className="reading relative z-10 grid size-11 shrink-0 place-items-center rounded-full border border-rule bg-paper text-[0.9375rem] text-carbon transition-colors duration-240 group-data-[on]:border-signal group-data-[on]:bg-signal group-data-[on]:text-paper"
              >
                {i + 1}
              </span>
              <div className="pt-1.5">
                <h3 className="title text-carbon">{step.title}</h3>
                <p className="mt-2 max-w-[38ch] text-[1.0625rem] leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <RevealMount name="process" />
    </section>
  );
}
