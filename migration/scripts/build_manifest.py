#!/usr/bin/env python3
"""
Phase 0 - asset manifest for the frozen v2-maven snapshot.

READ-ONLY with respect to v2-maven and the snapshot. Reads the snapshot,
writes JSON/CSV into migration/manifest/.

Produces:
  assets.csv          every file: path, bytes, sha256, kind, image dims
  assets.json         same, structured
  references.json     which local assets each page references
  missing.json        referenced-but-absent local assets
  orphans.json        present-but-never-referenced assets
  pages.json          the 29 production pages + their target routes
  summary.json        headline counts
"""
import csv
import hashlib
import json
import os
import re
import struct
import sys
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
MIG = os.path.dirname(HERE)
ROOT = os.path.dirname(MIG)
SNAP = os.path.join(MIG, "reference", "v2-maven-snapshot")
OUT = os.path.join(MIG, "manifest")

TEXT_EXT = {".html", ".js", ".css", ".md", ".json", ".svg"}
IMAGE_EXT = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"}

# The 29 production pages, mapped to the approved nested route shape.
# (route file -> component file it renders, or None when it is the page itself)
PAGES = [
    ("Home.dc.html",                None,                            "Home",                         "/"),
    ("Platform.dc.html",            None,                            "Platform",                     "/platform"),
    ("EngagePage.dc.html",          None,                            "Engage",                       "/platform/engage"),
    ("AssessPage.dc.html",          None,                            "Assess",                       "/platform/assess"),
    ("CapturePage.dc.html",         None,                            "Capture",                      "/platform/capture"),
    ("DataPage.dc.html",            None,                            "Data Insights",                "/platform/data"),
    ("Outcomes.dc.html",            None,                            "Outcomes",                     "/outcomes"),
    ("Pricing.dc.html",             None,                            "Pricing - Engage",             "/pricing"),
    ("PricingAssess.dc.html",       None,                            "Pricing - Assess",             "/pricing/assess"),
    ("PricingCapture.dc.html",      None,                            "Pricing - Capture",            "/pricing/capture"),
    ("PricingData.dc.html",         None,                            "Pricing - Data Insights",      "/pricing/data"),
    ("About.dc.html",               None,                            "About",                        "/about"),
    ("BookACall.dc.html",           None,                            "Book a Call",                  "/book-a-call"),
    ("ThankYou.dc.html",            None,                            "Thank You",                    "/thank-you"),
    ("Login.dc.html",               None,                            "Login",                        "(excluded from production)"),
    ("Oncology.dc.html",            "OncologyPage.dc.html",          "Oncology",                     "/orbits/oncology"),
    ("PrimaryCare.dc.html",         "PrimaryCarePage.dc.html",       "Primary Care",                 "/orbits/primary-care"),
    ("Cardiology.dc.html",          "CardiologyPage.dc.html",        "Cardiology",                   "/orbits/cardiology"),
    ("Orthopedics.dc.html",         "OrthopedicsPage.dc.html",       "Orthopedics",                  "/orbits/orthopedics"),
    ("WomensHealth.dc.html",        "WomensHealthPage.dc.html",      "Women's Health",               "/orbits/womens-health"),
    ("Bariatrics.dc.html",          "BariatricsPage.dc.html",        "Bariatrics",                   "/orbits/bariatrics"),
    ("BehavioralHealth.dc.html",    "BehavioralHealthPage.dc.html",  "Behavioral Health",            "/orbits/behavioral-health"),
    ("MedicationTherapy.dc.html",   "MedicationTherapyPage.dc.html", "Medication Therapy",           "/orbits/medication-therapy"),
    ("CommunityResearch.dc.html",   None,                            "Community-Based Research",     "/orbits/community-research"),
    ("SurgicalSupport.dc.html",     "SurgicalSupportPage.dc.html",   "Surgical Support",             "/orbits/surgical-support"),
    ("BehavioralSafety.dc.html",    None,                            "Behavioral Risk",              "/orbits/behavioral-risk"),
    ("SitemanStudy.dc.html",        None,                            "Siteman Study",                "/evidence/siteman-study"),
    ("PritikinPilot.dc.html",       None,                            "Pritikin Pilot",               "/evidence/pritikin-pilot"),
    ("EScreeningResults.dc.html",   None,                            "VA eScreening Results",        "/evidence/escreening-results"),
]

