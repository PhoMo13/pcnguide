"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export const COOKIE_CONSENT_KEY = "pcnguide_cookie_consent";
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

export type CookieConsent = "accepted" | "rejected";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function loadGoogleAnalytics() {
  if (typeof window === "undefined") return;
  if (document.getElementById("ga-script")) return;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);

  const script = document.createElement("script");
  script.id = "ga-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

function readConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (value === "accepted" || value === "rejected") return value;
  return null;
}

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const dismissBanner = useCallback((choice: CookieConsent) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, choice);
    if (choice === "accepted") {
      loadGoogleAnalytics();
    }
    setIsClosing(true);
    setIsVisible(false);
    window.setTimeout(() => setShowBanner(false), 300);
  }, []);

  useEffect(() => {
    const existing = readConsent();
    if (existing === "accepted") {
      loadGoogleAnalytics();
      return;
    }
    if (existing === "rejected") {
      return;
    }
    setShowBanner(true);
    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!showBanner) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-[#E5E7EB] bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out ${
        isVisible && !isClosing ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-6 md:py-5 lg:px-8">
        <p
          id="cookie-banner-description"
          className="text-sm leading-relaxed text-foreground md:max-w-2xl md:text-[0.9375rem]"
        >
          <span id="cookie-banner-title" className="sr-only">
            Cookie consent
          </span>
          🍪 We use cookies to improve your experience. Essential cookies keep
          the site working. We&apos;d also like to use analytics cookies to
          understand how people use PCNGuide — this helps us improve the
          service.
        </p>
        <div className="flex w-full shrink-0 flex-col gap-2 sm:flex-row sm:items-center md:w-auto">
          <button
            type="button"
            onClick={() => dismissBanner("accepted")}
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white no-underline shadow-sm transition-colors hover:bg-primary-hover sm:w-auto"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={() => dismissBanner("rejected")}
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg border-2 border-primary bg-white px-4 py-2.5 text-sm font-semibold text-primary no-underline transition-colors hover:bg-surface-subtle sm:w-auto"
          >
            Essential only
          </button>
          <Link
            href="/cookies"
            className="inline-flex min-h-[44px] w-full items-center justify-center px-4 py-2.5 text-center text-sm font-medium text-primary no-underline hover:text-primary-hover hover:underline sm:w-auto"
          >
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
