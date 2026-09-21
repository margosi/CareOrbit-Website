#!/usr/bin/env python3
"""
Phase 1 checkpoint - font fidelity test.

Captures the same specimen markup twice:
  A  http://localhost:8000/migration/typespecimen/reference.html
     fonts loaded from Google, exactly as v2-maven loads them
  B  http://localhost:3000/specimen
     fonts loaded from the self-hosted @font-face rules in app/fonts.css

and reports the pixel difference. The markup is byte-identical (both are
generated from gen_specimen.py), so any difference is attributable to the
font source and nothing else.

Writes PNGs into migration/typespecimen/ and prints a verdict.
"""
import os
import subprocess
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))
MIG = os.path.dirname(HERE)
OUT = os.path.join(MIG, "typespecimen")

REFERENCE = "http://localhost:8000/migration/typespecimen/reference.html"
CANDIDATE = "http://localhost:3000/specimen"
WIDTH = 1200


def capture(url, path):
    from playwright.sync_api import sync_playwright

    with sync_playwright() as pw:
        b = pw.chromium.launch()
        c = b.new_context(
            viewport={"width": WIDTH, "height": 900},
            device_scale_factor=1,
            reduced_motion="reduce",
        )
        p = c.new_page()
        p.goto(url, wait_until="networkidle", timeout=60000)
        # Block until every declared face has actually loaded, otherwise the
        # screenshot can capture a fallback mid-swap.
        p.evaluate("() => document.fonts.ready")
        loaded = p.evaluate(
            """() => Array.from(document.fonts)
                 .map(f => f.family + ' ' + f.style + ' ' + f.weight + ' ' + f.status)
                 .sort()"""
        )
        time.sleep(0.5)
        p.screenshot(path=path, full_page=True)
        b.close()
    return loaded


def main():
    os.makedirs(OUT, exist_ok=True)
    a = os.path.join(OUT, "a-google-fonts.png")
    b = os.path.join(OUT, "b-self-hosted.png")

    print("capturing reference (Google Fonts) ...")
    fa = capture(REFERENCE, a)
    print("capturing candidate (self-hosted) ...")
    fb = capture(CANDIDATE, b)

    print("\nfaces loaded, reference : %d" % len(fa))
    print("faces loaded, candidate : %d" % len(fb))
    unresolved = [f for f in fb if not f.endswith("loaded")]
    if unresolved:
        print("WARNING unresolved faces in candidate:")
        for f in unresolved:
            print("   " + f)

    # pixel compare via the node tooling installed in the app
    # pixdiff lives inside the app because Node resolves ESM imports from the
    # importing file's own path, not from cwd.
    app = os.path.join(os.path.dirname(MIG), "careorbit-next")
    script = os.path.join(app, "scripts", "pixdiff.mjs")
    res = subprocess.run(
        ["node", script, a, b, os.path.join(OUT, "diff.png")],
        cwd=app,
        capture_output=True,
        text=True,
    )
    sys.stdout.write(res.stdout)
    if res.returncode != 0:
        sys.stderr.write(res.stderr)
    return res.returncode


if __name__ == "__main__":
    sys.exit(main())
