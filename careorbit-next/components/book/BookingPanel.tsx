"use client";

import { useEffect, useState } from "react";
import { submitLead } from "@/lib/submitLead";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { fv, hv } from "@/lib/hoverStyles";
import { Reveal } from "@/components/motion/Reveal";
import {
  CALENDLY_BASE,
  CALENDLY_ORIGIN,
  BOOKING_GROUPS,
  SHEET_OPTIONS,
  SRC_LINES,
  SRC_PAGES,
  SRC_TOPICS,
} from "@/lib/bookACall";

/* Book a Call. Port of BookACall.dc.html's interactive half.
 *
 * FLOW, preserved exactly:
 *  1. ?src= is read on mount. A service-line src pre-selects that line and
 *     shows a pre-checked context box; a quote/topic src shows its own box;
 *     a page src is recorded but shows no box.
 *  2. The form validates name + organization + an email containing "@".
 *  3. On submit it does NOT navigate: it swaps in an inline Calendly iframe
 *     with the answers pre-filled via query string.
 *  4. When Calendly posts `calendly.event_scheduled`, we route to
 *     /thank-you carrying line and src.
 *
 * SECURITY FIX (behaviour-identical for real traffic): the original tested
 *   e.origin.indexOf("calendly.com") !== -1
 * which also matches a hostile origin such as https://calendly.com.evil.net.
 * This compares the origin exactly.
 *
 * Still client-side only, as in v2-maven: the lead is written to
 * localStorage. Phase 9 additionally POSTs it to /api/lead, fire and
 * forget: Calendly opens regardless, and with no SUPABASE_* / RESEND_*
 * configured the endpoint is inert and behaviour matches v2-maven.
 */
const INPUT: React.CSSProperties = {
  fontFamily: "Inter,sans-serif",
  fontSize: 15,
  padding: "15px 17px",
  borderRadius: 14,
  border: "1.5px solid rgba(15,29,46,.12)",
  background: "#FAF8F4",
  outline: "none",
};

/* Minimum time a real visitor spends before submitting. Shared by both
 * components in this file. */
const DWELL_MS = 3000;

