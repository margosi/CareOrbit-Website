# CareOrbit v2 Page Standard ("the editorial ledger system")

The pattern established on **Home**, **CardiologyPage**, **OrthopedicsPage**, and **BehavioralSafety**.
Apply this to every new orbit solution page, offering page, and any page rebuilt from the old design.
Reference implementations, in order of fidelity: `CardiologyPage.dc.html` → `OrthopedicsPage.dc.html` → `BehavioralSafety.dc.html`.

---

## 1. Core principle

Light sections are **hairline-ruled editorial ledgers**, not cards. Navy rounded panels are **punctuation** —
used only for the problem panel, the library/menu panel, a financial-model panel, and the closing CTA.

Forbidden on light sections (all removed from the old design):
- filled/tinted rounded tiles with borders and box-shadows
- 3-across "journey" tiles with arrow chips and connector rails
- white 30px-radius quote cards
- one-off bordered highlight cards inside stat rows
- orphan one-line `<h3>` headers floating above a section

## 2. Section order

1. **Hero** — eyebrow, Lato 900 h1 with one italic serif phrase, sub-paragraph, two CTAs (primary navy pill "Book a 20-minute intro call" + secondary outline), image slot right. Padding `72px 28px 96px` (BehavioralSafety uses `76px`).
2. **Overview** — no eyebrow. Lato 300 h2 left / two paragraphs right, then image slot + three-audience ledger, then the ledger rows. Padding `0 28px 40px` (deliberately tight so the navy panel sits close).
3. **The understanding gap** (navy) — the problem, in industry/structural figures. Padding `0 28px 88px`.
4. *(optional, page-specific)* a light ledger row for extra problem detail — e.g. BehavioralSafety's "What behavioral risk costs an employer". Padding `0 28px 92px`.
5. **Measurable ROI / Targeted Outcomes** — numbered ledger + mid-page CTA nudge. Padding `0 28px 96px`.
6. **Orbit library** (navy) — the menu of orbits. Padding `0 28px 96px`.
7. **Clinical evidence** *(conditional — see below)* — pilot or trial as a ledger row + 2×2 stats + gated request form, then a **Voices** ledger row. Sits directly after the orbit library and immediately before the CTA. Padding `0 28px 92px`.
8. **CTA** (navy split) — headline, paragraph, white pill button; right card `#1E3A5F` with info-sheet form or a "What to bring" list. Padding `0 28px 104px`.

Proof (5) comes **before** the library (7): belief first, menu second.

**When the evidence section applies.** Include it only where there is evidence to show for that line:
- **Own study or pilot** → required. Oncology (Siteman controlled trial) and Cardiology (Pritikin ICR pilot).
- **Platform evidence, transferred** → allowed, and must be labeled a *"modeled transfer, not a measured [specialty] result"*. Orthopedics, Women's Health, Behavioral Health, Medication Therapy, Bariatrics, Surgical Support.
- **No evidence yet** → omit the whole section rather than pad it. **BehavioralSafety intentionally ships without one** (no behavioral safety outcome data exists yet, and the transferred platform-trial section was removed at the user's request). Its credibility rests on the federal exposure data and published cost benchmarks instead. Do not re-add an evidence section there without asking.

A page with no evidence section still carries its honesty disclosures: the "no published outcome data" line, the `[Placeholder: …]` notes, and any scope limits (e.g. "not a crisis line").

## 3. Tokens

```
bg              #FAF8F4        navy panel      #0F1D2E + url(arc-lines.svg) center/cover
navy inset      #1E3A5F        panel radius    40px
ink             #0F1D2E        body on light   rgba(15,29,46,.7) / .68 / .6 (tiers)
hairline        1px solid rgba(15,29,46,.14)   navy hairline   1px solid #2D5A87
coral           #E3735C        coral deep      #A8412F      blush   #F2B8C6
blue            #2D5A87        light blue      #5B9BEA      teal    #4FB3BF / #1F6B73
eyebrow grey    #B0A99E        navy body       #B9C8D8      navy mute   #8FA5BC / #7E93AB
```

Fonts: **Lato** (300 for display h2, 700 for row/item titles, 900 for h1 + ledger headlines),
**Source Serif 4 italic** (500–600) for exactly one accent phrase per headline and for ledger numerals,
**Inter** for all body copy. No other families, no new colors.

## 4. Section header pattern

```html
<div data-hdr data-rv style="display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start;margin-bottom:34px">
  <div style="display:flex;flex-direction:column;gap:12px">
    <div style="font-size:12.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#B0A99E">Eyebrow</div>
    <h2 style="font-family:Lato,sans-serif;font-weight:300;font-size:clamp(30px,3.6vw,42px);line-height:1.1;letter-spacing:-0.02em;margin:0;text-wrap:balance">Plain words, <em style="font-family:'Source Serif 4',serif;font-style:italic;font-weight:600;letter-spacing:0;color:#E3735C">one accent</em>.</h2>
  </div>
  <p style="font-size:20px;line-height:1.6;color:rgba(15,29,46,.72);margin:0;max-width:560px;text-wrap:pretty">One or two sentences. Never more.</p>
</div>
```
Eyebrow colors: `#B0A99E` on light, `#F2B8C6` on navy.

## 5. The ledger row (the workhorse)

Narrow label column (`.62fr`) + content column (`1fr`), separated by top hairlines. Three variants:

**a) Dash list** (`plain: true`) — 9px×1.5px dash marker, `translateY(-4px)`, in the row's accent.
**b) Stepped sequence** (`seq: true`) — 30px circled numerals joined by a 1px gradient connector; each item has
   `v` (01/02/03), `line` (false on the last), `t`, `tag` (uppercase stage/qualifier), `d`. Teal accent.
