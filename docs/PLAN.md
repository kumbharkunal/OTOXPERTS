# OtoXperts homepage demo: research findings and build plan

## 0. Context

OtoXperts is a pre-delivery inspection (PDI) company: engineers check a new car at the dealership or stockyard before the buyer accepts delivery, and they also inspect used cars before purchase. Their site (www.otoxperts.com) is a client-side React app. Crawlers see an empty page, the bare domain fails TLS, and the copy contradicts itself. Their social media meanwhile holds strong evidence: real reels of repainted "new" cars, replaced doors and odometer tampering.

The goal is one homepage demo, good enough that they hire Kunal for the full rebuild. It must be:
- grounded in their real facts;
- server-rendered and fast;
- flawless on mobile.

It ships as a Next.js app on GitHub (kumbharkunal/OTOXPERTS) and Vercel (otoxperts.vercel.app).

Since this plan was first drafted, Kunal added two requirements:
- a custom scrollbar in the theme colour;
- haptic feedback (vibration) on every button and clickable element.

Both are specified in §6.

---

## 1. Phase 0: status check (read-only, 28 Oct 2026)

**Environment**

| Item | Status |
|---|---|
| OS and shell | Windows 11 Home 10.0.26300; PowerShell 7 + Git Bash |
| Node, npm | Node **v22.19.0** (meets awwwards-mcp ≥22.13, Next ≥20.9 and Lighthouse 13 ≥22.19); npm 10.9.3 |
| Other tools | git 2.46.2; Python 3.12.6 (run as `python`); Bun 1.4.4 |
| CLIs on PATH | claude, vercel 65.4.0 (logged in as `kumbharkunaldaulat-3945`), playwright. `gh` is absent; not needed, because Git Credential Manager handles push |

**Repo**
- `main` is initialised, origin is https://github.com/kumbharkunal/OTOXPERTS.git, and `ls-remote` works (the remote is empty).
- **Push identity mismatch:** Git Credential Manager has `kunalkumbhar12` stored, but the repo owner is `kumbharkunal`. This is fixed in step 5.

**Config**
- `.gitignore`, `.mcp.json` (awwwards via the `-p playwright -p ffmpeg-static` launch, thesvg, getdesignmd) and `.claude/settings.local.json` are all present.

**Brand references**
- `_brand-ref/` holds 20 screenshots, `logo_reference.jpg` (1080², the disc version) and `logo.png`.
- `logo.png` is 442×182 with a transparent background, white `#FFFFFF` car line and "OTO", and red "XPERTS" in a single flat `#ED0C0C`.
- `Screenshot 2026-10-20 162309.png` shows another site's car listing (Fortuner, Thar Roxx), not OtoXperts. I ignored it (question U4).

**Skills**
- About 126 at user scope and 25 at project scope.
- Plugins: gsap, two Vercel plugins (0.50.0 and 0.54.1, duplicates), frontend-design, 21st, clay.

**MCP**
- awwwards (40+ tools), getdesignmd (4), thesvg (5), Vercel (claude.ai connector) and Claude in Chrome are all working.

**Still missing** (installed in step 1)
- The optional awwwards-mcp skills: awwwards-section-loop, awwwards-inspiration, motion-authoring.

**Session issues**
- WebSearch and WebFetch fail with a backend model error, so research used read-only `curl`.
- The Chrome extension blocks google.com, so I could not check a Google Business Profile or Justdial listing (question U2).

