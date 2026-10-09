import Link from "next/link";
import parse from "html-react-parser";
import { Container } from "@/components/shared/Container";
import { Gate5DarkHero } from "@/components/pages/gate5/Gate5DarkHero";
import { sitePaths } from "@/config/urls";
import type { Gate5HeroArt } from "@/data/gate5HeroArt";

type Gate5ProsePageProps = {
  h1: string;
  contentHtml: string;
  /** Short supporting line for the dark hero (usually meta description). */
  lead?: string;
  heroArt?: Gate5HeroArt;
  /** Show Book a Call under the closing line (S8 audience/service pages). */
  showBookACall?: boolean;
};

/** Renders Gate 5 handoff HTML (H2+ body), optionally under a dark brand hero. */
export function Gate5ProsePage({
  h1,
  contentHtml,
  lead,
  heroArt,
  showBookACall = true,
}: Gate5ProsePageProps) {
  const showHero = Boolean(heroArt && lead);

  return (
    <>
      {showHero && heroArt && lead ? (
        <Gate5DarkHero h1={h1} lead={lead} art={heroArt} />
      ) : null}

      <section
        className={
          showHero
            ? "bg-white pb-20 pt-14 md:pb-28 md:pt-16"
            : "bg-white pb-20 pt-32 md:pb-28 md:pt-40"
        }
      >
        <Container className="max-w-[900px]">
          {!showHero ? (
            <h1 className="font-[var(--font-poppins)] text-[36px] font-bold leading-[1.15] text-[#11104C] md:text-[48px] lg:text-[56px]">
              {h1}
            </h1>
          ) : null}
          <div
            className={
              showHero
                ? "gate5-prose font-[var(--font-montserrat)] text-[18px] font-medium leading-[1.9] text-[#11104C]/90"
                : "gate5-prose mt-10 font-[var(--font-montserrat)] text-[18px] font-medium leading-[1.9] text-[#11104C]/90"
            }
          >
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
    </>
  );
}
