# CareOrbit migration workspace

Working area for the `v2-maven` → Next.js conversion. **Nothing in this folder is part
of the live site.** The live site remains `v2-maven/`, served exactly as before.

## Locked decisions

| # | Decision | Value |
|---|---|---|
| 1 | Language | **TypeScript** |
| 2 | URL shape | **Nested** (`/orbits/cardiology`, `/platform/engage`, `/pricing/assess`, `/evidence/siteman-study`) |
| 3 | `/login` | **Excluded from the production site.** Source preserved in the snapshot. Do not create a route unless explicitly requested. |
| 4 | Image slots | **Plain image files in `public/images/`.** Preserve existing image relationships and the visible `[Placeholder: …]` labels. No CMS, no admin uploader during this migration. |
| 5 | Print templates | **All preserved**, along with their PDF outputs. Not deleted, redesigned, or retired. **Closeout: they stay OUT of the Next.js production site and remain in `v2-maven/`.** See the note below. |
| 6 | Visual review | **Approved at closeout** after review of all 28 pages on `localhost:3000`. |
| 7 | Titles / meta descriptions | **Keep the generated set** (derived from existing on-page copy). Revisit as a content task, not a migration one. |
| 8 | Production hostname | **`careorbit.com`.** Drives every canonical and the sitemap. |

### Print templates: where they ended up

The four print-template files (`PancreaticStudy-print`,
`PrimaryCareSheet-print`, `PritikinPilotSummaryPDF-print`,
`PritikinPilotSummaryPDF`) are unlinked internal authoring tools. Nothing on
the site links to them and none has a Phase 0 baseline, so they were never
in the converted page list.

- Their **PDF outputs are fully preserved** in the Next app:
  `public/sheets/` (15) and `public/evidence-docs/` (3).
- The **templates themselves are untouched** in `v2-maven/` and still run
  there exactly as today.
- They are **not** routes in the Next app, and are **not** redirected.

Rebuilding them as React routes was outside the page list, and shipping the
dc-runtime into production to host them would defeat the migration.

**Resolved at closeout: they stay out of the Next.js production site and
remain in `v2-maven/`, where they still run as they do today.** Nothing was
deleted. If a print template needs changing, edit it in `v2-maven/` and
re-export the PDF into `careorbit-next/public/sheets/` or
`public/evidence-docs/`.

The in-page `#print-only` ROI print sheet — a different thing with a similar
name — **is** fully ported, on all five pages that have a calculator.

## Layout

```
migration/
├─ reference/v2-maven-snapshot/   frozen, read-only, byte-for-byte copy of v2-maven
├─ baseline/<width>px/<Page>.png  reference screenshots, 29 pages x 5 widths
├─ manifest/                      asset + page inventory (JSON/CSV)
└─ scripts/                       verification harness (see below)
```

## The verification harness

| Script | What it proves |
|---|---|
| `verify_all.py` | Pixel-diffs **every** migrated page at 5 widths and summarises. Takes `--base`, so a Vercel preview can be diffed against the same baseline. Skips any route the server does not serve, so a stale build cannot look like a regression. |
| `verify_page.py` | One page. Classifies each width as PASS / PASS-FRAMING-FLOOR / EXPECTED-DEVIATION / REVIEW-BODY-ALSO-DIFFERS / FAIL, and re-diffs the region **above the footer** whenever an approved footer deviation is claimed. |
| `audit_responsive.py` | Computed `grid-template-columns`, padding, text-align and rendered x-position, legacy vs new, keyed on (tag, child count, text). |
| `audit_typography.py` | Computed font-size, line-height, max-width and colour of every substantial text node. Catches a paragraph transcribed with the wrong style, which no other tool sees. |
| `diff_text.py` | Rendered text line by line. Reports `image-slot` shadow-DOM placeholder captions separately — they are invisible to `innerText` on the legacy side. |
| `verify_chrome.py` | Nav / announcement bar / footer element diffs and interactions. |
| `check_forms.py` | The three forms still download, unlock and open Calendly. |
| `check_lead_api.py` | `/api/lead` behaviour, plus a grep of the built client bundle for every secret variable name. |
| `check_behavioral_calc.py` | The Behavioral Risk audience toggle and ROI arithmetic. |
| `routes.py` | Baseline name → route map, shared by the sweep. |
| `run_closeout.py` | Runs **all** of the above in order and writes a dated, build-stamped record to `migration/VERIFICATION-RESULTS.md`. This is the one to run after any substantial change. |

Both servers must be up: legacy on `:8000`, the Next app on `:3000`
(`npm run build && npm run start`, not `npm run dev`).

## The snapshot is frozen

`reference/v2-maven-snapshot/` is `chmod a-w`. It is the diff target for every later
phase and must never be edited. To compare the live source against it:

