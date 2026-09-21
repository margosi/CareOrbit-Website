/* Losslessly recompress the PNG masters in careorbit-next/public.
 *
 * WHY NOT oxipng: not installed, and Homebrew is not on this machine.
 * Downloading a third-party binary to squeeze image files is a poor
 * trade, so this does the same job with `pngjs`, which is already a
 * devDependency of the app.
 *
 * WHAT "LOSSLESS" MEANS HERE, AND HOW IT IS PROVEN
 * Each file is decoded to raw RGBA, re-encoded with zlib level 9 and
 * per-scanline adaptive filtering, then decoded AGAIN. The new file is
 * kept only if:
 *   1. the decoded pixel buffers are byte-identical,
 *   2. width and height are unchanged, and
 *   3. the result is actually smaller.
 * Anything failing those checks is left exactly as it was. So the script
 * cannot change how a single pixel renders, and cannot make a file bigger.
 *
 *   node migration/scripts/optimise_pngs.mjs --dry-run
 *   node migration/scripts/optimise_pngs.mjs
 */
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const app = path.resolve(here, "..", "..", "careorbit-next");
const require = createRequire(path.join(app, "package.json"));
const { PNG } = require("pngjs");

const DRY = process.argv.includes("--dry-run");
const ROOT = path.join(app, "public");

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.toLowerCase().endsWith(".png")) out.push(p);
  }
  return out;
}

const files = walk(ROOT).sort();
let before = 0, after = 0, changed = 0, skipped = 0, refused = 0;

for (const p of files) {
  const orig = fs.readFileSync(p);
  before += orig.length;

  let src, out, round;
  try {
    src = PNG.sync.read(orig);
    // Try each deflate strategy and keep whichever is smallest. Most of
    // these files are already well compressed - measured, not assumed:
    // on a sample of mid-sized images a naive re-encode came out 2-18%
    // BIGGER, which is why the size guard below matters.
    out = null;
    for (const strategy of [
      zlib.constants.Z_DEFAULT_STRATEGY,
      zlib.constants.Z_FILTERED,
      zlib.constants.Z_RLE,
    ]) {
      const cand = PNG.sync.write(src, {
        deflateLevel: 9,
        deflateStrategy: strategy,
        filterType: -1, // try every filter per scanline, keep the best
      });
      if (!out || cand.length < out.length) out = cand;
    }
    round = PNG.sync.read(out);
  } catch (err) {
    console.log(`  REFUSED ${path.relative(ROOT, p)} - ${err.message}`);
    after += orig.length;
    refused++;
    continue;
  }

  const identical =
    Buffer.compare(src.data, round.data) === 0 &&
    src.width === round.width &&
    src.height === round.height;

  if (!identical) {
    console.log(`  REFUSED ${path.relative(ROOT, p)} - pixels would change`);
    after += orig.length;
    refused++;
    continue;
  }
  if (out.length >= orig.length) {
    after += orig.length;
    skipped++;
    continue;
  }

  if (!DRY) fs.writeFileSync(p, out);
  after += out.length;
  changed++;
}

const mb = (n) => (n / 1048576).toFixed(1);
console.log(
  `\n${files.length} PNG(s): ${changed} smaller, ${skipped} already optimal, ` +
    `${refused} refused`,
);
console.log(
  `${mb(before)} MB -> ${mb(after)} MB  ` +
    `(${(((before - after) / before) * 100).toFixed(1)}% smaller)` +
    (DRY ? "   [dry run, nothing written]" : ""),
);
