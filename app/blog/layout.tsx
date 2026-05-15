/**
 * ISR segmen `/blog` (nilai harus literal agar dikenali Next.js).
 * Default 600 detik = default `BLOG_REVALIDATE_SECONDS` di `lib/blog-revalidate.ts`.
 * Ubah angka di sini jika ingin interval full-route berbeda dari Data Cache.
 */
export const revalidate = 600;

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
