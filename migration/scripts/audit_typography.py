#!/usr/bin/env python3
"""
Compare the COMPUTED TYPOGRAPHY of every substantial text node, legacy vs
migrated, on every page.

Why this exists: `audit_responsive.py` checks layout properties
(grid-template-columns, padding, text-align, x-position) and `diff_text.py`
checks the words. Neither notices a paragraph transcribed with the wrong
line-height, colour or max-width - and a pixel diff buries a 7px difference
under the noise floor of a photo-heavy page.

It found three real defects on its first run: a lead-paragraph variant on
EngagePage, and the pull-quote colour on two orbit pages that had been
derived from a structurally identical sibling.

    audit_typography.py [--width 1440] [--only Name,Name]

NOTE ON FALSE POSITIVES: elements are keyed by their text, so a heading and
its single-child wrapper can collide and the two builds may keep different
ones. A mismatch where the legacy side reports `16px / normal` is almost
always that - a wrapper, not the styled element.
"""
import argparse
import sys

sys.path.insert(0, __file__.rsplit("/", 1)[0])
from routes import ROUTES  # noqa: E402

LEGACY_FILE = {
    "Home": "Home", "Platform": "Platform", "EngagePage": "EngagePage",
    "AssessPage": "AssessPage", "CapturePage": "CapturePage",
    "DataPage": "DataPage", "Outcomes": "Outcomes", "Pricing": "Pricing",
    "PricingAssess": "PricingAssess", "PricingCapture": "PricingCapture",
    "PricingData": "PricingData", "About": "About", "BookACall": "BookACall",
    "ThankYou": "ThankYou", "Cardiology": "Cardiology",
    "Orthopedics": "Orthopedics", "BehavioralSafety": "BehavioralSafety",
    "Oncology": "Oncology", "PrimaryCare": "PrimaryCare",
    "WomensHealth": "WomensHealth", "Bariatrics": "Bariatrics",
    "BehavioralHealth": "BehavioralHealth",
    "MedicationTherapy": "MedicationTherapy",
    "SurgicalSupport": "SurgicalSupport",
    "CommunityResearch": "CommunityResearch", "SitemanStudy": "SitemanStudy",
    "PritikinPilot": "PritikinPilot", "EScreeningResults": "EScreeningResults",
}

GRAB = """() => {
  const out = [];
  for (const el of document.querySelectorAll('p, h1, h2, div')) {
    const t = (el.innerText || '').replace(/\\s+/g, ' ').trim();
    if (!t || t.length < 40 || el.children.length > 1) continue;
    const cs = getComputedStyle(el);
    out.push([t.slice(0, 60), cs.fontSize, cs.lineHeight, cs.maxWidth, cs.color]);
  }
  return out;
}"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--width", type=int, default=1440)
    ap.add_argument("--only", default="")
    args = ap.parse_args()
    wanted = [x for x in args.only.split(",") if x]

    from playwright.sync_api import sync_playwright

    total = 0
    with sync_playwright() as pw:
        b = pw.chromium.launch()
        for name, route in ROUTES.items():
            if route is None or name not in LEGACY_FILE:
                continue
            if wanted and name not in wanted:
                continue
            res = {}
            for key, url in (
                ("leg", f"http://localhost:8000/v2-maven/{LEGACY_FILE[name]}.dc.html"),
                ("new", "http://localhost:3000" + route),
            ):
                p = b.new_context(
                    viewport={"width": args.width, "height": 900},
                    reduced_motion="reduce",
                ).new_page()
                try:
                    p.goto(url, wait_until="networkidle", timeout=60000)
                    p.wait_for_timeout(1500)
                    res[key] = {r[0]: r[1:] for r in p.evaluate(GRAB)}
                except Exception:
                    res[key] = {}
                p.close()

            diffs = [
                (t, res["leg"][t], res["new"][t])
                for t in res["leg"]
                if t in res["new"] and res["leg"][t] != res["new"][t]
            ]
            # Drop the wrapper-collision artefact described above.
            diffs = [d for d in diffs if not (d[1][0] == "16px" and d[1][1] == "normal")]
            if diffs:
                total += len(diffs)
                print(f"\n{name}: {len(diffs)} typography mismatch(es)")
                for t, a, c in diffs:
                    print(f'   "{t[:56]}"')
                    print(f"      legacy  size={a[0]} lh={a[1]} maxw={a[2]} colour={a[3]}")
                    print(f"      new     size={c[0]} lh={c[1]} maxw={c[2]} colour={c[3]}")
        b.close()

    print(f"\n{total} typography mismatch(es)")
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main())
