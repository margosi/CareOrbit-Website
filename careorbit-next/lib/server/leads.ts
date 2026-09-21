import "server-only";
import { hasResend, hasSupabase, leadConfig } from "./env";

/* Lead storage and notification.
 *
 * Plain fetch against both REST APIs rather than the Supabase and Resend
 * SDKs. Two reasons: a marketing site should not carry two SDKs and their
 * transitive trees for three form posts, and a ~40-line fetch call is
 * something a reviewer can actually audit.
 *
 * Neither integration is required. With no keys set, `store` and `notify`
 * report "skipped" and the route still answers 200 - which is exactly the
 * behaviour the site has today, where forms transmit nothing and serve the
 * download immediately.
 */

export type Lead = {
  /** Which form produced this. */
  kind: "info-sheet" | "study-request" | "book-a-call";
  email: string;
  /** What was asked for: a PDF path, or the service line for a booking. */
  requested?: string;
  first?: string;
  last?: string;
  org?: string;
  title?: string;
  role?: string;
  line?: string;
  /** The ?src= attribution the page was reached with. */
  src?: string;
  /** Page the form was submitted from. */
  path?: string;
};

export type Outcome = "ok" | "skipped" | "failed";

export async function store(lead: Lead): Promise<Outcome> {
  const c = leadConfig();
  if (!hasSupabase(c)) return "skipped";

  try {
    const r = await fetch(
      `${c.supabaseUrl.replace(/\/$/, "")}/rest/v1/${c.table}`,
      {
        method: "POST",
        headers: {
          apikey: c.supabaseKey,
          Authorization: `Bearer ${c.supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify([
          { ...lead, created_at: new Date().toISOString() },
        ]),
      },
    );
    return r.ok ? "ok" : "failed";
  } catch {
    return "failed";
  }
}

export async function notify(lead: Lead): Promise<Outcome> {
  const c = leadConfig();
  if (!hasResend(c)) return "skipped";

  const rows = Object.entries(lead)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${c.resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: c.notifyFrom,
        to: [c.notifyTo],
        subject: `CareOrbit ${lead.kind}: ${lead.email}`,
        text: rows,
      }),
    });
    return r.ok ? "ok" : "failed";
  } catch {
    return "failed";
  }
}
