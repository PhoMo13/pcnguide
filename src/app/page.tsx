import Link from "next/link";

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
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="mb-4 inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted shadow-sm">
            <span
              className="h-2 w-2 rounded-full bg-primary"
              aria-hidden
            />
            Written by a serving UK traffic warden
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            Fight Your Parking Fine — With Insider Knowledge
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted text-balance">
            Built by a serving traffic warden. We know exactly what mistakes get
            fines cancelled.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/check-pcn"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-center text-base font-semibold text-white no-underline shadow-sm hover:bg-primary-hover"
            >
              Check If Your Fine Can Be Cancelled
            </Link>
            <Link
              href="/codes"
              className="inline-flex items-center justify-center rounded-lg border-2 border-primary bg-background px-5 py-3 text-center text-base font-semibold text-primary no-underline hover:bg-surface"
            >
              Look Up Your Contravention Code
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-border py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            How it works
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            Three straightforward steps from code to a structured appeal you
            can edit and submit.
          </p>
          <ol className="mt-10 grid gap-6 sm:grid-cols-3">
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
                className="relative rounded-lg border border-border bg-background p-6 shadow-sm"
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
      <section className="border-b border-border bg-surface py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            Why PCNGuide
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {whyItems.map((item) => (
              <li
                key={item.title}
                className="rounded-lg border border-border bg-background p-6"
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
      <section className="border-b border-border py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
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
              className="rounded-lg bg-primary px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-hover sm:shrink-0"
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
                    className="inline-flex min-w-[2.75rem] items-center justify-center rounded-lg border border-border bg-surface px-3 py-2 font-mono text-sm font-semibold text-primary no-underline hover:border-primary hover:bg-background"
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
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-border bg-primary px-6 py-10 text-center text-white sm:px-10">
            <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
              Ready to Appeal?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-white/90">
              From £6.99 — Generate your appeal letter in minutes
            </p>
            <Link
              href="/appeal-letter"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary no-underline shadow-sm hover:bg-surface"
            >
              Generate appeal letter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
