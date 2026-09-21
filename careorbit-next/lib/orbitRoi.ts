/* The three-lever ROI model shared by four orbit pages: Women's Health,
 * Behavioral Health, Medication Therapy and Surgical Support.
 *
 * All four declare byte-identical arithmetic in renderVals() over the same
 * eleven inputs - only the defaults, the field labels and the result labels
 * differ. The model is lifted here once; the labels stay with each page.
 *
 *   utilisation   volume x rate x reduction x unit cost
 *   calls         volume x calls x reduction x minutes/60 x hourly rate
 *   missed visits volume x no-show rate x reduction x revenue per visit
 *
 * Behavioral Risk is NOT one of these: its model is retention / absence /
 * claims and lives in lib/behavioralSafety.ts.
 */

export type OrbitCalcKey =
  | "volume"
  | "utilRate"
  | "utilCut"
  | "utilCost"
  | "calls"
  | "callCut"
  | "minutes"
  | "staffRate"
  | "noShow"
  | "noShowCut"
  | "revPer";

export type OrbitCalcState = Record<OrbitCalcKey, string>;

/** Percentage inputs, clamped to 100 by every page that uses this model. */
export const ORBIT_PCT_KEYS: OrbitCalcKey[] = [
  "utilRate",
  "utilCut",
  "callCut",
  "noShow",
  "noShowCut",
];

export const EMPTY_ORBIT_CALC: OrbitCalcState = {
  volume: "",
  utilRate: "",
  utilCut: "",
  utilCost: "",
  calls: "",
  callCut: "",
  minutes: "",
  staffRate: "",
  noShow: "",
  noShowCut: "",
  revPer: "",
};

/** The per-page half of each result line. */
export type RoiLabels = {
  utilTitle: string;
  /** Follows the event count, e.g. "events a year prevented at ...". */
  utilTail: string;
  callTitle: string;
  /** Follows the hour count, e.g. "hours a year back to patient care ...". */
  callTail: string;
  visitTitle: string;
  /** Follows the visit count, e.g. "visits a year kept instead of missed." */
  visitTail: string;
};

export function computeOrbitRoi(v: OrbitCalcState, labels: RoiLabels) {
  const num = (k: OrbitCalcKey) =>
    isNaN(parseFloat(v[k])) ? 0 : parseFloat(v[k]);

  const utilEvents = (num("volume") * num("utilRate")) / 100;
  const utilAvoided = (utilEvents * num("utilCut")) / 100;
  const utilSavings = utilAvoided * num("utilCost");

  const callsAvoided = (num("volume") * num("calls") * num("callCut")) / 100;
  const hoursReturned = (callsAvoided * num("minutes")) / 60;
  const callSavings = hoursReturned * num("staffRate");

  const missedTotal = (num("volume") * num("noShow")) / 100;
  const missedRecovered = (missedTotal * num("noShowCut")) / 100;
  const missedSavings = missedRecovered * num("revPer");

  const groupTotal = utilSavings + callSavings + missedSavings;

  const results = [
    {
      raw: utilSavings,
      t: labels.utilTitle,
      d: Math.round(utilAvoided).toLocaleString() + " " + labels.utilTail,
    },
    {
      raw: callSavings,
      t: labels.callTitle,
      d: Math.round(hoursReturned).toLocaleString() + " " + labels.callTail,
    },
    {
      raw: missedSavings,
      t: labels.visitTitle,
      d: Math.round(missedRecovered).toLocaleString() + " " + labels.visitTail,
    },
  ];

  return { num, groupTotal, results };
}

/** Shared negative/percentage clamping, as every page's setCalc did. */
export function clampOrbitInput(k: string, raw: string): string {
  let v = raw;
  if (v !== "" && parseFloat(v) < 0) v = "0";
  if (
    v !== "" &&
    ORBIT_PCT_KEYS.indexOf(k as OrbitCalcKey) > -1 &&
    parseFloat(v) > 100
  ) {
    v = "100";
  }
  return v;
}
