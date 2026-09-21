#!/usr/bin/env python3
"""
Phase 2 checkpoint - shared chrome verification.

PART A  element-level pixel diffs of nav / announcement bar / footer, old vs
        new, at five widths. Whole-page diffs are meaningless here because
        the page bodies differ by design, so each chrome element is captured
        on its own.

PART B  scripted interaction tests against the converted nav: scroll-hide,
        scroll-show, the <80px reset, announcement dismiss and its effect on
        the nav offset, both dropdowns, and the mobile drawer.

Reference: v2-maven About.dc.html (active="about") on :8000
Candidate: /chrome-test?active=about on :3000

Same determinism controls as the Phase 0 baseline: reduced motion,
setInterval pinned, animations and transitions frozen after load.
"""
import json
import os
import subprocess
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))
MIG = os.path.dirname(HERE)
ROOT = os.path.dirname(MIG)
APP = os.path.join(ROOT, "careorbit-next")
OUT = os.path.join(MIG, "chrome-check")

REF = "http://localhost:8000/v2-maven/About.dc.html"
CAND = "http://localhost:3000/chrome-test?active=about"
WIDTHS = [1440, 1280, 1024, 768, 390]

FREEZE = "*,*::before,*::after{animation:none!important;transition:none!important}"
PIN = "window.setInterval=function(){return 0;};"

# Elements to compare. The footer selector walks up two levels from the grid
# to the navy panel, which is the same shape in both implementations.
TARGETS = {
    "nav": "[data-nav-wrap]",
    "announce": "[data-announce-bar]",
    "footer": "xpath=//*[@data-footer-grid]/../..",
}

# Deliberate, approved divergences from the Phase 0 baseline. These are
# improvements over the legacy site, not regressions, so a non-zero diff here
# is EXPECTED and does not fail the checkpoint.
#
# Keep this list short and always say why. Anything not listed here must
# still match at 0.0000%.
EXPECTED_DEVIATIONS = {
    ("footer", 768): (
        "Footer grid collapses to 2 columns under 900px. v2-maven kept five "
        "columns at every width; below ~900px its link columns shrank to ~7px "
        "and overlapped. Approved improvement."
    ),
    ("footer", 390): (
        "Footer grid collapses to 1 column under 640px. v2-maven rendered "
        "7.125px-wide columns here with overlapping text. Approved improvement."
    ),
}


def prep(page):
    page.evaluate("() => document.fonts.ready")
    page.add_style_tag(content=FREEZE)
    page.evaluate(
        """() => Promise.all(Array.from(document.images)
             .filter(i => !i.complete)
             .map(i => new Promise(r => {
               i.addEventListener('load', r, {once:true});
               i.addEventListener('error', r, {once:true});
             })))"""
    )
    time.sleep(0.4)


def snap_element(page, selector, path):
    """Screenshot one element, aligned to whole device pixels.

    locator.screenshot() crops at the element's own box. When the same
    element sits at a different FRACTIONAL page offset in the two builds
    (e.g. y=3838.39 vs y=1748.30) two things diverge: the crop rounds
    differently, and glyphs rasterise at a different sub-pixel phase. That
    showed up as a whole-pixel shift and made an otherwise identical footer
    read as 2.5% different at 390px.

    So: scroll until the element's top sits on an integer, then clip with
    integer coordinates. Both builds then rasterise at the same phase and
    the diff measures rendering fidelity rather than layout luck.
    """
    loc = page.locator(selector).first
    loc.scroll_into_view_if_needed()
    time.sleep(0.15)

    read = (
        "el => {const r = el.getBoundingClientRect();"
        "return {top: r.top, left: r.left, width: r.width, height: r.height};}"
    )
    rect = loc.evaluate(read)

    # Align the element's top to a whole device pixel.
    #
    # window.scrollBy() with a fractional delta does NOT work here - Chromium
    # ignores it and the offset is unchanged. Verified: the reference footer
    # stayed at .390625 and the candidate at .5 after the call. Those are
    # different sub-pixel phases, so glyphs rasterise differently and an
    # otherwise identical footer read as 0.41% different.
    #
    # Adjusting margin-top does work. It is applied symmetrically to both
    # builds and only ever shifts by <1px, purely to put both on the same
    # rasterisation phase. Layout is not otherwise touched.
    frac = rect["top"] - round(rect["top"])
    if abs(frac) > 0.001:
        loc.evaluate(
            "(el, f) => {const mt = parseFloat(getComputedStyle(el).marginTop) || 0;"
            "el.style.marginTop = (mt - f) + 'px';}",
            frac,
        )
        time.sleep(0.15)
        rect = loc.evaluate(read)

    vp = page.viewport_size
    top = round(rect["top"])
    left = round(rect["left"])
    height = min(round(rect["height"]), vp["height"] - top)
    width = min(round(rect["width"]), vp["width"] - left)
    page.screenshot(
        path=path,
        clip={"x": left, "y": top, "width": width, "height": height},
    )


