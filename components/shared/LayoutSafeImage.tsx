import { SafeImage } from "@/components/shared/SafeImage";
import type { ComponentProps } from "react";

export type LayoutSafeImageProps = ComponentProps<typeof SafeImage>;

/** Navbar, footer, and other global layout chrome — always use Next.js image optimizer (phase 4). */
export function LayoutSafeImage(props: LayoutSafeImageProps) {
  return <SafeImage {...props} optimized />;
}
