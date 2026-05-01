import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { teamPeople, teamDifferencePoints } from "@/data/about";

export function AboutTeamPeople() {
  return (
    <section className="relative w-full bg-gradient-to-br from-[#fdf0f7] to-[#e3fafe] pt-[250px] lg:pt-[380px] pb-20 lg:pb-32 overflow-hidden">
      
      {/* 1. Bubble Background - Tempel di tepi kiri screen */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] lg:top-0 lg:w-[800px] lg:h-[800px] opacity-80 pointer-events-none z-0">
        <SafeImage 
          src="/images/about-bubble-bg.png" 
          alt="" 
          width={800} height={800} 
          className="w-full h-full object-contain object-left-top" 
        />
      </div>

      {/* 2. Gradasi lingkaran smooth pink di sebelah kiri */}
      <div className="absolute top-[10%] -left-[10%] w-[600px] h-[600px] lg:w-[900px] lg:h-[900px] rounded-full bg-[radial-gradient(circle_at_center,rgba(244,204,236,0.8)_0%,transparent_70%)] blur-[80px] pointer-events-none z-0"></div>

      <Container className="relative z-10 max-w-[1440px] px-6 lg:px-20">
        
        {/* Header Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 relative">

          <div className="relative z-10 pt-10 lg:pt-0">
            <h2 className="text-5xl font-[var(--font-poppins)] font-bold leading-[1.15] text-[#11104C] md:text-6xl lg:text-[72px] lg:leading-[1.1]">
              The People<br />
              Who Actually<br />
              <span className="text-[#e3058d]">Do Your Work</span>
            </h2>
          </div>

          <div className="relative z-10 w-full rounded-[20px] lg:rounded-[30px] border-[3px] border-[#00AEEE] overflow-hidden shadow-[0_20px_50px_rgba(0,174,238,0.2)]">
            <SafeImage 
              src="/images/about-deskteam-people.png" 
              alt="DeskTeam360 People" 
              width={800} height={600} 
              className="w-full h-auto object-cover" 
            />
          </div>
          
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-8 lg:gap-10 w-full max-w-[1050px] mx-auto mt-10">
          
          {/* Card 1: Jeremy */}
          <div className="relative w-[90%] lg:w-[85%] self-end bg-[#FBE4E1] rounded-[30px] lg:rounded-[40px] p-8 lg:p-12 pl-20 md:pl-32 lg:pl-44 shadow-lg flex items-center min-h-[180px] lg:min-h-[220px] ml-auto mr-0 transition-transform hover:-translate-y-2 duration-300">
            {/* Image */}
            <div className="absolute left-[-40px] md:left-[-80px] lg:left-[-110px] top-1/2 -translate-y-1/2">
              <div className="relative w-[120px] h-[120px] md:w-[180px] md:h-[180px] lg:w-[220px] lg:h-[220px] rounded-full border-4 border-white shadow-[0_10px_30px_rgba(251,58,30,0.3)] bg-[#FF5A36] overflow-hidden">
                <SafeImage src="/images/about-jeremy-headshot.png" alt="Jeremy" width={220} height={220} className="w-full h-full object-cover" />
              </div>
            </div>
            
            <div className="w-full text-left">
              <h3 className="font-[var(--font-montserrat)] text-[18px] md:text-[24px] lg:text-[28px] font-bold text-[#505FAA] uppercase tracking-wide">
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
          <div className="relative w-[90%] lg:w-[85%] self-start bg-[#F4CCEC] rounded-[30px] lg:rounded-[40px] p-8 lg:p-12 pr-20 md:pr-32 lg:pr-44 shadow-lg flex items-center min-h-[180px] lg:min-h-[220px] mr-auto ml-0 transition-transform hover:-translate-y-2 duration-300">
            {/* Image */}
            <div className="absolute right-[-40px] md:right-[-80px] lg:right-[-110px] top-1/2 -translate-y-1/2">
              <div className="relative w-[120px] h-[120px] md:w-[180px] md:h-[180px] lg:w-[220px] lg:h-[220px] rounded-full border-4 border-white shadow-[0_10px_30px_rgba(227,5,141,0.3)] bg-[#D61877] overflow-hidden">
                <SafeImage src="/images/about-jd-headshot.png" alt="JD" width={220} height={220} className="w-full h-full object-cover" />
              </div>
            </div>
            
            <div className="w-full text-left">
              <h3 className="font-[var(--font-montserrat)] text-[18px] md:text-[24px] lg:text-[28px] font-bold text-[#505FAA] uppercase tracking-wide">
                {teamPeople[1].name}
              </h3>
              <p className="font-[var(--font-montserrat)] text-[13px] lg:text-[16px] italic font-semibold text-[#505FAA] uppercase mt-1 mb-4">
                {teamPeople[1].role}
              </p>
              <p className="font-[var(--font-montserrat)] text-[13px] md:text-[15px] lg:text-[16px] font-medium text-black leading-relaxed">
                {teamPeople[1].desc}
              </p>
            </div>
          </div>

          {/* Card 3: Indonesia Team */}
          <div className="w-full bg-[#4A1587] rounded-[30px] lg:rounded-[40px] p-10 lg:p-14 shadow-2xl flex flex-col items-center justify-center text-center mt-4 transition-transform hover:-translate-y-2 duration-300">
            <h3 className="font-[var(--font-montserrat)] text-[20px] md:text-[26px] lg:text-[30px] font-bold text-[#e3058d] uppercase tracking-wide">
              {teamPeople[2].name}
            </h3>
            <p className="font-[var(--font-montserrat)] text-[13px] md:text-[16px] lg:text-[18px] text-white font-medium mt-4 lg:mt-6 max-w-3xl leading-[1.8]">
              {teamPeople[2].role} {teamPeople[2].desc}
            </p>
          </div>

        </div>

        {/* What Makes The Team Different Block */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-12 lg:mt-16 w-full max-w-[1200px] mx-auto relative z-10">
          
          <div className="relative w-full rounded-[20px] lg:rounded-[30px] overflow-hidden shadow-2xl">
            <SafeImage 
              src="/images/about-deskteam-team-gather.png" 
              alt="Team Gathering" 
              width={800} height={600} 
              className="w-full h-auto object-cover" 
            />
          </div>

          <div className="text-left">
            <h2 className="text-4xl font-[var(--font-poppins)] font-bold leading-tight text-[#11104C] lg:text-[50px] lg:leading-[60px] mb-8">
              What Makes The Team Defferent
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
