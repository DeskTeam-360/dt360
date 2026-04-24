import Image from "next/image";

/** Hero art from `public/images/` — glows match landing neon accents. */
export function HeroIllustration() {
  return (
    <div
      className="relative mx-auto flex w-full max-w-lg items-center justify-center lg:max-w-none"
      aria-hidden
    >
      {/* Local neon wash behind art */}
      <div className="absolute inset-0 -translate-y-4 scale-110 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.35)_0%,transparent_58%)] blur-3xl" />
      <div className="absolute inset-0 translate-x-6 translate-y-8 scale-105 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.22)_0%,transparent_55%)] blur-3xl" />
      <div className="relative w-full min-h-[280px] max-w-[560px] p-4 sm:p-6 lg:p-8">
        <Image
          src="/images/hero-illustration.svg"
          alt=""
          width={560}
          height={440}
          className="relative z-[1] h-auto w-full drop-shadow-[0_0_40px_rgba(99,102,241,0.25)]"
          sizes="(max-width: 1024px) 100vw, 560px"
          unoptimized
        />
      </div>
    </div>
  );
}
