import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { aboutCta } from "@/data/about";
import { AboutAssetImage } from "./AboutAssetImage";

export function AboutCta() {
  return (
    <section className="bg-[linear-gradient(186deg,white_0%,#C2CAFF_100%)] py-20 lg:py-32 overflow-hidden relative">
      <div className="absolute top-[30%] left-[5%] w-[800px] h-[800px] bg-gradient-to-tr from-white/40 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <Container className="max-w-[1440px] px-6 lg:px-20 relative z-10">
        <div className="grid gap-12 lg:gap-20 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <h2 className="text-4xl font-[var(--font-poppins)] font-bold leading-[50px] text-[#11104C] sm:text-5xl lg:text-[64px] lg:leading-[70px]">
              <span className="text-[#E3058D]">{aboutCta.titleLead}</span>
              {aboutCta.titleTail}
            </h2>
            <p className="mt-8 max-w-[741px] font-[var(--font-montserrat)] text-[18px] lg:text-[20px] leading-[30px] lg:leading-[36px] text-[#11104C] font-medium">
              {aboutCta.desc}
            </p>
            <div className="mt-12 flex flex-wrap gap-6">
              <Link
                href="/book-a-call"
                className="inline-flex items-center justify-center rounded-[20px] bg-[#F0573A] px-10 py-5 text-[18px] font-[var(--font-poppins)] font-bold text-white transition hover:brightness-110 shadow-[0_20px_40px_rgba(240,87,58,0.3)] hover:-translate-y-1"
              >
                Book a Free Strategy Call
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-[20px] bg-[#7547C5] px-10 py-5 text-[18px] font-[var(--font-poppins)] font-bold text-white transition hover:brightness-110 shadow-[0_20px_40px_rgba(117,71,197,0.3)] hover:-translate-y-1"
              >
                See How It Works
              </Link>
            </div>
            <p className="mt-10 font-[var(--font-montserrat)] text-[16px] leading-[30px] italic text-[#11104C] font-semibold">
              {aboutCta.note}
            </p>
          </div>
          <div className="relative">
            <AboutAssetImage
              src="/images/about/3e802bd3b9831b9414c6a8df2026115f8bfd6bd5.png"
              alt="CTA founder image"
              className="min-h-[400px] lg:min-h-[650px] border-[8px] border-white shadow-[0_40px_80px_rgba(17,16,76,0.15)] bg-white object-cover"
              rounded="rounded-[40px] lg:rounded-bl-[100px] lg:rounded-tr-[100px] lg:rounded-tl-none lg:rounded-br-none"
            />
            {/* Background decoration matching the rotated image from design */}
            <div className="absolute -z-10 -right-20 -bottom-20 w-[600px] h-[600px] bg-gradient-to-tr from-white/30 to-transparent rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </Container>
    </section>
  );
}
