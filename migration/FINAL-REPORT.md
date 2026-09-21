# CareOrbit → Next.js migration: final report

**Status: implementation complete, visual review approved, closeout done.
Nothing has been deployed.** `v2-maven/` is byte-for-byte untouched and is
still the live site.

The three decisions this report originally left open were settled at
closeout: **keep the generated titles and descriptions**, **`careorbit.com`
as the production hostname**, and **the four print templates stay in
`v2-maven/`**. All three are recorded in section 6.

What is still open: the 170 MB of image masters (6d, and section 9 step 1),
the manual-test list (section 8), and source control itself (section 9).

**Read next:** `VERIFICATION-RESULTS.md` for the numbers, `REVIEW-LOCALLY.md`
to re-check any page, section 9 for what to do next.

---

## 1. What was built

A production Next.js 16 application (`careorbit-next/`) reproducing all 28
pages of the v2-maven site on the App Router with TypeScript.

| | |
|---|---|
| Routes | **28** page routes + `sitemap.xml`, `robots.txt`, 404, `/api/lead` |
| Components | 29 |
| Data / helper modules | 34 |
| Legacy URL redirects | 37 permanent (308) |
| Dependencies | `next`, `react`, `react-dom`, `server-only`. Nothing else. |

Every page is a **server component** except where the original was
genuinely interactive. Only the segment tabs, ROI calculators, carousels,
forms, nav drawer and scroll reveals ship JavaScript.

### Route mapping

`/`, `/platform` (+ `engage`, `assess`, `capture`, `data`), `/outcomes`,
`/pricing` (+ `assess`, `capture`, `data`), `/about`, `/book-a-call`,
`/thank-you`, `/orbits/*` (11), `/evidence/*` (3).

`BehavioralSafety.dc.html` → `/orbits/behavioral-risk`, matching the label
the nav already uses. `/login` is excluded by decision and correctly 404s.

---

## 2. Verification

Four independent checks, because each caught defects the others missed.

| Tool | Scope | Result |
|---|---|---|
| `verify_page.py` / `verify_all.py` | Pixel diff, 28 pages × 5 widths = **140 checks** | **0 fail, 0 unexplained** |
| `audit_responsive.py` | Computed grid / padding / alignment, 4 widths per page | **0 mismatches** |
| `diff_text.py` | Rendered text, line by line | **28/28 TEXT IDENTICAL** |
| `audit_typography.py` | Computed font-size / line-height / max-width / colour of every text node | **0 mismatches** |

Plus targeted interaction tests: `check_behavioral_calc.py` (25
assertions), `check_forms.py` (8), `check_lead_api.py` (18),
`verify_chrome.py` (19).

### The only intentional visual change

**The footer below 900px.** v2-maven declares the footer grid as
`1.3fr repeat(4, minmax(0,1fr))` with no media query at any width. Below
~900px the four 40px gaps consume the row and the link columns collapse to
about **7px** — measured 7.125px at 390px — so the text overlaps and is
unreadable. It now collapses to two columns under 900px and one under
640px. Desktop is untouched and still matches the baseline exactly.

This is the "approved deviation" every page reports at 768 and 390. The
harness does not take it on trust: whenever a page claims it, the region
**above the footer** is re-diffed separately and must come back clean.

### Accepted implementation improvements

| Change | Why |
|---|---|
| `next/image` lazy loading | Modern default; the legacy eager-loaded everything |
| CSS `object-fit: cover` framing | Replaces image-slot's manual transform maths. Sub-pixel differences only |
| AVIF/WebP optimisation | **Home: 23.7 MB of images → 0.31 MB delivered, 98.7% smaller.** Re-diffed with optimisation ON: 28 pages, 0 failures |
| Responsive footer | See above |
| `:focus-visible` instead of `:focus` | The ring no longer appears on mouse click |
| Self-hosted fonts | No third-party request on first paint |

---

## 3. Legacy bugs corrected, and how each was proven

Every one is a case where the legacy CSS states an intent that its own
cascade prevents. None is a design change; each reproduces what the
**baseline screenshots actually show**, and each is documented in the
stylesheet where it was dropped.

1. **Mobile hero padding** (Home) — a style-substring selector stopped
   matching; corrected and ratified in Phase 3.
