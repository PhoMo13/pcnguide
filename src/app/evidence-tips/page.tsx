import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PCN Evidence Tips — When a Parking Fine May Be Unenforceable",
  description:
    "Insider guide to spotting unenforceable PCNs. Faded lines, missing signs, wrong observation times, CEO mistakes — what to photograph and how to use it in your appeal.",
  alternates: { canonical: "https://www.pcnguide.co.uk/evidence-tips" },
};

function WardenStrip({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-4 border-amber-400 bg-amber-50/80 px-4 py-3 text-sm leading-relaxed text-foreground">
      {children}
    </p>
  );
}

function StrengthBadge({ label }: { label: string }) {
  const lower = label.toLowerCase();
  const isAmber =
    lower.startsWith("moderate") ||
    lower.includes("moderate grounds — mainly") ||
    lower === "moderate to strong grounds";
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
        isAmber
          ? "bg-amber-100 text-amber-900 ring-1 ring-amber-300"
          : "bg-emerald-100 text-emerald-900 ring-1 ring-emerald-300"
      }`}
    >
      {label}
    </span>
  );
}

function EvidenceCard({
  title,
  explanation,
  wardenNote,
  actionLabel,
  actionText,
  strength,
}: {
  title: string;
  explanation: string;
  wardenNote: string;
  actionLabel: string;
  actionText: string;
  strength: string;
}) {
  return (
    <article className="min-w-0 rounded-lg border border-border border-l-4 border-l-primary bg-white p-4 shadow-sm md:p-6">
      <h3 className="font-heading text-lg font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
        {explanation}
      </p>
      <div className="mt-4 border-l-4 border-[#D97706] bg-[#FFFBEB] px-3 py-3 text-sm leading-relaxed text-foreground">
        <span className="font-semibold">Warden note: </span>
        {wardenNote}
      </div>
      <p className="mt-4 text-sm font-medium text-foreground">
        {actionLabel}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-muted md:text-base">
        {actionText}
      </p>
      <div className="mt-4">
        <StrengthBadge label={strength} />
      </div>
    </article>
  );
}

export default function EvidenceTipsPage() {
  return (
    <div className="min-w-0 bg-background">
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16">
          <h1 className="text-balance font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            When a Parking Fine May Not Be Enforceable
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Most drivers accept PCNs without questioning them. But councils have
            strict legal obligations — and when they fall short, the fine should
            be cancelled. Here&apos;s what to look for.
          </p>
          <div className="mt-6">
            <WardenStrip>
              <span className="font-semibold text-foreground">
                From the warden&apos;s perspective:{" "}
              </span>
              Before I issue any PCN, I am required to satisfy myself that the
              signs and markings are present, correct and legible. If they are
              not — I should not issue. The problem is, not every CEO checks
              carefully enough. If you have a PCN and something looked wrong at
              the location, photograph it immediately and read this page.
            </WardenStrip>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-10 px-4 py-8 sm:px-6 md:space-y-12 md:py-12 lg:px-8 lg:py-16">
        <div
          className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-4 text-sm leading-relaxed text-amber-950 sm:px-5 sm:py-5"
          role="note"
        >
          <p className="m-0 font-medium">
            ⚠️ This page covers grounds that may make a PCN unenforceable. It is
            not a guarantee of cancellation. Every case is assessed individually
            by the council and, if appealed, by an independent adjudicator. Use
            this as a guide to identify whether you have grounds — not as a
            definitive answer.
          </p>
        </div>

        {/* Section 1 */}
        <section className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            The Legal Foundation
          </p>
          <h2 className="mt-2 font-heading text-xl font-semibold text-foreground md:text-2xl">
            What the Law Actually Says
          </h2>
          <figure className="mt-6 rounded-lg border border-primary/30 bg-primary px-4 py-5 text-white shadow-sm sm:px-6 sm:py-6">
            <blockquote className="m-0 text-sm leading-relaxed sm:text-base">
              <p className="font-medium">
                &ldquo;Authorities should not issue PCNs when traffic signs or
                road markings are incorrect, missing or not in accordance with
                the Traffic Regulation Order. These circumstances may make the
                order unenforceable.&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-4 border-t border-white/20 pt-4 text-xs leading-relaxed text-white/90 sm:text-sm">
              Source: Department for Transport Statutory Guidance to Local
              Authorities, issued under Section 87 of the Traffic Management Act
              2004
            </figcaption>
          </figure>
          <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
            This is not just guidance — local authorities must have regard to it.
            If a council issues a PCN knowing the signs or markings are defective,
            it may be acting unlawfully. An adjudicator will look at this
            guidance when deciding your appeal.
          </p>
        </section>

        {/* Section 2 */}
        <section className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Signs and Markings
          </p>
          <h2 className="mt-2 font-heading text-xl font-semibold text-foreground md:text-2xl">
            Signs and Road Markings — The Most Common Unenforceable Grounds
          </h2>
          <div className="mt-6 space-y-6">
            <EvidenceCard
              title="Faded or Worn Yellow Lines"
              explanation="Yellow lines must be clearly identifiable. If a double yellow line is so worn it could be mistaken for a single yellow line, or a single yellow line is barely visible, the restriction may be unenforceable. Adjudicators have cancelled PCNs where markings were not in adequate condition."
              wardenNote="I am trained to check line condition before issuing. A small gap less than the length of a car can be ignored under guidance — but significant fading across a stretch of road is different. If I can see the line is worn and I issue anyway, that PCN is on shaky ground."
              actionLabel="What to photograph:"
              actionText="The full length of the line where you parked. Get down low to show the condition. Photograph any gaps or faded sections. Include something for scale — your foot, a coin."
              strength="Strong grounds"
            />
            <EvidenceCard
              title="Missing, Damaged or Obscured Time Plates"
              explanation="Single yellow lines require a time plate (sign) within a reasonable distance showing the hours of operation. If the sign is missing, knocked over, covered by overgrown foliage, graffiti, or damaged so the hours are illegible — the restriction cannot be properly communicated to drivers."
              wardenNote="Signs must be present and legible. I check before issuing. If a sign is obscured by a hedge or a tree branch has grown over it, I note it but should not issue. In practice, some CEOs issue anyway and leave it to the appeals process. Don't."
              actionLabel="What to photograph:"
              actionText="The sign — or its absence. If obscured, photograph what is obscuring it (foliage, damage). Photograph from the position a driver approaching from each direction would see it. Show the distance from where you parked to the nearest sign."
              strength="Strong grounds"
            />
            <EvidenceCard
              title="Sign Only Visible From One Direction"
              explanation="Time plates for yellow line restrictions should be visible to a driver approaching from either direction. A sign that faces only one way, or is positioned so that drivers approaching from one direction cannot see it, may make the restriction unenforceable for those approaching from that direction."
              wardenNote="This is a genuine adjudicator ground. If you can show the sign was only readable from one approach and you came from the other, it is worth raising."
              actionLabel="What to photograph:"
              actionText="Photograph from both ends of the road showing the position and visibility of signs. Show the direction you were travelling from."
              strength="Moderate grounds"
            />
            <EvidenceCard
              title="Signs Don't Match the Traffic Regulation Order"
              explanation="Every parking restriction must be backed by a Traffic Regulation Order (TRO). If the signs on the street show different hours or restrictions from what the TRO says, the PCN may be unenforceable. You can request the TRO from the council — they must provide it."
              wardenNote="TRO discrepancies are more common than people think, especially on older roads where restrictions have been updated but signs haven't been replaced. This is a legal challenge that adjudicators take seriously."
              actionLabel="What to photograph:"
              actionText="The signs as they appear on street. Then request the TRO in writing from the council and compare."
              strength="Strong grounds if discrepancy found"
            />
            <EvidenceCard
              title="Parking Bay Markings Faded or Unclear"
              explanation="Parking bay markings — the white lines defining a bay — must be clearly visible. If the markings are so faded that a driver could not reasonably be expected to identify the bay boundaries, codes 86 (parked beyond bay markings) or 24 (not within bay markings) may not be enforceable."
              wardenNote="I photograph bay markings from a standard angle when issuing code 86 or 24. If I cannot get a clear photograph showing the markings, I question whether I should be issuing at all. Ask for my photographs — if the markings aren't clear in them, challenge."
              actionLabel="What to photograph:"
              actionText="The bay markings from multiple angles. Stand back to show the full bay. Get close to show the condition of the lines. Compare to adjacent bays if they are clearer."
              strength="Moderate to strong grounds"
            />
            <EvidenceCard
              title="Loading Bay Kerb Marks Faded"
              explanation="Loading bays are identified by yellow kerb marks — spikes painted at right angles on the kerb. If these are faded, painted over, or not visible, the loading restriction may not be enforceable. This is especially relevant for code 02 (loading restriction on yellow lines) and code 45/25 (loading place during restricted hours)."
              wardenNote="Kerb marks fade faster than road markings because kerbs get scraped by vehicles. I check them before issuing. If they are faded to the point where a driver could not be expected to identify them as loading restriction marks, I should not issue."
              actionLabel="What to photograph:"
              actionText="The kerb from close range showing the condition of the marks. Also photograph from standing height to show what a driver would see."
              strength="Moderate grounds"
            />
          </div>
        </section>

        {/* Section 3 */}
        <section className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            CEO Procedure
          </p>
          <h2 className="mt-2 font-heading text-xl font-semibold text-foreground md:text-2xl">
            Civil Enforcement Officer Procedure — What They Must Do
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            CEOs must follow correct procedures before issuing a PCN. Procedural
            failures are valid grounds for challenge — and the council must
            provide evidence that procedures were followed.
          </p>
          <div className="mt-6 space-y-6">
            <EvidenceCard
              title="Insufficient Observation Time"
              explanation="For contraventions involving loading (codes 25, 45, 70) and overstay in limited waiting bays (code 30), the CEO must observe the vehicle for a reasonable period before issuing. Industry guidance suggests a minimum of 5 minutes for loading contraventions. If a CEO issued within 2-3 minutes of arriving, they have not given sufficient time to establish that no loading activity was taking place."
              wardenNote="Observation time is one of the most important things I record. For loading bay contraventions, I arrive, note the time, observe the vehicle, check for loading activity, and only issue if I am satisfied loading is not occurring. If I issue after 2 minutes, I have not done my job properly."
              actionLabel="What to request:"
              actionText="Ask for the CEO's observation log and timestamps. If the time between first observation and PCN issue is less than 5 minutes for a loading contravention, challenge on this ground."
              strength="Strong grounds"
            />
            <EvidenceCard
              title="PCN Issued Immediately — No Time to Return"
              explanation="There is a 10-minute grace period that applies in designated parking places where the permitted period has expired (under Regulation 5(2) of the Civil Enforcement of Parking Contraventions General Regulations 2007). If a PCN was issued within 10 minutes of a ticket expiring in a pay and display bay or limited waiting bay, challenge it."
              wardenNote="The 10-minute grace period is a legal requirement for designated parking places. It does not apply to yellow lines (which are not designated parking places) but does apply to pay and display bays and limited waiting bays. If I issue at minute 8, the PCN should not have been issued."
              actionLabel="What to request:"
              actionText="Note the exact time on the PCN and the time your ticket expired. If less than 10 minutes, this is a clear ground."
              strength="Strong grounds — legal requirement"
            />
            <EvidenceCard
              title="Incorrect Vehicle Details on the PCN"
              explanation="If the vehicle registration, make, model or colour recorded on the PCN does not match your vehicle, this is a factual error. While minor errors (wrong shade of colour, slightly wrong make) may not automatically cancel a PCN, a wrong registration number is a fundamental error that should result in cancellation."
              wardenNote="Vehicle registration is recorded by the CEO's handheld device. Colour and make are often selected from dropdown menus — errors are common. A wrong registration means the PCN is addressed to the wrong vehicle."
              actionLabel="What to provide:"
              actionText="Your V5C (logbook) confirming your vehicle details. Note the specific discrepancy on the PCN."
              strength="Strong grounds for wrong registration. Moderate for minor details."
            />
            <EvidenceCard
              title="Wrong Contravention Code Used"
              explanation="If the code on your PCN does not accurately describe what is alleged to have happened, the PCN may be challengeable. For example, being issued code 01 (yellow lines) when you were actually in a permit bay (code 12), or code 30 (overstay) when you had not exceeded any time limit."
              wardenNote="Contravention codes are selected on the handheld device. Mistakes happen — especially on streets with multiple restrictions. If the code does not match the location or what actually happened, that is a procedural error."
              actionLabel="What to provide:"
              actionText="Photographs of the location showing what type of restriction it actually was. Your own account of what happened."
              strength="Strong grounds"
            />
            <EvidenceCard
              title="PCN Not Properly Served"
              explanation="A PCN must either be fixed to the vehicle or handed directly to the driver or person in charge of the vehicle. If it was left under a windscreen wiper and blew away, and the first you knew of it was a Notice to Owner, you may have lost the 14-day reduced rate period — which the council must account for in their correspondence."
              wardenNote="If a PCN is not properly fixed to the vehicle and the driver does not receive it, the council must still follow the correct process. The driver is entitled to the full 14-day discount period from the date of service."
              actionLabel="What to provide:"
              actionText="Your account of when you first received notice. Any evidence the PCN was not on the vehicle when you returned."
              strength="Moderate grounds — mainly affects the discount period"
            />
          </div>
        </section>

        {/* Section 4 */}
        <section className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            How to Gather Evidence
          </p>
          <h2 className="mt-2 font-heading text-xl font-semibold text-foreground md:text-2xl">
            Your Evidence Checklist — What to Do Right Now
          </h2>
          <ol className="mt-6 list-none space-y-8 p-0">
            {[
              {
                n: 1,
                title: "Photograph everything immediately",
                body: "Go back to the location as soon as possible — ideally the same day. Signs and markings can be repaired quickly once a council is put on notice. Take photos of: the exact location, every sign within 50 metres in both directions, the road markings in full, any damage, fading, or obstruction. Use your phone's timestamp feature.",
              },
              {
                n: 2,
                title: "Photograph from a driver's perspective",
                body: "Stand where a driver approaching from each direction would be. Can you clearly see the signs? Would a reasonable driver know the restriction was in force? If not, photograph what they would see — or not see.",
              },
              {
                n: 3,
                title: "Note the time and date",
                body: "The time of day matters. If the restriction only operates at certain hours, photograph showing the current time (include your phone screen in shot, or use a timestamped photo).",
              },
              {
                n: 4,
                title: "Request the CEO's evidence",
                body: "You have the right to see the CEO's observation notes, photographs, and handheld device records. Write to the council and request: the CEO's pocket book notes, all photographs taken, the time of first observation and time of issuing, and the contravention code used and why.",
              },
              {
                n: 5,
                title: "Request the Traffic Regulation Order",
                body: "Write to the council asking for a copy of the Traffic Regulation Order (TRO) covering the location. Compare it to the signs on the street. If they don't match, that is a strong ground.",
              },
              {
                n: 6,
                title: "Keep everything",
                body: "Keep your PCN, any pay and display tickets or payment confirmations, dashcam footage if relevant, and any delivery notes or receipts if loading was involved.",
              },
              {
                n: 7,
                title: "Act within the deadlines",
                body: "You have 28 days from the PCN date to challenge informally. If you miss this, you must wait for the Notice to Owner.",
                link: true,
              },
            ].map((item) => (
              <li key={item.n} className="flex gap-4">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-white"
                  aria-hidden
                >
                  {item.n}
                </span>
                <div className="min-w-0">
                  <h3 className="font-heading text-base font-semibold text-foreground md:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
                    {item.body}{" "}
                    {item.link ? (
                      <Link
                        href="/deadlines"
                        className="font-semibold text-primary no-underline hover:underline"
                      >
                        Use our deadline tracker to calculate your exact dates.
                      </Link>
                    ) : null}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Section 5 */}
        <section className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            What Adjudicators Look For
          </p>
          <h2 className="mt-2 font-heading text-xl font-semibold text-foreground md:text-2xl">
            What Independent Adjudicators Actually Decide
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            If your challenge is rejected by the council and you appeal to the
            Traffic Penalty Tribunal (outside London) or London Tribunals, an
            independent adjudicator — a qualified lawyer — will review your case.
            Here is what they consistently look for:
          </p>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-foreground md:text-base">
            {[
              "Were the signs and markings present, correct and legible at the time of the contravention?",
              "Did the CEO follow the correct procedure and allow sufficient observation time?",
              "Does the PCN accurately describe the alleged contravention?",
              "Is the restriction properly backed by a valid Traffic Regulation Order?",
              "Was the PCN served correctly and within the required timeframes?",
              "Was the council's rejection of your representation reasonable given the evidence?",
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <span className="shrink-0 text-primary" aria-hidden>
                  ✅
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
            Adjudicators are independent from councils. Their decisions are
            binding. If an adjudicator cancels your PCN, the council must comply.
          </p>
        </section>

        {/* Section 6 */}
        <section
          className="min-w-0 rounded-lg border border-border bg-[#F9FAFB] p-5 md:p-8"
          aria-labelledby="honest-heading"
        >
          <h2
            id="honest-heading"
            className="font-heading text-xl font-semibold text-foreground md:text-2xl"
          >
            When You Probably Don&apos;t Have Strong Grounds
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            Not every PCN can or should be challenged. If the following apply,
            your grounds are likely weak:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted md:text-base">
            <li>The signs and markings were clear and in good condition</li>
            <li>
              You simply forgot to pay, or overstayed without justification
            </li>
            <li>The restriction was clearly in force at the time</li>
            <li>The CEO&apos;s details on the PCN are correct</li>
            <li>You have no evidence of procedural error</li>
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            In these cases, paying at the reduced rate within 14 days is the most
            practical option. Challenging a PCN without genuine grounds wastes your
            time and the council&apos;s. PCNGuide is here to help you identify real
            grounds — not to encourage challenges without merit.
          </p>
        </section>

        {/* CTAs */}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/check"
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg border-2 border-primary bg-background px-5 py-3 text-center text-sm font-semibold text-primary no-underline hover:bg-surface sm:w-auto"
          >
            Check if you have grounds — Free PCN Checker
          </Link>
          <Link
            href="/appeal"
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-primary px-5 py-3 text-center text-sm font-semibold text-white no-underline shadow-sm hover:bg-primary-hover sm:w-auto"
          >
            Generate your appeal letter — from £6.99
          </Link>
          <Link
            href="/deadlines"
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg border border-border bg-white px-5 py-3 text-center text-sm font-semibold text-foreground no-underline shadow-sm hover:bg-surface sm:w-auto"
          >
            Calculate your deadlines
          </Link>
        </div>

        <div
          className="rounded-lg border border-border bg-background px-4 py-4 text-sm leading-relaxed text-muted"
          role="note"
        >
          PCNGuide is an information resource. It is not a law firm and does not
          provide legal advice. Always verify details with your issuing council.
        </div>
      </div>
    </div>
  );
}
