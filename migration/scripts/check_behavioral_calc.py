#!/usr/bin/env python3
"""
Checkpoint test for the Behavioral Risk page's two interactive systems.

Neither is reachable by a pixel diff: the audience toggle rewrites copy the
baseline never shows in its second state, and the ROI calculator lives in a
modal that only opens on click. This asserts the ported arithmetic and the
audience swap against the values v2-maven's renderVals() produces.

    check_behavioral_calc.py [--base http://localhost:3000]
"""
import argparse
import sys

ROUTE = "/orbits/behavioral-risk"

# Defaults: 500 workers, $65,000 wage, 2-point turnover cut, 30% replacement,
# 6 absence days at a 20% behavioural share cut 20%, $250,000 claims cut 10%.
#   retention 10 x 65000 x .30      = 195,000
#   absence   120 days x $260/day   =  31,200
#   claims    250,000 x .10         =  25,000
#   total                             251,200 -> "$251K"
EXPECT_DEFAULT = {
    "total": "$251K",
    "results": ["$195K", "$31K", "$25K"],
    "note": "Across 500 field workers a year",
}

fails = []


def check(name, got, want):
    if got == want:
        print(f"  ok   {name}")
    else:
        print(f"  FAIL {name}: got {got!r}, want {want!r}")
        fails.append(name)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default="http://localhost:3000")
    args = ap.parse_args()

    from playwright.sync_api import sync_playwright

    with sync_playwright() as pw:
        b = pw.chromium.launch()
        p = b.new_context(
            viewport={"width": 1440, "height": 1000}, reduced_motion="reduce"
        ).new_page()
        p.goto(args.base + ROUTE, wait_until="domcontentloaded", timeout=60000)

        # --- audience toggle -------------------------------------------------
        print("audience toggle")
        # Two elements carry [data-start]: the audience tab bar and the ROI
        # panel's button row. The tab bar is the first.
        tabs = p.locator("[data-start]").first
        emp_line = tabs.locator("div").last.inner_text()
        check(
            "employers line",
            emp_line.startswith("Issued by your own safety leadership"),
            True,
        )
        check(
            "employers ledger row 1",
            "One site first" in p.inner_text("body"),
            True,
        )
        # Section eyebrows are uppercased in CSS, so innerText comes back
        # transformed. Compare case-insensitively.
        check(
            "employers finKicker",
            "the financial case" in p.inner_text("body").lower(),
            True,
        )

        p.get_by_role("button", name="For associations").click()
        p.wait_for_timeout(120)
        check(
            "associations line",
            tabs.locator("div").last.inner_text().startswith(
                "Issued through your chapters"
            ),
            True,
        )
        check(
            "associations ledger row 1",
            "One chapter first" in p.inner_text("body"),
            True,
        )
        check(
            "associations finKicker",
            "the case you carry to members" in p.inner_text("body").lower(),
            True,
        )
        check(
            "employers copy is gone",
            "One site first" not in p.inner_text("body"),
            True,
        )
        p.get_by_role("button", name="For employers").click()
        p.wait_for_timeout(120)

        # --- calculator ------------------------------------------------------
        print("ROI calculator")
        check("closed by default", p.locator("#roi-calculator").count(), 0)
        p.get_by_role("button", name="Run the numbers").click()
        p.wait_for_selector("#roi-calculator")
        check("opens on click", p.locator("#roi-calculator").count(), 1)

        total = p.locator("[data-calc-total] div").nth(2).inner_text()
        check("default total", total, EXPECT_DEFAULT["total"])
        note = p.locator("[data-calc-total] div").nth(3).inner_text()
        check("default note", note, EXPECT_DEFAULT["note"])
        got = [
            p.locator("[data-calc-out] > div").nth(i).locator("div").first.inner_text()
            for i in range(3)
        ]
        check("default result lines", got, EXPECT_DEFAULT["results"])

        # Clear -> every input empty, total $0, note falls back.
        p.get_by_role("button", name="Clear").click()
        p.wait_for_timeout(120)
        vals = p.eval_on_selector_all(
            "#roi-calculator input[type=number]", "els => els.map(e => e.value)"
        )
        check("clear empties every field", set(vals), {""})
        check(
            "clear total",
            p.locator("[data-calc-total] div").nth(2).inner_text(),
            "$0",
        )
        check(
            "clear note",
            p.locator("[data-calc-total] div").nth(3).inner_text(),
            "Enter your headcount to scale the model",
        )

        # Load published figures -> back to the benchmark total.
        p.get_by_role("button", name="Load published figures").click()
        p.wait_for_timeout(120)
        check(
            "benchmarks restore total",
            p.locator("[data-calc-total] div").nth(2).inner_text(),
            EXPECT_DEFAULT["total"],
        )

        # Negative input clamps to 0, as v2-maven's setCalc did.
        first = p.locator("#roi-calculator input[type=number]").first
        first.fill("-40")
        p.wait_for_timeout(120)
        check("negative clamps to 0", first.input_value(), "0")
        first.fill("1000")
        p.wait_for_timeout(120)
        # 1000 workers doubles every line: 390,000 + 62,400 + 25,000 = 477,400
        check(
            "total scales with headcount",
            p.locator("[data-calc-total] div").nth(2).inner_text(),
            "$477K",
        )
        first.fill("500")
        p.wait_for_timeout(120)

        # CSV export.
        p.get_by_role("button", name="Export").click()
        with p.expect_download() as dl:
            p.get_by_role("button", name="Excel spreadsheet").click()
        d = dl.value
        check("csv filename", d.suggested_filename, "careorbit-behavioral-safety-roi.csv")
        body = open(d.path(), encoding="utf-8-sig").read()
        check("csv header", body.splitlines()[0], '"CareOrbit behavioral risk ROI model",""')
        check(
            "csv carries the total",
            '"Total annual opportunity ($)","251200"' in body,
            True,
        )
        check(
            "csv marks percentage inputs",
            '"Current annual turnover rate (%)","30"' in body,
            True,
        )
        check("export menu closes", p.get_by_text("Excel spreadsheet").count(), 0)

        # Backdrop click closes; inner click does not.
        p.locator("#roi-calculator").click(position={"x": 10, "y": 10})
        p.wait_for_timeout(100)
        check("inner click keeps it open", p.locator("#roi-calculator").count(), 1)
        p.get_by_label("Close calculator").click()
        p.wait_for_timeout(120)
        check("close button closes", p.locator("#roi-calculator").count(), 0)

        b.close()

    print()
    if fails:
        print(f"{len(fails)} FAILED: {', '.join(fails)}")
        return 1
    print("all assertions pass")
    return 0


if __name__ == "__main__":
    sys.exit(main())
