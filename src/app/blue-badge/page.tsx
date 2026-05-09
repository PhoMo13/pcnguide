import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blue Badge Parking Rules — Where You Can and Cannot Park",
  description:
    "Complete guide to Blue Badge parking rules across the UK. Where you can park, where you cannot, London rules, Scotland rules, and what gets Blue Badge holders fined.",
  alternates: { canonical: "https://www.pcnguide.co.uk/blue-badge" },
};

function WardenStrip({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-4 border-amber-400 bg-amber-50/80 px-4 py-3 text-sm leading-relaxed text-foreground">
      {children}
    </p>
  );
}

function GoldenRuleCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-3 rounded-lg border border-primary/20 bg-white p-4 shadow-sm md:gap-4 md:p-5">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
        aria-hidden
      >
        ✓
      </span>
      <div className="min-w-0">
        <h3 className="font-heading text-base font-semibold text-foreground md:text-lg">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
          {body}
        </p>
      </div>
    </div>
  );
}

export default function BlueBadgePage() {
  return (
    <div className="min-w-0 bg-background">
      {/* Hero */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl lg:text-4xl text-balance">
            Blue Badge Parking — Know Your Rights (And Your Limits)
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            A Blue Badge is not a licence to park anywhere. Here&apos;s exactly
            where you can and cannot park — including the rules most badge
            holders get wrong.
          </p>
          <div className="mt-6">
            <WardenStrip>
              <span className="font-semibold text-foreground">
                From the warden&apos;s perspective:{" "}
              </span>
              Blue Badge misuse is one of the most common reasons disabled
              drivers get fines they could have avoided. Most of these PCNs come
              from genuine misunderstanding, not deliberate abuse. This page
              exists to prevent that.
            </WardenStrip>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-10 px-4 py-8 sm:px-6 md:space-y-12 md:py-12 lg:px-8 lg:py-16">
        {/* Disclaimer */}
        <div
          className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-4 text-sm leading-relaxed text-amber-950 sm:px-5 sm:py-5"
          role="note"
        >
          <p className="m-0 font-medium">
            ⚠️ Rules vary by location — especially in London and Scotland.
            Always check local signs before parking. The information on this page
            reflects national rules — your council may have additional
            restrictions or exemptions. When in doubt, check your council&apos;s
            website or contact them directly.
          </p>
        </div>

        {/* Section 1 */}
        <section className="min-w-0">
          <h2 className="font-heading text-xl font-semibold text-foreground md:text-2xl">
            The Golden Rules{" "}
            <span className="font-normal text-muted">(apply everywhere)</span>
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:gap-5">
            <GoldenRuleCard
              title="Display your badge correctly"
              body="Face up on the dashboard, hologram visible, photograph side down. CEOs can and will issue PCNs if the badge is not clearly visible through the windscreen — even if it is valid."
            />
            <GoldenRuleCard
              title="Display your parking clock when required"
              body="When parking on yellow lines or in time-limited bays, set your parking clock to the quarter-hour you arrived and display it alongside your badge. Required in England and Wales — not required in Scotland."
            />
            <GoldenRuleCard
              title="The badge is for you only"
              body="Your badge must only be used when you are travelling in the vehicle — as driver or passenger. Misuse by family or friends is a criminal offence carrying a fine of up to £1,000 and confiscation of the badge."
            />
            <GoldenRuleCard
              title="Always check the signs"
              body="National rules give you rights. Local signs can add restrictions. Never assume — always read the signs at the location before parking."
            />
          </div>
        </section>

        {/* Section 2 */}
        <section className="min-w-0">
          <h2 className="font-heading text-xl font-semibold text-foreground md:text-2xl">
            Where You CAN Park
          </h2>
          <div className="mt-6 space-y-6">
            <div className="overflow-hidden rounded-lg border border-border shadow-sm">
              <div className="bg-primary px-4 py-3 text-sm font-semibold text-white">
                On-street — England and Wales
              </div>
              <ul className="divide-y divide-border bg-background text-sm leading-relaxed text-foreground md:text-base">
                <li className="flex gap-2 px-4 py-3">
                  <span className="shrink-0" aria-hidden>
                    ✅
                  </span>
                  <span>
                    Disabled parking bays — free, for as long as you need
                    (unless a sign states a time limit)
                  </span>
                </li>
                <li className="flex gap-2 px-4 py-3">
                  <span className="shrink-0" aria-hidden>
                    ✅
                  </span>
                  <span>
                    Single and double yellow lines — up to 3 hours, must display
                    badge and clock
                  </span>
                </li>
                <li className="flex gap-2 px-4 py-3">
                  <span className="shrink-0" aria-hidden>
                    ✅
                  </span>
                  <span>
                    Pay and display bays — free, for as long as you need
                  </span>
                </li>
                <li className="flex gap-2 px-4 py-3">
                  <span className="shrink-0" aria-hidden>
                    ✅
                  </span>
                  <span>
                    Pay by phone bays — free, for as long as you need
                  </span>
                </li>
                <li className="flex gap-2 px-4 py-3">
                  <span className="shrink-0" aria-hidden>
                    ✅
                  </span>
                  <span>Meters — free, for as long as you need</span>
                </li>
                <li className="flex gap-2 px-4 py-3">
                  <span className="shrink-0" aria-hidden>
                    ✅
                  </span>
                  <span>
                    Residents&apos; permit bays — free for up to 3 hours (display
                    badge and clock)
                  </span>
                </li>
                <li className="flex gap-2 px-4 py-3">
                  <span className="shrink-0" aria-hidden>
                    ✅
                  </span>
                  <span>
                    Limited waiting bays — free, for as long as you need
                    (unless signed otherwise)
                  </span>
                </li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-lg border border-border shadow-sm">
              <div className="bg-primary px-4 py-3 text-sm font-semibold text-white">
                On-street — Scotland
              </div>
              <ul className="divide-y divide-border bg-background text-sm leading-relaxed text-foreground md:text-base">
                <li className="px-4 py-3 font-medium text-foreground">
                  All of the England and Wales items above, plus:
                </li>
                <li className="flex gap-2 px-4 py-3">
                  <span className="shrink-0" aria-hidden>
                    ✅
                  </span>
                  <span>
                    Yellow lines — no time limit (unlike England and Wales
                    where 3 hours applies)
                  </span>
                </li>
                <li className="flex gap-2 px-4 py-3">
                  <span className="shrink-0" aria-hidden>
                    ✅
                  </span>
                  <span>
                    No need to display a parking clock on yellow lines in
                    Scotland
                  </span>
                </li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-lg border border-border shadow-sm">
              <div className="bg-primary px-4 py-3 text-sm font-semibold text-white">
                Off-street (car parks)
              </div>
              <ul className="divide-y divide-border bg-background text-sm leading-relaxed text-foreground md:text-base">
                <li className="flex gap-2 px-4 py-3">
                  <span className="shrink-0" aria-hidden>
                    ✅
                  </span>
                  <span>
                    Council car parks — usually free or reduced charge in
                    designated disabled bays
                  </span>
                </li>
                <li className="flex gap-2 px-4 py-3">
                  <span className="shrink-0" aria-hidden>
                    ⚠️
                  </span>
                  <span>
                    Private car parks (supermarkets, hospitals, airports) —
                    rules set by the operator, not covered by the Blue Badge
                    scheme. Check signs. You may still need to pay.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="min-w-0">
          <h2 className="font-heading text-xl font-semibold text-foreground md:text-2xl">
            Where You CANNOT Park
          </h2>
          <ul className="mt-6 space-y-4 text-sm leading-relaxed text-foreground md:text-base">
            {[
              "Loading bays — Blue Badges do not exempt you from loading bay restrictions. Kerb marks (yellow spikes) indicate loading restrictions. This is one of the most common mistakes.",
              "Red routes — No exemption during operating hours. Double red lines mean no stopping at any time for anyone.",
              "Bus stops and bus stands — Not permitted, even briefly.",
              "School keep-clear zigzag markings — No stopping during restricted hours.",
              "Pedestrian crossing zigzag areas — No stopping at any time.",
              "Suspended bays — Suspensions apply to everyone including Blue Badge holders.",
              "Double yellow lines in central London — Unlike the rest of England, Blue Badge holders cannot park on double yellow lines in the 4 central London boroughs (see London section below).",
              "Residents' bays beyond 3 hours — You can park free for up to 3 hours but not indefinitely.",
              "Bays reserved for specific vehicles — Taxi ranks, loading bays, doctor's bays, police bays. Your badge does not override these.",
              "Private land without permission — The Blue Badge scheme only applies on public highways.",
              "Anywhere that causes an obstruction or danger — Even with a valid badge, you can be fined for dangerous or obstructive parking.",
            ].map((text) => (
              <li key={text} className="flex gap-3">
                <span className="shrink-0 text-red-600" aria-hidden>
                  ❌
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 4 — London */}
        <section className="-mx-4 rounded-none border-y border-blue-200 bg-[#EFF6FF] px-4 py-8 sm:-mx-6 sm:rounded-lg sm:border sm:px-6 md:py-10 lg:-mx-8 lg:px-8">
          <div className="mx-auto max-w-3xl min-w-0">
            <h2 className="font-heading text-xl font-semibold text-foreground md:text-2xl">
              London — Different Rules Apply
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              London has stricter Blue Badge rules than the rest of England.
              There are also 4 central London boroughs where the national Blue
              Badge scheme does not apply at all.
            </p>

            <h3 className="mt-8 font-heading text-lg font-semibold text-foreground">
              All of London
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed md:text-base">
              <li className="flex gap-3">
                <span className="shrink-0" aria-hidden>
                  ❌
                </span>
                <span>
                  Cannot park on double yellow lines anywhere in London (unlike
                  rest of England where 3 hours is permitted)
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0" aria-hidden>
                  ❌
                </span>
                <span>No exemption on red routes</span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0" aria-hidden>
                  ✅
                </span>
                <span>Can park in designated Blue Badge bays</span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0" aria-hidden>
                  ✅
                </span>
                <span>
                  Can register for Congestion Charge exemption (100% discount —
                  requires £10 registration with TfL)
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0" aria-hidden>
                  ⚠️
                </span>
                <span>
                  Always check signs — London boroughs enforce strictly
                </span>
              </li>
            </ul>

            <h3 className="mt-10 font-heading text-lg font-semibold text-foreground">
              The 4 central London boroughs
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="min-w-0 rounded-lg border border-blue-200 bg-white p-4 shadow-sm md:p-5">
                <h4 className="font-heading text-base font-semibold text-foreground">
                  City of Westminster
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  The national Blue Badge scheme does not apply. Westminster
                  operates its own White Badge scheme for residents and workers
                  only. Visitors with a Blue Badge cannot park on yellow lines.
                  Use designated Blue Badge bays only.
                </p>
              </div>
              <div className="min-w-0 rounded-lg border border-blue-200 bg-white p-4 shadow-sm md:p-5">
                <h4 className="font-heading text-base font-semibold text-foreground">
                  City of London
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  The national Blue Badge scheme does not apply. The City of
                  London operates its own Red Badge scheme for residents and
                  those working in the area. Visitors must use designated Blue
                  Badge bays. Cannot park on yellow lines.
                </p>
              </div>
              <div className="min-w-0 rounded-lg border border-blue-200 bg-white p-4 shadow-sm md:p-5">
                <h4 className="font-heading text-base font-semibold text-foreground">
                  Royal Borough of Kensington and Chelsea
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  The national Blue Badge scheme does not apply in full. Blue
                  Badge holders can park in designated disabled bays (up to 4
                  hours Mon–Fri 8:30am–6:30pm, unlimited outside these hours).
                  The only central London borough where Blue Badge holders can
                  stop briefly on single yellow lines — up to 20 minutes to drop
                  off or pick up a disabled person, with no loading restrictions.
                  Cannot park on double yellow lines.
                </p>
              </div>
              <div className="min-w-0 rounded-lg border border-blue-200 bg-white p-4 shadow-sm md:p-5">
                <h4 className="font-heading text-base font-semibold text-foreground">
                  London Borough of Camden (part)
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  The part of Camden within the central London boundary operates
                  differently. Camden runs its own Green Badge scheme for
                  residents and workers. Visitors must use designated Blue Badge
                  bays.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <WardenStrip>
                If you are visiting central London, you are not covered by these
                local schemes. Stick to designated Blue Badge bays only and check
                local signs carefully.
              </WardenStrip>
            </div>
          </div>
        </section>

        {/* Section 5 — Scotland */}
        <section className="-mx-4 rounded-none border-y border-violet-200 bg-[#F5F3FF] px-4 py-8 sm:-mx-6 sm:rounded-lg sm:border sm:px-6 md:py-10 lg:-mx-8 lg:px-8">
          <div className="mx-auto max-w-3xl min-w-0">
            <h2 className="font-heading text-xl font-semibold text-foreground md:text-2xl">
              Scotland — Key Differences
            </h2>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed md:text-base">
              <li className="flex gap-3">
                <span className="shrink-0" aria-hidden>
                  ✅
                </span>
                <span>
                  No time limit on yellow lines — unlike England and Wales (3
                  hours), Scotland has no time limit for Blue Badge holders on
                  yellow lines
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0" aria-hidden>
                  ✅
                </span>
                <span>
                  No parking clock required on yellow lines in Scotland
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0" aria-hidden>
                  ✅
                </span>
                <span>
                  Otherwise similar rights to England — disabled bays, pay and
                  display, meters
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0" aria-hidden>
                  ⚠️
                </span>
                <span>
                  Scottish councils can still add local restrictions — always
                  check signs
                </span>
              </li>
            </ul>
            <div className="mt-6 rounded-lg border border-violet-200 bg-white/80 px-4 py-3 text-sm leading-relaxed text-muted">
              <strong className="text-foreground">Note:</strong> Scotland has
              its own Blue Badge scheme administered by Scottish councils. The
              badge is valid across the UK.
            </div>
          </div>
        </section>

        {/* Section 6 — Wales */}
        <section className="min-w-0">
          <h2 className="font-heading text-xl font-semibold text-foreground md:text-2xl">
            Wales
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted md:text-base">
            <p>
              Wales follows the same national Blue Badge rules as England — 3
              hours on yellow lines, parking clock required, same exemptions and
              restrictions apply. Welsh councils administer their own Blue Badge
              schemes but the parking rights are the same.
            </p>
            <p>
              Blue Badges are free in Wales (cost up to £10 in England and
              Scotland).
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section className="min-w-0">
          <h2 className="font-heading text-xl font-semibold text-foreground md:text-2xl">
            Common Mistakes That Lead to PCNs
          </h2>
          <div className="mt-6 space-y-6">
            {[
              {
                title: "Parking in a loading bay",
                note: "Loading bays have yellow kerb marks (spikes). Blue Badges do not exempt you. This is the most common Blue Badge PCN we see issued.",
              },
              {
                title: "Badge face down or not visible",
                note: "CEOs check from outside the vehicle. If they cannot clearly see the badge, they will issue. Even if your badge is valid, displaying it incorrectly can result in a fine.",
              },
              {
                title: "Parking clock not set or not displayed",
                note: "When parking on yellow lines in England or Wales, both badge and clock must be displayed. No clock = PCN, even if your badge is valid.",
              },
              {
                title: "Assuming the badge covers private car parks",
                note: "Supermarkets, hospitals, airports — these are private land. The Blue Badge scheme does not automatically apply. You may still need to pay or display your badge as per the operator's rules.",
              },
              {
                title: "Parking in central London on yellow lines",
                note: "Most badge holders don't know that double yellow line parking is not available anywhere in London, and that the 4 central boroughs have their own schemes entirely.",
              },
              {
                title: "Staying longer than 3 hours on yellow lines (England/Wales)",
                note: "The 3-hour limit applies. After 3 hours you must move to a new location. A CEO who returns and sees your badge clock hasn't changed will issue.",
              },
              {
                title: "Using someone else's badge",
                note: "If the badge holder is not in the vehicle, the badge cannot be used. CEOs are trained to check. This is a criminal offence, not just a parking violation.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border bg-background p-4 shadow-sm md:p-5"
              >
                <h3 className="font-heading text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <div className="mt-3 border-l-4 border-amber-400 bg-amber-50/80 px-3 py-2 text-sm leading-relaxed text-foreground">
                  <span className="font-semibold">Warden note: </span>
                  {item.note}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8 */}
        <section className="min-w-0 rounded-lg border border-border bg-surface p-5 md:p-8">
          <h2 className="font-heading text-xl font-semibold text-foreground md:text-2xl">
            Got a PCN Despite Having a Blue Badge?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            If you received a PCN while correctly displaying a valid Blue Badge,
            you may have grounds to challenge. Common successful challenges
            include:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted md:text-base">
            <li>
              Badge was valid and correctly displayed but CEO missed it
            </li>
            <li>Loading bay restriction not clearly signed</li>
            <li>Incorrect contravention code used by the CEO</li>
            <li>
              CEO failed to check virtual badge register before issuing
            </li>
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/check"
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg border-2 border-primary bg-background px-5 py-3 text-center text-sm font-semibold text-primary no-underline hover:bg-white sm:w-auto"
            >
              Check if you have grounds — Free
            </Link>
            <Link
              href="/appeal"
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-primary px-5 py-3 text-center text-sm font-semibold text-white no-underline shadow-sm hover:bg-primary-hover sm:w-auto"
            >
              Generate your appeal letter — from £6.99
            </Link>
          </div>
        </section>

        <div
          className="rounded-lg border border-border bg-background px-4 py-4 text-sm leading-relaxed text-muted"
          role="note"
        >
          PCNGuide is an information resource. It is not a law firm and does not
          provide legal advice. Always verify details with your issuing council
          and the signs at the location.
        </div>
      </div>
    </div>
  );
}