export function BookingPanel() {
  const params = useSearchParams();
  const src = params.get("src") ?? "";

  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [role, setRole] = useState("");
  /* Initialised from ?src= rather than set in an effect: src is known
   * during the first render, and an effect here causes a cascading
   * re-render (react-hooks/set-state-in-effect). The original read it once
   * in componentDidMount, so a lazy initial value matches that. */
  const [line, setLine] = useState(() => SRC_LINES[src] ?? "");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(false);
  const [calendlyUrl, setCalendlyUrl] = useState("");
  const [booked, setBooked] = useState(false);
  const [srcChecked, setSrcChecked] = useState(true);
  /* Bot protections brought into line with SheetRequestForm and
   * StudyRequest, which both already had them. Neither is visible. */
  const [hp, setHp] = useState("");
  const [dwellPassed, setDwellPassed] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setDwellPassed(true), DWELL_MS);
    return () => window.clearTimeout(t);
  }, []);

  const topic = SRC_TOPICS[src];
  const srcLine = SRC_LINES[src];
  const isPage = Boolean(SRC_PAGES[src]);

  const srcLabel = topic ? topic.label : srcLine ? `${srcLine} focus` : "";
  const srcNote = topic
    ? topic.note
    : srcLine
      ? "If that is not right, uncheck the box and pick your service line below."
      : "";
  const hasSrc = Boolean(srcLabel) && !isPage;

  /* Record the referring src for the session, as the original did. */
  useEffect(() => {
    try {
      sessionStorage.setItem("co_src", src);
    } catch {
      /* blocked storage: best effort only */
    }
  }, [src]);

  /* Calendly tells us when the booking completes. */
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== CALENDLY_ORIGIN) return;
      const data = e.data as { event?: string } | null;
      if (!data || data.event !== "calendly.event_scheduled") return;
      /* Stay put. Navigating to /thank-you made booking a terminal state:
       * the panel unmounted and a second call meant a full page load. The
       * confirmation below carries the same onward links. */
      setBooked(true);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  /* Back to a blank booking form without a reload. Name, organization,
   * role and email survive - they are the same person - but the line is
   * cleared so the next call's subject is chosen deliberately rather than
   * inherited. */
  const bookAnother = () => {
    setBooked(false);
    setBooking(false);
    setCalendlyUrl("");
    setLine("");
    setSrcChecked(false);
    setError("");
  };

  const submit = () => {
    if (!name || !org || !email.includes("@")) {
      setError("Please add your name, organization, and a work email.");
      return;
    }
    /* Honeypot filled, or submitted faster than a human could: drop it
     * silently, exactly as the other two forms do. No error is shown - a
     * bot learns nothing, and a real visitor cannot reach this path. */
    if (hp) return;
    if (!dwellPassed) return;

    try {
      localStorage.setItem(
        "co_booking",
        JSON.stringify({
          name,
          org,
          role,
          line,
          email,
          source: src || "direct",
          t: Date.now(),
        }),
      );
    } catch {
      /* blocked storage: best effort only */
    }

    /* Fire and forget - the Calendly iframe below opens regardless, and
     * the endpoint is inert until SUPABASE_* / RESEND_* are configured. */
    submitLead({
      kind: "book-a-call",
      email,
      first: name,
      org,
      role: role || undefined,
      line: line || undefined,
      src: src || "direct",
      website: hp,
    });

    const q =
      "?hide_gdpr_banner=1&embed_type=Inline" +
      `&name=${encodeURIComponent(name)}` +
      `&email=${encodeURIComponent(email)}` +
      `&utm_content=${encodeURIComponent(`${org || ""} | ${role || ""} | ${line || "Other"}`)}` +
      `&utm_source=${encodeURIComponent(src || "direct")}`;
    setCalendlyUrl(CALENDLY_BASE + q);
    setBooking(true);
  };

  const toggleSrc = (on: boolean) => {
    setSrcChecked(on);
    setLine(on ? (SRC_LINES[src] ?? "") : "");
  };

  return (
    <Reveal
      data-bk-card=""
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(15,29,46,.07)",
        borderRadius: 32,
        padding: 36,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        boxShadow: "0 28px 70px rgba(15,29,46,.08)",
      }}
    >
      <div
        style={{
          fontFamily: "Lato,sans-serif",
          fontWeight: 900,
          fontSize: 21,
          letterSpacing: "-0.01em",
        }}
      >
        Book your intro call
      </div>

      {hasSrc && (
        <label
          style={{
            background: "#FAF8F4",
            border: "1px solid rgba(15,29,46,.08)",
            borderRadius: 16,
            padding: "14px 16px",
            display: "flex",
            gap: 11,
            alignItems: "flex-start",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={srcChecked}
            onChange={(e) => toggleSrc(e.target.checked)}
            style={{
              width: 17,
              height: 17,
              margin: "1px 0 0",
              accentColor: "#E3735C",
              cursor: "pointer",
              flexShrink: 0,
            }}
          />
          <span style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span
              style={{
                fontFamily: "Lato,sans-serif",
                fontWeight: 900,
                fontSize: 15,
                color: "#0F1D2E",
              }}
            >
              {srcLabel}
            </span>
            <span
              style={{
                fontSize: 13,
                lineHeight: 1.5,
                color: "rgba(15,29,46,.66)",
              }}
            >
              {srcNote}
            </span>
          </span>
        </label>
      )}

      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError("");
        }}
        placeholder="Name *"
        aria-label="Name"
        className={fv("inputFocusNavy")}
        style={INPUT}
      />
      <input
        value={org}
        onChange={(e) => {
          setOrg(e.target.value);
          setError("");
        }}
        placeholder="Organization *"
        aria-label="Organization"
        className={fv("inputFocusNavy")}
        style={INPUT}
      />
      <input
        value={role}
        onChange={(e) => {
          setRole(e.target.value);
          setError("");
        }}
        placeholder="Role"
        aria-label="Role"
        className={fv("inputFocusNavy")}
        style={INPUT}
      />
      <select
        value={line}
        onChange={(e) => {
          setLine(e.target.value);
          setError("");
        }}
        aria-label="Service line"
        className={fv("inputFocusNavy")}
        style={{
          ...INPUT,
          padding: "15px 13px",
          color: line ? "#0F1D2E" : "#8A93A0",
        }}
      >
        <option value="">Service line&hellip;</option>
        {BOOKING_GROUPS.map((g) => (
          <optgroup key={g.label} label={g.label}>
            {g.options.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      {/* Honeypot. Off-screen and aria-hidden, identical to the other two
       * forms: only a bot fills it. Occupies no layout space, so the
       * panel renders exactly as before. */}
      <input
        onChange={(e) => setHp(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        placeholder="Website"
        style={{
          position: "absolute",
          left: -9999,
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
        }}
      />
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
        placeholder="Work email *"
        aria-label="Work email"
        className={fv("inputFocusNavy")}
        style={INPUT}
      />

      {error && (
        <div style={{ fontSize: 13, color: "#A4503F", fontWeight: 500 }}>
          {error}
        </div>
      )}

      {!booking && (
        <button
          onClick={submit}
          className={hv("bookCta")}
          style={{
            fontFamily: "Inter,sans-serif",
            fontSize: 15.5,
            fontWeight: 600,
            color: "#FFFFFF",
            background: "#0F1D2E",
            border: "none",
            borderRadius: 999,
            padding: "16px 28px",
            cursor: "pointer",
            transition: "background .2s,transform .2s",
          }}
        >
          Pick a time &rarr;
        </button>
      )}

      {booking && !booked && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 13, color: "rgba(15,29,46,.6)" }}>
            Pick a time that works for you:
          </div>
          <iframe
            src={calendlyUrl}
            title="Schedule with CareOrbit"
            style={{
              width: "100%",
              height: 640,
              border: "1px solid rgba(15,29,46,.08)",
              borderRadius: 16,
              background: "#FFFFFF",
            }}
          />
        </div>
      )}

      {booked && (
        <div
          role="status"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            background: "#F4F9F5",
            border: "1px solid rgba(31,107,73,.18)",
            borderRadius: 18,
            padding: 24,
          }}
        >
          <div
            style={{
              fontFamily: "Lato,sans-serif",
              fontWeight: 900,
              fontSize: 19,
              color: "#1F6B49",
            }}
          >
            Your call is booked.
          </div>
          <div
            style={{
              fontSize: 15,
              lineHeight: 1.6,
              color: "rgba(15,29,46,.72)",
              textWrap: "pretty",
            }}
          >
            Calendly has emailed the invitation and the meeting details to{" "}
            {email || "your inbox"}. Nothing else is needed from you.
          </div>
          <button
            onClick={bookAnother}
            className={hv("bookCta")}
            style={{
              fontFamily: "Inter,sans-serif",
              fontSize: 15.5,
              fontWeight: 600,
              color: "#FFFFFF",
              background: "#0F1D2E",
              border: "none",
              borderRadius: 999,
              padding: "15px 28px",
              cursor: "pointer",
              alignSelf: "flex-start",
            }}
          >
            Book another call
          </button>
          <Link
            href={`/thank-you?line=${encodeURIComponent(line || "Other")}&src=${encodeURIComponent(src || "direct")}`}
            className={hv("studyLink")}
            style={{
              fontSize: 14,
              color: "#B15948",
              textDecoration: "none",
              alignSelf: "flex-start",
            }}
          >
            See what happens next &rarr;
          </Link>
        </div>
      )}
    </Reveal>
  );
}

