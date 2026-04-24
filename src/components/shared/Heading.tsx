import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
  className?: string;
};

export function Heading({ as: Tag = "h2", children, className }: HeadingProps) {
  return <Tag className={cn("font-semibold tracking-tight", className)}>{children}</Tag>;
}
