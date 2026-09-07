import { getSiteUrl, siteConfig } from "@/config/site";
import {
  organizationDescription,
  organizationKnowsAbout,
  organizationSameAs,
  organizationSlogan,
} from "@/data/organizationSchema";

/** Schema.org Organization markup for rich results (homepage only). */
export function OrganizationJsonLd() {
  const url = getSiteUrl();
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${url}/#organization`,
    name: siteConfig.name,
    url: `${url}/`,
    slogan: organizationSlogan,
    logo: {
      "@type": "ImageObject",
      url: `${url}/images/logo-white.png`,
    },
    description: organizationDescription,
    sameAs: [...organizationSameAs],
    knowsAbout: [...organizationKnowsAbout],
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
