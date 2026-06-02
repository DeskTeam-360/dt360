"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { caseStudiesListSection } from "@/data/caseStudies";
import type { BlogPost } from "@/data/blog";
import { useState } from "react";
import { CASE_STUDIES_PAGE_SIZE } from "@/lib/wordpress";

type Props = {
  posts: BlogPost[];
};

function CaseStudyCard({ post }: { post: BlogPost }) {
  const { readLabel } = caseStudiesListSection;

  return (
    <article className="group flex h-full flex-col rounded-[30px] border-[5px] border-white bg-white/60 shadow-[0_16px_40px_-24px_rgba(16,22,81,0.35)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-20px_rgba(16,22,81,0.4)]">
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
        <Link href={`/case-studies/${post.slug}`}>
          <h3
            className="type-rule-h6 mb-3 font-heading font-bold text-[#11104c] transition-colors hover:text-[#f0573a]"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
        </Link>
        {post.excerpt ? (
          <p
            className="type-rule-p mb-6 line-clamp-4 text-[14px] leading-relaxed text-[#11104c]/80 md:text-[16px]"
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
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

export function DeskTeam360sCaseStudies({ posts }: Props) {
  const { title, emptyMessage } = caseStudiesListSection;
  const [visibleCount, setVisibleCount] = useState(
    Math.min(CASE_STUDIES_PAGE_SIZE, posts.length),
  );

  const displayPosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  const handleLoadMore = () => {
    setVisibleCount((current) =>
      Math.min(current + CASE_STUDIES_PAGE_SIZE, posts.length),
    );
  };

  return (
    <section
      id="case-studies-stories"
      className="relative z-10 -mt-20 scroll-mt-28 overflow-hidden bg-white pt-28 pb-16 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-20 before:h-1 before:-translate-y-full before:bg-white sm:-mt-14 md:-mt-16 md:before:hidden lg:-mt-20 xl:-mt-24 2xl:-mt-28 md:pt-36 md:pb-20 lg:pt-48 lg:pb-24"
      aria-labelledby="case-studies-list-heading"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute z-0 h-[min(900px,95vw)] w-[min(900px,80vw)] rounded-full opacity-90"
          style={{
            top: "6em",
            right: "-10em",
            background:
              "radial-gradient(circle, rgba(0,200,244,0.35) 0%, rgba(0,200,244,0.12) 45%, transparent 70%)",
          }}
          aria-hidden
        />
        <div
          className="absolute top-1/2 left-1/2 z-0 h-[min(1000px,100vw)] w-[min(1000px,100vw)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80"
          style={{
            background:
              "radial-gradient(circle, rgba(227,5,141,0.28) 0%, rgba(227,5,141,0.1) 45%, transparent 70%)",
          }}
          aria-hidden
        />

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
          <p className="type-rule-p mt-12 text-center text-[#11104c]/70">{emptyMessage}</p>
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
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#11104c] px-6 py-2 text-[15px] font-bold text-[#11104c] transition-colors hover:bg-[#11104c] hover:text-white md:px-8 md:py-2.5 md:text-[16px]"
                >
                  Load More
                  <span className="flex size-5 items-center justify-center rounded-full border border-current md:size-6">
                    <ChevronDown className="size-3 md:size-4" aria-hidden />
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
