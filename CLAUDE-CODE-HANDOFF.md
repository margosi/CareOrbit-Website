# CareOrbit Website — Claude Code Handoff

This folder is the complete, current CareOrbit design project (16-page site). It is a
**working static site**, not just mockups — preserve it exactly; do not rebuild or redesign.

## What's here
- `v2-maven/` — the live site. Every page is a `*.dc.html` file (self-contained HTML that
  loads `./support.js`, a small runtime included in the folder). Shared pieces:
  `SiteNav.dc.html`, `SiteFooter.dc.html`, `orbits-data.js`, `motion.js` (scroll reveals +
  count-ups), `image-slot.js`, `doc-page.js`. Images in `v2-maven/` root and `v2-maven/images/`.
  Info-sheet PDFs live in `v2-maven/` and `v2-maven/sheets/`.
- `v2-maven/PAGE-STANDARD.md` — binding page spec (section order, ledger rows, navy panels,
  evidence + gated StudyRequest pattern, responsive rules). Read before touching any page.
- `CLAUDE.md` — project rules: brand palette, fonts (Lato + Source Serif 4 italic accents,
  Inter body), locked copy rules, stat sourcing rules, language rules (no "link", no em
  dashes, no "catalog").
- `uploads/` — the user's brief, voice, and rules docs. Copy is brief-locked.
- `design_handoff_careorbit_site/` — earlier handoff notes + `push.command` (git helper).
- `v1/`, `v2-maven/archive/` — old versions. Do not edit.

## Run it locally
```bash
cd <project folder>
python3 -m http.server 8000
# open http://localhost:8000/v2-maven/Home.dc.html
```
A server is required (pages fetch sibling files); opening via file:// will not work.

## Verify checklist
- Home.dc.html: hero image fader + dots, sticky pill nav, navy orbit grid, donut-ring
  stats animate on scroll, footer watermark.
- Platform.dc.html: sections #how-orbits-work, #features, #outcomes, #experiences;
  footer Platform links anchor to them.
- Orbit pages (CardiologyPage, OrthopedicsPage, etc.): ledger layout per PAGE-STANDARD.md.
- All 16 forms: required-field asterisks, honeypot/timing bot checks, instant PDF download.
- BookACall.dc.html: embedded Calendly (careorbitceo/20-min-intro-call) with pre-fill.

## Known state / next steps (do not start without the user)
- Forms are client-side only; planned: Supabase for lead capture + Resend email via a
  Supabase Edge Function (keys never in site code).
- Some image slots are placeholders awaiting real photos.

## Working rules for Claude Code
1. This is the source of truth for look, copy, and behavior. When migrating to a framework
   later, recreate pixel-perfectly; until then, keep serving these files as-is.
2. Never alter locked copy, stats, or naming rules (see CLAUDE.md and uploads/my-rules.md).
3. Keep `support.js` untouched — it is the page runtime.
