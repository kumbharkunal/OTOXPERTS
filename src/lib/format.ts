const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** ₹ with Indian digit grouping: 199999 → ₹1,99,999. */
export function formatINR(amount: number) {
  return inr.format(amount);
}

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" });

/** "2026-11-14" → "14 Nov 2026" (parsed as a local calendar date, not UTC). */
export function formatDateIN(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return dateFmt.format(new Date(y, m - 1, d));
}
