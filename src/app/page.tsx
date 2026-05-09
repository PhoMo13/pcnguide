import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PCNGuide — UK Parking Fine Appeals | Insider Warden Knowledge",
  description:
    "Beat your parking fine with insider knowledge from a serving traffic warden. Free contravention code lookup, PCN checker, deadline tracker and AI-powered appeal letter generator.",
  alternates: { canonical: "https://www.pcnguide.co.uk" },
};

const popularCodes = ["01", "30", "45", "62", "74", "86"] as const;

const whyItems = [
  {
    title: "Built by a real warden",
    body: "Insider knowledge of how PCNs are issued and challenged — perspective most appeal sites cannot match.",
  },
  {
    title: "Free information first",
    body: "Understand contravention codes, common defects, and typical observation periods before you spend a penny.",
  },
  {
    title: "AI-powered letters",
    body: "Appeal drafts grounded in how civil parking enforcement actually works on the street — not generic templates.",
  },
  {
    title: "Trusted guidance",
    body: "Every claim verified against Traffic Penalty Tribunal standards.",
  },
] as const;

export default function HomePage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-24">
          <p className="mb-4 inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted shadow-sm">
            <span
              className="h-2 w-2 rounded-full bg-primary"
              aria-hidden
            />
            Written by a serving UK traffic warden
          </p>
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
            Fight Your Parking Fine — With Insider Knowledge
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted text-balance md:text-lg">
            Built by a serving traffic warden. We know exactly what mistakes get
            fines cancelled.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/check"
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-primary px-5 py-3 text-center text-base font-semibold text-white no-underline shadow-sm hover:bg-primary-hover sm:w-auto"
            >
              Check If Your Fine Can Be Cancelled
            </Link>
            <Link
              href="/codes"
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg border-2 border-primary bg-background px-5 py-3 text-center text-base font-semibold text-primary no-underline hover:bg-surface sm:w-auto"
            >
              Look Up Your Contravention Code
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-border py-8 md:py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xl font-semibold text-foreground md:text-2xl lg:text-3xl">
            How it works
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            Three straightforward steps from code to a structured appeal you
            can edit and submit.
          </p>
          <ol className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                step: "1",
                title: "Enter your contravention code",
                text: "Find the two-digit code on your PCN — it tells you what the council says you did wrong.",
              },
              {
                step: "2",
                title: "We check for warden mistakes",
                text: "We flag common procedural and evidence issues councils often rely on — so you know what to challenge.",
              },
              {
                step: "3",
                title: "Generate your appeal letter",
                text: "Get a clear, professional letter tailored to your situation, ready to copy to the council or tribunal.",
              },
            ].map((item) => (
              <li
                key={item.step}
                className="relative min-w-0 rounded-lg border border-border bg-background p-4 shadow-sm md:p-6"
              >
                <span className="font-mono text-sm font-semibold text-accent">
                  Step {item.step}
                </span>
                <h3 className="mt-2 font-heading text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why PCNGuide */}
      <section className="border-b border-border bg-surface py-8 md:py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xl font-semibold text-foreground md:text-2xl lg:text-3xl">
            Why PCNGuide
          </h2>
          <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {whyItems.map((item) => (
              <li
                key={item.title}
                className="min-w-0 rounded-lg border border-border bg-background p-4 md:p-6"
              >
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contravention code search */}
      <section className="border-b border-border py-8 md:py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xl font-semibold text-foreground md:text-2xl lg:text-3xl">
            Contravention code search
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            Enter the code printed on your penalty charge notice. Quick links
            below cover some of the most searched codes.
          </p>
          <form
            className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-end"
            action="/codes"
            method="get"
            role="search"
          >
            <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-foreground">
              Contravention code
              <input
                name="code"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={3}
                placeholder="e.g. 01, 30, 45"
                autoComplete="off"
                className="rounded-lg border border-border bg-background px-4 py-3 font-mono text-base text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </label>
            <button
              type="submit"
              className="min-h-[44px] w-full rounded-lg bg-primary px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-hover sm:w-auto sm:shrink-0"
            >
              Search
            </button>
          </form>
          <div className="mt-6">
            <p className="text-sm font-medium text-foreground">
              Popular codes
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {popularCodes.map((code) => (
                <li key={code}>
                  <Link
                    href={`/codes?code=${code}`}
                    className="inline-flex min-h-[44px] min-w-[2.75rem] items-center justify-center rounded-lg border border-border bg-surface px-3 py-2 font-mono text-sm font-semibold text-primary no-underline hover:border-primary hover:bg-background"
                  >
                    {code}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Appeal letter CTA */}
      <section className="py-8 md:py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-border bg-primary px-4 py-8 text-center text-white sm:px-10 sm:py-10">
            <h2 className="font-heading text-xl font-semibold text-white md:text-2xl lg:text-3xl">
              Ready to Appeal?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-white">
              From £6.99 — Generate your appeal letter in minutes
            </p>
            <Link
              href="/appeal"
              className="mx-auto mt-6 inline-flex min-h-[44px] w-full max-w-md items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary no-underline shadow-sm hover:bg-surface sm:mx-0 sm:w-auto sm:max-w-none"
            >
              Generate appeal letter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
