"use client";

import { useState } from "react";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import { MinusIcon } from "@phosphor-icons/react/dist/ssr/Minus";
import { site } from "@/content/site";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/cn";

const pdi = site.services.pdi;

/**
 * Plan comparison. Desktop shows all three plans; phones show one at a time with a
 * segmented switch (without JS, phones also see all three columns).
 */
export function PlanTable() {
  const [plan, setPlan] = useState(1);

  return (
    <>
      <div role="group" aria-label="Choose a plan to compare" className="relative mb-6 hidden grid-cols-3 rounded-full bg-concrete p-1 max-lg:js:grid">
        {/* One pill slides between the options (transform only). */}
        <span
          aria-hidden="true"
          className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-full bg-carbon transition-transform duration-350 ease-ui motion-reduce:transition-none"
          style={{ transform: `translateX(${plan * 100}%)` }}
        />
        {pdi.plans.map((p, i) => (
          <button
            key={p.id}
            type="button"
            aria-pressed={plan === i}
            onClick={() => setPlan(i)}
            data-haptic="select"
            className={cn(
              "pressable relative min-h-11 rounded-full px-1 text-[0.8125rem] font-[600] transition-colors duration-240",
              plan === i ? "text-paper" : "text-graphite",
            )}
          >
            {p.name}
          </button>
        ))}
      </div>

      <table className="w-full border-collapse text-left text-[0.9375rem]">
        <caption className="sr-only">New car PDI plans compared</caption>
        <thead>
          <tr>
            <th scope="col" className="w-[44%] pb-5 align-bottom text-[0.8125rem] font-normal text-muted lg:w-[40%]">
              <span className="sr-only">{"What's included"}</span>
            </th>
            {pdi.plans.map((p, i) => (
              <th key={p.id} scope="col" className={cn("px-2 pb-5 align-bottom font-normal", i !== plan && "max-lg:js:hidden")}>
                <span className="block text-[0.9375rem] font-[620] text-carbon">{p.name}</span>
                <span className="display-3 mt-1 block text-carbon" data-price>
                  {formatINR(p.price)}
                </span>
                <span className="mt-1 block text-[0.8125rem] leading-snug text-muted">{p.blurb}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pdi.rows.map((row) => (
            <tr key={row.label} className="border-t border-rule">
              <th scope="row" className="py-3 pr-3 font-normal text-carbon">
                {row.label}
              </th>
              {row.plans.map((v, i) => (
                <td key={i} className={cn("px-2 py-3", i !== plan && "max-lg:js:hidden")}>
                  {v === true ? (
                    <CheckIcon weight="bold" className="size-4 text-carbon" aria-label={pdi.includedLabel} role="img" />
                  ) : v === false ? (
                    <MinusIcon className="size-4 text-rule" aria-label={pdi.notIncludedLabel} role="img" />
                  ) : (
                    <span className="text-[0.875rem] text-graphite">{v}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
