# Verification results

One complete run of every check in the harness against the final build.

- **Run:** 2026-09-21 13:27, 21 minutes
- **Build ID:** `tKcYoyG7X_coov4diRIqb`
- **Pages:** 28 (Login excluded by decision)

Reproduce with `migration/scripts/run_closeout.py`, both servers up.

## Summary

| Check | Scope | Result |
|---|---|---|
| Rendered copy (`diff_text.py`) | 28 pages | **28/28 identical** |
| Computed layout (`audit_responsive.py`) | 28 pages x 4 widths | **0 mismatches** |
| Computed typography (`audit_typography.py`) | 28 pages | **0 mismatches** |
| Pixel diff (`verify_all.py`) | 28 pages x 5 widths | see below |
| `check_forms.py` | interaction | **8 assertions, all pass** |
| `check_lead_api.py` | interaction | **18 assertions, all pass** |
| `check_behavioral_calc.py` | interaction | **25 assertions, all pass** |

## Pixel diff, page by page

```
=== verification sweep ===
Home                 3 pass, 0 approved-deviation, 2 review, 0 fail
Platform             3 pass, 0 approved-deviation, 2 review, 0 fail
EngagePage           3 pass, 2 approved-deviation, 0 review, 0 fail
AssessPage           3 pass, 2 approved-deviation, 0 review, 0 fail
CapturePage          3 pass, 2 approved-deviation, 0 review, 0 fail
DataPage             3 pass, 2 approved-deviation, 0 review, 0 fail
Outcomes             3 pass, 2 approved-deviation, 0 review, 0 fail
Pricing              3 pass, 2 approved-deviation, 0 review, 0 fail
PricingAssess        3 pass, 2 approved-deviation, 0 review, 0 fail
PricingCapture       3 pass, 2 approved-deviation, 0 review, 0 fail
PricingData          3 pass, 2 approved-deviation, 0 review, 0 fail
About                3 pass, 2 approved-deviation, 0 review, 0 fail
BookACall            3 pass, 2 approved-deviation, 0 review, 0 fail
ThankYou             3 pass, 2 approved-deviation, 0 review, 0 fail
Cardiology           3 pass, 2 approved-deviation, 0 review, 0 fail
Orthopedics          3 pass, 2 approved-deviation, 0 review, 0 fail
BehavioralSafety     3 pass, 2 approved-deviation, 0 review, 0 fail
Oncology             3 pass, 2 approved-deviation, 0 review, 0 fail
PrimaryCare          3 pass, 2 approved-deviation, 0 review, 0 fail
WomensHealth         3 pass, 2 approved-deviation, 0 review, 0 fail
Bariatrics           3 pass, 2 approved-deviation, 0 review, 0 fail
BehavioralHealth     3 pass, 2 approved-deviation, 0 review, 0 fail
MedicationTherapy    3 pass, 2 approved-deviation, 0 review, 0 fail
SurgicalSupport      3 pass, 2 approved-deviation, 0 review, 0 fail
CommunityResearch    3 pass, 2 approved-deviation, 0 review, 0 fail
SitemanStudy         3 pass, 2 approved-deviation, 0 review, 0 fail
PritikinPilot        3 pass, 2 approved-deviation, 0 review, 0 fail
EScreeningResults    3 pass, 2 approved-deviation, 0 review, 0 fail

skipped:
  Login (excluded by decision)

28 page(s) checked, 0 with failures
```

## Rendered copy

| Page | Result |
|---|---|
| Home | IDENTICAL |
| Platform | IDENTICAL |
| EngagePage | IDENTICAL |
| AssessPage | IDENTICAL |
| CapturePage | IDENTICAL |
| DataPage | IDENTICAL |
| Outcomes | IDENTICAL |
| Pricing | IDENTICAL |
| PricingAssess | IDENTICAL |
| PricingCapture | IDENTICAL |
| PricingData | IDENTICAL |
| About | IDENTICAL |
| BookACall | IDENTICAL |
| ThankYou | IDENTICAL |
| Cardiology | IDENTICAL |
| Orthopedics | IDENTICAL |
| BehavioralSafety | IDENTICAL |
| Oncology | IDENTICAL |
| PrimaryCare | IDENTICAL |
| WomensHealth | IDENTICAL |
| Bariatrics | IDENTICAL |
| BehavioralHealth | IDENTICAL |
| MedicationTherapy | IDENTICAL |
| SurgicalSupport | IDENTICAL |
| CommunityResearch | IDENTICAL |
| SitemanStudy | IDENTICAL |
| PritikinPilot | IDENTICAL |
| EScreeningResults | IDENTICAL |

1 page(s) additionally reported an image-slot shadow-DOM placeholder caption. Those captions are painted by both builds; `innerText` cannot see them on the legacy side, so they are reported separately rather than as missing copy.

## Computed layout

| Page | Mismatches |
|---|---|
| Home | 0 |
| Platform | 0 |
| EngagePage | 0 |
| AssessPage | 0 |
| CapturePage | 0 |
| DataPage | 0 |
| Outcomes | 0 |
| Pricing | 0 |
| PricingAssess | 0 |
| PricingCapture | 0 |
| PricingData | 0 |
| About | 0 |
| BookACall | 0 |
| ThankYou | 0 |
| Cardiology | 0 |
| Orthopedics | 0 |
| BehavioralSafety | 0 |
| Oncology | 0 |
| PrimaryCare | 0 |
| WomensHealth | 0 |
| Bariatrics | 0 |
| BehavioralHealth | 0 |
| MedicationTherapy | 0 |
| SurgicalSupport | 0 |
| CommunityResearch | 0 |
| SitemanStudy | 0 |
| PritikinPilot | 0 |
| EScreeningResults | 0 |

## Problems

None.

