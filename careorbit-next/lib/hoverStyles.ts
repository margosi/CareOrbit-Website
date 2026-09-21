/* Replacement for v2-maven's `style-hover` attribute.
 *
 * HOW THE ORIGINAL WORKED
 * support.js (src/pseudo.ts, createPseudoSheet) compiled every style-hover
 * attribute into a real CSS rule: it minted a class, inserted
 * `.scpN:hover{ ... }` into a stylesheet, and appended `!important` to every
 * declaration via importantify(). The !important is load-bearing - base
 * styles are inline, and an inline style beats a class selector, so without
 * it no hover rule would ever win.
 *
 * WHAT WE DO INSTEAD
 * The same thing, resolved at build time rather than runtime. This file is
 * the single source of truth; `npm run gen:hover` regenerates app/hover.css
 * from it with !important applied. Zero runtime, real CSS :hover, so touch
 * and keyboard semantics are exactly as they are today.
 *
 * Add an entry here, run the generator, use hv("name") for the className.
 * Never hand-edit app/hover.css.
 */

export const HOVER_STYLES = {
  /* Coral text on hover. Announcement bar link and its dismiss button. */
  coral: "color:#E3735C",

  /* Primary nav links: darken and grow a coral underline. */
  navLink: "color:#0F1D2E;border-bottom:2px solid #E3735C",

  /* Dropdown rows in the Orbit Solutions / Pricing menus. */
  menuItem: "background:#FAF8F4",

  /* Mobile drawer rows: same tint, but colour is restated because the
   * drawer rows declare their own colour inline. */
  menuItemDark: "background:#FAF8F4;color:#0F1D2E",

  /* Navy "Book a Call" pill in the desktop nav - lifts on hover. */
  ctaLift: "background:#E3735C;color:#FFFFFF;transform:translateY(-1px)",

  /* Same pill in the mobile bar and drawer - no lift. */
  ctaFlat: "background:#E3735C;color:#FFFFFF",

  /* Footer links and contact details brighten to white. */
  footerLink: "color:#FFFFFF",

  /* --- Home ------------------------------------------------------------ */

  /* Blush hero CTA turns white and lifts. */
  heroCta: "background:#FFFFFF;color:#0F1D2E;transform:translateY(-2px)",

  /* Outlined "See how it works" button fills faintly. */
  heroGhost: "background:rgba(255,255,255,.14);color:#FFFFFF",

  /* The three shortcut buttons inside the hero chat box. */
  chatLink: "background:#DCE8F3;color:#1E3A5F",

  /* Chat submit arrow inverts. */
  chatGo: "background:#0F1D2E;color:#FFFFFF",

  /* "Learn more" pills on the orbit tiles and explore cards. */
  tileLearnMore: "background:#2D5A87;color:#FFFFFF",

  /* Cost-moment cards lift on hover. */
  costCard:
    "transform:translateY(-6px);box-shadow:0 22px 48px rgba(15,29,46,.1)",

  /* Case-study read-more link. */
  caseLink: "color:#E3735C",

  /* White CTA pill in the closing panel turns coral and lifts. */
  ctaWhite: "background:#E3735C;color:#FFFFFF;transform:translateY(-2px)",

  /* Carousel prev/next buttons. */
  carouselNav: "background:rgba(255,255,255,.28)",

  /* --- Platform --------------------------------------------------------- */

  /* Navy pill CTA in the Platform hero and section headers. */
  navyPill: "background:#E3735C;color:#FFFFFF",

  /* Underlined "Learn more" / inline links on the light sections. */
  linkCoral: "color:#E3735C",

  /* Feature tab labels darken on hover. */
  featTab: "color:#0F1D2E",

  /* Navy square carousel buttons (component carousel). */
  navNavy: "background:#0F1D2E",

  /* White square carousel buttons (quotes, on the photo panel). */
  navWhite: "background:#F2B8C6",

  /* Ghost button on the navy CTA panel. */
  ghostBlush: "border-color:#F2B8C6;color:#F2B8C6",

  /* White-on-photo link in the experiences header. */
  linkBlush: "color:#F2B8C6",

  /* --- Product pages (Engage / Assess / Capture / Data) ----------------- */

  /* White pill button on the navy CTA panel -> blush. */
  btnBlush: "background:#F2B8C6;color:#0F1D2E",

  /* Outlined hero secondary button. */
  ghostCoral: "border-color:#E3735C;color:#E3735C",

  /* Study link under the trial stats. */
  studyLink: "color:#E3735C;border-color:#E3735C",

  /* --- Outcomes --------------------------------------------------------- */

  /* Study / ROI cards lift on hover. */
  liftCard:
    "transform:translateY(-6px);box-shadow:0 24px 56px rgba(15,29,46,.1)",

  /* --- Pricing ---------------------------------------------------------- */

  /* "Get a quote" button on each plan card. */
  planCta: "background:#E3735C;color:#FFFFFF;transform:translateY(-1px)",

  /* --- Thank You -------------------------------------------------------- */

  /* Outlined secondary button on the confirmation page. */
  ghostNavy: "border-color:#0F1D2E;color:#0F1D2E",

  /* --- Book a Call ------------------------------------------------------ */

  /* "Pick a time" primary button. */
  bookCta: "background:#E3735C;transform:translateY(-1px)",

  /* Outlined "Send it" button on the info-sheet row. */
  sheetBtn: "border-color:#0F1D2E",

  /* --- StudyRequest (gated evidence PDFs) ------------------------------- */

  /* The underlined trigger link. */
  studyTrigger: "color:#E3735C;border-color:#E3735C",

  /* Navy submit / download buttons inside the panel. */
  navyToCoral: "background:#E3735C",

  /* "Submit a new request" text button. */
  mutedToCoral: "color:#E3735C",

  /* --- Behavioral Risk --------------------------------------------------- */

  /* Outlined "Export" and close buttons in the ROI calculator modal. */
  darkFill: "background:#0F1D2E;color:#FFFFFF;border-color:#0F1D2E",

  /* Navy hero CTA on this page lifts without restating its colour. */
  coralLift: "background:#E3735C;transform:translateY(-2px)",

  /* --- Community Research ------------------------------------------------ */

  /* Info-sheet submit on this page goes teal rather than blush. */
  bgTeal: "background:#4FB3BF",
} as const;

