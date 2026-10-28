import { site } from "@/content/site";
import { Rail } from "./Rail";

const { days } = site;

export function Days() {
  return (
    <section id="days" aria-labelledby="days-title" data-theme="light" className="overflow-hidden bg-concrete text-graphite">
      <div className="section-y">
        <Rail
          title={days.h2}
          intro={days.intro}
          prevLabel={days.prev}
          nextLabel={days.next}
          items={days.items.map((d, i) => ({
            key: d.url,
            n: i + 1,
            title: d.title,
            tip: d.tip,
            url: d.url,
            linkLabel: days.linkLabel,
          }))}
        />
      </div>
    </section>
  );
}
