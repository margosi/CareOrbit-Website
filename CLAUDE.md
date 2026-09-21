# CareOrbit Website Redesign — Project Notes

## Current state (July 2026)
- **Active site: `v2-maven/`** — 13-page CareOrbit site inspired by mavenclinic.com layout/motion, on CareOrbit brand (navy #0F1D2E, coral #E3735C, blush #F2B8C6, light blues #5B9BEA/#4FB3BF/#2D5A87, bg #FAF8F4). Headings: Lato (weight 400 for big display, 900 for section heads) + Source Serif 4 italic accent words. Body: Inter.
- **`v1/`** — earlier flat design, saved off. Do not edit unless asked.
- Entry page: `v2-maven/Home.dc.html`. Shared: `SiteNav.dc.html`, `SiteFooter.dc.html`, `orbits-data.js` (all 7 orbit lines' copy), `motion.js` (scroll reveals [data-rv], count-up [data-count]), `image-slot.js` (drag-drop image placeholders).
- Orbit pages (Oncology, Cardiology, Orthopedics, WomensHealth, Bariatrics, BehavioralHealth, MedicationTherapy) all render through `OrbitPage.dc.html` via `line` prop.

## ⚠ Page build standard — read this before building or editing any page
**`v2-maven/PAGE-STANDARD.md` is the binding spec for every page.** It captures the "editorial ledger system" established on Home, CardiologyPage, OrthopedicsPage, and BehavioralSafety: section order and paddings, the ledger row patterns (dash list / stepped sequence / numbered), navy panel rules, the evidence + gated `StudyRequest` pattern, conversion placement, language rules, required responsive rules, and a build checklist. Read it in full, then use `CardiologyPage.dc.html` as the reference implementation.

Pages already on the standard: **CardiologyPage, OrthopedicsPage, BehavioralSafety**.
Still on the old tile-based design, convert when asked: Oncology, WomensHealth, BehavioralHealth, MedicationTherapy, Bariatrics, SurgicalSupport, CommunityResearch.

## Home page structure (top → bottom)
Announcement bar → floating pill nav (sticky, centered, overlaps hero) → full-height hero with 3-image fader (hero-1/2/3.png) + dots + semi-transparent "Find your orbit solution" chat box → navy #orbit-grid section: "An orbit for *every* clinical journey" with 2 rows of 4 tiles (hover-expand animation currently DISABLED, all text + blue Learn more visible; expand logic still in code) → Trusted By marquee (BJC/WashU/Siteman) → costliest moments cards → orbit explainer (phone in dashed ring) → donut-ring stats section "Improving outcomes by *engaging patients*" (Maven-style rings, arc sweep + count-up on scroll) → case study card → CTA → footer with giant watermark.
"Five steps" section was moved to Platform page (before Security).

## Rules from user (see uploads/my-*.md)
- Copy is brief-locked (uploads/brief-extracted.txt); placeholders stay visibly labeled [Placeholder: …]
- Only real, sourced numbers; models labeled as models. Trial stats: +65% understanding, −53% calls, −41% readmissions, +22% satisfaction, 9-in-10 navigation (Siteman controlled trial).
- User matches Maven's look closely on request — take their screenshots literally.
- Headers use Lato (they overrode brand-guide Fredoka).
- Never use the word "link" for the patient artifact (use orbit/guide), never em dashes, never "catalog" (it is an orbit library). CareOrbit *adds to* existing tools, never replaces the discharge folder or the follow-up call.
- Study and pilot results are gated: topline stats on the orbit page, then a request-by-email form (`StudyRequest.dc.html`) that serves the PDF. No standalone study pages.
- Pritikin pilot: UnityPoint only, referred to as "a leading Midwest health system"; 187 invited, 52% vs 24% ICR starts over 9 months; observational, not randomized. CHI data was withdrawn by Pritikin.

## Workflow rules
- After any image swap or chat-prompted change, always refresh/reopen the preview window so the user sees the result immediately (images can cache stale).

## Outstanding
- Pre-launch: confirm "Trusted by" wording + BJC/WashU/Siteman naming rights (user's task).
- Placeholder slots await real photos/screenshots/bios (drag-and-drop onto image slots).
