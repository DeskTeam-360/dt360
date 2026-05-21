import { Container } from "@/components/shared/Container";
import { contactHero } from "@/data/contact";

/**
 * Contact hero — placeholder layout until final design is confirmed.
 * Additional sections (form, office hours, etc.) will be added below.
 */
export function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-[#11104C] pt-28 text-white sm:pt-32 lg:pt-[120px]">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-[5%] left-[-15%] h-[min(900px,80vw)] w-[min(900px,80vw)] bg-[radial-gradient(circle_at_center,rgba(0,200,244,0.35)_0%,transparent_55%)] blur-3xl" />
        <div className="absolute right-[-10%] bottom-[-5%] h-[min(800px,70vw)] w-[min(800px,70vw)] bg-[radial-gradient(circle_at_center,rgba(227,5,141,0.4)_0%,transparent_55%)] blur-3xl" />
      </div>

      <Container className="relative z-10 max-w-[1440px] px-6 pb-16 lg:px-20 lg:pb-20">
        <p className="font-[var(--font-montserrat)] text-sm font-semibold uppercase tracking-wide text-white/70">
          {contactHero.eyebrow}
        </p>
        <h1 className="type-rule-h1 mt-3 max-w-[900px] text-balance text-white">
          {contactHero.title}
        </h1>
        <p className="type-rule-p mt-6 max-w-[720px] text-pretty text-white/85">
          {contactHero.description}
        </p>
      </Container>

      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden
      />
    </section>
  );
}
