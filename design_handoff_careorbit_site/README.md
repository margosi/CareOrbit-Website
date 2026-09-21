# Handoff: CareOrbit Marketing Website (v2)

## Overview
Complete marketing website for CareOrbit, a patient-engagement platform sold to health systems. ~30 pages: home, platform, four product pages (Engage, Capture, Assess, Data), eleven orbit/service-line pages, pricing (4 pages), outcomes/ROI, about, book-a-call with Calendly scheduling, study/pilot report pages, and gated info-sheet downloads. Target repo: `margosi/CareOrbit-Website` (main).

## About the Design Files
The files in `site/` are **design references created in HTML** — high-fidelity prototypes showing intended look and behavior, not production code to copy directly. The task is to **recreate these designs in the target codebase's environment** using its established patterns. The repo is currently empty, so choose the most appropriate framework (a static-friendly React framework such as Next.js or Astro is a good fit — the site is content-heavy with light interactivity). The `.dc.html` files each contain the full page markup (inline-styled) plus a small script block with the page's state logic; they open directly in a browser for reference.

## Fidelity
**High-fidelity.** Colors, type, spacing, copy, and interactions are final. Recreate pixel-perfectly. Copy is brief-locked — do not rewrite it. Anything wrapped in `[Placeholder: …]` is intentionally unresolved; keep it visibly labeled.

## Screens / Views
| Page | File | Purpose |
| --- | --- | --- |
| Home | site/Home.dc.html | Hero w/ 3-image fader, orbit grid (navy), trusted-by marquee, costliest-moments cards, donut-ring stats, case study, CTA |
| Platform | site/Platform.dc.html | Platform overview, five-steps section, security |
| Engage / Capture / Assess / Data | site/EngagePage.dc.html etc. | Product pages; each ends with evidence + info-sheet email form |
| Orbit pages (standard) | site/CardiologyPage.dc.html (reference impl), OrthopedicsPage, OncologyPage, WomensHealthPage, BariatricsPage, BehavioralHealthPage, MedicationTherapyPage, SurgicalSupportPage, PrimaryCarePage, BehavioralSafety, CommunityResearch | Editorial "ledger" pages per service line — see site/PAGE-STANDARD.md for the binding section spec |
| Legacy orbit renderer | site/OrbitPage.dc.html | Renders older tile-style orbit pages via `?line=` param |
| Pricing | site/Pricing.dc.html + PricingAssess/PricingCapture/PricingData | Tiered plans (Single Orbit / Department / Enterprise) per product |
| Outcomes & ROI | site/Outcomes.dc.html | Trial stats + four ROI cards |
| Book a call | site/BookACall.dc.html | Lead form → embedded Calendly + info-sheet dropdown form |
| Thank you | site/ThankYou.dc.html | Post-booking confirmation, platform sheet download |
| About | site/About.dc.html | Team, story |
| Studies | site/SitemanStudy.dc.html, PritikinPilot.dc.html, EScreeningResults.dc.html | Study/pilot detail pages |
| Shared | site/SiteNav.dc.html, SiteFooter.dc.html | Sticky pill nav, footer with giant watermark |

**site/PAGE-STANDARD.md is the binding page spec** — section order, paddings, ledger row patterns, navy-panel rules, evidence + gated StudyRequest pattern, conversion placement, language rules, responsive rules, and build checklist. Read it in full before implementing any orbit page.

## Interactions & Behavior
- **Nav**: sticky floating pill, centered, overlaps hero; announcement bar above on some pages.
- **Scroll reveals**: elements with `data-rv` fade/slide in (`opacity 0 → 1`, `translateY(28px) → 0`, `.85s cubic-bezier(.16,1,.3,1)`); count-ups on `data-count`. See site/motion.js. Respect `prefers-reduced-motion`.
- **Book a call**: Name/Organization/Work email required (marked `*`); Role + Service line optional. On valid submit, an inline Calendly iframe appears (`https://calendly.com/careorbitceo/20-min-intro-call`) prefilled with name/email; org/role/line passed as `utm_content`, source page as `utm_source`. On Calendly's `calendly.event_scheduled` postMessage, redirect to ThankYou with `?line=&src=`. `?src=` query param pre-selects service line / quote context (see the `topics`/`lines` maps in BookACall's script).
- **Info-sheet forms** ("Not ready for a call?"): require email (and on Book a call, a solution pick); on submit, download the matching PDF from `site/sheets/careorbit-<slug>-2-page.pdf` and flip button label to "Downloading your info sheet ✓". In production, replace direct download with an email send.
- **Study reports are gated**: topline stats on-page, full PDF served via the StudyRequest email form (site/StudyRequest.dc.html). No standalone study PDF links.
- **Image slots**: `image-slot.js` placeholders await real photos; keep placeholders labeled.
- **Form validation**: required fields marked with `*` in placeholder text; single inline error line in `#B05A46`.

## State Management
Per-page local state only (form fields, sent/booking flags, tab selection, hero fader index). Booking details persisted to `localStorage.co_booking`; referral source to `sessionStorage.co_src`. No backend — forms currently simulate; production needs endpoints for lead capture and sheet email delivery.

## Design Tokens
- **Colors**: navy `#0F1D2E`, panel navy `#1E3A5F`, coral `#E3735C`, blush `#F2B8C6`, blues `#5B9BEA` / `#4FB3BF` / `#2D5A87`, background `#FAF8F4`, white cards `#FFFFFF`, muted body `rgba(15,29,46,.7)`, footer/panel muted `#B9C8D8`, error `#B05A46`.
- **Type**: headings Lato (900 for section heads, 400 for large display), italic accent words Source Serif 4 (italic 500–600); body Inter 400–600. Display sizes `clamp(38px, 4.5vw, 54px)`; body 16.5px/1.65; small 13–14px. Letter-spacing −0.025em on display.
- **Radii**: cards 26–32px, inputs 14–16px, pills/buttons 999px.
- **Borders**: `1.5px solid rgba(15,29,46,.12)` inputs; `1px solid rgba(15,29,46,.07)` cards.
- **Shadow**: `0 28px 70px rgba(15,29,46,.08)` on featured cards.
- **Buttons**: primary navy bg → coral on hover, white text, 15–16px/600, `padding:15px 28px`; secondary outlined pill.
- **Links**: `a{color:#2D5A87}` hover `#E3735C`.

## Language rules (binding)
- Never call the patient artifact a "link" (say orbit/guide); never em dashes; never "catalog" (say orbit library). CareOrbit *adds to* existing tools, never replaces the discharge folder or follow-up call.
- Only real, sourced numbers; models labeled as models. Key trial stats: +65% understanding, −53% calls, −41% readmissions, +22% satisfaction, 9-in-10 navigation (Siteman controlled trial). Pritikin pilot: "a leading Midwest health system", 187 invited, 52% vs 24% ICR starts over 9 months, observational.

## Assets
- `site/images/` + root-level PNGs: heroes, section imagery, headshots, diagrams (some AI-generated placeholders pending real photos).
- `site/sheets/`: 15 downloadable 2-page info-sheet PDFs (platform + all lines/products).
- Logos: `site/careorbit-logo-nav2.png` (nav), `site/careorbit-logo.png`.
- Root PDFs (CareOrbit-*.pdf): gated study reports.
- Fonts via Google Fonts: Lato, Source Serif 4, Inter.

## Files
Everything under `site/` mirrors the design project's `v2-maven/` folder. Reference implementation for the page standard: `site/CardiologyPage.dc.html`. Helper scripts (`motion.js`, `image-slot.js`, `doc-page.js`) show intended behaviors to reimplement, not code to ship.
