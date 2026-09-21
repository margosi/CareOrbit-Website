/* Behavioral Risk page data. Extracted verbatim from
 * v2-maven/BehavioralSafety.dc.html renderVals() (lines 316-551).
 *
 * Unlike Cardiology and Orthopedics this page has no dead generic key set:
 * everything here is rendered. The audience toggle ("For employers" /
 * "For associations") swaps eight copy values and the first ledger row.
 */

export type PovBlock = {
  kicker: string;
  t: string;
  label: string;
  dot: string;
  items: string[];
};

export type PlainRow = {
  kicker: string;
  t: string;
  label: string;
  dot: string;
  plain: true;
  sub: string;
  items: { t: string; d: string }[];
};

export type SeqRow = {
  kicker: string;
  t: string;
  label: string;
  dot: string;
  seq: true;
  sub: string;
  items: {
    v: string;
    cBorder: string;
    cBg: string;
    cFg: string;
    cLine: string;
    line: boolean;
    t: string;
    tag: string;
    d: string;
  }[];
};

export type LedgerRow = PlainRow | SeqRow;

/** The three audiences an orbit serves. Legacy: pov. */
export const POV: PovBlock[] = [
  {
    kicker: "For the worker",
    t: "They know where to go",
    label: "#A8412F",
    dot: "#E3735C",
    items: [
      "Help without having to ask a supervisor, fill in a form, or be seen doing it",
      "Something to open at 11pm on the drive home, not only during business hours",
      "Written for the field, in their language, at a reading level that does not talk down",
      "Theirs to keep and to pass to a friend or family member who needs it",
    ],
  },
  {
    kicker: "For the people around them",
    t: "Fewer people frozen",
    label: "#2D5A87",
    dot: "#2D5A87",
    items: [
      "Confidence to say something instead of hoping someone else does",
      "A supervisor can act without being asked to play counselor",
      "Nothing added to anyone's day and no new reporting duty created",
      "The person at home gets the same guidance as the person on the crew",
    ],
  },
  {
    kicker: "For program leaders",
    t: "Reach you can report, not people you can watch",
    label: "#5B9BEA",
    dot: "#5B9BEA",
    items: [
      "Aggregate dashboards only: activations, return visits, and which topics get opened",
      "Resource click-throughs, so you can fix the benefits that go unused",
      "Trends by state, chapter, site, and trade, plus peer and family usage",
      "No employer surveillance and no individual-level monitoring, by design",
    ],
  },
];

