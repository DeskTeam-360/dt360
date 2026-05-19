import { Container } from "@/components/shared/Container";
import { howItWorksDontSection } from "@/data/howItWorks";
import { HowItWorksDontCards } from "@/components/pages/how-it-works/HowItWorksDontCards";

export function HowItWorksDontDo() {
  const { kicker, titleBefore, titleHighlight, titleAfter, intro, items, bannerTextAccent, bannerTextRest } =
    howItWorksDontSection;

  return (
    <section
      className="relative z-10 isolate bg-transparent pb-0 -mt-[160px]"
      aria-labelledby="how-it-works-dont-heading"
    >
      <div
        className="relative -mt-[2.5rem] overflow-hidden bg-gradient-to-b from-[#231d62] via-[#181547] to-[#0f0c32] pt-14 shadow-[0_-12px_40px_-28px_rgba(15,12,42,0.35)] sm:-mt-[2.5rem] sm:pt-[3.25rem] md:-mt-[3.75rem] md:pt-[3.75rem] lg:-mt-16 lg:pt-20"
        style={{
          borderTopLeftRadius: "100% 20rem",
          borderTopRightRadius: "100% 20rem",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(129,106,246,0.22)_0%,transparent_55%),radial-gradient(ellipse_50%_40%_at_100%_70%,rgba(236,72,153,0.12)_0%,transparent_50%)]"
          aria-hidden
        />

        <Container className="relative z-[1] max-w-[1440px] px-5 pb-12 text-center md:px-10 lg:pb-14 lg:px-10">
          <p className="type-rule-h4 font-bold tracking-wide text-[#F8673E]">{kicker}</p>
          <h2
            id="how-it-works-dont-heading"
            className="type-rule-h2 mx-auto mt-4 w-full max-w-full tracking-tight text-white md:w-[80%] lg:w-[50%]"
          >
            {titleBefore}
            <span className="text-[#ee3eb8]">{titleHighlight}</span>
            {titleAfter}
          </h2>
          <p className="type-rule-p mx-auto mt-6 max-w-3xl text-white/92">{intro}</p>

          <HowItWorksDontCards items={items} />
        </Container>

        <div
          className="relative z-[1] mt-10 border-t border-white/20 bg-[linear-gradient(45deg,#4F0FB3_0%,#A4199A_65%,#D21E8C_84%,#F7515D_100%)] px-4 py-8 sm:mt-14 sm:px-8 lg:py-10"
          aria-label={`${bannerTextAccent}${bannerTextRest}`}
        >
          <p className="mx-auto max-w-[1100px] text-center text-[26px] font-semibold leading-[1.5]">
            <span className="text-[#F5B419]">{bannerTextAccent}</span>
            <span className="text-white">{bannerTextRest}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
