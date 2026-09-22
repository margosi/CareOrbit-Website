/* Client-side helper for posting a form submission to /api/lead.
 *
 * FIRE AND FORGET, ON PURPOSE. Every form on this site serves its download
 * (or opens Calendly) the instant it validates, exactly as v2-maven does.
 * This call runs alongside that and can never block it, fail it, or throw
 * into it. If the endpoint is unconfigured, slow, blocked by an extension
 * or offline, the visitor sees no difference.
 *
 * Contains no secrets: the API route holds the keys, and the modules that
 * read them are marked `server-only`.
 */
export type LeadPayload = {
  kind: "info-sheet" | "study-request" | "book-a-call";
  email: string;
  requested?: string;
  first?: string;
  last?: string;
  org?: string;
  title?: string;
  role?: string;
  line?: string;
  src?: string;
  /** Honeypot value, passed through so the server can drop bots too. */
  website?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

/* Real campaign parameters, read from the current URL. Deliberately only
 * the three utm_* keys: `?src=` is CareOrbit's own internal attribution and
 * each form already passes it separately, so the two never get blended. */
function utm(): Pick<LeadPayload, "utmSource" | "utmMedium" | "utmCampaign"> {
  if (typeof location === "undefined") return {};
  try {
    const q = new URLSearchParams(location.search);
    return {
      utmSource: q.get("utm_source") ?? undefined,
      utmMedium: q.get("utm_medium") ?? undefined,
      utmCampaign: q.get("utm_campaign") ?? undefined,
    };
  } catch {
    return {};
  }
}

export function submitLead(payload: LeadPayload): void {
  try {
    void fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...utm(),
        ...payload,
        path: typeof location === "undefined" ? undefined : location.pathname,
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* Never let analytics-shaped work break a download. */
  }
}
