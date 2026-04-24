/** Decorative hero illustration (no text narrative). */
export function HeroIllustration() {
  return (
    <div
      className="relative mx-auto aspect-[5/4] w-full max-w-lg lg:max-w-none lg:aspect-[6/5]"
      aria-hidden
    >
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-indigo-600/40 via-fuchsia-600/25 to-transparent blur-3xl" />
      <div className="relative flex h-full min-h-[280px] items-center justify-center p-6 sm:p-8">
        <svg
          viewBox="0 0 520 420"
          className="h-full w-full max-h-[420px] drop-shadow-[0_0_48px_rgba(236,72,153,0.25)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="h-glow" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#ff8a3d" />
              <stop offset="1" stopColor="#e4277a" />
            </linearGradient>
            <linearGradient id="h-panel" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#1e2148" />
              <stop offset="1" stopColor="#12142e" />
            </linearGradient>
          </defs>
          <rect x="40" y="48" width="200" height="132" rx="16" fill="url(#h-panel)" stroke="url(#h-glow)" strokeWidth="1.5" opacity="0.95" />
          <rect x="64" y="76" width="120" height="10" rx="5" fill="#ffffff" opacity="0.12" />
          <rect x="64" y="96" width="88" height="10" rx="5" fill="#ffffff" opacity="0.08" />
          <rect x="64" y="116" width="104" height="10" rx="5" fill="#ffffff" opacity="0.08" />
          <rect x="260" y="72" width="210" height="150" rx="18" fill="url(#h-panel)" stroke="url(#h-glow)" strokeWidth="1.5" opacity="0.92" />
          <rect x="284" y="104" width="72" height="72" rx="12" fill="url(#h-glow)" opacity="0.35" />
          <rect x="368" y="104" width="78" height="12" rx="6" fill="#fff" opacity="0.14" />
          <rect x="368" y="124" width="56" height="12" rx="6" fill="#fff" opacity="0.1" />
          <rect x="284" y="192" width="162" height="12" rx="6" fill="#fff" opacity="0.1" />
          <rect x="72" y="220" width="360" height="148" rx="20" fill="url(#h-panel)" stroke="url(#h-glow)" strokeWidth="1.5" opacity="0.98" />
          <path
            d="M110 280c32-48 88-72 150-72s118 24 150 72"
            stroke="url(#h-glow)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.55"
          />
          <circle cx="160" cy="300" r="10" fill="#60a5fa" opacity="0.9" />
          <circle cx="260" cy="292" r="12" fill="#e879f9" opacity="0.85" />
          <circle cx="360" cy="300" r="10" fill="#f97316" opacity="0.9" />
          <rect x="200" y="24" width="120" height="36" rx="18" fill="url(#h-glow)" opacity="0.55" />
        </svg>
      </div>
    </div>
  );
}
