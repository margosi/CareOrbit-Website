import Link from "next/link";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { Em, EYEBROW, H2_LIGHT } from "@/components/orbits/ledger";
import { hv } from "@/lib/hoverStyles";
import { ORBITS } from "@/lib/nav";

/* 404. Net-new: v2-maven is a folder of static files with no not-found
 * page at all, so a bad URL there is whatever the host happens to serve.
 *
 * Built from the site's own type ramp and the existing nav data - no new
 * copy beyond the two short lines below - and it offers the orbit list,
 * because a mistyped or retired /orbits/* URL is the likeliest way to land
 * here once the legacy .dc.html redirects are in place.
 */
export const metadata = {
  title: "Page not found | CareOrbit",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div style={{ fontFamily: "Inter,sans-serif", background: "#FAF8F4" }}>
      <SiteNav />

      <div
        data-pad="page-top"
        style={{
          maxWidth: 1220,
          margin: "0 auto",
          padding: "72px 28px 96px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div style={{ ...EYEBROW, color: "#B0A99E" }}>404</div>

        <h1
          style={{
            fontFamily: "Lato,sans-serif",
            fontWeight: 900,
            fontSize: "clamp(34px,4.2vw,50px)",
            lineHeight: 1.06,
            letterSpacing: "-0.025em",
            margin: 0,
            maxWidth: 720,
            textWrap: "balance",
          }}
        >
          That page is not <Em>in orbit</Em>.
        </h1>

        <p
          style={{
            fontSize: 17.5,
            lineHeight: 1.65,
            color: "rgba(15,29,46,.72)",
            margin: 0,
            maxWidth: 620,
            textWrap: "pretty",
          }}
        >
          The link may be out of date. The orbit lines are listed below, or
          start from the home page.
        </p>

        <div
          style={{
            display: "flex",
            gap: 14,
            alignItems: "center",
            marginTop: 4,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            className={hv("ctaWhite")}
            style={{
              textDecoration: "none",
              fontSize: 15.5,
              fontWeight: 600,
              color: "#FFFFFF",
              background: "#0F1D2E",
              padding: "16px 28px",
              borderRadius: 999,
              transition: "background .2s,transform .2s",
            }}
          >
            Back to the home page
          </Link>
          <Link
            href="/book-a-call?src=not-found"
            className={hv("ghostNavy")}
            style={{
              textDecoration: "none",
              fontSize: 15.5,
              fontWeight: 600,
              color: "#0F1D2E",
              padding: "16px 24px",
              borderRadius: 999,
              border: "1.5px solid rgba(15,29,46,.2)",
            }}
          >
            Book a 20-minute intro call
          </Link>
        </div>

        <div
          style={{
            marginTop: 40,
            paddingTop: 26,
            borderTop: "1px solid rgba(15,29,46,.14)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <h2 style={{ ...H2_LIGHT, fontSize: "clamp(24px,2.6vw,32px)" }}>
            Orbit solutions
          </h2>
          <div
            data-grid="3"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0 44px",
            }}
          >
            {ORBITS.map((o) => (
              <Link
                key={o.href}
                href={o.href}
                className={hv("linkCoral")}
                style={{
                  textDecoration: "none",
                  fontSize: 15.5,
                  fontWeight: 600,
                  color: "#2D5A87",
                  padding: "14px 0",
                  borderBottom: "1px solid rgba(15,29,46,.12)",
                  transition: "color .2s",
                }}
              >
                {o.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
