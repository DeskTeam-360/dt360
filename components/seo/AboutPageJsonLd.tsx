import { aboutHero } from "@/data/about";
import { AUTHOR_INFO } from "@/data/blog";
import { getSiteUrl, siteConfig } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationId } from "@/components/seo/FaqPageJsonLd";

/** AboutPage + Person (founder) for /about (F9). */
export function AboutPageJsonLd() {
  const siteUrl = getSiteUrl();

  return (
    <JsonLd
      data={[
        {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: `About | ${siteConfig.name}`,
          description: aboutHero.intro,
          url: `${siteUrl}/about`,
          mainEntity: { "@id": `${siteUrl}/#jeremy-kenerson` },
          about: { "@id": organizationId() },
        },
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": `${siteUrl}/#jeremy-kenerson`,
          name: AUTHOR_INFO.name,
          jobTitle: AUTHOR_INFO.title,
          description: AUTHOR_INFO.bio,
          image: `${siteUrl}${AUTHOR_INFO.image}`,
          worksFor: { "@id": organizationId() },
          url: `${siteUrl}/about`,
        },
      ]}
    />
  );
}
