import Link from "next/link";
import { SafeImage } from "@/components/shared/SafeImage";

type DeskTeamLogoProps = {
  variant?: "header" | "footer";
  tone?: "light" | "dark";
};

export function DeskTeamLogo({ variant = "header", tone = "light" }: DeskTeamLogoProps) {
  const isFooter = variant === "footer";
  const logoSrc = isFooter ? "/images/logo-white.png" : tone === "dark" ? "/images/logo-black.png" : "/images/logo-white.png";
  return (
    <Link
      href="/"
      className={
        isFooter
          ? "relative block h-9 w-[80%] shrink-0 sm:h-10"
          : "relative block h-9 w-[148px] shrink-0 sm:h-10 sm:w-[168px]"
      }
    >
      <SafeImage
        src={logoSrc}
        alt="DeskTeam360"
        width={168}
        height={40}
        className="h-fit w-auto object-contain object-left"
        sizes={isFooter ? "(max-width: 640px) 100vw, 25vw" : "168px"}
        priority
      />
    </Link>
  );
}
