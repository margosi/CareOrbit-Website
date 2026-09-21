import type { LedgerBlock } from "@/components/product/Ledger";

/* Assess page content, ported verbatim from AssessPage.dc.html renderVals().
 * Copy is brief-locked. Stat sources are preserved exactly - CLAUDE.md
 * requires only real, sourced numbers.
 *
 * DEAD CODE NOT PORTED: `bring` (3 entries) is computed but referenced
 * nowhere in the markup, same as EngagePage's empty `bring`.
 */

export const MODES: LedgerBlock[] = [
  {
    kicker: "Inside any orbit",
    t: "Light assessments, woven into the guidance",
    label: "#A8412F",
    dot: "#E3735C",
    sub: "Check-ins arrive as part of the orbit a patient is already following, with no separate ask.",
    items: [
      {
        t: "Symptom and progress check-ins",
        d: "scheduled to the clinical pathway: after discharge, before a follow-up, at the moments your team wants eyes on.",
      },
      {
        t: "No new app or login.",
        d: "Patients answer from the same guide they already open by text or email.",
      },
      {
        t: "Responses return to the care team dashboard",
        d: "and flag who needs a call before the next visit does.",
      },
    ],
  },
  {
    kicker: "Standalone",
    t: "Formalized eScreening, no orbit required",
    label: "#1F6B73",
    dot: "#4FB3BF",
    sub: "A proven approach, currently deployed across VA medical centers nationwide.",
    items: [
      {
        t: "Validated screening instruments",
        d: "run on schedule and issued the same easy ways: an order, a patient list, a QR code, or a text.",
      },
      {
        t: "Structured results into your workflow,",
        d: "supporting the CPT-coded screening services your clinicians already perform and document.",
      },
      {
        t: "Rising risk surfaced early,",
        d: "with scores routed by role and urgency instead of waiting in a portal inbox.",
      },
    ],
  },
  {
    kicker: "Reporting programs",
    t: "PROMs collection that meets the mandate",
    label: "#2D5A87",
    dot: "#5B9BEA",
    sub: "Built for the pre-op and post-op survey windows that reporting programs actually enforce.",
    items: [
      {
        t: "Validated PROMs on the required schedule,",
        d: "including the long post-op windows when patients are home and hardest to reach.",
      },
      {
        t: "Completion rates that survive the gap.",
        d: "Reminders ride the same channel patients already respond to, protecting the capture rates your reporting depends on.",
      },
      {
        t: "Ortho today, more service lines next.",
        d: "CMS has finalized expansion of PROMs reporting beyond inpatient hip and knee, and Assess is built to follow it.",
      },
    ],
  },
];

export const MANDATE_STATS = [
  {
    v: "Jul 2024",
    l: "Collection began",
    d: "Pre-operative PROMs capture required for elective hip and knee replacement performed from July 1, 2024.",
    src: "CMS IQR / AAOS",
  },
  {
    v: "50%",
    l: "Required capture",
    d: "Minimum share of eligible patients with complete pre- and post-op surveys and risk variables.",
    src: "CMS IQR / AAOS",
  },
  {
    v: "FY 2028",
    l: "Payment at risk",
    d: "Hospitals that miss reporting requirements face an annual payment reduction.",
    src: "J. Arthroplasty, 2024",
  },
  {
    v: "2027",
    l: "Expansion arrives",
    d: "Mandatory reporting extends to outpatient and ambulatory surgical settings after a voluntary phase.",
    src: "J. Arthroplasty, 2025",
  },
];

export const VA_STATS = [
  {
    v: "19+",
    l: "VA medical centers",
    d: "Adopted the eScreening program by 2022, with 18 more adoptions then in progress.",
    src: "VA Diffusion of Excellence",
  },
  {
    v: "1,372",
    l: "Veterans studied",
    d: "Published two-cohort study comparing electronic screening with paper screening.",
    src: "Pittman et al., 2017",
  },
  {
    v: "Higher",
    l: "Completion and access",
    d: "eScreening beat paper on accessibility, completion rate, and clinical processes.",
    src: "Pittman et al., 2017",
  },
  {
    v: "Faster",
    l: "Connection to care",
    d: "Quicker vesting into the health system and faster documentation of required suicide risk assessments.",
    src: "Pittman et al., 2017",
  },
];

export const PAY_QUAD = [
  {
    t: "Billable screening support",
    d: "Delivery and documentation behind CPT-coded services, such as 96127, 96160 and 96161, and G0444.",
  },
  {
    t: "Capture rates that hold",
    d: "Reminders patients answer, so scheduled screenings are completed and billable, not missed.",
  },
  {
    t: "Grant initiatives",
    d: "Scheduled instruments and structured exports support grant-funded programs and community studies.",
  },
  {
    t: "Value-based reporting",
    d: "PROMs and screening results, structured for CMS, MIPS, and payer programs.",
  },
];

