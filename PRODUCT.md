# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Primary: Indian new-car buyers in the days before delivery, deciding whether to accept the car the dealer hands over. They are anxious about hidden transit repairs, old stock and missing accessories, and usually book from a phone over WhatsApp or a call.
- Secondary: used-car buyers before they pay, and dealerships, rental companies and fleets that need recurring pre-delivery inspections (listed on otoxperts.com).
- This build is also a pitch: its first audience is the OtoXperts team, who should want to hire Kunal Kumbhar for the full rebuild.

## Product Purpose

OtoXperts (spelling to be confirmed by the client) sends certified engineers to inspect a car at the dealership, stockyard or home before the buyer accepts delivery or pays for a used car. The homepage exists to get a PDI booked over WhatsApp or a call. Success means bookings from delivery-day buyers, and for this demo, the client commissioning the rebuild.

## Positioning

An independent engineer working for the buyer, not the dealer, inspects the car on delivery day with tools (paint gauge, OBD scanner, torch) and hands over evidence before the buyer signs: a report with photos, readings and a clear verdict. The company's own published findings (resprayed "new" cars, replaced doors, odometer tampering) are the proof.

## Operating Context

- Booking happens on WhatsApp (+91 92170 49330, wa.me/919217049330) or by phone; email info@otoxperts.com.
- The engineer visits the showroom, stockyard or an address the buyer chooses; the report is shared digitally (PDF with photos and remarks).
- Report verdict scale used by OtoXperts: proceed with delivery / proceed with caution / do not proceed.
- Home base Delhi NCR (Faridabad and Gurgaon offices per LinkedIn); launches announced in Bengaluru and Ahmedabad; customer reels from 15 more cities.

## Capabilities and Constraints

- Services: new car PDI, used car inspection, past service record check, expert opinion and buying guidance, free consultation, dealer and fleet PDI.
- Published plans (otoxperts.com, unconfirmed): Basic ₹999, Comprehensive ₹1,999, Premium ₹3,999; slot reservation ₹400 (a reel says ₹299).
- Undecided or contradictory facts the client must confirm: checkpoint count (300+ vs 150+ vs 100+), which plans include the paint gauge and OBD scan, report turnaround, inspection duration, test drive, live city list, address, hours, legal entity, the "peace of mind guarantee" terms.
- Homepage only for this build; navigation is in-page anchors. Built with Next.js 16 (App Router) on Vercel; the demo is noindexed and carries a "Concept homepage by Kunal Kumbhar" credit.

## Brand Commitments

- Logo: OTOXPERTS wordmark (OTO white or black, XPERTS red #ED0C0C with a stylised X) under a white car-line silhouette; disc version in black with a red ring. Traced SVG in `public/logo/`; the original vector is pending from the client.
- Taglines: "Inspect Before Accept" (logo) and "Inspect before you accept" (posts). Their lines include "They may hide it. We will find it.", "Don't buy blind.", "Don't sign until it shines.", "Your new car needs an Xpert."
- Claims stay theirs: "300+ checkpoints", "certified engineers", "unbiased reports". "Only company with certified engineers" is a superlative that needs proof before publishing (ASCI); use "Inspections by certified engineers".
- Language: Indian/British English, plain and specific, written for a buyer on delivery day. Phone format +91 92170 49330; ₹ with Indian digit grouping.

## Evidence on Hand

- Published inspection findings on Instagram (reel IDs in `docs/PLAN.md` §2.1), customer reels from named cities, the 10-day "10 Days to Car Perfection" series (all ten post IDs), plans and FAQ answers from otoxperts.com, brand screenshots in `_brand-ref/`.
- Absent, never to be fabricated: written reviews or ratings (Facebook shows 0 reviews; no Google Business Profile checked), inspection counts, customer numbers, years in business, testimonials with names, engineer names.

## Product Principles

1. Evidence over assurance: every claim points at a reading, a photo or a published finding.
2. The buyer's side, always: the copy speaks to the buyer on delivery day, not to dealers.
3. One set of numbers: when the client's sources disagree, the site waits for confirmation instead of picking a flattering figure.
4. Booking is one tap away on a phone, with no login walls or pressure tactics.

## Accessibility & Inclusion

WCAG 2.2 AA, 44px touch targets, full reduced-motion path, content usable without JavaScript; most visitors are on Android phones on Indian mobile networks.
