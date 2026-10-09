import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { ServiceSafeImage } from "@/components/pages/service/shared/ServiceSafeImage";
import { sitePaths } from "@/config/urls";
import type { Gate5HeroArt } from "@/data/gate5HeroArt";

type Gate5DarkHeroProps = {
  h1: string;
  /** Short supporting line under the H1 (usually meta description). */
  lead: string;
  art: Gate5HeroArt;
};

/**
 * Compact dark hero for Gate 5 pages — keeps F11/S8 copy below,
 * restores brand visual + readable white nav like other service pages.
 */
export function Gate5DarkHero({ h1, lead, art }: Gate5DarkHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(#02063B_0%,#02063B_55%,#E6236D_100%)] pb-12 pt-32 text-white sm:pb-14 xl:pb-16 xl:pt-40">
      <ServiceSafeImage
        src="/images/Service - Ellipse Red.png"
        alt=""
        width={380}
        height={380}
        className="pointer-events-none absolute -right-12 -top-12 z-[1] h-auto w-[230px] opacity-90 sm:w-[300px] xl:w-[360px]"
        aria-hidden
      />
      <ServiceSafeImage
        src="/images/Service - Ellipse Blue.png"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute -left-24 top-[calc(var(--spacing)*30)] z-[5] h-auto w-[260px] opacity-90 sm:w-[320px] xl:w-[390px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(220,56,255,0.32),transparent_40%),radial-gradient(circle_at_0%_100%,rgba(61,43,190,0.45),transparent_48%)]"
        aria-hidden
      />

      <Container className="relative z-10 max-w-[1440px] !px-10 xl:!px-20">
        <div className="grid items-center gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(280px,1fr)] xl:gap-12 2xl:gap-16">
          <div className="w-full min-w-0">
            <h1 className="font-[var(--font-poppins)] text-[36px] font-bold leading-[1.1] tracking-tight text-white md:text-[48px] lg:text-[56px]">
              {h1}
            </h1>
            <p className="mt-5 max-w-xl font-[var(--font-montserrat)] text-[18px] font-medium leading-[1.7] text-white/85">
              {lead}
            </p>
            <div className="mt-8">
              <Link
                href={sitePaths.bookACall}
                className="font-nav-primary inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#e4277a] to-[#c41e6a] px-6 py-3.5 text-white shadow-lg transition hover:brightness-110"
              >
                Book a Call
              </Link>
            </div>
          </div>

          <div className="relative isolate mx-auto w-full min-w-0 max-w-[640px] xl:justify-self-center">
            <div
              className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-[radial-gradient(circle,rgba(251,98,183,0.45)_0%,rgba(71,56,206,0.15)_55%,transparent_75%)] blur-2xl"
              aria-hidden
            />
            <ServiceSafeImage
              src={art.src}
              alt={art.alt}
              width={820}
              height={620}
              priority
              sizes="(max-width: 1279px) 100vw, 640px"
              className="relative z-10 h-auto w-full drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