2. **`margin-left: auto` on responsive paragraphs** — same class of
   failure; ratified in Phase 3.
3. **`[data-costgrid]`, Behavioral Risk, 701–1020px** — the page rule
   restoring two columns is specificity `0-1-0` against the global
   `div[style*=…]` at `0-1-1`. It has never applied. Porting it verbatim
   inverted the result and made the page 180px shorter (9.43% of the body).
   Declaration dropped.
4. **`[data-restat]`, Pritikin pilot, 701–900px** — identical pattern.
   Porting it made the page 493px taller (14.3% of the body). The
   `gap: 18px` in the same rule *is* live and was kept.

Both (3) and (4) are recorded in `POST-MIGRATION-IDEAS.md`: if the
unreachable layout was the real intent, it is a one-line specificity fix
plus a re-baseline — a design decision, not a migration one.

---

## 4. Defects found in my own conversion

Listed because they are the reason the harness has four tools, not one.

- `Figure` was missing `aspect-ratio: 3/2`, collapsing a grid column by
  89px (Phase 3).
- `[data-sec]` rules grouped by breakpoint reversed the source order and
  shifted every Platform section by 16px at 390px (Phase 4).
- Untagged container padding on all four Pricing pages, 40px low at 768px
  (Phase 5).
- Wrong font-size and colour guessed for an Outcomes stat (Phase 5).
- A cascade inversion on Outcomes' `[data-grid3]` (Phase 5).
- Stale Capture copy left on the Data page — invisible to pixels, caught by
  the text diff (Phase 5).
- The `Figure` empty state lacked image-slot's dashed ring and icon
  (Phase 6b).
- Medication Therapy kept three Behavioral Health figures; Surgical Support
  rendered a literal `’` in two JSX attributes (Phase 6b).

---

## 5. Lead capture: additive and inert by default

Every form on v2-maven transmits **nothing** — `StudyRequest.dc.html` says
so in its own placeholder comment. That behaviour is preserved exactly.

All three forms now also POST to `/api/lead`, **fire and forget**. The
download is served, the gated PDF unlocked, and Calendly opened without
ever waiting on that request. With no environment configured the endpoint
stores nothing, sends nothing and answers 200.

**No credentials were needed, and none were requested.** Setting
`SUPABASE_*` and `RESEND_*` turns lead capture on with no code change.

Secrets cannot leak: both server modules begin with `import "server-only"`,
so a client import is a build error, and `check_lead_api.py` greps the
entire built client bundle for every secret variable name — **zero hits**.

---

## 6. Decisions

### a. Page titles and meta descriptions — RESOLVED: keep the generated set
v2-maven has no `<title>` and no meta description on any page, so all 28 are
net-new user-facing text on a brief-locked site.

Rather than write marketing copy, each **title** is the page's existing nav
label or hero eyebrow, and each **description** is that page's own hero
paragraph, **verbatim** — whole sentences where they fit in ~158
characters, otherwise cut at a clause break with an ellipsis. No claim,
statistic or product name appears in a form it does not already take on the
page.

**Decision: keep them as generated.** Reworking any of them later is a
content edit to the table in `lib/seo.ts` — nothing else depends on the
wording, and no re-verification is needed because meta tags do not render.

