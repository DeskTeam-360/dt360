"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, Loader2 } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { caseStudiesListSection, dummyCaseStudies } from "@/data/caseStudies";
import type { BlogPost } from "@/data/blog";
import { useState } from "react";
import { loadMoreCaseStudies } from "@/app/case-studies/actions";

type Props = {
  initialPosts?: BlogPost[];
  initialPageInfo?: {
    endCursor: string | null;
    hasNextPage: boolean;
  };
};

function CaseStudyCard({ post }: { post: BlogPost }) {
  const { readLabel } = caseStudiesListSection;

  return (
    <article className="group flex h-full flex-col rounded-[30px] border border-white/60 bg-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
      <div className="p-4 pb-0 md:p-5">
        <div className="relative h-[220px] w-full overflow-hidden rounded-[20px] md:h-[240px]">
          <SafeImage
            src={post.image}
            alt={post.title}
            fill
            className="object-cover object-left-top transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>
      <div className="flex flex-grow flex-col p-6 pt-5 md:p-8 md:pt-6">
        <h3 className="type-rule-h6 mb-3 font-heading font-bold text-[#11104c]" dangerouslySetInnerHTML={{ __html: post.title }} />
        {post.excerpt ? (
          <p className="type-rule-p mb-6 line-clamp-4 text-[14px] leading-relaxed text-[#11104c]/80 md:text-[16px]" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
        ) : null}
        <div className="mt-auto">
          <Link
            href={`/case-studies/${post.slug}`}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#11104c] px-4 py-1.5 text-[14px] font-bold text-[#11104c] transition-colors hover:bg-[#11104c] hover:text-white md:px-5 md:py-2 md:text-[15px]"
          >
            {readLabel}
            <span className="flex size-5 items-center justify-center rounded-full border border-current md:size-6">
              <ArrowRight className="size-3 md:size-4" aria-hidden />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function DeskTeam360sCaseStudies({ initialPosts = [], initialPageInfo = { endCursor: null, hasNextPage: false } }: Props) {
  const { title } = caseStudiesListSection;
  
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [pageInfo, setPageInfo] = useState(initialPageInfo);
  const [isLoading, setIsLoading] = useState(false);

  const displayPosts = posts.length > 0 ? posts : dummyCaseStudies;
  const hasMore = posts.length > 0 ? pageInfo.hasNextPage : false;

  const handleLoadMore = async () => {
    if (!pageInfo.endCursor || isLoading) return;
    
    setIsLoading(true);
    try {
      const data = await loadMoreCaseStudies(pageInfo.endCursor);
      setPosts((prev) => [...prev, ...data.posts]);
      setPageInfo(data.pageInfo);
    } catch (error) {
      console.error("Failed to load more case studies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="case-studies-stories"
      className="relative z-10 -mt-12 sm:-mt-14 md:-mt-16 lg:-mt-20 xl:-mt-24 2xl:-mt-28 scroll-mt-28 overflow-hidden bg-[#f8fafe] pt-28 pb-16 md:pt-36 md:pb-20 lg:pt-48 lg:pb-24"
      aria-labelledby="case-studies-list-heading"
    >


      {/* Background Blobs & Images */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Fluid Background Images */}
        <div className="absolute left-0 top-[5%] h-[500px] w-[300px] opacity-80 md:h-[700px] md:w-[400px] lg:h-[900px] lg:w-[500px] xl:w-[600px]">
          <SafeImage
            src="/images/case-studies/fluid bg left.png"
            alt="Fluid Background Left"
            fill
            className="object-contain object-left-top"
          />
        </div>
        <div className="absolute right-0 top-[15%] h-[500px] w-[300px] opacity-80 md:h-[700px] md:w-[400px] lg:h-[900px] lg:w-[500px] xl:w-[600px]">
          <SafeImage
            src="/images/case-studies/fluid bg right.png"
            alt="Fluid Background Right"
            fill
            className="object-contain object-right-top"
          />
        </div>

        {/* Bottom CSS Blobs */}
        <div className="absolute bottom-[10%] left-[20%] h-[700px] w-[700px] rounded-full bg-cyan-200/30 blur-[120px]" />
        <div className="absolute -right-[10%] bottom-[20%] h-[600px] w-[600px] rounded-full bg-purple-300/30 blur-[120px]" />
      </div>

      <Container className="relative z-10 max-w-[1440px] px-6 lg:px-12">
        <div className="mx-auto mb-12 text-center md:mb-16">
          <h2
            id="case-studies-list-heading"
            className="type-rule-h2 font-heading font-bold tracking-tight text-[#11104c]"
          >
            {title}
          </h2>
        </div>

        {displayPosts.length === 0 ? (
          <p className="type-rule-p mt-12 text-center text-[#11104c]/70">No case studies published yet.</p>
        ) : (
          <>
            <ul className="grid list-none grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {displayPosts.map((post: BlogPost) => (
                <li key={post.id}>
                  <CaseStudyCard post={post} />
                </li>
              ))}
            </ul>
            {hasMore && (
              <div className="mt-12 flex justify-center md:mt-16">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#11104c] px-6 py-2 text-[15px] font-bold text-[#11104c] transition-colors hover:bg-[#11104c] hover:text-white disabled:opacity-70 disabled:cursor-not-allowed md:px-8 md:py-2.5 md:text-[16px]"
                >
                  {isLoading ? "Loading..." : "Load More"}
                  <span className="flex size-5 items-center justify-center rounded-full border border-current md:size-6">
                    {isLoading ? (
                      <Loader2 className="size-3 animate-spin md:size-4" aria-hidden />
                    ) : (
                      <ChevronDown className="size-3 md:size-4" aria-hidden />
                    )}
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
}
