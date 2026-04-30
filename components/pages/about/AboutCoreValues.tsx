import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { coreValues } from "@/data/about";

export function AboutCoreValues() {
  return (
    <section className="relative overflow-hidden bg-[#11104C] py-16 lg:py-32 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(227,5,141,0.4),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(0,200,244,0.25),transparent_40%)]" />
      <Container className="relative z-10 max-w-[1440px] px-6 lg:px-20">
        <h2 className="text-center font-[var(--font-poppins)] text-4xl font-bold leading-tight sm:text-5xl lg:text-[64px] lg:leading-[80px]">
          We Run This Business the Way <span className="text-[#E3058D]">We Want to Be Treated</span>
        </h2>
        <div className="mt-24 grid gap-8 gap-y-16 lg:gap-8 lg:grid-cols-3 max-w-[1200px] mx-auto">
          {coreValues.map((value, idx) => {
            const color = idx === 0 ? "#A855F7" : idx === 1 ? "#3B82F6" : "#F97316";
            const colorBorder = idx === 0 ? "rgba(168, 85, 247, 0.5)" : idx === 1 ? "rgba(59, 130, 246, 0.5)" : "rgba(249, 115, 22, 0.5)";
            const bgGradient = idx === 1 ? "linear-gradient(180deg, rgba(59,130,246,0.15) 0%, rgba(17,16,76,0.6) 100%)" : "rgba(17,16,76,0.6)";
            
            return (
              <article
                key={value.title}
                className="relative rounded-[20px] border-[1.5px] p-8 lg:p-10 pt-14 lg:pt-16 transition-transform hover:-translate-y-2 duration-300 flex flex-col items-center text-center mt-6 lg:mt-0"
                style={{
                  borderColor: colorBorder,
                  background: bgGradient,
                  boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.2)",
                }}
              >
                {/* Extra glassmorphism blur behind content */}
                <div className="absolute inset-0 rounded-[20px] backdrop-blur-[12px] -z-10" />
                
                {/* Floating Icon Halfway Out */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[100px] w-[100px] flex items-center justify-center">
                   <SafeImage
                     src={
                       idx === 0 ? "/images/about-handshake-icon.png" :
                       idx === 1 ? "/images/about-shield-icon.png" :
                       "/images/about-dollar-shield-icon.png"
                     }
                     alt={`${value.title} icon`}
                     width={100}
                     height={100}
                     className="w-full h-full object-contain"
                   />
                </div>

                <h3 className="font-[var(--font-poppins)] text-[20px] lg:text-[22px] font-bold leading-[30px] text-white">
                  {value.title}
                </h3>
                
                {/* Underline */}
                <div 
                  className="h-[2px] w-[50px] rounded-full mt-5 mb-6"
                  style={{ backgroundColor: color }}
                />

                <p className="font-[var(--font-montserrat)] text-[14px] lg:text-[15px] font-medium leading-[26px] text-white/90">
                  {value.desc}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
