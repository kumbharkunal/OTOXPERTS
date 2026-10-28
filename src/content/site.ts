/**
 * All homepage copy, links, numbers and coordinates.
 *
 * Rules (see CLAUDE.md and docs/PLAN.md):
 * - Never invent facts. Unknowns use `todo(...)` and render as designed placeholders.
 * - Facts found in OtoXperts' own channels but not yet confirmed carry `confirm` with a source.
 * - `npm run todos` lists every TODO(client) and confirm marker in this file.
 */

export type Todo = { todo: string };
export const todo = (note: string): Todo => ({ todo: note });
export const isTodo = (v: unknown): v is Todo =>
  typeof v === "object" && v !== null && "todo" in v;

export type Status = "pass" | "attn" | "fail";
export type Point = { x: number; y: number };

const ig = "https://www.instagram.com";
const post = (id: string) => `${ig}/p/${id}/`;

/*
 * Videos play on this site, never as links out to Instagram (Kunal's call, for now).
 * `video` is the Instagram reel code: instagram.com/reel/<code>/ is where it came from, and
 * `npm run videos` turns _incoming-videos/<code>.mp4 into public/videos/<code>.mp4.
 * A video whose file isn't there yet renders as plain text.
 */

const phoneDisplay = "+91 92170 49330";
const phoneTel = "+919217049330";
const waNumber = "919217049330";

