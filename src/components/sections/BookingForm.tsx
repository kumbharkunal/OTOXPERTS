"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { bookingMessage, waLink } from "@/lib/whatsapp";
import { formatDateIN } from "@/lib/format";
import { haptic } from "@/lib/haptics";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import { cn } from "@/lib/cn";

const { book } = site;
type Field = "name" | "phone" | "city" | "car" | "date";
type Errors = Partial<Record<Field, string>>;

const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

/** Indian mobile: optional +91 / 0, then 10 digits starting 6 to 9. */
function normalisePhone(raw: string) {
  const digits = raw.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
  return /^[6-9]\d{9}$/.test(digits) ? `+91 ${digits.slice(0, 5)} ${digits.slice(5)}` : null;
}

/** No backend: the form writes a WhatsApp message to OtoXperts and opens it. */
export function BookingForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");
  const dateRef = useRef<HTMLInputElement>(null);

  // Today's date is set on the client only, so server and client HTML match.
  useEffect(() => {
    dateRef.current?.setAttribute("min", todayISO());
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const v = (k: Field) => String(data.get(k) ?? "").trim();
    const next: Errors = {};
    const phone = normalisePhone(v("phone"));
    if (v("name").length < 2) next.name = book.errors.name;
    if (!phone) next.phone = book.errors.phone;
    if (!v("city")) next.city = book.errors.city;
    if (v("car").length < 2) next.car = book.errors.car;
    if (!v("date") || v("date") < todayISO()) next.date = book.errors.date;
    setErrors(next);

    const firstBad = (Object.keys(next) as Field[])[0];
    if (firstBad) {
      haptic("warn");
      setStatus("");
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }

    const url = waLink(
      bookingMessage({ name: v("name"), phone: phone!, city: v("city"), car: v("car"), date: formatDateIN(v("date")) }),
    );
    haptic("success");
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
    setStatus(book.opened);
  };

  const field = "mt-2 block w-full min-h-12 rounded-sm bg-white/[0.06] px-4 text-[1rem] text-paper ring-1 ring-inset ring-white/20 placeholder:text-white/55 transition-shadow duration-180 hover:ring-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-paper [color-scheme:dark] aria-[invalid=true]:ring-signal";
  const label = "block text-[0.9375rem] text-white/80";
  const err = (f: Field) =>
    errors[f] ? (
      <p id={`${uid}-${f}-err`} className="mt-1.5 text-[0.875rem] text-[#ff8a8a]">
        {errors[f]}
      </p>
    ) : null;
  const describe = (f: Field) => (errors[f] ? `${uid}-${f}-err` : undefined);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-x-4 gap-y-5 md:grid-cols-2" aria-describedby={`${uid}-privacy`}>
      <div>
        <label htmlFor={`${uid}-name`} className={label}>
          {book.fields.name}
        </label>
        <input id={`${uid}-name`} name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={describe("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor={`${uid}-phone`} className={label}>
          {book.fields.phone}
        </label>
        <input
          id={`${uid}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="98765 43210"
          className={cn(field, "reading")}
          aria-invalid={!!errors.phone}
          aria-describedby={describe("phone")}
        />
        {err("phone")}
      </div>
      <div>
        <label htmlFor={`${uid}-city`} className={label}>
          {book.fields.city}
        </label>
        <select id={`${uid}-city`} name="city" required defaultValue="" className={cn(field, "appearance-none invalid:text-white/55")} aria-invalid={!!errors.city} aria-describedby={describe("city")}>
          <option value="" disabled>
            {book.cityPlaceholder}
          </option>
          {book.cityOptions.map((c) => (
            <option key={c} value={c} className="bg-carbon">
              {c}
            </option>
          ))}
        </select>
        {err("city")}
      </div>
      <div>
        <label htmlFor={`${uid}-car`} className={label}>
          {book.fields.car}
        </label>
        <input id={`${uid}-car`} name="car" placeholder={book.carPlaceholder} className={field} aria-invalid={!!errors.car} aria-describedby={describe("car")} />
        {err("car")}
      </div>
      <div>
        <label htmlFor={`${uid}-date`} className={label}>
          {book.fields.date}
        </label>
        <input ref={dateRef} id={`${uid}-date`} name="date" type="date" className={cn(field, "reading")} aria-invalid={!!errors.date} aria-describedby={describe("date")} />
        {err("date")}
      </div>
      <div className="flex items-end">
        <button
          type="submit"
          data-haptic="off"
          className="pressable inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-paper px-6 font-[640] text-carbon transition-colors duration-180 hover:bg-concrete"
        >
          <WhatsAppGlyph className="size-5" />
          {book.submit}
        </button>
      </div>
      <p id={`${uid}-privacy`} className="text-[0.8125rem] text-white/60 md:col-span-2">
        {book.privacy}
      </p>
      <p role="status" aria-live="polite" className="text-[0.9375rem] text-paper md:col-span-2 empty:hidden">
        {status}
      </p>
    </form>
  );
}
