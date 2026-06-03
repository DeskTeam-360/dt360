import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { aboutTimeline } from "@/data/about";
import { AboutAssetImage } from "./AboutAssetImage";

export function AboutStoryTimeline() {
  const [mistake, parkingLot, millionDollar] = aboutTimeline;

  return (
    <section className="relative z-10 bg-white pt-16 lg:pt-32">
      <Container className="relative z-10 max-w-[1440px] px-6 pb-24 md:pb-50 min-[2560px]:pb-52 min-[4000px]:pb-64 lg:px-20">
        {/* Step 1: The $5,000 Mistake */}
        <div className="flex gap-6 lg:gap-12">
          <div className="flex w-[80px] shrink-0 flex-col items-center pt-2 lg:w-[100px]">
            <div className="relative z-10 flex h-[100px] w-[100px] shrink-0 items-center justify-center lg:h-[120px] lg:w-[120px]">
              <SafeImage
                src="/images/about-dollar-icon.png"
                alt="Dollar Icon"
                width={120}
                height={120}
                optimized
                sizes="120px"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div
              className="my-2 w-[4px] flex-1 bg-gradient-to-b from-[#7CC2F9] to-[#DE55AB] lg:w-[6px]"
              style={{
                WebkitMaskImage:
                  "repeating-linear-gradient(to bottom, black 0, black 12px, transparent 12px, transparent 24px)",
                maskImage:
                  "repeating-linear-gradient(to bottom, black 0, black 12px, transparent 12px, transparent 24px)",
              }}
            />
          </div>

          <article className="grid flex-1 items-start gap-10 pb-20 lg:grid-cols-[1fr_0.9fr] lg:items-stretch">
            <div className="pt-2">
              <h2 className="font-[var(--font-poppins)] leading-tight text-[#11104c] lg:leading-[1.15]">
                {mistake.title}
              </h2>
              <div className="mt-8 space-y-6 font-[var(--font-montserrat)] text-[15px] font-semibold leading-[30px] text-black/80 lg:text-[16px]">
                {mistake.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="relative h-[400px] w-full justify-self-end overflow-hidden rounded-[20px] border-[7px] border-white bg-white shadow-[0px_40px_50px_0px_rgba(17,16,76,0.15)] md:-mr-[100px] md:h-[900px] md:min-h-[900px] md:w-[120%] md:rounded-l-[30px] md:rounded-r-none lg:h-full lg:min-h-0 lg:self-stretch">
              <AboutAssetImage
                src={mistake.image}
                alt={mistake.imageAlt}
                className="h-full w-full border-none bg-white"
                rounded="rounded-none border-none"
                objectPositionClass="object-[center_top]"
                imageClassName="origin-[center_top] scale-[1.22]"
              />
            </div>
          </article>
        </div>

        {/* Step 2: The Parking Lot Moment */}
        <div className="flex gap-6 lg:gap-12">
          <div className="flex w-[80px] shrink-0 flex-col items-center pt-2 lg:w-[100px]">
            <div className="relative z-10 flex h-[100px] w-[100px] shrink-0 items-center justify-center lg:h-[120px] lg:w-[120px]">
              <SafeImage
                src="/images/about-car-icon.png"
                alt="Car Icon"
                width={120}
                height={120}
                optimized
                sizes="120px"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div
              className="my-2 w-[4px] flex-1 bg-gradient-to-b from-[#DE55AB] to-[#E3058D] lg:w-[6px]"
              style={{
                WebkitMaskImage:
                  "repeating-linear-gradient(to bottom, black 0, black 12px, transparent 12px, transparent 24px)",
                maskImage:
                  "repeating-linear-gradient(to bottom, black 0, black 12px, transparent 12px, transparent 24px)",
              }}
            />
          </div>

          <article className="grid flex-1 items-start gap-10 pb-20 lg:grid-cols-[1fr_0.9fr] lg:items-stretch">
            <div className="pt-2">
              <h2 className="font-[var(--font-poppins)] leading-tight text-[#11104c] lg:leading-[1.15]">
                {parkingLot.title}
              </h2>
              <div className="mt-8 space-y-6 font-[var(--font-montserrat)] text-[15px] font-semibold leading-[30px] text-black/80 lg:text-[16px]">
                {parkingLot.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="relative h-[400px] w-full justify-self-end overflow-hidden rounded-[20px] border-[7px] border-white bg-white shadow-[0px_40px_50px_0px_rgba(17,16,76,0.15)] md:-mr-[100px] md:h-[900px] md:min-h-[900px] md:w-[120%] md:rounded-l-[30px] md:rounded-r-none lg:h-full lg:min-h-[700px] lg:self-stretch">
              <AboutAssetImage
                src={parkingLot.image}
                alt={parkingLot.imageAlt}
                className="h-full w-full border-none bg-white"
                rounded="rounded-none border-none"
                objectPositionClass="object-[center_top]"
                imageClassName="origin-[center_top] scale-[1.28]"
              />
            </div>
          </article>
        </div>

        {/* Step 3: The Million Dollar Education */}
        <div className="flex gap-6 lg:gap-12">
          <div className="flex w-[80px] shrink-0 flex-col items-center pt-2 lg:w-[100px]">
            <div className="relative z-10 flex h-[100px] w-[100px] shrink-0 items-center justify-center lg:h-[120px] lg:w-[120px]">
              <SafeImage
                src="/images/about-book-icon.png"
                alt="Book Icon"
                width={120}
                height={120}
                optimized
                sizes="120px"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          <article className="flex-1 pb-10 pt-2 lg:pt-4">
            <h2 className="font-[var(--font-poppins)] leading-tight text-[#11104c] lg:leading-[1.15]">
              {millionDollar.title}
            </h2>
            <div className="mt-8 space-y-6 font-[var(--font-montserrat)] text-[15px] font-semibold leading-[30px] text-black/80 lg:text-[16px]">
              {millionDollar.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>

        <div className="relative z-30 mx-auto mt-2 max-w-[1100px] px-4 min-[2560px]:mb-40 min-[4000px]:mb-[calc(var(--spacing)*100)] lg:mt-4">
          <div className="pointer-events-none absolute left-[-10%] top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-[#7CC2F9]/20 blur-[80px]" />
          <div className="pointer-events-none absolute right-[-10%] top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-[#DE55AB]/20 blur-[80px]" />

          <div className="relative z-10 grid items-end gap-8 md:grid-cols-3">
            <div className="group relative flex h-[240px] flex-col items-center justify-center rounded-tl-[60px] rounded-br-[60px] border-[1.5px] border-[#DE55AB]/30 bg-white shadow-[0px_25px_50px_rgba(17,16,76,0.08)] transition-transform hover:-translate-y-2 lg:h-[300px]">
              <SafeImage
                src="/images/about/6c0e2750d4910d76bda7c662965894c3b4296a18.png"
                alt="Upwork"
                width={160}
                height={80}
                optimized
                sizes="(max-width: 1023px) 130px, 160px"
                className="w-[130px] object-contain opacity-90 transition-opacity group-hover:opacity-100 lg:w-[160px]"
              />
              <div className="absolute -bottom-6 left-1/2 flex h-[45px] w-[45px] -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-white bg-[#FF4B4B] text-white shadow-[0_10px_20px_rgba(255,75,75,0.3)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </div>
            </div>

            <div className="group relative flex h-[240px] flex-col items-center justify-center rounded-tl-[60px] rounded-br-[60px] border-[1.5px] border-[#7CC2F9]/40 bg-white shadow-[0px_25px_50px_rgba(17,16,76,0.08)] transition-transform hover:-translate-y-2 lg:h-[300px]">
              <SafeImage
                src="/images/about/f8f89cc0d927e6b88660ea2be132630362469cdf.png"
                alt="Fiverr"
                width={160}
                height={80}
                optimized
                sizes="(max-width: 1023px) 130px, 160px"
                className="w-[130px] object-contain opacity-90 transition-opacity group-hover:opacity-100 lg:w-[160px]"
              />
              <div className="absolute -bottom-6 left-1/2 flex h-[45px] w-[45px] -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-white bg-[#FF4B4B] text-white shadow-[0_10px_20px_rgba(255,75,75,0.3)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </div>
            </div>

            <div className="group relative flex h-[260px] flex-col items-center justify-center rounded-tr-[80px] rounded-bl-[80px] border-none bg-gradient-to-br from-[#E3058D] to-[#6A12AA] shadow-[0px_35px_60px_rgba(106,18,170,0.3)] transition-transform hover:-translate-y-2 lg:h-[340px]">
              <SafeImage
                src="/images/logo-white.png"
                alt="DeskTeam360"
                width={220}
                height={60}
                optimized
                sizes="(max-width: 1023px) 160px, 220px"
                className="w-[160px] object-contain drop-shadow-xl lg:w-[220px]"
              />
              <div className="absolute bottom-[20%] left-1/2 flex h-[50px] w-[50px] -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-white/20 bg-[#6FBC66] text-white shadow-[0_12px_25px_rgba(111,188,102,0.4)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="pointer-events-none absolute bottom-[-2px] left-0 z-20 w-full overflow-hidden leading-[0]">
        <div className="relative min-h-[50px] w-full lg:min-h-[100px]">
          <SafeImage
            src="/images/about-section-separator.png"
            alt=""
            fill
            optimized
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>
      </div>
    </section>
  );
}
