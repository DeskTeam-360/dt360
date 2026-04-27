import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "dotlottie-wc": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          src?: string;
          autoplay?: boolean | "";
          loop?: boolean | "";
        },
        HTMLElement
      >;
    }
  }
}
