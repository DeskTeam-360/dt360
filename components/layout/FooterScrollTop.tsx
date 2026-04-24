"use client";

export function FooterScrollTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="absolute right-4 top-0 z-20 flex size-12 -translate-y-1/2 items-center justify-center rounded-2xl bg-[#e4277a] text-white shadow-lg shadow-black/25 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:size-14 sm:rounded-3xl"
      aria-label="Scroll to top"
    >
      <ChevronUp className="size-6 sm:size-7" />
    </button>
  );
}

function ChevronUp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  );
}
