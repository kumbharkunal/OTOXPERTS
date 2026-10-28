import { site } from "@/content/site";
import { StatusMark } from "@/components/ui/StatusMark";
import { Shot } from "@/components/ui/Shot";
import { RevealMount } from "@/components/motion/RevealMount";
import { cn } from "@/lib/cn";

const { report } = site;
const sheet = report.sheet;

/** The dark interlude: a white report sheet on black, like a document on a lightbox. */
export function Report() {
  return (
    <section id="report" aria-labelledby="report-title" data-theme="dark" className="bg-carbon text-paper">
      <div className="container-x section-y grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="min-w-0 lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2 id="report-title" className="display-2">
              {report.h2}
            </h2>
            <p className="body-l mt-6 max-w-[30ch] text-white/75">{report.sub}</p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]" aria-label="Status key">
              {report.legend.map((l) => (
                <li key={l.status} className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "size-2.5 rounded-full",
                      l.status === "pass" && "bg-[#2fb36a]",
                      l.status === "attn" && "bg-[#e8962e]",
                      l.status === "fail" && "bg-signal",
                    )}
                  />
                  {l.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <article
          className="min-w-0 rounded-md bg-paper p-5 text-graphite sm:p-8 lg:col-span-8 lg:p-10"
          aria-labelledby="report-sheet-title"
          data-report-sheet
        >
          {/* Sheet header: the one place where report-style meta strings belong */}
          <header className="flex flex-col gap-4 border-b border-rule pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="reading text-[0.8125rem] text-signal-ink">{sheet.label}</p>
              <h3 id="report-sheet-title" className="display-3 mt-1 text-carbon">
                {sheet.car}
              </h3>
              <p className="mt-1 text-[0.9375rem] text-muted">
                {sheet.year} · {sheet.kind} · {sheet.place}
              </p>
            </div>
            <p className="reading whitespace-nowrap text-[0.875rem] text-muted sm:text-right">{sheet.number}</p>
          </header>

          <table className="mt-2 w-full border-collapse text-left text-[0.9375rem]">
            <caption className="sr-only">{sheet.caption}</caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">Check</th>
                <th scope="col">Reading</th>
                <th scope="col">Result</th>
              </tr>
            </thead>
            {sheet.sections.map((section) => (
              <tbody key={section.title}>
                <tr>
                  <th colSpan={3} scope="colgroup" className="pb-2 pt-7 text-[0.8125rem] font-[620] text-carbon">
                    {section.title}
                  </th>
                </tr>
                {section.rows.map((row) => (
                  <tr key={row.label} className="border-t border-rule" data-report-row>
                    <th scope="row" className="py-3 pr-3 align-top font-normal">
                      <span className="text-carbon">{row.label}</span>
                      {"note" in row && row.note ? <span className="block text-[0.8125rem] text-muted">{row.note}</span> : null}
                    </th>
                    <td className="reading py-3 pr-3 align-top text-carbon sm:whitespace-nowrap">
                      <span data-count={"count" in row ? row.count : undefined}>{row.value}</span>
                    </td>
                    <td className="py-3 align-top text-[0.875rem]">
                      <StatusMark status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>

          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Photos in this report">
            {sheet.photos.map((p) => (
              <li key={p.key} data-report-photo>
                <Shot name={p.key} alt={p.caption} sizes="(min-width: 1024px) 14vw, 45vw" className="rounded-sm" />
                <p className="mt-1.5 text-[0.75rem] leading-snug text-muted">{p.caption}</p>
              </li>
            ))}
          </ul>

          <footer className="mt-8 grid gap-6 border-t border-rule pt-6 sm:grid-cols-2" data-report-verdict>
            <div>
              <p className="text-[0.8125rem] text-muted">{sheet.verdictLabel}</p>
              <p className="title mt-1 flex items-start gap-2 text-fail">
                <StatusMark status="fail" hideWord className="mt-1" />
                {sheet.verdict}
              </p>
              <p className="mt-1 text-[0.9375rem]">{sheet.verdictReason}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-[0.8125rem] text-muted">{sheet.signoffLabel}</p>
              <p className="mt-1 text-carbon">{sheet.signoff}</p>
              <svg aria-hidden="true" viewBox="0 0 180 36" className="mt-2 h-8 w-36 text-carbon sm:ml-auto" fill="none">
                <path
                  data-signature
                  d="M4 26c10-14 18-20 22-16s-8 18-2 18 14-22 20-20-4 16 2 16 10-12 16-12 2 10 8 10 12-14 18-14 0 12 6 12 16-8 30-10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="reading mt-1 text-[0.8125rem] text-muted">{sheet.issued}</p>
            </div>
          </footer>
        </article>
      </div>
      <RevealMount name="report" />
    </section>
  );
}
