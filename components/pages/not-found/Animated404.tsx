"use client";

import { motion } from "framer-motion";

const DIGITS = ["4", "0", "4"] as const;

const digitGradient = (index: number) =>
  index === 1
    ? "linear-gradient(165deg, #E3058D 0%, #7547C5 45%, #11104C 100%)"
    : "linear-gradient(165deg, #30439E 0%, #11104C 85%)";

export function Animated404() {
  return (
    <div className="relative mb-4 flex items-center justify-center md:mb-6" role="img" aria-label="404">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(70vw,320px)] w-[min(70vw,320px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(227,5,141,0.2)_0%,transparent_70%)]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div className="relative flex items-end justify-center gap-1 sm:gap-2 md:gap-3">
        {DIGITS.map((digit, index) => (
          <motion.span
            key={`404-digit-${index}`}
            className="inline-block font-heading font-bold leading-none drop-shadow-[0_8px_24px_rgba(17,16,76,0.15)]"
            style={{
              fontSize: "clamp(4.5rem, 20vw, 10rem)",
              background: digitGradient(index),
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            initial={{ opacity: 0, y: 48, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: [0, index === 1 ? -18 : -10, 0],
              scale: 1,
              rotate: [0, index === 1 ? 2 : -2, 0],
            }}
            transition={{
              opacity: { duration: 0.45, delay: index * 0.1 },
              scale: { type: "spring", stiffness: 260, damping: 18, delay: index * 0.1 },
              y: {
                duration: 2.4 + index * 0.2,
                delay: 0.55 + index * 0.12,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
              rotate: {
                duration: 2.4 + index * 0.2,
                delay: 0.55 + index * 0.12,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          >
            {digit}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="pointer-events-none absolute -bottom-2 left-1/2 h-1 w-[min(60%,200px)] -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-[#E3058D]/60 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0.4, 1, 0.4], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        aria-hidden
      />
    </div>
  );
}
