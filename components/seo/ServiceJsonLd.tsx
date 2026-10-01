import { getSiteUrl, siteConfig } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationId } from "@/components/seo/FaqPageJsonLd";

const AREA_SERVED = ["US", "AU", "NZ", "GB"] as const;

type ServiceJsonLdProps = {
  name: string;
  path: string;
  description?: string;
};

/** Service markup for individual service pages (F9). */
export function ServiceJsonLd({ name, path, description }: ServiceJsonLdProps) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description: description ?? siteConfig.description,
        provider: { "@id": organizationId() },
        areaServed: [...AREA_SERVED],
        url,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: "1497",
          highPrice: "4491",
          url: `${siteUrl}/#pricing`,
        },
      }}
    />
  );
}