/* The "Not ready for a call?" info-sheet row in the left column.
 * Same three spam guards as the product-page form. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function SheetPicker() {
  const params = useSearchParams();
  const src = params.get("src") ?? "";

  /* Same reasoning as the booking form: derive from ?src= on first render. */
  const [sheetLine, setSheetLine] = useState(() => (SRC_LINES[src] ? src : ""));
  const [sheetEmail, setSheetEmail] = useState("");
  const [hp, setHp] = useState("");
  const [sent, setSent] = useState(false);
  const [dwellPassed, setDwellPassed] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setDwellPassed(true), DWELL_MS);
    return () => window.clearTimeout(t);
  }, []);

  const sendSheet = () => {
    if (!sheetLine) return;
    if (hp) return;
    if (!dwellPassed) return;
    if (!EMAIL_RE.test(sheetEmail)) return;

    setSent(true);

    const pdf = `/sheets/careorbit-${sheetLine}-2-page.pdf`;

    /* This path served its PDF but transmitted nothing, so the lead was
     * lost. It is an info-sheet request like any other - same kind, so it
     * is stored AND generates the internal notification. Fire and forget:
     * the download below never waits on it. */
    submitLead({
      kind: "info-sheet",
      email: sheetEmail,
      requested: pdf,
      line: SRC_LINES[sheetLine] || undefined,
      src: src || "direct",
      website: hp,
    });

    const a = document.createElement("a");
    a.href = pdf;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const field: React.CSSProperties = {
    flex: 1,
    minWidth: 180,
    fontFamily: "Inter,sans-serif",
    fontSize: 14,
    borderRadius: 14,
    border: "1.5px solid rgba(15,29,46,.12)",
    background: "#FAF8F4",
    outline: "none",
  };

  return (
    <div
      data-bk-alt-row=""
      style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
    >
      <select
        value={sheetLine}
        onChange={(e) => setSheetLine(e.target.value)}
        aria-label="Desired orbit solution"
        style={{
          ...field,
          padding: "13px 13px",
          color: sheetLine ? "#0F1D2E" : "#8A93A0",
        }}
      >
        <option value="">Desired orbit solution&hellip; *</option>
        {SHEET_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <input
        onChange={(e) => setHp(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        placeholder="Website"
        style={{
          position: "absolute",
          left: -9999,
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
        }}
      />
      <input
        value={sheetEmail}
        onChange={(e) => {
          setSheetEmail(e.target.value);
          setSent(false);
        }}
        placeholder="Work email *"
        aria-label="Work email for info sheet"
        className={fv("inputFocusNavy")}
        style={{ ...field, padding: "13px 16px" }}
      />
      <button
        onClick={sendSheet}
        className={hv("sheetBtn")}
        style={{
          fontFamily: "Inter,sans-serif",
          fontSize: 14,
          fontWeight: 600,
          color: "#0F1D2E",
          background: "#FAF8F4",
          border: "1.5px solid rgba(15,29,46,.12)",
          borderRadius: 999,
          padding: "13px 22px",
          cursor: "pointer",
          transition: "border-color .15s",
        }}
      >
        {sent ? "Downloading ✓" : "Send it"}
      </button>
    </div>
  );
}
