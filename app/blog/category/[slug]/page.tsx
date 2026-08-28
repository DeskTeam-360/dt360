import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogHero } from "@/components/pages/blog/BlogHero";
import { BlogListing } from "@/components/pages/blog/BlogListing";
import { DownloadCTA } from "@/components/pages/blog/DownloadCTA";
import { AuthorSection } from "@/components/pages/blog/AuthorSection";
import {
  BreadcrumbJsonLd,
  blogCategoryBreadcrumbs,
} from "@/components/seo/BreadcrumbJsonLd";
import { resolveCategoryNameFromSlug } from "@/lib/blog-categories";
import { withPageCanonical } from "@/lib/seo";
import { getBlogData } from "@/lib/wordpress";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { categories } = await getBlogData();
  const categoryName = resolveCategoryNameFromSlug(slug, categories);

  if (!categoryName) {
    return { title: "Category Not Found" };
  }

  // Brand suffix comes from root layout title.template (`%s | DeskTeam360`).
  return withPageCanonical(`/blog/category/${slug}`, {
    title: categoryName,
    description: `Articles in the ${categoryName} category on the DeskTeam360 blog.`,
  });
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  const { featuredPostsMap, latestPosts, categories, categoryLatestPostsMap } =
    await getBlogData();
  const categoryName = resolveCategoryNameFromSlug(slug, categories);

  if (!categoryName) {
    notFound();
  }

  return (
    <main className="flex-grow">
      <BreadcrumbJsonLd items={blogCategoryBreadcrumbs(categoryName, slug)} />
      <BlogHero />
      <BlogListing
        featuredPostsMap={featuredPostsMap}
        latestPosts={latestPosts}
        categoryLatestPostsMap={categoryLatestPostsMap}
        categories={categories}
        initialCategory={categoryName}
      />
      <DownloadCTA />
      <AuthorSection />
    </main>
  );
}
