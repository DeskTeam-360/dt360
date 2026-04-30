import { Container } from "@/components/shared/Container";
import { teamDifferencePoints } from "@/data/about";
import { AboutAssetImage } from "./AboutAssetImage";

export function AboutTeamDifference() {
  return (
    <section className="bg-[#f7f7f7] py-16 lg:py-32">
      <Container className="max-w-[1440px] px-6 lg:px-20">
        <div className="grid gap-12 lg:gap-24 lg:grid-cols-[0.9fr_1.1fr] items-center">
          <div className="relative">
            {/* The decorative circle */}
            <div className="absolute -left-[10%] -top-[10%] w-[350px] h-[350px] rounded-full border-[2px] border-dashed border-[#DE55AB]/40 z-0 hidden lg:block animate-spin-slow" style={{ animationDuration: '30s' }} />
            <div className="relative z-10 p-6 lg:p-0">
              <AboutAssetImage
                src="/images/about/3137b12c2147fe19a4be206aa7b0e996970aff6a.png"
                alt="Team difference"
                className="min-h-[400px] lg:min-h-[550px] border-[8px] border-white shadow-[0_30px_60px_-15px_rgba(17,16,76,0.2)] bg-[#f7f7f7]"
                rounded="rounded-[40px] lg:rounded-tr-[80px] lg:rounded-bl-[80px] lg:rounded-tl-none lg:rounded-br-none"
              />
            </div>
          </div>
          <div className="lg:pl-8">
            <h2 className="text-4xl font-[var(--font-poppins)] font-bold leading-tight text-[#11104C] sm:text-5xl lg:text-[64px] lg:leading-[80px]">
              What Makes The Team Different
            </h2>
            <ul className="mt-12 space-y-6">
              {teamDifferencePoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-5 text-[16px] lg:text-[18px] font-[var(--font-montserrat)] font-medium leading-[32px] text-[#0e0e0e]"
                >
                  <span className="flex-shrink-0 mt-1 w-[32px] h-[32px] rounded-full bg-gradient-to-br from-[#6FBC66] to-[#4A9342] text-white flex items-center justify-center text-sm font-bold shadow-md border-2 border-white/50">
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
