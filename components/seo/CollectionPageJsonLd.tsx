import { getSiteUrl, siteConfig } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationId } from "@/components/seo/FaqPageJsonLd";

type CollectionPageJsonLdProps = {
  name: string;
  path: string;
  description?: string;
};

/** CollectionPage for listing routes: /blog, /blog/page/n, categories, /case-studies (F9). */
export function CollectionPageJsonLd({
  name,
  path,
  description,
}: CollectionPageJsonLdProps) {
  const siteUrl = getSiteUrl();
  const url = path === "/" ? `${siteUrl}/` : `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name,
        description: description ?? siteConfig.description,
        url,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": organizationId() },
      }}
    />
  );
}
