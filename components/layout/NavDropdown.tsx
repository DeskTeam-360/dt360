import Link from "next/link";
import type { NavMenuItem } from "@/data/nav";
import { cn } from "@/lib/utils";

type NavDropdownProps = {
  label: string;
  items: NavMenuItem[];
  href?: string;
  className?: string;
  triggerClassName?: string;
};

export function NavDropdown({ label, items, href, className, triggerClassName }: NavDropdownProps) {
  return (
    <div className={cn("group relative", className)}>
      {href ? (
        <Link
          href={href}
          className={cn(
            "font-nav-primary flex items-center gap-1 transition-colors",
            triggerClassName ?? "text-white/90 hover:text-white",
          )}
        >
          {label}
          <ChevronDown className="size-3.5 opacity-70" aria-hidden />
        </Link>
      ) : (
        <span
          className={cn(
            "font-nav-primary flex cursor-default items-center gap-1 transition-colors",
            triggerClassName ?? "text-white/90 hover:text-white",
          )}
        >
          {label}
          <ChevronDown className="size-3.5 opacity-70" aria-hidden />
        </span>
      )}
      <div className="pointer-events-none invisible absolute left-1/2 top-full z-[60] -translate-x-1/2 pt-3 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
        <ul
          className="min-w-[220px] rounded-xl border border-white/10 bg-[#12152e]/95 py-2 shadow-xl backdrop-blur-md"
          role="list"
        >
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-nav-primary block px-4 py-2.5 text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}
