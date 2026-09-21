#!/usr/bin/env python3
"""
One definitive verification run against the final build, writing a dated
record to migration/VERIFICATION-RESULTS.md.

Runs, in order, every check in the harness:
  1. diff_text.py        every page  - rendered copy
  2. audit_responsive.py every page  - computed layout at 4 widths
  3. audit_typography.py every page  - computed type at 1440
  4. verify_all.py       every page  - pixel diff at 5 widths
  5. check_forms.py / check_lead_api.py / check_behavioral_calc.py

Both servers must be up: legacy on :8000, the Next app on :3000, built.

    run_closeout.py
"""
import datetime
import pathlib
import re
import subprocess
import sys

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from routes import ROUTES  # noqa: E402

OUT = HERE.parent / "VERIFICATION-RESULTS.md"
PY_ = sys.executable

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


def run(args):
    p = subprocess.run([PY_, str(HERE / args[0])] + args[1:],
                       capture_output=True, text=True)
    return p.returncode, p.stdout.strip()


def main():
    started = datetime.datetime.now()
    pages = [(n, r) for n, r in ROUTES.items() if r and n in LEGACY_FILE]
    lines = []
    problems = []

    # -- 1. rendered copy ---------------------------------------------------
    print("1/5 text")
    text_rows, shadow_notes = [], 0
    for n, r in pages:
        rc, out = run(["diff_text.py", n, r])
        ok = "TEXT IDENTICAL" in out
        if "shadow-DOM placeholder caption" in out:
            shadow_notes += 1
        text_rows.append((n, "IDENTICAL" if ok else "DIFFERS"))
        if not ok:
            problems.append(f"text: {n}\n{out}")
        print(f"   {n:20s} {'ok' if ok else 'DIFFERS'}")

    # -- 2. computed layout -------------------------------------------------
    print("2/5 responsive")
    resp_rows = []
    for n, r in pages:
        rc, out = run(["audit_responsive.py", n, r])
        m = re.search(r"(\d+) computed-style mismatch", out)
        c = int(m.group(1)) if m else -1
        resp_rows.append((n, c))
        if c != 0:
            problems.append(f"responsive: {n}\n{out}")
        print(f"   {n:20s} {c}")

    # -- 3. computed typography --------------------------------------------
    print("3/5 typography")
    rc, typo = run(["audit_typography.py"])
    m = re.search(r"(\d+) typography mismatch", typo)
    typo_n = int(m.group(1)) if m else -1
    if typo_n != 0:
        problems.append("typography\n" + typo)

    # -- 4. pixel -----------------------------------------------------------
    print("4/5 pixel")
    rc, pixel = run(["verify_all.py"])
    if rc != 0:
        problems.append("pixel\n" + pixel)

    # -- 5. interactions ----------------------------------------------------
    print("5/5 interactions")
    inter = []
    for script in ("check_forms.py", "check_lead_api.py",
                   "check_behavioral_calc.py"):
        rc, out = run([script])
        passed = "all assertions pass" in out
        n_ok = out.count("  ok   ")
        inter.append((script, n_ok, passed))
        if not passed:
            problems.append(f"{script}\n{out}")
        print(f"   {script:28s} {n_ok} assertions {'pass' if passed else 'FAIL'}")

    # -- write --------------------------------------------------------------
    build_id = (HERE.parent.parent / "careorbit-next" / ".next" / "BUILD_ID")
    build = build_id.read_text().strip() if build_id.exists() else "unknown"
    took = (datetime.datetime.now() - started).total_seconds() / 60

    doc = [
        "# Verification results",
        "",
        f"One complete run of every check in the harness against the final "
        f"build.",
        "",
        f"- **Run:** {started:%Y-%m-%d %H:%M}, {took:.0f} minutes",
        f"- **Build ID:** `{build}`",
        f"- **Pages:** {len(pages)} (Login excluded by decision)",
        "",
        "Reproduce with `migration/scripts/run_closeout.py`, both servers up.",
        "",
        "## Summary",
        "",
        "| Check | Scope | Result |",
        "|---|---|---|",
        f"| Rendered copy (`diff_text.py`) | {len(pages)} pages | "
        f"**{sum(1 for _, v in text_rows if v == 'IDENTICAL')}/{len(pages)} "
        f"identical** |",
        f"| Computed layout (`audit_responsive.py`) | {len(pages)} pages x 4 "
        f"widths | **{sum(v for _, v in resp_rows)} mismatches** |",
        f"| Computed typography (`audit_typography.py`) | {len(pages)} pages | "
        f"**{typo_n} mismatches** |",
        f"| Pixel diff (`verify_all.py`) | {len(pages)} pages x 5 widths | see "
        f"below |",
    ]
    for s, n_ok, ok in inter:
        doc.append(f"| `{s}` | interaction | **{n_ok} assertions, "
                   f"{'all pass' if ok else 'FAILURES'}** |")

    doc += ["", "## Pixel diff, page by page", "", "```", pixel, "```", ""]
    doc += ["## Rendered copy", "",
            "| Page | Result |", "|---|---|"]
    doc += [f"| {n} | {v} |" for n, v in text_rows]
    if shadow_notes:
        doc += ["",
                f"{shadow_notes} page(s) additionally reported an image-slot "
                "shadow-DOM placeholder caption. Those captions are painted by "
                "both builds; `innerText` cannot see them on the legacy side, "
                "so they are reported separately rather than as missing copy."]
    doc += ["", "## Computed layout", "",
            "| Page | Mismatches |", "|---|---|"]
    doc += [f"| {n} | {c} |" for n, c in resp_rows]

    if problems:
        doc += ["", "## Problems", ""]
        for p in problems:
            doc += ["```", p[:3000], "```", ""]
    else:
        doc += ["", "## Problems", "", "None.", ""]

    OUT.write_text("\n".join(doc) + "\n")
    print(f"\nwrote {OUT}")
    print("PROBLEMS" if problems else "clean")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
