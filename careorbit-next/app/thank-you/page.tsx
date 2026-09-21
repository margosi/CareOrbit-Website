import Image from "next/image";
import { metadataFor } from "@/lib/seo";
import Link from "next/link";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { hv } from "@/lib/hoverStyles";
import { EXACT_PIXELS } from "@/lib/migration";

/* Thank You. Port of v2-maven/ThankYou.dc.html.
 *
 * Reached from Book a Call after Calendly reports a booking, carrying
 * ?line= and ?src=. The `line` value selects a follow-on orbit link.
 *
 * The announcement bar is suppressed here (announce={false}), as in the
 * original's dc-import.
 */
const ORBIT_BY_LINE: Record<string, { href: string; label: string }> = {
  Oncology: { href: "/orbits/oncology", label: "Oncology" },
  Cardiology: { href: "/orbits/cardiology", label: "Cardiology" },
  Orthopedics: { href: "/orbits/orthopedics", label: "Orthopedics" },
  "Women's Health": { href: "/orbits/womens-health", label: "Women's Health" },
  Bariatrics: { href: "/orbits/bariatrics", label: "Bariatrics" },
  "Behavioral Health": {
    href: "/orbits/behavioral-health",
    label: "Behavioral Health",
  },
  "Medication Therapy & Adherence": {
    href: "/orbits/medication-therapy",
    label: "Medication Therapy & Adherence",
  },
};

/* searchParams is typed explicitly rather than with PageProps<"/thank-you">:
 * that generated type only exists after the route has been built once, so a
 * brand-new page fails typecheck before its first build. */
export const metadata = metadataFor("/thank-you");

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.line) ? sp.line[0] : sp.line;
  const match = raw ? ORBIT_BY_LINE[raw] : undefined;

  const orbitHref = match ? match.href : "/#orbit-grid";
  const orbitCta = match
    ? `Explore the ${match.label} orbit while you wait`
    : "Browse the orbits while you wait";

  return (
    <div
      style={{
        fontFamily: "Inter,sans-serif",
        background: "#FAF8F4",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SiteNav active="home" announce={false} />

      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "96px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 22,
          alignItems: "center",
          textAlign: "center",
          flex: 1,
          animation: "coPop .7s cubic-bezier(.16,1,.3,1)",
        }}
      >
        <Image
          src="/brand/careorbit-logo-nav2.png"
          alt="CareOrbit"
          width={210}
          height={60}
          unoptimized={EXACT_PIXELS}
          style={{ height: 60, width: "auto" }}
        />
        <h1
          style={{
            fontFamily: "Lato,sans-serif",
            fontWeight: 900,
            fontSize: 48,
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            margin: 0,
            textWrap: "pretty",
          }}
        >
          You&apos;re{" "}
          <em
            style={{
              fontFamily: "'Source Serif 4',serif",
              fontStyle: "italic",
              fontWeight: 600,
              letterSpacing: 0,
              color: "#E3735C",
            }}
          >
            booked
          </em>
          .
        </h1>
        <p
          style={{
            fontSize: 16.5,
            lineHeight: 1.65,
            color: "rgba(15,29,46,.7)",
            margin: 0,
            maxWidth: 520,
            textWrap: "pretty",
          }}
        >
          A confirmation is on its way to your email. We&apos;ll do our homework
          on your organization before the call, and you&apos;ll leave it with a
          one-page summary of what an orbit would target for you.
        </p>
        <div
          style={{
            display: "flex",
            gap: 14,
            marginTop: 8,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            href={orbitHref}
            className={hv("navyPill")}
            style={{
              textDecoration: "none",
              fontSize: 15,
              fontWeight: 600,
              color: "#FFFFFF",
              background: "#0F1D2E",
              padding: "15px 28px",
              borderRadius: 999,
              transition: "background .2s",
            }}
          >
            {orbitCta}
          </Link>
          <Link
            href="/platform"
            className={hv("ghostNavy")}
            style={{
              textDecoration: "none",
              fontSize: 15,
              fontWeight: 600,
              color: "#0F1D2E",
              padding: "15px 24px",
              borderRadius: 999,
              border: "1.5px solid rgba(15,29,46,.2)",
            }}
          >
            How the platform works
          </Link>
        </div>
        <div
          style={{
            fontSize: 13.5,
            color: "rgba(15,29,46,.55)",
            marginTop: 6,
          }}
        >
          Want the overview now?{" "}
          <a
            href="/sheets/careorbit-platform-2-page.pdf"
            download=""
            style={{ fontWeight: 600 }}
          >
            Download the platform info sheet
          </a>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
