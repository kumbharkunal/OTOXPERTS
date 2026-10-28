import { site } from "@/content/site";

/** wa.me link with a prefilled message. */
export function waLink(message: string = site.whatsapp.book) {
  return `https://wa.me/${site.brand.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const telLink = `tel:${site.brand.phone.tel}`;
export const mailLink = `mailto:${site.brand.email}`;

export type BookingDetails = {
  name: string;
  phone: string;
  city: string;
  car: string;
  date: string; // already formatted for display
};

export function bookingMessage(d: BookingDetails) {
  const m = site.book.message;
  return [
    m.intro,
    `${m.name}: ${d.name}`,
    `${m.phone}: ${d.phone}`,
    `${m.city}: ${d.city}`,
    `${m.car}: ${d.car}`,
    `${m.date}: ${d.date}`,
  ].join("\n");
}
