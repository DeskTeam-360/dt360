import { SafeImage } from "@/components/shared/SafeImage";
import type { ComponentProps } from "react";

export type CaseStudiesSafeImageProps = ComponentProps<typeof SafeImage>;

/** Case studies listing, detail, and CTA — always use Next.js image optimizer (phase 5). */
export function CaseStudiesSafeImage(props: CaseStudiesSafeImageProps) {
  return <SafeImage {...props} optimized />;
}
