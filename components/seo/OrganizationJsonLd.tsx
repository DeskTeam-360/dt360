import { getSiteUrl, siteConfig } from "@/config/site";
import {
  organizationAreaServed,
  organizationDescription,
  organizationKnowsAbout,
  organizationSameAs,
  organizationSlogan,
} from "@/data/organizationSchema";

/** Schema.org Organization markup for rich results. */
export function OrganizationJsonLd() {
  const url = getSiteUrl();
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: `${url}/`,
    slogan: organizationSlogan,
    logo: `${url}/images/logo-white.png`,
    description: organizationDescription,
    sameAs: [...organizationSameAs],
    knowsAbout: [...organizationKnowsAbout],
    areaServed: organizationAreaServed.map((area) => ({
      "@type": area["@type"],
      name: area.name,
      url: [...area.url],
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
