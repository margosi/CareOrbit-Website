/* Crop a region out of a PNG for visual inspection.
   usage: node scripts/crop.mjs <in.png> <out.png> <x> <y> <w> <h> [scale] */
import fs from "node:fs";
import { PNG } from "pngjs";
const [, , IN, OUT, x0, y0, w, h, scale = "1"] = process.argv;
const src = PNG.sync.read(fs.readFileSync(IN));
const s = Number(scale),
  W = Math.round(Number(w) * s),
  H = Math.round(Number(h) * s);
const out = new PNG({ width: W, height: H });
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++) {
    const sx = Math.min(src.width - 1, Number(x0) + Math.round(x / s));
    const sy = Math.min(src.height - 1, Number(y0) + Math.round(y / s));
    const si = (src.width * sy + sx) << 2,
      di = (out.width * y + x) << 2;
    for (let c = 0; c < 4; c++) out.data[di + c] = src.data[si + c];
  }
fs.writeFileSync(OUT, PNG.sync.write(out));
console.log(`wrote ${OUT} (${W}x${H})`);
