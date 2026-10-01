import { getSiteUrl } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";

export type FaqJsonLdItem = {
  question: string;
  answer: string;
};

/** FAQPage — answers must match visible FAQ copy (F9). */
export function FaqPageJsonLd({ items }: { items: FaqJsonLdItem[] }) {
  if (items.length === 0) return null;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}

export function organizationId(): string {
  return `${getSiteUrl()}/#organization`;
}
