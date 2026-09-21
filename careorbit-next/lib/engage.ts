import type { LedgerBlock } from "@/components/product/Ledger";

/* Engage page content, ported verbatim from EngagePage.dc.html renderVals().
 * Copy is brief-locked.
 *
 * DEAD CODE NOT PORTED: the original also returned `bring: []` (an empty
 * array referenced nowhere).
 */

export const MODES: LedgerBlock[] = [
  {
    kicker: "For the patient",
    t: "The right guidance at the right moment",
    label: "#A8412F",
    dot: "#E3735C",
    sub: "Built from your existing content and expertise.",
    items: [
      {
        t: "Opens anywhere, on any device.",
        d: "No new downloads or complicated onboarding. Patients open their orbit from email, text, or a QR code.",
      },
      {
        t: "Active, engaging pages,",
        d: "sequenced to the clinical pathway and overall patient experience, not a static library of PDFs and webpages.",
      },
      {
        t: "Education, reminders, and next steps",
        d: "arriving step by step from diagnosis through recovery, at the moments they matter.",
      },
    ],
  },
  {
    kicker: "For the family",
    t: "A whole circle of information and support",
    label: "#1F6B73",
    dot: "#4FB3BF",
    sub: "Always there, always relevant, always welcomed.",
    items: [
      {
        t: "A caregiver version travels alongside the patient's,",
        d: "so families see the same plan and carry the same expectations.",
      },
      {
        t: "White-labeled in your brand and voice,",
        d: "as if you built it yourself.",
      },
      {
        t: "Adds to what you already send.",
        d: "The orbit works alongside the discharge folder and the follow-up call, never in place of them.",
      },
    ],
  },
  {
    kicker: "For the care team",
    t: "You see who needs a nudge",
    label: "#2D5A87",
    dot: "#5B9BEA",
    sub: "Engagement is tracked at every step, so staff time goes to the patients who are drifting.",
    items: [
      {
        t: "Who opened their orbit and who never did,",
        d: "by patient, on the care team dashboard.",
      },
      {
        t: "Patients not engaging with their care material flagged,",
        d: "before it becomes a poor outcome.",
      },
      {
        t: "Engagement and completion rollups",
        d: "by service line and by site, exportable for your committee or quality program.",
      },
    ],
  },
];

export const MENTOR: LedgerBlock[] = [
  {
    kicker: "Delivered through an orbit",
    t: "What surrounds the patient",
    cols: "1fr 1fr",
    sub: "A guide that opens in the patient's own browser and evolves as the journey advances.",
    items: [
      {
        t: "It knows where the patient is.",
        d: "What comes next, and what they have and have not done.",
      },
      {
        t: "Support when it matters.",
        d: "Preparation before each milestone, warning signs to watch for, and who to call when something feels wrong.",
      },
      {
        t: "It evolves with the journey.",
        d: "The same orbit advances through the journey's phases on its own, so the patient never starts over.",
      },
      {
        t: "One trusted place.",
        d: "Everything the journey asks for lives in the orbit, instead of scattered across portals, papers, and search results.",
      },
    ],
  },
  {
    kicker: "Beyond the orbit",
    t: "Engagement that reaches out",
    cols: "1fr 1fr",
    sub: "The orbit is the destination. A layer of outbound engagement complements it and pulls each patient back at the right moments.",
    items: [
      {
        t: "Email and text.",
        d: "Scheduled outreach and reminders that arrive on the channel each patient actually answers.",
      },
      {
        t: "Videos and messages.",
        d: "Short, timely pieces from your team that motivate the next step, not another portal notification.",
      },
      {
        t: "Nudges that adapt.",
        d: "Timing, channel, and frequency adjust to how each patient responds.",
      },
      {
        t: "Always back to the orbit.",
        d: "Every touch leads to the guide, so the patient always lands in one trusted place.",
      },
    ],
  },
  {
    kicker: "The Patient Engagement Index",
    t: "Every action, and every inaction, counts",
    cols: "1fr",
    sub: "Every patient carries an Engagement Index Score your team can act on.",
    items: [
      {
        t: "Every action, and every inaction, is tracked.",
        d: "Pages opened, videos watched, check-ins answered, reminders ignored: all of it feeds the proprietary Patient Engagement Index.",
      },
      {
        t: "It shows who is on course and who is drifting.",
        d: "Your team sees a score per patient, routed by role and urgency, while there is still time to act.",
      },
      {
        t: "It adjusts the experience automatically.",
        d: "Content, channel, and cadence adapt to each patient's score, so the orbit works harder for the patients who need it most.",
      },
    ],
  },
];

