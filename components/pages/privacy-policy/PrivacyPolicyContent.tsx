import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { privacyPolicyMeta, privacyPolicySections } from "@/data/privacyPolicy";

export function PrivacyPolicyContent() {
  return (
    <>
      <section className="bg-[#11104C] pt-28 text-white sm:pt-32 lg:pt-[120px]">
        <Container className="max-w-[1440px] px-6 pb-12 lg:px-20 lg:pb-16">
          <p className="font-[var(--font-montserrat)] text-sm font-semibold uppercase tracking-wide text-white/70">
            Legal
          </p>
          <h1 className="type-rule-h1 mt-3 text-balance text-white">
            {privacyPolicyMeta.title}
          </h1>
          <p className="type-rule-p mt-6 max-w-[720px] text-pretty text-white/85">
            {privacyPolicyMeta.intro}
          </p>
          <p className="mt-4 font-[var(--font-montserrat)] text-sm font-semibold text-white/60">
            Last updated: {privacyPolicyMeta.lastUpdated}
          </p>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <Container className="max-w-[1440px] px-6 lg:px-20">
          <nav
            aria-label="Privacy policy sections"
            className="mb-10 rounded-2xl border border-[#11104C]/10 bg-[#f8f8fc] p-6 lg:mb-14"
          >
            <p className="font-[var(--font-montserrat)] text-sm font-bold uppercase tracking-wide text-[#11104C]">
              On this page
            </p>
            <ol className="mt-4 columns-1 gap-x-8 space-y-2 font-[var(--font-montserrat)] text-[15px] font-medium text-[#11104C]/80 sm:columns-2">
              {privacyPolicySections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="transition hover:text-[#E3058D]"
                  >
                    {index + 1}. {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mx-auto max-w-[800px] space-y-12">
            {privacyPolicySections.map((section) => (
              <article key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="type-rule-h4 text-[#11104C]">{section.title}</h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="type-rule-p text-pretty text-[#11104C]/90"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.listItems && section.listItems.length > 0 ? (
                  <ul className="type-rule-p mt-4 list-disc space-y-2 pl-6 text-[#11104C]/90">
                    {section.listItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>

          <p className="type-rule-p mx-auto mt-14 max-w-[800px] border-t border-[#11104C]/10 pt-8 text-center text-[#11104C]/70">
            Questions?{" "}
            <Link
              href="https://deskteam360.com/book-a-call/"
              className="font-semibold text-[#E3058D] underline-offset-2 hover:underline"
            >
              Book a call
            </Link>{" "}
            or email{" "}
            <a
              href="mailto:privacy@deskteam360.com"
              className="font-semibold text-[#E3058D] underline-offset-2 hover:underline"
            >
              privacy@deskteam360.com
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
