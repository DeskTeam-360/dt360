/**
 * Data Cache TTL (`unstable_cache` in `lib/wordpress.ts`) for WP blog queries.
 * Min 60. Default 600 (10 minutes) if env is not set.
 *
 * Note: `app/blog/layout.tsx` uses `export const revalidate = 600` (literal, Next.js requirement);
 * if you change the default here significantly, consider updating the layout so full-route ISR stays aligned.
 */
export const BLOG_ROUTE_REVALIDATE_SECONDS = Math.max(
  60,
  Number(process.env.BLOG_REVALIDATE_SECONDS) || 600,
);