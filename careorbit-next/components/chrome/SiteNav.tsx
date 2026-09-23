"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ORBITS, PRICING_LINKS, PRODUCTS, type NavActive } from "@/lib/nav";
import { hv } from "@/lib/hoverStyles";

/* Port of v2-maven/SiteNav.dc.html.
 *
 * Inline styles are copied verbatim from the original markup. They are the
 * visual contract the baseline screenshots were captured against - do not
 * "tidy" them into classes.
 *
 * The six pieces of state and their exact thresholds come from the original
 * DCLogic class (lines 137-218):
 *   open / pOpen  dropdown visibility (hover-driven)
 *   dismissed     announcement bar dismissed
 *   mobile        drawer open
 *   hidden        nav hidden after scrolling down
 *   annOff        how much of the announcement bar is still on screen
 *
 * MIGRATION NOTE - prefetch is disabled while routes are still being built,
 * so the nav does not fire 404s for pages that do not exist yet. Re-enable
 * (delete the prefetch prop) in Phase 8 once every route exists.
 */
const NO_PREFETCH = { prefetch: false } as const;

export function SiteNav({
  active = "home",
  announce = true,
}: {
  active?: NavActive;
  announce?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [pOpen, setPOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [annOff, setAnnOff] = useState(0);

  /* Refs mirror the original's instance fields (_lastY, _annH) so the scroll
   * handler never needs to re-subscribe.
   *
   * Current state is read via functional setState updaters rather than
   * mirrored into refs: writing a ref during render is a React anti-pattern
   * (and a lint error), and the updater form gives the handler the live
   * value without a subscription. React bails out when the value is
   * unchanged, matching the original's explicit equality guards. */
  const lastY = useRef(0);
  const annH = useRef(0);

  const measureAnn = useCallback(() => {
    const el = document.querySelector("[data-announce-bar]");
    annH.current = el instanceof HTMLElement ? el.offsetHeight : 0;
    /* Original called _onScroll() here to recompute immediately. */
    const y = Math.max(
      window.scrollY,
      document.scrollingElement ? document.scrollingElement.scrollTop : 0,
    );
    setAnnOff(Math.max(0, annH.current - y));
  }, []);

  useEffect(() => {
    /* getY prefers the scrolling element the event came from, so the nav
     * also responds inside scroll containers. Verbatim from the original. */
    const getY = (e?: Event) => {
      const t = e?.target as HTMLElement | null;
      if (t && t.nodeType === 1 && t.scrollTop != null) return t.scrollTop;
      return Math.max(
        window.scrollY,
        document.scrollingElement ? document.scrollingElement.scrollTop : 0,
      );
    };

    lastY.current = getY();

    const onScroll = (e?: Event) => {
      const y = getY(e);
      const d = y - lastY.current;
      /* Thresholds are exact: reset under 80px, hide on +6px, show on -6px. */
      setHidden((prev) => {
        if (y < 80) return false;
        if (d > 6 && !prev) return true;
        if (d < -6 && prev) return false;
        return prev;
      });
      lastY.current = y;

      setAnnOff(Math.max(0, annH.current - y));
    };

    const t = window.setTimeout(measureAnn, 50);
    window.addEventListener("resize", measureAnn);
    document.addEventListener("scroll", onScroll, {
      capture: true,
      passive: true,
    });

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", measureAnn);
      document.removeEventListener("scroll", onScroll, { capture: true });
    };
  }, [measureAnn]);

  const showAnnounce = announce && !dismissed;
  /* #B15948, not the brand #E3735C. The nav bar is white, where the brand
   * coral measures 3.06:1 and 15px text needs 4.5:1. Same hue, darkened
   * just far enough (4.78:1 on white) - the active item still reads coral. */
  const c = (k: NavActive) => (active === k ? "#B15948" : "#3A4A5C");
  const bookHref = `/book-a-call?src=${active}`;

  const navShift = hidden && !mobile ? "translateY(-160px)" : "none";
  const navOp = hidden && !mobile ? 0 : 1;
  const navPe = hidden && !mobile ? "none" : "auto";

  const closeAnnounce = () => {
    setDismissed(true);
    window.setTimeout(measureAnn, 30);
  };

  return (
    <>
      {/* Skip link - WCAG 2.4.1 Bypass Blocks. Without it a keyboard user
       * tabs through the announcement bar and the whole primary nav on
       * EVERY page before reaching the content. It is the first thing in
       * the tab order, sits off-screen until focused, and occupies no
       * layout, so nothing about the visual design changes. */}
      <a href="#main-content" data-skip-to-main="">
        Skip to main content
      </a>
      {/* <header> rather than <div>: this is the site banner landmark.
       * Both elements are display:block by default, so nothing moves. */}
      <header
        style={
          {
            fontFamily: "Inter,sans-serif",
            display: "flex",
            flexDirection: "column",
            "--ann-off": `${annOff}px`,
          } as React.CSSProperties
        }
      >
        <div data-nav-spacer="" style={{ height: 74 }} />

        {showAnnounce && (
          <div
            data-announce-bar=""
            style={{
              background: "#EAF1F8",
              color: "#1E3A5F",
              fontSize: 14,
              lineHeight: 1.4,
              textAlign: "center",
              padding: "13px 52px",
              position: "relative",
              zIndex: 1,
            }}
          >
            Live within large, complex health systems including BJC HealthCare,
            Washington University, and Siteman Cancer Center&nbsp;&nbsp;
            <Link
              href="/outcomes"
              {...NO_PREFETCH}
              className={hv("coral")}
              style={{
                color: "#1E3A5F",
                fontWeight: 600,
                textDecoration: "underline",
              }}
            >
              See results
            </Link>
            <button
              onClick={closeAnnounce}
              aria-label="Dismiss"
              className={hv("coral")}
              style={{
                position: "absolute",
                right: 18,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                fontSize: 20,
                lineHeight: 1,
                color: "#1E3A5F",
                cursor: "pointer",
                padding: 4,
              }}
            >
              &times;
            </button>
          </div>
        )}

        <nav
          aria-label="Primary"
          data-nav-wrap=""
          style={
            {
              "--ann-off": `${annOff}px`,
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 80,
              padding: "8px 20px 0",
              display: "flex",
              justifyContent: "center",
              transition: "transform .4s cubic-bezier(.16,1,.3,1), opacity .3s",
              transform: navShift,
              opacity: navOp,
              pointerEvents: navPe,
            } as React.CSSProperties
          }
        >
          <div
            data-nav-bar=""
            style={{
              width: "max-content",
              maxWidth: "calc(100vw - 40px)",
              background: "#FFFFFF",
              borderRadius: 14,
              boxShadow: "0 10px 36px rgba(15,29,46,.14)",
              padding: "0 14px 0 26px",
              height: 66,
              display: "flex",
              alignItems: "center",
              gap: 40,
            }}
          >
            <Link
              href="/"
              {...NO_PREFETCH}
              style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "center",
                textDecoration: "none",
              }}
            >
              {/* Original: <img src="careorbit-logo-nav2.png" style="height:42px;width:auto">
               *
               * unoptimized: the source is 210x60 and only 8.4 KB, displayed at
               * 42px tall. Letting next/image re-encode it resamples the bitmap
               * a second time before the browser scales it down, which measurably
               * softened the mark (the only pixel difference left in the nav
               * diff). Serving the original bytes is both sharper and smaller
               * than a generated variant at this size. */}
              <Image
                src="/brand/careorbit-logo-nav2.png"
                alt="CareOrbit"
                width={210}
                height={60}
                priority
                unoptimized
                style={{
                  height: 42,
                  width: "auto",
                  display: "block",
                  marginTop: -2,
                }}
              />
            </Link>

            <div
              data-nav-links=""
              style={{ display: "flex", alignItems: "center", gap: 28 }}
            >
              <Link
                href="/platform"
                {...NO_PREFETCH}
                className={hv("navLink")}
                style={{
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: 500,
                  color: c("platform"),
                  borderBottom: "2px solid transparent",
                  padding: "4px 0",
                  transition: "border-color .2s",
                }}
              >
                Platform
              </Link>

              {/* Orbit Solutions dropdown - hover driven, exactly as the original */}
              <div
                style={{ position: "relative" }}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                <span
                  style={{
                    cursor: "pointer",
                    fontSize: 15,
                    fontWeight: 500,
                    color: c("orbits"),
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "4px 0",
                  }}
                >
                  Orbit Solutions
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    style={{
                      transition: "transform .2s",
                      transform: open ? "rotate(180deg)" : "none",
                    }}
                  >
                    <path
                      d="M1 1l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>

                {/* Same reasoning as the pricing panel below: always
                 * mounted, toggled with `hidden`. This panel holds the only
                 * internal link to /platform/data - the footer's Platform
                 * column points at /platform#anchors, not the product
                 * pages - so that route had no crawlable inbound link
                 * either. `hidden` is display:none, so closed it stays
                 * invisible, untabbable and out of the accessibility tree
                 * while the anchors remain in the HTML source. */}
                <div
                  hidden={!open}
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: -16,
                    paddingTop: 14,
                    zIndex: 70,
                  }}
                >
                  <div
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid rgba(15,29,46,.08)",
                      borderRadius: 22,
                      boxShadow: "0 24px 60px rgba(15,29,46,.16)",
                      padding: 10,
                      width: 470,
                      display: "flex",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        flex: "1 1 auto",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {ORBITS.map((o) => (
                        <Link
                          key={o.href}
                          href={o.href}
                          {...NO_PREFETCH}
                          className={hv("menuItem")}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 12,
                            padding: "11px 14px",
                            borderRadius: 14,
                            textDecoration: "none",
                            transition: "background .15s",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 14.5,
                              fontWeight: 500,
                              color: "#0F1D2E",
                            }}
                          >
                            {o.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div
                      style={{
                        width: 1,
                        background: "rgba(15,29,46,.1)",
                        flexShrink: 0,
                      }}
                    />
                    <div
                      style={{
                        flex: "0 0 130px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {PRODUCTS.map((p) => (
                        <Link
                          key={p.href}
                          href={p.href}
                          {...NO_PREFETCH}
                          className={hv("menuItem")}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "11px 14px",
                            borderRadius: 14,
                            textDecoration: "none",
                            transition: "background .15s",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 14.5,
                              fontWeight: 500,
                              color: "#0F1D2E",
                            }}
                          >
                            {p.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/outcomes"
                {...NO_PREFETCH}
                className={hv("navLink")}
                style={{
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: 500,
                  color: c("outcomes"),
                  borderBottom: "2px solid transparent",
                  padding: "4px 0",
                  transition: "border-color .2s",
                }}
              >
                Outcomes &amp; ROI
              </Link>

              {/* Plans & Pricing dropdown */}
              <div
                style={{ position: "relative" }}
                onMouseEnter={() => setPOpen(true)}
                onMouseLeave={() => setPOpen(false)}
              >
                <Link
                  href="/pricing"
                  {...NO_PREFETCH}
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                    fontSize: 15,
                    fontWeight: 500,
                    color: c("pricing"),
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "4px 0",
                  }}
                >
                  Plans &amp; Pricing
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    style={{
                      transition: "transform .2s",
                      transform: pOpen ? "rotate(180deg)" : "none",
                    }}
                  >
                    <path
                      d="M1 1l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>

                {/* ALWAYS MOUNTED, toggled with `hidden`, rather than
                 * `{pOpen && ...}`. These are the only internal links to
                 * /pricing/assess, /pricing/capture and /pricing/data, and
                 * a conditionally mounted panel meant they existed in the
                 * DOM only after a hover. Googlebot renders JavaScript but
                 * does not hover, so all three pages had no crawlable
                 * inbound link and read as orphans.
                 *
                 * `hidden` resolves to display:none, so when closed the
                 * panel is still invisible, still out of the tab order and
                 * still out of the accessibility tree - identical
                 * behaviour - while the anchors stay in the HTML source
                 * where a crawler can follow them. */}
                <div
                  hidden={!pOpen}
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: -16,
                    paddingTop: 14,
                    zIndex: 70,
                  }}
                >
                  <div
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid rgba(15,29,46,.08)",
                      borderRadius: 22,
                      boxShadow: "0 24px 60px rgba(15,29,46,.16)",
                      padding: 10,
                      width: 240,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {PRICING_LINKS.map((pl) => (
                      <Link
                        key={pl.href}
                        href={pl.href}
                        {...NO_PREFETCH}
                        className={hv("menuItem")}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "11px 14px",
                          borderRadius: 14,
                          textDecoration: "none",
                          transition: "background .15s",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 14.5,
                            fontWeight: 500,
                            color: "#0F1D2E",
                          }}
                        >
                          {pl.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/about"
                {...NO_PREFETCH}
                className={hv("navLink")}
                style={{
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: 500,
                  color: c("about"),
                  borderBottom: "2px solid transparent",
                  padding: "4px 0",
                  transition: "border-color .2s",
                }}
              >
                About
              </Link>

              <Link
                href={bookHref}
                {...NO_PREFETCH}
                data-cta=""
                className={hv("ctaLift")}
                style={{
                  textDecoration: "none",
                  fontSize: 14.5,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  background: "#0F1D2E",
                  padding: "12px 22px",
                  borderRadius: 10,
                  whiteSpace: "nowrap",
                  marginLeft: 6,
                  transition: "background .2s, transform .2s",
                }}
              >
                Book a Call
              </Link>
            </div>

            {/* Mobile bar. display:none here; responsive.css flips it to flex
              at max-width:900px. */}
            <div
              data-nav-mobile=""
              style={{
                display: "none",
                alignItems: "center",
                gap: 12,
                marginLeft: "auto",
              }}
            >
              <Link
                href={bookHref}
                {...NO_PREFETCH}
                className={hv("ctaFlat")}
                style={{
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  background: "#0F1D2E",
                  padding: "11px 18px",
                  borderRadius: 10,
                  whiteSpace: "nowrap",
                }}
              >
                Book a Call
              </Link>
              <button
                onClick={() => setMobile((v) => !v)}
                aria-label="Menu"
                aria-expanded={mobile}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 8,
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: 24,
                    height: 2.5,
                    background: "#0F1D2E",
                    borderRadius: 2,
                    transition: "transform .25s, opacity .25s",
                    transform: mobile
                      ? "translateY(7.5px) rotate(45deg)"
                      : "none",
                  }}
                />
                <span
                  style={{
                    display: "block",
                    width: 24,
                    height: 2.5,
                    background: "#0F1D2E",
                    borderRadius: 2,
                    transition: "opacity .25s",
                    opacity: mobile ? 0 : 1,
                  }}
                />
                <span
                  style={{
                    display: "block",
                    width: 24,
                    height: 2.5,
                    background: "#0F1D2E",
                    borderRadius: 2,
                    transition: "transform .25s",
                    transform: mobile
                      ? "translateY(-7.5px) rotate(-45deg)"
                      : "none",
                  }}
                />
              </button>
            </div>
          </div>
        </nav>

        {mobile && (
          <>
            <div
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 59,
                background: "rgba(15,29,46,.25)",
              }}
              onClick={() => setMobile(false)}
            />
            <div
              data-nav-drawer=""
              style={{
                position: "fixed",
                left: 20,
                right: 20,
                top: "calc(var(--ann-off, 0px) + 72px)",
                zIndex: 61,
                background: "#FFFFFF",
                borderRadius: 18,
                boxShadow: "0 32px 80px rgba(15,29,46,.28)",
                padding: 18,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxHeight: "calc(100vh - 150px)",
                overflow: "auto",
              }}
            >
              <Link
                href="/platform"
                {...NO_PREFETCH}
                className={hv("menuItemDark")}
                style={drawerTop}
              >
                Platform
              </Link>

              <div style={drawerHeading}>Orbit Solutions</div>
              {ORBITS.map((o) => (
                <Link
                  key={o.href}
                  href={o.href}
                  {...NO_PREFETCH}
                  className={hv("menuItemDark")}
                  style={drawerItem}
                >
                  {o.name}
                </Link>
              ))}

              {PRODUCTS.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  {...NO_PREFETCH}
                  className={hv("menuItemDark")}
                  style={drawerItem}
                >
                  {p.name}
                </Link>
              ))}

              <Link
                href="/outcomes"
                {...NO_PREFETCH}
                className={hv("menuItemDark")}
                style={drawerTop}
              >
                Outcomes &amp; ROI
              </Link>

              <div style={drawerHeading}>Plans &amp; Pricing</div>
              {PRICING_LINKS.map((pl) => (
                <Link
                  key={pl.href}
                  href={pl.href}
                  {...NO_PREFETCH}
                  className={hv("menuItemDark")}
                  style={drawerItem}
                >
                  {pl.name}
                </Link>
              ))}

              <Link
                href="/about"
                {...NO_PREFETCH}
                className={hv("menuItemDark")}
                style={drawerTop}
              >
                About
              </Link>

              <Link
                href={bookHref}
                {...NO_PREFETCH}
                className={hv("ctaFlat")}
                style={{
                  textDecoration: "none",
                  textAlign: "center",
                  fontSize: 15.5,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  background: "#0F1D2E",
                  padding: 15,
                  borderRadius: 12,
                  marginTop: 10,
                }}
              >
                Book a Call
              </Link>
            </div>
          </>
        )}
      </header>
    </>
  );
}

/* Drawer style constants, lifted verbatim from lines 116-131. */
const drawerTop: React.CSSProperties = {
  textDecoration: "none",
  fontSize: 16,
  fontWeight: 600,
  color: "#0F1D2E",
  padding: "13px 14px",
  borderRadius: 12,
};

const drawerItem: React.CSSProperties = {
  textDecoration: "none",
  fontSize: 15,
  fontWeight: 500,
  color: "#0F1D2E",
  padding: "10px 22px",
  borderRadius: 12,
};

const drawerHeading: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "#6F6A62",
  padding: "12px 14px 4px",
};
