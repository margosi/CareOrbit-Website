#!/usr/bin/env python3
"""
Phase 0 - baseline screenshot capture of the live v2-maven site.

READ-ONLY with respect to v2-maven. Drives Chromium against the local
server and writes PNGs into migration/baseline/.

Determinism measures (capture-side only, nothing in v2-maven is touched):
  * prefers-reduced-motion: reduce   - the site's own CSS then forces
    [data-rv] to its revealed state and .co-ring to its final sweep,
    so scroll reveals do not depend on scroll position or timing.
  * setInterval neutralised before page scripts run - pins Home's 5-image
    hero fader to frame 0. setTimeout is left intact because SiteNav
    measures the announcement bar via setTimeout(50).
  * animations/transitions disabled after load - freezes the marquee,
    float and pulse keyframes at their initial position.

Per page it records viewport height, full-page height, console errors and
failed network requests, so a broken asset shows up as data rather than as
a silently odd screenshot.

Usage:
  capture_baseline.py [--only PageName] [--widths 1440,390]
"""
import argparse
import json
import os
import sys
import time
from datetime import datetime, timezone

HERE = os.path.dirname(os.path.abspath(__file__))
MIG = os.path.dirname(HERE)
OUT = os.path.join(MIG, "baseline")
MANIFEST = os.path.join(MIG, "manifest")

BASE_URL = "http://localhost:8000/v2-maven/"
WIDTHS = [1440, 1280, 1024, 768, 390]

FREEZE_CSS = """
*, *::before, *::after {
  animation: none !important;
  transition: none !important;
  animation-play-state: paused !important;
}
"""

PIN_TIMERS = """
// Pin interval-driven state (Home's hero fader) to its initial frame.
// setTimeout is deliberately left alone: SiteNav measures the announcement
// bar with setTimeout(50) and the nav offset depends on it.
window.setInterval = function () { return 0; };
"""


def load_pages():
    with open(os.path.join(MANIFEST, "pages.json"), encoding="utf-8") as fh:
        return json.load(fh)


