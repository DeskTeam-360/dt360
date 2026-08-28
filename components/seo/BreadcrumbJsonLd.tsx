import { getSiteUrl } from "@/config/site";

export type BreadcrumbItem = {
  name: string;
  /** Site path, e.g. `/blog` or `/` */
  path: string;
};

function toAbsoluteUrl(siteUrl: string, path: string): string {
  if (!path || path === "/") return siteUrl;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Schema.org BreadcrumbList for rich results (no visible UI). */
export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null;

  const siteUrl = getSiteUrl();
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(siteUrl, item.path),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export function homeBreadcrumb(): BreadcrumbItem {
  return { name: "Home", path: "/" };
}

export function blogPostBreadcrumbs(title: string, slug: string): BreadcrumbItem[] {
  return [
    homeBreadcrumb(),
    { name: "Blog", path: "/blog" },
    { name: title, path: `/blog/${slug}` },
  ];
}

export function blogCategoryBreadcrumbs(name: string, slug: string): BreadcrumbItem[] {
  return [
    homeBreadcrumb(),
    { name: "Blog", path: "/blog" },
    { name: name, path: `/blog/category/${slug}` },
  ];
}

export function caseStudyBreadcrumbs(title: string, slug: string): BreadcrumbItem[] {
  return [
    homeBreadcrumb(),
    { name: "Case Studies", path: "/case-studies" },
    { name: title, path: `/case-studies/${slug}` },
  ];
}

export function serviceBreadcrumbs(name: string, path: string): BreadcrumbItem[] {
  return [
    homeBreadcrumb(),
    { name: "Services", path: "/services" },
    { name: name, path },
  ];
}