**c) Numbered ledger** (ROI/outcomes) — serif italic numeral + Lato 700 title left, description right, `border-bottom` per row.

Row data shape:
```js
{kicker: "How to begin", t: "Start with one, add the rest", label: "#A8412F", dot: "#E3735C", plain: true,
 sub: "Optional third line under the headline, max-width 330px.",
 items: [{t: "Bold lead.", d: "Rest of the sentence."}]}
```
Accent rotation across rows: coral (`#A8412F`/`#E3735C`) → teal (`#1F6B73`/`#4FB3BF`) → blue (`#2D5A87`/`#5B9BEA`).

## 6. Standard rows every orbit page carries

| Kicker | Headline | Content |
|---|---|---|
| Three audience rows | For the patient / For your team / For the program *(or worker / crew / company)* | 4 short items each |
| How to begin | Start with one, add the rest | the 4 orbits or tracks available |
| Single orbit, multiple versions | *stepped* | the 3 versions, by stage or by reader |
| How it deploys | Issued from the workflow you already run | "From the CareOrbit app, a scheduled flat file from any EHR, a patient list, a QR code, or a text message." + No new FTEs / White-label / Live in a quarter |

## 7. Navy problem panel

Header pair → hairline → **"What the gap costs"** bridge line (eyebrow + one sentence tying the figures to
comprehension) → uniform 4-column hairline stats (`data-stat5`, `gap:32px`, `margin-top:-14px`) → source footnote.

Stats are identical: Lato **300**, `clamp(30px,3.2vw,42px)` (one may go to `clamp(34px,3.8vw,50px)` for emphasis),
blush uppercase label, `#B9C8D8` description, uppercase source at `margin-top:auto`. No boxes, no borders, no highlight card.

## 8. Evidence section *(only on pages that have evidence — see §2)*

Ledger row: left = pill tag + source line + Lato 900 finding headline + honest paragraph + `<dc-import name="StudyRequest">`;
right = 2×2 stats, each under its own hairline. Then a **Voices** ledger row with two serif pull-quotes (no cards).

When the section is present, the download is **always gated**:
```html
<dc-import name="StudyRequest" label="Request a copy of the pilot summary" heading="Request the pilot summary"
  blurb="Enter your work email and we will send you the full nine-month pilot summary."
  hint-size="100%,60px"></dc-import>
```
Do NOT pass a `file` attribute: at this time only the 2-page info sheets (in `sheets/`) are offered as direct downloads. Study and pilot summaries are request-by-email only — `StudyRequest` without a file shows "we will email your copy shortly" after submit.
Available PDFs: `CareOrbit-Siteman-Pancreatic-Study.pdf`, `CareOrbit-Pritikin-ICR-Pilot.pdf`.
No standalone study/pilot pages — the gated form replaces them.
On a page with no evidence (BehavioralSafety today), omit this section entirely rather than showing an empty or padded one.

## 9. Conversion points

Two per page: the hero and the closing CTA. Both say "Book a 20-minute intro call". The old mid-page nudge after the outcomes ledger has been removed everywhere; do not reintroduce it.

## 10. Language rules

- Never the word **"link"** for the patient artifact. Use *orbit*, *guide*, or *the same guide*. "No new app or login."
- Never **em dashes**. Use commas, colons, or a period.
- Never **"catalog"** — it is an orbit **library**.
- "Acquisition" means **new patient acquisition** (helping people choose the practice), not just pre-diagnosis education.
- Standard value sentence, adapted per line: *"Your instructions and your best guidance, delivered when each one actually
  matters. Alongside the [existing artifact] and the [existing touchpoint], an orbit adds a consumer-grade digital mentor:
  engaging video, email, and text outreach that keeps patients informed, reassured, and on track between visits."*
  CareOrbit **adds to** existing tools; it never replaces the folder or the phone call.