/** Ledger rows 2-5. Row 1 is audience-dependent; see BEGIN_ROW. */
export const ROWS_TAIL: LedgerRow[] = [
  {
    kicker: "Two orbits, many versions",
    t: "One for the person struggling, one for the person helping",
    label: "#1F6B73",
    dot: "#4FB3BF",
    seq: true,
    sub: "Workers usually turn to a peer before a professional, so the peer gets a guide of their own. Management is never inside the worker's.",
    items: [
      {
        v: "01",
        cBorder: "rgba(79,179,191,.5)",
        cBg: "rgba(79,179,191,.1)",
        cFg: "#1F6B73",
        cLine: "rgba(79,179,191,.55)",
        line: true,
        t: "Worker Support Orbit",
        tag: "Theirs, not the employer's",
        d: "For workers and their families. Reassurance and normalization, signs to watch for in yourself, habits and coping tools, substance use and financial stress, expert and community resources, and one tap to a hotline or warm line.",
      },
      {
        v: "02",
        cBorder: "rgba(79,179,191,.5)",
        cBg: "rgba(79,179,191,.1)",
        cFg: "#1F6B73",
        cLine: "rgba(227,115,92,.45)",
        line: true,
        t: "Peer Support Orbit",
        tag: "For supervisors, peers, and family",
        d: "For anyone supporting someone else: recognizing warning signs, how to hold a difficult conversation, the do's and don'ts, when and how to escalate, links to formal training, and the ability to send a worker guide to the person they are worried about.",
      },
      {
        v: "03",
        cBorder: "rgba(227,115,92,.5)",
        cBg: "rgba(227,115,92,.1)",
        cFg: "#A8412F",
        cLine: "rgba(79,179,191,.55)",
        line: false,
        t: "Versioned to your population",
        tag: "Trade, state, chapter, partner",
        d: "Content versioned by trade, geography, and participating partner, including branded versions for a single company, union, or organization.",
      },
    ],
  },
  {
    kicker: "How it runs in the field",
    t: "Starts at the toolbox talk, keeps working after it",
    label: "#2D5A87",
    dot: "#5B9BEA",
    plain: true,
    sub: "Six steps, from the first handout to the numbers you report upward.",
    items: [
      {
        t: "Introduce.",
        d: "Safety leadership hands it out the way any other safety program starts: in person, on site.",
      },
      {
        t: "Reach.",
        d: "A QR code on a poker chip, a hard-hat decal, signage, machinery, or onboarding materials.",
      },
      {
        t: "Activate.",
        d: "The worker enters an email address and nothing else. An activation email opens their secure guide.",
      },
      {
        t: "Educate.",
        d: "Short, direct modules on the risks that actually take workers out, plus ongoing messages of encouragement.",
      },
      {
        t: "Connect.",
        d: "One tap to the crisis line, warm line, EAP, or community resource your organization stands behind.",
      },
      {
        t: "Measure.",
        d: "Activations, topics, and resource click-throughs reported de-identified for safety and HR review.",
      },
    ],
  },
  {
    kicker: "This is not an app",
    t: "Nothing to download, nothing to log into",
    label: "#2D5A87",
    dot: "#5B9BEA",
    plain: true,
    sub: "Workers distrust apps because of downloads, logins, and the fear that an employer is watching. All three are removed.",
    items: [
      {
        t: "No download, no app store.",
        d: "It opens in the browser the worker already has, on a phone, tablet, or desktop.",
      },
      {
        t: "No login, and management never sees it.",
        d: "No credentials, and nobody at the company or the association can see who activated a worker orbit or what they read.",
      },
      {
        t: "HIPAA compliant.",
        d: "The same security posture the platform runs inside large health systems.",
      },
      {
        t: "No new FTEs, live in a quarter.",
        d: "White-label in your voice, from kickoff to first crew.",
      },
    ],
  },
  {
    kicker: "How it gets smarter",
    t: "AI that learns what this workforce needs",
    label: "#2D5A87",
    dot: "#5B9BEA",
    plain: true,
    sub: "Always confidential, always de-identified, always worker-centered.",
    items: [
      {
        t: "Recommends what matters.",
        d: "Surfaces the most relevant content for the person reading it.",
      },
      {
        t: "Adapts the path.",
        d: "Learning routes change based on what a worker actually opens.",
      },
      {
        t: "Spots emerging trends.",
        d: "Stress, substance use, and financial strain, at the population level.",
      },
      {
        t: "Improves routing.",
        d: "Resource connections get better over time, informing statewide prevention.",
      },
    ],
  },
] as LedgerRow[];