export const site = {
  seo: {
    title: "OtoXperts | Car PDI by certified engineers",
    description:
      "Book a pre-delivery inspection for your new car. OtoXperts engineers check 300+ points at the dealership and give you a photo report before you sign. Delhi NCR, Bengaluru, Ahmedabad and more.",
    ogTitle: "Don't buy blind. Inspect before you accept.",
  },

  brand: {
    name: "OtoXperts",
    // TODO(client): confirm the official spelling (OtoXperts / OTOXperts / Otoxperts).
    spellingConfirm: { confirm: true, source: "Spelling varies across otoxperts.com, Instagram, Facebook and LinkedIn" },
    tagline: "Inspect before you accept.",
    phone: { display: phoneDisplay, tel: phoneTel },
    whatsappNumber: waNumber,
    email: "info@otoxperts.com",
    address: {
      lines: ["1108, Sector 82", "Faridabad 121002, Haryana"],
      confirm: true,
      source: "otoxperts.com footer (May 2026 build); LinkedIn lists Faridabad and Gurgaon",
    },
    legalName: todo("Legal entity name for the copyright line"),
    privacyUrl: todo("Privacy policy URL"),
    termsUrl: todo("Terms and conditions URL"),
    social: {
      instagram: `${ig}/otoxperts/`,
      facebook: "https://www.facebook.com/profile.php?id=61585057680958",
      youtube: "https://www.youtube.com/@OtoXperts",
      linkedin: "https://www.linkedin.com/company/otoxpertss/",
    },
    credit: "Concept homepage by Kunal Kumbhar",
  },

  whatsapp: {
    book: "Hi OtoXperts, I'd like to book a PDI for my new car.",
    city: "Hi OtoXperts, do you inspect cars in my city? I'm in ",
    general: "Hi OtoXperts, I have a question about a car inspection.",
  },

  nav: {
    links: [
      { id: "checks", label: "Checks" },
      { id: "process", label: "How it works" },
      { id: "report", label: "Report" },
      { id: "services", label: "Prices" },
      { id: "faq", label: "FAQ" },
    ],
    cta: "Book PDI",
    ctaShort: "Book",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    sheetContact: "Talk to an engineer",
  },

  hero: {
    /** Two fixed lines, so the headline keeps its height whichever font is showing. */
    h1: ["Don't buy", "blind."],
    sub: "Certified engineers inspect your new car at the dealership, before you sign for it.",
    primary: "Book a PDI on WhatsApp",
    secondary: `Call ${phoneDisplay}`,
    trust: ["300+ checkpoints", "Unbiased photo report", "Certified engineers"],
    cities: "Delhi NCR, Bengaluru, Ahmedabad and more",
    hintPointer: "Move the light across the car.",
    hintTouch: "Tap a marker to look closer.",
    caption: "Sample readings, for illustration.",
    listLabel: "What the light finds",
    image: {
      desktop: "hero-bay",
      mobile: "hero-bay-mobile",
      alt: "A new white SUV in a dim dealership delivery bay",
    },
    /**
     * Callout anchors in % of the art-directed image (cover box).
     * Placeholder positions: recalibrate with ?calibrate once the real photos land.
     */
    callouts: [
      {
        id: "door",
        title: "Rear door",
        reading: "246\u00a0µm",
        note: "The front door reads 112\u00a0µm. Resprayed.",
        status: "fail" as Status,
        side: "left" as const,
        pos: { desktop: { x: 84.5, y: 51 }, mobile: { x: 85, y: 64.5 } },
      },
      {
        id: "bumper",
        title: "Front bumper",
        reading: "Scuff",
        note: "Polished over, still visible in daylight.",
        status: "attn" as Status,
        side: "right" as const,
        pos: { desktop: { x: 57.5, y: 64 }, mobile: { x: 46, y: 70 } },
      },
      {
        id: "tyre",
        title: "Front tyre",
        reading: "DOT 3824",
        note: "Made in week 38 of 2024, older than the car.",
        status: "attn" as Status,
        side: "left" as const,
        pos: { desktop: { x: 61.5, y: 78 }, mobile: { x: 54, y: 76.5 } },
      },
      {
        id: "bonnet",
        title: "Bonnet gap",
        reading: "6.1\u00a0/\u00a03.9\u00a0mm",
        note: "Left side wider than right.",
        status: "attn" as Status,
        side: "right" as const,
        desktopOnly: true,
        pos: { desktop: { x: 64, y: 38.5 }, mobile: { x: 53, y: 61.5 } },
      },
    ],
  },

  problem: {
    h2: "A new car can arrive already repaired.",
    body: [
      "Your car rides a carrier truck and waits in a stockyard before it reaches you. Scrapes from the journey get resprayed. Old stock gets sold as new. Accessories on your invoice go missing.",
      "Under showroom lights, you won't see any of it.",
    ],
    image: { key: "stockyard", alt: "Rows of new cars waiting in a stockyard in morning light" },
    findsTitle: "Found by our engineers",
    findsNote: "From inspection videos OtoXperts has published on Instagram.",
    linkLabel: "Watch the video",
    finds: [
      { text: "Roof and quarter panel repainted, with rust across the body.", video: "DdG0NxypRuM" },
      { text: "Fender repaired and both bumpers repainted.", video: "DcQj00Zp3n7" },
      { text: "Two doors already replaced.", video: "Da-1Xe6poBK" },
      { text: "An odometer reading that didn't add up.", place: "Sonipat", video: "DcxxZOBpTvd" },
      { text: "Engine and sensor faults. The buyer chose another car, which passed.", place: "Delhi", video: "Dcxxjjkp4Zz" },
      { text: "Repainted panels. The buyer refused the car.", place: "Delhi", video: "Da2voU9J-QG" },
    ],
    selfCheckTitle: "Three checks you can do yourself",
    selfChecks: [
      {
        title: "Tyre dates",
        body: "The last four digits of the DOT code on each tyre are the week and year it was made. 0326 means week 3 of 2026.",
      },
      {
        title: "Odometer",
        body: "A new car usually shows under 50\u00a0km at delivery. Ask about anything much higher.",
      },
      {
        title: "Daylight",
        body: "Take delivery in daylight. Showroom lighting flatters paint.",
      },
    ],
  },

  explorer: {
    h2: "What we check, from bumper to boot.",
    intro: "Pick a part of the car to see the checks and the tools behind them.",
    total: "300+ checkpoints in all",
    totalNote: "Checks vary by car and plan.",
    toolsLabel: "Tools",
    categories: [
      {
        id: "paint",
        name: "Paint and body",
        zone: { x: 65, y: 62 },
        checks: [
          "Paint depth on every panel, compared side by side",
          "Panel gaps on doors, bonnet and boot",
          "Colour match between panels",
          "Glass for chips and cracks",
          "Scratches and swirl marks, checked in daylight",
        ],
        tools: ["Paint thickness gauge", "Inspection light"],
        image: "detail-paint-gauge",
      },
      {
        id: "tyres",
        name: "Tyres and wheels",
        zone: { x: 23, y: 80 },
        checks: [
          "DOT date code on all five tyres",
          "Tread depth",
          "Rims for scuffs and dents",
          "Spare wheel, jack and tool kit",
        ],
        tools: ["Tread depth gauge"],
        image: "detail-tread-gauge",
      },
      {
        id: "engine",
        name: "Engine bay",
        zone: { x: 18, y: 57 },
        checks: [
          "Engine oil and coolant levels",
          "Brake and washer fluid",
          "Belts and hoses",
          "Leaks around seals and joints",
          "Battery terminals",
        ],
        tools: ["Inspection light"],
      },
      {
        id: "electrics",
        name: "Electrics and scan",
        zone: { x: 40, y: 63 },
        checks: [
          "Stored and pending fault codes",
          "Warning lights at start-up",
          "Battery charging voltage",
          "Every light, indicator and the horn",
        ],
        tools: ["OBD-II scanner", "Battery tester"],
        image: "detail-obd",
      },
      {
        id: "underbody",
        name: "Underbody and suspension",
        zone: { x: 50, y: 89 },
        checks: [
          "Scrapes from transport",
          "Rust and fluid leaks",
          "Suspension parts and rubber bushes",
          "Exhaust and heat shields",
        ],
        tools: ["Inspection light", "Inspection mirror"],
        image: "detail-underbody",
      },
      {
        id: "interior",
        name: "Interior",
        zone: { x: 60, y: 41 },
        checks: [
          "Seats and every seat adjustment",
          "Air conditioning",
          "Every switch, window and lock",
          "Trims, stains and scuffs",
        ],
        tools: [],
      },
      {
        id: "tech",
        name: "Tech and safety",
        zone: { x: 44, y: 43 },
        checks: [
          "Touchscreen and phone pairing",
          "Cameras and parking sensors",
          "Airbag and ADAS warning lights",
          "Speakers and charging ports",
        ],
        tools: [],
      },
      {
        id: "docs",
        name: "Documents and accessories",
        zone: { x: 89, y: 54 },
        checks: [
          "VIN and engine number against the invoice, Form 22 and insurance",
          "Manufacturing month",
          "Odometer reading",
          "Accessories against your invoice",
          "Both keys",
        ],
        tools: [],
      },
    ],
  },

  process: {
    h2: "How it works",
    image: { key: "engineer-walkround", alt: "An engineer with a tablet and torch walking around a new SUV" },
    steps: [
      { title: "Book", body: "Message us on WhatsApp or call with your car, city and delivery date." },
      {
        title: "We meet you there",
        body: "An engineer comes to the dealership, stockyard or your home on delivery day.",
        // TODO(client): confirm the on-site model and how far ahead to book.
      },
      {
        title: "We inspect",
        body: "Paint gauge, OBD scanner and a torch, panel by panel. About 30 to 45 minutes.",
        confirm: { source: "Duration from otoxperts.com FAQ; tools by plan need confirming" },
      },
      {
        title: "You get the report",
        body: "Photos, readings and notes in a PDF, within 30 minutes of the inspection.",
        confirm: { source: "otoxperts.com FAQ says 30 minutes; plans say same day or 2 hours" },
      },
      { title: "You decide", body: "Accept the car, or ask the dealer to fix what we found before you sign." },
    ],
  },

  report: {
    h2: "The report you keep.",
    sub: "Every finding comes with a photo, a reading and a plain note. This sample shows the format.",
    legend: [
      { status: "pass" as Status, label: "Pass" },
      { status: "attn" as Status, label: "Attention" },
      { status: "fail" as Status, label: "Fail" },
    ],
    sheet: {
      label: "Sample report",
      number: "OX-SAMPLE-0427",
      car: "Compact SUV, petrol automatic",
      year: "Model year 2026",
      place: "Dealer stockyard",
      kind: "New car PDI",
      caption: "Sample inspection report with readings and statuses",
      sections: [
        {
          title: "Documents",
          rows: [
            { label: "VIN matches invoice and Form 22", value: "Matched", status: "pass" as Status },
            { label: "Engine number matches insurance", value: "Matched", status: "pass" as Status },
            { label: "Manufacturing month", value: "Jan 2026", status: "pass" as Status },
            { label: "Odometer", value: "18\u00a0km", count: 18, status: "pass" as Status },
          ],
        },
        {
          title: "Paint and body",
          rows: [
            { label: "Bonnet", value: "109\u00a0µm", count: 109, status: "pass" as Status },
            { label: "Front left door", value: "112\u00a0µm", count: 112, status: "pass" as Status },
            { label: "Rear left door", value: "246\u00a0µm", count: 246, status: "fail" as Status, note: "Resprayed" },
            { label: "Front bumper corner", value: "Scuff", status: "attn" as Status, note: "Polished over" },
          ],
        },
        {
          title: "Tyres",
          rows: [
            { label: "Four road tyres", value: "DOT 0326", status: "pass" as Status },
            { label: "Spare tyre", value: "DOT 3824", status: "attn" as Status, note: "Older than the car" },
          ],
        },
        {
          title: "Electrics",
          rows: [
            { label: "OBD scan", value: "0 active, 1 stored", status: "attn" as Status, note: "No warning light" },
            { label: "Charging voltage", value: "14.1\u00a0V", status: "pass" as Status },
          ],
        },
        {
          title: "Accessories",
          rows: [
            { label: "Floor mats", value: "Present", status: "pass" as Status },
            { label: "Tool kit", value: "Missing", status: "fail" as Status },
            { label: "Keys", value: "2 of 2", status: "pass" as Status },
          ],
        },
      ],
      photos: [
        { key: "detail-paint-gauge", caption: "Rear left door, 246\u00a0µm" },
        { key: "detail-tread-gauge", caption: "Tread depth" },
        { key: "detail-obd", caption: "OBD scan" },
        { key: "detail-underbody", caption: "Underbody shield scrape" },
      ],
      verdictLabel: "Verdict",
      verdict: "Do not proceed with delivery.",
      verdictReason: "Rear left door resprayed. Tool kit missing.",
      signoffLabel: "Inspected by",
      signoff: "OtoXperts certified engineer",
      issued: "Report issued 28 minutes after inspection",
    },
  },

  services: {
    h2: "Services and prices",
    pdi: {
      title: "New car PDI",
      body: "Before you accept delivery.",
      reserve: "Reserve your slot with a small advance and pay the rest after the inspection.",
      // TODO(client): slot advance is ₹400 on otoxperts.com and ₹299 in an Instagram reel.
      reserveConfirm: { confirm: true, source: "otoxperts.com FAQ (₹400) vs reel DWRuqkUiS7I (₹299)" },
      pricesConfirm: { confirm: true, source: "otoxperts.com pricing (May 2026 build)" },
      plans: [
        { id: "basic", name: "Basic", price: 999, blurb: "A quick visual check" },
        { id: "comprehensive", name: "Comprehensive", price: 1999, blurb: "The full 300+ point inspection" },
        { id: "premium", name: "Premium", price: 3999, blurb: "Adds paint gauge and test drive" },
      ],
      /** Rows from the plan lists on otoxperts.com. true = included. */
      rows: [
        { label: "Exterior and interior visual check", plans: [true, true, true] },
        { label: "Basic mechanical checks", plans: [true, true, true] },
        { label: "Inspection at your location", plans: [true, true, true] },
        { label: "Report with photos", plans: ["Summary", "Detailed", "Detailed"] },
        { label: "300+ checkpoints", plans: [false, true, true] },
        { label: "OBD diagnostic scan", plans: [false, true, true] },
        { label: "Underbody inspection", plans: [false, true, true] },
        { label: "VIN and odometer verification", plans: [false, true, true] },
        { label: "Paint thickness measurement", plans: [false, false, true] },
        { label: "Battery health analysis", plans: [false, false, true] },
        { label: "Test drive and performance check", plans: [false, false, true] },
        { label: "Report delivery", plans: ["Same day", "Same day", "Within 2 hours"] },
        { label: "Engineer consultation and lifetime report access", plans: [false, false, true] },
      ] as { label: string; plans: (boolean | string)[] }[],
      includedLabel: "Included",
      notIncludedLabel: "Not included",
    },
    others: [
      {
        id: "used",
        title: "Used car inspection",
        body: "Engine, gearbox, accident repairs, odometer and service history, checked before you pay.",
        message: "Hi OtoXperts, I'd like to book a used car inspection.",
        price: todo("Used car inspection price"),
      },
      {
        id: "history",
        title: "Past service record check",
        body: "Know what the car has been through before you buy it.",
        message: "Hi OtoXperts, I'd like a past service record check.",
        price: todo("Service record check price and method"),
      },
      {
        id: "opinion",
        title: "Expert opinion and buying guidance",
        body: "Talk to an engineer about the car or variant before you commit.",
        message: "Hi OtoXperts, I'd like an expert opinion before buying a car.",
        price: todo("Expert opinion price"),
      },
      {
        id: "consult",
        title: "Free consultation",
        body: "Ask anything about your delivery on WhatsApp.",
        message: "Hi OtoXperts, I have a question about my car delivery.",
      },
      {
        id: "fleet",
        title: "Dealer and fleet PDI",
        body: "Recurring inspections for dealerships, rental companies and fleets.",
        message: "Hi OtoXperts, I'd like to discuss PDI for our dealership or fleet.",
      },
    ],
    askLabel: "Ask on WhatsApp",
  },

  why: {
    h2: "The dealer's PDI, and ours",
    intro:
      "Dealers run a PDI too, on their own checklist, before you arrive. We inspect for you on delivery day and show you the evidence.",
    columns: ["Dealer's PDI", "OtoXperts"],
    rows: [
      { label: "Who does it", dealer: "The dealer's workshop staff", us: "An independent engineer you book" },
      { label: "Who it answers to", dealer: "The dealer", us: "You" },
      { label: "Paint", dealer: "Visual check", us: "Paint thickness gauge (Premium)" },
      { label: "Fault codes", dealer: "Varies by dealer", us: "OBD scan (Comprehensive and Premium)" },
      { label: "Evidence", dealer: "A signed checklist", us: "A photo report with readings that you keep" },
      { label: "When", dealer: "Before you arrive", us: "On delivery day, before you sign" },
    ],
    pillars: [
      {
        title: "On your side",
        body: "You book us and we report to you.",
        // TODO(client): confirm there are no dealer commissions or partnerships before claiming independence.
      },
      { title: "Certified engineers", body: "Inspections by trained, certified engineers." },
      { title: "Evidence first", body: "Every finding has a photo and a reading." },
      { title: "Quick", body: "Your report arrives soon after the inspection." },
    ],
    independenceConfirm: { confirm: true, source: "Client to confirm no dealer commissions" },
    certificationConfirm: todo("Who certifies the engineers"),
  },

  cities: {
    h2: "Where we inspect",
    body: "Based in Delhi NCR, with launches in Bengaluru and Ahmedabad. Our inspection reels come from Ludhiana to Hyderabad.",
    hubsLabel: "Live",
    inspectedLabel: "Also inspected in",
    ncrNote: "Delhi NCR includes Delhi, Faridabad, Ghaziabad, Gurugram, Noida and Sonipat.",
    ask: "Ask about your city on WhatsApp",
    confirm: { confirm: true, source: "Launch posts DWhTujDk3Gq and DWGlHtvCTl5; customer reels; otoxperts.com lists 32 cities" },
    hubs: [
      { name: "Delhi NCR", lat: 28.61, lon: 77.21, base: true, video: "Da-1zKDJNr4" },
      { name: "Bengaluru", lat: 12.97, lon: 77.59, video: "DWhTujDk3Gq" },
      { name: "Ahmedabad", lat: 23.02, lon: 72.57, video: "DWGlHtvCTl5" },
    ],
    inspected: [
      { name: "Ludhiana", lat: 30.9, lon: 75.85, video: "DXQ6GbAiXWL" },
      { name: "Narnaul", lat: 28.04, lon: 76.11, video: "De6NUB-JUU5" },
      { name: "Mathura", lat: 27.49, lon: 77.67, video: "Dd9FliKp0kX" },
      { name: "Agra", lat: 27.18, lon: 78.01, video: "DYmJHX-JgOZ" },
      { name: "Hardoi", lat: 27.4, lon: 80.13, video: "DXeYKG7Cazx" },
      { name: "Himmatnagar", lat: 23.6, lon: 72.97, video: "DddZMXzpCOV" },
      { name: "Indore", lat: 22.72, lon: 75.86, video: "DeeU_nJJVcM" },
      { name: "Surat", lat: 21.17, lon: 72.83, video: "Daz8TKupQfD" },
      { name: "Bhiwandi", lat: 19.3, lon: 73.06, video: "DddgNAcpIgi" },
      { name: "Hyderabad", lat: 17.39, lon: 78.49, video: "DXeacKviZfF" },
    ],
  },

  days: {
    h2: "10 days to car perfection",
    intro: "Our delivery-day series, one check a day.",
    linkLabel: "See the post",
    prev: "Previous day",
    next: "Next day",
    items: [
      { title: "What is PDI?", tip: "You've signed the papers. Hold the keys until the car passes.", url: post("DRzZMPkD5k-") },
      { title: "PDI means peace of mind", tip: "It's your last chance to raise a problem while the dealer still has the car.", url: post("DR2D7SOkZzm") },
      { title: "Protect your investment", tip: "Check paint, glass and trims panel by panel, in daylight.", url: post("DR4uRetGHd9") },
      { title: "The technology check", tip: "Test the touchscreen, phone pairing, cameras and sensors before you leave.", url: post("DR7SCOaj8Ge") },
      { title: "Under the hood", tip: "A new engine bay should be clean and dry. Check oil, coolant, brake fluid, belts and hoses.", url: post("DR93bhAj-MK") },
      { title: "Interior and comfort", tip: "Try every seat adjustment, the air conditioning and each switch.", url: post("DSAa7Hkjx8m") },
      { title: "Missing accessories", tip: "Match floor mats, tool kit, spare and manuals against your invoice.", url: post("DSFlrBjEeyb") },
      { title: "Your rights as a buyer", tip: "Ask to inspect the car before you accept it.", url: post("DSH9yRdj1Jn") },
      { title: "A smooth PDI, a smoother ride", tip: "Raise every issue before you sign.", url: post("DSKwokDj5zW") },
      { title: "The most important moment", tip: "Delivery day is when you have the most say. Use it.", url: post("DSNNVZ5D3et") },
    ],
  },

  proof: {
    h2: "Watch us at work",
    body: "OtoXperts is verified on Instagram. Inspections, finds and customers on delivery day.",
    follow: "Follow @otoxperts",
    reelsTitle: "Customers on camera",
    reels: [
      { label: "Narnaul", detail: "New car PDI", video: "De6NUB-JUU5" },
      { label: "Indore", detail: "Switched from another PDI company", video: "DeeU_nJJVcM" },
      { label: "Faridabad", detail: "New car PDI", video: "DeeAdEApSYx" },
      { label: "Ghaziabad", detail: "New car PDI", video: "DeZBxzXpaXo" },
      { label: "Himmatnagar", detail: "Tata Sierra", video: "DddZMXzpCOV" },
      { label: "Tata Nexon", detail: "Passed our PDI", video: "De1IN-mJXLX" },
    ],
    elsewhere: "Also on",
  },

  player: {
    close: "Close video",
    prev: "Previous video",
    next: "Next video",
    play: "Play video",
    /** Read out after a trigger's own text, e.g. "Narnaul, New car PDI, video, 0:42". */
    srKind: "video",
  },

  faq: {
    h2: "Questions before delivery day",
    pending: "Answer pending confirmation from OtoXperts.",
    items: [
      {
        q: "What is a PDI?",
        a: "A pre-delivery inspection is a full check of your new car before you accept it from the dealer: paint and body, engine bay, electrics, tyres, documents and accessories. Ours covers 300+ checkpoints.",
      },
      {
        q: "When should I book?",
        a: "As soon as the dealer gives you a delivery date. Inspect before you sign the delivery papers, and before final payment if you can.",
      },
      {
        q: "Can the dealer refuse an inspection?",
        a: todo("Client experience with dealers who refuse, the fallback, and legal review of buyer-rights wording"),
      },
      {
        q: "How long does the inspection take?",
        a: "About 30 to 45 minutes.",
        confirm: { source: "otoxperts.com FAQ" },
      },
      {
        q: "Do I need to be there?",
        a: "No. Your engineer shares the digital report with you after the inspection.",
      },
      {
        q: "What if you find a problem?",
        a: "You get a photo and a reading for every finding. We don't do repairs. You can ask the dealer to fix it before delivery, ask for a different car, or refuse the car.",
      },
      {
        q: "Do you inspect used cars?",
        a: "Yes. We check the engine, gearbox, accident repairs, odometer and service history before you pay.",
      },
      {
        q: "Which cities do you cover?",
        a: "We're based in Delhi NCR and live in Bengaluru and Ahmedabad. We've also inspected cars from Ludhiana to Hyderabad. Ask on WhatsApp about your city.",
        confirm: { source: "Launch posts and customer reels" },
      },
      {
        q: "What does it cost?",
        a: "Plans start at ₹999 for a new car PDI. See the plans above.",
        confirm: { source: "otoxperts.com pricing" },
      },
      {
        q: "How soon do I get the report?",
        a: "Within 30 minutes of the inspection, as a PDF with photos and remarks.",
        confirm: { source: "otoxperts.com FAQ; plan lists say same day or 2 hours" },
      },
      {
        q: "Can I reschedule?",
        a: "Yes, up to 24 hours before your slot.",
      },
    ] as { q: string; a: string | Todo; confirm?: { source: string } }[],
  },

  book: {
    h2: "Inspect before you accept.",
    sub: "Tell us about your car. We'll confirm a slot on WhatsApp.",
    fields: {
      name: "Your name",
      phone: "Phone number",
      city: "City",
      car: "Car model",
      date: "Delivery date",
    },
    cityOptions: ["Delhi NCR", "Bengaluru", "Ahmedabad", "Other"],
    cityPlaceholder: "Choose a city",
    carPlaceholder: "For example, Tata Nexon EV",
    submit: "Send on WhatsApp",
    privacy: "Nothing is stored on this site. Your details go straight into a WhatsApp message to OtoXperts.",
    errors: {
      name: "Enter your name.",
      phone: "Enter a 10-digit Indian mobile number.",
      city: "Choose a city.",
      car: "Enter your car model.",
      date: "Choose a delivery date from today onwards.",
    },
    opened: "WhatsApp opened in a new tab with your details.",
    or: "Or call",
    email: "Email",
    message: {
      intro: "Hi OtoXperts, I'd like to book a PDI.",
      name: "Name",
      phone: "Phone",
      city: "City",
      car: "Car",
      date: "Delivery date",
    },
  },

  footer: {
    contactTitle: "Contact",
    citiesTitle: "Cities",
    followTitle: "Follow",
    legalTitle: "Legal",
    privacy: "Privacy",
    terms: "Terms",
    whatsappLabel: "Chat with OtoXperts on WhatsApp",
  },
} as const;

export type Site = typeof site;
