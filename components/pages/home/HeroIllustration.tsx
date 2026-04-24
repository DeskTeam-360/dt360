import Image from "next/image";

/** Hero art from `public/images/` per project rules. */
export function HeroIllustration() {
  return (
    <div
      className="relative mx-auto flex w-full max-w-lg items-center justify-center lg:max-w-none"
      aria-hidden
    >
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-indigo-600/40 via-fuchsia-600/25 to-transparent blur-3xl" />
      <div className="relative w-full min-h-[280px] max-w-[520px] p-6 sm:p-8">
        <Image
          src="/images/hero-illustration.svg"
          alt=""
          width={520}
          height={420}
          className="h-auto w-full object-contain"
          sizes="(max-width: 1024px) 100vw, 520px"
          unoptimized
        />
      </div>
    </div>
  );
}
