import { Container } from "@/components/shared/Container";
import { careersWhyUs } from "@/data/careers";

function CardIcon({ type }: { type: "users" | "shield" | "chart" }) {
  if (type === "users") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "shield") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M3 3v18h18" strokeLinecap="round" />
      <path d="m7 14 4-4 4 3 5-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CareersWhyUs() {
  const d = careersWhyUs;

  return (
    <section className="relative overflow-hidden bg-[#02063B] py-16 text-white sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(227,5,141,0.4),transparent_40%),radial-gradient(circle_at_90%_80%,rgba(99,102,241,0.35),transparent_42%)]"
        aria-hidden
      />
      <Container className="relative z-10 max-w-[1440px] !px-6 lg:!px-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-[var(--font-montserrat)] text-[13px] font-bold uppercase tracking-[0.14em] text-[#E3058D]">
            {d.eyebrow}
          </p>
          <h2 className="mt-3 font-[var(--font-poppins)] text-[36px] font-semibold leading-[1.15] sm:text-[48px] lg:text-[56px]">
            {d.titleBefore}
            <span className="text-[#E3058D]">{d.titleAccent}</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {d.cards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-white/10 bg-[#11104C]/70 p-8 shadow-[0_20px_40px_rgba(0,0,0,0.25)] backdrop-blur-sm"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E3058D]/15 text-[#E3058D]">
                <CardIcon type={card.icon} />
              </div>
              <h3 className="font-[var(--font-montserrat)] text-[20px] font-bold leading-snug text-white">
                {card.title}
              </h3>
              <p className="mt-3 font-[var(--font-montserrat)] text-[16px] font-medium leading-[1.7] text-white/75">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