def capture_elements(pw, url, width, prefix):
    b = pw.chromium.launch()
    c = b.new_context(
        # Tall viewport so the footer fits in one clip at every width.
        viewport={"width": width, "height": 1400},
        device_scale_factor=1,
        reduced_motion="reduce",
    )
    c.add_init_script(PIN)
    p = c.new_page()
    p.goto(url, wait_until="networkidle", timeout=60000)
    p.wait_for_selector("[data-nav-wrap]", timeout=20000)
    prep(p)

    saved = {}
    for name, sel in TARGETS.items():
        loc = p.locator(sel).first
        if loc.count() == 0:
            saved[name] = None
            continue
        path = os.path.join(OUT, f"{prefix}-{name}-{width}.png")
        try:
            snap_element(p, sel, path)
            saved[name] = path
        except Exception as exc:
            print(f"    capture failed {prefix}/{name}@{width}: {exc}")
            saved[name] = None
    b.close()
    return saved


def pixdiff(a, b, out):
    res = subprocess.run(
        ["node", os.path.join(APP, "scripts", "pixdiff.mjs"), a, b, out],
        capture_output=True,
        text=True,
        cwd=APP,
    )
    txt = res.stdout
    pct = None
    verdict = "ERROR"
    for line in txt.splitlines():
        if line.startswith("delta"):
            pct = float(line.split(":")[1].strip().rstrip("%"))
        if line.startswith("verdict"):
            verdict = line.split(":")[1].strip()
    return pct, verdict, txt


def part_a(pw):
    print("PART A - element pixel diffs (old vs new)\n")
    rows = []
    for w in WIDTHS:
        ref = capture_elements(pw, REF, w, "ref")
        cand = capture_elements(pw, CAND, w, "new")
        for name in TARGETS:
            a, b = ref.get(name), cand.get(name)
            if not a or not b:
                print(f"  {name:<10} {w:>5}px   MISSING "
                      f"(ref={'ok' if a else 'none'}, new={'ok' if b else 'none'})")
                rows.append({"element": name, "width": w, "verdict": "MISSING"})
                continue
            pct, verdict, _ = pixdiff(a, b, os.path.join(OUT, f"diff-{name}-{w}.png"))
            why = EXPECTED_DEVIATIONS.get((name, w))
            if why:
                verdict = "EXPECTED-DEVIATION"
                print(f"  {name:<10} {w:>5}px   {pct:>7.4f}%   {verdict}")
                print(f"             -> {why}")
            else:
                print(f"  {name:<10} {w:>5}px   {pct:>7.4f}%   {verdict}")
            rows.append(
                {
                    "element": name,
                    "width": w,
                    "delta_pct": pct,
                    "verdict": verdict,
                    "expected_deviation": why,
                }
            )
    return rows


