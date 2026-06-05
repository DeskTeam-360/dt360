/**
 * ISR segment for `/blog` (value must be a literal so Next.js recognizes it).
 * Default 600 seconds = default `BLOG_REVALIDATE_SECONDS` in `lib/blog-revalidate.ts`.
 * Change the number here if you want a full-route interval different from the Data Cache.
 */
export const revalidate = 600;

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
