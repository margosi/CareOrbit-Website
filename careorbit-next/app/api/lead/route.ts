import { NextResponse } from "next/server";
import { markNotified, notify, store, type Lead } from "@/lib/server/leads";

/* POST /api/lead - the single endpoint behind all three forms.
 *
 * DESIGN NOTE, and it is the important one: this endpoint is ADDITIVE.
 * Today every form on v2-maven transmits nothing and serves its download
 * immediately; a placeholder in StudyRequest.dc.html says so outright
 * ("Until then requests are stored locally only"). The clients here still
 * serve the download the moment the form validates, and treat this call as
 * fire-and-forget. If it fails, is unconfigured, or is blocked, the visitor
 * sees exactly what they see today.
 *
 * So with no environment set this is inert, and the site behaves as it does
 * now. Setting SUPABASE_* and RESEND_* turns it on with no code change.
 *
 * Secrets never reach the browser: the two modules it imports both start
 * with `import "server-only"`, which fails the build if a client component
 * pulls them in.
 */

export const runtime = "nodejs";
/* Never cached, never statically evaluated. */
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const KINDS = new Set([
  "info-sheet",
  "study-request",
  "book-a-call",
  "newsletter",
]);

/* Per-IP throttle. Deliberately small and in-memory: it blunts a casual
 * flood on a single instance without pretending to be distributed rate
 * limiting. The real guards are on the client (honeypot, dwell timer,
 * per-browser throttle) and, for anything serious, the platform WAF. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 10;
const hits = new Map<string, number[]>();

function throttled(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // bounded memory
  return recent.length > MAX_PER_WINDOW;
}

function clean(v: unknown, max = 200): string | undefined {
  if (typeof v !== "string") return undefined;
  const s = v.trim().slice(0, max);
  return s || undefined;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (throttled(ip)) {
    return NextResponse.json(
      { ok: false, reason: "throttled" },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, reason: "bad-json" },
      { status: 400 },
    );
  }

  /* Honeypot: a filled "website" field means a bot. Answer 200 so it learns
   * nothing, and store nothing. */
  if (clean(body.website)) {
    return NextResponse.json({ ok: true, stored: "skipped" });
  }

  const kind = clean(body.kind);
  const email = clean(body.email, 320);
  if (!kind || !KINDS.has(kind) || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  const lead: Lead = {
    kind: kind as Lead["kind"],
    email,
    requested: clean(body.requested, 300),
    first: clean(body.first, 100),
    last: clean(body.last, 100),
    org: clean(body.org, 200),
    title: clean(body.title, 200),
    role: clean(body.role, 200),
    line: clean(body.line, 200),
    src: clean(body.src, 100),
    path: clean(body.path, 300),
    /* Genuine campaign attribution, kept separate from `src` and from the
     * service line so reporting stays clean. */
    utmSource: clean(body.utmSource, 150),
    utmMedium: clean(body.utmMedium, 150),
    utmCampaign: clean(body.utmCampaign, 150),
  };

  /* SEQUENTIAL, not Promise.all. Storage is the record and must not be
   * raced by the notification: we need the inserted id before we can stamp
   * notified_at, and a Resend failure must leave a recoverable row rather
   * than a half-finished pair. */
  const stored = await store(lead);
  const notified = await notify(lead);

  if (notified === "ok" && stored.id) await markNotified(stored.id);

  /* Always 200 on a valid submission: the visitor's download must not hinge
   * on a third party being up. Delivery status is reported for logs. */
  return NextResponse.json({
    ok: true,
    stored: stored.outcome,
    notified,
  });
}
