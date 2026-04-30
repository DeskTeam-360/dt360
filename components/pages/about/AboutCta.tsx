import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { aboutCta } from "@/data/about";

export function AboutCta() {
  return (
    <section className="bg-gradient-to-br from-[#f8f0ff] via-[#e8e4ff] to-[#e4e1ff] pt-16 lg:pt-20 pb-0 relative">
      {/* Background Blobs */}
      <div className="absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(215,188,255,0.4)_0%,transparent_60%)] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[40%] left-[80%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(200,225,255,0.5)_0%,transparent_70%)] rounded-full pointer-events-none z-0" />

      <Container className="max-w-[1440px] px-6 lg:px-20 relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          
          <div className="pt-10 pb-10 lg:pb-20">
            <h2 className="text-4xl font-[var(--font-poppins)] font-bold leading-[1.2] text-[#11104C] sm:text-5xl lg:text-[54px] lg:leading-[64px]">
              <span className="text-[#E3058D]">{aboutCta.titleLead}</span>
              {aboutCta.titleTail}
            </h2>
            <p className="mt-6 max-w-[650px] font-[var(--font-montserrat)] text-[16px] lg:text-[18px] leading-[28px] lg:leading-[32px] text-[#11104C]/80 font-medium">
              {aboutCta.desc}
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/book-a-call"
                className="group flex w-full sm:w-auto items-center justify-center gap-3 rounded-[12px] bg-[#F0573A] px-6 py-4 text-[16px] font-[var(--font-poppins)] font-bold text-white transition hover:brightness-110 shadow-[0_15px_30px_rgba(240,87,58,0.25)] hover:-translate-y-1"
              >
                Book a Free Strategy Call
                <span className="flex h-6 w-6 items-center justify-center rounded-full border-[1.5px] border-white text-white group-hover:bg-white group-hover:text-[#F0573A] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </span>
              </Link>
              
              <Link
                href="/how-it-works"
                className="group flex w-full sm:w-auto items-center justify-center gap-3 rounded-[12px] bg-[#7547C5] px-6 py-4 text-[16px] font-[var(--font-poppins)] font-bold text-white transition hover:brightness-110 shadow-[0_15px_30px_rgba(117,71,197,0.25)] hover:-translate-y-1"
              >
                See How It Works
                <span className="flex h-6 w-6 items-center justify-center rounded-full border-[1.5px] border-white text-white group-hover:bg-white group-hover:text-[#7547C5] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </span>
              </Link>
            </div>
            
            <p className="mt-8 font-[var(--font-montserrat)] text-[14px] leading-[24px] italic text-[#11104C]/70 font-semibold">
              {aboutCta.note}
            </p>
          </div>
          
          <div className="relative hidden lg:block h-full">
            {/* The image that sticks out */}
            <div className="absolute bottom-0 right-0 w-[120%] h-[135%] z-20 pointer-events-none flex items-end justify-end">
              <SafeImage
                src="/images/about-jeremy-notebook.png"
                alt="Jeremy"
                width={800}
                height={1000}
                className="w-full h-full object-contain object-bottom"
              />
            </div>
          </div>
        </div>
        
        {/* Mobile image fallback */}
        <div className="block lg:hidden mt-10 relative h-[400px]">
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] z-20 pointer-events-none flex items-end justify-center">
             <SafeImage
                src="/images/about-jeremy-notebook.png"
                alt="Jeremy"
                width={600}
                height={800}
                className="w-full h-full object-contain object-bottom"
              />
           </div>
        </div>
      </Container>
    </section>
  );
}
