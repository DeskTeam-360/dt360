import { notFound, permanentRedirect } from 'next/navigation';
import { getPostBySlug, isCaseStudyPost } from '@/lib/wordpress';

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Legacy root post URLs (`/{slug}`) used to render the same content as
 * `/blog/{slug}` with only a soft canonical. Prefer a permanent redirect so
 * Google consolidates signals on the canonical path.
 *
 * Static marketing routes (`/about`, `/services`, …) still win over this
 * dynamic segment and are unaffected.
 */
export default async function LegacyRootPostRedirectPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  if (isCaseStudyPost(post)) {
    permanentRedirect(`/case-studies/${slug}`);
  }

  permanentRedirect(`/blog/${slug}`);
}
