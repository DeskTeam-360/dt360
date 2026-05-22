import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getBlogLatestPostsPoolForRelated } from '@/lib/wordpress';
import { DynamicBlogPostContent } from '@/components/pages/blog-single/DynamicBlogPostContent';
import { dummyCaseStudies } from '@/data/caseStudies';
import { HaveQuestionsCTA } from '@/components/pages/case-studies/HaveQuestionsCTA';
import type { BlogPost } from '@/data/blog';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolvedParams = await params;
  let post = await getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    const dummy = dummyCaseStudies.find(c => c.slug === resolvedParams.slug);
    if (!dummy) {
      return {
        title: 'Case Study Not Found | DeskTeam360',
      };
    }
    post = {
      ...dummy,
      content: '',
      author: 'DeskTeam360',
      date: new Date().toISOString(),
      category: 'Case Study',
      categories: ['Case Study'],
      readTime: '5 min read',
    } as BlogPost;
  }

  return {
    title: `${post!.title} | DeskTeam360`,
    description: post!.excerpt,
  };
}

export default async function SingleCaseStudyPage({ params }: Props) {
  const resolvedParams = await params;
  const results = await Promise.all([
    getPostBySlug(resolvedParams.slug),
    getBlogLatestPostsPoolForRelated(),
  ]);
  let post = results[0];
  const latestPostsPool = results[1];

  if (!post) {
    const dummy = dummyCaseStudies.find(c => c.slug === resolvedParams.slug);
    if (!dummy) {
      notFound();
    }
    post = {
      ...dummy,
      content: '',
      author: 'DeskTeam360',
      date: new Date().toISOString(),
      category: 'Case Study',
      categories: ['Case Study'],
      readTime: '5 min read',
    } as BlogPost;
  }

  // Extract related posts from content if they exist (class="dt360-related-posts")
  const content = post!.content || '';
  const relatedSlugs: string[] = [];
  const relatedSectionMatch = content.match(/class="dt360-related-posts"[\s\S]*?<\/div>/);
  
  if (relatedSectionMatch) {
    const linkMatches = relatedSectionMatch[0].matchAll(/href="https?:\/\/[^"\/]+\/([^"\/#\s?]+)\/?/g);
    for (const lm of linkMatches) {
      if (lm[1] && lm[1] !== 'case-studies') {
        relatedSlugs.push(lm[1]);
      }
    }
  }

  // Get the actual post objects for the extracted slugs from our dataset
  let relatedPosts = latestPostsPool.filter((p) => relatedSlugs.includes(p.slug));

  // If we found fewer than 3, fill up with latest posts (excluding the current one and ones already found)
  if (relatedPosts.length < 3) {
    const foundSlugs = relatedPosts.map((p) => p.slug);
    const additional = latestPostsPool
      .filter((p) => p.slug !== resolvedParams.slug && !foundSlugs.includes(p.slug))
      .slice(0, 3 - relatedPosts.length);
    relatedPosts = [...relatedPosts, ...additional];
  }

  return (
    <main className="flex-grow">
      <DynamicBlogPostContent post={post!} relatedPosts={relatedPosts} />
      <HaveQuestionsCTA />
    </main>
  );
}
