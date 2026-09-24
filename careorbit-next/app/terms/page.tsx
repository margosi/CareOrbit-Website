import { metadataFor } from "@/lib/seo";
import { LegalPage, type Block } from "@/components/legal/LegalPage";
import data from "@/lib/legal/terms.json";

/* Website Terms of Use. Body is rendered from lib/legal/terms.json, which is
 * extracted programmatically from the supplied Word document so the legal
 * wording is reproduced verbatim. */

export const metadata = metadataFor("/terms");

export default function TermsPage() {
  return <LegalPage blocks={data.blocks as Block[]} />;
}