/** Ledger row 1, swapped by the audience toggle. Legacy: beginRow. */
export const BEGIN_ROW: { employers: PlainRow; associations: PlainRow } = {
  employers: {
    kicker: "How to begin",
    t: "One site first, then wherever it earns its way",
    label: "#A8412F",
    dot: "#E3735C",
    plain: true,
    sub: "A pilot on one site or crew is enough to prove reach before anything scales.",
    items: [
      {
        t: "You bring three things.",
        d: "The support services you stand behind, the crews to reach, and a safety or HR lead who can approve content.",
      },
      {
        t: "We build and you approve.",
        d: "We propose the structure from your existing materials; nothing goes live until your lead signs off.",
      },
      {
        t: "First crew inside a quarter.",
        d: "From kickoff to workers holding it, with all launch and training materials provided.",
      },
      {
        t: "Scale on evidence, not faith.",
        d: "Aggregate reach from the first site decides whether the next site or region turns on.",
      },
    ],
  } as PlainRow,
  associations: {
    kicker: "How to begin",
    t: "One chapter first, then wherever it earns its way",
    label: "#A8412F",
    dot: "#E3735C",
    plain: true,
    sub: "A pilot with one chapter is enough to prove reach before it goes out to the full membership.",
    items: [
      {
        t: "You bring three things.",
        d: "The support services your organization stands behind, the chapter or member group to reach, and a program lead who can approve content.",
      },
      {
        t: "We build and you approve.",
        d: "We propose the structure from your existing safety materials; nothing goes live until your lead signs off.",
      },
      {
        t: "First chapter inside a quarter.",
        d: "From kickoff to member crews holding it, with all launch and training materials provided.",
      },
      {
        t: "Scale on evidence, not faith.",
        d: "Aggregate reach from the first chapter decides whether the next chapter or state turns on.",
      },
    ],
  } as PlainRow,
};

/** Federal exposure figures on the navy panel. Legacy: numbers. */
export const NUMBERS = [
  {
    v: "4×",
    t: "Higher than the national suicide rate",
    d: "53.2 suicides per 100,000 construction workers, against 17.3 per 100,000 across the general population.",
    src: "CDC, cited by CFMA",
  },
  {
    v: "56",
    t: "Per 100,000 male construction workers, 2021",
    d: "Against 32 per 100,000 among male workers across all industries. Construction ranked second only to mining and extraction.",
    src: "CDC, 2021, via Travelers",
  },
  {
    v: "162.6",
    t: "Overdose deaths per 100,000, construction and extraction",
    d: "The highest of any occupation group, against 42.1 per 100,000 across all paid civilian occupations.",
    src: "CDC MMWR QuickStats, 2020 data",
  },
  {
    v: "5×",
    t: "Suicide deaths versus all fatal work injuries",
    d: "More construction workers are lost to suicide than to every recorded on-the-job fatality combined.",
    src: "CDC, cited by CFMA and CIASP",
  },
];

/** Two modelled ROI headline figures. Legacy: roi. */
export const ROI = [
  {
    v: "$195K–$325K",
    t: "Retaining ten workers a year",
    d: "A two-point cut in a 30% turnover rate on 500 workers keeps ten skilled people. At a $65,000 wage, a conservative trade replacement cost of 30–50% returns $19.5K to $32.5K each.",
    src: "Replacement cost benchmarks: CII, SHRM, Gallup",
  },
  {
    v: "$260",
    t: "Cost of one missed day, per worker",
    d: "A $65,000 wage over roughly 250 working days. Multiply by the absence days your safety and HR leads already track, then by the share behavioral risk drives.",
    src: "Your absence data; wage-based day rate",
  },
];

/** Six places behavioral risk lands on the books. Legacy: impact. */
export const IMPACT = [
  {
    i: "01",
    t: "Workers' compensation",
    d: "Mental-health-linked injuries cost 2.3 times more and last twice as long.",
    src: "NCCI",
  },
  {
    i: "02",
    t: "Lost days of work",
    d: "Depression and distress drive roughly five missed workdays per worker each year.",
    src: "NIOSH",
  },
  {
    i: "03",
    t: "Insurance premiums",
    d: "Behavioral-health-related claims raise premiums an estimated 10–15%.",
    src: "Actuarial benchmarks",
  },
  {
    i: "04",
    t: "Turnover and retention",
    d: "Replacing a skilled tradesperson costs 20–40% of annual wages.",
    src: "CII",
  },
  {
    i: "05",
    t: "Productivity and job-site errors",
    d: "Stress and fatigue contribute to an estimated 70% of job-site mistakes.",
    src: "CPWR",
  },
  {
    i: "06",
    t: "Crisis response",
    d: "The one outcome with no cost to recover, only to absorb, and the one earliest awareness reaches first.",
    src: "CDC, CFMA",
  },
];