# Files that exist but are deliberately not production routes.
NON_ROUTE = {
    "SiteNav.dc.html": "shared component",
    "SiteFooter.dc.html": "shared component",
    "StudyRequest.dc.html": "shared component",
    "OrbitPage.dc.html": "dead code - nothing imports it",
    "CardiologyPage v1.dc.html": "superseded draft",
    "CommunityResearch v1.dc.html": "superseded draft",
    "BehavioralSafety-standalone.html": "10.9 MB self-contained export",
    "OncologyPage-print.html": "print template (preserved per decision 3)",
    "OrthopedicsPage-print.html": "print template (preserved per decision 3)",
    "PancreaticStudy-print.dc.html": "print template (preserved per decision 3)",
    "PrimaryCareSheet-print.dc.html": "print template (preserved per decision 3)",
    "PritikinPilotSummaryPDF.dc.html": "print template (preserved per decision 3)",
    "PritikinPilotSummaryPDF-print.dc.html": "print template (preserved per decision 3)",
    "archive/Platform-tabs.dc.html": "archived draft",
}


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def png_size(path):
    """Read width/height from a PNG IHDR without external deps."""
    try:
        with open(path, "rb") as fh:
            head = fh.read(26)
        if head[:8] != b"\x89PNG\r\n\x1a\n":
            return None
        w, h = struct.unpack(">II", head[16:24])
        return w, h
    except Exception:
        return None


def jpeg_size(path):
    try:
        with open(path, "rb") as fh:
            data = fh.read()
        i = 2
        while i < len(data) - 9:
            if data[i] != 0xFF:
                i += 1
                continue
            marker = data[i + 1]
            if marker in (0xC0, 0xC1, 0xC2, 0xC3):
                h, w = struct.unpack(">HH", data[i + 5:i + 9])
                return w, h
            seglen = struct.unpack(">H", data[i + 2:i + 4])[0]
            i += 2 + seglen
    except Exception:
        pass
    return None


def kind_for(rel, ext):
    if rel.endswith(".dc.html") or ext == ".html":
        return "page-or-template"
    if ext == ".js":
        return "script"
    if ext == ".css":
        return "stylesheet"
    if ext == ".pdf":
        return "pdf"
    if ext in IMAGE_EXT:
        return "image"
    if ext == ".md":
        return "doc"
    return "other"


