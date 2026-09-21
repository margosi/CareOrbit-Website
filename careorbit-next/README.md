# CareOrbit website (Next.js)

Production rebuild of `v2-maven/`, the Claude Design static site. Same
pages, same copy, same design — rebuilt on Next.js App Router with
TypeScript.

**The legacy site is still the live one.** `v2-maven/` is untouched and
still runs exactly as before. Nothing here has been deployed.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build, which is what the verification harness measures:

```bash
npm run build && npm run start
```

## Checks

```bash
npm run verify     # typecheck + lint + format + hover-css drift + build
```

Individually: `npm run typecheck`, `npm run lint`, `npm run format:check`,
`npm run gen:hover:check`.

## Things that are load-bearing, and will break quietly if changed

**`app/responsive.css` is a contract.** v2-maven's `responsive.css` matched
React's _serialised inline styles_
(`div[style*="grid-template-columns: repeat(4, minmax(0px, 1fr))"]`). Those
selectors are replaced by explicit `data-*` attributes, listed at the top of
that file. A grid that needs to collapse on mobile must carry the right
attribute; miss it and nothing errors, the page just stops being responsive.

**Source order inside each page stylesheet.** Several attributes are
declared at more than one breakpoint with `!important` on both sides, so the
_later_ rule wins. Grouping rules by breakpoint silently changes the winner.
Each sheet says so at the top.

**Specificity against the global sheet.** Two legacy page rules never took
effect, because the global selector that competes with them is one
specificity step higher. Both are documented where they were dropped
(`app/orbits/behavioral-risk/behavioral-risk.css`,
`app/evidence/pritikin-pilot/pritikin-pilot.css`). Do not "restore" them
without re-baselining.

**`app/hover.css` is generated.** Edit `lib/hoverStyles.ts`, then
`npm run gen:hover`. `!important` on every declaration is required: base
styles are inline and would otherwise win.

**Fonts are self-hosted under their real family names** (`app/fonts.css`),
not `next/font`, which hashes family names — inline `font-family: Lato` is
used on nearly every element in this codebase.

**`lib/server/*` must stay server-only.** Both modules begin with
`import "server-only"`. That is what makes it a build error, rather than a
leaked key, if a client component imports one.

## Environment

Everything is optional — see `.env.example`. With nothing set, the forms
behave exactly as they do on the live site today: they validate, serve the
download or open Calendly, and transmit nothing.

| Variable                                                            | Effect when set                                                                                                                                       |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                                              | Canonicals and sitemap URLs. Defaults to `https://careorbit.com`, the confirmed production hostname — set it only to point a preview build elsewhere. |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_LEADS_TABLE` | Form submissions are stored                                                                                                                           |
| `RESEND_API_KEY`, `LEAD_NOTIFY_TO`, `LEAD_NOTIFY_FROM`              | Form submissions are emailed                                                                                                                          |

## Verification harness

Lives in `../migration/scripts/`. Needs the legacy site on `:8000`
(`python3 -m http.server 8000` from the project root) and this app on
`:3000`.

| Script                     | What it proves                                                           |
| -------------------------- | ------------------------------------------------------------------------ |
| `verify_all.py`            | Pixel-diffs every page against the Phase 0 baseline at 5 widths          |
| `verify_page.py`           | One page, with the body-above-footer region check                        |
| `audit_responsive.py`      | Computed grid/padding/alignment, legacy vs new                           |
| `diff_text.py`             | Rendered text, line by line — catches copy drift                         |
| `check_forms.py`           | The three forms still download / unlock / open Calendly                  |
| `check_lead_api.py`        | `/api/lead` behaviour, and that no secret reaches the bundle             |
| `check_behavioral_calc.py` | The Behavioral Risk ROI calculator's arithmetic                          |
| `audit_typography.py`      | Computed font-size / line-height / max-width / colour of every text node |

Or run the lot and write a dated record to
`../migration/VERIFICATION-RESULTS.md`:

```bash
<venv>/bin/python run_closeout.py
```

## Status

Migration complete, visual review approved, **not deployed**. The legacy
site in `../v2-maven/` is untouched and still live.

Not yet done, waiting on a decision: source control, and the 170 MB of PNG
masters in `public/images/` — worth resolving **before** the first commit.
Both are covered in `../migration/FINAL-REPORT.md` section 9.

Full history, every deviation and every legacy bug corrected:
`../migration/MIGRATION-LOG.md`. What still needs a human:
`../migration/FINAL-REPORT.md` section 8.