/** Copy that the audience toggle swaps. Legacy: the `emp ? ... : ...`
 * ternaries in renderVals(). */
export type Audience = "employers" | "associations";

export const AUD_COPY: Record<
  Audience,
  {
    audLine: string;
    finKicker: string;
    finHeadA: string;
    finHeadEm: string;
    finIntro: string;
    calcInvite: string;
    bring: string[];
    ctaLine: string;
  }
> = {
  employers: {
    audLine:
      "Issued by your own safety leadership to the crews you employ, alongside the toolbox talk and the benefits packet you already run.",
    finKicker: "The financial case",
    finHeadA: "What one retained worker is",
    finHeadEm: "already worth",
    finIntro:
      "A model, not a guarantee. Worked on a 500-worker contractor at a $65,000 average wage and 30% annual turnover. Swap in your own headcount, wage, turnover, and absence data and the arithmetic holds.",
    calcInvite:
      "Put your own headcount, wage, turnover, absence days, and claims spend in and the model totals all three lines.",
    bring: [
      "Headcount, average wage, and turnover for one site or crew",
      "Absence days and recordables your leads already track",
      "The crisis line, EAP, and clinical resources you want workers routed to",
    ],
    ctaLine:
      "No demo script, no obligation. Twenty minutes with your safety and benefits leads. We hear where behavioral risk is showing up, show you where an orbit would sit, and you decide whether it is worth a second conversation.",
  },
  associations: {
    audLine:
      "Issued through your chapters to the members and signatory contractors you represent, versioned by trade, state, and chapter, in your organization's voice.",
    finKicker: "The case you carry to members",
    finHeadA: "What it is worth to the contractors you",
    finHeadEm: "represent",
    finIntro:
      "A model, not a guarantee. Worked on a single 500-worker member contractor at a $65,000 average wage and 30% annual turnover, so a chapter can show a member what one site is worth before asking anyone to fund it.",
    calcInvite:
      "Run it for one member company. Put their headcount, wage, turnover, absence days, and claims spend in and the model totals all three lines.",
    bring: [
      "The chapter or member group you would start with, and its rough headcount",
      "The safety materials and trainings your organization already publishes",
      "The crisis line, member assistance, and community resources you want workers routed to",
    ],
    ctaLine:
      "No demo script, no obligation. Twenty minutes with your program and member services leads. We hear what your chapters are being asked for, show you where an orbit would sit, and you decide whether it is worth a second conversation.",
  },
};

/* ------------------------------------------------------- ROI calculator -- */

export type CalcKey =
  | "headcount"
  | "wage"
  | "turnover"
  | "turnCut"
  | "replCost"
  | "absDays"
  | "absShare"
  | "absCut"
  | "claims"
  | "claimsCut";

export type CalcState = Record<CalcKey, string>;

/** Prefilled defaults, and what "Load published figures" restores.
 * Legacy: state.calc and the `benchmarks` object (identical values). */
export const BENCHMARKS: CalcState = {
  headcount: "500",
  wage: "65000",
  turnover: "30",
  turnCut: "2",
  replCost: "30",
  absDays: "6",
  absShare: "20",
  absCut: "20",
  claims: "250000",
  claimsCut: "10",
};

export const EMPTY_CALC: CalcState = {
  headcount: "",
  wage: "",
  turnover: "",
  turnCut: "",
  replCost: "",
  absDays: "",
  absShare: "",
  absCut: "",
  claims: "",
  claimsCut: "",
};

export type CalcField = {
  k: CalcKey;
  label: string;
  ph: string;
  step: string;
  prefix: string;
  suffix: string;
  hint: string;
};

