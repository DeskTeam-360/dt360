import { Container } from "@/components/shared/Container";
import { coreValues } from "@/data/about";

export function AboutCoreValues() {
  return (
    <section className="relative overflow-hidden bg-[#11104C] py-16 lg:py-32 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(227,5,141,0.4),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(0,200,244,0.25),transparent_40%)]" />
      <Container className="relative z-10 max-w-[1440px] px-6 lg:px-20">
        <h2 className="text-center font-[var(--font-poppins)] text-4xl font-bold leading-tight sm:text-5xl lg:text-[64px] lg:leading-[80px]">
          We Run This Business the Way <span className="text-[#E3058D]">We Want to Be Treated</span>
        </h2>
        <div className="mt-24 grid gap-8 lg:gap-12 lg:grid-cols-3 max-w-[1200px] mx-auto">
          {coreValues.map((value, idx) => (
            <article
              key={value.title}
              className="relative rounded-[30px] border-2 p-10 lg:p-12 transition-transform hover:-translate-y-2 duration-300"
              style={{
                borderColor: idx === 0 ? "rgba(222, 69, 244, 0.4)" : idx === 1 ? "rgba(58, 155, 213, 0.4)" : "rgba(239, 151, 113, 0.4)",
                background: idx === 1 ? "linear-gradient(180deg, rgba(34,32,130,0.6) 0%, rgba(99,98,220,0.6) 100%)" : "rgba(17,16,76,0.6)",
                boxShadow: "0px 30px 60px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Extra glassmorphism blur behind content */}
              <div className="absolute inset-0 rounded-[30px] backdrop-blur-[24px] -z-10" />
              
              <div className="mb-10 h-[88px] w-[88px] rounded-full flex items-center justify-center bg-gradient-to-br from-white/20 to-white/5 border-[1.5px] border-white/30 shadow-[inset_0_4px_20px_rgba(255,255,255,0.15)] backdrop-blur-md">
                 <span className="text-[40px] leading-none drop-shadow-lg">🛡️</span> {/* Placeholder icon */}
              </div>
              <h3 className="font-[var(--font-poppins)] text-[28px] lg:text-[32px] font-bold leading-[40px]">{value.title}</h3>
              <p className="mt-6 font-[var(--font-montserrat)] text-[16px] lg:text-[18px] font-medium leading-[32px] text-white/90">{value.desc}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
