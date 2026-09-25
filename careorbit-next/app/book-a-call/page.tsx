import { Suspense } from "react";
import { metadataFor } from "@/lib/seo";
import "./book-a-call.css";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { BookingPanel, SheetPicker } from "@/components/book/BookingPanel";

/* Book a Call. Port of v2-maven/BookACall.dc.html.
 *
 * The announcement bar is suppressed here (announce={false}), as in the
 * original's dc-import.
 *
 * BookingPanel and SheetPicker read ?src= via useSearchParams, so they sit
 * behind Suspense boundaries; without one Next opts the whole route into
 * client-side rendering.
 *
 * The data-bk-* hooks are the Design's own. book-a-call.css carries its
 * page-scoped rules, which is where the section order lives: below 1020px
 * the grid becomes a flex column and [data-bk-alt] takes order:2, so the
 * booking panel is read first and the info-sheet card second. Do not
 * reorder this markup to achieve that - the Design does it in CSS, and the
 * two-column desktop layout depends on this DOM order.
 */
export const metadata = metadataFor("/book-a-call");

export default function BookACallPage() {
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
      <main id="main-content">
        {/* data-grid="split": legacy global rule collapsed 1fr 1fr below 1020px.
          data-pad="page-top": legacy matched div[style*="padding: 72px 28px"]. */}
        <div
          data-grid="split"
          data-pad="page-top"
          data-bk-grid=""
          style={{
            maxWidth: 1220,
            margin: "0 auto",
            padding: "72px 28px 104px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "start",
            flex: 1,
          }}
        >
          <div
            data-bk-left=""
            style={{ display: "flex", flexDirection: "column", gap: 22 }}
          >
            <h1
              style={{
                fontFamily: "Lato,sans-serif",
                fontWeight: 900,
                fontSize: "clamp(38px,4.5vw,54px)",
                lineHeight: 1.06,
                letterSpacing: "-0.025em",
                margin: 0,
                textWrap: "pretty",
              }}
            >
              20 minutes.
              <br />
              <em style={SERIF}>Your</em> pain points,{" "}
              <em style={SERIF}>our</em> platform.
            </h1>
            <p
              style={{
                fontSize: 16.5,
                lineHeight: 1.65,
                color: "rgba(15,29,46,.7)",
                margin: 0,
                maxWidth: 480,
                textWrap: "pretty",
              }}
            >
              No demo script, no obligation. We get introduced, hear which pain
              points you want to tackle, and give you a brief look at the
              platform, then decide together whether it&apos;s worth a second
              conversation.
            </p>
            <div
              data-bk-alt=""
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(15,29,46,.07)",
                borderRadius: 26,
                padding: "26px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginTop: 8,
              }}
            >
              <div
                style={{
                  fontFamily: "Lato,sans-serif",
                  fontWeight: 900,
                  fontSize: 17,
                }}
              >
                Not ready for a call?
              </div>
              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "rgba(15,29,46,.68)",
                }}
              >
                Get the info sheet for your desired orbit solution by email
                instead.
              </div>
              <Suspense fallback={null}>
                <SheetPicker />
              </Suspense>
            </div>
          </div>

          <Suspense fallback={null}>
            <BookingPanel />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

const SERIF: React.CSSProperties = {
  fontFamily: "'Source Serif 4',serif",
  fontStyle: "italic",
  fontWeight: 600,
  letterSpacing: 0,
  color: "#E3735C",
};
