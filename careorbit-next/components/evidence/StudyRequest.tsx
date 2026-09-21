"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { fv, hv } from "@/lib/hoverStyles";
import { docStore } from "@/lib/docStore";
import { submitLead } from "@/lib/submitLead";

/* Gated evidence request. Port of v2-maven/StudyRequest.dc.html.
 *
 * CLAUDE.md: study and pilot results are gated - topline stats sit on the
 * orbit page, then this form serves the PDF. There are no standalone study
 * pages beyond the three evidence pages.
 *
 * ALL FOUR SPAM GUARDS PRESERVED:
 *   1. honeypot "website" field, off-screen
 *   2. 3-second minimum dwell after the panel is opened
 *   3. 30-second per-browser throttle via localStorage
 *   4. personal-email-domain blocklist
 *
 * SUBMISSION (Phase 9). v2-maven transmitted nothing: notifyEndpoint
 * defaulted to "", so notify() returned immediately - the original said so
 * in a placeholder comment. The request is now POSTed to /api/lead, but
 * fire-and-forget: the download is unlocked locally the moment validation
 * passes and never waits on the network. With no SUPABASE_* / RESEND_*
 * configured the endpoint is inert and behaviour is identical to today.
 */
const DWELL_MS = 3000;
const THROTTLE_MS = 30000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const PERSONAL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
  "mail.com",
  "gmx.com",
];

const INPUT: React.CSSProperties = {
  fontFamily: "Inter,sans-serif",
  fontSize: 14,
  color: "#0F1D2E",
  background: "#FAF8F4",
  border: "1px solid rgba(15,29,46,.16)",
  borderRadius: 10,
  padding: "11px 13px",
  outline: "none",
};
const LABEL: React.CSSProperties = {
  fontSize: 12.5,
  fontWeight: 600,
  color: "#2D5A87",
};
const FIELD: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 5,
};

