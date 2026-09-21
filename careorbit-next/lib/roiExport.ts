/* CSV and print-sheet exports for the orbit ROI calculators.
 *
 * Ported from the exportExcel() / printCalc() pair that appears, byte for
 * byte apart from its labels, on all five pages with a live calculator.
 * The print sheet is still built as an HTML string injected into a
 * #print-only element, exactly as the original did, because the @media
 * print rules in each page stylesheet target that element by id.
 *
 * Browser-only: both functions touch document/window, so call them from an
 * event handler, never during render.
 */

export type ExportField = {
  k: string;
  label: string;
  prefix: string;
  suffix: string;
};

export type ExportResult = { raw: number; t: string; d: string };

/** "$1,234". Legacy: dollars(). */
export function dollars(n: number): string {
  return "$" + Math.round(n || 0).toLocaleString();
}

/** "$1.23M" above a million, else "$123K". Legacy: money(). */
export function money(n: number): string {
  if (!n) return "$0";
  return n >= 1000000
    ? "$" + (n / 1000000).toFixed(2).replace(/\.00$/, "") + "M"
    : "$" + Math.round(n / 1000).toLocaleString() + "K";
}

/* Two pages decide "is this a percentage field?" differently - Behavioral
 * Risk tests suffix.indexOf("%") === 0 (so "% of wage" counts), the others
 * test suffix === "%". The difference is visible in the exported header, so
 * it is a parameter rather than a normalisation. */
export type PercentMode = "exact" | "prefix";

function isPercent(suffix: string, mode: PercentMode) {
  return mode === "exact" ? suffix === "%" : suffix.indexOf("%") === 0;
}

export function exportRoiCsv({
  docTitle,
  filename,
  fields,
  values,
  results,
  total,
  percentMode = "exact",
}: {
  docTitle: string;
  filename: string;
  fields: readonly ExportField[];
  values: Readonly<Record<string, string>>;
  results: readonly ExportResult[];
  total: number;
  percentMode?: PercentMode;
}) {
  const lines: (string | number)[][] = [
    [docTitle, ""],
    ["", ""],
    ["Input", "Value"],
  ];
  for (const f of fields) {
    let n = parseFloat(values[f.k]);
    if (isNaN(n)) n = 0;
    const unit = isPercent(f.suffix, percentMode)
      ? " (%)"
      : f.prefix === "$"
        ? " ($)"
        : "";
    lines.push([f.label + unit, n]);
  }
  lines.push(["", ""], ["Result", "Annual value"]);
  for (const r of results) lines.push([r.t + " ($)", Math.round(r.raw)]);
  lines.push(["Total annual opportunity ($)", Math.round(total)]);
  lines.push(
    ["", ""],
    [
      "Modeled illustration. Arithmetic on the inputs above, not a guarantee of results.",
      "",
    ],
  );

  const csv = lines
    .map((r) =>
      r.map((v) => '"' + String(v).replace(/"/g, '""') + '"').join(","),
    )
    .join("\r\n");
  /* The BOM keeps Excel from mangling the en dashes in the labels. */
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

const esc = (v: string | number) =>
  String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;");

export function printRoiSheet({
  docTitle,
  scaleLine,
  footNote,
  fields,
  values,
  results,
  total,
}: {
  docTitle: string;
  /** Right-hand line under the rule, e.g. "600 patients a year". */
  scaleLine: string;
  footNote: string;
  fields: readonly ExportField[];
  values: Readonly<Record<string, string>>;
  results: readonly ExportResult[];
  total: number;
}) {
  const old = document.getElementById("print-only");
  if (old) old.remove();

  const fmtIn = (k: string) => {
    const n = parseFloat(values[k]);
    if (isNaN(n)) return "0";
    return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  const inputRows = fields
    .map(
      (f) =>
        '<tr><td style="padding:7px 0;border-bottom:1px solid #E6E1D9;font-size:10.5pt;color:#3A4A5C">' +
        esc(f.label) +
        '</td><td style="padding:7px 0;border-bottom:1px solid #E6E1D9;font-size:10.5pt;font-weight:700;color:#0F1D2E;text-align:right;white-space:nowrap">' +
        esc(f.prefix) +
        fmtIn(f.k) +
        (f.suffix ? " " + esc(f.suffix) : "") +
        "</td></tr>",
    )
    .join("");

  const resultRows = results
    .map(
      (r) =>
        '<tr><td style="padding:9px 0;border-bottom:1px solid #E6E1D9"><div style="font-size:11pt;font-weight:700;color:#0F1D2E">' +
        esc(r.t) +
        '</div><div style="font-size:9pt;color:#5A6A7C;line-height:1.35">' +
        esc(r.d) +
        '</div></td><td style="padding:9px 0;border-bottom:1px solid #E6E1D9;font-family:Lato,sans-serif;font-size:20pt;font-weight:300;color:#0F1D2E;text-align:right;white-space:nowrap;vertical-align:middle">' +
        esc(dollars(r.raw)) +
        "</td></tr>",
    )
    .join("");

  const holder = document.createElement("div");
  holder.id = "print-only";
  holder.innerHTML =
    '<div style="font-family:Inter,sans-serif;color:#0F1D2E;padding:0">' +
    '<div style="display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2px solid #0F1D2E;padding-bottom:10px;margin-bottom:18px">' +
    '<div><div style="font-size:8.5pt;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#E3735C">CareOrbit</div>' +
    '<div style="font-family:Lato,sans-serif;font-size:20pt;font-weight:700;letter-spacing:-0.02em;line-height:1.1;margin-top:2px">' +
    esc(docTitle) +
    "</div></div>" +
    '<div style="text-align:right;font-size:9pt;color:#5A6A7C;line-height:1.4">' +
    esc(scaleLine) +
    "<br>" +
    new Date().toLocaleDateString() +
    "</div>" +
    "</div>" +
    '<div style="display:flex;gap:26px;align-items:flex-start">' +
    '<div style="flex:0 0 44%"><div style="font-size:8.5pt;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#8A8578;margin-bottom:6px">Your inputs</div>' +
    '<table style="width:100%;border-collapse:collapse">' +
    inputRows +
    "</table></div>" +
    '<div style="flex:1"><div style="font-size:8.5pt;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#8A8578;margin-bottom:6px">Modeled annual value</div>' +
    '<table style="width:100%;border-collapse:collapse">' +
    resultRows +
    "</table>" +
    '<div style="background:#0F1D2E;border-radius:12px;padding:16px 20px;margin-top:16px;display:flex;justify-content:space-between;align-items:center">' +
    '<div style="font-size:8.5pt;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#F2B8C6">Total annual opportunity</div>' +
    '<div style="font-family:Lato,sans-serif;font-size:26pt;font-weight:300;letter-spacing:-0.03em;color:#FFFFFF;line-height:1">' +
    esc(dollars(total)) +
    "</div>" +
    "</div></div>" +
    "</div>" +
    '<div style="margin-top:18px;padding-top:10px;border-top:1px solid #E6E1D9;font-size:8pt;line-height:1.5;color:#5A6A7C">' +
    esc(footNote) +
    "</div>" +
    "</div>";

  document.body.appendChild(holder);
  document.body.classList.add("co-printing");

  const cleanup = () => {
    document.body.classList.remove("co-printing");
    const h = document.getElementById("print-only");
    if (h) h.remove();
    window.removeEventListener("afterprint", cleanup);
  };
  window.addEventListener("afterprint", cleanup);
  window.print();
  /* Safari never fires afterprint for a cancelled dialog. */
  setTimeout(cleanup, 1500);
}
