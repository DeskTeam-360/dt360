import Link from "next/link";
import parse from "html-react-parser";
import { Container } from "@/components/shared/Container";
import { Gate5DarkHero } from "@/components/pages/gate5/Gate5DarkHero";
import { sitePaths } from "@/config/urls";
import { getGate5ServiceHeroArt } from "@/data/gate5HeroArt";
import {
  GATE5_BOOK_A_CALL_MARKER,
  type Gate5ServicePage as Gate5ServicePageData,
} from "@/data/gate5ServicePages";

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
}

function BookACallButton() {
  return (
    <Link
      href={sitePaths.bookACall}
      className="font-nav-primary inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#e4277a] to-[#c41e6a] px-6 py-3.5 text-white shadow-lg transition hover:brightness-110"
    >
      Book a Call
    </Link>
  );
}

type Props = {
  page: Gate5ServicePageData;
};

/** Gate 5 F11 — dark hero + 5-section prose (What you get → Questions + closing CTA). */
export function Gate5ServicePage({ page }: Props) {
  const [beforeCta, afterCta = ""] = page.bodyHtml.split(GATE5_BOOK_A_CALL_MARKER);
  const heroArt = getGate5ServiceHeroArt(page.slug);

  return (
    <>
      {heroArt ? (
        <Gate5DarkHero h1={page.h1} lead={page.metaDescription} art={heroArt} />
      ) : null}

      <section
        className={
          heroArt
            ? "bg-white pb-20 pt-14 md:pb-28 md:pt-16"
            : "bg-white pb-20 pt-32 md:pb-28 md:pt-40"
        }
      >
        <Container className="max-w-[900px]">
          {!heroArt ? (
            <h1 className="font-[var(--font-poppins)] text-[36px] font-bold leading-[1.15] text-[#11104C] md:text-[48px] lg:text-[56px]">
              {page.h1}
            </h1>
          ) : null}

          <div
            className={
              heroArt
                ? "gate5-prose font-[var(--font-montserrat)] text-[18px] font-medium leading-[1.9] text-[#11104C]/90"
                : "gate5-prose mt-10 font-[var(--font-montserrat)] text-[18px] font-medium leading-[1.9] text-[#11104C]/90"
            }
          >
            {parse(beforeCta)}
          </div>

          <div className="mt-8">
            <BookACallButton />
          </div>

          {afterCta.trim() ? (
            <div className="gate5-prose mt-10 font-[var(--font-montserrat)] text-[18px] font-medium leading-[1.9] text-[#11104C]/90">
              {parse(afterCta)}
            </div>
          ) : null}

          <div className="gate5-prose mt-10 font-[var(--font-montserrat)] text-[18px] font-medium leading-[1.9] text-[#11104C]/90">
            <h2>{page.questionsH2}</h2>
            {page.faqs.map((faq) => (
              <div key={faq.question} className="mb-6">
                <h3>{faq.question}</h3>
                <div>{parse(faq.answer)}</div>
              </div>
            ))}
          </div>

          <p className="mt-10 font-[var(--font-montserrat)] text-[18px] font-medium leading-[1.9] text-[#11104C]/90">
            {page.closingLine}
          </p>
          <div className="mt-8">
            <BookACallButton />
          </div>
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
        .gate5-prose ul, .gate5-prose ol { margin: 0 0 1.25rem; padding-left: 1.25rem; }
        .gate5-prose ul { list-style: disc; }
        .gate5-prose ol { list-style: decimal; }
        .gate5-prose li { margin: 0.35rem 0; }
        .gate5-prose a { color: #E6236D; text-decoration: underline; }
        .gate5-prose a:hover { color: #11104C; }
      `}</style>
      </section>
    </>
  );
}

/** Plain-text FAQ answers for FAQPage JSON-LD (must match visible copy). */
export function gate5ServiceFaqJsonLdItems(
  page: Gate5ServicePageData,
): Array<{ question: string; answer: string }> {
  return page.faqs.map(({ question, answer }) => ({
    question,
    answer: stripHtml(answer),
  }));
}
