import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { contactAssets, contactIntro, contactOrnamentStyles } from "@/data/contact";
import { ContactForm } from "./ContactForm";
import { ContactOfficeHours } from "./ContactOfficeHours";

export function ContactMain() {
  const { line1, line2 } = contactIntro;

  return (
    <section className="relative overflow-x-hidden bg-white pb-16 pt-10 lg:pb-24 lg:pt-14" aria-label="Contact form and office hours">
      <div
        className="pointer-events-none absolute z-0 h-[min(900px,95vw)] w-[min(900px,80vw)] rounded-full opacity-80"
        style={{
          top: "-5%",
          right: "-10%",
          background:
            "radial-gradient(circle, rgba(227,5,141,0.28) 0%, rgba(227,5,141,0.1) 45%, transparent 70%)",
        }}
        aria-hidden
      />

      <Container className="relative z-10 max-w-[1440px] px-6 lg:px-20">
        <div className="relative mx-auto max-w-[1100px] overflow-visible text-center">
          <SafeImage
            src={contactAssets.ornament}
            alt=""
            width={360}
            height={480}
            className={contactOrnamentStyles.intro}
            sizes="(max-width: 1024px) 32vw, 360px"
            aria-hidden
          />
          <p className="relative z-10 font-[var(--font-poppins)] text-[28px] font-semibold leading-[1.35] text-balance text-[#11104C] sm:text-[32px] lg:text-[36px]">
            {line1}
          </p>
          <p className="relative z-10 mt-3 font-[var(--font-poppins)] text-[28px] font-semibold leading-[1.35] text-balance text-[#11104C] sm:text-[32px] lg:text-[36px]">
            {line2}
          </p>
        </div>

        <div className="mt-12 grid items-center justify-items-center gap-10 md:justify-items-center lg:mt-16 lg:grid-cols-2 lg:justify-items-stretch lg:gap-14 xl:gap-16">
          <div className="relative grid w-full max-w-[560px] justify-items-center lg:max-w-none lg:justify-items-start">
            <div
              className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[min(720px,95vw)] w-[min(720px,95vw)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,200,244,0.35) 0%, rgba(0,200,244,0.12) 45%, transparent 70%)",
              }}
              aria-hidden
            />
            <SafeImage
              src={contactAssets.formIllustration}
              alt="Team member at desk with headset and support icons"
              width={560}
              height={520}
              className="relative z-10 h-auto w-full max-w-[480px] object-contain lg:max-w-[560px]"
              sizes="(max-width: 1024px) 90vw, 560px"
            />
          </div>
          <div className="flex justify-center lg:justify-end">
            <ContactForm />
          </div>
        </div>

        <div className="relative mx-auto mt-12 max-w-[1000px] overflow-visible md:mt-16 lg:mt-[10em]">
          <SafeImage
            src={contactAssets.ornament}
            alt=""
            width={360}
            height={480}
            className={contactOrnamentStyles.officeHoursCard}
            sizes="(max-width: 1024px) 32vw, 360px"
            aria-hidden
          />
          <ContactOfficeHours />
        </div>
      </Container>
    </section>
  );
}
