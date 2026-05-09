import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About PCNGuide — Built by a Serving Traffic Warden",
  description:
    "PCNGuide is built by a serving Civil Enforcement Officer in Greater Manchester. Insider knowledge of how PCNs are issued and what gets them cancelled.",
  alternates: { canonical: "https://www.pcnguide.co.uk/about" },
};

const approachCards = [
  {
    title: "Insider knowledge",
    body: "Our content is written by someone who issues PCNs for a living. We know what CEOs check, what mistakes get made, and what the rules actually say — not just what councils publish.",
  },
  {
    title: "Accuracy first",
    body: "Every claim on PCNGuide is held to one standard: could it be defended in front of a Traffic Penalty Tribunal adjudicator? If not, it doesn't go on the site.",
  },
  {
    title: "Not legal advice",
    body: "We provide information and tools to help you understand your options. We are not solicitors and cannot guarantee outcomes. For complex cases, we recommend seeking independent legal advice.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="min-w-0 bg-background">
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            About PCNGuide
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 sm:px-6 md:space-y-12 md:py-12 lg:px-8 lg:py-16">
        <section className="mx-auto max-w-3xl min-w-0">
          <h2 className="font-heading text-lg font-semibold text-foreground md:text-xl lg:text-2xl">
            Who we are
          </h2>
          <div className="mt-4 max-w-full space-y-4 text-base text-muted leading-relaxed">
            <p>
              PCNGuide is a UK parking fine information and appeal resource built
              by a serving Civil Enforcement Officer (traffic warden) based in
              Greater Manchester.
            </p>
            <p>
              We built this site because we saw the same thing every day on the
              job — drivers getting fines they could have challenged, but having no
              idea where to start. The information exists, but it&apos;s buried
              in legislation and council websites that are difficult to navigate.
            </p>
            <p>
              PCNGuide brings that knowledge into one place, in plain English.
            </p>
          </div>
        </section>

        <section className="min-w-0">
          <h2 className="font-heading text-lg font-semibold text-foreground md:text-xl lg:text-2xl">
            Our approach
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {approachCards.map((card) => (
              <div
                key={card.title}
                className="min-w-0 rounded-lg border border-border bg-background p-4 shadow-sm md:p-6"
              >
                <h3 className="font-heading text-base font-semibold text-foreground md:text-lg">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-3xl min-w-0">
          <h2 className="font-heading text-lg font-semibold text-foreground md:text-xl lg:text-2xl">
            What we cover
          </h2>
          <p className="mt-4 max-w-full text-base text-muted leading-relaxed">
            PCNGuide covers Penalty Charge Notices issued by local councils in
            England, Wales and Scotland under the Traffic Management Act 2004. We
            do not cover private parking tickets issued by companies such as Euro
            Car Parks, NCP or Excel — these are governed by different rules and
            different appeals processes.
          </p>
        </section>

        <section className="mx-auto max-w-3xl min-w-0 rounded-lg border border-border bg-surface p-4 sm:p-6 md:p-8">
          <h2 className="font-heading text-lg font-semibold text-foreground md:text-xl lg:text-2xl">
            Contact
          </h2>
          <p className="mt-4 max-w-full text-base text-muted leading-relaxed">
            Have a question or spotted an inaccuracy? We take accuracy seriously —
            if you believe any information on PCNGuide is incorrect, please get in
            touch.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex min-h-[44px] items-center font-semibold text-primary no-underline hover:text-primary-hover"
          >
            Go to contact page →
          </Link>
        </section>

        <div
          className="mx-auto max-w-3xl min-w-0 rounded-lg border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-950 sm:px-5 sm:py-5"
          role="note"
        >
          <p className="max-w-full break-words leading-relaxed">
            PCNGuide is an information resource. It is not a law firm and does
            not provide legal advice. Information on this site is for guidance
            only. Always verify details with your issuing council and check the
            correspondence you receive.
          </p>
        </div>
      </div>
    </div>
  );
}