| Route | Title (`… | CareOrbit`) | Description |
|---|---|---|
| `/` | CareOrbit | Orbits are proven to deliver against measured outcomes with the streamlined, easy experience today’s patients expect. |
| `/platform` | Platform | CareOrbit carries your guidance from diagnosis through recovery, driving better outcomes for patients, families, and care teams. |
| `/platform/engage` | Engage | Care-team-approved digital journeys that put your guidance in the patient's hands from diagnosis through recovery… |
| `/platform/assess` | Assess | Structured patient input for any orbit, from light check-ins to formalized eScreening and PROMs reporting, or entirely on its own. |
| `/platform/capture` | Capture | A digital tool paired with a professional service: our team converts your best patient material into one organized, deployable, trackable… |
| `/platform/data` | Data | Every action a patient takes, and every one they do not, becomes an engagement signal your teams can act on. |
| `/outcomes` | Outcomes | The outcomes that matter most to your organization, and their financial ROI, chosen before the build starts… |
| `/pricing` | Pricing | Start with one orbit line, expand to a department, or roll CareOrbit out across the enterprise. Every plan adds to the tools your teams already use. |
| `/pricing/assess` | Assess pricing | Assess brings patient-reported symptoms and check-ins back to your care teams. Start with one program and grow to system-wide listening. |
| `/pricing/capture` | Capture pricing | Capture turns the education materials you already trust into guided orbits, and captures other informational resources for automatic delivery to patients… |
| `/pricing/data` | Data Insights pricing | Your own engagement data and reporting are included with every orbit, and you own your own data. |
| `/about` | About | CareOrbit is a Digital Patient Engagement Platform designed to support any patient care journey through education, understanding, motivation… |
| `/book-a-call` | Book a Call | No demo script, no obligation. |
| `/thank-you` | Thank you | A confirmation is on its way to your email. |
| `/orbits/oncology` | Oncology orbit solutions | Results proven against usual care in a controlled surgical oncology trial. |
| `/orbits/primary-care` | Primary Care orbit solutions | Guided digital support tailored to each condition, visit, and protocol, carried from the first appointment through years of chronic care and prevention. |
| `/orbits/cardiology` | Cardiology orbit solutions | Guided digital support tailored to each condition, procedure, and protocol, carried from diagnosis through rehab and lifelong management. |
| `/orbits/orthopedics` | Orthopedics orbit solutions | Guided digital support tailored to each procedure and each surgeon's protocol, carried through prehab, surgery, and the full recovery window… |
| `/orbits/womens-health` | Women's Health orbit solutions | Women's health is a relationship measured in decades, and almost all of it happens between visits: well-woman care, the operative journeys, pregnancy… |
| `/orbits/bariatrics` | Bariatrics orbit solutions | Guided digital support tailored to each pathway and to your program's requirements, carried from the first seminar through long-term follow-up… |
| `/orbits/behavioral-health` | Behavioral Health orbit solutions | Validated screenings, delivered on schedule, scored automatically, and surfaced to the care team when risk is rising. |
| `/orbits/medication-therapy` | Medication Therapy & Adherence orbit solutions | Specialty and injectable therapies fail most often in the first months, for reasons education and timely check-ins can reach. |
| `/orbits/community-research` | Community-Based Research orbit solutions | Guided digital support tailored to each protocol, cohort, and follow-up window, carried from first contact through the final assessment… |
| `/orbits/surgical-support` | Surgical Support orbit solutions | Surgery is the moment a health system has the least contact and the most at stake. |
| `/orbits/behavioral-risk` | Behavioral Risk orbit solutions | High-risk industries have spent decades engineering physical safety. Behavioral risk has not had the same infrastructure. |
| `/evidence/siteman-study` | The Siteman controlled clinical trial | Pancreatic cancer surgery patients and their families at Siteman Cancer Center, Washington University School of Medicine… |
| `/evidence/pritikin-pilot` | The Pritikin cardiac rehab pilot | Over nine months at a leading Midwest health system, 187 patients referred to Pritikin Intensive Cardiac Rehabilitation were invited to a cardiac rehab… |
| `/evidence/escreening-results` | VA eScreening published evidence | The assessment approach behind CareOrbit Assess was developed at the VA in 2012 and studied in three peer-reviewed publications… |

### b. The production hostname — RESOLVED: `careorbit.com`
`NEXT_PUBLIC_SITE_URL` defaults to `https://careorbit.com`, which is now the
confirmed production hostname. It drives every canonical and every sitemap
entry. The variable only needs setting to point a preview deployment at a
different origin.

### c. The four print templates — RESOLVED: stay in v2-maven
`PancreaticStudy-print`, `PrimaryCareSheet-print`,
`PritikinPilotSummaryPDF-print`, `PritikinPilotSummaryPDF` are unlinked
internal authoring tools with no Phase 0 baseline.

**Decision: they stay out of the Next.js production site and remain in
`v2-maven/`**, where they still run exactly as today. Their **PDF outputs
are fully preserved** in the Next app (15 sheets + 3 evidence docs), which
is what the site actually serves.

Working practice from here: to change a print template, edit it in
`v2-maven/`, re-export, and drop the PDF into
`careorbit-next/public/sheets/` or `public/evidence-docs/`.

The in-page `#print-only` ROI print sheet — different thing, similar name —
**is** fully ported on all five calculator pages.

