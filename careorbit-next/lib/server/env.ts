import "server-only";

/* Server-only configuration. The `server-only` import above is the guard:
 * if any client component ever imports this file, the build FAILS rather
 * than shipping a key to the browser.
 *
 * Nothing here is NEXT_PUBLIC_. Every value is read at request time, not at
 * module load, so a missing key degrades one request instead of breaking
 * the build.
 */

export type LeadConfig = {
  supabaseUrl: string;
  supabaseKey: string;
  table: string;
  resendKey: string;
  notifyTo: string;
  notifyFrom: string;
};

/** Returns null when the integration is not configured. */
export function leadConfig(): Partial<LeadConfig> {
  return {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    table: process.env.SUPABASE_LEADS_TABLE ?? "leads",
    resendKey: process.env.RESEND_API_KEY,
    notifyTo: process.env.LEAD_NOTIFY_TO,
    notifyFrom: process.env.LEAD_NOTIFY_FROM,
  };
}

export function hasSupabase(c: Partial<LeadConfig>): c is LeadConfig {
  return Boolean(c.supabaseUrl && c.supabaseKey && c.table);
}

export function hasResend(c: Partial<LeadConfig>): boolean {
  return Boolean(c.resendKey && c.notifyTo && c.notifyFrom);
}
