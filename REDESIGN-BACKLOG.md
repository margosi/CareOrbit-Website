# Redesign backlog

Findings from the technical SEO / accessibility / performance pass that were
**deliberately not fixed**, because fixing them means making design decisions
rather than infrastructure ones. Recorded here so they are not rediscovered
from scratch.

Everything below was measured against the production build on
`site-refresh`, not estimated.

---

## 1. Contrast failures in the brand palette — the significant one

Measured with a WCAG 2.1 contrast calculation over computed styles on all 28
routes, counting only text on **solid** backgrounds (text over photographs is
item 2, and cannot be judged mechanically).

| Colour | Ratio | Required | Instances | Routes | Example |
|---|---|---|---|---|---|
| `rgb(176,169,158)` warm grey | **2.20** | 4.5 | ~40 | **18** | `HOW IT REACHES PATIENTS` eyebrow, 10.5–12.5px |
| `rgb(91,155,234)` `#5B9BEA` | **2.70** | 4.5 | 11 | 11 | `FOR THE PROGRAM` label, 11px |
| `rgb(227,115,92)` `#E3735C` coral | **3.06** | 4.5 | 8 | 6 | `Platform` nav item, `Co-founder & CEO`, 13.5–15px |
| `rgb(176,90,70)` | 4.09–4.18 | 4.5 | 4 | 2 | `STEP 04`, 12–12.5px |
| `#E3735C` at 40px | 2.88 | 3 | 9 | 2 | `+65%` stat numerals |
| `#4FB3BF` at 40px | 2.32 | 3 | 7 | 2 | `87%` stat numerals |
| `#5B9BEA` at 40px | 2.70 | 3 | 5 | 2 | `−53%` stat numerals |

**Start with the warm grey.** At 2.20 it is less than half the required
ratio, and it carries the eyebrow label on two thirds of the site. It is a
single palette value, so one decision fixes ~40 instances.

The large stat numerals only need 3:1 and miss by a little; darkening the
coral and teal slightly would clear both those and the 15px uses.

This was not fixed during the infrastructure pass because changing brand
colours is a design decision, and the instruction was explicitly not to alter
the visual design to resolve a redesign-dependent issue.

## 2. Text over photographs

A separate set of instances where light text sits on a photographic
background. Contrast there depends on the specific pixels behind each glyph,
so it needs a human eye, or a scrim/overlay that guarantees a floor. Worth
deciding as a **pattern** during the redesign (e.g. every photo that carries
text gets a defined gradient scrim) rather than case by case.

## 3. Open Graph share image

**None exists.** `lib/seo.ts` has the full architecture wired — `OG_IMAGE`
plus a per-page `image`/`imageAlt` override on `metadataFor()` — but
`OG_IMAGE` is deliberately `undefined`, so link previews currently show title
and description with no picture. That is honest; a cropped photograph
pretending to be a share card is not.

**Requirement when the card is designed:**

- **1200 × 630 px**, PNG or JPG, under ~1 MB
- Logo present, and the important content inside a centred safe area —
  Twitter/X crops the edges on some surfaces
- Legible at ~300px wide, which is how it appears in a Slack unfurl

Then set `OG_IMAGE` in `lib/seo.ts`. Nothing else has to change; `twitter:card`
already switches from `summary` to `summary_large_image` automatically when an
image is present.

## 4. Apple touch icon

`app/icon.png` exists and is a genuine extraction of the orbit mark from the
wordmark, but the **only** source is 58×60 px inside `careorbit-logo-nav2.png`.
There is no higher-resolution mark anywhere in the project.

Apple touch icons want **180 × 180**. Upscaling 58px to 180px would look soft,
so this needs a real vector or high-resolution mark from the brand files.
Add it as `app/apple-icon.png` and Next wires it automatically.

## 5. Final SEO copy

Titles and descriptions are the generated set from the migration closeout,
preserved verbatim: every `title` is the page's existing nav label or hero
eyebrow, every `description` is that page's own hero paragraph cut at a
sentence boundary. The full table is `PAGE_SEO` in `lib/seo.ts`, and it is the
only place that wording lives.

When messaging is revised, these should be revisited as **search-result copy**
in their own right rather than as truncated hero text. The sourcing rules in
`CLAUDE.md` still apply: only real, sourced numbers, models labelled as models.

## 6. JavaScript and client components

- **539 KB of script** on `/orbits/cardiology`, a page that is almost entirely
  static content.
- **22 files carry `"use client"`.** Several exist for small interactions
  (disclosure toggles, segment tabs) that could be server components with a
  much smaller island, or no JavaScript at all.

Not touched during the infrastructure pass because these are exactly the
components the redesign is likely to replace, so the work would be discarded.
Worth designing the new components with this budget in mind from the start.

## 7. Lazy-loading behaviour

Across 84 page loads, **25 images report `complete === false`** at capture
time with **zero HTTP errors** — they are lazy-loaded and had not decoded yet,
not missing. Identical before and after the image optimisation, so it is
pre-existing and not a regression.

Not a fault, but when hero and tile components are rebuilt it is worth
deciding explicitly which images are `priority` (above the fold) and which are
lazy. Home currently has **8 images with no intrinsic dimensions**, which is
the classic CLS risk even though measured CLS is currently fine.

## 8. Core Web Vitals

Baseline on the production build, measured locally — LCP numbers are localhost
and meaningful only relative to each other.

| Page | LCP | CLS | Page weight |
|---|---|---|---|
| Home | 128 ms | 0.0065 | 732 KB |
| Platform | 1008 ms | 0.0075 | 636 KB |
| Engage | 964 ms | 0.0065 | 461 KB |
| Cardiology | 72 ms | 0.0065 | 745 KB |
| Primary Care | 52 ms | 0.0080 | 712 KB |
| Outcomes | 972 ms | 0.0080 | 526 KB |

**CLS is genuinely good** — 0.0065–0.008 against a 0.1 threshold. Protect that
through the redesign; it is easy to lose and hard to win back.

Platform, Engage and Outcomes are ~1 s where Cardiology and Primary Care are
under 130 ms. That gap is worth understanding before the redesign locks in new
layouts. Real Core Web Vitals work needs field data from a deployed site, not
localhost.

## 9. Remaining page weight

`public/` is **101.56 MB**, of which **83.44 MB is `sheets/`** — the sixteen
2-page PDFs. They are downloadable collateral, all reachable, and were left
alone deliberately. If repository weight matters later, that is where it is;
recompressing them is a separate, reviewable piece of work.

Two byte-identical image pairs were also left unconsolidated
(`offering-capture-2` / `capture-hero-2`, `tile-primarycare` /
`primarycare-hero`) — worth ~0.36 MB after the WebP conversion, and they may
legitimately diverge during the redesign.
