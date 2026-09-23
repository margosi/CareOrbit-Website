import Link from "next/link";
import { FOOTER_COLUMNS } from "@/lib/nav";
import { hv } from "@/lib/hoverStyles";

/* Port of v2-maven/SiteFooter.dc.html.
 *
 * Server component - the footer has no state or effects.
 *
 * INTENTIONAL IMPROVEMENT OVER THE LEGACY SITE (approved after Phase 2):
 * v2-maven declared [data-footer-grid] as `1.3fr repeat(4, minmax(0,1fr))`
 * with no media query anywhere. Below ~900px the 40px gaps consume the row
 * and the four link columns collapse to ~7px wide, overlapping illegibly
 * (measured 7.125px at 390px on the live site).
 *
 * The grid now collapses like every other grid on the site: two columns
 * under 900px, one under 640px, with the brand block spanning the full row.
 * Rules live in app/responsive.css next to the rest of the breakpoints.
 *
 * This is a DELIBERATE divergence from the Phase 0 baseline at 768px and
 * 390px. The verification tooling records it as an expected deviation, not
 * a diff failure. Desktop widths (>=1024px) are unchanged and still match
 * the baseline exactly.
 *
 * MIGRATION NOTE - prefetch disabled while routes are being built. See
 * SiteNav for the same note.
 */
const NO_PREFETCH = { prefetch: false } as const;

export function SiteFooter() {
  return (
    /* <footer> rather than <div>: this is the contentinfo landmark.
     * display:block on both, so the rendering is unchanged. */
    <footer style={{ background: "#FAF8F4" }}>
      <div
        style={{
          background:
            "#0F1D2E url(/brand/arc-lines.svg) center/cover no-repeat",
          color: "#9FB3C8",
          fontFamily: "Inter,sans-serif",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            maxWidth: 1220,
            margin: "0 auto",
            padding: "56px 28px 28px",
          }}
        >
          <div
            data-footer-grid=""
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "1.3fr repeat(4,minmax(0,1fr))",
              gap: 40,
              alignItems: "start",
            }}
          >
            <div
              data-footer-brand=""
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <OrbitMark />
                <span
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 900,
                    fontSize: 20,
                    color: "#FFFFFF",
                  }}
                >
                  Total&nbsp;Orbit
                </span>
              </div>
              <div style={{ fontSize: 13.5, lineHeight: 1.6 }}>
                CareOrbit is a Total Orbit company.
                <br />
                4240 Duncan Ave, Suite #200
                <br />
                St. Louis, MO 63110
              </div>
              <div style={{ fontSize: 13.5, lineHeight: 1.8 }}>
                <a
                  href="mailto:sales@totalorbit.com"
                  className={hv("footerLink")}
                  style={{ color: "#CDD9E6", textDecoration: "none" }}
                >
                  sales@totalorbit.com
                </a>
                <br />
                <a
                  href="tel:3145404827"
                  className={hv("footerLink")}
                  style={{ color: "#CDD9E6", textDecoration: "none" }}
                >
                  314-540-4827
                </a>
              </div>
            </div>

            {FOOTER_COLUMNS.map((col) => (
              <div
                key={col.title}
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "#71869D",
                  }}
                >
                  {col.title}
                </div>
                {col.links.map((l) => {
                  const style = {
                    fontSize: 14,
                    color: "#9FB3C8",
                    textDecoration: "none",
                    lineHeight: 1.5,
                    transition: "color .15s",
                  } as const;
                  /* mailto: and the PDF are plain anchors; Link is for routes. */
                  const external =
                    l.href.startsWith("mailto:") ||
                    l.href.startsWith("/sheets/");
                  return external ? (
                    <a
                      key={l.href}
                      href={l.href}
                      className={hv("footerLink")}
                      style={style}
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      key={l.href}
                      href={l.href}
                      {...NO_PREFETCH}
                      className={hv("footerLink")}
                      style={style}
                    >
                      {l.label}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>

          <div
            style={{
              position: "relative",
              borderTop: "1px solid #1E3A5F",
              marginTop: 36,
              paddingTop: 20,
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 12.5, color: "#71869D" }}>
              &copy; 2026 Total Orbit. All rights reserved.
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              {["HIPAA Compliance", "Privacy Policy", "Terms"].map((label) => (
                /* href="#" in the original - these pages do not exist yet. */
                <a
                  key={label}
                  href="#"
                  className={hv("footerLink")}
                  style={{
                    fontSize: 12.5,
                    color: "#9FB3C8",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* The Total Orbit logomark: 15 orbiting dots plus a six-spoke hub.
 * Coordinates copied exactly from SiteFooter.dc.html lines 21-24. */
const DOTS: [number, number, number][] = [
  [42, 24, 3.4],
  [40.3, 16.4, 2.8],
  [35.6, 10.2, 2],
  [28.7, 6.6, 1.3],
  [22.4, 6.1, 0.9],
  [17.2, 7.3, 1.3],
  [11.3, 11.3, 2.1],
  [7.1, 17.8, 2.9],
  [6.1, 25.6, 2],
  [7.7, 31.6, 1.3],
  [10.6, 36, 0.8],
  [22.4, 41.9, 0.7],
  [28.7, 41.4, 1],
  [34.3, 38.7, 1.4],
  [39.6, 33, 2.4],
];

const SPOKES = [
  "M24 21V15.5",
  "M24 27v5.5",
  "M26.6 22.5l4.8-2.75",
  "M21.4 25.5l-4.8 2.75",
  "M21.4 22.5l-4.8-2.75",
  "M26.6 25.5l4.8 2.75",
];

function OrbitMark() {
  return (
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
      {DOTS.map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#FFFFFF" />
      ))}
      <g stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round">
        {SPOKES.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}
