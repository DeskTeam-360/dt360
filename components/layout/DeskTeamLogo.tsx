import Link from "next/link";
import { SafeImage } from "@/components/shared/SafeImage";

export function DeskTeamLogo() {
  return (
    <Link href="/" className="relative block h-9 w-[148px] shrink-0 sm:h-10 sm:w-[168px]">
      <SafeImage
        src="/images/logo-white.png"
        alt="DeskTeam360"
        fill
        className="object-contain object-left"
        sizes="168px"
        priority
      />
    </Link>
  );
}
