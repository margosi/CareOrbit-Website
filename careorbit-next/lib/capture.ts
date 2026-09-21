/* Capture page content, ported verbatim from CapturePage.dc.html
 * renderVals(). Copy is brief-locked.
 *
 * DEAD CODE NOT PORTED: `benefits` (5 strings) is computed but referenced
 * nowhere in the markup.
 */

export const STEPS = [
  {
    n: "01",
    t: "Intake",
    kicker: "Step 01",
    label: "#A8412F",
    dot: "#E3735C",
    items: [
      "We take in what you already have: documents, handouts, protocols, video, and program material, in whatever format it lives in today.",
      "Capture is used to help gather and input the orbit content.",
    ],
  },
  {
    n: "02",
    t: "Organize",
    kicker: "Step 02",
    label: "#2D5A87",
    dot: "#5B9BEA",
    items: [
      "Content is structured, versioned, and tagged so the right material is tied to the right journey, service line, and moment.",
      "One canonical version, updated once and reflected everywhere it is used.",
    ],
  },
  {
    n: "03",
    t: "Distribute",
    kicker: "Step 03",
    label: "#1F6B73",
    dot: "#4FB3BF",
    items: [
      "Delivered digitally across the channels people already use: orbits, QR codes, text, and email, on any device.",
      "Reachable without a portal login, so material actually arrives at the moment of need.",
    ],
  },
  {
    n: "04",
    t: "Measure",
    kicker: "Step 04",
    label: "#B05A46",
    dot: "#F2B8C6",
    items: [
      "Views, completion, and engagement reported back by audience and content item.",
      "So you can retire what is not working and invest in what is.",
    ],
  },
  {
    n: "05",
    t: "Repeat",
    kicker: "Step 05",
    label: "#1A6B3C",
    dot: "#4FB3BF",
    items: [
      "The extended subscription keeps converting your next most valuable content, quarter after quarter.",
      "More of what your teams rely on becomes organized, deployable, trackable, HIPAA compliant material.",
    ],
  },
  {
    n: "06",
    t: "Expert guidance, end to end",
    kicker: "Included",
    label: "#B05A46",
    dot: "#E3735C",
    items: [
      "Our team maps what to convert first, how to structure it, and how it compounds toward results.",
      "Strategic rather than binder by binder, so the work builds toward outcomes instead of a pile of digitized files.",
    ],
  },
];

export const PROBLEMS = [
  {
    i: "01",
    t: "Trapped in formats",
    d: "PDFs, print binders, slide decks, and video files nobody can reach from a phone.",
  },
  {
    i: "02",
    t: "No single source of truth",
    d: "Three versions of the same instruction sheet, each slightly different.",
  },
  {
    i: "03",
    t: "Undeliverable at the moment of need",
    d: "Good material that never reaches the patient after they leave the building.",
  },
  {
    i: "04",
    t: "Invisible usage",
    d: "No way to know what was opened, understood, or ignored.",
  },
];

export const MEASURES = [
  { t: "Views", d: "What was opened, by audience." },
  { t: "Completion", d: "What was finished, not just sent." },
  { t: "Engagement", d: "What worked, and what to retire." },
  { t: "One version", d: "Updated once, reflected everywhere." },
];

export const TOOL_SERVICE = [
  {
    kicker: "The digital tool",
    t: "What the system gives you",
    label: "#2D5A87",
    dot: "#5B9BEA",
    d: "One canonical library of your patient material: organized, deployable, trackable, and HIPAA compliant.",
    items: [
      {
        t: "Organized.",
        d: "Structured, versioned, and tagged to the right journey, service line, and moment.",
      },
      {
        t: "Deployable.",
        d: "Delivered through orbits, QR codes, text, and email, reachable without a portal login.",
      },
      {
        t: "Trackable.",
        d: "Views, completion, and engagement, reported by audience and content item.",
      },
      {
        t: "HIPAA compliant.",
        d: "HIPAA, SOC 2, and HITRUST documentation ready for review.",
      },
      {
        t: "In your brand.",
        d: "Your clinical voice on every page, instead of an internet search.",
      },
      {
        t: "One canonical version.",
        d: "Updated once and reflected everywhere it is used.",
      },
    ],
  },
  {
    kicker: "The professional service",
    t: "What our team does for you",
    label: "#A8412F",
    dot: "#E3735C",
    d: "Strategic rather than binder by binder, so the work compounds toward results instead of a pile of digitized files.",
    items: [
      {
        t: "We guide the intake.",
        d: "What to convert first, and in what order, mapped to the results you need.",
      },
      {
        t: "We do the conversion.",
        d: "Documents, handouts, protocols, and video, in whatever format they live in today. No rewriting up front.",
      },
      {
        t: "We structure it.",
        d: "Mapped to care journeys and orbits, so the work compounds toward outcomes.",
      },
      {
        t: "We maintain it.",
        d: "When your material changes, the library changes with it. Nothing added to your staff's day.",
      },
    ],
  },
];

export const BRING = [
  {
    n: "01",
    t: "One binder or drive",
    d: "One packet, binder, or shared drive of the material your teams actually use today.",
  },
  {
    n: "02",
    t: "The approver",
    d: "Who reviews and approves that material when it changes.",
  },
  {
    n: "03",
    t: "Today's route",
    d: "Where patients get it now: discharge folder, portal, front desk, or memory.",
  },
  {
    n: "04",
    t: "Your brand",
    d: "Your clinical voice, instead of an internet search.",
  },
];

export const FAQS = [
  {
    q: "Does my staff have to do the conversion?",
    a: "No. That is the service: our team converts, structures, and maintains it. Your team reviews and approves.",
  },
  {
    q: "What does I.T. have to do?",
    a: "As little as a scheduled flat file, or nothing at all. HIPAA, SOC 2, and HITRUST documentation is ready for review.",
  },
  {
    q: "What happens after our orbits launch?",
    a: "Capture is built into every orbit. An extended subscription keeps the tool and the service converting your next most valuable content.",
  },
  {
    q: "How fast will we know if it works?",
    a: "The first converted material is live in weeks, and usage reporting starts with the first patient.",
  },
];
