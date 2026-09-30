/** F6 — server-rendered blog index pagination (12 posts / page). */
export const BLOG_POSTS_PER_PAGE = 12;

export function blogListPath(page: number): string {
  return page <= 1 ? "/blog" : `/blog/page/${page}`;
}

export type BlogPagination = {
  currentPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
  prevHref: string | null;
  nextHref: string | null;
};

export function paginateItems<T>(
  items: T[],
  page: number,
  perPage: number = BLOG_POSTS_PER_PAGE,
): { items: T[] } & BlogPagination {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;

  return {
    items: items.slice(start, start + perPage),
    currentPage,
    totalPages,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
    prevHref: currentPage > 1 ? blogListPath(currentPage - 1) : null,
    nextHref: currentPage < totalPages ? blogListPath(currentPage + 1) : null,
  };
}