export function StudyRequest({
  label = "Request a copy",
  heading = "Request a copy",
  blurb = "Tell us who you are and we will send you the full document.",
  file = "",
  downloadLabel = "Download the PDF",
  submitLabel = "Submit request",
}: {
  label?: string;
  heading?: string;
  blurb?: string;
  /** Path under /evidence-docs, e.g. "/evidence-docs/CareOrbit-...pdf" */
  file?: string;
  downloadLabel?: string;
  submitLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  /* Derived from the prop, not set in an effect: `file` is known during the
   * first render. Only the async availability probe below can clear it. */
  const [fileReady, setFileReady] = useState(() => Boolean(file));
  const [openedAt, setOpenedAt] = useState(0);

  const storageKey = `co-doc-${file || "doc"}`;

  /* A previous successful request in this browser re-opens straight to the
   * download, as in the original. Read through an external store rather
   * than an effect - see lib/docStore.ts. */
  const stored = useSyncExternalStore(
    docStore.subscribe,
    docStore.get(storageKey),
    docStore.server,
  );
  const sent = Boolean(stored);

  /* Availability probe. If the PDF is missing the panel shows the "we will
   * email it" state instead of a broken download. */
  useEffect(() => {
    if (!file) return; // initial state already false
    let cancelled = false;
    fetch(file, { method: "HEAD" })
      .then((r) => {
        if (!cancelled && !r.ok) setFileReady(false);
      })
      .catch(() => {
        if (!cancelled) setFileReady(false);
      });
    return () => {
      cancelled = true;
    };
  }, [file]);

  const toggle = () => {
    setOpen((o) => {
      if (!o) setOpenedAt(Date.now());
      return !o;
    });
  };

  const submit = () => {
    if (website) return; // honeypot filled: silently drop

    if (Date.now() - openedAt < DWELL_MS) {
      setError(
        "Please take a moment to review your details, then submit again.",
      );
      return;
    }
    try {
      const last30 = localStorage.getItem("co-req-throttle");
      if (last30 && Date.now() - Number(last30) < THROTTLE_MS) {
        setError(
          "You just sent a request. Give it a moment before sending another.",
        );
        return;
      }
    } catch {
      /* blocked storage */
    }

    const f = first.trim();
    const l = last.trim();
    const o = org.trim();
    const e = email.trim();
    if (!f || !l || !o) {
      setError("Please fill in your first name, last name, and organization.");
      return;
    }
    if (!EMAIL_RE.test(e)) {
      setError("Please enter a valid business email address.");
      return;
    }
    const domain = e.split("@")[1].toLowerCase();
    if (PERSONAL_DOMAINS.includes(domain)) {
      setError(
        "Please use your business email address rather than a personal one.",
      );
      return;
    }

    /* Fire and forget. The download is unlocked by docStore below and
     * never waits on this; inert until SUPABASE_* / RESEND_* are set. */
    submitLead({
      kind: "study-request",
      email: e,
      requested: file,
      first: f,
      last: l,
      org: o,
      title: title.trim() || undefined,
      website,
    });

    docStore.set(storageKey, e);
    docStore.set("co-req-throttle", String(Date.now()));
    setError("");
  };

  const reset = () => {
    docStore.remove(storageKey);
    setError("");
    setOpenedAt(Date.now());
  };

  const doneHeading = first.trim()
    ? `Thank you, ${first.trim()}. Your copy is ready`
    : "Thank you, your copy is ready";

  return (
    <div
      style={{
        alignSelf: "flex-start",
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        minWidth: 0,
      }}
    >
      <button
        type="button"
        onClick={toggle}
        className={hv("studyTrigger")}
        style={{
          alignSelf: "flex-start",
          background: "none",
          border: "none",
          padding: "0 0 3px",
          margin: 0,
          fontFamily: "Inter,sans-serif",
          fontSize: 14.5,
          fontWeight: 600,
          color: "#0F1D2E",
          cursor: "pointer",
          borderBottom: "1.5px solid rgba(227,115,92,.55)",
          transition: "color .2s,border-color .2s",
        }}
      >
        {label}
      </button>

      {open && (
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(45,90,135,.2)",
            borderRadius: 20,
            padding: "24px 24px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            maxWidth: 460,
            boxShadow: "0 18px 40px rgba(15,29,46,.1)",
          }}
        >
          {!sent && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={FIELD}>
                <div
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 900,
                    fontSize: 17,
                    lineHeight: 1.25,
                    letterSpacing: "-0.015em",
                    color: "#0F1D2E",
                  }}
                >
                  {heading}
                </div>
                <div
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    color: "rgba(15,29,46,.68)",
                    textWrap: "pretty",
                  }}
                >
                  {blurb}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                <div style={FIELD}>
                  <label style={LABEL}>
                    First name <span style={{ color: "#A8412F" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={first}
                    onChange={(ev) => {
                      setFirst(ev.target.value);
                      setError("");
                    }}
                    autoComplete="given-name"
                    className={fv("inputFocusCoral")}
                    style={{ ...INPUT, minWidth: 0 }}
                  />
                </div>
                <div style={FIELD}>
                  <label style={LABEL}>
                    Last name <span style={{ color: "#A8412F" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={last}
                    onChange={(ev) => {
                      setLast(ev.target.value);
                      setError("");
                    }}
                    autoComplete="family-name"
                    className={fv("inputFocusCoral")}
                    style={{ ...INPUT, minWidth: 0 }}
                  />
                </div>
              </div>

              <div style={FIELD}>
                <label style={LABEL}>
                  Organization <span style={{ color: "#A8412F" }}>*</span>
                </label>
                <input
                  type="text"
                  value={org}
                  onChange={(ev) => {
                    setOrg(ev.target.value);
                    setError("");
                  }}
                  autoComplete="organization"
                  className={fv("inputFocusCoral")}
                  style={INPUT}
                />
              </div>

              <div style={FIELD}>
                <label style={LABEL}>
                  Business email address{" "}
                  <span style={{ color: "#A8412F" }}>*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(ev) => {
                    setEmail(ev.target.value);
                    setError("");
                  }}
                  autoComplete="email"
                  placeholder="you@organization.org"
                  className={fv("inputFocusCoral")}
                  style={INPUT}
                />
              </div>

              <div style={FIELD}>
                <label style={LABEL}>Job title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(ev) => {
                    setTitle(ev.target.value);
                    setError("");
                  }}
                  autoComplete="organization-title"
                  className={fv("inputFocusCoral")}
                  style={INPUT}
                />
              </div>

              {/* Honeypot */}
              <input
                type="text"
                value={website}
                onChange={(ev) => setWebsite(ev.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: -5000,
                  width: 1,
                  height: 1,
                  opacity: 0,
                }}
              />

              {error && (
                <div
                  style={{ fontSize: 13, lineHeight: 1.5, color: "#A8412F" }}
                >
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={submit}
                className={hv("navyToCoral")}
                style={{
                  alignSelf: "flex-start",
                  fontFamily: "Inter,sans-serif",
                  fontSize: 14.5,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  background: "#0F1D2E",
                  border: "none",
                  borderRadius: 999,
                  padding: "13px 26px",
                  cursor: "pointer",
                  transition: "background .2s",
                }}
              >
                {submitLabel}
              </button>

              <div
                style={{
                  fontSize: 11.5,
                  lineHeight: 1.5,
                  color: "rgba(15,29,46,.5)",
                }}
              >
                We use your details only to send this document and follow up
                once. No list, no sharing. This form is protected against
                automated submissions.
              </div>
            </div>
          )}

          {sent && fileReady && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={FIELD}>
                <div
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 900,
                    fontSize: 17,
                    lineHeight: 1.25,
                    letterSpacing: "-0.015em",
                    color: "#0F1D2E",
                  }}
                >
                  {doneHeading}
                </div>
                <div
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    color: "rgba(15,29,46,.68)",
                    textWrap: "pretty",
                  }}
                >
                  Download it below. Our team has been notified of your request
                  and will follow up once.
                </div>
              </div>
              <a
                href={file}
                download={file}
                target="_blank"
                rel="noopener"
                className={hv("navyToCoral")}
                style={{
                  alignSelf: "flex-start",
                  textDecoration: "none",
                  fontFamily: "Inter,sans-serif",
                  fontSize: 14.5,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  background: "#0F1D2E",
                  borderRadius: 999,
                  padding: "13px 24px",
                  transition: "background .2s",
                }}
              >
                {downloadLabel}
              </a>
              <ResetButton onClick={reset} />
            </div>
          )}

          {sent && !fileReady && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div
                style={{
                  fontFamily: "Lato,sans-serif",
                  fontWeight: 900,
                  fontSize: 17,
                  lineHeight: 1.25,
                  letterSpacing: "-0.015em",
                  color: "#0F1D2E",
                }}
              >
                Thank you, your request is in
              </div>
              <div
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: "rgba(15,29,46,.68)",
                  textWrap: "pretty",
                }}
              >
                We will email your copy shortly. If you need it sooner, write to{" "}
                <a
                  href="mailto:support@careorbit.com"
                  style={{ color: "#2D5A87", fontWeight: 600 }}
                >
                  support@careorbit.com
                </a>
                .
              </div>
              <ResetButton onClick={reset} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={hv("mutedToCoral")}
      style={{
        alignSelf: "flex-start",
        background: "none",
        border: "none",
        padding: 0,
        fontFamily: "Inter,sans-serif",
        fontSize: 12.5,
        fontWeight: 600,
        color: "rgba(15,29,46,.55)",
        cursor: "pointer",
        textDecoration: "underline",
      }}
    >
      Submit a new request
    </button>
  );
}
