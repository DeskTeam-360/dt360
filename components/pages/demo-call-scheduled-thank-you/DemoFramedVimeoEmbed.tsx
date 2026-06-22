type DemoFramedVimeoEmbedProps = {
  embedSrc: string;
  label: string;
  ariaLabel: string;
};

/** Dark framed Vimeo player for the demo thank-you hero section. */
export function DemoFramedVimeoEmbed({ embedSrc, label, ariaLabel }: DemoFramedVimeoEmbedProps) {
  return (
    <div className="mx-auto w-full max-w-[900px] overflow-hidden rounded-2xl bg-[#2B2B2B] shadow-[0_24px_64px_rgba(17,16,76,0.18)]">
      <p className="px-6 py-5 text-center font-[var(--font-poppins)] text-[18px] font-semibold leading-snug text-white sm:px-8 sm:text-[22px] lg:text-[24px]">
        {label}
      </p>
      <div className="relative aspect-video w-full bg-[#1a1a1a]">
        <iframe
          className="absolute inset-0 size-full border-0"
          src={embedSrc}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          allowFullScreen
          title={ariaLabel}
        />
      </div>
    </div>
  );
}
