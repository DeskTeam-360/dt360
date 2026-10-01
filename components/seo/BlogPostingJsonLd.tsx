import type { BlogPost } from "@/data/blog";
import { getSiteUrl } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationId } from "@/components/seo/FaqPageJsonLd";

function toAbsolute(siteUrl: string, src: string): string {
  if (/^https?:\/\//i.test(src)) return src;
  return `${siteUrl}${src.startsWith("/") ? src : `/${src}`}`;
}

type BlogPostingJsonLdProps = {
  post: BlogPost;
  path: string;
};

/** BlogPosting for /blog/{slug} (F9). */
export function BlogPostingJsonLd({ post, path }: BlogPostingJsonLdProps) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const published = post.date;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: toAbsolute(siteUrl, post.image),
        datePublished: published,
        dateModified: published,
        author: {
          "@type": "Person",
          name: post.author,
        },
        publisher: { "@id": organizationId() },
        mainEntityOfPage: url,
        url,
      }}
    />
  );
}

type CaseStudyArticleJsonLdProps = {
  post: BlogPost;
  path: string;
};

/** Article for case-study detail pages (F9). */
export function CaseStudyArticleJsonLd({ post, path }: CaseStudyArticleJsonLdProps) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const published = post.date;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        image: toAbsolute(siteUrl, post.image),
        datePublished: published,
        dateModified: published,
        author: {
          "@type": "Person",
          name: post.author,
        },
        publisher: { "@id": organizationId() },
        mainEntityOfPage: url,
        url,
      }}
    />
  );
}
