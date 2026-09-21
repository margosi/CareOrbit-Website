import { STATUS_COLORS, type OrbitStatus } from "@/lib/nav";

/* Orbit status badge: Live / Blueprint / In build / In integration / New.
 *
 * Colours come from SiteNav.dc.html's chip() helper (lines 170-172). Note
 * that the nav computes these for every orbit link but never renders them -
 * the dropdown shows only the name. The chips appear on other pages, so the
 * component lands here with the rest of the shared chrome and is first
 * exercised in Phase 3.
 */
export function StatusChip({ status }: { status: OrbitStatus }) {
  const c = STATUS_COLORS[status];
  return (
    <span
      style={{
        color: c.color,
        background: c.background,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: ".04em",
        textTransform: "uppercase",
        padding: "4px 9px",
        borderRadius: 999,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}
