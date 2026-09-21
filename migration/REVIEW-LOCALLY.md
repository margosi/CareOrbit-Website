# Reviewing the migrated site locally

Nothing has been deployed. `v2-maven/` is untouched and is still the live
site. This is how to look at the rebuild side by side with it.

> **Visual review was approved at closeout** after a pass over all 28 pages.
> This document stays here as the way to re-check any page later, and as the
> checklist for the items that still need a human eye — see "Worth looking
> at specifically" below, particularly the ROI calculator's PDF export.

## Start both sites

Two terminals, from the project root (`CareOrbit Website/`).

**1. The current live site** — same command as always:

```bash
python3 -m http.server 8000
```
Home page: <http://localhost:8000/v2-maven/Home.dc.html>

**2. The rebuild** — production build, which is what was verified:

```bash
cd careorbit-next
npm install        # first time only
npm run build
npm run start
```
Home page: <http://localhost:3000>

> Use `npm run build && npm run start`, not `npm run dev`. Dev mode adds
> overlays and disables some optimisation, so it will not look or measure
> like production.

## The 28 pages

| Live site | Rebuild |
|---|---|
| `/v2-maven/Home.dc.html` | <http://localhost:3000> |
| `/v2-maven/Platform.dc.html` | <http://localhost:3000/platform> |
| `/v2-maven/EngagePage.dc.html` | <http://localhost:3000/platform/engage> |
| `/v2-maven/AssessPage.dc.html` | <http://localhost:3000/platform/assess> |
| `/v2-maven/CapturePage.dc.html` | <http://localhost:3000/platform/capture> |
| `/v2-maven/DataPage.dc.html` | <http://localhost:3000/platform/data> |
| `/v2-maven/Outcomes.dc.html` | <http://localhost:3000/outcomes> |
| `/v2-maven/Pricing.dc.html` | <http://localhost:3000/pricing> |
| `/v2-maven/PricingAssess.dc.html` | <http://localhost:3000/pricing/assess> |
| `/v2-maven/PricingCapture.dc.html` | <http://localhost:3000/pricing/capture> |
| `/v2-maven/PricingData.dc.html` | <http://localhost:3000/pricing/data> |
| `/v2-maven/About.dc.html` | <http://localhost:3000/about> |
| `/v2-maven/BookACall.dc.html` | <http://localhost:3000/book-a-call> |
| `/v2-maven/ThankYou.dc.html` | <http://localhost:3000/thank-you> |
| `/v2-maven/Oncology.dc.html` | <http://localhost:3000/orbits/oncology> |
| `/v2-maven/PrimaryCare.dc.html` | <http://localhost:3000/orbits/primary-care> |
| `/v2-maven/Cardiology.dc.html` | <http://localhost:3000/orbits/cardiology> |
| `/v2-maven/Orthopedics.dc.html` | <http://localhost:3000/orbits/orthopedics> |
| `/v2-maven/WomensHealth.dc.html` | <http://localhost:3000/orbits/womens-health> |
| `/v2-maven/Bariatrics.dc.html` | <http://localhost:3000/orbits/bariatrics> |
| `/v2-maven/BehavioralHealth.dc.html` | <http://localhost:3000/orbits/behavioral-health> |
| `/v2-maven/MedicationTherapy.dc.html` | <http://localhost:3000/orbits/medication-therapy> |
| `/v2-maven/CommunityResearch.dc.html` | <http://localhost:3000/orbits/community-research> |
| `/v2-maven/SurgicalSupport.dc.html` | <http://localhost:3000/orbits/surgical-support> |
| `/v2-maven/BehavioralSafety.dc.html` | <http://localhost:3000/orbits/behavioral-risk> |
| `/v2-maven/SitemanStudy.dc.html` | <http://localhost:3000/evidence/siteman-study> |
| `/v2-maven/PritikinPilot.dc.html` | <http://localhost:3000/evidence/pritikin-pilot> |
| `/v2-maven/EScreeningResults.dc.html` | <http://localhost:3000/evidence/escreening-results> |

## Worth looking at specifically

These are the things a pixel diff cannot judge for you. **Items 1-2 and 4-8
were covered by the approved visual review. Item 3's PDF export is the one
that still has not been looked at by anyone** — it opens the browser print
dialog, so no automated check can reach it.

1. **The footer below 900px.** Deliberately different, and the one
   intentional visual change. Narrow the window past 900px on any page: the
   rebuild collapses the footer to two columns, then one below 640px. The
   live site keeps five columns at every width, which squeezes the link
   columns to about 7px and overlaps the text.

2. **The four segment tabs.** `/orbits/cardiology`,
   `/orbits/orthopedics`, `/orbits/primary-care`, `/orbits/womens-health`.
   Click through all four on each; every section below the tabs changes.
   On Women's Health the first tab has no photo — that placeholder is in
   the live site too.

3. **The ROI calculators.** `/orbits/behavioral-risk`,
   `/orbits/womens-health`, `/orbits/behavioral-health`,
   `/orbits/medication-therapy`, `/orbits/surgical-support`. Open one,
   change a number, then Export → **PDF, one page** and Export → **Excel
   spreadsheet**. The CSV is asserted by `check_behavioral_calc.py`; the
   **PDF has never been seen by a human or a machine**. Worth five minutes
   before launch.

4. **The audience toggle** on `/orbits/behavioral-risk`: For employers /
   For associations swaps eight blocks of copy.

5. **The gated evidence forms.** Any evidence page, or the study block on
   an orbit page. Fill it in; the download should unlock. Nothing is
   transmitted — no backend is configured.

6. **Booking.** `/book-a-call?src=cardiology` should pre-select Cardiology
   and pre-tick the context box. Submitting opens Calendly with your name,
   email and organisation prefilled.

7. **A page on a phone.** Chrome DevTools → device toolbar → 390px wide.

8. **Old links.** <http://localhost:3000/CardiologyPage.dc.html> should
   redirect to `/orbits/cardiology`. <http://localhost:3000/nope> should
   show the new 404 page.

## Re-running the automated checks

With both servers up:

```bash
cd migration/scripts
<venv>/bin/python verify_all.py        # all 28 pages, 5 widths each (~1 hour)
<venv>/bin/python verify_all.py --only Home,Cardiology
<venv>/bin/python diff_text.py Cardiology /orbits/cardiology
<venv>/bin/python check_forms.py
<venv>/bin/python check_lead_api.py
<venv>/bin/python audit_typography.py
```

Or run everything at once and write a dated record to
`migration/VERIFICATION-RESULTS.md`:

```bash
<venv>/bin/python run_closeout.py
```

The Python venv with Playwright was created during Phase 0; `verify_all.py`
skips any page the running server does not actually serve, so a stale build
cannot look like a regression.
