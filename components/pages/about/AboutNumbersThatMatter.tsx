import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { numbersThatMatter } from "@/data/about";

export function AboutNumbersThatMatter() {
  return (
    <section className="relative z-20 bg-[#11104C] pb-0 pt-4 lg:pt-6 text-white">
      {/* Background radial glows from design */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[20%] left-[-10%] w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(227,5,141,0.2)_0%,transparent_60%)] mix-blend-screen blur-[80px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,rgba(117,71,197,0.3)_0%,transparent_50%)] mix-blend-screen blur-[100px]" />
      </div>

      <Container className="relative z-30 max-w-[1440px] px-6 lg:px-20">
        <h2 className="text-center font-[var(--font-poppins)] text-4xl font-bold leading-tight sm:text-5xl lg:text-[64px] lg:leading-[80px]">
          The Numbers That Matter
        </h2>
        <div className="mt-20 grid gap-8 lg:gap-12 md:grid-cols-2 xl:grid-cols-3 max-w-[1100px] mx-auto">
          {numbersThatMatter.map((item, idx) => (
            <div
              key={item.value + item.label}
              className="relative rounded-[30px] border border-solid bg-[linear-gradient(225deg,#11104C_21%,#201E7A_100%)] p-8 lg:p-10 min-h-[230px] flex flex-col justify-center backdrop-blur-xl transition-transform hover:-translate-y-2 duration-300"
              style={{
                borderColor:
                  idx === 0
                    ? "rgba(117, 71, 197, 0.5)"
                    : idx === 1
                      ? "rgba(251, 58, 30, 0.5)"
                      : idx === 2
                        ? "rgba(161, 230, 255, 0.5)"
                        : idx === 3
                          ? "rgba(230, 30, 152, 0.5)"
                          : idx === 4
                            ? "rgba(117, 71, 197, 0.5)"
                            : "rgba(117, 71, 197, 0.5)",
                borderWidth: idx === 4 ? "4px" : "2px",
                boxShadow: "0px 20px 50px rgba(0, 0, 0, 0.2)",
              }}
            >
              {/* Inner glow specific to each card */}
              <div className="absolute inset-0 rounded-[30px] opacity-20 pointer-events-none mix-blend-overlay"
                   style={{
                     background: `radial-gradient(circle at top right, ${idx === 1 ? '#FB3A1E' : idx === 2 ? '#A1E6FF' : idx === 3 ? '#E61E98' : '#7547C5'}, transparent 70%)`
                   }}
              />
              <div className="relative z-10">
                {/* 3D Icon */}
                {idx !== 2 && (
                  <div className="absolute -top-16 -right-6 w-24 h-24 flex items-center justify-center drop-shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                    <SafeImage
                      src={
                        idx === 0 ? "/images/about-rocket-icon.png" :
                        idx === 1 ? "/images/about-person-icon.png" :
                        idx === 3 ? "/images/about-person-blue-icon.png" :
                        idx === 4 ? "/images/about-mail-icon.png" :
                        "/images/about-window-icon.png"
                      }
                      alt={`${item.label} icon`}
                      width={96}
                      height={96}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <p className="font-[var(--font-russo-one)] text-5xl lg:text-[64px] lg:leading-[80px] uppercase text-white drop-shadow-lg tracking-wider">
                  {item.value}
                </p>
                <p className="mt-4 font-[var(--font-montserrat)] text-[16px] lg:text-[18px] font-semibold leading-[30px] text-white/90">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Section Separator Image (Reversed) */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full z-20 leading-[0] translate-y-[98%] rotate-180">
        <img 
          src="/images/about-section-separator.png" 
          alt="" 
          className="w-full h-auto min-h-[50px] lg:min-h-[100px] object-cover object-bottom" 
        />
      </div>
    </section>
  );
}
