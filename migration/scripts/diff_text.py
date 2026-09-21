#!/usr/bin/env python3
"""
Compare the VISIBLE TEXT of a legacy page and its converted counterpart.

Pixel diffs catch layout drift; they are a blunt instrument for copy. This
extracts the rendered text of both pages and reports the first differences,
which catches wrong headings, dropped paragraphs, and stale copy left behind
when one page was adapted from another.

Copy is brief-locked (CLAUDE.md), so any difference here is a defect unless
it is a documented, approved change.

    diff_text.py DataPage /platform/data [--width 1440]
"""
import argparse
import difflib
import re
import sys
import time

LEGACY = "http://localhost:8000/v2-maven/"
NEW = "http://localhost:3000"

GRAB = """() => {
  // innerText respects display:none, so hidden variants are excluded the
  // same way in both builds.
  return document.body.innerText;
}"""

# v2-maven's <image-slot> renders its empty-state caption inside a shadow
# root, and innerText does not descend into shadow DOM - so a visible
# "[Placeholder: ...]" caption is INVISIBLE to the legacy text grab while
# the Next.js <Figure>, which renders in light DOM, shows it.
#
# That is a tool artefact, not a copy difference: both builds paint the same
# words in the same box, which the pixel diff checks. Collect the captions
# that are actually on screen in the legacy page so they can be reported
# separately instead of as missing copy.
SHADOW_CAPS = """() => {
  const out = [];
  for (const el of document.querySelectorAll('image-slot')) {
    const sr = el.shadowRoot;
    if (!sr) continue;
    for (const n of sr.querySelectorAll('*')) {
      const t = (n.textContent || '').trim();
      if (!t || n.children.length) continue;
      const cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      if (!n.getClientRects().length) continue;
      out.push(t.replace(/\\s+/g, ' '));
    }
  }
  return out;
}"""


def text_of(pw, url, width):
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
    time.sleep(1.0)
    t = p.evaluate(GRAB)
    caps = p.evaluate(SHADOW_CAPS)
    b.close()
    # Normalise whitespace and drop blank lines so formatting differences in
    # the markup do not register as copy differences.
    lines = [re.sub(r"\s+", " ", ln).strip() for ln in t.splitlines()]
    return [ln for ln in lines if ln], set(caps)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("legacy_file")
    ap.add_argument("route")
    ap.add_argument("--width", type=int, default=1440)
    ap.add_argument("--max", type=int, default=40, help="max diff lines to show")
    args = ap.parse_args()

    from playwright.sync_api import sync_playwright

    with sync_playwright() as pw:
        ref, shadow_caps = text_of(
            pw, f"{LEGACY}{args.legacy_file}.dc.html", args.width
        )
        new, _ = text_of(pw, f"{NEW}{args.route}", args.width)

    print(f"legacy lines={len(ref)}  new lines={len(new)}")
    diff = [
        d
        for d in difflib.unified_diff(ref, new, "legacy", "new", lineterm="", n=0)
        if d.startswith(("+", "-")) and not d.startswith(("+++", "---"))
    ]
    # An added line that exactly matches a caption the legacy page paints
    # inside an image-slot shadow root is the artefact described above.
    shadow_only = [
        d for d in diff if d.startswith("+") and d[1:].strip() in shadow_caps
    ]
    diff = [d for d in diff if d not in shadow_only]

    if shadow_only:
        print(
            f"{len(shadow_only)} shadow-DOM placeholder caption(s) present in "
            "both builds but invisible to the legacy text grab:"
        )
        for d in shadow_only:
            print("  " + d[:150])

    if not diff:
        print("TEXT IDENTICAL")
        return 0
    print(f"{len(diff)} differing line(s):")
    for d in diff[: args.max]:
        print("  " + d[:150])
    if len(diff) > args.max:
        print(f"  ... {len(diff) - args.max} more")
    return 1


if __name__ == "__main__":
    sys.exit(main())
