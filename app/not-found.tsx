import Link from "next/link";
import { LightHeroNavScope } from "@/components/layout/LightHeroNavScope";
import { Animated404 } from "@/components/pages/not-found/Animated404";

export default function NotFound() {
  return (
    <LightHeroNavScope>
      <main className="flex min-h-0 flex-grow flex-col bg-white">
        <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-[#C8CEFB] px-6 py-16 pt-28 md:px-12 md:py-20 md:pt-36">
          <div
            className="pointer-events-none absolute right-[-10%] top-[-20%] h-[min(80vw,520px)] w-[min(80vw,520px)] rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(227, 5, 141, 0.35) 0%, rgba(227, 5, 141, 0) 70%)",
            }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-[720px] text-center">
            <Animated404 />
            <h1 className="type-rule-h2 font-heading font-bold text-[#11104C]">Page not found</h1>
            <p className="type-rule-p mx-auto mt-6 max-w-md text-[#11104C]/85">
              The page you&apos;re looking for doesn&apos;t exist or may have been moved.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex rounded-xl bg-[#11104C] px-6 py-3 text-[16px] font-bold text-white transition hover:bg-[#1e1a6e]"
              >
                Back to Home
              </Link>
              <Link
                href="/blog"
                className="inline-flex rounded-xl border-2 border-[#11104C] px-6 py-3 text-[16px] font-bold text-[#11104C] transition hover:bg-[#11104C] hover:text-white"
              >
                Visit the Blog
              </Link>
            </div>
          </div>
        </section>
      </main>
    </LightHeroNavScope>
  );
}