export const CALC_FIELDS: CalcField[] = [
  {
    k: "headcount",
    label: "Field workers in scope",
    ph: "e.g. 500",
    step: "10",
    prefix: "",
    suffix: "workers",
    hint: "The crews an orbit would be issued to",
  },
  {
    k: "wage",
    label: "Average annual wage",
    ph: "e.g. 65000",
    step: "1000",
    prefix: "$",
    suffix: "",
    hint: "Loaded wage for the same population",
  },
  {
    k: "turnover",
    label: "Current annual turnover rate",
    ph: "e.g. 30",
    step: "1",
    prefix: "",
    suffix: "%",
    hint: "Your own separations figure",
  },
  {
    k: "turnCut",
    label: "Turnover reduction",
    ph: "e.g. 2",
    step: "0.5",
    prefix: "",
    suffix: "points",
    hint: "Modeled assumption in percentage points. Set it to 0 to leave it out.",
  },
  {
    k: "replCost",
    label: "Replacement cost per worker",
    ph: "e.g. 30",
    step: "5",
    prefix: "",
    suffix: "% of wage",
    hint: "SHRM and Gallup put frontline replacement at 30–50%",
  },
  {
    k: "absDays",
    label: "Missed days per worker per year",
    ph: "e.g. 6",
    step: "0.5",
    prefix: "",
    suffix: "days",
    hint: "From what your safety and HR leads already track",
  },
  {
    k: "absShare",
    label: "Share your leads attribute to behavioral risk",
    ph: "e.g. 20",
    step: "1",
    prefix: "",
    suffix: "%",
    hint: "Your own judgment on the same population",
  },
  {
    k: "absCut",
    label: "Reduction in that share",
    ph: "e.g. 20",
    step: "1",
    prefix: "",
    suffix: "%",
    hint: "Modeled assumption. Set it to 0 to leave it out.",
  },
  {
    k: "claims",
    label: "Annual claims and plan spend tied to behavioral risk",
    ph: "e.g. 250000",
    step: "10000",
    prefix: "$",
    suffix: "",
    hint: "From your loss runs and health plan reporting",
  },
  {
    k: "claimsCut",
    label: "Avoided share of that spend",
    ph: "e.g. 10",
    step: "1",
    prefix: "",
    suffix: "%",
    hint: "Modeled assumption. Set it to 0 to leave it out.",
  },
];

/** $1.23M above a million, otherwise $123K. Legacy: money(). */
export function money(n: number): string {
  if (!n) return "$0";
  return n >= 1000000
    ? "$" + (n / 1000000).toFixed(2).replace(/\.00$/, "") + "M"
    : "$" + Math.round(n / 1000).toLocaleString() + "K";
}

/** Legacy: dollars(). */
export function dollars(n: number): string {
  return "$" + Math.round(n || 0).toLocaleString();
}

/** The whole model, verbatim arithmetic from renderVals(). */
export function computeRoi(c: CalcState) {
  const num = (k: CalcKey) => (isNaN(parseFloat(c[k])) ? 0 : parseFloat(c[k]));

  const retained = (num("headcount") * num("turnCut")) / 100;
  const retentionSavings = (retained * num("wage") * num("replCost")) / 100;
  /* 250 working days a year. */
  const dayRate = num("wage") ? num("wage") / 250 : 0;
  const behavioralDays =
    (num("headcount") * num("absDays") * num("absShare")) / 100;
  const daysAvoided = (behavioralDays * num("absCut")) / 100;
  const absenceSavings = daysAvoided * dayRate;
  const claimsSavings = (num("claims") * num("claimsCut")) / 100;
  const groupTotal = retentionSavings + absenceSavings + claimsSavings;

  const results = [
    {
      raw: retentionSavings,
      v: money(retentionSavings),
      t: "Retention value",
      d:
        Math.round(retained).toLocaleString() +
        " skilled workers kept a year at the replacement cost you entered.",
    },
    {
      raw: absenceSavings,
      v: money(absenceSavings),
      t: "Absence recovered",
      d:
        Math.round(daysAvoided).toLocaleString() +
        " missed days back at " +
        dollars(dayRate) +
        " a day.",
    },
    {
      raw: claimsSavings,
      v: money(claimsSavings),
      t: "Claims and premium exposure",
      d: "The avoided share of the claims and plan spend you entered.",
    },
  ];

  return { num, groupTotal, results };
}
