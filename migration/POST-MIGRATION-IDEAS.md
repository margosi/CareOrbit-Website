# Post-migration improvement candidates

Behaviours preserved as-is during the migration for fidelity. None are
changed by the migration; each is a candidate for a deliberate decision
AFTER the conversion is signed off.

Items 1-7 are cosmetic or content questions with no deadline. **Item 8 is
worth deciding before the repository is created.**

## 1. Platform quote carousel: 7 quotes, 5 reachable
`components/platform/QuoteCarousel.tsx`

The strip renders **seven** quotes, but the index is clamped to `0..4` and
the progress bar is computed as `(q + 1) / 5`. Stepping forward therefore
stops at index 4: the last two quotes are only ever partially visible as the
tail of the strip, never brought to the front, and the progress bar reads
100% while two quotes remain.

Preserved exactly, per explicit instruction (Phase 4 acceptance). Options
later: raise the bound to `QUOTES.length - 1` and compute progress from the
same length, or trim the array to five. Either changes what visitors can
reach, so it is a content decision, not a code cleanup.

## 2. Copy typo, Platform feature 5
`lib/platform.ts` — the fifth feature tab ends:

> "...when systems choose who to partner **withr quarterly reviews**."

Copy is brief-locked, so this was transcribed verbatim. Looks like a merge
artefact. Needs a copy decision, not a code fix.

## 3. Missing PDF: Primary Care info sheet
`sheets/careorbit-primary-care-2-page.pdf` is referenced by
`PrimaryCarePage.dc.html:568` but does not exist (404 on the live site).
Found in Phase 0. The Primary Care sheet request will fail until the file is
supplied.

## 4. Legacy `/login` page
Orphaned on the legacy site (zero inbound links). Excluded from the
production build per decision; source preserved in the frozen snapshot.

## 5. Duplicate image files
Re-measured against what actually shipped in `public/images/`: **two** pairs
of byte-identical PNGs saved under different names, **3.6 MB** recoverable.

```
capture-hero-2.png  = offering-capture-2.png
primarycare-hero.png = tile-primarycare.png
```

(The Phase 0 note said ten groups and 17.7 MB; that was measured across the
whole legacy folder, including images the site never loads.)

Phase 10 solved *delivery* — a duplicate costs nothing extra to a visitor,
since both names resolve to the same optimised bytes. De-duplicating the
files is a repository-weight question, and it means choosing which name is
canonical and updating the reference. Low value on its own; worth folding
into item 8 if that is done.

## 6. Behavioral Risk: the "where it lands" list is one column on tablets

`BehavioralSafety.dc.html` declares `[data-costgrid]{grid-template-columns:1fr 1fr}`
inside its `max-width:1020px` block, which reads as an intent to keep the
six-item list two-up down to 700px. The declaration has never taken effect:
the global `responsive.css` selector that collapses it,
`div[style*="grid-template-columns: 1fr 1fr"]`, is specificity 0-1-1 against
the page rule's 0-1-0, and both are `!important`.

So today the list renders in a single column from 1020px down, which is what
the Phase 0 baseline captured and what the migration reproduces.

If two-up on tablets was the real intent, raise the page rule's specificity
(e.g. `div[data-costgrid]`) and re-baseline that page. Cosmetic only, no copy
change. Not done during the migration because it would be a visible design
change rather than a port.


## 7. Pritikin pilot: the cohort figures stay two-up on tablets

Same shape as item 6, on `/evidence/pritikin-pilot`. `PritikinPilot.dc.html`
declares `[data-restat]{grid-template-columns:1fr}` at 900px, which reads as
an intent to stack the four cohort figures on a tablet. It has never taken
effect: the figures are declared inline as `repeat(4, minmax(0,1fr))`, and
the global `responsive.css` selector that matches that is specificity 0-1-1
against the page rule's 0-1-0, with `!important` on both.

So today they render two-up at 768px (measured: `347px 347px`), which is
what the baseline captured and what the migration reproduces. The `gap:18px`
from the same rule *does* apply.

If one-up was the intent, raise the page rule's specificity (e.g.
`div[data-restat]`) and re-baseline. Cosmetic only, no copy change.

## 8. Source image weight in the repository — DECIDE BEFORE THE FIRST COMMIT

`public/images/` is **170 MB across 93 PNGs**, with a dozen over 2.4 MB.
Delivery is already handled - Phase 10 turns on `next/image`, so visitors
receive resized AVIF/WebP, not these files - but the masters still sit in
the repository and in every deployment.

Options, cheapest first:
1. **Lossless recompression** (`oxipng -o4 --strip safe`). Identical pixels,
   typically 10-30% smaller. No visual risk, no re-baseline needed.
2. **Downscale the masters.** Nothing is displayed above ~1440px CSS
   pixels; several sources are far larger than any rendered size. This
   changes the masters, so it wants a re-baseline.
3. **Move the masters out of the repo** (object storage or Git LFS) and
   keep only what the site serves.

Not done during the migration: (1) needs a tool that is not installed here,
and (2) and (3) change the assets themselves, which is the user's call.

**Timing matters.** This is easy to fix before 170 MB enters git history and
awkward afterwards, so it is worth settling before the repository is
initialised rather than after. Option (1) is lossless — identical pixels, so
no re-baselining and no re-verification.