/* :focus-visible styles. support.js accepted any pseudo via `style-<name>`
 * (src/pseudo.ts took key.slice(6)); v2-maven uses style-focus on the
 * info-sheet inputs. Emitted by the same generator, same !important rule.
 *
 * NOTE: the original used :focus. We emit :focus-visible so the ring does
 * not appear on mouse click, which is the modern default and matches what
 * the rule was for (keyboard affordance). Visually identical for keyboard
 * users; no layout impact either way. */
export const FOCUS_STYLES = {
  /* Info-sheet email input on the navy product-page CTA panels.
   * Assess uses the teal variant; Engage/Capture/Data use blush. */
  inputFocusBlush: "border-color:#F2B8C6",
  inputFocusTeal: "border-color:#4FB3BF",
  /* Book a Call inputs focus to navy. */
  inputFocusNavy: "border-color:#0F1D2E",
  /* StudyRequest inputs focus to coral on a white field. */
  inputFocusCoral: "border-color:#E3735C;background:#FFFFFF",
  /* Orbit-page info-sheet input: coral border only, field colour unchanged.
   * Cardiology uses this; Orthopedics uses the light-blue variant. */
  inputFocusCoralBorder: "border-color:#E3735C",
  inputFocusBlue: "border-color:#5B9BEA",
  inputFocusLilac: "border-color:#C0A5E8",
  inputFocusGold: "border-color:#E9C46A",
  inputFocusTealBorder: "border-color:#4FB3BF",
} as const;

export type HoverName = keyof typeof HOVER_STYLES;
export type FocusName = keyof typeof FOCUS_STYLES;

/** className for a named focus style. */
export function fv(name: FocusName): string {
  return `fv-${name}`;
}

/** className for a named hover style. */
export function hv(name: HoverName): string {
  return `hv-${name}`;
}
