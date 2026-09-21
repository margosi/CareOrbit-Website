/* Migration-only switches.
 *
 * EXACT_PIXELS
 *   next/image re-encodes source images (WebP/AVIF) and resizes them to the
 *   nearest configured deviceSize. That is the right production behaviour,
 *   but it changes pixels - so while the conversion was in flight every
 *   page diff would have shown a small delta on every photo, drowning out
 *   real regressions.
 *
 *   It was `true` for Phases 3-9, serving original bytes so each diff
 *   measured the conversion and nothing else.
 *
 *   PHASE 10 set it to `false`. Images are now optimised the way they will
 *   be in production, and the whole site was re-diffed against the Phase 0
 *   baseline with optimisation ON - so the remaining difference on every
 *   photo has been measured and accepted rather than assumed.
 *
 *   Left in place rather than deleted: flipping it back to `true` is the
 *   fastest way to tell an image-encoding difference from a layout one if a
 *   future diff ever looks odd.
 */
export const EXACT_PIXELS = false;
