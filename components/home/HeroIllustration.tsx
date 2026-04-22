export function HeroIllustration() {
  return (
    <div
      className="relative mx-auto w-full max-w-[min(100%,560px)] select-none"
      aria-hidden
    >
      <svg
        viewBox="0 0 560 480"
        className="h-auto w-full drop-shadow-[0_20px_50px_rgba(99,102,241,0.25)]"
        role="img"
      >
        <defs>
          <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="screen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#312e81" />
          </linearGradient>
          <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="18" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <ellipse cx="280" cy="260" rx="220" ry="180" fill="url(#glow)" filter="url(#blur)" />
        <path
          d="M120 340 Q 80 200 200 160 Q 320 120 420 180 Q 500 240 460 360 Q 400 420 260 400 Q 140 380 120 340Z"
          fill="rgba(99,102,241,0.12)"
          stroke="rgba(167,139,250,0.35)"
          strokeWidth="1.5"
        />
        <g transform="translate(300 120)">
          <rect x="0" y="0" width="200" height="130" rx="12" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
          <rect x="8" y="10" width="184" height="14" rx="4" fill="#1e293b" />
          <rect x="8" y="32" width="120" height="6" rx="2" fill="#f472b6" opacity="0.9" />
          <rect x="8" y="44" width="160" height="6" rx="2" fill="#38bdf8" opacity="0.85" />
          <rect x="8" y="56" width="100" height="6" rx="2" fill="#a78bfa" opacity="0.9" />
          <rect x="8" y="68" width="140" height="6" rx="2" fill="#34d399" opacity="0.75" />
          <rect x="8" y="88" width="184" height="32" rx="6" fill="url(#screen)" />
        </g>
        <ellipse cx="160" cy="200" rx="48" ry="52" fill="#c4b5fd" />
        <path
          d="M130 248 Q 160 270 190 248 L 200 300 Q 160 320 120 300Z"
          fill="#6366f1"
        />
        <ellipse cx="400" cy="210" rx="44" ry="48" fill="#fda4af" />
        <path
          d="M370 256 Q 400 278 430 256 L 440 310 Q 400 332 360 310Z"
          fill="#2563eb"
        />
        <rect x="80" y="320" width="220" height="12" rx="6" fill="#38bdf8" opacity="0.35" />
        <rect x="100" y="340" width="180" height="8" rx="4" fill="#a78bfa" opacity="0.3" />
        <g transform="translate(180 300)">
          <rect x="0" y="0" width="160" height="100" rx="10" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
          <rect x="10" y="12" width="140" height="8" rx="2" fill="#334155" />
          <rect x="10" y="28" width="90" height="5" rx="2" fill="#f472b6" />
          <rect x="10" y="38" width="110" height="5" rx="2" fill="#22d3ee" />
          <rect x="10" y="48" width="70" height="5" rx="2" fill="#c084fc" />
          <circle cx="130" cy="72" r="18" fill="#0ea5e9" opacity="0.9" />
          <path d="M124 72 L128 76 L138 66" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
        <circle cx="480" cy="120" r="6" fill="#fbbf24" opacity="0.9" />
        <circle cx="510" cy="160" r="4" fill="#34d399" opacity="0.85" />
        <path d="M60 180 L90 160 M50 220 L95 200" stroke="#818cf8" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
