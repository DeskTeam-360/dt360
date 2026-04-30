import { Container } from "@/components/shared/Container";
import { aboutTimeline } from "@/data/about";
import { AboutAssetImage } from "./AboutAssetImage";

export function AboutStoryTimeline() {
  const [mistake, parkingLot, millionDollar] = aboutTimeline;

  return (
    <section className="bg-white pt-16 lg:pt-32 relative z-10">
      <Container className="max-w-[1440px] px-6 lg:px-20 relative z-10 pb-64 lg:pb-80">
        
        {/* Step 1: The $5,000 Mistake */}
        <div className="flex gap-6 lg:gap-12">
          {/* Timeline Track */}
          <div className="flex flex-col items-center shrink-0 w-[80px] lg:w-[100px] pt-2">
            {/* Image Icon 1 */}
            <div className="w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] shrink-0 relative z-10 flex items-center justify-center">
              <img src="/images/about-dollar-icon.png" alt="Dollar Icon" className="max-w-full max-h-full object-contain" />
            </div>
            {/* Dashed Gradient Line 1 (using CSS mask for perfect dashes) */}
            <div 
              className="w-[4px] lg:w-[6px] flex-1 my-2 bg-gradient-to-b from-[#7CC2F9] to-[#DE55AB]"
              style={{ WebkitMaskImage: 'repeating-linear-gradient(to bottom, black 0, black 12px, transparent 12px, transparent 24px)', maskImage: 'repeating-linear-gradient(to bottom, black 0, black 12px, transparent 12px, transparent 24px)' }}
            />
          </div>

          {/* Content */}
          <article className="flex-1 grid gap-10 lg:grid-cols-[1fr_0.9fr] items-start pb-20">
            <div className="pt-2">
              <h2 className="text-3xl font-[var(--font-poppins)] font-bold leading-tight text-[#11104c] sm:text-4xl lg:text-[50px] lg:leading-[60px]">
                {mistake.title}
              </h2>
              <div className="mt-8 space-y-6 font-[var(--font-montserrat)] text-[15px] lg:text-[16px] font-semibold leading-[30px] text-black/80">
                {mistake.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="relative w-[110%] lg:w-[120%] h-[400px] lg:h-[650px] lg:-mr-[100px] justify-self-end rounded-[20px] lg:rounded-l-[30px] lg:rounded-r-none border-[7px] border-white shadow-[0px_40px_50px_0px_rgba(17,16,76,0.15)] overflow-hidden bg-white">
               <AboutAssetImage 
                 src={mistake.image} 
                 alt={mistake.imageAlt} 
                 className="h-full w-full" 
                 rounded="rounded-none border-none"
                 objectPositionClass="object-[center_-20px]"
               />
            </div>
          </article>
        </div>

        {/* Step 2: The Parking Lot Moment */}
        <div className="flex gap-6 lg:gap-12">
          {/* Timeline Track */}
          <div className="flex flex-col items-center shrink-0 w-[80px] lg:w-[100px] pt-2">
            {/* Image Icon 2 */}
            <div className="w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] shrink-0 relative z-10 flex items-center justify-center">
              <img src="/images/about-car-icon.png" alt="Car Icon" className="max-w-full max-h-full object-contain" />
            </div>
            {/* Dashed Gradient Line 2 (using CSS mask for perfect dashes) */}
            <div 
              className="w-[4px] lg:w-[6px] flex-1 my-2 bg-gradient-to-b from-[#DE55AB] to-[#E3058D]"
              style={{ WebkitMaskImage: 'repeating-linear-gradient(to bottom, black 0, black 12px, transparent 12px, transparent 24px)', maskImage: 'repeating-linear-gradient(to bottom, black 0, black 12px, transparent 12px, transparent 24px)' }}
            />
          </div>

          {/* Content */}
          <article className="flex-1 grid gap-10 lg:grid-cols-[1fr_0.9fr] items-start pb-20">
            <div className="pt-2">
              <h2 className="text-3xl font-[var(--font-poppins)] font-bold leading-tight text-[#11104c] sm:text-4xl lg:text-[50px] lg:leading-[60px]">
                {parkingLot.title}
              </h2>
              <div className="mt-8 space-y-6 font-[var(--font-montserrat)] text-[15px] lg:text-[16px] font-semibold leading-[30px] text-black/80">
                {parkingLot.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="relative w-[110%] lg:w-[120%] h-[400px] lg:h-[477px] lg:-mr-[100px] justify-self-end rounded-[20px] lg:rounded-l-[30px] lg:rounded-r-none border-[7px] border-white shadow-[0px_40px_50px_0px_rgba(17,16,76,0.15)] overflow-hidden bg-white">
               <AboutAssetImage src={parkingLot.image} alt={parkingLot.imageAlt} className="h-full w-full object-cover object-[0%_20%]" rounded="rounded-none border-none" />
            </div>
          </article>
        </div>

        {/* Step 3: The Million Dollar Education */}
        <div className="flex gap-6 lg:gap-12">
          {/* Timeline Track */}
          <div className="flex flex-col items-center shrink-0 w-[80px] lg:w-[100px] pt-2">
            {/* Image Icon 3 */}
            <div className="w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] shrink-0 relative z-10 flex items-center justify-center">
              <img src="/images/about-book-icon.png" alt="Book Icon" className="max-w-full max-h-full object-contain" />
            </div>
            {/* No line below the last icon */}
          </div>

          {/* Content */}
          <article className="flex-1 pb-10 pt-2 lg:pt-4">
            <h2 className="text-3xl font-[var(--font-poppins)] font-bold leading-tight text-[#11104c] sm:text-4xl lg:text-[50px] lg:leading-[60px]">
              {millionDollar.title}
            </h2>
            <div className="mt-8 space-y-6 font-[var(--font-montserrat)] text-[15px] lg:text-[16px] font-semibold leading-[30px] text-black/80">
              {millionDollar.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>

        {/* Upwork/Fiverr Comparison Block with high-fidelity styling */}
        <div className="relative mt-2 lg:mt-4 max-w-[1100px] mx-auto px-4">
          {/* Background Blur Blobs */}
          <div className="absolute top-1/2 left-[-10%] -translate-y-1/2 w-[300px] h-[300px] bg-[#7CC2F9]/20 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[300px] h-[300px] bg-[#DE55AB]/20 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 grid gap-8 md:grid-cols-3 items-end">
            {/* Upwork Block */}
            <div className="bg-white border-[1.5px] border-[#DE55AB]/30 h-[240px] lg:h-[300px] rounded-tl-[60px] rounded-br-[60px] flex flex-col items-center justify-center relative shadow-[0px_25px_50px_rgba(17,16,76,0.08)] group transition-transform hover:-translate-y-2">
              <img src="/images/about/6c0e2750d4910d76bda7c662965894c3b4296a18.png" alt="Upwork" className="w-[130px] lg:w-[160px] object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
              {/* Red X icon */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#FF4B4B] w-[45px] h-[45px] rounded-full flex items-center justify-center text-white shadow-[0_10px_20px_rgba(255,75,75,0.3)] border-[3px] border-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </div>
            </div>
            
            {/* Fiverr Block */}
            <div className="bg-white border-[1.5px] border-[#7CC2F9]/40 h-[240px] lg:h-[300px] rounded-tl-[60px] rounded-br-[60px] flex flex-col items-center justify-center relative shadow-[0px_25px_50px_rgba(17,16,76,0.08)] group transition-transform hover:-translate-y-2">
              <img src="/images/about/f8f89cc0d927e6b88660ea2be132630362469cdf.png" alt="Fiverr" className="w-[130px] lg:w-[160px] object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
              {/* Red X icon */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#FF4B4B] w-[45px] h-[45px] rounded-full flex items-center justify-center text-white shadow-[0_10px_20px_rgba(255,75,75,0.3)] border-[3px] border-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </div>
            </div>

            {/* DeskTeam360 Block */}
            <div className="bg-gradient-to-br from-[#E3058D] to-[#6A12AA] h-[260px] lg:h-[340px] rounded-tr-[80px] rounded-bl-[80px] flex flex-col items-center justify-center relative shadow-[0px_35px_60px_rgba(106,18,170,0.3)] border-none group transition-transform hover:-translate-y-2">
              <div className="flex flex-col items-center gap-4">
                <img src="/images/logo-white.png" alt="DeskTeam360" className="w-[160px] lg:w-[220px] object-contain drop-shadow-xl" />
              </div>
              {/* Green Check icon */}
              <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 bg-[#6FBC66] w-[50px] h-[50px] rounded-full flex items-center justify-center text-white shadow-[0_12px_25px_rgba(111,188,102,0.4)] border-[3px] border-white/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
            </div>
          </div>
        </div>

      </Container>

      {/* Section Separator Image */}
      <div className="pointer-events-none absolute bottom-[-2px] left-0 w-full z-20 overflow-hidden leading-[0]">
        <img 
          src="/images/about-section-separator.png" 
          alt="" 
          className="w-full h-auto min-h-[50px] lg:min-h-[100px] object-cover object-bottom" 
        />
      </div>
    </section>
  );
}
