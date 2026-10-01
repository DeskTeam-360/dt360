import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { BlogHero } from "@/components/pages/blog/BlogHero";
import { BlogListing } from "@/components/pages/blog/BlogListing";
import { DownloadCTA } from "@/components/pages/blog/DownloadCTA";
import { AuthorSection } from "@/components/pages/blog/AuthorSection";
import { BreadcrumbJsonLd, homeBreadcrumb } from "@/components/seo/BreadcrumbJsonLd";
import { CollectionPageJsonLd } from "@/components/seo/CollectionPageJsonLd";
import {
  BLOG_POSTS_PER_PAGE,
  blogListPath,
  paginateItems,
} from "@/lib/blog-pagination";
import { withPageCanonical } from "@/lib/seo";
import { getBlogData } from "@/lib/wordpress";

type Props = {
  params: Promise<{ page: string }>;
};

export async function generateStaticParams() {
  try {
    const { latestPosts } = await getBlogData();
    const { totalPages } = paginateItems(latestPosts, 1, BLOG_POSTS_PER_PAGE);
    // Page 1 lives at /blog; only emit 2..N
    return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
      page: String(i + 2),
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page: pageParam } = await params;
  const page = Number.parseInt(pageParam, 10);
  if (!Number.isFinite(page) || page < 1) {
    return { title: "Blog" };
  }

  const path = blogListPath(page);
  return withPageCanonical(path, {
    title: page <= 1 ? "Blog" : `Blog — Page ${page}`,
    description:
      "Real talk about delegation, outsourcing, and growing your business without working 80-hour weeks.",
  });
}

export default async function BlogPaginatedPage({ params }: Props) {
  const { page: pageParam } = await params;
  const page = Number.parseInt(pageParam, 10);

  if (!Number.isFinite(page) || page < 1 || String(page) !== pageParam) {
    notFound();
  }

  if (page === 1) {
    permanentRedirect("/blog");
  }

  const { featuredPostsMap, latestPosts, categories, categoryLatestPostsMap } =
    await getBlogData();
  const { totalPages, currentPage } = paginateItems(
    latestPosts,
    page,
    BLOG_POSTS_PER_PAGE,
  );

  if (page > totalPages) {
    notFound();
  }

  const path = blogListPath(currentPage);

  return (
    <main className="flex-grow">
      <BreadcrumbJsonLd
        items={[
          homeBreadcrumb(),
          { name: "Blog", path: "/blog" },
          { name: `Page ${currentPage}`, path },
        ]}
      />
      <CollectionPageJsonLd
        name={`Blog — Page ${currentPage}`}
        path={path}
        description="Real talk about delegation, outsourcing, and growing your business without working 80-hour weeks."
      />
      <BlogHero />
      <BlogListing
        featuredPostsMap={featuredPostsMap}
        latestPosts={latestPosts}
        categoryLatestPostsMap={categoryLatestPostsMap}
        categories={categories}
        listPage={currentPage}
        showFeatured={false}
      />
      <DownloadCTA />
      <AuthorSection />
    </main>
  );
}
