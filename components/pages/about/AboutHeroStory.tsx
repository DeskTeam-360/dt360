import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { aboutHero } from "@/data/about";

export function AboutHeroStory() {
  return (
    <section className="relative overflow-hidden bg-[#11104C] pt-14 text-white lg:pt-24 lg:pb-0">
      {/* Exact overlapping background gradients */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[-20%] w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_center,rgba(0,200,244,0.4)_0%,transparent_50%)] mix-blend-screen blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_center,rgba(227,5,141,0.5)_0%,transparent_50%)] mix-blend-screen blur-[100px]" />
      </div>
      
      {/* Container z-[10] so everything inside it sits above the background wave z-[3] */}
      <Container className="relative z-[10] max-w-[1440px] px-6 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="pb-10 lg:pb-[140px] w-full max-w-[791px]">
            <h1 className="text-3xl font-[var(--font-poppins)] font-bold sm:text-4xl lg:text-[50px] lg:leading-[64px] text-white max-w-[600px]">
              {aboutHero.title}
            </h1>
            <div className="mt-6 max-w-[643px] font-[var(--font-montserrat)] font-semibold text-[16px] leading-[30px] text-white/90">
              <p className="mb-4">{aboutHero.intro}</p>
              <p>{aboutHero.introSecond}</p>
            </div>
            <p className="mt-8 font-[var(--font-poppins)] font-semibold italic text-[20px] leading-[40px] text-white">
              {aboutHero.founder}
            </p>
          </div>
          {/* Image wrapper */}
          <div className="relative h-[400px] lg:h-[650px] lg:-mr-[100px] w-full flex justify-end items-end">
            <SafeImage
              src="/images/about-ceo-hero-image.png"
              alt="Jeremy Kenerson portrait"
              width={492}
              height={733}
              priority
              className="object-contain object-bottom h-full w-auto"
            />
            {/* Professional Team icon at bottom left of CEO image (Shrunken & Shifted Left) */}
            <div className="absolute left-[-25%] lg:left-[-15%] bottom-[5%] lg:bottom-[10%] z-20 w-[60px] lg:w-[75px] -translate-y-[20px]">
               <SafeImage
                src="/images/about-icon-professional-team.png"
                alt="Professional Team Icon"
                width={75}
                height={75}
                className="object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* The Gradient Wave (z-[3] so it is behind the z-[10] hero container) */}
      <div className="pointer-events-none absolute bottom-[-1px] z-[3] h-[100px] sm:h-[150px] lg:h-[225px] w-full">
        <svg
          viewBox="0 0 1486 225"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="about-hero-curve" x1="202" y1="331" x2="878.181" y2="-358.67" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#4F0FB3" />
              <stop offset="0.649038" stopColor="#A4199A" />
              <stop offset="0.841346" stopColor="#D21E8C" />
              <stop offset="1" stopColor="#F7515D" />
            </linearGradient>
          </defs>
          <path
            d="M0 181.001C569.736 168.367 894.145 34.775 1486 0V225L0 225V181.001Z"
            fill="url(#about-hero-curve)"
          />
        </svg>
      </div>
    </section>
  );
}