def slug_for(route_file):
    return route_file.replace(".dc.html", "").replace(".html", "").replace(" ", "-")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", default=None, help="capture a single page by route_file stem")
    ap.add_argument("--widths", default=None, help="comma separated widths")
    args = ap.parse_args()

    widths = [int(w) for w in args.widths.split(",")] if args.widths else WIDTHS
    pages = load_pages()
    if args.only:
        pages = [p for p in pages if slug_for(p["route_file"]) == args.only]
        if not pages:
            sys.exit("no page matching --only %s" % args.only)

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        sys.exit("playwright not importable - run with the venv python")

    os.makedirs(OUT, exist_ok=True)
    report = {
        "captured_at": datetime.now(timezone.utc).isoformat(),
        "base_url": BASE_URL,
        "widths": widths,
        "pages": {},
        "failures": [],
    }

    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        for width in widths:
            wdir = os.path.join(OUT, "%dpx" % width)
            os.makedirs(wdir, exist_ok=True)
            ctx = browser.new_context(
                viewport={"width": width, "height": 900},
                device_scale_factor=1,
                reduced_motion="reduce",
            )
            ctx.add_init_script(PIN_TIMERS)

            for entry in pages:
                route_file = entry["route_file"]
                slug = slug_for(route_file)
                url = BASE_URL + route_file
                key = "%s@%d" % (slug, width)
                console_errors = []
                failed_requests = []

                # A fresh page per capture keeps console/network listeners
                # scoped to exactly one page load.
                page = ctx.new_page()
                page.on("console", lambda m, c=console_errors:
                        c.append(m.text) if m.type == "error" else None)
                page.on("requestfailed", lambda r, f=failed_requests:
                        f.append({"url": r.url, "failure": r.failure}))
                # A 404 is a completed response, not a "failed request", so
                # bad status codes must be tracked separately or they vanish.
                page.on("response", lambda r, f=failed_requests:
                        f.append({"url": r.url, "status": r.status})
                        if r.status >= 400 else None)

                try:
                    resp = page.goto(url, wait_until="networkidle", timeout=60000)
                    status = resp.status if resp else None
                    if status != 200:
                        raise RuntimeError("HTTP %s" % status)

                    # Wait for the dc-runtime to mount. This must be page-agnostic:
                    # Login.dc.html is standalone with no SiteNav, so gating on
                    # [data-nav-bar] would hang on it forever. Readiness = the page
                    # has real height AND no un-interpolated {{ }} left in the text.
                    page.wait_for_function(
                        """() => {
                            const b = document.body;
                            if (!b) return false;
                            const txt = b.innerText || '';
                            return b.scrollHeight > 400 && !/\\{\\{\\s*[\\w.]/.test(txt);
                        }""",
                        timeout=20000,
                    )
                    page.evaluate("document.fonts.ready")
                    page.add_style_tag(content=FREEZE_CSS)

                    # ensure every <img> has decoded before we capture
                    page.evaluate("""
                        () => Promise.all(
                          Array.from(document.images)
                            .filter(i => !i.complete)
                            .map(i => new Promise(r => {
                              i.addEventListener('load', r, {once:true});
                              i.addEventListener('error', r, {once:true});
                            }))
                        )
                    """)
                    time.sleep(0.4)

                    dims = page.evaluate("""() => ({
                        scrollHeight: document.documentElement.scrollHeight,
                        bodyHeight: document.body.scrollHeight,
                        hasNav: !!document.querySelector('[data-nav-bar]'),
                        revealTotal: document.querySelectorAll('[data-rv]').length,
                        revealHidden: Array.from(document.querySelectorAll('[data-rv]'))
                            .filter(e => getComputedStyle(e).opacity === '0').length,
                        imgs: document.images.length,
                        imgsBroken: Array.from(document.images)
                            .filter(i => i.complete && i.naturalWidth === 0)
                            .map(i => i.getAttribute('src'))
                    })""")

                    out_png = os.path.join(wdir, slug + ".png")
                    page.screenshot(path=out_png, full_page=True)

                    report["pages"].setdefault(slug, {})["%dpx" % width] = {
                        "url": url,
                        "status": status,
                        "file": os.path.relpath(out_png, MIG),
                        "bytes": os.path.getsize(out_png),
                        "full_page_height": dims["scrollHeight"],
                        "images": dims["imgs"],
                        "broken_images": dims["imgsBroken"],
                        "reveal_elements": dims["revealTotal"],
                        "reveal_still_hidden": dims["revealHidden"],
                        "console_errors": console_errors[:10],
                        "failed_requests": failed_requests[:10],
                    }
                    flag = ""
                    if dims["imgsBroken"]:
                        flag += " BROKEN-IMG:%d" % len(dims["imgsBroken"])
                    if dims["revealHidden"]:
                        flag += " HIDDEN-REVEAL:%d" % dims["revealHidden"]
                    if console_errors:
                        flag += " CONSOLE-ERR:%d" % len(console_errors)
                    print("  ok  %-34s %5dpx  h=%-6d%s" %
                          (slug, width, dims["scrollHeight"], flag))
                except Exception as exc:
                    report["failures"].append({
                        "page": slug, "width": width, "url": url, "error": str(exc),
                    })
                    print("  FAIL %-34s %5dpx  %s" % (slug, width, exc))
                finally:
                    page.close()

            ctx.close()
            print("-- width %dpx done" % width)
        browser.close()

    expected = len(pages) * len(widths)
    actual = sum(len(v) for v in report["pages"].values())
    report["expected_screenshots"] = expected
    report["actual_screenshots"] = actual
    report["passed"] = (actual == expected and not report["failures"])

    with open(os.path.join(MIG, "manifest", "baseline_report.json"), "w", encoding="utf-8") as fh:
        json.dump(report, fh, indent=2, sort_keys=True)

    print("\nexpected=%d actual=%d failures=%d" % (expected, actual, len(report["failures"])))
    return 0 if report["passed"] else 1


if __name__ == "__main__":
    sys.exit(main())
