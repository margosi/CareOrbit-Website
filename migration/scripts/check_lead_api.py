#!/usr/bin/env python3
"""
Checkpoint test for /api/lead and the secret-leak guard.

Two things are being proved:
  1. The endpoint validates, throttles and honeypots correctly, and always
     answers 200 on a legitimate submission so a visitor's download is
     never gated on a third-party service.
  2. NO server-side secret name or value reaches the browser bundle.

    check_lead_api.py [--base http://localhost:3000]
"""
import argparse
import json
import pathlib
import subprocess
import sys
import time
import urllib.error
import urllib.request

fails = []


def check(name, got, want):
    if got == want:
        print(f"  ok   {name}")
    else:
        print(f"  FAIL {name}: got {got!r}, want {want!r}")
        fails.append(name)


def post(base, payload):
    req = urllib.request.Request(
        base + "/api/lead",
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            return r.status, json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read().decode() or "{}")


def post_unthrottled(base, payload, tries=8):
    """Post, transparently waiting out a 429.

    The endpoint allows 10 requests per minute per IP, and the last block of
    this script deliberately exhausts that budget to prove the throttle
    works. Every functional assertion before it therefore has to be immune
    to a leftover budget - from a previous run, from a concurrent one, or
    from the closeout driver having just run this same script. Without this
    the suite fails spuriously, which is worse than useless: it trains you
    to ignore it.
    """
    for _ in range(tries):
        code, body = post(base, payload)
        if code != 429:
            return code, body
        time.sleep(10)
    return 429, {}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default="http://localhost:3000")
    args = ap.parse_args()

    print("POST /api/lead")
    s, b = post_unthrottled(args.base, {"kind": "info-sheet", "email": "a@hospital.org"})
    check("valid submission -> 200", s, 200)
    check("valid submission ok", b.get("ok"), True)
    check("unconfigured -> stored skipped", b.get("stored"), "skipped")
    check("unconfigured -> notify skipped", b.get("notified"), "skipped")

    s, b = post_unthrottled(args.base, {"kind": "info-sheet", "email": "nope"})
    check("bad email -> 400", s, 400)
    check("bad email reason", b.get("reason"), "invalid")

    s, b = post_unthrottled(args.base, {"kind": "not-a-kind", "email": "a@hospital.org"})
    check("bad kind -> 400", s, 400)

    s, b = post_unthrottled(args.base, {"kind": "info-sheet"})
    check("missing email -> 400", s, 400)

    # Honeypot: answer 200 so a bot learns nothing, but store nothing.
    s, b = post_unthrottled(
        args.base,
        {"kind": "info-sheet", "email": "a@hospital.org", "website": "spam"},
    )
    check("honeypot -> 200", s, 200)
    check("honeypot stores nothing", b.get("stored"), "skipped")

    # Throttle: 10 per minute per IP. Burst past the limit from any starting
    # budget, so this holds whatever the assertions above consumed.
    codes = [
        post(args.base, {"kind": "info-sheet", "email": "b@hospital.org"})[0]
        for _ in range(12)
    ]
    check("throttle engages within a minute", 429 in codes, True)

    print("\nsecret leakage")
    root = pathlib.Path(__file__).resolve().parent.parent.parent / "careorbit-next"
    chunks = root / ".next" / "static"
    names = [
        "SUPABASE_SERVICE_ROLE_KEY",
        "SUPABASE_URL",
        "RESEND_API_KEY",
        "LEAD_NOTIFY_TO",
        "LEAD_NOTIFY_FROM",
    ]
    if not chunks.exists():
        print("  FAIL no .next/static - run `npm run build` first")
        fails.append("bundle present")
    else:
        for n in names:
            r = subprocess.run(
                ["grep", "-rl", n, str(chunks)], capture_output=True, text=True
            )
            found = r.stdout.strip().splitlines()[:3]
            # Name each variable, so a failure says WHICH key leaked and into
            # which chunk rather than just "something did".
            check(f"{n} absent from the client bundle", found, [])

        # server-only must actually be imported by the modules that read env
        for f in ["lib/server/env.ts", "lib/server/leads.ts"]:
            txt = (root / f).read_text()
            check(f"{f} imports server-only", 'import "server-only"' in txt, True)

    print()
    if fails:
        print(f"{len(fails)} FAILED: {', '.join(fails)}")
        return 1
    print("all assertions pass")
    return 0


if __name__ == "__main__":
    sys.exit(main())
