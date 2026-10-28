import { PlayIcon } from "@phosphor-icons/react/ssr";
import { site } from "@/content/site";
import { formatDuration } from "@/content/videos";
import { Shot } from "@/components/ui/Shot";
import { ReelLink } from "@/components/reels/ReelLink";
import { RevealMount } from "@/components/motion/RevealMount";

const { problem } = site;

/** The daylight curtain: slides over the sticky night bay (see hero.module.css). */
export function Problem() {
  return (
    <section id="problem" aria-labelledby="problem-title" data-theme="light" className="relative z-10 bg-paper text-graphite">
      <div className="container-x section-y">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h2 id="problem-title" className="display-2 max-w-[15ch] text-carbon">
              {problem.h2}
            </h2>
            <div className="body-l measure mt-8 space-y-5">
              {problem.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Shot
              name="stockyard"
              alt={problem.image.alt}
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 60vw, 100vw"
              className="max-w-[28rem]"
            />
          </div>
        </div>

        <div className="mt-20 grid gap-8 lg:mt-28 lg:grid-cols-12 lg:gap-10" data-finds>
          <div className="lg:col-span-4">
            <h3 className="title text-carbon">{problem.findsTitle}</h3>
            <p className="mt-2 max-w-[30ch] text-[0.9375rem] text-muted">{problem.findsNote}</p>
          </div>
          <ul className="lg:col-span-8">
            {problem.finds.map((f) => {
              const where = "place" in f && f.place ? f.place : null;
              return (
                <li key={f.video} className="group flex gap-4 py-4 sm:gap-6" data-find>
                  <span className="mt-[0.55em] size-2.5 shrink-0 rounded-full bg-signal" data-find-dot aria-hidden="true" />
                  <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                    <p className="text-[1.0625rem] leading-snug text-carbon">
                      {f.text}
                      {where ? <span className="text-muted"> {where}</span> : null}
                    </p>
                    <ReelLink
                      code={f.video}
                      title={where ? `${f.text} ${where}` : f.text}
                      group="finds"
                      srText={`: ${f.text}`}
                      className="group/reel -ml-1 inline-flex min-h-11 shrink-0 items-center gap-2.5 self-start rounded-full pr-1 text-[0.9375rem] font-[600] text-carbon sm:ml-0 sm:self-auto"
                    >
                      {(v) => (
                        <>
                          <span
                            aria-hidden="true"
                            className="grid size-8 place-items-center rounded-full bg-signal text-paper transition-transform duration-180 ease-ui group-hover/reel:scale-105 group-active/reel:scale-95"
                          >
                            <PlayIcon weight="fill" className="size-3.5 translate-x-px" />
                          </span>
                          <span className="underline decoration-black/20 underline-offset-4 transition-colors group-hover/reel:decoration-black">
                            {problem.linkLabel}
                          </span>
                          <span aria-hidden="true" className="reading text-[0.875rem] font-[500] text-muted">
                            {formatDuration(v.duration)}
                          </span>
                        </>
                      )}
                    </ReelLink>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-20 lg:mt-28">
          <h3 className="title text-carbon">{problem.selfCheckTitle}</h3>
          <dl className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {problem.selfChecks.map((c) => (
              <div key={c.title} data-selfcheck>
                <dt className="display-3 text-carbon">{c.title}</dt>
                <dd className="mt-3 max-w-[34ch] text-[0.9375rem] text-graphite">{c.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <RevealMount name="problem" />
    </section>
  );
}