### d. Source image weight — still open, and it matters for deployment
`public/images/` is **170 MB of PNG masters** (93 files, a dozen over
2.4 MB). Delivery is already solved — visitors get AVIF at the rendered
size, 98.7% smaller — but the masters still sit in the repository and in
every deployment, which affects clone time, build time and platform limits.

Three options, cheapest first, in `POST-MIGRATION-IDEAS.md` item 8:
lossless recompression (`oxipng`, identical pixels, no re-baseline);
downscaling the masters (changes assets, wants a re-baseline); or moving
them to object storage or Git LFS. There are also two byte-identical
duplicate pairs worth 3.6 MB (item 5) that could be folded in.

**Worth deciding before the first push**, because it is much easier to fix
before 170 MB is in git history than after.

### e. Pre-existing content items (unchanged, as instructed)
Missing Primary Care PDF, the Platform quote carousel's 7 quotes with 5
reachable, the "withr quarterly reviews" typo, `/login`. All reproduced
as-is and recorded.

---

## 7. Where everything is

| File | What it holds |
|---|---|
| `migration/FINAL-REPORT.md` | This document |
| `migration/VERIFICATION-RESULTS.md` | The full harness run against the final build, page by page |
| `migration/MIGRATION-LOG.md` | Every phase: results, deviations, bugs, files changed |
| `migration/REVIEW-LOCALLY.md` | How to run both sites side by side, and what to click |
| `migration/POST-MIGRATION-IDEAS.md` | 8 items deliberately not changed |
| `migration/README.md` | Locked decisions, the harness, the frozen snapshot |
| `careorbit-next/README.md` | What is load-bearing and will break quietly |

---

## 8. What still needs a human

Everything below is either untestable by machine or a judgement call. None
of it blocks a preview deployment.

### Needs manual testing
| What | Where | Why a machine cannot do it |
|---|---|---|
| **ROI calculator print view** | The five calculator pages → Export → "PDF, one page" | Opens the browser print dialog. The `#print-only` injection, `@media print` sheet and `afterprint` cleanup are ported verbatim, but the rendered PDF has never been looked at |
| **Calendly end-to-end** | `/book-a-call` → Pick a time → actually book | Verified as far as the iframe URL and its prefill, and the `calendly.event_scheduled` → `/thank-you` redirect was tested with a stub. A real booking has not been made |
| **Email deliverability** | After `RESEND_*` is set | Nothing has been sent |
| **Real browsers** | Safari, Firefox, iOS Safari, Android Chrome | Every check ran in headless Chromium |
| **Accessibility and print CSS beyond the ROI sheet** | Whole site | Out of the migration's scope, which was fidelity to v2-maven |

### Known and deliberately unchanged
Carried over from v2-maven exactly as they are, recorded in
`POST-MIGRATION-IDEAS.md`:
- the Primary Care info sheet PDF does not exist, so that one download 404s
  (it 404s on the live site too);
- the Platform quote carousel holds 7 quotes but only 5 are reachable;
- `"...who to partner withr quarterly reviews."` — copy typo, brief-locked;
- `/login` is excluded and 404s, by decision;
- two legacy responsive rules that never applied are dropped rather than
  "fixed" (items 6 and 7).

### Before a production launch, not before a preview
- Confirm the "Trusted by" wording and BJC / WashU / Siteman naming rights
  (carried over from `CLAUDE.md` as your task, unchanged by the migration).
- Decide the image-master question in 6d — and ideally before the first
  commit, not before launch. See section 9, step 1.
- Replace the remaining `[Placeholder: …]` labels with real content. Only
  **five are visible on the rendered site** (the rest are fallback captions
  on slots that do have an image):
  - `/orbits/womens-health` — the "All of women's health" tab has no value
    photo, so the empty-slot chrome shows. Same on the live site.
  - `/orbits/behavioral-health` — two, the orbit library is unwritten.
  - `/orbits/bariatrics` — one, additional orbits to be confirmed.
  - `/orbits/community-research` — one, an unconfirmed statistic source.

  All five are carried over from v2-maven unchanged, and are visibly
  labelled by design per `CLAUDE.md`.

---

## 9. Recommended next step: source control, then a preview

Nothing below has been done. It needs your go-ahead, and the first item
needs a decision before the second.

