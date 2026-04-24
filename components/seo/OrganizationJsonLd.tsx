import { getSiteUrl, siteConfig } from "@/config/site";

/** Schema.org Organization markup for rich results. */
export function OrganizationJsonLd() {
  const url = getSiteUrl();
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url,
    description: siteConfig.description,
    logo: `${url}/images/logo.png`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
