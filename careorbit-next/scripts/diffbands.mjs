/* Locate WHERE two page screenshots differ, by horizontal band.
 *
 * A single "3.4% different" number says nothing about whether the cause is
 * one broken section or uniform drift. This prints the differing percentage
 * per band so the region can be cropped and eyeballed.
 *
 * Usage: node scripts/diffbands.mjs <a.png> <b.png> [bandPx=100] [minPct=1]
 *
 * Must live inside the app: Node resolves ESM imports from the importing
 * file's own path, not from cwd, so pngjs is only findable from here.
 */
import fs from "node:fs";
import { PNG } from "pngjs";

const [, , A, B, bandArg = "100", minArg = "1"] = process.argv;
if (!A || !B) {
  console.error(
    "usage: node scripts/diffbands.mjs <a.png> <b.png> [band] [minPct]",
  );
  process.exit(2);
}

const a = PNG.sync.read(fs.readFileSync(A));
const b = PNG.sync.read(fs.readFileSync(B));
const band = Number(bandArg);
const minPct = Number(minArg);

const h = Math.min(a.height, b.height);
const w = Math.min(a.width, b.width);

console.log(
  `baseline ${a.width}x${a.height}   candidate ${b.width}x${b.height}`,
);
if (a.height !== b.height) {
  console.log(
    `height delta ${b.height - a.height > 0 ? "+" : ""}${b.height - a.height}px`,
  );
}

let worst = { y: 0, pct: 0 };
for (let y0 = 0; y0 < h; y0 += band) {
  let diff = 0;
  let n = 0;
  for (let y = y0; y < Math.min(y0 + band, h); y += 2) {
    for (let x = 0; x < w; x += 2) {
      const i = (a.width * y + x) << 2;
      const j = (b.width * y + x) << 2;
      const d =
        Math.abs(a.data[i] - b.data[j]) +
        Math.abs(a.data[i + 1] - b.data[j + 1]) +
        Math.abs(a.data[i + 2] - b.data[j + 2]);
      if (d > 30) diff++;
      n++;
    }
  }
  const pct = (100 * diff) / n;
  if (pct > worst.pct) worst = { y: y0, pct };
  if (pct > minPct) {
    console.log(
      `  y ${String(y0).padStart(6)}-${String(y0 + band).padStart(6)}  ${pct.toFixed(2)}%`,
    );
  }
}
console.log(`worst band: y ${worst.y} at ${worst.pct.toFixed(2)}%`);