```bash
diff -rq v2-maven migration/reference/v2-maven-snapshot
```

If that prints anything, `v2-maven/` has been modified and the baseline is no longer
trustworthy. To unlock the snapshot deliberately:
`chmod -R u+w migration/reference/v2-maven-snapshot`

## Manifest files

| File | Contents |
|---|---|
| `assets.csv` / `assets.json` | every file: path, bytes, sha256, kind, image dimensions |
| `pages.json` | the 29 production pages and their approved target routes |
| `non_routes.json` | files that exist but are deliberately not routes, with reasons |
| `references.json` | which local assets each page references |
| `missing.json` | referenced-but-absent assets, each with its referrers and whether production is affected |
| `orphans.json` | media present but never referenced |
| `duplicates.json` | byte-identical media stored under more than one name |
| `summary.json` | headline counts |
| `baseline_report.json` | per-page capture record: height, image count, console errors, non-200 responses |

## Regenerating

The harness needs playwright, which the system interpreter does not have.
`migration/.venv` is that environment; it is git-ignored, so recreate it once
per machine:

```bash
python3 -m venv migration/.venv
migration/.venv/bin/pip install playwright
```

The cached browsers live in `~/Library/Caches/ms-playwright`; if that is empty,
add `migration/.venv/bin/playwright install chromium`.

The local server must be running first:

```bash
python3 -m http.server 8000      # from the project root
```

```bash
python3 migration/scripts/build_manifest.py
<venv>/bin/python migration/scripts/capture_baseline.py
<venv>/bin/python migration/scripts/capture_baseline.py --only Home --widths 1440
```

## Capture determinism

Baseline screenshots are captured with three interventions, applied **in the browser
only** — nothing in `v2-maven/` is altered:

1. `prefers-reduced-motion: reduce`, so the site's own CSS resolves `[data-rv]` reveals
   and `.co-ring` sweeps to their final state independent of scroll timing.
2. `setInterval` neutralised before page scripts run, pinning Home's five-image hero
   fader to frame 0. `setTimeout` is left intact because `SiteNav` measures the
   announcement bar with `setTimeout(50)`.
3. Animations and transitions disabled after load, freezing the marquee, float and
   pulse keyframes at their initial position.

Any comparison run against the converted Next.js site **must apply the identical three
interventions**, or the diff is meaningless.

## Known-benign console noise

Every page logs a few 404s that are expected and do not affect rendering:

* `{{ g.src }}`, `{{ e.src }}` and similar — the raw template strings the browser tries
  to fetch once, before the dc-runtime hydrates and replaces them.
* `.image-slots.state.json` — the Claude Design sidecar, which does not exist here.

## Phase 1 outcomes

The Next.js app lives at `careorbit-next/` (project root sibling to `v2-maven/`).
It becomes the repository root in Phase 11.

* Next.js 16.3.5, React 19.2.8, TypeScript, App Router, no Tailwind, no `src/`.
* Fonts are **self-hosted** under their literal family names via
  `app/fonts.css`, generated by `scripts/vendor_fonts.py`. `next/font` is
  deliberately NOT used: it generates hashed family names, which would orphan
  every inline `font-family: Lato` declaration carried over from v2-maven.
* `app/responsive.css` is rewritten from style-substring selectors to explicit
  `data-*` attributes. **The contract in that file's header is binding on every
  component built from Phase 2 onward.**

### Tracked: the `coFloat` keyframe conflict

v2-maven defines `@keyframes coFloat` twice with different values. Today each
page's `<style>` is self-scoped so they never collide; a single global
stylesheet cannot hold both.

| Variant | Value | Used by |
|---|---|---|
| A (global in `globals.css`) | `translateY(-7px)` → `translateY(9px)` | 14 production pages |
| B (**needs page-scoped override**) | `translateY(0)` → `translateY(-12px)` | `CommunityResearch` only |

**Action required in Phase 6b:** when `CommunityResearch` is converted, give it
a locally scoped `coFloat` or its float animation will silently inherit
variant A.

### Also page-specific, do not globalise

`body` background varies by page (seven distinct rules). `globals.css` sets the
31-page majority (`#FAF8F4`); Home (`#0F1D2E`), the print templates
(`#FFFFFF`) and one page (`#F1F6F4`) must override locally.

## Phase 2 outcomes

Shared chrome converted: `SiteNav`, `SiteFooter`, `Reveal`, `CountUp`, `Figure`,
`StatusChip`, plus the `style-hover` replacement.

Checkpoint result: **15/15 element pixel diffs at 0.0000%** (nav, announcement
bar, footer x 5 widths) and **19/19 interaction tests pass**. Verified with
`migration/scripts/verify_chrome.py`.

### The `style-hover` replacement

