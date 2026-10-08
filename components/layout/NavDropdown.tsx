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

export function NavDropdown({
  label,
  items,
  href,
  className,
  triggerClassName,
}: NavDropdownProps) {
  const trigger = (
    <>
      {label}
      <ChevronDown className="size-3.5 opacity-70" aria-hidden />
    </>
  );

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
          {trigger}
        </Link>
      ) : (
        <span
          className={cn(
            "font-nav-primary flex cursor-default items-center gap-1 transition-colors",
            triggerClassName ?? "text-white/90 hover:text-white",
          )}
        >
          {trigger}
        </span>
      )}
      <div className="pointer-events-none invisible absolute left-1/2 top-full z-[60] -translate-x-1/2 pt-3 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100">
        <ul
          className="min-w-[240px] rounded-xl border border-[#101651]/10 bg-white py-2 shadow-xl"
          role="list"
        >
          {items.map((item) => (
            <li key={item.href + item.label}>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-nav-primary block px-4 py-2.5 text-[#11104C]/85 transition-colors hover:bg-sky-50 hover:text-[#11104C]"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="font-nav-primary block px-4 py-2.5 text-[#11104C]/85 transition-colors hover:bg-sky-50 hover:text-[#11104C]"
                >
                  {item.label}
                </Link>
              )}
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
