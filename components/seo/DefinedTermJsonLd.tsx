import { JsonLd } from "@/components/seo/JsonLd";
import { organizationInsourcingDefinedTermDescription } from "@/data/organizationSchema";

/**
 * Gate 5 F9 — DefinedTerm for Office-Based Insourcing Model.
 * Mount on /blog/what-is-insourcing when that post is live (S8).
 */
export function InsourcingDefinedTermJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        name: "Office-Based Insourcing Model",
        description: organizationInsourcingDefinedTermDescription,
      }}
    />
  );
}