`support.js` compiled every `style-hover` attribute into a real CSS rule at
runtime, appending `!important` to each declaration (`importantify()` in
`src/pseudo.ts`). The `!important` is load-bearing: base styles are inline and
an inline style beats a class selector.

We do the same thing at build time. `lib/hoverStyles.ts` is the single source
of truth; `npm run gen:hover` regenerates `app/hover.css` from it.
`npm run gen:hover:check` fails if they drift. Zero runtime, real CSS `:hover`,
so touch and keyboard semantics are unchanged. Verified against the original:
colour, border-colour and the `translateY(-1px)` transform matrix all match.

**Generated files are in `.prettierignore`** - formatting them breaks the
drift check.

### Two findings worth a decision

**1. Footer is unusable at 390px - PRE-EXISTING, reproduced deliberately.**
`[data-footer-grid]` is `1.3fr repeat(4, minmax(0,1fr))` with no media query
anywhere in v2-maven. At 390px the four link columns compute to **7.125px
wide** and the text overlaps illegibly. Confirmed on the live site, so the
Phase 0 baseline contains it too. Preserved as-is because fixing it would
break the pixel diff and constitutes a redesign. **A one-line fix is available
on request** (collapse the grid under 900px, as every other grid does).

**2. The nav logo is served `unoptimized`.** `next/image` re-encodes and
resamples the 210x60, 8.4 KB PNG before the browser scales it to 42px tall.
That double resample measurably softened the mark and was the only pixel
difference left in the nav. Serving the original bytes is sharper *and*
smaller than a generated variant at this size.

### Carried forward

* `prefetch={false}` on every `Link` in the chrome, so the nav does not fire
  404s for routes that do not exist yet. **Remove in Phase 8** once all routes
  exist.
* `app/chrome-test/` and `app/specimen/` are temporary harnesses. Delete once
  Phase 3 provides a real page.
* `responsive.css` gained `data-pad="page-top"`, replacing three more
  style-substring selectors that lived in SiteNav's own `<style>` block.

### Approved improvement: image lazy-loading (Phase 3)

`next/image` marks every non-`priority` image `loading="lazy"` (26 of 28 on
Home). v2-maven had no lazy loading at all - `<image-slot>` creates a plain
eager `<img>`, so all 19 Home images loaded up front, including the eight in
the mobile carousel that are `display:none` on desktop and never shown.

**Approved: keep the Next default. Do NOT force `loading="eager"` just to
reproduce the legacy implementation.** It defers roughly 24 MB of below-fold
imagery and skips hidden-carousel images entirely. Fidelity is unaffected -
a screenshot captures the final loaded state.

Consequence for verification: a full-page capture must scroll the page first
or lazy images never load. `verify_page.py` does this, then returns to scroll
position 0 (SiteNav hides on scroll-down and only resets below 80px).

Images inside a `display:none` container never load at all, so an
`IMG-WAIT-TIMEOUT: N pending` is EXPECTED: ~8 carousel images at desktop
widths, and the ~8 desktop-row images at 390px. They are not rendered, so
they cannot affect the diff.

### Phase 3 findings (Home)

**Migration defect, fixed: `Figure` was missing `aspect-ratio: 3/2`.**
`image-slot` declares it on its host. In a CSS grid `1fr` means
`minmax(auto, 1fr)`, so a track cannot shrink below its content's
min-content width - and with the case-study panel's fixed 330px height
image-slot contributes `330 x 1.5 = 495px`, while a `fill` image
contributes 0. Measured at 1440: `495px 571px` (legacy) vs
`479.688px 586.312px`. At 1024 the legacy column pins at 495px while the
unfixed version collapsed to ~367px, which was the whole -89px page-height
delta. Any future component replacing an image-slot must carry the same
aspect-ratio.

**Approved deviation: CSS `object-fit: cover` instead of manual framing.**
image-slot implemented cover by hand - it rendered the `<img>` at 326x399
with a -22px offset and `object-fit: fill`. `Figure` uses CSS
`object-fit: cover`. Visible framing is equivalent; the two rasterise at
different sub-pixel phases, so every photo contributes a small diff.
Ratified: do NOT recreate the manual transform maths. `verify_page.py`
carries this as `IMAGE_FRAMING_FLOOR_PCT`.

**Approved improvement: the mobile hero padding now applies.**
v2-maven's rule `div[style*="padding: 0 64px 72px"]` never matched, because
React serialises the value as `padding: 0px 64px 72px` - `"0px"` is not
`"0"`. Consequence on the live site at 390px: the hero `<h1>` sits at
top -43px while the hero starts at 45px, i.e. **the headline is clipped off
the top of the hero on mobile**. `data-pad="hero"` applies the intended
`0 26px 56px`, so the headline is fully visible.

