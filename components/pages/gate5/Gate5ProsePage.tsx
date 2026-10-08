import Link from "next/link";
import parse from "html-react-parser";
import { Container } from "@/components/shared/Container";
import { sitePaths } from "@/config/urls";

type Gate5ProsePageProps = {
  h1: string;
  contentHtml: string;
  /** Show Book a Call under the closing line (S8 audience/service pages). */
  showBookACall?: boolean;
};

/** Renders Gate 5 handoff HTML (H2+ body) for new core pages until F11 templates land. */
export function Gate5ProsePage({
  h1,
  contentHtml,
  showBookACall = true,
}: Gate5ProsePageProps) {
  return (
    <section className="bg-white pb-20 pt-32 md:pb-28 md:pt-40">
      <Container className="max-w-[900px]">
        <h1 className="font-[var(--font-poppins)] text-[36px] font-bold leading-[1.15] text-[#11104C] md:text-[48px] lg:text-[56px]">
          {h1}
        </h1>
        <div className="gate5-prose mt-10 font-[var(--font-montserrat)] text-[18px] font-medium leading-[1.9] text-[#11104C]/90">
          {parse(contentHtml)}
        </div>
        {showBookACall ? (
          <div className="mt-12">
            <Link
              href={sitePaths.bookACall}
              className="font-nav-primary inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#e4277a] to-[#c41e6a] px-6 py-3.5 text-white shadow-lg transition hover:brightness-110"
            >
              Book a Call
            </Link>
          </div>
        ) : null}
      </Container>
      <style>{`
        .gate5-prose h2 {
          font-family: var(--font-poppins), sans-serif;
          font-weight: 600;
          font-size: clamp(28px, 4vw, 40px);
          line-height: 1.2;
          margin: 2.5rem 0 1rem;
          color: #11104C;
        }
        .gate5-prose h3 {
          font-family: var(--font-poppins), sans-serif;
          font-weight: 600;
          font-size: clamp(22px, 3vw, 28px);
          line-height: 1.3;
          margin: 2rem 0 0.75rem;
          color: #11104C;
        }
        .gate5-prose p { margin: 0 0 1.25rem; }
        .gate5-prose ul { margin: 0 0 1.25rem; padding-left: 1.25rem; list-style: disc; }
        .gate5-prose li { margin: 0.35rem 0; }
        .gate5-prose a { color: #E6236D; text-decoration: underline; }
        .gate5-prose a:hover { color: #11104C; }
      `}</style>
    </section>
  );
}
