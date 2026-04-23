"use client";

import { useId } from "react";

export function LogoMark({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `dt-flame-${uid}`;

  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M20 4c-2 6-8 10-8 18a8 8 0 0016 0c0-6-4-10-8-18z" fill={`url(#${gradId})`} />
      <defs>
        <linearGradient
          id={gradId}
          x1="12"
          y1="4"
          x2="28"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f97316" />
          <stop offset="0.45" stopColor="#facc15" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}
