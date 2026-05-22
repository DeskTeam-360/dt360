import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { caseStudiesListSection } from "@/data/caseStudies";
import type { BlogPost } from "@/data/blog";
import { cn } from "@/lib/utils";

type Props = {
  posts: BlogPost[];
};

function CaseStudyCard({ post }: { post: BlogPost }) {
  const { readLabel, categoryLabel } = caseStudiesListSection;

  return (
    <article className="group flex flex-col rounded-[30px] border border-[#11104c] bg-white shadow-sm transition-all duration-300 hover:bg-[#11104c] hover:shadow-md">
      <div className="p-4 pb-0 md:p-5">
        <div className="relative h-[220px] w-full overflow-hidden rounded-[20px] md:h-[240px]">
          <SafeImage
            src={post.image}
            alt={post.title}
            fill
            className="object-cover object-left-top transition-transform duration-700 group-hover:scale-105"
          />
          <span
            className={cn(
              "absolute bottom-4 left-4 z-10 rounded-[20px] px-[15px] py-[6px] text-[12px] font-bold uppercase tracking-wider text-white md:bottom-6 md:left-6",
              post.tagColor || "bg-[#e3058d]",
            )}
          >
            {categoryLabel}
          </span>
        </div>
      </div>
      <div className="flex flex-grow flex-col p-6 pt-5 md:p-8 md:pt-6">
        <div className="mb-3 flex items-center gap-3 text-[12px] font-semibold text-[#8491e8] transition-colors duration-300 group-hover:text-white/80 md:gap-4 md:text-[14px]">
          <span>{post.readTime}</span>
          <span className="text-[#8491e8]/50 transition-colors duration-300 group-hover:text-white/50">
            |
          </span>
          <span>{post.author}</span>
        </div>
        <h3 className="type-rule-h4 mb-6 font-heading text-[#11104c] transition-colors duration-300 group-hover:text-white">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="type-rule-p mb-6 line-clamp-3 text-[#11104c]/80 transition-colors duration-300 group-hover:text-white/85">
            {post.excerpt}
          </p>
        ) : null}
        <div className="mt-auto">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex cursor-pointer items-center gap-3 rounded-[10px] border-2 border-[#7547c5] px-6 py-2 font-bold text-[14px] text-[#7547c5] transition-colors group-hover:border-[#f5b419] group-hover:text-[#f5b419] hover:!bg-[#f5b419] hover:!text-[#11104c] md:py-3 md:text-[16px]"
          >
            {readLabel}
            <span className="flex size-5 items-center justify-center rounded-full border-2 border-current md:size-6">
              <ArrowRight className="size-3 stroke-[3] md:size-4" aria-hidden />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function CaseStudiesList({ posts }: Props) {
  const { title, subtitle, emptyMessage } = caseStudiesListSection;

  return (
    <section
      id="case-studies-stories"
      className="scroll-mt-28 bg-white py-16 md:py-20 lg:py-24"
      aria-labelledby="case-studies-list-heading"
    >
      <Container className="max-w-[1440px] px-6 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="case-studies-list-heading"
            className="type-rule-h2 font-heading font-bold tracking-tight text-[#11104c]"
          >
            {title}
          </h2>
          <p className="type-rule-p mt-4 text-pretty text-[#11104c]/85">{subtitle}</p>
        </div>

        {posts.length === 0 ? (
          <p className="type-rule-p mt-12 text-center text-[#11104c]/70">{emptyMessage}</p>
        ) : (
          <ul className="mt-12 grid list-none grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.id}>
                <CaseStudyCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
