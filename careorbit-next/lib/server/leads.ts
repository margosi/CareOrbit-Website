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
 * report "skipped" and the route still answers 200 - which is the behaviour
 * the site had before any of this existed, where forms transmitted nothing
 * and served the download immediately.
 *
 * ORDER MATTERS, and it is the whole design:
 *
 *   1. Supabase INSERT      - the row is the record
 *   2. Resend notification  - the email is a convenience
 *   3. stamp notified_at    - only once Resend has actually accepted it
 *
 * A row without an email is a lead you can still work from a query. An
 * email without a row is a lead that exists only in somebody's inbox. So
 * storage goes first and never waits on mail, and `notified_at` stays NULL
 * when Resend fails - which makes "everything that never got notified" a
 * one-line query rather than an archaeology exercise.
 */

export type Lead = {
  /** Which form produced this. */
  kind: "info-sheet" | "study-request" | "book-a-call" | "newsletter";
  email: string;
  /** What was asked for: a PDF path, or the service line for a booking. */
  requested?: string;
  first?: string;
  last?: string;
  org?: string;
  /** StudyRequest calls it a job title; BookingPanel calls it a role. */
  title?: string;
  role?: string;
  /** CareOrbit service line, from the Book a Call selector. */
  line?: string;
  /** The ?src= attribution the page was reached with. */
  src?: string;
  /** Page the form was submitted from. */
  path?: string;
  /** Genuine campaign attribution, read from the URL query. */
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export type Outcome = "ok" | "skipped" | "failed";

/* Only these two produce an internal email. Book-a-call is deliberately
 * storage-only: Calendly already emails both parties on event_scheduled,
 * with the meeting details and the invitee's answers. A second message
 * seconds later would carry strictly less information and would train the
 * inbox to ignore the notification address. The ROW is still written, so
 * bookings sit in the same table as everything else. */
const NOTIFY_KINDS: ReadonlySet<Lead["kind"]> = new Set([
  "info-sheet",
  "study-request",
]);
/* Note which kinds are absent as much as which are present. "book-a-call"
 * stays out because Calendly already mails both parties. "newsletter" stays
 * out because a mail per signup would train the inbox to ignore the
 * notification address; the rows are the record and a query is the report. */

/** One place where the internal field names meet the actual column names. */
function toRow(lead: Lead): Record<string, string | undefined> {
  return {
    submission_type: lead.kind,
    email: lead.email,
    /* Nullable by design: an info-sheet request is one email address and is
     * a legitimate lead. Nothing is invented to fill these in. */
    first_name: lead.first,
    last_name: lead.last,
    organization: lead.org,
    /* Two forms, one column: StudyRequest's "Job title" and BookingPanel's
     * "Role" describe the same thing. */
    title: lead.title ?? lead.role,
    requested_asset: lead.requested,
    source_page: lead.path,
    service_line: lead.line,
    /* Genuine campaign parameters pass through untouched. `src` is
     * CareOrbit's OWN internal attribution (which page's CTA sent them), so
     * it is recorded as an internal source rather than being blended into
     * campaign reporting: utm_medium="internal" makes the two trivially
     * separable in a query. */
    utm_source: lead.utmSource ?? lead.src,
    utm_medium:
      lead.utmMedium ?? (lead.src && !lead.utmSource ? "internal" : undefined),
    utm_campaign: lead.utmCampaign,
  };
}

function drop(row: Record<string, string | undefined>) {
  return Object.fromEntries(Object.entries(row).filter(([, v]) => v != null));
}

export type StoreResult = { outcome: Outcome; id?: string };

export async function store(lead: Lead): Promise<StoreResult> {
  const c = leadConfig();
  if (!hasSupabase(c)) return { outcome: "skipped" };

  try {
    const r = await fetch(
      `${c.supabaseUrl.replace(/\/$/, "")}/rest/v1/${c.table}`,
      {
        method: "POST",
        headers: {
          apikey: c.supabaseKey,
          Authorization: `Bearer ${c.supabaseKey}`,
          "Content-Type": "application/json",
          /* Ask for the row back so we have an id to stamp later. */
          Prefer: "return=representation",
        },
        body: JSON.stringify([drop(toRow(lead))]),
      },
    );

    if (!r.ok) {
      /* Log the body. The previous version swallowed it, which is how a
       * schema mismatch stays invisible until someone notices the table is
       * empty. Never logs the key - only the response. */
      const detail = await r.text().catch(() => "");
      console.error(
        `[lead] supabase insert ${r.status}: ${detail.slice(0, 400)}`,
      );
      return { outcome: "failed" };
    }

    const rows = (await r.json().catch(() => [])) as Array<{ id?: string }>;
    return { outcome: "ok", id: rows?.[0]?.id };
  } catch (e) {
    console.error("[lead] supabase insert threw:", (e as Error).message);
    return { outcome: "failed" };
  }
}

export async function notify(lead: Lead): Promise<Outcome> {
  const c = leadConfig();
  if (!hasResend(c)) return "skipped";
  if (!NOTIFY_KINDS.has(lead.kind)) return "skipped";

  const label: Record<Lead["kind"], string> = {
    "info-sheet": "Info sheet request",
    "study-request": "Evidence request",
    "book-a-call": "Booking",
    /* Never used - newsletter is not in NOTIFY_KINDS - but the map is typed
     * over every kind so that adding one cannot silently skip this. */
    newsletter: "Newsletter signup",
  };

  const rows: Array<[string, string | undefined]> = [
    ["Email", lead.email],
    ["Name", [lead.first, lead.last].filter(Boolean).join(" ") || undefined],
    ["Organization", lead.org],
    ["Title / role", lead.title ?? lead.role],
    ["Requested", lead.requested],
    ["Service line", lead.line],
    ["Page", lead.path],
    ["Source", lead.src],
    ["Campaign", lead.utmCampaign],
  ];
  const text = rows
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
        reply_to: lead.email,
        subject: `${label[lead.kind]}: ${lead.email}`,
        text,
      }),
    });
    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      console.error(`[lead] resend ${r.status}: ${detail.slice(0, 400)}`);
      return "failed";
    }
    return "ok";
  } catch (e) {
    console.error("[lead] resend threw:", (e as Error).message);
    return "failed";
  }
}

/** Stamp notified_at, and only after Resend has accepted the message. */
export async function markNotified(id: string): Promise<void> {
  const c = leadConfig();
  if (!hasSupabase(c) || !id) return;
  try {
    await fetch(
      `${c.supabaseUrl.replace(/\/$/, "")}/rest/v1/${c.table}?id=eq.${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        headers: {
          apikey: c.supabaseKey,
          Authorization: `Bearer ${c.supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ notified_at: new Date().toISOString() }),
      },
    );
  } catch (e) {
    /* Non-fatal: the row exists and the mail was sent. Worst case the row
     * looks un-notified and a sweep sends a duplicate. */
    console.error("[lead] notified_at patch failed:", (e as Error).message);
  }
}
