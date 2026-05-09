import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Appeal a Parking Fine — The Complete Stage by Stage Guide",
  description:
    "Step by step guide to appealing a UK parking fine. From informal challenge to Traffic Penalty Tribunal — every stage explained with deadlines and what to do at each step.",
  alternates: { canonical: "https://www.pcnguide.co.uk/appeal-stages" },
};

const stageStyles = {
  green: {
    circle: "bg-primary text-white ring-primary",
    line: "bg-primary/40",
  },
  amber: {
    circle: "bg-amber-500 text-white ring-amber-500",
    line: "bg-amber-300",
  },
  red: {
    circle: "bg-red-600 text-white ring-red-600",
    line: "bg-red-200",
  },
} as const;

type StageTone = keyof typeof stageStyles;

function TipsBox({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 rounded-lg border border-emerald-200 bg-[#F0FDF4] px-4 py-3 text-sm leading-relaxed text-foreground md:text-base">
      {children}
    </div>
  );
}

function WarningBox({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 rounded-lg border border-amber-200 bg-[#FFFBEB] px-4 py-3 text-sm leading-relaxed text-foreground md:text-base">
      {children}
    </div>
  );
}

export default function AppealStagesPage() {
  return (
    <div className="min-w-0 bg-background">
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16">
          <h1 className="text-balance font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            How to Appeal a Parking Fine — Every Stage Explained
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Most people give up after the first rejection. But there are up to
            four separate stages — and you can win at any of them. Here is
            exactly what happens at each stage.
          </p>
          <div className="mt-6">
            <p className="border-l-4 border-amber-400 bg-amber-50/80 px-4 py-3 text-sm leading-relaxed text-foreground">
              <span className="font-semibold text-foreground">
                From the warden&apos;s perspective:{" "}
              </span>
              The appeals process is deliberately tiered. Councils reject many
              first challenges hoping drivers give up. An independent adjudicator
              overturns a significant proportion of cases that reach tribunal.
              Don&apos;t give up after the first no.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16">
        {/* Timeline — desktop: vertical stepped; mobile: stacked */}
        <div className="relative space-y-0">
          {(
            [
              {
                n: 1,
                tone: "green" as StageTone,
                title: "Informal Challenge to the Council",
                deadline:
                  "Within 28 days of PCN date (within 14 days to preserve reduced rate)",
                body: (
                  <>
                    <p>
                      This is your first opportunity to challenge. Write to the
                      council explaining why you believe the PCN should be
                      cancelled. There is no set format — but a clear, factual
                      letter referencing your specific grounds is most effective.
                    </p>
                    <p className="mt-4">
                      The council will consider your challenge and either:
                    </p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      <li>Cancel the PCN — matter closed</li>
                      <li>
                        Reject your challenge — you receive a Notice to Owner
                      </li>
                      <li>
                        Make no response within 56 days — the PCN is deemed
                        cancelled
                      </li>
                    </ul>
                    <p className="mt-4 font-medium text-foreground">
                      Important: If you challenge within 14 days and the council
                      rejects your challenge, they must re-offer the reduced rate.
                      You do not lose your discount by challenging early.
                    </p>
                    <TipsBox>
                      <p className="m-0 font-medium">Tips</p>
                      <ul className="mt-2 list-none space-y-2 p-0">
                        <li>
                          ✓ Be factual and specific — reference your
                          contravention code and exact grounds
                        </li>
                        <li>
                          ✓ Include photographs and any supporting evidence
                        </li>
                        <li>✓ Keep a copy of everything you send</li>
                        <li>
                          ✓ Challenge in writing — phone calls are not formal
                          challenges
                        </li>
                      </ul>
                    </TipsBox>
                    <div className="mt-6">
                      <Link
                        href="/appeal"
                        className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-primary px-5 py-3 text-center text-sm font-semibold text-white no-underline shadow-sm hover:bg-primary-hover sm:w-auto"
                      >
                        Generate your challenge letter — from £6.99
                      </Link>
                    </div>
                  </>
                ),
              },
              {
                n: 2,
                tone: "amber" as StageTone,
                title: "Notice to Owner — Formal Representations",
                deadline: "28 days from date of Notice to Owner",
                body: (
                  <>
                    <p>
                      If your informal challenge is rejected — or if you did not
                      challenge — the council will send a Notice to Owner (NtO)
                      to the registered keeper of the vehicle. This is a formal
                      document giving you the right to make formal
                      representations.
                    </p>
                    <p className="mt-4">
                      Formal representations are more serious than an informal
                      challenge. The council must consider them and give a formal
                      response. The statutory grounds for formal representations
                      are:
                    </p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      <li>The contravention did not occur</li>
                      <li>The PCN was issued to the wrong person</li>
                      <li>The penalty charge exceeded the relevant amount</li>
                      <li>The Traffic Regulation Order was invalid</li>
                      <li>
                        There was a procedural impropriety on the part of the
                        council
                      </li>
                      <li>The vehicle was used without your consent (stolen)</li>
                      <li>
                        You are a hire company and can name the hirer
                      </li>
                    </ul>
                    <p className="mt-4">
                      If the council accepts your representations, the PCN is
                      cancelled. If rejected, you receive a Notice of Rejection
                      — which gives you the right to appeal to the independent
                      tribunal.
                    </p>
                    <WarningBox>
                      <span className="font-semibold">⚠️ Do not ignore the Notice to Owner.</span>{" "}
                      If you miss the 28-day window, a Charge Certificate is
                      issued and the penalty increases by 50%. You also lose the
                      right to make formal representations.
                    </WarningBox>
                  </>
                ),
              },
              {
                n: 3,
                tone: "amber" as StageTone,
                title: "Appeal to the Independent Adjudicator",
                deadline: "28 days from Notice of Rejection",
                body: (
                  <>
                    <p>
                      If the council rejects your formal representations, you
                      have the right to appeal to an independent adjudicator —
                      free of charge.
                    </p>
                    <p className="mt-4">
                      Outside London: Traffic Penalty Tribunal (
                      <a
                        href="https://www.trafficpenaltytribunal.gov.uk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-primary underline decoration-primary/30 underline-offset-2"
                      >
                        trafficpenaltytribunal.gov.uk
                      </a>
                      )
                      <br />
                      In London: London Tribunals (
                      <a
                        href="https://www.londontribunals.gov.uk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-primary underline decoration-primary/30 underline-offset-2"
                      >
                        londontribunals.gov.uk
                      </a>
                      )
                    </p>
                    <p className="mt-4">
                      Adjudicators are qualified lawyers, completely independent
                      from councils. Their decisions are binding — if they cancel
                      your PCN, the council must comply.
                    </p>
                    <p className="mt-4">
                      Most appeals are decided on written evidence — you submit
                      your case online, the council submits theirs, and the
                      adjudicator decides. You do not usually need to attend in
                      person.
                    </p>
                    <p className="mt-4">The adjudicator can:</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      <li>
                        Allow your appeal — PCN cancelled, council must comply
                      </li>
                      <li>Dismiss your appeal — penalty becomes payable</li>
                      <li>Request more information from either party</li>
                    </ul>
                    <p className="mt-4">
                      Appealing to the tribunal does not increase the penalty. If
                      you lose, you pay the original amount — not more.
                    </p>
                    <div className="mt-4 rounded-lg border border-emerald-200 bg-[#F0FDF4] px-4 py-3 text-sm leading-relaxed md:text-base">
                      <p className="m-0 font-medium text-emerald-950">
                        Success at tribunal
                      </p>
                      <p className="mt-2 text-emerald-950">
                        Adjudicators overturn a significant proportion of cases. A
                        well-evidenced appeal with clear grounds has a genuine
                        chance of success — especially where signage, procedural
                        errors or CEO mistakes are involved.
                      </p>
                    </div>
                  </>
                ),
              },
              {
                n: 4,
                tone: "red" as StageTone,
                title: "Charge Certificate — If You Miss the Deadlines",
                deadline:
                  "Issued 28 days after Notice to Owner if unpaid and unchallenged",
                body: (
                  <>
                    <p>
                      If you miss the formal representations deadline, the
                      council issues a Charge Certificate. This increases the
                      penalty by 50%.
                    </p>
                    <p className="mt-4">After a Charge Certificate:</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      <li>
                        You can no longer make formal representations to the
                        council
                      </li>
                      <li>
                        You must either pay the increased amount or apply to the
                        Traffic Enforcement Centre (TEC)
                      </li>
                    </ul>
                    <p className="mt-4 font-medium text-foreground">
                      The Traffic Enforcement Centre (TEC):
                    </p>
                    <p className="mt-2">
                      If you believe you never received the original PCN or
                      Notice to Owner, you can make an Out of Time Witness
                      Statement to the TEC. If accepted, the Charge Certificate
                      is cancelled and the case goes back to the Notice to Owner
                      stage.
                    </p>
                    <p className="mt-4">
                      Contact TEC:{" "}
                      <a
                        href="tel:03001231059"
                        className="font-semibold text-primary no-underline hover:underline"
                      >
                        0300 123 1059
                      </a>{" "}
                      |{" "}
                      <a
                        href="https://www.gov.uk/guidance/traffic-enforcement-centre-at-northampton-county-court"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-primary underline decoration-primary/30 underline-offset-2"
                      >
                        TEC (GOV.UK)
                      </a>
                    </p>
                    <WarningBox>
                      <span className="font-semibold">
                        🚨 If you receive a County Court order, contact TEC
                        immediately.
                      </span>{" "}
                      Do not ignore it. Enforcement agents (bailiffs) can be
                      instructed to recover the debt.
                    </WarningBox>
                  </>
                ),
              },
              {
                n: 5,
                tone: "red" as StageTone,
                title: "County Court Registration",
                deadline: "If Charge Certificate unpaid after 14 days",
                body: (
                  <>
                    <p>
                      If the Charge Certificate is not paid within 14 days, the
                      council applies to the Traffic Enforcement Centre at
                      Northampton County Court to register the debt. At this
                      stage:
                    </p>
                    <ul className="mt-4 list-disc space-y-1 pl-5">
                      <li>The debt is registered as a County Court judgment</li>
                      <li>Enforcement agents (bailiffs) can be instructed</li>
                      <li>Your credit record may be affected</li>
                    </ul>
                    <p className="mt-4">
                      If you receive notice of County Court proceedings, contact
                      TEC immediately on{" "}
                      <a
                        href="tel:03001231059"
                        className="font-semibold text-primary no-underline hover:underline"
                      >
                        0300 123 1059
                      </a>
                      . It may still be possible to have the debt set aside if
                      you have a valid reason for not responding earlier — such
                      as never having received the PCN or NtO.
                    </p>
                  </>
                ),
              },
            ] as const
          ).map((stage, index, arr) => {
            const styles = stageStyles[stage.tone];
            const isLast = index === arr.length - 1;
            return (
              <div
                key={stage.n}
                className="relative flex gap-4 pb-10 md:gap-6 md:pb-12"
              >
                <div className="relative flex shrink-0 flex-col items-center self-stretch">
                  <div
                    className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-bold shadow-md ring-4 ring-background ${styles.circle}`}
                    aria-hidden
                  >
                    {stage.n}
                  </div>
                  {!isLast ? (
                    <div
                      className={`absolute left-1/2 top-12 bottom-0 w-0.5 -translate-x-1/2 ${styles.line}`}
                      aria-hidden
                    />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1 rounded-lg border border-border bg-background p-4 shadow-sm md:p-6">
                  <h2 className="font-heading text-lg font-semibold text-foreground md:text-xl">
                    {stage.title}
                  </h2>
                  <p className="mt-2 text-sm font-medium text-primary">
                    {stage.deadline}
                  </p>
                  <div className="mt-4 space-y-0 text-sm leading-relaxed text-muted md:text-base">
                    {stage.body}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary box */}
        <section className="mt-4 rounded-lg border border-border bg-surface p-5 md:p-8">
          <h2 className="font-heading text-lg font-semibold text-foreground md:text-xl">
            Typical timeline from PCN issue
          </h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground md:text-base">
            <li>
              <span className="font-semibold">Day 0</span> — PCN issued
            </li>
            <li>
              <span className="font-semibold">Day 14</span> — Reduced rate
              deadline
            </li>
            <li>
              <span className="font-semibold">Day 28</span> — Informal challenge
              / payment deadline
            </li>
            <li>
              <span className="font-semibold">Day 56</span> — Notice to Owner
              typically issued
            </li>
            <li>
              <span className="font-semibold">Day 84</span> — Formal
              representations deadline (NtO + 28 days)
            </li>
            <li>
              <span className="font-semibold">Day 112</span> — Charge
              Certificate issued if unpaid
            </li>
            <li>
              <span className="font-semibold">Day 126</span> — County Court
              registration if unpaid
            </li>
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            These are typical timescales. Actual dates will be shown on your
            correspondence. Use our{" "}
            <Link
              href="/deadlines"
              className="font-semibold text-primary no-underline hover:underline"
            >
              deadline tracker
            </Link>{" "}
            for your specific dates.
          </p>
        </section>

        {/* Bottom CTAs */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <div className="flex min-w-0 flex-col rounded-lg border border-border bg-background p-5 shadow-sm md:p-6">
            <h3 className="font-heading text-lg font-semibold text-foreground">
              Check Your Grounds First
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              Use our free PCN Checker to find out whether you have grounds to
              challenge before writing your letter.
            </p>
            <Link
              href="/check"
              className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded-lg border-2 border-primary bg-background px-5 py-3 text-center text-sm font-semibold text-primary no-underline hover:bg-surface"
            >
              Check my PCN — Free
            </Link>
          </div>
          <div className="flex min-w-0 flex-col rounded-lg border border-border bg-background p-5 shadow-sm md:p-6">
            <h3 className="font-heading text-lg font-semibold text-foreground">
              Generate Your Appeal Letter
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              Ready to challenge? Our AI-powered letter generator builds your
              appeal from your specific grounds — from £6.99.
            </p>
            <Link
              href="/appeal"
              className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-primary px-5 py-3 text-center text-sm font-semibold text-white no-underline shadow-sm hover:bg-primary-hover"
            >
              Generate appeal letter
            </Link>
          </div>
        </div>

        <div
          className="mt-10 rounded-lg border border-border bg-background px-4 py-4 text-sm leading-relaxed text-muted"
          role="note"
        >
          PCNGuide is an information resource. It is not a law firm and does not
          provide legal advice. Always verify details with your issuing council
          and your correspondence.
        </div>
      </div>
    </div>
  );
}
