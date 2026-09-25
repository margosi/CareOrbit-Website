"use client";

import { useState } from "react";
import { submitLeadAwaited } from "@/lib/submitLead";
import { hv } from "@/lib/hoverStyles";

/* "Stay in the loop" - the footer signup.
 *
 * The only form on the site with nothing to hand the visitor. The other
 * three serve a PDF or open Calendly the moment they validate and treat the
 * POST as fire and forget, because a slow endpoint must not delay the thing
 * that was actually asked for. Here the stored row IS the outcome, so this
 * one waits for it: "Thanks. You're on the list." appears only once Supabase
 * has accepted the insert, and anything else shows an error.
 *
 * The prototype kept signups in localStorage under "co_newsletter". That is
 * a record only the visitor's own browser can read, so it is not used.
 *
 * Same three guards as every other form on the site: a hidden honeypot, a
 * 3-second dwell, and a basic email shape check. Plus an in-flight lock, so
 * an impatient second click cannot produce a second row.
 */
const DWELL_MS = 3000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const NOTE_DEFAULT =
  "By subscribing, you agree to the Total Orbit privacy policy.";
const NOTE_BAD_EMAIL = "Please enter a valid work email.";
const NOTE_FAILED =
  "That did not go through. Please try again, or email sales@totalorbit.com.";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [sending, setSending] = useState(false);
  const [note, setNote] = useState(NOTE_DEFAULT);
  const [mounted] = useState(() => Date.now());

  const subscribe = async () => {
    if (sending || subscribed) return; // in-flight lock: no double rows
    if (hp) return; // honeypot filled: drop silently
    if (Date.now() - mounted < DWELL_MS) return; // faster than a human

    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setNote(NOTE_BAD_EMAIL);
      return;
    }

    setSending(true);
    setNote(NOTE_DEFAULT);
    const res = await submitLeadAwaited({
      kind: "newsletter",
      email: value,
      website: hp,
    });
    setSending(false);

    /* Confirm only on a row that actually exists. `ok` alone is not enough:
     * the endpoint answers 200 even when storage is unconfigured or fails. */
    if (res.ok && res.stored === "ok") {
      setSubscribed(true);
    } else {
      setNote(NOTE_FAILED);
    }
  };

  return (
    <div
      data-ft-signup=""
      style={{ display: "flex", flexDirection: "column", gap: 14 }}
    >
      <div
        style={{
          fontFamily: "Lato,sans-serif",
          fontWeight: 400,
          fontSize: 26,
          lineHeight: 1.2,
          color: "#FFFFFF",
        }}
      >
        Stay in the loop
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.55, color: "#9FB3C8" }}>
        Orbit launches, study results, and product news. A few emails a year.
      </div>

      {subscribed ? (
        <div
          role="status"
          style={{
            fontSize: 14.5,
            lineHeight: 1.5,
            color: "#FFFFFF",
            background: "rgba(255,255,255,.08)",
            borderRadius: 12,
            padding: "14px 16px",
          }}
        >
          Thanks. You&apos;re on the list.
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              gap: 8,
              background: "rgba(255,255,255,.08)",
              border: "1px solid rgba(255,255,255,.18)",
              borderRadius: 12,
              padding: "5px 5px 5px 16px",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (note !== NOTE_DEFAULT) setNote(NOTE_DEFAULT);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") void subscribe();
              }}
              placeholder="Work email"
              aria-label="Work email"
              disabled={sending}
              style={{
                flex: 1,
                minWidth: 0,
                border: "none",
                outline: "none",
                background: "none",
                fontFamily: "Inter,sans-serif",
                fontSize: 14.5,
                color: "#FFFFFF",
              }}
            />
            {/* Honeypot. Off-screen and aria-hidden, identical to the other
             * three forms: only a bot fills it. */}
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
              }}
            />
            <button
              type="button"
              onClick={() => void subscribe()}
              disabled={sending}
              className={hv("sheetBtn")}
              style={{
                border: "none",
                cursor: sending ? "default" : "pointer",
                background: "#F2B8C6",
                color: "#0F1D2E",
                fontFamily: "Inter,sans-serif",
                fontSize: 14,
                fontWeight: 600,
                padding: "11px 18px",
                borderRadius: 9,
                whiteSpace: "nowrap",
                opacity: sending ? 0.7 : 1,
                transition: "background .2s,opacity .2s",
              }}
            >
              {sending ? "Sending…" : "Subscribe"}
            </button>
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.5, color: "#7E93AB" }}>
            {note}
          </div>
        </>
      )}
    </div>
  );
}