**Third instance of the same class (awaiting ratification): the intro
paragraph's `margin-left: auto`.** v2-maven's rule
`p[style*="margin-left: auto"]` never matched either - React collapses
`margin: 0` plus `margin-left: auto` into the shorthand
`margin: 0px 0px 0px auto`, so the substring is simply absent. Below
1020px, where the two-column grid collapses, the legacy paragraph stayed
indented at `left: 192px` beneath a left-aligned heading. `data-ml-auto`
applies the intended `margin-left: 0`. Affects 768px and 390px.

### Phase 3 RATIFIED deviations (Home) - carry forward

All approved. Preserve these; do not "restore" legacy behaviour later.

| # | Deviation | Kind |
|---|---|---|
| 1 | `next/image` lazy loading kept (26 of 28 imgs) | implementation improvement |
| 2 | CSS `object-fit: cover` instead of image-slot's manual framing | implementation choice |
| 3 | Mobile hero padding now applies (`data-pad="hero"`) | legacy bug fix |
| 4 | `margin-left: auto` reset now applies (`data-ml-auto`) | legacy bug fix |
| 5 | Footer collapses below 900px / 640px | legacy bug fix (Phase 2) |
| 6 | `Figure` carries `aspect-ratio: 3/2` | migration defect, corrected |

Final Home result: 1440 0.0622%, 1280 0.0727%, 1024 0.0505% (heights exact),
768 0.5286%, 390 1.6681%. Zero unexplained differences, zero regressions.

### SCOPE CAVEAT on data-ml-auto and friends

**Do NOT apply `data-ml-auto` (or any other `data-*` responsive hook) to
another page just because a similar inline-style pattern appears there.**

The legacy selectors were global, but whether each one actually fired
depended on how that specific element's styles serialised - and they failed
in at least three different ways. Every occurrence must be evaluated against
that page's own legacy CSS and its intended responsive behaviour, during
that page's migration phase. Check what the legacy site actually renders
before deciding whether the rule was meant to apply.

### The style-substring selectors failed THREE different ways

All three were silent, and all three are fixed by the data-attribute
rewrite. Note that each failed for a *different* serialization reason, which
is why auditing them one at a time is the only safe approach:

| Rule | Why it never matched |
|---|---|
| `padding: 0 64px 72px` | React writes `0px`, not `0` |
| `margin-left: auto` | React folds it into the `margin` shorthand |
| `grid-template-columns: 1.1fr .9fr` | React writes `0.9fr`, not `.9fr` |

The third did match in practice (React's leading zero happens to agree with
the stylesheet), but it demonstrates the coupling: any of these can flip
with a React version bump. This is risk #1 from the migration plan, observed
three times in production on the most important page.

### Harness must never be able to deadlock

The first Home run hung for 24 minutes at 0% CPU with nothing written. Cause:
the capture waited on `Promise.all` over every incomplete `<img>`, and a lazy
image that never enters the viewport never fires `load` or `error`.
`page.evaluate()` has no timeout in the Python bindings, so neither the
`goto` nor `wait_for_function` timeouts could fire.

`verify_page.py` now has three independent guards. Keep all three:

1. every in-page wait is a `Promise.race` against a timer, so it always resolves
2. the page is scrolled through to trigger lazy images, then returned to the top
3. a `SIGALRM` hard cap per width (`PER_WIDTH_TIMEOUT_S`) - the only thing that
   can interrupt a hung `page.evaluate`

A timed-out image wait is reported as `IMG-WAIT-TIMEOUT`, never silently
screenshotted.

### Measuring lesson, applies to every later phase

Element screenshots are only comparable when the element sits on the same
**sub-pixel** phase in both builds. The footer initially read as 2.55%
different at 390px purely because it sat at y=.39 in one build and y=.50 in
the other, so glyphs rasterised differently and the crop rounded differently.

`window.scrollBy()` with a fractional delta does NOT fix this - Chromium
ignores it. Adjusting `margin-top` does. `verify_chrome.py::snap_element`
implements it; **reuse that helper rather than `locator.screenshot()`.**

## Tooling note

**Node.js 24.21.0 LTS ("Krypton") with npm 11.19.0** is installed at
`/usr/local/bin`, via the official notarised `.pkg`. arm64 native. This matches
Vercel's Node 24 LTS build image, so local and deploy runtimes agree. Pinned in
`careorbit-next/.nvmrc` and `package.json` `engines`.

Baseline screenshot capture still uses the **Python** Playwright bindings from a
venv outside the project (installed during Phase 0, proven against all 145
captures). Pixel diffing uses **Node** via `careorbit-next/scripts/pixdiff.mjs`,
which is where its `pixelmatch`/`pngjs` dependencies resolve from. Consolidating
both onto one runtime is optional cleanup, not a blocker.
