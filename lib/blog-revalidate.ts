/**
 * TTL Data Cache (`unstable_cache` di `lib/wordpress.ts`) untuk query blog WP.
 * Min 60. Default 600 (10 menit) jika env tidak di-set.
 *
 * Catatan: `app/blog/layout.tsx` memakai `export const revalidate = 600` (literal, syarat Next.js);
 * jika mengubah default di sini secara signifikan, pertimbangkan menyesuaikan layout agar full-route ISR selaras.
 */
export const BLOG_ROUTE_REVALIDATE_SECONDS = Math.max(
  60,
  Number(process.env.BLOG_REVALIDATE_SECONDS) || 600,
);