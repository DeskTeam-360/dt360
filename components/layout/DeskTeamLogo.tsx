import Link from "next/link";
import { LayoutSafeImage } from "@/components/shared/LayoutSafeImage";

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
          : "relative flex h-9 w-[180px] shrink-0 items-center justify-center sm:h-10 sm:w-[180px]"
      }
    >
      <LayoutSafeImage
        src={logoSrc}
        alt="DeskTeam360"
        width={180}
        height={43}
        className={
          isFooter
            ? "h-fit w-auto object-contain object-left"
            : "h-auto max-h-full w-auto max-w-full object-contain object-center"
        }
        sizes={isFooter ? "(max-width: 640px) 100vw, 25vw" : "180px"}
        priority
      />
    </Link>
  );
}
