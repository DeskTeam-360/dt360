import { SafeImage } from "@/components/shared/SafeImage";
import type { ComponentProps } from "react";

export type MarketingSafeImageProps = ComponentProps<typeof SafeImage>;

/** How It Works, Book a Call, Contact, Affiliate — always use Next.js image optimizer (phase 3). */
export function MarketingSafeImage(props: MarketingSafeImageProps) {
  return <SafeImage {...props} optimized />;
}
