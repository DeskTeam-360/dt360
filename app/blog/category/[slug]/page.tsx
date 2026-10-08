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
import { CollectionPageJsonLd } from "@/components/seo/CollectionPageJsonLd";
import { GATE5_BLOG_CATEGORIES } from "@/data/gate5BlogCategories";
import {
  resolveCategoryNameFromSlug,
  resolveGate5BlogCategory,
} from "@/lib/blog-categories";
import { withPageCanonical } from "@/lib/seo";
import { getBlogData } from "@/lib/wordpress";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return GATE5_BLOG_CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const gate5 = resolveGate5BlogCategory(slug);
  const { categories } = await getBlogData();
  const categoryName =
    gate5?.name ?? resolveCategoryNameFromSlug(slug, categories);

  if (!categoryName) {
    return { title: "Category Not Found" };
  }

  // Absolute title tags come from gate5AbsoluteTitles via withPageCanonical.
  return withPageCanonical(`/blog/category/${slug}`, {
    title: categoryName,
    description:
      gate5?.metaDescription ??
      `Articles in the ${categoryName} category on the DeskTeam360 blog.`,
  });
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  const gate5 = resolveGate5BlogCategory(slug);
  const { featuredPostsMap, latestPosts, categories, categoryLatestPostsMap } =
    await getBlogData();
  const categoryName =
    gate5?.name ?? resolveCategoryNameFromSlug(slug, categories);

  if (!categoryName) {
    notFound();
  }

  const listingCategories = categories.includes(categoryName)
    ? categories
    : [...categories.filter((c) => c !== "All Posts"), categoryName].sort(
        (a, b) => {
          if (a === "All Posts") return -1;
          if (b === "All Posts") return 1;
          return a.localeCompare(b);
        },
      );

  // Ensure All Posts stays first when we inject a Gate 5 name.
  const withAllPosts = listingCategories.includes("All Posts")
    ? listingCategories
    : ["All Posts", ...listingCategories];

  return (
    <main className="flex-grow">
      <BreadcrumbJsonLd items={blogCategoryBreadcrumbs(categoryName, slug)} />
      <CollectionPageJsonLd
        name={categoryName}
        path={`/blog/category/${slug}`}
        description={
          gate5?.metaDescription ??
          `Articles in the ${categoryName} category on the DeskTeam360 blog.`
        }
      />
      <BlogHero title={categoryName} description={gate5?.pageDescription} />
      <BlogListing
        featuredPostsMap={featuredPostsMap}
        latestPosts={latestPosts}
        categoryLatestPostsMap={categoryLatestPostsMap}
        categories={withAllPosts}
        initialCategory={categoryName}
      />
      <DownloadCTA />
      <AuthorSection />
    </main>
  );
}
