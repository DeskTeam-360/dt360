"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      render: (
        container: HTMLElement,
        parameters: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => number;
      reset: (widgetId?: number) => void;
    };
    bookACallRecaptchaOnload?: () => void;
  }
}

type BookACallRecaptchaProps = {
  siteKey: string;
  onChange: (token: string | null) => void;
};

export function BookACallRecaptcha({ siteKey, onChange }: BookACallRecaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  useEffect(() => {
    const renderWidget = () => {
      const grecaptcha = window.grecaptcha;
      if (!containerRef.current || !grecaptcha || widgetIdRef.current !== null) return;

      widgetIdRef.current = grecaptcha.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token) => onChange(token),
        "expired-callback": () => onChange(null),
        "error-callback": () => onChange(null),
      });
    };

    const scheduleRender = () => {
      window.grecaptcha?.ready(renderWidget);
    };

    window.bookACallRecaptchaOnload = scheduleRender;

    if (window.grecaptcha) {
      scheduleRender();
      return () => {
        onChange(null);
      };
    }

    const existing = document.querySelector<HTMLScriptElement>('script[data-book-a-call-recaptcha="true"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js?onload=bookACallRecaptchaOnload&render=explicit";
      script.async = true;
      script.defer = true;
      script.dataset.bookACallRecaptcha = "true";
      document.head.appendChild(script);
    } else {
      scheduleRender();
    }

    return () => {
      onChange(null);
    };
  }, [siteKey, onChange]);

  return <div ref={containerRef} className="min-h-[78px]" />;
}
