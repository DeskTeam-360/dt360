import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { teamPeople, teamDifferencePoints } from "@/data/about";

export function AboutTeamPeople() {
  return (
    <section className="relative w-full overflow-x-clip bg-gradient-to-br from-[#fdf0f7] to-[#e3fafe] pt-[60px] lg:pt-[380px] min-[2560px]:pt-[440px] min-[4000px]:!pt-[600px] pb-20 lg:pb-32">
      
      {/* 1. Bubble background — flush to left screen edge */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] lg:top-0 lg:w-[800px] lg:h-[800px] opacity-80 pointer-events-none z-0">
        <SafeImage 
          src="/images/about-bubble-bg.png" 
          alt="" 
          width={800} height={800} 
          className="w-full h-full object-contain object-left-top" 
        />
      </div>

      {/* 2. Smooth pink circular gradient on the left */}
      <div className="absolute top-[10%] -left-[10%] w-[600px] h-[600px] lg:w-[900px] lg:h-[900px] rounded-full bg-[radial-gradient(circle_at_center,rgba(244,204,236,0.8)_0%,transparent_70%)] blur-[80px] pointer-events-none z-0"></div>

      <Container className="relative z-10 max-w-[1440px] px-6 lg:px-20">
        
        {/* Header Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 relative">

          <div className="relative z-10 pt-10 lg:pt-0">
            <h2 className="type-rule-h2 text-center font-semibold leading-[1.15] text-[#11104C] lg:text-left lg:leading-[1.1]">
              <span className="lg:hidden">
                The People Who Actually <span className="text-[#e3058d]">Do Your Work</span>
              </span>
              <span className="hidden lg:inline">
                The People<br />
                Who Actually<br />
                <span className="text-[#e3058d]">Do Your Work</span>
              </span>
            </h2>
          </div>

          <div className="group relative z-10 -mr-6 w-[calc(100%+1.5rem)] rounded-tl-[50px] transition-[transform,shadow] duration-300 ease-out group-hover:shadow-[0_20px_50px_rgba(0,174,238,0.2)] lg:-mr-[max(5rem,calc((100vw-90rem)/2+5rem))] lg:w-[calc(100%+max(5rem,calc((100vw-90rem)/2+5rem)))] min-[2560px]:w-[720px] min-[2560px]:max-w-[720px]">
            <div className="overflow-hidden rounded-tl-[50px] transition-transform duration-300 ease-out group-hover:scale-[1.04] group-hover:-translate-y-2 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-hover:translate-y-0">
              <SafeImage 
                src="/images/about-deskteam-people.png" 
                alt="DeskTeam360 People" 
                width={800} height={600} 
                className="w-full h-auto object-cover rounded-tl-[50px]" 
              />
            </div>
          </div>
          
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-8 lg:gap-10 w-full max-w-[1050px] mx-auto mt-10">
          
          {/* Card 1: Jeremy — flex items-center so circle aligns vertically with text */}
          <div className="relative z-10 flex w-[90%] flex-row items-center self-end overflow-visible rounded-[30px] bg-[#FBE4E1] py-8 pl-6 pr-8 shadow-lg min-h-[180px] transition-transform duration-300 hover:-translate-y-2 md:py-10 md:pl-8 md:pr-10 lg:w-[85%] lg:min-h-[220px] lg:rounded-[40px] lg:py-12 lg:pl-10 lg:pr-12 ml-auto mr-0">
            <div className="relative z-10 shrink-0 -ml-[52px] md:-ml-[100px] lg:-ml-[120px] flex items-center justify-center self-center">
              <div className="relative h-[120px] w-[120px] overflow-hidden rounded-full border-4 border-white bg-[#FF5A36] shadow-[0_10px_30px_rgba(251,58,30,0.3)] md:h-[180px] md:w-[180px] lg:h-[220px] lg:w-[220px]">
                <SafeImage
                  src="/images/about-jeremy-headshot.png"
                  alt="Jeremy"
                  fill
                  sizes="(max-width: 767px) 120px, (max-width: 1023px) 180px, 220px"
                  className="object-cover object-[50%_38%] !top-[3px] md:!top-[2px] lg:!top-[3px]"
                />
              </div>
            </div>

            <div className="min-w-0 flex-1 pl-3 text-left md:pl-5 lg:pl-8">
              <h3 className="font-[var(--font-montserrat)] text-[30px] font-bold uppercase tracking-wide text-[#505FAA]">
                {teamPeople[0].name}
              </h3>
              <p className="font-[var(--font-montserrat)] text-[13px] lg:text-[16px] italic font-semibold text-[#505FAA] uppercase mt-1 mb-4">
                {teamPeople[0].role}
              </p>
              <p className="font-[var(--font-montserrat)] text-[13px] md:text-[15px] lg:text-[16px] font-medium text-black leading-relaxed">
                {teamPeople[0].desc}
              </p>
            </div>
          </div>

          {/* Card 2: JD */}
          <div className="relative z-10 flex w-[90%] flex-row items-center self-start overflow-visible rounded-[30px] bg-[#F4CCEC] py-8 pl-8 pr-6 shadow-lg min-h-[180px] transition-transform duration-300 hover:-translate-y-2 md:py-10 md:pl-10 md:pr-8 lg:w-[85%] lg:min-h-[220px] lg:rounded-[40px] lg:py-12 lg:pl-12 lg:pr-10 mr-auto ml-0">
            <div className="min-w-0 flex-1 pr-3 text-left md:pr-5 lg:pr-8">
              <h3 className="font-[var(--font-montserrat)] text-[30px] font-bold uppercase tracking-wide text-[#505FAA]">
                {teamPeople[1].name}
              </h3>
              <p className="font-[var(--font-montserrat)] text-[13px] lg:text-[16px] italic font-semibold text-[#505FAA] uppercase mt-1 mb-4">
                {teamPeople[1].role}
              </p>
              <p className="font-[var(--font-montserrat)] text-[13px] md:text-[15px] lg:text-[16px] font-medium text-black leading-relaxed">
                {teamPeople[1].desc}
              </p>
            </div>

            <div className="relative z-10 shrink-0 -mr-[52px] md:-mr-[100px] lg:-mr-[120px] flex items-center justify-center self-center">
              <div className="relative h-[120px] w-[120px] overflow-hidden rounded-full border-4 border-white bg-[#D61877] shadow-[0_10px_30px_rgba(227,5,141,0.3)] md:h-[180px] md:w-[180px] lg:h-[220px] lg:w-[220px]">
                <SafeImage
                  src="/images/about-jd-headshot.png"
                  alt="JD"
                  fill
                  sizes="(max-width: 767px) 120px, (max-width: 1023px) 180px, 220px"
                  className="object-cover object-[50%_38%] !top-[3px] md:!top-[2px] lg:!top-[3px]"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Indonesia Team */}
          <div className="w-full bg-[#4A1587] rounded-[30px] lg:rounded-[40px] p-10 lg:p-14 shadow-2xl flex flex-col items-center justify-center text-center mt-4 transition-transform hover:-translate-y-2 duration-300">
            <h3 className="font-[var(--font-montserrat)] text-[30px] font-bold uppercase tracking-wide text-[#e3058d]">
              {teamPeople[2].name}
            </h3>
            <p className="font-[var(--font-montserrat)] text-[13px] md:text-[16px] lg:text-[18px] text-white font-medium mt-4 lg:mt-6 max-w-3xl leading-[1.8]">
              {teamPeople[2].role} {teamPeople[2].desc}
            </p>
          </div>

        </div>

        {/* What Makes The Team Different Block */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-12 lg:mt-16 w-full relative z-10">
          
          <div className="group relative z-10 -ml-6 w-[calc(100%+1.5rem)] rounded-tr-[50px] border border-solid border-[#7547C5] transition-transform duration-300 ease-out lg:-ml-[max(5rem,calc((100vw-90rem)/2+5rem))] lg:w-[calc(100%+max(5rem,calc((100vw-90rem)/2+5rem)))] min-[2560px]:!-ml-[150px] min-[2560px]:w-[720px] min-[2560px]:max-w-[720px]">
            <div className="overflow-hidden rounded-tr-[50px] transition-transform duration-300 ease-out group-hover:scale-[1.04] group-hover:-translate-y-2 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-hover:translate-y-0">
              <SafeImage 
                src="/images/about - what makes the team different.png" 
                alt="Team Gathering" 
                width={800} height={600} 
                className="w-full h-auto object-cover rounded-tr-[50px]" 
              />
            </div>
          </div>

          <div className="text-left">
            <h2 className="type-rule-h2 font-semibold mb-8 leading-tight text-[#11104C] lg:leading-[1.15]">
              What Makes The Team Different
            </h2>
            <ul className="space-y-4 lg:space-y-6">
              {teamDifferencePoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-4 text-[14px] lg:text-[16px] font-[var(--font-montserrat)] font-medium leading-relaxed text-[#11104C]/80"
                >
                  <span className="flex-shrink-0 mt-1 w-[20px] h-[20px] rounded-[4px] bg-[#e3058d] text-white flex items-center justify-center text-[12px] font-bold shadow-md">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </span>
                  <span
                    className={
                      point === teamDifferencePoints[0] ? "min-w-0 [text-wrap:pretty]" : undefined
                    }
                  >
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </Container>
    </section>
  );
}