export const LAUNCH: LedgerBlock[] = [
  {
    kicker: "What happens next",
    t: "Three steps from kickoff to live",
    cols: "1fr",
    label: "#A8412F",
    dot: "#E3735C",
    sub: "A launch measured in weeks, with the numbers agreed up front.",
    items: [
      {
        n: "01",
        t: "Pick the journey that is costing you.",
        d: "The pathway, the content it draws from, the destination for results, and the two or three numbers this has to move.",
      },
      {
        n: "02",
        t: "We build it from your material.",
        d: "We develop the orbit from your protocols and education for your team's review and approval. Nobody on your staff writes content.",
      },
      {
        n: "03",
        t: "We measure against your baseline.",
        d: "Live in about 90 days. Engagement, completion, and the operational numbers you named, against your baseline, inside a quarter.",
      },
    ],
  },
  {
    kicker: "Zero disruption",
    t: "Built to slot in, not bolt on",
    cols: "1fr 1fr",
    label: "#A8412F",
    dot: "#E3735C",
    sub: "Nothing added to anyone's day, and everything visible.",
    items: [
      {
        plain: true,
        t: "No new FTEs.",
        d: "It runs without adding headcount.",
      },
      { plain: true, t: "White-label.", d: "Your brand, your voice." },
      {
        plain: true,
        t: "Live in a quarter.",
        d: "From kickoff to first patient.",
      },
      {
        plain: true,
        t: "HIPAA, SOC 2, HITRUST.",
        d: "Documentation ready for review.",
      },
      {
        plain: true,
        t: "No risk, no lock-in.",
        d: "And no disruption to your offices.",
      },
      {
        plain: true,
        t: "EHR-friendly.",
        d: "A scheduled flat file, or nothing at all.",
      },
    ],
  },
  {
    kicker: "Common questions",
    t: "What your team might ask",
    cols: "1fr",
    label: "#A8412F",
    dot: "#E3735C",
    sub: "The questions that come up in the first call, answered plainly.",
    items: [
      {
        plain: true,
        t: "Does my staff have to write the content?",
        d: "No. We develop it from your protocols and materials, and we maintain it. Your team reviews and approves.",
      },
      {
        plain: true,
        t: "What does IT have to do?",
        d: "As little as a scheduled flat file, or nothing at all.",
      },
      {
        plain: true,
        t: "Will patients actually use it?",
        d: "It opens in the browser with no app or login, and outreach adapts to each patient.",
      },
      {
        plain: true,
        t: "How fast will we know if it works?",
        d: "The numbers are agreed in week one and reported after the first cohort, so the answer arrives in months, not years.",
      },
    ],
  },
];

export const REACH = [
  {
    n: "01",
    t: "Ordered from the EHR",
    d: "Staff place an order for an orbit like any other order. The patient receives their journey by email; the care team sees activation, engagement, and assessment results come back on their dashboard.",
  },
  {
    n: "02",
    t: "Issued from a patient list",
    d: "A provided list issues orbits in bulk, with activation tracked per patient from the moment invitations go out.",
  },
  {
    n: "03",
    t: "QR code or text message",
    d: "A front desk poster, a discharge packet insert, or a text gets a patient into their orbit in one step.",
  },
  {
    n: "04",
    t: "On-site registration",
    d: "Staff enroll a patient in the room in under a minute, with no portal account required.",
  },
  {
    n: "05",
    t: "Nightly flat file transfer",
    d: "A scheduled flat file from your system issues orbits automatically each night, with no manual step and no interface project required.",
  },
];

/* Same Siteman trial figures used on Home and Platform. */
export const TRIAL_STATS = [
  {
    v: "+65%",
    l: "Understanding",
    d: "Better understanding of the plan of care.",
  },
  {
    v: "−53%",
    l: "Inbound calls",
    d: "Fewer calls to the nursing line with questions the orbit answered first.",
  },
  {
    v: "−41%",
    l: "Readmissions",
    d: "Fewer readmissions among patients carrying an orbit.",
  },
  { v: "+22%", l: "Satisfaction", d: "Higher patient satisfaction scores." },
];
