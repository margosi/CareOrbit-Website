#!/usr/bin/env python3
"""
Catch elements that the legacy GLOBAL responsive.css collapsed but the
converted page does not (or vice versa).

WHY THIS EXISTS
v2-maven's responsive.css matched inline style substrings, e.g.
    div[style*="grid-template-columns: 1fr 1fr"]
Those rules were GLOBAL: they hit every matching element on every page,
including ones with no page-level data attribute. In the rewrite each such
element must carry an explicit data-* hook. Miss one and the page silently
renders a two-column grid where the legacy site rendered one - which is
exactly what made the Assess eScreening block 245px short at 768px, without
tripping any per-page threshold.

WHAT IT DOES
Loads the legacy page and the converted page side by side at each width and
compares the computed grid-template-columns of every grid element, in DOM
order. A mismatch names the element so the missing tag can be added.

    audit_responsive.py AssessPage /platform/assess --widths 1440,1024,768,390
"""
import argparse
import sys
import time

LEGACY = "http://localhost:8000/v2-maven/"
NEW = "http://localhost:3000"

# Every property the legacy GLOBAL stylesheets governed by style-substring:
# grid columns, paddings, margin-left:auto, text-align, and the hero height.
COLLECT = """() => {
  const out = [];
  for (const el of document.querySelectorAll('*')) {
    const cs = getComputedStyle(el);
    const isGrid = cs.display === 'grid' || cs.display === 'inline-grid';
    const padded = cs.paddingTop !== '0px' || cs.paddingLeft !== '0px';
    const mlAuto = cs.marginLeft !== '0px';
    const aligned = cs.textAlign === 'right';
    if (!isGrid && !padded && !mlAuto && !aligned) continue;
    const r = el.getBoundingClientRect();
    out.push({
      tag: el.tagName.toLowerCase(),
      cols: isGrid ? cs.gridTemplateColumns : '',
      pad: cs.padding,
      ml: cs.marginLeft,
      ta: cs.textAlign,
      left: Math.round(r.left),
      w: Math.round(r.width),
      h: Math.round(r.height),
      kids: el.children.length,
      txt: (el.textContent || '').replace(/\\s+/g, ' ').trim().slice(0, 40),
    });
  }
  return out;
}"""


def snapshot(pw, url, width):
    b = pw.chromium.launch()
    c = b.new_context(
        viewport={"width": width, "height": 900},
        device_scale_factor=1,
        reduced_motion="reduce",
    )
    c.add_init_script("window.setInterval=function(){return 0;};")
    p = c.new_page()
    p.goto(url, wait_until="networkidle", timeout=90000)
    p.evaluate("() => document.fonts.ready.then(() => true)")
    p.evaluate(
        """async () => {
            const s = Math.max(200, innerHeight * 0.8);
            const h = document.documentElement.scrollHeight;
            for (let y = 0; y < h; y += s) {
              scrollTo(0, y); await new Promise(r => setTimeout(r, 25));
            }
            scrollTo(0, 0); await new Promise(r => setTimeout(r, 200));
        }"""
    )
    time.sleep(0.8)
    data = p.evaluate(COLLECT)
    b.close()
    return data


# Ratified, approved differences. These SHOULD differ from the legacy site;
# reporting them as mismatches would train us to ignore the auditor.
# Keyed by (page, property); value is a substring of the element text.
RATIFIED = {
    # Phase 3: the mobile hero padding now applies. Legacy kept 0 64px 72px
    # because div[style*="padding: 0 64px 72px"] never matched ("0px" != "0").
    ("Home", "padding"): ["Engaged patients are your most"],
    # Downstream of that same fix: with padding-left 26px instead of 64px,
    # everything inside the hero sits 38px further left at 390px. Same sizes.
    ("Home", "rendered x position"): [
        "Too often, patient engagement",
        "Book a 20-minute intro call",
        "See how it works",
    ],
}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("legacy_file", help="e.g. AssessPage")
    ap.add_argument("route", help="e.g. /platform/assess")
    ap.add_argument("--widths", default="1440,1024,768,390")
    args = ap.parse_args()

    from playwright.sync_api import sync_playwright

    problems = 0
    with sync_playwright() as pw:
        for w in [int(x) for x in args.widths.split(",")]:
            ref = snapshot(pw, f"{LEGACY}{args.legacy_file}.dc.html", w)
            new = snapshot(pw, f"{NEW}{args.route}", w)
            print(f"\n{w}px  legacy nodes={len(ref)}  new nodes={len(new)}")
            if len(ref) != len(new):
                print("  NOTE node counts differ - matching by text where possible")

            # Key on tag + child count + text. Text alone mispairs nested
            # wrappers that share a leading prefix, which silently hid a
            # 40px padding difference on the Pricing pages.
            def key(e):
                return (e["tag"], e["kids"], e["txt"])

            by_txt = {}
            for g in ref:
                by_txt.setdefault(key(g), []).append(g)
            for g in new:
                cands = by_txt.get(key(g))
                if not cands:
                    continue
                r = cands.pop(0)
                for prop, label in (("cols", "grid-template-columns"),
                                    ("pad", "padding"),
                                    ("left", "rendered x position"),
                                    ("ta", "text-align")):
                    if r[prop] == g[prop]:
                        continue
                    allow = RATIFIED.get((args.legacy_file, label), [])
                    hit = next((a for a in allow if a in g["txt"]), None)
                    if hit:
                        print(f"  RATIFIED {label}: {hit!r} "
                              f"(legacy={r[prop]!r} new={g[prop]!r})")
                        continue
                    if True:
                        problems += 1
                        print(f"  MISMATCH {label}")
                        print(f"            legacy={r[prop]!r}")
                        print(f"            new   ={g[prop]!r}")
                        print(f"            {r['w']}x{r['h']} vs {g['w']}x{g['h']}"
                              f"  <{g['tag']}>")
                        print(f"            text: {g['txt']!r}")

    print(f"\n{problems} computed-style mismatch(es)")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