def main():
    if not os.path.isdir(SNAP):
        sys.exit("snapshot not found: %s" % SNAP)
    os.makedirs(OUT, exist_ok=True)

    rows = []
    present = set()
    for dirpath, dirnames, filenames in os.walk(SNAP):
        dirnames.sort()
        for name in sorted(filenames):
            full = os.path.join(dirpath, name)
            rel = os.path.relpath(full, SNAP)
            present.add(rel)
            ext = os.path.splitext(name)[1].lower()
            dims = ""
            if ext == ".png":
                d = png_size(full)
                if d:
                    dims = "%dx%d" % d
            elif ext in (".jpg", ".jpeg"):
                d = jpeg_size(full)
                if d:
                    dims = "%dx%d" % d
            rows.append({
                "path": rel,
                "bytes": os.path.getsize(full),
                "sha256": sha256(full),
                "kind": kind_for(rel, ext),
                "dimensions": dims,
            })

    # ---- reference scan -------------------------------------------------
    asset_re = re.compile(
        r"""["'(]\s*((?:\.\./)?[A-Za-z0-9_][A-Za-z0-9_./ -]*\.(?:png|jpe?g|gif|svg|webp|pdf|css|js))\s*["')]""",
        re.IGNORECASE,
    )
    page_re = re.compile(r"""["']([A-Za-z0-9_ -]+\.(?:dc\.)?html)(?:[?#][^"']*)?["']""")

    references = defaultdict(list)
    page_links = defaultdict(list)
    referenced = set()
    linked_pages = set()

    for r in rows:
        rel = r["path"]
        if os.path.splitext(rel)[1].lower() not in TEXT_EXT:
            continue
        if r["bytes"] > 4_000_000:      # skip the 10.9 MB standalone bundle
            continue
        with open(os.path.join(SNAP, rel), "r", encoding="utf-8", errors="ignore") as fh:
            text = fh.read()
        for m in asset_re.finditer(text):
            target = m.group(1)
            if target.startswith("http") or target.startswith("//"):
                continue
            references[rel].append(target)
            referenced.add(target)
        for m in page_re.finditer(text):
            page_links[rel].append(m.group(1))
            linked_pages.add(m.group(1))

    def resolves(target):
        """True when a referenced path resolves inside the snapshot or the project."""
        if target.startswith("../"):
            return os.path.isfile(os.path.join(ROOT, target[3:]))
        return target in present or os.path.join("images", target) in present

    missing = sorted({t for t in referenced if not resolves(t)})
    missing_pages = sorted({p for p in linked_pages if p not in present})

    # download= filenames are not paths; flag them separately
    download_names = set()
    for rel, targets in references.items():
        src = os.path.join(SNAP, rel)
        with open(src, "r", encoding="utf-8", errors="ignore") as fh:
            text = fh.read()
        for m in re.finditer(r'download\s*=\s*"([^"]+)"', text):
            download_names.add(m.group(1))
        for m in re.finditer(r'a\.download\s*=\s*"([^"]+)"', text):
            download_names.add(m.group(1))

    real_missing = [m for m in missing if m not in download_names]
    label_only = [m for m in missing if m in download_names]

    # Record who references each missing item so it never needs re-investigating.
    def referrers_of(target, table):
        return sorted({rel for rel, targets in table.items() if target in targets})

    missing_detail = {}
    for m in real_missing:
        refs = referrers_of(m, references)
        prod = [r for r in refs
                if not r.startswith("archive/")
                and r not in ("support.js", "image-slot.js", "doc-page.js")]
        missing_detail[m] = {
            "referenced_by": refs,
            "affects_production": bool(prod),
            "production_referrers": prod,
        }
    missing_page_detail = {}
    for m in missing_pages:
        refs = referrers_of(m, page_links)
        prod = [r for r in refs if not r.startswith("archive/")]
        missing_page_detail[m] = {
            "referenced_by": refs,
            "affects_production": bool(prod),
            "production_referrers": prod,
        }

    media = {r["path"] for r in rows if r["kind"] in ("image", "pdf")}
    ref_norm = set()
    for t in referenced:
        ref_norm.add(t)
        if os.path.join("images", t) in present:
            ref_norm.add(os.path.join("images", t))
    orphans = sorted(media - ref_norm)

    # ---- duplicate detection -------------------------------------------
    by_hash = defaultdict(list)
    for r in rows:
        if r["kind"] in ("image", "pdf"):
            by_hash[r["sha256"]].append(r["path"])
    duplicates = {h: p for h, p in by_hash.items() if len(p) > 1}

    # ---- write outputs --------------------------------------------------
    with open(os.path.join(OUT, "assets.csv"), "w", newline="", encoding="utf-8") as fh:
        w = csv.DictWriter(fh, fieldnames=["path", "bytes", "sha256", "kind", "dimensions"])
        w.writeheader()
        w.writerows(rows)

    def dump(name, obj):
        with open(os.path.join(OUT, name), "w", encoding="utf-8") as fh:
            json.dump(obj, fh, indent=2, sort_keys=True)

    dump("assets.json", rows)
    dump("references.json", {k: sorted(set(v)) for k, v in sorted(references.items())})
    dump("missing.json", {
        "missing_assets": missing_detail,
        "missing_linked_pages": missing_page_detail,
        "download_filenames_not_paths": sorted(label_only),
        "note": (
            "affects_production=false means the only referrers are archived drafts "
            "or the dc-runtime's own source. 'parsed.js' is a known false positive: "
            "it is the property access parsed.js inside support.js, not a file path."
        ),
    })
    dump("orphans.json", orphans)
    dump("duplicates.json", duplicates)
    dump("pages.json", [
        {"route_file": a, "renders": b, "page_name": c, "target_route": d}
        for a, b, c, d in PAGES
    ])
    dump("non_routes.json", NON_ROUTE)

    kinds = defaultdict(lambda: {"count": 0, "bytes": 0})
    for r in rows:
        kinds[r["kind"]]["count"] += 1
        kinds[r["kind"]]["bytes"] += r["bytes"]

    summary = {
        "snapshot_path": os.path.relpath(SNAP, ROOT),
        "total_files": len(rows),
        "total_bytes": sum(r["bytes"] for r in rows),
        "by_kind": dict(kinds),
        "production_pages": len(PAGES),
        "images_over_2mb": sum(
            1 for r in rows if r["kind"] == "image" and r["bytes"] > 2_000_000
        ),
        "missing_assets": len(real_missing),
        "missing_linked_pages": len(missing_pages),
        "orphan_media": len(orphans),
        "duplicate_media_groups": len(duplicates),
    }
    dump("summary.json", summary)
    print(json.dumps(summary, indent=2))
    if real_missing:
        print("\nMISSING ASSETS:")
        for m in real_missing:
            print("  " + m)
    if missing_pages:
        print("\nMISSING LINKED PAGES:")
        for m in missing_pages:
            print("  " + m)


if __name__ == "__main__":
    main()
