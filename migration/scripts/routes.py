"""Baseline name -> Next.js route, for the whole-site verification sweep.

Keys are the Phase 0 baseline PNG stems (migration/baseline/<w>px/<name>.png).
Pages not yet migrated are listed with a None route and skipped.
"""

ROUTES = {
    # Phase 3-5
    "Home": "/",
    "Platform": "/platform",
    "EngagePage": "/platform/engage",
    "AssessPage": "/platform/assess",
    "CapturePage": "/platform/capture",
    "DataPage": "/platform/data",
    "Outcomes": "/outcomes",
    "Pricing": "/pricing",
    "PricingAssess": "/pricing/assess",
    "PricingCapture": "/pricing/capture",
    "PricingData": "/pricing/data",
    "About": "/about",
    "BookACall": "/book-a-call",
    "ThankYou": "/thank-you",
    # Phase 6a
    "Cardiology": "/orbits/cardiology",
    "Orthopedics": "/orbits/orthopedics",
    "BehavioralSafety": "/orbits/behavioral-risk",
    # Phase 6b
    "Oncology": "/orbits/oncology",
    "PrimaryCare": "/orbits/primary-care",
    "WomensHealth": "/orbits/womens-health",
    "Bariatrics": "/orbits/bariatrics",
    "BehavioralHealth": "/orbits/behavioral-health",
    "MedicationTherapy": "/orbits/medication-therapy",
    "SurgicalSupport": "/orbits/surgical-support",
    "CommunityResearch": "/orbits/community-research",
    # Phase 7
    "SitemanStudy": "/evidence/siteman-study",
    "PritikinPilot": "/evidence/pritikin-pilot",
    "EScreeningResults": "/evidence/escreening-results",
    # Excluded from the production site by decision (Phase 0).
    "Login": None,
}
