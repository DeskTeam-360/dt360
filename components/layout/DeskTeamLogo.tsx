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
          ? "relative block min-h-0 w-full max-h-[35px] items-center lg:h-10 lg:max-h-none lg:w-[168px] lg:shrink-0"
          : "relative flex min-h-0 w-full max-h-[35px] items-center lg:h-10 lg:max-h-none lg:w-[168px] lg:shrink-0"
      }
    >
      <SafeImage
        src={logoSrc}
        alt="DeskTeam360"
        width={168}
        height={35}
        className={
          isFooter
            ? "h-fit w-full max-h-[35px] object-contain object-left lg:max-h-none lg:h-10 lg:w-auto"
            : "h-auto w-full max-h-[35px] object-contain object-left lg:max-h-none lg:h-10 lg:w-auto"
        }
        sizes={isFooter ? "(max-width: 640px) 100vw, 25vw" : "(max-width: 640px) 100vw, 25vw"}
        priority
      />
    </Link>
  );
}
