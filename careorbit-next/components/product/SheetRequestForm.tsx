"use client";

import { useEffect, useState } from "react";
import { fv, hv, type FocusName, type HoverName } from "@/lib/hoverStyles";
import { submitLead } from "@/lib/submitLead";

/* "Not ready for a call?" info-sheet form, shared by the four product pages.
 * Ported from EngagePage.dc.html lines 194-201 and its DCLogic.
 *
 * BEHAVIOUR PRESERVED EXACTLY, including all three spam guards:
 *   - hidden honeypot input; any value blocks submission
 *   - 3-second minimum dwell before a submission is accepted
 *   - basic email shape check
 * On success it sets the button label and triggers the PDF download.
 *
 * The dwell guard is a timer-backed flag rather than v2-maven's
 * `Date.now() - t0 > 3000`. Same behaviour, but it keeps the clock out of
 * render, which react-hooks/purity (correctly) rejects.
 *
 * STILL CLIENT-SIDE ONLY, as in v2-maven: nothing is transmitted. Phase 9
 * wires this to Supabase + Resend. The instant download is kept so the
 * user-visible behaviour does not change when the backend lands.
 */
const DWELL_MS = 3000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function SheetRequestForm({
  title = "Not ready for a call?",
  blurb,
  pdf,
  downloadAs,
  focus = "inputFocusBlush",
  hover = "btnBlush",
  resetOnEdit = true,
}: {
  title?: string;
  blurb: string;
  /* v2-maven's onEmail handler differs between page families: the four
   * product pages clear `sent` as soon as the field is edited, the orbit
   * pages do not. Both are preserved rather than normalised. */
  resetOnEdit?: boolean;
  /** Input focus ring colour. Assess uses the teal variant. */
  focus?: FocusName;
  /** Submit-button hover. Community Research goes teal, not blush. */
  hover?: HoverName;
  /** Path under /sheets, e.g. "/sheets/careorbit-engage-2-page.pdf" */
  pdf: string;
  /** Filename offered to the browser. */
  downloadAs: string;
}) {
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [sent, setSent] = useState(false);
  const [dwellPassed, setDwellPassed] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setDwellPassed(true), DWELL_MS);
    return () => window.clearTimeout(t);
  }, []);

  const requestSheet = () => {
    if (hp) return; // honeypot filled: silently drop, as the original did
    if (!dwellPassed) return; // submitted faster than a human would
    if (!EMAIL_RE.test(email)) return;

    setSent(true);
    /* Fire and forget - the download below never waits on it. Inert until
     * SUPABASE_* / RESEND_* are configured. */
    submitLead({ kind: "info-sheet", email, requested: pdf, website: hp });

    const a = document.createElement("a");
    a.href = pdf;
    a.download = downloadAs;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div
      data-nr-card=""
      style={{
        background: "#1E3A5F",
        borderRadius: 28,
        padding: 36,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div
        style={{
          fontFamily: "Lato,sans-serif",
          fontWeight: 900,
          fontSize: 19,
          color: "#FFFFFF",
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.55, color: "#B9C8D8" }}>
        {blurb}
      </div>

      {/* Honeypot. Off-screen and aria-hidden: only a bot fills it. */}
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
          if (resetOnEdit) setSent(false);
        }}
        placeholder="Work email *"
        aria-label="Work email"
        className={fv(focus)}
        style={{
          fontFamily: "Inter,sans-serif",
          fontSize: 14.5,
          padding: "14px 16px",
          borderRadius: 14,
          border: "1.5px solid #2D5A87",
          background: "#0F1D2E",
          color: "#FFFFFF",
          outline: "none",
        }}
      />
      <button
        onClick={requestSheet}
        className={hv(hover)}
        style={{
          fontFamily: "Inter,sans-serif",
          fontSize: 14.5,
          fontWeight: 600,
          color: "#0F1D2E",
          background: "#FFFFFF",
          border: "none",
          borderRadius: 999,
          padding: "13px 24px",
          cursor: "pointer",
          alignSelf: "flex-start",
          transition: "background .2s",
        }}
      >
        {sent ? "Downloading your info sheet ✓" : "Send me the info sheet"}
      </button>
    </div>
  );
}
