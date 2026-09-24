import { metadataFor } from "@/lib/seo";
import { LegalPage, type Block } from "@/components/legal/LegalPage";
import data from "@/lib/legal/privacy.json";

/* Privacy Policy. Body is rendered from lib/legal/privacy.json, which is
 * extracted programmatically from the supplied Word document so the legal
 * wording is reproduced verbatim. */

export const metadata = metadataFor("/privacy");

export default function PrivacyPage() {
  return <LegalPage blocks={data.blocks as Block[]} />;
}
