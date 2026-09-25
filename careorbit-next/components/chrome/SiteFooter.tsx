import Link from "next/link";
import { FOOTER_COLUMNS } from "@/lib/nav";
import { hv } from "@/lib/hoverStyles";
import { NewsletterSignup } from "./NewsletterSignup";

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
    /* <footer> rather than <div>: this is the contentinfo landmark. */
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
            maxWidth: 1320,
            margin: "0 auto",
            padding: "clamp(56px,6vw,88px) clamp(24px,4vw,56px) 28px",
            boxSizing: "border-box",
          }}
        >
          <div
            data-ft-top=""
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr) 380px",
              gap: "clamp(40px,5vw,96px)",
              alignItems: "start",
            }}
          >
            <div
              data-ft-cols=""
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,minmax(0,1fr))",
                gap: 32,
              }}
            >
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
              data-ft-side=""
              style={{ display: "flex", flexDirection: "column", gap: 28 }}
            >
              <NewsletterSignup />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  fontSize: 13.5,
                  lineHeight: 1.6,
                }}
              >
                <div style={{ color: "#FFFFFF", fontWeight: 600 }}>
                  CareOrbit is a Total Orbit company
                </div>
                <div>4240 Duncan Ave, Suite #200, St. Louis, MO 63110</div>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px" }}
                >
                  <a
                    href="mailto:sales@totalorbit.com"
                    className={hv("footerLink")}
                    style={{
                      color: "#CDD9E6",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    sales@totalorbit.com
                  </a>
                  <a
                    href="tel:3145404827"
                    className={hv("footerLink")}
                    style={{
                      color: "#CDD9E6",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    314-540-4827
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            data-ft-bottom=""
            style={{
              borderTop: "1px solid #1E3A5F",
              marginTop: "clamp(48px,5vw,72px)",
              paddingTop: 22,
              display: "flex",
              flexWrap: "wrap",
              gap: "14px 28px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
              {[
                { label: "Terms", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className={hv("footerLink")}
                  style={{
                    fontSize: 12.5,
                    color: "#9FB3C8",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
            <div
              style={{
                fontSize: 12.5,
                color: "#7E93AB",
                whiteSpace: "nowrap",
              }}
            >
              &copy; 2026 Total Orbit. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
