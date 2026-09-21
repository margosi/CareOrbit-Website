#!/usr/bin/env python3
"""
End-to-end check that all three forms still behave as v2-maven does, now
that they also POST to /api/lead.

The point is NOT that the POST succeeds - with no SUPABASE_* / RESEND_*
configured it is inert by design. The point is that the visitor-facing
behaviour is unchanged: the info sheet still downloads, the gated PDF still
unlocks, and Calendly still opens with the right prefill, none of which may
wait on the network call.

    check_forms.py [--base http://localhost:3000]
"""
import argparse
import sys

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
    a = ap.parse_args()
    from playwright.sync_api import sync_playwright

    with sync_playwright() as pw:
        b = pw.chromium.launch()
        ctx = b.new_context(
            viewport={"width": 1440, "height": 1000}, accept_downloads=True
        )
        p = ctx.new_page()
        posts = []
        p.on(
            "request",
            lambda r: posts.append(r.url) if "/api/lead" in r.url else None,
        )

        print("info-sheet form (orbit page)")
        p.goto(a.base + "/orbits/cardiology", wait_until="networkidle", timeout=60000)
        p.wait_for_timeout(3300)  # clear the 3s dwell guard
        p.get_by_label("Work email", exact=True).fill("dir@hospital.org")
        with p.expect_download(timeout=15000) as dl:
            p.get_by_role("button", name="Send me the info sheet").click()
        check(
            "downloads the sheet",
            dl.value.suggested_filename,
            "CareOrbit-Cardiology-Info-Sheet.pdf",
        )
        p.wait_for_timeout(700)
        check("posts to /api/lead", any("/api/lead" in u for u in posts), True)
        check(
            "button confirms",
            "Downloading your info sheet" in p.inner_text("body"),
            True,
        )

        print("\ngated study request (evidence page)")
        posts.clear()
        p.goto(
            a.base + "/evidence/siteman-study",
            wait_until="networkidle",
            timeout=60000,
        )
        p.get_by_text("Download a summary of the study results").last.click()
        p.wait_for_timeout(3300)
        boxes = p.locator("input[type=text], input[type=email]")
        boxes.nth(0).fill("Dana")
        boxes.nth(1).fill("Reed")
        boxes.nth(2).fill("Mercy Health")
        p.locator("input[type=email]").first.fill("dana@mercy.org")
        p.get_by_role("button", name="Submit request").click()
        p.wait_for_timeout(1200)
        check("posts to /api/lead", any("/api/lead" in u for u in posts), True)
        check(
            "download unlocks",
            "Download the study report" in p.inner_text("body"),
            True,
        )

        print("\nbooking panel")
        posts.clear()
        p.goto(
            a.base + "/book-a-call?src=cardiology",
            wait_until="networkidle",
            timeout=60000,
        )
        p.get_by_placeholder("Name *").fill("Dana Reed")
        p.get_by_placeholder("Organization *").fill("Mercy Health")
        p.get_by_label("Work email", exact=True).fill("dana@mercy.org")
        p.get_by_role("button", name="Pick a time").click()
        p.wait_for_timeout(1500)
        check("posts to /api/lead", any("/api/lead" in u for u in posts), True)
        check("calendly opens", p.locator("iframe").count() > 0, True)
        src = p.locator("iframe").first.get_attribute("src") or ""
        check(
            "prefill carries org and service line",
            "Mercy%20Health" in src and "Cardiology" in src,
            True,
        )
        b.close()

    print()
    if fails:
        print(f"{len(fails)} FAILED: {', '.join(fails)}")
        return 1
    print("all assertions pass")
    return 0


if __name__ == "__main__":
    sys.exit(main())
