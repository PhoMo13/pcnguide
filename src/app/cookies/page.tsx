import type { Metadata } from "next";
import Link from "next/link";
import { ResetCookiePreferences } from "./ResetCookiePreferences";

export const metadata: Metadata = {
  title: "Cookie Policy — PCNGuide",
  description: "PCNGuide cookie policy — what cookies we use and why.",
  alternates: { canonical: "https://www.pcnguide.co.uk/cookies" },
};

type CookieRow = {
  name: string;
  purpose: string;
  type: string;
  duration: string;
};

const essentialCookies: CookieRow[] = [
  {
    name: "pcnguide_cookie_consent",
    purpose: "Stores your cookie preference",
    type: "Essential",
    duration: "1 year",
  },
  {
    name: "pcnguide_deadline",
    purpose: "Saves your PCN deadline tracker data",
    type: "Essential",
    duration: "Until cleared",
  },
  {
    name: "pcnguide_deadline_*",
    purpose: "Stores deadline tracker form data",
    type: "Essential",
    duration: "Until cleared",
  },
];

const analyticsCookies: CookieRow[] = [
  {
    name: "_ga",
    purpose: "Google Analytics — distinguishes users",
    type: "Analytics",
    duration: "2 years",
  },
  {
    name: "_ga_*",
    purpose: "Google Analytics — session data",
    type: "Analytics",
    duration: "2 years",
  },
];

function CookieTable({ rows }: { rows: CookieRow[] }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-surface">
            <th className="px-4 py-3 font-semibold text-foreground">
              Cookie Name
            </th>
            <th className="px-4 py-3 font-semibold text-foreground">Purpose</th>
            <th className="px-4 py-3 font-semibold text-foreground">Type</th>
            <th className="px-4 py-3 font-semibold text-foreground">
              Duration
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.name}
              className={
                index % 2 === 1 ? "bg-surface-subtle" : "bg-background"
              }
            >
              <td className="border-t border-border px-4 py-3 font-mono text-xs text-foreground md:text-sm">
                {row.name}
              </td>
              <td className="border-t border-border px-4 py-3 text-muted">
                {row.purpose}
              </td>
              <td className="border-t border-border px-4 py-3 text-muted">
                {row.type}
              </td>
              <td className="border-t border-border px-4 py-3 text-muted">
                {row.duration}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CookiesPage() {
  return (
    <div className="min-w-0 bg-background">
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            Cookie Policy
          </h1>
          <p className="mt-3 text-sm text-muted">Last updated: May 2026</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl min-w-0 px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16">
        <div className="max-w-full space-y-8 break-words text-base leading-relaxed text-muted md:space-y-10">
          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground md:text-xl">
              1. What are cookies?
            </h2>
            <p className="mt-4">
              Cookies are small text files stored on your device when you visit a
              website. They help websites remember your preferences and
              understand how people use the site.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground md:text-xl">
              2. What cookies does PCNGuide use?
            </h2>
            <h3 className="mt-6 text-base font-semibold text-foreground">
              Essential cookies
            </h3>
            <CookieTable rows={essentialCookies} />
            <h3 className="mt-8 text-base font-semibold text-foreground">
              Analytics cookies (only if accepted)
            </h3>
            <CookieTable rows={analyticsCookies} />
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground md:text-xl">
              3. How to control cookies
            </h2>
            <p className="mt-4">
              You can change your cookie preference at any time by clicking
              &apos;Cookie Settings&apos; below. You can also clear cookies in
              your browser settings at any time.
            </p>
            <ResetCookiePreferences />
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground md:text-xl">
              4. Google Analytics
            </h2>
            <p className="mt-4">
              If you accept analytics cookies, we use Google Analytics to
              understand how visitors use PCNGuide — which pages are most
              helpful, where visitors come from, and how the site can be
              improved. Google Analytics does not identify you personally. See
              Google&apos;s privacy policy:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:text-primary-hover"
              >
                policies.google.com/privacy
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground md:text-xl">
              5. More information
            </h2>
            <p className="mt-4">
              For more information about how we handle your data, see our{" "}
              <Link
                href="/privacy"
                className="font-medium text-primary no-underline hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
