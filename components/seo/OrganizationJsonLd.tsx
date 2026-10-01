import { getSiteUrl, siteConfig } from "@/config/site";
import {
  organizationAreaServed,
  organizationDescription,
  organizationFounderName,
  organizationFoundingDate,
  organizationKnowsAbout,
  organizationSameAs,
  organizationSlogan,
} from "@/data/organizationSchema";
import { JsonLd } from "@/components/seo/JsonLd";

/** Schema.org Organization + WebSite for the homepage (F9). */
export function OrganizationJsonLd() {
  const url = getSiteUrl();
  const orgId = `${url}/#organization`;
  const websiteId = `${url}/#website`;

  return (
    <JsonLd
      data={[
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": orgId,
          name: siteConfig.name,
          url: `${url}/`,
          slogan: organizationSlogan,
          logo: {
            "@type": "ImageObject",
            url: `${url}/images/logo-white.png`,
          },
          // Existing description kept; Gate 5 may replace later (F9 step 4).
          description: organizationDescription,
          foundingDate: organizationFoundingDate,
          founder: {
            "@type": "Person",
            name: organizationFounderName,
          },
          sameAs: [...organizationSameAs],
          knowsAbout: [...organizationKnowsAbout],
          areaServed: [...organizationAreaServed],
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": websiteId,
          url: `${url}/`,
          name: siteConfig.name,
          publisher: { "@id": orgId },
        },
      ]}
    />
  );
}
