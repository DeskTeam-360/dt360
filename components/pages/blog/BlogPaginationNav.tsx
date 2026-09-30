import Link from "next/link";
import type { BlogPagination } from "@/lib/blog-pagination";
import { cn } from "@/lib/utils";

type Props = {
  pagination: BlogPagination;
  className?: string;
};

/**
 * F6 — real `<a href>` pagination for crawlers ("Newer posts" / "Older posts").
 * Page 1 is newest; lower page numbers = newer.
 */
export function BlogPaginationNav({ pagination, className }: Props) {
  const { hasPrev, hasNext, prevHref, nextHref, currentPage, totalPages } =
    pagination;

  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Blog pages"
      className={cn(
        "mt-12 flex flex-wrap items-center justify-center gap-4 md:mt-16",
        className,
      )}
    >
      {hasPrev && prevHref ? (
        <Link
          href={prevHref}
          className="inline-flex items-center rounded-full bg-[#e3058d] px-5 py-2.5 text-[14px] font-bold text-white shadow-lg transition-colors hover:bg-[#d10481] md:px-6 md:text-[16px]"
        >
          Newer posts
        </Link>
      ) : (
        <span className="inline-flex cursor-not-allowed items-center rounded-full bg-[#e2e2e2] px-5 py-2.5 text-[14px] font-bold text-[#acacac] md:px-6 md:text-[16px]">
          Newer posts
        </span>
      )}

      <span className="text-[14px] font-semibold text-[#11104c]/70 md:text-[16px]">
        Page {currentPage} of {totalPages}
      </span>

      {hasNext && nextHref ? (
        <Link
          href={nextHref}
          className="inline-flex items-center rounded-full bg-[#e3058d] px-5 py-2.5 text-[14px] font-bold text-white shadow-lg transition-colors hover:bg-[#d10481] md:px-6 md:text-[16px]"
        >
          Older posts
        </Link>
      ) : (
        <span className="inline-flex cursor-not-allowed items-center rounded-full bg-[#e2e2e2] px-5 py-2.5 text-[14px] font-bold text-[#acacac] md:px-6 md:text-[16px]">
          Older posts
        </span>
      )}
    </nav>
  );
}
