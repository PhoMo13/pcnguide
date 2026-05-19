"use client";

import { COOKIE_CONSENT_KEY } from "@/components/ui/CookieBanner";

export function ResetCookiePreferences() {
  return (
    <button
      type="button"
      onClick={() => {
        localStorage.removeItem(COOKIE_CONSENT_KEY);
        window.location.reload();
      }}
      className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-lg border-2 border-primary bg-background px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-surface-subtle"
    >
      Change my cookie preferences
    </button>
  );
}