- Evidence honesty: pilots are labeled observational, oncology figures applied elsewhere are a **"modeled transfer,
  not a measured [specialty] result"**, models are labeled models, and placeholders stay visibly `[Placeholder: …]`.
- Only real, sourced numbers. Trial: +65% understanding, −53% calls, −41% readmissions, +22% satisfaction,
  9-in-10 navigation (Siteman controlled trial) — usable on clinical pages, always labeled a modeled transfer off oncology.
  Not used on BehavioralSafety. Pritikin pilot: 187 invited, 52% vs 24% ICR starts, 32% combined,
  9 months, "a leading Midwest health system" (never name UnityPoint; CHI data was withdrawn).
- No duplicated phrasing between a heading and the paragraph beneath it; no word repeated from the hero in the
  overview paragraph.

## 11. Required responsive rules

```css
@media(max-width:1020px){[data-hdr],[data-hero-grid],[data-split],[data-two]{grid-template-columns:1fr!important;gap:32px!important}
  [data-value]{grid-template-columns:1fr!important;gap:34px!important}
  [data-povrow]{grid-template-columns:1fr!important;gap:12px!important}
  [data-start]{grid-template-columns:1fr!important;gap:24px!important}[data-start]>a{justify-self:start}}
@media(max-width:1100px){[data-stat5]{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:26px!important}}
@media(max-width:700px){[data-stat5]{grid-template-columns:1fr!important}}
@media(max-width:820px){[data-study]{grid-template-columns:1fr!important;gap:28px!important}}
@media(max-width:960px){[data-catalog]{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:0 32px!important}}
@media(max-width:620px){[data-catalog]{grid-template-columns:1fr!important}}
@media(prefers-reduced-motion:reduce){[data-rv]{transition:none;opacity:1;transform:none}}
```
Every major block gets `data-rv` (scroll reveal from `motion.js`). Image placeholders are `<image-slot>` with a
**stable unique id** (`cardiology-value`, `ortho-value`, `safety-crew`) so dropped images survive edits.

## 12. Build checklist

- [ ] Section order and paddings match §2
- [ ] No tiles, arrows, connector rails, or white quote cards
- [ ] Overview section has no eyebrow; bottom padding is 40px
- [ ] Three audience rows, 4 items each, accents rotate coral → blue → light blue
- [ ] "Single orbit, multiple versions" stepped row present, connector line off the last item
- [ ] Navy panel: bridge line + 4 uniform hairline stats + source footnote
- [ ] Evidence row + gated `StudyRequest` + Voices row, placed **before** the library — *or* deliberately omitted per §2 because the line has no evidence yet
- [ ] Mid-page CTA nudge present; three total "Book a 20-minute intro call" buttons
- [ ] Language rules §10 pass (no link/em dash/catalog, no duplicated phrasing)
- [ ] All `{{ }}` holes resolve; all responsive rules from §11 present
- [ ] Image slots have unique stable ids


## Orbit accent colors (added Aug 2026)

Coral #E3735C stays the shared action color on every page: italic Source Serif accent words, CTA hovers, link hovers, highlighted stat borders. Do not vary it per orbit.

Each orbit carries an identity color, taken from its dot on the Home tile gallery. It appears in exactly three places:
1. A 9px dot chip immediately before the hero eyebrow.
2. The hero eyebrow text, in the darkened variant (the tile color itself fails contrast on #FAF8F4).
3. On navy panels: all eyebrow labels, stat labels, catalog numbers, and a 2px top rule on the stat cards (replacing the old 1px #2D5A87 hairline). Navy panels use the tile color directly; it is legible on #0F1D2E.

| Orbit | Tile / on-navy | Dark variant (light bg) |
|---|---|---|
| Oncology | #4FB3BF | #1F7B87 |
| Cardiology | #5B9BEA | #2D5A87 |
| Orthopedics | #E3735C | #B84A34 |
| Women's Health | #C0A5E8 | #6A4E9C |
| Bariatrics | #4FB3BF | #1F7B87 |
| Behavioral Health | #E9C46A | #8A6516 |
| Medication Therapy | #C0A5E8 | #6A4E9C |
| Surgical Support | #5B9BEA | #2D5A87 |
| Behavioral Safety | #E9C46A | #8A6516 |

Blush #F2B8C6 is retired from navy panel labels. It survives only on status chips such as "Pilot with results" and inside the generated ROI PDF, which keeps the original palette.

Pages with a green status badge before the eyebrow (BehavioralSafety, CommunityResearch) skip the dot chip; the badge already supplies the color.
