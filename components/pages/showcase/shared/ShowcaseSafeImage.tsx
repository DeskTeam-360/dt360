import { SafeImage } from "@/components/shared/SafeImage";
import type { ComponentProps } from "react";

export type ShowcaseSafeImageProps = ComponentProps<typeof SafeImage>;

/** Showcase page — always use Next.js image optimizer (phase 6). */
export function ShowcaseSafeImage(props: ShowcaseSafeImageProps) {
  return <SafeImage {...props} optimized />;
}