def part_b(pw):
    print("\nPART B - interaction tests on the converted nav\n")
    results = []

    def check(name, ok, detail=""):
        print(f"  [{'PASS' if ok else 'FAIL'}] {name}" + (f"  {detail}" if detail else ""))
        results.append({"test": name, "pass": bool(ok), "detail": detail})

    b = pw.chromium.launch()

    # --- desktop behaviours -------------------------------------------------
    c = b.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
    p = c.new_page()
    p.goto(CAND, wait_until="networkidle")
    p.wait_for_selector("[data-nav-wrap]")
    time.sleep(0.3)

    def nav_transform():
        return p.evaluate(
            "() => getComputedStyle(document.querySelector('[data-nav-wrap]')).transform"
        )

    def nav_opacity():
        return float(
            p.evaluate(
                "() => getComputedStyle(document.querySelector('[data-nav-wrap]')).opacity"
            )
        )

    check("nav visible at rest", nav_opacity() == 1.0, f"opacity={nav_opacity()}")

    # announcement bar measured -> nav offset follows it
    ann_h = p.evaluate(
        "() => {const e=document.querySelector('[data-announce-bar]');return e?e.offsetHeight:0}"
    )
    off = p.evaluate(
        "() => getComputedStyle(document.querySelector('[data-nav-wrap]')).top"
    )
    check(
        "announcement height measured into --ann-off",
        abs(float(off.rstrip("px")) - ann_h) < 1.5,
        f"annH={ann_h}px navTop={off}",
    )

    # scroll down past 80px -> hides
    p.evaluate("window.scrollTo(0, 600)")
    time.sleep(0.5)
    hid = nav_opacity() == 0.0
    check("hides on scroll down past 80px", hid, f"opacity={nav_opacity()}")

    # scroll up -> shows
    p.evaluate("window.scrollBy(0, -200)")
    time.sleep(0.5)
    check("reappears on scroll up", nav_opacity() == 1.0, f"opacity={nav_opacity()}")

    # back to top -> reset
    p.evaluate("window.scrollTo(0, 0)")
    time.sleep(0.5)
    check(
        "resets below 80px",
        nav_opacity() == 1.0 and nav_transform() in ("none", "matrix(1, 0, 0, 1, 0, 0)"),
        f"transform={nav_transform()}",
    )

    # Selectors MUST be scoped to the nav: the footer also renders 11
    # /orbits/ links and a /pricing link, so an unscoped count returns 22
    # and the dropdown never appears to close.
    NAV = "[data-nav-wrap] "

    # dropdown: orbit solutions
    p.hover(f"{NAV}>> text=Orbit Solutions")
    time.sleep(0.35)
    n_orbits = p.locator(f"{NAV}a[href^='/orbits/']").count()
    check("orbit dropdown opens with 11 links", n_orbits == 11, f"found={n_orbits}")

    # the 4 product links live in the same panel
    n_products = p.locator(f"{NAV}a[href^='/platform/']").count()
    check("orbit dropdown shows 4 product links", n_products == 4, f"found={n_products}")

    p.mouse.move(5, 5)
    time.sleep(0.35)
    after_out = p.locator(f"{NAV}a[href^='/orbits/']").count()
    check("orbit dropdown closes on mouse out", after_out == 0, f"found={after_out}")

    # dropdown: pricing. The trigger itself links to /pricing, so the open
    # panel contributes exactly 4 more.
    closed_pricing = p.locator(f"{NAV}a[href^='/pricing']").count()
    p.hover(f"{NAV}>> text=Plans & Pricing")
    time.sleep(0.35)
    n_pricing = p.locator(f"{NAV}a[href^='/pricing']").count()
    check(
        "pricing dropdown adds 4 links",
        n_pricing - closed_pricing == 4,
        f"closed={closed_pricing} open={n_pricing}",
    )
    p.mouse.move(5, 5)
    time.sleep(0.35)
    check(
        "pricing dropdown closes on mouse out",
        p.locator(f"{NAV}a[href^='/pricing']").count() == closed_pricing,
    )

    # announcement dismiss
    before = p.locator("[data-announce-bar]").count()
    p.click("button[aria-label='Dismiss']")
    time.sleep(0.3)
    after = p.locator("[data-announce-bar]").count()
    top_after = p.evaluate(
        "() => getComputedStyle(document.querySelector('[data-nav-wrap]')).top"
    )
    check("announcement dismiss removes the bar", before == 1 and after == 0)
    check(
        "nav offset returns to 0 after dismiss",
        float(top_after.rstrip("px")) == 0.0,
        f"navTop={top_after}",
    )
    c.close()

    # --- mobile behaviours --------------------------------------------------
    c = b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=1)
    p = c.new_page()
    p.goto(CAND, wait_until="networkidle")
    p.wait_for_selector("[data-nav-wrap]")
    time.sleep(0.3)

    links_disp = p.evaluate(
        "() => getComputedStyle(document.querySelector('[data-nav-links]')).display"
    )
    mob_disp = p.evaluate(
        "() => getComputedStyle(document.querySelector('[data-nav-mobile]')).display"
    )
    check("desktop links hidden at 390px", links_disp == "none", f"display={links_disp}")
    check("mobile bar shown at 390px", mob_disp == "flex", f"display={mob_disp}")

    bar_h = p.evaluate(
        "() => document.querySelector('[data-nav-bar]').getBoundingClientRect().height"
    )
    check("nav bar collapses to 64px", abs(bar_h - 64) < 1.5, f"height={bar_h}")

    p.click("button[aria-label='Menu']")
    time.sleep(0.4)
    DRAWER = "[data-nav-drawer] "
    drawer_orbits = p.locator(f"{DRAWER}a[href^='/orbits/']").count()
    check(
        "mobile drawer opens with 11 orbit links",
        drawer_orbits == 11,
        f"found={drawer_orbits}",
    )
    drawer_products = p.locator(f"{DRAWER}a[href^='/platform/']").count()
    check(
        "mobile drawer lists 4 product links",
        drawer_products == 4,
        f"found={drawer_products}",
    )
    expanded = p.get_attribute("button[aria-label='Menu']", "aria-expanded")
    check("menu button reports expanded", expanded == "true", f"aria-expanded={expanded}")

    # click the scrim to close
    p.mouse.click(200, 760)
    time.sleep(0.4)
    left = p.locator("[data-nav-drawer]").count()
    check("mobile drawer closes", left == 0, f"drawers={left}")

    b.close()
    return results


def main():
    os.makedirs(OUT, exist_ok=True)
    from playwright.sync_api import sync_playwright

    with sync_playwright() as pw:
        rows = part_a(pw)
        tests = part_b(pw)

    report = {"pixel": rows, "interaction": tests}
    with open(os.path.join(MIG, "manifest", "chrome_report.json"), "w") as fh:
        json.dump(report, fh, indent=2)

    fails = [r for r in rows if r["verdict"] in ("FAIL", "MISSING", "ERROR")]
    review = [r for r in rows if r["verdict"] == "REVIEW"]
    expected = [r for r in rows if r["verdict"] == "EXPECTED-DEVIATION"]
    tfails = [t for t in tests if not t["pass"]]

    print("\n" + "=" * 62)
    print(f"pixel      : {len(rows) - len(fails) - len(review) - len(expected)} pass, "
          f"{len(expected)} expected-deviation, "
          f"{len(review)} review, {len(fails)} fail")
    print(f"interaction: {len(tests) - len(tfails)} pass, {len(tfails)} fail")
    print("=" * 62)
    return 1 if (fails or tfails) else 0


if __name__ == "__main__":
    sys.exit(main())
