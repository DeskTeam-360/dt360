import { Container } from "@/components/shared/Container";
import { teamPeople } from "@/data/about";
import { AboutAssetImage } from "./AboutAssetImage";

export function AboutTeamPeople() {
  return (
    <section className="bg-white py-16 lg:py-32">
      <Container className="max-w-[1440px] px-6 lg:px-20">
        <h2 className="max-w-3xl text-4xl font-[var(--font-poppins)] font-bold leading-tight text-[#11104C] sm:text-5xl lg:text-[64px] lg:leading-[80px]">
          The People Who Actually <span className="text-[#e3058d]">Do Your Work</span>
        </h2>
        <div className="mt-20 space-y-12 max-w-[1050px] mx-auto">
          {teamPeople.map((member, idx) => (
            <article
              key={member.name}
              className="grid gap-8 lg:gap-16 rounded-[30px] border-2 border-[#d7d6f8] bg-white p-8 lg:p-12 shadow-[0_30px_60px_-20px_rgba(17,16,76,0.15)] lg:grid-cols-[250px_1fr] items-center transition-transform hover:-translate-y-1 duration-300"
            >
              <div className="relative">
                {/* Decorative border background specific to design */}
                <div className={`absolute inset-[-10px] rounded-full border border-dashed ${idx === 2 ? 'border-[#e3058d]/30 hidden' : 'border-[#505FAA]/30'} z-0`} />
                <AboutAssetImage
                  src={member.image}
                  alt={`${member.name} portrait`}
                  className="relative z-10 w-[200px] h-[200px] lg:w-[250px] lg:h-[250px] border-[6px] border-white shadow-xl bg-[#f2f2f2] mx-auto object-cover"
                  rounded={idx === 2 ? "rounded-[26px]" : "rounded-full"}
                />
              </div>
              <div className="text-center lg:text-left">
                <h3 className={`font-[var(--font-montserrat)] text-[28px] lg:text-[32px] font-bold uppercase tracking-wide ${idx === 2 ? 'text-[#e3058d]' : 'text-[#505FAA]'}`}>
                  {member.name}
                </h3>
                <p className="mt-2 font-[var(--font-montserrat)] text-[16px] lg:text-[18px] font-semibold italic uppercase tracking-wider text-[#505FAA]/80">
                  {member.role}
                </p>
                <p className="mt-6 font-[var(--font-montserrat)] text-[16px] lg:text-[18px] font-medium leading-[32px] text-[#000000]/80">
                  {member.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
