import { SafeImage } from "@/components/shared/SafeImage";
import type { ComponentProps } from "react";

export type ServiceSafeImageProps = ComponentProps<typeof SafeImage>;

/** Service routes — always use Next.js image optimizer (phase 2). */
export function ServiceSafeImage(props: ServiceSafeImageProps) {
  return <SafeImage {...props} optimized />;
}
