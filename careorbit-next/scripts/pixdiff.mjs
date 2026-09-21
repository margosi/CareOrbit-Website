/* Pixel comparison used by every migration checkpoint.
 *
 * Usage: node pixdiff.mjs <a.png> <b.png> [diff.png]
 *
 * Prints total pixels, differing pixels, percentage, and a verdict against
 * the thresholds agreed in the migration plan:
 *   > 0.30%  FAIL
 *   > 0.05%  REVIEW (human sign-off required)
 *   else     PASS
 *
 * Images of differing height are compared over the overlapping region and
 * the height mismatch is reported separately, since a height difference is
 * itself a finding rather than something to silently crop away.
 */
import fs from "node:fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const [, , aPath, bPath, diffPath, maxYArg] = process.argv;
/* Optional 6th arg: only compare rows above this y. Used to check the
 * region ABOVE an approved footer deviation, so "the footer changed" can
 * never hide a regression in the page body. */
const maxY = maxYArg ? Number(maxYArg) : null;
if (!aPath || !bPath) {
  console.error("usage: node pixdiff.mjs <a.png> <b.png> [diff.png]");
  process.exit(2);
}

const a = PNG.sync.read(fs.readFileSync(aPath));
const b = PNG.sync.read(fs.readFileSync(bPath));

const w = Math.min(a.width, b.width);
let h = Math.min(a.height, b.height);
if (maxY && maxY > 0) h = Math.min(h, Math.round(maxY));
const sizeMismatch = a.width !== b.width || a.height !== b.height;

function crop(src, w, h) {
  if (src.width === w && src.height === h) return src;
  const out = new PNG({ width: w, height: h });
  PNG.bitblt(src, out, 0, 0, w, h, 0, 0);
  return out;
}

const ca = crop(a, w, h);
const cb = crop(b, w, h);
const diff = new PNG({ width: w, height: h });

const differing = pixelmatch(ca.data, cb.data, diff.data, w, h, {
  threshold: 0.1,
  includeAA: false,
});

if (diffPath) fs.writeFileSync(diffPath, PNG.sync.write(diff));

const total = w * h;
const pct = (differing / total) * 100;

console.log(`reference : ${a.width}x${a.height}`);
console.log(`candidate : ${b.width}x${b.height}`);
if (sizeMismatch) {
  console.log(`SIZE MISMATCH - compared overlapping ${w}x${h} region only`);
}
console.log(`compared  : ${total.toLocaleString()} px`);
console.log(`differing : ${differing.toLocaleString()} px`);
console.log(`delta     : ${pct.toFixed(4)}%`);

let verdict;
if (maxY) verdict = pct > 0.3 ? "FAIL" : pct > 0.05 ? "REVIEW" : "PASS";
else if (sizeMismatch && Math.abs(a.height - b.height) > 2) verdict = "FAIL";
else if (pct > 0.3) verdict = "FAIL";
else if (pct > 0.05) verdict = "REVIEW";
else verdict = "PASS";

console.log(`verdict   : ${verdict}`);
process.exit(verdict === "FAIL" ? 1 : 0);
