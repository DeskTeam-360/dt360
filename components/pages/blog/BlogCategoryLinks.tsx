import Link from "next/link";
import { GATE5_BLOG_CATEGORIES } from "@/data/gate5BlogCategories";
import { cn } from "@/lib/utils";

type BlogCategoryLinksProps = {
  /** Highlight the current category slug on category pages. */
  activeSlug?: string;
  className?: string;
};

/**
 * Crawlable category index (CMO P2 orphans). FeaturedBlog filters are buttons
 * only — these real hrefs give Ahrefs/Google inbound links to each category.
 */
export function BlogCategoryLinks({
  activeSlug,
  className,
}: BlogCategoryLinksProps) {
  return (
    <nav
      aria-label="Blog categories"
      className={cn(
        "mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-2 px-6 pb-8 lg:px-12",
        className,
      )}
    >
      <Link
        href="/blog"
        className={cn(
          "rounded-full border px-4 py-1.5 font-montserrat text-sm font-bold transition-colors",
          !activeSlug
            ? "border-[#11104C] bg-[#11104C] text-white"
            : "border-[#11104C]/30 text-[#11104C] hover:border-[#11104C] hover:bg-[#11104C]/5",
        )}
      >
        All Posts
      </Link>
      {GATE5_BLOG_CATEGORIES.map((category) => {
        const active = activeSlug === category.slug;
        return (
          <Link
            key={category.slug}
            href={`/blog/category/${category.slug}`}
            className={cn(
              "rounded-full border px-4 py-1.5 font-montserrat text-sm font-bold transition-colors",
              active
                ? "border-[#11104C] bg-[#11104C] text-white"
                : "border-[#11104C]/30 text-[#11104C] hover:border-[#11104C] hover:bg-[#11104C]/5",
            )}
          >
            {category.name}
          </Link>
        );
      })}
    </nav>
  );
}