**Location**
- The project stays in OneDrive (Kunal's choice). Pause OneDrive sync during every `npm install` and build.

---

## 2. Research findings

Source keys:

| Key | Source |
|---|---|
| IG | instagram.com/otoxperts (verified; 79 posts; about 950 followers; category "Car dealership") |
| FB | facebook.com/profile.php?id=61585057680958 (82 followers, "Not yet rated (0 reviews)") |
| FB2 | a duplicate page, id 61584279098190 (22 followers) |
| YT | youtube.com/@OtoXperts (6 subscribers, 4 Shorts) |
| LI | linkedin.com/company/otoxpertss (705 followers, 11–50 employees, Faridabad and Gurgaon) |
| WA | the WhatsApp Business screenshot in `_brand-ref` |
| SITE | www.otoxperts.com (JS bundle `index-DGg8PzCc.js`, Last-Modified 16 May 2026) |
| TLS | curl/.NET check, 28 Oct 2026 |

### 2.1 Business facts

| Fact | Source |
|---|---|
| Wordmark: OTO in white (black on light backgrounds), XPERTS in red, stylised X, car line above. Disc version: black with a red ring | logo files, IG avatar, posts |
| Tagline: "Inspect Before Accept" in the logo, "Inspect before you accept" in posts | logo, IG |
| Spelling varies between OtoXperts, OTOXperts, Otoxperts, OTOXPERTS and "OTO XPERTS" (even inside their own site) | SITE, IG, FB, LI |
| Bio: "Only Company with Certified Engineers", "Pre Delivery Inspection Specialist", "Experts Opinion", "Book Online 9217049330", "PAN India Services" | IG |
| "Advanced diagnostics, honest insights. Driven by trust. Powered by expertise." | WA, FB2 |
| "Helping you make the right move on wheels" | FB, WA |
| Phone / WhatsApp +91 92170 49330; info@otoxperts.com | SITE, FB, WA |
| Address "1108, Sector 82, Faridabad 121002" (site footer) | SITE |
| Offices: Faridabad and Gurgaon | LI |
| WhatsApp shows "Open 24 hours" and "National Capital Region" | WA |
| Older numbers in posts: 9289872166 (Nov 2025); HR line "+91 98710 12345" (looks like a placeholder); hr@otoxperts.com | IG |
| How it works: "Choose your car, delivery location, and inspection time." Then "Our engineer visits the showroom or address you choose." Then "Receive a 300+ inspection point report with photos & remarks." This confirms the on-site model | SITE |
| Services: New Car PDI; Used Car Inspection; Dealer / Fleet PDI ("for dealerships, rental companies and corporate fleets"); past service record (marked NEW); expert opinion; free consultation | SITE, IG flyer |
| Plans: **Basic ₹999**, **Comprehensive ₹1,999**, **Premium ₹3,999** ("All plans include doorstep inspection and digital reports"). Full plan contents are listed below this table | SITE |
| Payment: "Pay ₹400 to reserve your slot", or "Slot booking: ₹299" (a reel caption). The balance is paid online or in cash at inspection. Reschedule up to 24 h before. Refunds in 5–7 business days | SITE, IG |
| FAQ answers: duration "approximately 30–45 minutes"; "No, engineers share the digital report" (you needn't be present); "home/showroom/stockyard"; "No repairs included"; report "within 30 min", as a "PDF with photos & remarks", with "Lifetime access"; "new & used both"; "Test drive included? Yes." | SITE |
| Cities in the site FAQ: Noida, Gurugram, Ghaziabad, Faridabad, Meerut, Kanpur, Agra, Lucknow, Prayagraj, Varanasi, Mumbai, Pune, Nagpur, Nashik, Kolkata, Patna, Dehradun, Hyderabad, Bangalore, Surat, Jaipur, Jodhpur, Ludhiana, Kota, Gorakhpur, Ahmedabad, Gandhinagar, Karnal, Rohtak, Ambala, Vadodara, Rajkot | SITE |
| Launches: "Bangalore, we're now LIVE!" (reel DWhTujDk3Gq); "Ahmedabad, we're here!" (DWGlHtvCTl5) | IG |
| Customer reels from Narnaul, Indore, Faridabad, Ghaziabad, Mathura, Bhiwandi, Himmatnagar, Delhi, Sonipat, Surat, Agra, Hyderabad, Hardoi, Ahmedabad and Ludhiana | IG |
| Hiring engineers in 25 more cities, so some FAQ cities may be aspirational | IG DeHzhQDvX9I, LI |
| Report format: 7 sections (Documents; Vehicle; Exterior; Tyres & Wheels; Rubber components; Suspension; OBD scan). Verdicts: "Proceed with vehicle delivery." / "Proceed with caution. Minor issues observed." / "Do not proceed with delivery. Major issues detected." | SITE /sample-report and the report UI |
| 10-day series (all ten posts found): Day 1 DRzZMPkD5k-, 2 DR2D7SOkZzm, 3 DR4uRetGHd9, 4 DR7SCOaj8Ge, 5 DR93bhAj-MK, 6 DSAa7Hkjx8m, 7 DSFlrBjEeyb, 8 DSH9yRdj1Jn, 9 DSKwokDj5zW, 10 DSNNVZ5D3et | IG |
| Social: Instagram (verified), Facebook (plus the duplicate FB2), YouTube @OtoXperts, LinkedIn /company/otoxpertss, wa.me/919217049330. No Google Business Profile or Justdial checked (blocked). The site footer links to none of these | IG, FB, YT, LI, SITE |

**Plan contents** (SITE)
- **Basic ₹999:** visual inspection of exterior and interior; basic mechanical checks; minor defects; summary report with photos; doorstep inspection; same-day report.
- **Comprehensive ₹1,999:** everything in Basic, plus 300+ checkpoints, detailed photos, a diagnostic scan, underbody inspection, VIN and odometer check, a detailed report and priority support.
- **Premium ₹3,999:** everything in Comprehensive, plus extended diagnostics, a test drive, **paint thickness measurement**, battery health analysis, a priority same-day slot, a 2-hour report, direct engineer consultation and lifetime report access.

**Real findings they published.** These are the hook, each linked to its reel:

| Finding | Reel |
|---|---|
| Roof and quarter panel repainted, rust across the body (pinned) | DdG0NxypRuM |
| Fender repaired and both bumpers repainted; the customer explains on camera (this is the Facebook video) | DcQj00Zp3n7 |
| Two doors already replaced | Da-1Xe6poBK |
| Repainted panels in Delhi; the buyer rejected the car; reel mentions a "Paint Thickness Test" | Da2voU9J-QG |
| Odometer tampering, Sonipat | DcxxZOBpTvd |
| Engine and sensor faults in Delhi; the second car they checked passed | Dcxxjjkp4Zz |
| Both bumpers repainted plus a speed issue, Mathura | DYXpn88p317 |

### 2.2 Contradictions to flag (pitch points and client questions)

1. **Checkpoints:** 300+ on most pages, 150+ on the Delhi city pages, 100+ in the Bangalore launch caption.
2. **Paint gauge:** listed only under Premium, yet the reels mention it as standard.
3. **Diagnostic scan:** included in the Comprehensive plan, but marked "for premium plan" in the site checklist.
4. **Report turnaround:** "within 30 min" (FAQ), same-day (Basic), 2 hours (Premium), "within 24 hours" (a site testimonial).
5. **Test drive:** the FAQ says "Yes" (every plan), but it is only in Premium. An unregistered new car may not be road-legal anyway.
6. **Slot fee:** ₹400 on the site vs ₹299 in a reel.
7. **Reach:** the bio says "PAN India"; the site lists 32 cities; 3 launches were announced; the company is still hiring in 25 cities.
8. **Duration:** 30–45 minutes is the shortest any competitor claims. Others say 45–120 minutes.
9. **Sample report:** its sections 02–07 repeat the Documents rows word for word ("RC Availability, Car color, Car keys…"), and it shows "minor issues" next to a "Proceed" verdict.

### 2.3 Their current web presence: pitch points

1. **Broken bare domain.** https://otoxperts.com serves a certificate for `api.otoxperts.com` (Let's Encrypt), so Chrome shows an error page, and http://otoxperts.com returns 403. Their Facebook page links to that bare domain.
2. **Client-side rendering.** The site is a Vite/React single-page app with an empty `<div id="root">`. It loads Bootstrap from a CDN, with no OG tags. Crawlers and WhatsApp link previews see only "Otoxperts – PDI for New & Used Cars" and the meta description.
3. **No social links.** The footer has none, so nothing points to the Instagram proof. The page's WhatsApp float hotlinks a **Freepik premium stock image**.
4. **Their own words are inconsistent.** Brand spelling, checkpoint counts, plans and turnaround all vary (§2.2).
5. **Wrong Instagram category.** It says "Car dealership", which undercuts their independence from dealers. There are also two Facebook pages, which split the audience.
6. **Engagement.** Real-people reels far outperform the AI flyers:
   - Promo and explainer reels: 302K (DWNokTOCdjo), 133K (DYToowKJf8n) and 95.7K (DdG0NxypRuM) views.
   - Defect-find reels: 1.2K–3K views. Customer reels: 250–1.8K views.
   - Flyers: 5–9 likes.
   - Hinglish reels ("Nayi gaadi hai, lekin kya paint original hai?", "Delivery lene se pehle") are among the most watched.

### 2.4 Domain facts allowed in copy (sourced; everything else stays qualitative)

| Claim we may make | Source |
|---|---|
| Take delivery in daylight to see defects | ACKO new-car delivery checklist |
| Factory paint is roughly 80–150 µm (sources differ). A respray reads far higher. Filler reads 500+ µm. **We show readings as a comparison between panels, not against a fixed number** | Cars24 article; Nxcar /pdi/new-car; InspektAI; Wikipedia "Automotive paint" |
| VIN and engine number should match the invoice, Form 22 and the insurance policy | InspektAI /vin-check; ACKO |
| Tyre DOT code: the last 4 digits are week + year ("0422" = week 4 of 2022) | Wikipedia "Tire code" |
| Odometer at delivery is usually under 50 km | ACKO |
| An OBD scan finds stored codes that have no warning light | InspektAI /pdi |
| Charging voltage with the engine running is about 13.5–14.5 V | Cars24 battery article |
| Documents: invoice and receipts, road tax, RC or temporary registration, insurance, PUC if applicable, manual and warranty book; Form 22 | ACKO; InspektAI |
| **Do not claim:** VIN character positions for month or year (they vary by maker); PUC exemptions; any legal "right" to a third-party inspection (no law was found, so this needs legal review); stock-age thresholds | — |

### 2.5 Competitors and the gaps we can beat

| Competitor | New-car PDI price | Notes |
|---|---|---|
| Cars24 | "₹999", "₹1,999" and "₹1,499", depending on the page | Dropped OBD; its sample report is a 16-page PDF made only of images |
| Nxcar | ₹2,999 flat | 280+ checkpoints; report in 2 h |
| InspektAI (Bengaluru) | ₹2,500, ₹3,000 or ₹4,000 | Best-in-class public real reports, with a damage map and "what we could not check" |
| CarCID | ₹1,299 / ₹1,599 | Sample report is gated; inflated counters |
| carpdi.in | ₹2,999 / ₹4,999 on-site; ₹1,499 video-call PDI | — |
| PDICars | Price hidden behind a callback | 500+ checkpoints; pressure tickers; affiliate clutter |
| Zekardo | Login wall | — |

Market range: ₹999–₹4,999, with most between ₹1,299 and ₹3,000.

**Where we beat them:**
1. One consistent set of numbers everywhere.
2. An open sample report as real HTML text, with pass / attention / fail and readings for each panel.
3. Saying plainly what the OBD scan catches (Cars24 dropped it).
4. Showing the price, with booking in one tap.
5. Sourced teaching instead of scare statistics.
6. Proving the speed with a timestamped sample.
7. No pressure tactics.
8. Owning the "before you sign" moment.

---

## 3. Design references (borrow / avoid)

| Reference | Borrow | Avoid |
|---|---|---|
| Forge Automotive (forgeautomotive.co.uk, Site of the Day 25 Oct 2026) | Closest precedent for the torch: a "Pointlight" moving over a car render. Also its clip-path menu transition. Oxblood falloff around bright red | Its cookie gate (which also hid the pointlight from our motion recorder, so the effect is unverified); luxury serif voice |
| Riotters Lidar Drone Scanning (drone.riotters.com, Site of the Day 6 Oct 2026) | Calm "inspection" voice; cool daylight palette (#DFE5E8 / #28363E) for the report half; a meta strip, which we use only inside the report header (Report no., place, time); UI curve `cubic-bezier(0,0,0.2,1)` | Point-cloud WebGL; giant ghost wordmark |
| Porsche Motorsport Hub (racing.porsche.com, Honorable Mention Aug 2026) | Dark translucent pill nav over a lit garage (our nav precedent); specs shown as an instrument panel; history carousel (our rail precedent); hero curve `cubic-bezier(0.16,1,0.3,1)` at about 1000 ms | Large red floods |
| SSTR Friction Reduction (sstr.tech, Site of the Day 16 Aug 2026) | Engineered grid rhythm; scrubbed progress with ease `none`; reveals of 0.64–1.2 s starting at `center bottom`; detail photos on grey plates | Page-wide code-comment IDs (a mono costume); Barba page transitions |
| Cartier Roadster | Leader-line callouts: a label above a measured value. Ours draw only when the beam reaches the anchor | Always-on callouts; serif values |
| State of AI Design report (stateofaidesign.com, Site of the Day Aug 2026) | The report as an editorial object; a credit line, which becomes the engineer's sign-off | Gradient-noise imagery |
| Porsche Taycan advertorial (Honorable Mention 2020) | Lighting brief for the hero photo: one key light, the car in a near-black space | Teal colour grade |

**Lessons from DESIGN.md files**
- **Ferrari:** use red sparingly, and keep warning red distinct from brand red.
- **IBM:** status tokens named `--status-pass|attn|fail`; shadows only on floating elements.
- **Tesla:** 330 ms state changes.
- **BMW and IBM:** 0 radius on data cells.

---

## 4. Skill and MCP usage map

| Skill / tool | Use in this project |
|---|---|
| frontend-design (anthropics) | Second pass on the plan (§5.3) and the mirror critique during the build |
| design-taste-frontend v2 (taste-skill) | `lint.mjs` / `inspect.mjs` / `scenes.mjs` QA at 1440, 768 and 390, with `--allow` for brand-forced exceptions. Its direction dealer is not used, because the direction is set |
| Older taste variants (v1, gpt-taste, high-end, minimalist, stitch, redesign) | **Not loaded**: they contradict v2 and this brief |
| impeccable 4.8 | `context`, then `init` (PRODUCT.md from this plan), then `critique` / `audit` after each major section, then `document` (DESIGN.md + `.impeccable/design.json`). Impeccable is the only skill that writes DESIGN.md |
| stop-slop | Every line of copy; score ≥35/50 |
| awwwards and jury (juliobsz) | awwwards: Next.js craft rules plus `shoot.mjs` / `audit.mjs` QA. jury: a final blind score |
| awwwards MCP | `analyze_page_structure` and `verify_build` on localhost and on the live site; reference lookups |
| emilkowalski: animate, review-animations, animation-performance, break-ui, mobile-native, apple-design | Motion decisions, jank checks, worst-case data, and the feel of the nav sheet and haptics |
| gsap skills: react, scrolltrigger, plugins, performance, timeline | `useGSAP` with scope, ScrollTrigger scrubs, SplitText, DrawSVG, cleanup |
| vercel: nextjs, react-best-practices, verification, deploy, vercel-cli, plus the Vercel MCP | Next 16 rules, performance patterns, deploy and domain checks |
| addyosmani: performance-optimization, frontend-ui-engineering, incremental-implementation, git-workflow-and-versioning, shipping-and-launch, code-review-and-quality | Discipline for budgets, increments and commits |
| thesvg (skill and MCP) | Official Instagram, Facebook, WhatsApp, YouTube and LinkedIn logos, unmodified |
| ui-ux-pro-max | Accessibility and UX lookups only: `python ~/.claude/skills/ui-ux-pro-max/scripts/search.py "<q>" --domain ux` |
| getdesignmd MCP | Token research (done) |
| 21st, gstack, web-design, scroll-craft, hairline, getdesign | **Not used.** 21st and gstack are optional and metered; web-design pushes gradient headings; scroll-craft needs a kie.ai key and ffmpeg; getdesign relies on WebFetch, which is broken. We will **not** add gstack's suggested CLAUDE.md line banning the Chrome tools |
| Claude in Chrome | Screenshots at 390×844 and 1440×900 during the build; checks on the live site |

**Conflict rule: Kunal's brief beats the brand, and the brand beats skill house rules.**

| Conflict | Resolution |
|---|---|
| Glass pill nav and hairlines (banned by taste v2 / impeccable) | Kept, because the brief asks for them. Glass is used only on the nav. Hairlines appear only inside the report sheet and the comparison table |
| Step numbering | Kept only where order is real (`<ol>` in How it works) |
| Card grids | None. Plans are a comparison table; services are a list |
| Gradients | None, except a neutral scrim on photos |
| Monospace | None: readings use Mona Sans tabular figures |
| Eyebrows, ALL-CAPS labels, "→" on links, em dashes | Banned |
| Motion | GSAP for scroll; Motion only for nav layout and the springs of the sheet; CSS for hover and press |
| Centred text | Left-aligned, with one centred moment (the final CTA) |

---

## 5. Creative direction

### 5.1 Concept

The brief's concept stays: **"Inspect before you accept."** The site behaves like an inspection.
- **Night bay (hero).** In the dark you can't see flaws: "Don't buy blind." The pointer carries an engineer's torch.
- **Daylight curtain.** The first light section slides over the hero, because a PDI belongs in daylight (ACKO).
- **Daylight sections.** Evidence, checks and process.
- **Dark interlude.** The white report sheet on black, like a document on a lightbox.
- **Night bookend.** The final CTA and footer on logo-disc black.

### 5.2 Changes to the brief, with justification

1. **Proof leads the problem section.** Their published findings (repaints, replaced doors, odometer tampering) are real, attributable and dramatic. They replace generic problem copy and fake testimonials.
2. **The cities section becomes evidence-based.**
   - Three "live" hubs: Delhi NCR (base), Bengaluru and Ahmedabad (announced launches).
   - Plus "inspected here" dots from their reels (15 cities), each linking to its reel.
   - Plus "Ask about your city".
   - Their FAQ's 32-city list is held back until the client confirms it, because the hiring posts suggest some cities are aspirational.
3. **Prices appear** (₹999 / ₹1,999 / ₹3,999): they are published on their site. Each is flagged `confirm` in the content file.
4. **Red has a strict job.** It marks the brand and the evidence: findings, flags and the live position (scroll-spy dot, explorer zone, process progress, scrollbar thumb). Primary buttons are **white on dark and black on light**, so the "Book" button never reads as an alarm and the page avoids the "near-black plus vermilion accent" default.
5. **The hero H1 is "Don't buy blind."** It is their line, and it matches the dark bay. "Inspect before you accept." becomes the final CTA headline, as the brief specified.
6. **Callouts compare panels** ("246 µm here, 112 µm on the front door") rather than quoting a factory number, because the sources disagree (§2.4). They are labelled as sample readings.
7. **The normal cursor stays visible**; the beam follows it (awwwards rule, and better usability).
8. **No Hinglish in the build.** It becomes a pitch idea (client question C29).

### 5.3 Second pass against frontend-design's generic defaults (what I changed)

| Default I caught in my first draft | Change |
|---|---|
| Red primary CTA on near-black | White or black pill buttons; red only for brand and evidence |
| Tinted near-black (#0B0B0C) as "black" | The logo disc's true black `#000000` |
| Mono face for checkpoint IDs and readings | Mona Sans `tabular-nums slashed-zero`; codes appear only inside the report sheet |
| Hairline-ruled ledger lists across sections (broadsheet tell) | Spacing and red markers; hairlines only in the report and comparison table |
| ALL-CAPS eyebrow above each heading | Removed; headings carry each section |
| Three identical plan cards | One comparison table (a segmented switch on mobile) |
| Middle-dot meta strings ("Delhi NCR · Bengaluru") and "→" on links | Comma lists and plain link text |
| Most headings centred | Left-aligned grid; one centred moment (the final CTA) |
| One radius on everything | Radius hierarchy: pill for anything you press, 14 px for sheets and photos, 0 for data cells |
| Uniform fade-up reveals | A different motion for each section, each with a job (§9) |

---

## 6. Design tokens

### 6.1 Colour

Six named tokens, plus supporting and status colours. Contrast ratios were computed with the WCAG formula.

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--carbon` (disc black) | #000000 | Hero bay, report interlude, final CTA, footer; headings on light | white on it 21:1 |
| `--paper` (daylight) | #FFFFFF | Light sections, the report sheet, text on dark | — |
| `--concrete` | #EEF0F2 | Alternate light ground (explorer, 10-day rail) | black on it 18.38:1 |
| `--graphite` | #3A3D42 | Body text on light | 10.9:1 on white; 9.54:1 on concrete |
| `--signal` | #ED0C0C | Logo red, findings, live position, scrollbar thumb | 4.51:1 white; 4.66:1 black; 3.95:1 concrete. **As text: ≥24 px regular or ≥18.66 px bold only** |
| `--signal-ink` | #C40A0A | Small red text on light; fail labels; red hover | 6.19:1 white; 5.41:1 concrete |

**Supporting colours**

| Token | Hex | Contrast |
|---|---|---|
| `--muted` | #5C6168 | 6.24:1 white; 5.46:1 concrete |
| `--muted-dark` | #A1A6AD | 8.57:1 on black |
| `--rule` | #CDD1D6 | Decorative only |
| `--rule-dark` | rgb(255 255 255 / .14) | Decorative only |

**Status colours** (report only; always shown with a glyph and the word)

| Token | Hex | Contrast on white |
|---|---|---|
| `--status-pass` | #0F7A3D | 5.42:1 |
| `--status-attn` | #A35400 | 5.49:1 |
| `--status-fail` | `--signal-ink` | 6.19:1 |

The WhatsApp green (#25D366) appears only inside the official logo, which is exempt as a logotype; the button label carries the meaning.

### 6.2 Type

Both families are SIL OFL and on Google Fonts, loaded with `next/font/google`, subset `latin`, with `display: swap` and `adjustFontFallback`.
- **Display: Hubot Sans**, italic file only, variable `wdth` 75–125 / `wght` 200–900. It echoes the italic, techno wordmark.
- **Body and readings: Mona Sans**, roman, variable. Readings use `font-variant-numeric: tabular-nums slashed-zero`.

That is two font files in total.

| Token | Family / settings | Size (fluid) | Line height / tracking |
|---|---|---|---|
| display-1 (H1) | Hubot italic, wdth 112 (100 below 400 px), wght 800 | clamp(3rem, 2rem + 5vw, 6.5rem) | 0.92 / −0.025em |
| display-2 (H2) | Hubot italic, wdth 112, wght 760 | clamp(2.25rem, 1.5rem + 3vw, 4.25rem) | 0.98 / −0.02em |
| display-3 (prices, big statements) | Hubot italic, wdth 108, wght 700 | clamp(1.5rem, 1.1rem + 1.6vw, 2.5rem) | 1.05 / −0.01em |
| title (H3) | Mona 620 | 1.25 → 1.5rem | 1.25 |
| body-l | Mona 420 | 1.125 → 1.25rem | 1.55 |
| body | Mona 420 | 1rem | 1.6 |
| small | Mona 450 | 0.875rem | 1.5 |
| reading | Mona 560 + tnum + zero | 0.9375 → 1.125rem | 1.3 |
| micro (captions, legal) | Mona 450 | 0.8125rem (13 px minimum) | 1.45 |

Headlines are at most 2 lines at every width (taste rule); `text-wrap: balance` for headings and `pretty` for body.

### 6.3 Space, grid and radii

- **Spacing:** 4 px base (4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 200). Sections use `--section-y: clamp(6rem, 4rem + 8vw, 12.5rem)` (96 → 200 px).
- **Grid:**
  - Mobile: 4 columns, **16 px side gutter**, 12 px gaps.
  - Tablet: 8 columns, 24 px gutter.
  - Desktop: 12 columns, 40 px gutter, content max 1320 px.
- **Breakpoints:** 390 (design base), 768, 1024, 1280, 1440.
- **Radii:**

  | Token | Value | Used for |
  |---|---|---|
  | `--r-pill` | 999px | nav, buttons, chips, status marks |
  | `--r-md` | 14px | report sheet, photos, map frame |
  | `--r-sm` | 8px | inputs, tooltips |
  | — | 0 | table cells |

### 6.4 Glass recipe (nav only)

```css
.glass { position: relative; isolation: isolate; }
.glass::before, .glass::after {            /* two stacked layers: theme switch = opacity cross-fade */
  content: ""; position: absolute; inset: 0; border-radius: inherit; z-index: -1;
  -webkit-backdrop-filter: blur(18px) saturate(160%); backdrop-filter: blur(18px) saturate(160%);
  transition: opacity 240ms var(--ease-ui);
}
.glass::before { background: rgb(0 0 0 / .52); box-shadow: inset 0 1px 0 rgb(255 255 255 / .12), 0 0 0 1px rgb(255 255 255 / .14); }
.glass::after  { background: rgb(255 255 255 / .64); box-shadow: inset 0 1px 0 rgb(255 255 255 / .7), 0 0 0 1px rgb(0 0 0 / .08); opacity: 0; }
[data-nav-theme="light"] .glass::before { opacity: 0 } [data-nav-theme="light"] .glass::after { opacity: 1 }
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .glass::before { background: rgb(0 0 0 / .92) } .glass::after { background: rgb(255 255 255 / .96) }
}
```

- The nav is the single shadowed object: `0 10px 30px -12px rgb(0 0 0 / .45)`.
- Blur radius and the size of the blurred layer are **never** animated.

### 6.5 Motion

**Durations**

| Token | Value | Used for |
|---|---|---|
| `--dur-press` | 120 ms | `:active` scale 0.97 |
| `--dur-hover` | 180 ms | hover, gated on `(hover:hover) and (pointer:fine)` |
| `--dur-ui` | 240 ms | tabs, accordion, labels |
| `--dur-nav` | 320 ms | nav hide/show, compact |
| sheet | ~420 ms | spring |
| `--dur-reveal` | 800 ms | section reveals |
| `--dur-hero` | 1000 ms | hero light-up |

**Easings**

| Token | Curve | Source / used for |
|---|---|---|
| `--ease-ui` | cubic-bezier(0.23, 1, 0.32, 1) | Emil |
| `--ease-hero` | cubic-bezier(0.16, 1, 0.3, 1) | Porsche capture; GSAP `expo.out` equivalent |
| `--ease-inout` | cubic-bezier(0.76, 0, 0.24, 1) | Riotters |
| `--ease-drawer` | cubic-bezier(0.32, 0.72, 0, 1) | Emil |
| GSAP | `power2.out` for reveals; `none` for every scrub | — |

**Springs (Motion)**
- Nav sheet: `{ type: "spring", duration: 0.42, bounce: 0 }`
- Active-link indicator: `{ type: "spring", duration: 0.35, bounce: 0.1 }`

**Staggers:** menu links 40 ms; report rows 60 ms; findings 80 ms.

**Rules**
- Animate only transform, opacity and clip-path. The only exception is the stroke-dashoffset of small SVG line draws.
- Exits are faster than entrances. Never `transition: all`. Never `scale(0)`; start at 0.9–0.97.
- One load moment of about 1.2 s with no preloader.
- Every ScrollTrigger is killed on unmount (`useGSAP` scope).
- `gsap.matchMedia()` has three contexts:
  - desktop: `(min-width:1024px) and (pointer:fine) and (prefers-reduced-motion:no-preference)`;
  - touch: `(max-width:1023px), (pointer:coarse)`, also with no-preference;
  - reduce: `(prefers-reduced-motion:reduce)`.
- **Reduced motion:** Lenis off, no sticky scrubs (the tall tracks collapse), no sweeps; reveals become instant.

### 6.6 Custom scrollbar (new request)

- **Colours:** the thumb is `--signal` red. The track follows the section under the nav, using the same IntersectionObserver that themes the nav. It sets `html[data-under]` to `dark` (track #000) or `light` (track `--concrete`).

```css
html { scrollbar-width: thin; scrollbar-color: var(--signal) var(--scroll-track); scrollbar-gutter: stable; }
html[data-under="dark"] { --scroll-track: #000 } html[data-under="light"] { --scroll-track: var(--concrete) }
@supports not (scrollbar-color: auto) {            /* Safari: WebKit pseudo-elements */
  ::-webkit-scrollbar { width: 10px; height: 10px }
  ::-webkit-scrollbar-track { background: var(--scroll-track) }
  ::-webkit-scrollbar-thumb { background: var(--signal); border-radius: 999px; border: 2px solid var(--scroll-track) }
  ::-webkit-scrollbar-thumb:hover { background: var(--signal-ink) }
}
@media (forced-colors: active) { html { scrollbar-color: auto } }
```

- **Thumb contrast:** 4.66:1 on black and 3.95:1 on concrete (non-text minimum is 3:1).
- **10-day rail:** a thin red thumb on a transparent track.
- **Mobile:** overlay scrollbars can't be styled, so nothing is added there. Lenis keeps the native scrollbar, so dragging the thumb still works.

### 6.7 Haptics on every press (new request)

- **Utility:** `src/lib/haptics.ts` exports `haptic(kind)`.

  | Kind | Pattern | Used for |
  |---|---|---|
  | `tap` | 10 ms | buttons, links |
  | `select` | 6 ms | tabs, hotspots, accordion, chips |
  | `success` | [10, 50, 10] | WhatsApp message built, sheet link chosen |
  | `warn` | [24, 40, 24] | form validation error |

  Calls are throttled to one per 80 ms.

- **Wiring:** one delegated `click` listener in a client `HapticsProvider`.
  - It matches `a, button, [role=button], [role=tab], summary, label, input[type=checkbox|radio], select, [data-haptic]`.
  - `data-haptic="select|success|off"` overrides the default.
  - It uses `click`, not `pointerdown`, so it never fires when a scroll starts and always has user activation.
- **Android:** `navigator.vibrate`, only when `(pointer: coarse)` matches; never on desktop. Most Indian visitors use Android.
- **iOS 18+:** Safari has no Vibration API. A feature-flagged fallback toggles a hidden `<input type="checkbox" switch>` through its `<label>` inside the click, which fires the system haptic. The input is `aria-hidden`, `tabindex=-1`, and placed off-screen. If it misbehaves on a real iPhone, I drop it with one flag.
- **Never the only feedback.** Every press also has a visual `:active` state. Haptics are not tied to reduced motion; Android's own vibration settings still apply.

---

## 7. Hero build decision: the inspection light

**Decision: DOM with two layers, composite-only.** WebGL is not used in v1.

```
<section data-theme="dark" class="hero">            container-type:size; sticky inner on touch
  <div class="cover-box">                            aspect-ratio of the art-directed photo; covers the hero
    <picture> img  (LCP, preload, fetchPriority=high, filter: brightness(.3) saturate(.7))
    <ol class="callouts"> … </ol>                    HTML in % coordinates from site.ts (desktop + mobile sets)
  </div>
  <div class="beam" aria-hidden>                     fixed-size circle, static mask: radial-gradient(closest-side,#000 55%,transparent)
    <div class="beam-inner cover-box"> same <picture> props (same URL → one download), unfiltered </div>
  </div>
  <div class="hero-copy"> H1, sub, CTAs, trust line, cities </div>     server-rendered, no animation dependency
</section>
```

**How the beam moves**
- `gsap.quickTo` (0.6 s, `power3`) moves `.beam` to (x−r, y−r) and `.beam-inner` by the inverse. Each frame is just two transforms, so the work is compositor-only, with no repaint and no mask re-raster.
- The cover-box keeps callouts glued to the car at any aspect ratio. It uses `width: max(100cqw, 100cqh * var(--ar))`, with the aspect ratio applied and centred.

**How the callouts behave**
- A ticker checks the beam's distance to each anchor (3 or 4 checks per frame). Inside 0.6r, the callout shows: its leader line runs `scaleX` 0 → 1 and its label fades in.
- Hotspots are `<button>`s. Focus or tap moves the light to them.
- The callouts also exist as a visible-to-assistive-tech list.

**Desktop:** the beam follows the pointer (passive `pointermove`); the system cursor stays visible.

**Touch**
1. On load, the beam sweeps once across the hotspots (1.6 s).
2. The hero wrapper is 160svh with a CSS `position: sticky` inner. A ScrollTrigger scrub (ease `none`) moves the beam along a path through the hotspots.
3. Tapping a marker tweens the light there in 0.5 s.
4. No `preventDefault` anywhere, so vertical drag is never hijacked.

**Why CSS sticky instead of ScrollTrigger pin:** no spacer is inserted after hydration, so CLS is zero. It is also more robust on iOS.

**No JS or reduced motion:** an inline `<head>` script swaps `no-js` for `js` before first paint. Without the `js` class, or with `(prefers-reduced-motion: reduce)`, the page shows the **fully lit** frame with every callout visible, and the hero is not sticky.

**Load moment, about 1.2 s total**
- The H1 and CTAs paint from HTML.
- On hydration, the logo's car line draws (0.6 s, `--ease-hero`) through a stroke mask over the exact filled shape.
- At +0.25 s the beam fades in at the left edge and sweeps to hotspot 1 (0.9 s).
- A CSS failsafe reveals the car line after 3 s if JS never runs.

**Performance**
- One image download. LCP is that `<img>`; low-entropy rules don't apply because the encoded file is a normal photo.
- Art-directed preloads: two `<link rel="preload" as="image" imagesrcset … media>` tags, desktop 16:9 and mobile 9:16.
- AVIF target: about 160 KB desktop and about 90 KB mobile.
- GSAP is not needed for first paint; it is imported after hydration.

**Why not WebGL**
- It adds a shader compile, GPU and context-loss risk on low-end Android, and a DPR cap.
- The DOM approach keeps text crisp and accessible.
- I'll revisit only if the light looks flat in review. The budget then would be ≤6 KB of raw WebGL, loaded after LCP and paused offscreen.

**Sample callouts** (labelled "Sample readings" on the page)

| Anchor | Text | Kind |
|---|---|---|
| Rear door | "246 µm. Front door: 112 µm. Resprayed." | fail |
| Front bumper corner | "Scuff polished over." | attention |
| Front tyre | "DOT 3824: made in week 38 of 2024." | attention |
| Bonnet (desktop only) | "Gap 6.1 mm left, 3.9 mm right." | attention |

---

## 8. Navbar spec

**Desktop (≥1024)**
- **Layout:** a centred floating pill, `top: calc(env(safe-area-inset-top) + 16px)`.
- **Contents:** the logo, which links to #top; then Checks (#checks), How it works (#process), Report (#report), Prices (#services), FAQ (#faq); then a **"Book PDI"** button (#book).
- **Scroll-spy:** an IntersectionObserver (`rootMargin -45% 0px -50% 0px`) picks the active link. A red dot indicator slides between links with Motion `layoutId` (LazyMotion, async `domMax` features).

**Scroll behaviour**
- **Hide and show:** hides when scrolling down (delta >8 px, past 120 px); returns when scrolling up or near the top. `translateY(-130%)`, 320 ms.
- **Compact:** after the hero, the background layer runs `scaleY(.86)`, the car line fades and the content re-centres (transforms only).
- **Theme:** `data-theme` on each section plus an IntersectionObserver over the nav band (`rootMargin 0px 0px -94% 0px`). This sets `data-nav-theme` (cross-fading the glass layers) and `html[data-under]` (for the scrollbar).
- Never hides while the sheet is open or focus is inside the nav.

**Mobile (<1024)**
- **Pill:** `width: calc(100% - 32px)`. It holds the logo, a "Book" button and a 44×44 menu button. The menu icon is two lines that rotate into an X (transform).
- **Open:**
  - A full-screen sheet (100dvh) with a heavier glass tint reveals from the pill's rectangle: `clip-path: inset(t r b l round 32px)` → `inset(0 round 0)` with a 420 ms spring and no bounce.
  - Links stagger in (opacity, `translateY` 8 px, 40 ms apart) after 120 ms.
  - Contact details and the official social logos sit at the bottom.
- **Close:** the exact reverse, with links out in 80 ms.
- **Perf fallback:** if a 4× CPU throttle test drops below 50 fps, the sheet uses a solid 0.94 tint during the transition and cross-fades to glass at rest.

**Behaviour**
- `lenis.stop()` plus an iOS-safe lock: fix the body at `top: -scrollY`, then restore.
- A focus trap: the first link gets focus; Esc closes; focus returns to the toggle.
- `aria-expanded` and `aria-controls` on the toggle.
- Tapping a link closes the sheet, then `lenis.scrollTo('#id', { offset: -navH })`.
- Every target is at least 44 px.
- Reduced motion swaps the reveal for a 150 ms fade.
- Zero layout shift, because the pill is `position: fixed` from first paint.

---

## 9. Sections: final order and specs

All copy below is a draft. Every line goes through stop-slop during the build. All copy lives in `src/content/site.ts`.

### 9.1 Hero (dark): described in §7

```
Desktop 1440×900                                              Mobile 390×844
┌────────────────────────────────────────────────────────┐   ┌──────────────────────┐
│      ( OTOXPERTS  Checks  How it works … [Book PDI] )  │   │(OTOXPERTS [Book]  ≡) │
│                                                        │   │Don't buy             │
│  Don't buy                   ╭─beam─╮  ─● Rear door    │   │blind.                │
│  blind.                      │ car  │     246 µm …     │   │Certified engineers   │
│                              ╰──────╯  ─● Bumper …     │   │inspect your new car… │
│  Certified engineers inspect your     ─● Tyre DOT …    │   │[◉ Book a PDI on WA ] │
│  new car at the dealership, before you sign for it.   │   │[ Call +91 92170 …  ] │
│  [◉ Book a PDI on WhatsApp]  [ Call +91 92170 49330 ]  │   │✓300+ ✓Unbiased ✓Photo│
│  ✓ 300+ checkpoints  ✓ Unbiased photo report  ✓ …      │   │ ┌──────────────────┐ │
│  Delhi NCR, Bengaluru, Ahmedabad and more              │   │ │  car, lower half │ │
│                    Sample readings. Move the light.    │   │ │ ●     ●      ●   │ │
└────────────────────────────────────────────────────────┘   └─┴──────────────────┴─┘
```

- **H1:** "Don't buy blind."
- **Sub:** "Certified engineers inspect your new car at the dealership, before you sign for it."
- **Buttons:**
  - Primary: a white pill, "Book a PDI on WhatsApp", with the official WhatsApp glyph. It links to wa.me with a prefilled message.
  - Secondary: a ghost pill, "Call +91 92170 49330", as a `tel:` link.

### 9.2 The problem (light): a curtain slides over the hero

```
Desktop                                                        Mobile
┌────────────────────────────────────────────────────────┐   ┌──────────────────────┐
│ A new car can arrive               ┌──────────────────┐│   │A new car can arrive  │
│ already repaired.                  │ img 3 stockyard  ││   │already repaired.     │
│ Body copy (2 short paragraphs)     │ 4:5              ││   │Body…                 │
│                                    └──────────────────┘│   │[img 3]               │
│ Found by our engineers                                 │   │Found by our engineers│
│ ● Roof and quarter panel repainted…   Watch the reel   │   │● Roof and quarter…   │
│ ● Fender repaired, both bumpers…      Watch the reel   │   │  Watch the reel      │
│ ● Two doors already replaced          Watch the reel   │   │● …                   │
│ ● Odometer didn't add up. Sonipat     Watch the reel   │   │                      │
│ Check these yourself: tyre dates, odometer, VIN month  │   │Check these yourself… │
└────────────────────────────────────────────────────────┘   └──────────────────────┘
```

- **H2:** "A new car can arrive already repaired."
- **Body:** "Your car rides a carrier truck and waits in a stockyard before the dealer hands it over. Scrapes on the way get resprayed. Last year's stock gets sold as new. Accessories on your invoice go missing. Showroom lights hide all of it."
- **Findings:** 6 rows from the reels (§2.1), each with an external link (`rel="noopener"`, aria-label naming the finding).
- **"Check these yourself" strip:** uses only sourced facts (§2.4).
- **Motion:**
  - The curtain: the hero is sticky; this section has `z-index` 1 and a white background, and the hero dims to 0.6 while being covered (scrub).
  - Findings: each red marker scales 0.6 → 1 with opacity, then the row text fades in, 80 ms stagger, once.
- **Components:** `Problem`, `FindingRow`, `Shot`.

### 9.3 What we check: the checkpoint explorer (concrete)

```
Desktop: sticky stage inside an 8-step track (8×70vh)          Mobile: tabs, no sticky
┌────────────────────────────────────────────────────────┐   ┌──────────────────────┐
│ What we check, from bumper to boot.   300+ checkpoints │   │What we check, from   │
│ ┌──────── car side profile (SVG, logo roofline) ──────┐│   │bumper to boot.       │
│ │      ◎tech   ◎interior          ◎paint              ││   │┌────────────────────┐│
│ │ ◎engine            ◎electrics          ◎docs/boot   ││   ││ car profile + zone ││
│ │    ◎tyres        ◎underbody          ◎tyres         ││   │└────────────────────┘│
│ └─────────────────────────────────────────────────────┘│   │[Paint][Tyres][Engine]│→
│ ▸ Paint and body (active)    Tools: paint gauge, light │   │Paint and body        │
│   – Paint depth on every panel  – Panel gaps …         │   │– Paint depth on …    │
│ ▹ Tyres and wheels   ▹ Engine bay   ▹ Electrics & scan │   │Tools: paint gauge …  │
│ ▹ Underbody   ▹ Interior   ▹ Tech & safety  ▹ Docs     │   │                      │
└────────────────────────────────────────────────────────┘   └──────────────────────┘
```

- **H2:** "What we check, from bumper to boot."
- **Intro:** "Pick a part of the car to see the checks and the tools. 300+ checkpoints in all; checks vary by car and plan."
- **8 categories, each with sample checks and tools.** There are no counts for individual categories; only the "300+" total is their claim.

| Category | Sample checks | Tools |
|---|---|---|
| Paint and body | paint depth, panel gaps, colour match, glass, scratches in daylight | paint gauge, inspection light |
| Tyres and wheels | DOT dates on all five tyres, tread, rims, spare and jack | tread gauge |
| Engine bay | oil, coolant, brake fluid, belts and hoses, leaks, battery terminals | — |
| Electrics and scan | stored and pending fault codes, warning lights, battery charging voltage, lights and horn | OBD-II scanner, battery tester |
| Underbody and suspension | transport scrapes, rust, leaks, bushes ("rubber components") | — |
| Interior | seats, AC, every switch, trims and stains | — |
| Tech and safety | touchscreen, phone pairing, cameras, sensors, airbag and ADAS warnings | — |
| Documents and accessories | VIN and engine number vs invoice, Form 22 and insurance; manufacturing month; odometer; accessories vs invoice; both keys | — |

- **Motion:**
  - Desktop: CSS sticky stage plus a ScrollTrigger scrub that maps progress to the active index. The zone ring moves (transform), the zone stroke turns red, and the panel cross-fades (240 ms).
  - The diagram draws once on entry (DrawSVG).
  - Clicking a tab or hotspot calls `lenis.scrollTo(trackStart + i·step)`, so scroll position and state stay in sync.
  - Mobile and reduced motion: a plain tablist.
- **Accessibility:** WAI-ARIA tabs (roving tabindex, arrow keys, Home and End). SVG hotspots are `aria-hidden` mirrors of the tabs.
- **Components:** `Explorer` (client), `CarDiagram` (SVG), 8 custom category icons (24 px grid, 1.5 px stroke, round caps).

### 9.4 How it works (light)

```
Desktop                                                        Mobile
┌────────────────────────────────────────────────────────┐   ┌──────────────────────┐
│ How it works                                           │   │How it works          │
│ ┌──────────────┐  │1  Book                             │   │[img 4]               │
│ │ img 4        │  │   Message us with car, city, date. │   ││1 Book …             │
│ │ engineer     │  ●2  We meet you there                │   │●2 We meet you there… │
│ │ walk-round   │  │3  We inspect                       │   ││3 We inspect …       │
│ │ 3:2          │  │4  You get the report               │   ││4 Report …           │
│ └──────────────┘  │5  You decide                       │   ││5 You decide …       │
└────────────────────────────────────────────────────────┘   └──────────────────────┘
```

| Step | Title | Copy |
|---|---|---|
| 1 | Book | "Message us on WhatsApp or call with your car, city and delivery date." |
| 2 | We meet you there | "An engineer comes to the dealership, stockyard or your home on delivery day." (`TODO(client)`: confirm) |
| 3 | We inspect | "Paint gauge, OBD scanner and a torch, about 30 to 45 minutes." (TODO: duration, and which tools in which plan) |
| 4 | You get the report | "Photos, readings and notes as a PDF, within 30 minutes." (TODO: turnaround) |
| 5 | You decide | "Accept the car, or ask the dealer to fix what we found before you sign." |

- **Markup:** an `<ol>`, because the numbering is a real sequence.
- **Motion:** a vertical 1 px line runs `scaleY` 0 → 1 (scrub, ease `none`). Each step marker fills red as the line passes it, and its text goes from muted to graphite.

### 9.5 The report (dark interlude): a sample that fills in

```
Desktop                                                        Mobile
┌────────────────────────────────────────────────────────┐   ┌──────────────────────┐
│ The report             ┌───────── SAMPLE REPORT ─────┐ │   │The report you keep.  │
│ you keep.              │ Report OX-SAMPLE · Compact  │ │   │┌────────────────────┐│
│ Every finding comes    │ SUV, petrol AT, 2026        │ │   ││Sample report …     ││
│ with a photo, a        │ Documents      ✓ Pass …     │ │   ││Paint  246 µm ✕ Fail││
│ reading and a note.    │ Paint & body   ✕ 246 µm …   │ │   ││Tyres  ! DOT 3824   ││
│ ✓ Pass ! Attention ✕ Fail │ Tyres       ! Spare DOT │ │   ││[ph][ph][ph]        ││
│ (sticky legend)        │ [photo][photo][photo]       │ │   ││Verdict: Do not …   ││
│                        │ Verdict  Do not proceed …   │ │   ││Signed: engineer    ││
│                        │ Signed: certified engineer  │ │   │└────────────────────┘│
└────────────────────────────────────────────────────────┘   └──────────────────────┘
```

- **H2:** "The report you keep."
- **Sub:** "Every finding comes with a photo, a reading and a plain note. This sample shows the format."

**Sheet contents.** These are fictional, clearly labelled sample data. The structure follows their 7 report sections; the verdicts use their scale.

| Section | Rows |
|---|---|
| Documents | VIN matches invoice and Form 22 (Pass); engine number matches insurance (Pass); manufactured Jan 2026 (Pass); odometer 18 km (Pass) |
| Paint and body | bonnet 109 µm (Pass); front-left door 112 µm (Pass); **rear-left door 246 µm (Fail, resprayed)**; bumper corner scuff (Attention) |
| Tyres | four tyres DOT 0326 (Pass); spare DOT 3824 (Attention: older than the car) |
| Electrics | OBD: 0 active codes, 1 stored, no warning light (Attention); charging 14.1 V (Pass) |
| Accessories | floor mats (Pass); **tool kit missing (Fail)**; both keys (Pass) |
| Photos | 4 thumbnails (images 5–8) |

- **Verdict:** "Do not proceed with delivery. Rear-left door resprayed; tool kit missing."
- **Sign-off:** "Inspected by an OtoXperts certified engineer · report issued 28 minutes after inspection (sample)". This exact layout is an approved exception, because the middle dot sits inside the report artefact.
- **Markup:** a `<table>` with a caption. Each status cell shows a glyph (`aria-hidden`) and the word.
- **Motion:** `ScrollTrigger.batch` rows at `top 85%`. The glyph draws, and readings count up to their value over 0.6 s with tabular figures, so nothing shifts. The verdict fades in with scale 0.97 → 1 (240 ms). Each row animates once.
- **No JS or reduced motion:** the full sheet, static.

### 9.6 Services and prices (light)

```
Desktop                                                        Mobile
┌────────────────────────────────────────────────────────┐   ┌──────────────────────┐
│ Services and prices                                    │   │Services and prices   │
│ New car PDI          Basic   Comprehensive   Premium   │   │New car PDI           │
│ Before you accept    ₹999    ₹1,999          ₹3,999    │   │[Basic|Compr.|Premium]│
│ delivery.            ✓ …     ✓ 300+ checks   ✓ Paint … │   │₹1,999                │
│ Reserve with ₹400 (TODO)  (comparison table, 8 rows)   │   │✓ 300+ checkpoints …  │
│ ─ Used car inspection       one line      Ask on WA    │   │Used car inspection   │
│ ─ Past service record (new) one line      Ask on WA    │   │  Ask on WhatsApp     │
│ ─ Expert opinion & buying guidance        Ask on WA    │   │…                     │
│ ─ Free consultation · ─ Dealer / fleet PDI             │   │                      │
└────────────────────────────────────────────────────────┘   └──────────────────────┘
```

- **Prices:** in ₹ via `Intl.NumberFormat('en-IN')`. Rows marked `confirm`.
- **Service rows:** each row has its own prefilled WhatsApp text.
- **Motion:** the price figures move up by `translateY` 8 px with an opacity fade. The plan switch on mobile slides its indicator with a Motion spring (`select` haptic).

### 9.7 The dealer's PDI, and ours (light)

```
Desktop: a 2-column comparison table (hairlines)               Mobile: stacked pairs
┌────────────────────────────────────────────────────────┐   ┌──────────────────────┐
│ The dealer's PDI, and ours                             │   │Who does it           │
│                  Dealer's PDI         OtoXperts        │   │ Dealer: workshop …   │
│ Who does it      Dealer's workshop    Independent eng. │   │ Us: independent …    │
│ Who it answers to  The dealer         You              │   │Who it answers to …   │
│ Paint            Visual check         Paint gauge (plan)│  │…                     │
│ Fault codes      Varies               OBD scan (plan)  │   │                      │
│ Evidence         Signed checklist     Photo report     │   │                      │
│ When             Before you arrive    With you, before you sign │                  │
└────────────────────────────────────────────────────────┘   └──────────────────────┘
```

- **Tone:** fair, not defamatory. "The dealer's PDI is real; the people selling you the car do it."
- **Below the table:** four short prose pillars (independent, certified, evidence, quick). Independence claims are `TODO` until confirmed (no dealer commissions).
- **Motion:** as each row enters, the OtoXperts cell gains a red tick that draws in.

### 9.8 Where we inspect (light)

```
Desktop                                                        Mobile
┌────────────────────────────────────────────────────────┐   ┌──────────────────────┐
│ Where we inspect         ┌────── India (SVG) ────────┐ │   │Where we inspect      │
│ Based in Delhi NCR. Live │   ● Delhi NCR (base)      │ │   │[map]                 │
│ in Bengaluru and         │ ●Ahmedabad   · · dots     │ │   │Live: Delhi NCR,      │
│ Ahmedabad. Our reels     │         · Hyderabad       │ │   │Bengaluru, Ahmedabad  │
│ come from Ludhiana to    │   ● Bengaluru             │ │   │Also inspected in …   │
│ Hyderabad.               └───────────────────────────┘ │   │[Ask about your city] │
│ [Ask about your city on WhatsApp]                      │   │                      │
└────────────────────────────────────────────────────────┘   └──────────────────────┘
```

- **Map:** coordinates are projected in code from lat/lon stored in `site.ts`.
  - **Boundary compliance:** the outline must follow India's official boundary (risk R5). Source it from an official-boundary dataset with a checked licence and simplify it with mapshaper to under 15 KB, crediting it in the footer.
  - If that can't be verified, ship a schematic "route board" without a country outline.
- **Motion:** the hubs pulse once (ring `scale` 1 → 1.8 with opacity, 1.2 s), then the dots fade in, staggered from Delhi outward.
- **Interaction:** each dot is a link to its reel and shows a tooltip on focus or hover.

### 9.9 10 days to car perfection (concrete)

```
Desktop                                                        Mobile
┌────────────────────────────────────────────────────────┐   ┌──────────────────────┐
│ 10 days to car perfection                    [‹] [›]   │   │10 days to car        │
│ Our delivery-day series, one check a day.              │   │perfection            │
│ ┌────────┐┌────────┐┌────────┐┌────────┐┌──────        │   │┌─────────────┐┌──    │
│ │Day 1/10││Day 2/10││Day 3/10││Day 4/10││Day 5         │   ││Day 1/10     ││Day   │
│ │What is ││PDI is  ││Paint & ││Tech    ││…             │   ││What is PDI  ││2/10  │
│ │PDI     ││peace…  ││glass   ││check   ││              │   ││tip…  See the││      │
│ │See post││        ││        ││        ││              │   ││post         ││      │
│ └────────┘└────────┘└────────┘└────────┘└──────        │   │└─────────────┘└──    │
└────────────────────────────────────────────────────────┘   └──────────────────────┘
```

| Day | Tip |
|---|---|
| 1 | "You've signed the papers. Hold the keys until the car passes." |
| 2 | "PDI is your last chance to raise a problem while the dealer still has the car." |
| 3 | "Check paint, glass and trims panel by panel, in daylight." |
| 4 | "Test the touchscreen, phone pairing, cameras and sensors before you leave." |
| 5 | "A new engine bay should be clean and dry: check oil, coolant, brake fluid, belts and hoses." |
| 6 | "Try every seat adjustment, the AC and each switch." |
| 7 | "Match floor mats, tool kit, spare and manuals against your invoice." |
| 8 | "Ask to inspect before you accept." (legal-safe wording) |
| 9 | "Raise issues before you sign." |
| 10 | "Delivery day is when you have the most say. Use it." |

- **Links:** each card links to its own post.
- **Build:** a native `overflow-x` scroll container with scroll-snap, so touch gets native momentum. On desktop, pointer drag-to-scroll with GSAP inertia on release. Prev and next buttons have `aria-controls`; the container is focusable.

### 9.10 Watch us at work: proof (light)

- **Instagram block:** the official Instagram glyph, "Verified on Instagram", and a "Follow @otoxperts" button. **No follower counts** (they change).
- **Customer reels:** 6 links listed by city and car: Narnaul, Indore (switched from another PDI firm), Faridabad, Ghaziabad, Himmatnagar (Tata Sierra), and the Tata Nexon owner.
- **Also:** YouTube and LinkedIn.
- **No embeds** (performance and privacy) and **no invented quotes**. A Google rating appears only if a profile is found (U2).
- **Motion:** links reveal with an 8 px `translateY`; on hover a red underline grows (`scaleX`).

### 9.11 FAQ (light)

```
Desktop: H2 sticky left (4 cols), accordion right (8 cols)     Mobile: H2 then accordion
```

| Question | Answer / status |
|---|---|
| What is a PDI? | Answered |
| When should I book? | "As soon as you have a delivery date; inspect before you sign and pay" (Nxcar and InspektAI guidance) |
| Can the dealer refuse? | **TODO**: client experience plus legal review |
| How long does it take? | TODO: 30–45 minutes |
| Do I need to be there? | Their FAQ says no |
| What if you find problems? | Reported with photos; no repairs; ask the dealer to fix the issue or refuse the car |
| Used cars? | Yes |
| Which cities? | Answered |
| What does it cost? | From ₹999; `confirm` |
| How soon is the report? | TODO |
| Reschedule? | Up to 24 h before |
| How do I pay? | ₹400 / ₹299; TODO |

- **Markup:** native `<details>`/`<summary>`, so it works without JS and find-in-page can open it. Content fades and slides 4 px over 200 ms. **Height is not animated.**
- **Structured data:** FAQPage JSON-LD covers only answered items. Note that Google limits FAQ rich results to a few site types, so this is about hygiene, not ranking.

### 9.12 Book: final CTA (dark, the one centred moment)

```
Desktop                                                        Mobile
┌────────────────────────────────────────────────────────┐   ┌──────────────────────┐
│        ╭───── car line (drawn, hairline, aria-hidden)  │   │Inspect before        │
│              Inspect before you accept.                │   │you accept.           │
│     Tell us about your car. We'll confirm on WhatsApp. │   │[Name            ]    │
│   [Name        ] [Phone +91      ] [City ▾       ]     │   │[Phone +91       ]    │
│   [Car model   ] [Delivery date  ] [Send on WhatsApp]  │   │[City ▾          ]    │
│      Call +91 92170 49330   ·   info@otoxperts.com     │   │[Car model       ]    │
└────────────────────────────────────────────────────────┘   │[Delivery date   ]    │
                                                             │[Send on WhatsApp]    │
                                                             │Call · Email          │
                                                             └──────────────────────┘
```

**Form**
- Fields:

  | Field | Rules |
  |---|---|
  | Name | `autocomplete=name` |
  | Phone | `type=tel`, `inputmode=tel`; validates 10 digits starting 6–9 |
  | City | a select of live cities plus "Other" |
  | Car model | — |
  | Delivery date | not in the past |

- The form builds this message (no emoji):
  `Hi OtoXperts, I'd like to book a PDI.` / `Name: …` / `Phone: …` / `City: …` / `Car: …` / `Delivery date: 14 Nov 2026`
  It then opens `https://wa.me/919217049330?text=…` in a new tab.
- Errors use `aria-describedby`; a polite live region reports status; a privacy line says nothing is stored.

**Motion and decoration**
- The logo car line draws large (DrawSVG, scrub).
- The submit button fires `success` haptics.

### 9.13 Footer (dark)

- **Content:**
  - Wordmark and tagline.
  - Phone, email and address (TODO: confirm).
  - Live cities.
  - Official social logos: Instagram, Facebook, YouTube, LinkedIn, WhatsApp. Each keeps its brand's minimum size and clear space.
  - Privacy and Terms (TODO).
  - "© 2026 OtoXperts" (the legal name is TODO).
  - The map-data credit.
  - Optionally "Concept homepage by Kunal Kumbhar" (U1).
- **Floating WhatsApp button:**
  - 56 px, the official logo.
  - Appears once the hero has left the viewport; hides when #book is in view.
  - Sits at `bottom: max(16px, env(safe-area-inset-bottom))`.
  - Label: "Chat with OtoXperts on WhatsApp"; `tap` haptic.
  - Enters with opacity and an 8 px `translateY`.

**Section themes and anchors:** #top (dark), #problem, #checks (concrete), #process, #report (dark), #services, #why, #cities, #days (concrete), #proof, #faq, #book (dark), footer (dark).

---

## 10. Architecture

### 10.1 Stack and rendering

- **Framework:** Next.js App Router with strict TypeScript and Turbopack (the Next 16 default).
- **Rendering:** Server Components by default. Client islands only where needed:
  - Navbar, InspectionLight, Explorer, ProcessLine, ReportFill, PlanSwitch, Rail, BookingForm, WhatsAppFloat
  - SmoothScroll, HapticsProvider, the map tooltips
- **Code splitting:** GSAP, ScrollTrigger, SplitText, DrawSVG and Lenis load through dynamic `import()` after hydration. Motion loads through `LazyMotion` with async `domMax` features. Nothing animates the H1.
- **Lenis:** `<ReactLenis root options={{ autoRaf: false }}>`, driven by `gsap.ticker.add(t => lenis.raf(t * 1000))`, with `gsap.ticker.lagSmoothing(0)` and `lenis.on('scroll', ScrollTrigger.update)`. It is not mounted under reduced motion; touch scrolling stays native (`syncTouch` off).
- **Next 16 checks before coding** (vercel:nextjs skill):
  - `next/image` uses `preload` (`priority` is deprecated) and the `images.qualities` allow-list.
  - `next lint` is removed; use the ESLint CLI.
  - Async `params`.
  - `proxy.ts` is not needed.

### 10.2 File structure

```
src/
  app/        layout.tsx (fonts, lang="en-IN", no-js→js inline script, skip link, providers, Analytics, SpeedInsights)
              page.tsx (server; composes sections) · globals.css (@theme tokens, glass, scrollbar, base)
              opengraph-image.tsx (next/og, Hubot TTF bundled) · icon.svg · apple-icon.png · manifest.ts
              sitemap.ts · robots.ts (env-driven noindex for the demo)
  content/    site.ts (ALL copy, links, numbers, callout coords, explorer, report, plans, cities lat/lon, reels, FAQ, TODOs)
              types.ts · images.generated.json (written by scripts/images.mjs)
  components/ brand/ (Logo.tsx: traced SVG, car-line stroke mask; Wordmark)
              nav/ (Navbar, MobileSheet, useScrollSpy, useSectionTheme, useScrollLock)
              hero/ (Hero server shell, InspectionLight client, Callout)
              sections/ (Problem, Explorer/, Process, Report/, Services/, WhyUs, Cities/ (IndiaMap), Days/ (Rail), Proof, Faq, Book/ (BookingForm), Footer)
              ui/ (Button, StatusMark, Section, Container, Shot (image or designed placeholder), SocialLogo, WhatsAppFloat, VisuallyHidden)
              motion/ (SmoothScroll, HapticsProvider, gsap.ts: register plugins once, client-only)
  icons/      8 custom inspection-category icons
  lib/        haptics.ts · whatsapp.ts (message builder) · jsonld.ts · format.ts (en-IN ₹ and dates) · cn.ts (clsx)
public/       images/ (optimised masters) · brands/ (theSVG logos) · logo/ (otoxperts.svg, otoxperts@2x.png fallback)
scripts/      images.mjs (sharp: _incoming-images → public/images + blur placeholders + manifest)
              trace-logo.mjs (sharp mask → potrace → SVG; then hand-corrected) · js-budget.mjs (gzip of first-load scripts)
              todos.mjs (lists every TODO(client) in site.ts)
tests/        e2e/*.spec.ts (Playwright: chromium + webkit + iPhone/Pixel devices) · a11y.spec.ts (axe)
docs/PLAN.md · IMAGE_PROMPTS.md · CLAUDE.md · README.md · PRODUCT.md / DESIGN.md (impeccable)
```

**Content model:** `site.ts` is `satisfies Site`.
- Unknown values are `{ todo: "…" }` and render as designed placeholders.
- Found-but-unconfirmed values carry `confirm: true` plus a source string.
- `npm run todos` prints the client checklist.

### 10.3 Dependencies (pinned with `-E`; versions checked with npm on 28 Oct 2026)

**Runtime**

| Package | Version |
|---|---|
| next | 16.4.3 |
| react, react-dom | 19.3.1 |
| motion | 14.7.1 |
| gsap | 3.15.0 (all plugins free: ScrollTrigger, SplitText, DrawSVG, Inertia) |
| @gsap/react | 2.1.2 |
| lenis | 1.3.27 |
| @phosphor-icons/react | 2.1.10 (`/ssr` imports; `*Icon` names; regular weight) |
| @vercel/analytics | 2.0.1 |
| @vercel/speed-insights | 2.0.0 |
| clsx | 2.1.1 |

**Dev**

| Package | Version |
|---|---|
| typescript | **5.9.3** (TS 7 breaks typescript-eslint) |
| eslint | **9.39.5** (ESLint 10 breaks eslint-config-next's plugins) |
| eslint-config-next | 16.4.3 |
| tailwindcss, @tailwindcss/postcss | 4.3.3 |
| @types/react, @types/react-dom | 19.3.0 |
| @types/node | **22.20.5** (matches Node 22) |
| sharp | 0.35.5 |
| schema-dts | 2.1.0 |
| prettier, prettier-plugin-tailwindcss | 3.9.10, 0.8.1 |
| @playwright/test | 1.64.1 |
| @axe-core/playwright | 4.14.0 |
| lighthouse | 13.5.0 |
| potrace | latest stable at install (dev only, for logo tracing) |
| mapshaper | via `npx`, one-off |

**Not used:** three / R3F (no section needs 3D), tailwind-merge.

---

## 11. Image manifest (I write the full prompts in IMAGE_PROMPTS.md as step 2)

**Shared style for every prompt**
- **Setting:** India: a dealership delivery bay or stockyard.
- **People:** Indian engineers in plain black polos with red accents and no printed logos.
- **Cars:** right-hand-drive, modern, generic and unbadged, with blank number plates.
- **Grade (one for all images):** cool neutral, slightly desaturated, deep blacks, crisp highlights, fine grain.
- **Camera:** full-frame; 35 mm, 50 mm or 100 mm macro as listed.
- **Negatives:** no text, letters, watermarks, logos or badges; no distorted hands or faces; no CGI look.
- **Format:** each prompt states the ratio, pixel size, orientation and PNG. If ChatGPT can't output the exact size, download the largest size at the same ratio; the script crops and resizes.

| # | File (`public/images/`) | Used in | Ratio | Target px | Brief |
|---|---|---|---|---|---|
| 1 | hero-bay.jpg | Hero ≥768 | 16:9 landscape | 2560×1440 | White compact SUV, 3/4 front, right third; evenly exposed detail (CSS dims it); left 45% empty dark for the H1; 35 mm |
| 2 | hero-bay-mobile.jpg | Hero <768 | 9:16 portrait | 1080×1920 | **"Attach the image from prompt 1 to this chat first"**: the same car and bay recomposed; car in the lower 45%; top half clear |
| 3 | stockyard.jpg | Problem | 4:5 portrait | 1600×2000 | Rows of new unbadged cars in a dusty stockyard, morning light, some with protective film; carrier truck behind |
| 4 | engineer-walkround.jpg | Process | 3:2 landscape | 2400×1600 | Engineer with tablet and torch walking around a new SUV on a daylight dealership forecourt |
| 5 | detail-paint-gauge.jpg | Report, Explorer | 1:1 | 1200×1200 | Paint-gauge probe on a door panel; display out of focus; 100 mm macro |
| 6 | detail-tread-gauge.jpg | Report, Explorer | 1:1 | 1200×1200 | Tread gauge in a tyre groove, daylight |
| 7 | detail-obd.jpg | Report, Explorer | 1:1 | 1200×1200 | Scanner plugged into the OBD port under the dashboard; screen unreadable |
| 8 | detail-underbody.jpg | Report, Explorer | 1:1 | 1200×1200 | Torch beam under the car showing a transport scrape |

**Pipeline**
- **Placeholders:** until the files exist, `Shot` renders designed placeholders at the exact ratio: concrete ground, a hairline frame, and the image number and name. The hero placeholder is a vector line drawing of the car, which the torch still lights.
- **Sources:** `_incoming-images/` is matched by its leading number (`01*.png` → hero-bay), so you can name files "01.png".
- **`npm run images`:** crops to each ratio (per-image focus), resizes, writes high-quality JPEG masters and blur placeholders, and updates `images.generated.json`. No code changes are needed.
- **Hero callouts:** coordinates are recalibrated once with a dev-only `?calibrate` overlay (click to copy % coordinates).
- **No AI** for the OG image, favicon or icons. The OG image uses `next/og` with the traced logo; the icons are a simplified disc mark.

---

## 12. Performance, accessibility and tests

**Budgets** (throttled mobile, production build)

| Metric | Budget |
|---|---|
| LCP | <2.0 s |
| CLS | <0.05 |
| INP | <200 ms (lab proxy: TBT) |
| Initial JS | ≤ about 170 KB gzip, measured by `scripts/js-budget.mjs` |
| Lighthouse mobile | Performance ≥95; Accessibility, Best Practices and SEO 100 |

Real numbers will be reported, including a **before / after against their current site**.

**SEO**
- Metadata API with `metadataBase` from `NEXT_PUBLIC_SITE_URL`.
- Canonical URL.
- `opengraph-image.tsx`.
- `sitemap.ts`, and `robots.ts` driven by `NEXT_PUBLIC_INDEXABLE` (false on the demo).
- JSON-LD:
  - `AutomotiveBusiness`: name, url, logo, telephone, email, address (once confirmed), `areaServed` (live cities), `sameAs` (IG, FB, YT, LI), `contactPoint` (en, hi).
  - `Service` for each service, with `offers` only once confirmed.
  - FAQPage for answered items.

**Accessibility (WCAG 2.2 AA)**
- Landmarks; a skip link; sections use `aria-labelledby`.
- A visible focus ring: 2 px, white on dark and black on light, 2 px offset.
- Targets ≥44 px.
- Colour is never the only signal.
- Hero callouts are reachable by keyboard.
- Patterns: tabs pattern; `<details>`; table with caption; focusable rail; form labels and errors.
- `lang="en-IN"`.
- A reduced-motion path for every animation.
- All content visible without JS.

**Quality gates (step 4)**
1. `next build`: zero TypeScript and ESLint errors.
2. Playwright on chromium and webkit plus device descriptors (iPhone 13, Pixel 7):
   - no console errors or hydration warnings;
   - **no horizontal overflow** at 320, 360, 375, 390, 414, 768, 1024, 1280, 1440 and 1920 px;
   - keyboard-only pass: nav trap, Esc, explorer arrows, FAQ, form;
   - reduced-motion pass (`emulateMedia`): no sticky tracks, everything visible;
   - WebKit checks: backdrop-filter rendering, 100dvh sheet, scroll lock, Lenis with touch emulation.
3. axe: 0 serious or critical issues.
4. Visual QA with Claude in Chrome screenshots at 390×844 and 1440×900 after every build step.
5. Tool checks:
   - taste `inspect.mjs` at 1440, 768 and 390 with `--allow` for glass, hairlines and numbering only;
   - impeccable `critique` and `audit`;
   - awwwards-mcp `analyze_page_structure` and `verify_build`;
   - emil `review-animations`;
   - `break-ui` with worst-case content (long city and car names at 320 px).
6. A 4× and 6× CPU throttle check of the nav sheet and the hero beam (≥50 fps).
7. Lighthouse mobile on `next build && next start`, then on the live URL.
8. Final jury score (optional, at the end).

---

## 13. Execution after approval

**0. You**
- Pause OneDrive.
- Optionally allow google.com and justdial.com in the Claude extension (U2).
- Answer U1–U4.

**1. Setup**
1. Confirm the active skills, MCP servers and Chrome.
2. Install the awwwards-mcp skills: `npm pack awwwards-mcp@1.13.0` in the scratchpad, extract, and copy `package/skills/{awwwards-section-loop,awwwards-inspiration,motion-authoring}` to `.claude/skills/`. They load next session; in this session I read their SKILL.md files directly.
3. Scaffold:
   - `npx create-next-app@16.4.3 <scratchpad>/otx --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm`, checking `--help` first (no React Compiler).
   - Move everything except `node_modules` and `.git` into the root.
   - **Merge** `.gitignore`, adding `test-results/`, `playwright-report/`, `.lighthouse/`, `.taste-skill/`, `.jury/`, `.shots/` and `*.tsbuildinfo`.
   - Run `npm i`, then pin the versions in §10.3.
4. Write CLAUDE.md (conventions: all copy in `site.ts`, the token and motion rules, conventional commits, never force-push) and README (setup, scripts, editing content, swapping images, deploying).
5. Save this plan as `docs/PLAN.md`.
6. Run `impeccable context`, then `init`, answering its interview from this plan → PRODUCT.md.
7. Trace the logo (`scripts/trace-logo.mjs` on `logo_reference.jpg` masks), hand-correct the curves, and diff it against the PNG at 400% overlay.
8. Make a local commit.

**2. Images.** Write `IMAGE_PROMPTS.md` and print it in chat.

**3. Build.** After each step: run the app, take screenshots at 390 and 1440, critique, fix, and commit.
1. Tokens, type, scrollbar, haptics, primitives
2. Layout shell: SmoothScroll, providers, skip link, `js` class
3. Navbar (desktop, then mobile sheet)
4. Hero (static, then torch, then touch, then reduced motion)
5. Problem
6. Explorer
7. Process
8. Report
9. Services
10. Why
11. Cities
12. 10-day rail
13. Proof
14. FAQ
15. Book
16. Footer and WhatsApp float
17. SEO, OG, icons, JSON-LD
18. stop-slop copy pass and `npm run todos`

**4. Quality gates (§12).**

**5. Git**
1. `git config credential.https://github.com.username kumbharkunal` (repo-local), so GCM uses the owner account. If no token exists, GCM opens a browser sign-in for you.
2. `git push -u origin main`, with logical conventional commits. Never force-push.

**6. Vercel** (CLI, with the MCP for checks)
1. `vercel link --project otoxperts`.
2. `vercel git connect https://github.com/kumbharkunal/OTOXPERTS`. If the Vercel GitHub app lacks access, I'll give you the install link.
3. Env: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_INDEXABLE=false`.
4. `vercel deploy --prod`. If needed, alias `otoxperts.vercel.app`; if that's taken, I'll report the assigned URL and options.
5. Check that `curl -I` returns 200 while logged out (no Vercel Authentication on production).
6. Test on Chrome at mobile and desktop sizes, run Lighthouse on the live URL, and redeploy fixes.

**7. Final report**
- The live URL and repo URL.
- Lighthouse scores, before and after.
- Placeholders and TODOs remaining.
- 5–8 pitch notes, drawn from §2.3 and the build.

---

## 14. Risks

| # | Risk | Mitigation |
|---|---|---|
| R1 | OneDrive sync locks or slows installs | Pause sync. Optionally, put `node_modules` and `.next` behind directory junctions outside OneDrive |
| R2 | The expanded italic display font shifts layout when it swaps in | Size-adjusted fallback and a 2-line H1. If CLS ≥0.05, switch the display font to `display: optional` |
| R3 | Beam or sheet jank on low-end Android | Compositor-only design; throttle tests; fallbacks (smaller beam, solid sheet during transition) |
| R4 | Claims and ASCI rules (superlatives, legal "rights") | Conservative copy; every claim sourced or TODO |
| R5 | A map of India must show the official boundary | Official-boundary source with a licence check, or the schematic fallback |
| R6 | AI image artefacts or inconsistency | Strict negatives, edit-chaining for the hero pair, placeholders, recalibration |
| R7 | A public demo of a real brand reads as impersonation | noindex, an optional credit line (U1); every CTA reaches the real business |
| R8 | otoxperts.vercel.app is taken | Report alternatives |
| R9 | Push identity mismatch | §13 step 5 |
| R10 | Usage limits mid-build (hit once today) | Small commits; `docs/PLAN.md` as the resume point |
| R11 | WebSearch / WebFetch outages | `curl` fallbacks |
| R12 | Version traps | TS 5.9.3, ESLint 9.39.5, @types/node 22 |
| R13 | JS budget with GSAP, Motion and Lenis | Dynamic imports, async Motion features, measured |
| R14 | The iOS haptics workaround stops working | Feature flag; easy to remove |

---

## 15. Questions

**For you (defaults apply if you approve without answering)**

| # | Question | Default |
|---|---|---|
| U1 | Should the demo be noindexed and carry a small "Concept homepage by Kunal Kumbhar" footer line? | Both yes |
| U2 | Will you allow google.com and justdial.com in the Claude extension, so I can look for a Google Business Profile and real reviews in step 1? | Proof uses Instagram only |
| U3 | Which GitHub account should push: `kumbharkunal` (owner) or `kunalkumbhar12` (stored in GCM, which needs collaborator access)? | `kumbharkunal` |
| U4 | Was `Screenshot 2026-10-20 162309.png` (a car-listing UI) meant as a reference? | Ignored |

**For the client.** Each appears as a `TODO(client)` in `site.ts`.

1. **Brand basics**
   - C1. Which spelling is official: OtoXperts, OTOXperts or Otoxperts? (The demo uses OtoXperts.)
   - C2. Can you send the original vector logo (AI, SVG or PDF)?
   - C3. "Only company with certified engineers" needs proof (ASCI), so the demo says "Inspections by certified engineers". Who certifies your engineers?
2. **What each plan includes**
   - C4. Is it 300+, 150+ or 100+ checkpoints? We'll use one number everywhere.
   - C5. Are ₹999, ₹1,999 and ₹3,999 current, and do they apply to used cars too?
   - C6. Is the slot fee ₹400 or ₹299?
   - C7. Is the paint gauge used on every PDI or only Premium? (This drives the hero copy.)
   - C8. Which plans include the OBD scan?
   - C9. Is the report delivered in 30 minutes, the same day, 2 hours or 24 hours?
   - C10. Does an inspection take 30–45 minutes?
   - C11. Which plans include a test drive, and how does it work on an unregistered car?
   - C12. What are the terms of the "peace of mind guarantee"?
3. **Where and when you work**
   - C13. Which cities are live today: the 3 launches, the 32 cities on your site, or "PAN India"?
   - C14. Can we publish the address (1108, Sector 82, Faridabad 121002)? Is there a Gurgaon office?
   - C15. Is "Open 24 hours" true for bookings and inspections?
   - C16. Can customers be absent during the inspection?
4. **Independence and legal wording**
   - C17. What's your experience when dealers refuse an inspection, and what's the fallback? (The rights wording needs legal review.)
   - C18. Do you take any dealer commissions or have partnerships? (This decides whether we can say "independent".)
5. **Services**
   - C19. What are the price and process for the used-car inspection, the past service record check and expert opinion?
   - C20. Should Dealer/Fleet PDI appear on the homepage?
6. **Proof and people**
   - C21. Do you have a Google Business Profile, Justdial listing or written reviews we may quote?
   - C22. May we link customer reels on the site?
   - C23. Do you have inspection counts or a founding date you can stand behind? (We'll publish nothing until you do.)
   - C24. Should the report sign-off name a real engineer, with permission?
7. **Legal and accounts**
   - C25. What is your legal entity name, and where are your Privacy and Terms pages?
   - C26. Which Facebook page should stay (82 vs 22 followers)? Do you have an X account?
   - C27. Can you change your Instagram category from "Car dealership" to an automotive service category?
   - C28. Please fix the TLS certificate on otoxperts.com, retire the placeholder HR number, and confirm whether 9289872166 is retired.
8. **Optional**
   - C29. Would you like Hinglish lines, like your best reels, or a Hindi version later?

---

## 16. Verification (end to end)

1. `npm run build && npm start`. Playwright (`npx playwright test`, chromium and webkit) and axe pass. The overflow sweep at 320–1920 is clean. `node scripts/js-budget.mjs` reports ≤170 KB gzip.
2. Lighthouse mobile on localhost: Performance ≥95; Accessibility, Best Practices and SEO 100; LCP <2.0 s; CLS <0.05. Repeat on the live URL; record both, plus the before numbers for www.otoxperts.com.
3. Manual checks with Claude in Chrome at 390×844 and 1440×900:
   - the torch on desktop; the sweep and tap on touch;
   - the nav sheet open and close with focus trap and Esc;
   - scroll-spy, theme switching, and the red scrollbar track switching dark/light;
   - haptics: on Android Chrome (a real device, or confirm `navigator.vibrate` calls in console logs); on iOS, a check on a real device if available;
   - the form building the correct wa.me message.
4. Reduced motion and no-JS: the hero is fully lit with all callouts visible, every section's content is present, and nothing is pinned.
5. Live site: `curl -I https://otoxperts.vercel.app` returns 200 while logged out; OG preview renders (test link in WhatsApp); robots shows noindex while `NEXT_PUBLIC_INDEXABLE=false`.