export const INSIDE: LedgerBlock[] = [
  {
    kicker: "What you get",
    t: "Pre-built, flexible, and never a dead end",
    cols: "1fr 1fr",
    sub: "Ready to run on day one, and built to your protocol when day one is not enough.",
    items: [
      {
        t: "Pre-built assessments.",
        d: "Ready-made packages for major requirements: CMS PROMs windows, behavioral screening, and annual screenings.",
      },
      {
        t: "Build and deploy your own.",
        d: "A flexible builder for research and study support, patient information, satisfaction, and even marketing.",
      },
      {
        t: "Paired with Engage.",
        d: "Complimentary CareOrbit Engage journeys support patients around each assessment, with preparation, reminders, and education that lift completion and results.",
      },
      {
        t: "Results that go somewhere.",
        d: "Scores routed by role and urgency, and structured results into your EHR, registry file, or team workflow.",
      },
    ],
  },
  {
    kicker: "Where teams start",
    t: "Four proven starting points",
    cols: "1fr 1fr",
    sub: "The screening or PROMs requirement you are on the hook for, and who reports it today.",
    items: [
      {
        t: "Ortho PROMs.",
        d: "The CMS hip and knee windows, pre-op and long post-op.",
      },
      {
        t: "Behavioral screening.",
        d: "PHQ-9, GAD-7, and the instruments your program runs.",
      },
      {
        t: "In-orbit check-ins.",
        d: "Light assessments woven into any journey.",
      },
      {
        t: "Standalone eScreening.",
        d: "No orbit required: an order, a list, a QR code, or a text.",
      },
    ],
  },
  {
    kicker: "Instrument support",
    t: "Validated instruments, on schedule",
    cols: "1fr 1fr",
    sub: "Standard instruments configured to your protocol, with scoring and thresholds your team sets.",
    items: [
      { t: "PHQ-9 and PHQ-2", d: "depression" },
      { t: "GAD-7", d: "anxiety" },
      { t: "HOOS JR and KOOS JR", d: "hip and knee PROMs" },
      { t: "PROMIS Global-10", d: "global health" },
      { t: "C-SSRS", d: "suicide risk screening" },
      { t: "AUDIT-C", d: "alcohol use" },
      { t: "PC-PTSD-5", d: "trauma screening" },
      { t: "GAIN", d: "substance use and behavioral health" },
      { t: "Custom check-ins", d: "your protocol's questions" },
      { t: "Custom instruments", d: "built to your study or program" },
    ],
  },
];

export const LAUNCH: LedgerBlock[] = [
  {
    kicker: "Zero disruption",
    t: "Nothing added to anyone's day",
    cols: "1fr 1fr",
    label: "#A8412F",
    dot: "#E3735C",
    sub: "Issued from the workflow you already run: an order, a patient list, a QR code, or a text.",
    items: [
      { plain: true, t: "No new FTEs.", d: "Nothing added to anyone's day." },
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
    kicker: "What happens next",
    t: "Three steps from kickoff to live",
    cols: "1fr",
    label: "#A8412F",
    dot: "#E3735C",
    sub: "A launch measured in weeks, with the numbers agreed up front.",
    items: [
      {
        n: "01",
        t: "Pick the requirement, week one.",
        d: "The screening or PROMs mandate you are on the hook for. We agree on the two or three numbers this has to move.",
      },
      {
        n: "02",
        t: "We build it, weeks two through six.",
        d: "Your instruments, your schedule, your brand and thresholds. We build it for your team's review.",
      },
      {
        n: "03",
        t: "We measure against your baseline.",
        d: "The first cohort reports capture rates against your baseline inside a quarter.",
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
        t: "Does my staff have to chase surveys?",
        d: "No. Scheduling, reminders, and escalation run automatically. Your team sees scores and acts on the ones that need attention.",
      },
      {
        plain: true,
        t: "What does IT have to do?",
        d: "As little as a scheduled flat file, or nothing at all. HIPAA, SOC 2, and HITRUST documentation is ready for review.",
      },
      {
        plain: true,
        t: "Can we bill for this?",
        d: "Assess supports the delivery and documentation behind CPT-coded screening services. Eligibility depends on payer policy.",
      },
      {
        plain: true,
        t: "How fast will we know if it works?",
        d: "90 days to launch, and the first cohort reports capture rates against your baseline inside a quarter.",
      },
    ],
  },
];