### Step 1 — settle the image masters BEFORE the first commit — DONE
`public/images/` was 170 MB of PNGs, and that dominates the repository size
in step 2.

`oxipng` is not installed and Homebrew is not on this machine. Downloading a
third-party binary to squeeze image files is a poor trade, so
`migration/scripts/optimise_pngs.mjs` does the same job with `pngjs`, which
the app already depends on: decode to raw RGBA, re-encode at zlib level 9
with per-scanline adaptive filtering across three deflate strategies, then
**decode again and keep the result only if the pixel buffers are
byte-identical, the dimensions match, and the file is actually smaller.**

**Measured result: 93 files, 12 smaller, 81 already optimal, 0 refused;
169.5 MB → 164.6 MB, 2.9% smaller.** It is far more
modest than a generic "10-30%" expectation, because most of these PNGs are
already well compressed — on a sample of mid-sized files a naive re-encode
came out 2-18% *bigger*, which is exactly why the size guard exists. A
dedicated optimiser (oxipng with zopfli) would likely do better; it was not
worth a binary download for the difference.

Two byte-identical duplicate pairs (3.6 MB) remain; see
`POST-MIGRATION-IDEAS.md` items 5 and 8.

### Step 2 — initialise the repository — DONE

I measured the folder rather than guessing, because the sizes decide the
shape:

| | Size | Commit? |
|---|---|---|
| `careorbit-next/` minus `node_modules` (451 MB) and `.next` (96 MB) | **~255 MB**, almost all `public/` | **Yes** — the product |
| `migration/*.md` + `scripts/` + `manifest/` | < 1 MB | **Yes** — docs and harness |
| `v2-maven/` | 392 MB | **Yes** — the site being replaced, and the source of truth for re-baselining |
| `migration/reference/v2-maven-snapshot/` | 392 MB | **No** — a byte-identical copy of `v2-maven/`. Git deduplicates identical blobs, so it would cost little, but it is confusing to carry two copies |
| `migration/baseline/` | 196 MB of PNGs | **No** — regenerable from `v2-maven/` with `capture_baseline.py` |
| `uploads/`, `design_handoff_careorbit_site/` | 845 MB, 392 MB | **No** — source material, not the site |

**Done: one repository at `CareOrbit Website/`**, on branch `main`, with the
identity set repo-locally (this machine has no global git identity, and
setting one would reach beyond this project).

```
commit  aacaa750419a29b7ae7297ce5eaa999c2869bd2b
        Checkpoint: completed and verified Next.js migration of the CareOrbit site
        687 files, 643 MB of content, .git 697 MB
```

Two paths were excluded beyond the list above, both under the same rule
already stated there — *regenerable or duplicated, and large*:

| | Size | Commit? |
|---|---|---|
| `migration/page-check/` | 365 MB | **No** — `verify_page.py` output, rewritten on every run, referenced by nothing |
| `migration/.venv/` | 155 MB | **No** — the harness interpreter; two commands to recreate, see `README.md` |

`migration/chrome-check/` and `migration/typespecimen/` were kept: 2.4 MB,
and they are the evidence the written reports point at.

Vercel's **Root Directory** setting points at `careorbit-next` when that step
comes.

**One caveat worth stating plainly:** excluding `migration/baseline/` means
the 145 reference screenshots live only on this machine. They are
reproducible from `v2-maven/`, but only for as long as `v2-maven/` itself is
preserved — which is the main argument for committing it. If you would
rather have the baselines versioned too, Git LFS is the right tool; plain
git is a poor fit for 196 MB of PNGs.

### Step 3 — then a preview deployment
In order:
1. create the Vercel project, Root Directory `careorbit-next`;
2. set `NEXT_PUBLIC_SITE_URL`, plus `SUPABASE_*` / `RESEND_*` only if lead
   capture should be live from day one;
3. deploy to a **preview** URL;
4. re-run the harness against it. Both `verify_all.py` and
   `verify_page.py` accept `--base`, so the preview is diffed against the
   same Phase 0 baseline as localhost:

   ```bash
   verify_all.py --base https://careorbit-next-xxxx.vercel.app
   ```

**Only after a clean preview run should production and DNS be discussed.**

---

## 10. Not done, by instruction

No git repository, no GitHub, no Vercel project, no deployment, no DNS, no
Supabase or Resend account, no change of any kind to the live site.
