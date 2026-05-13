import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getBlogData } from '@/lib/wordpress';
import { DynamicBlogPostContent } from '@/components/pages/blog-single/DynamicBlogPostContent';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | DeskTeam360',
    };
  }

  return {
    title: `${post.title} | DeskTeam360`,
    description: post.excerpt,
  };
}

export default async function SingleBlogPage({ params }: Props) {
  const resolvedParams = await params;
  const [post, allBlogData] = await Promise.all([
    getPostBySlug(resolvedParams.slug),
    getBlogData()
  ]);

  if (!post) {
    notFound();
  }

  // Extract related posts from content if they exist (class="dt360-related-posts")
  const content = post.content || '';
  const relatedSlugs: string[] = [];
  const relatedSectionMatch = content.match(/class="dt360-related-posts"[\s\S]*?<\/div>/);
  
  if (relatedSectionMatch) {
    // Look for slugs in hrefs (e.g., https://clone.deskteam360.com/slug-name/)
    // We look for the last part of the URL before the closing quote/slash
    const linkMatches = relatedSectionMatch[0].matchAll(/href="https?:\/\/[^"\/]+\/([^"\/#\s?]+)\/?/g);
    for (const lm of linkMatches) {
      if (lm[1] && lm[1] !== 'blog') {
        relatedSlugs.push(lm[1]);
      }
    }
  }

  // Get the actual post objects for the extracted slugs from our dataset
  let relatedPosts = allBlogData.latestPosts.filter(p => relatedSlugs.includes(p.slug));
  
  // If we found fewer than 3, fill up with latest posts (excluding the current one and ones already found)
  if (relatedPosts.length < 3) {
    const foundSlugs = relatedPosts.map(p => p.slug);
    const additional = allBlogData.latestPosts
      .filter(p => p.slug !== resolvedParams.slug && !foundSlugs.includes(p.slug))
      .slice(0, 3 - relatedPosts.length);
    relatedPosts = [...relatedPosts, ...additional];
  }

  return (
    <main className="flex-grow">
      <DynamicBlogPostContent post={post} relatedPosts={relatedPosts} />
    </main>
  );
}
