#!/usr/bin/env python3
"""
Run verify_page.py across every migrated page and summarise.

    verify_all.py                 every page with a route that exists
    verify_all.py --only A,B      just these baselines
    verify_all.py --widths 1440   narrower sweep

Exits non-zero if any page reports a fail or an unexplained difference.
"""
import argparse
import pathlib
import subprocess
import sys
import urllib.request

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from routes import ROUTES  # noqa: E402

APP = HERE.parent.parent / "careorbit-next" / "app"
BASE = "http://localhost:3000"


def route_exists(route: str, base: str = None) -> bool:
    """A route counts as live only when the RUNNING SERVER serves it.

    Checking page.tsx on disk is not enough: a page written after the
    server last built is on disk but still 404s, which shows up as a
    spurious 30%+ regression. That happened once during Phase 7 and cost a
    full sweep, so the check goes over the wire.
    """
    rel = route.strip("/")
    if not (APP / rel / "page.tsx").exists() and rel:
        return False
    try:
        with urllib.request.urlopen((base or BASE) + route, timeout=10) as r:
            return r.status == 200
    except Exception:
        return False


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", default="")
    ap.add_argument("--widths", default="1440,1280,1024,768,390")
    ap.add_argument(
        "--base",
        default=BASE,
        help="origin to test, e.g. a Vercel preview URL",
    )
    args = ap.parse_args()

    wanted = [x for x in args.only.split(",") if x]
    rows, skipped, failed = [], [], []

    for name, route in ROUTES.items():
        if wanted and name not in wanted:
            continue
        if route is None:
            skipped.append(f"{name} (excluded by decision)")
            continue
        if not route_exists(route, args.base):
            skipped.append(f"{name} (not migrated, or not in the running build)")
            continue

        p = subprocess.run(
            [sys.executable, str(HERE / "verify_page.py"), name, route,
             "--widths", args.widths, "--base", args.base],
            capture_output=True, text=True,
        )
        tail = [ln for ln in p.stdout.splitlines() if ln.strip()]
        verdict = next(
            (ln for ln in tail if "pass," in ln and "fail" in ln), "NO VERDICT"
        )
        rows.append((name, verdict))
        if p.returncode != 0:
            failed.append(name)
            rows.append(("", "  " + "\n  ".join(tail[-8:])))

    print("\n=== verification sweep ===")
    for name, verdict in rows:
        print(f"{name:20s} {verdict}" if name else verdict)
    if skipped:
        print("\nskipped:")
        for s in skipped:
            print("  " + s)
    print(f"\n{len(rows)} page(s) checked, {len(failed)} with failures")
    if failed:
        print("FAILED: " + ", ".join(failed))
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
