import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function Button({ children, className, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={cn("inline-flex items-center justify-center", className)} {...props}>
      {children}
    </button>
  );
}
