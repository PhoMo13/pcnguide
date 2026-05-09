import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CODES,
  FINE_LEVELS_TABLE,
  getContraventionByCodeParam,
  TYPICAL_BAND_A_CODES,
  type ContraventionCode,
} from "@/lib/contraventionCodes";

type Props = { params: { code: string } };

function difficultyBadgeClass(d: ContraventionCode["difficulty"]) {
  switch (d) {
    case "Easy":
      return "bg-emerald-100 text-emerald-900 ring-1 ring-emerald-600/20";
    case "Moderate":
      return "bg-amber-100 text-amber-900 ring-1 ring-amber-600/25";
    case "Hard":
      return "bg-red-100 text-red-900 ring-1 ring-red-600/20";
    default:
      return "bg-surface text-foreground ring-1 ring-border";
  }
}

export function generateStaticParams() {
  return CODES.map((c) => ({ code: c.code }));
}

export function generateMetadata({ params }: Props): Metadata {
  const entry = getContraventionByCodeParam(params.code);
  if (!entry) {
    return { title: "Code not found | PCNGuide" };
  }
  return {
    title: `Code ${entry.code}: ${entry.title} | PCNGuide`,
    description: entry.description,
  };
}

function formatFinePair(amounts: { reduced: number; full: number }) {
  return `£${amounts.reduced} / £${amounts.full}`;
}

export default function ContraventionCodePage({ params }: Props) {
  const entry = getContraventionByCodeParam(params.code);
  if (!entry) notFound();

  const isTypicalBandA = TYPICAL_BAND_A_CODES.has(entry.code);
  const t = FINE_LEVELS_TABLE;

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <nav className="text-sm text-muted" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="text-primary hover:text-primary-hover">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-muted">
              /
            </li>
            <li>
              <Link
                href="/codes"
                className="text-primary hover:text-primary-hover"
              >
                Code Lookup
              </Link>
            </li>
            <li aria-hidden className="text-muted">
              /
            </li>
            <li className="font-medium text-foreground" aria-current="page">
              Code {entry.code}
            </li>
          </ol>
        </nav>

        <aside
          className="mt-6 rounded-lg border border-amber-200 border-l-4 border-l-amber-500 bg-[#FFFBEB] p-4 sm:p-5"
          aria-label="Important notice"
        >
          <p className="flex items-start gap-2 font-heading text-base font-semibold text-amber-900">
            <span className="select-none" aria-hidden>
              ⚠️
            </span>
            <span>Important — please read</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            The information on this page is provided to help you understand your
            options. It is not legal advice. Appeal outcomes vary — councils and
            adjudicators assess each case individually, and there is no guarantee
            of success. Rules and restrictions also vary between councils; what
            applies in one area may not apply in another. Always read the guidance
            issued with your PCN and verify details with your local council or an
            independent advisor.
          </p>
        </aside>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex rounded-lg bg-primary px-4 py-2 font-mono text-3xl font-bold text-white sm:text-4xl">
            {entry.code}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${difficultyBadgeClass(entry.difficulty)}`}
          >
            {entry.difficulty}
          </span>
        </div>

        <h1 className="mt-4 font-heading text-2xl font-semibold leading-tight text-foreground sm:text-3xl text-balance">
          {entry.title}
        </h1>

        <div className="mt-6 rounded-lg border border-border bg-surface p-5">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Typical fine levels
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {entry.fineAmount.bandDescription} Amounts are shown as{" "}
            <span className="font-medium text-foreground">
              reduced (paid promptly) / full
            </span>
            .
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[320px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Standard parking contravention fine amounts by band and region
              </caption>
              <thead>
                <tr className="border-b border-border bg-background">
                  <th
                    scope="col"
                    className="px-3 py-3 font-semibold text-foreground sm:px-4"
                  >
                    Band
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 font-semibold text-foreground sm:px-4"
                  >
                    Outside London
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 font-semibold text-foreground sm:px-4"
                  >
                    London
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className={`border-b border-border ${isTypicalBandA ? "bg-amber-50/90" : ""}`}
                >
                  <th
                    scope="row"
                    className="px-3 py-3 font-semibold text-foreground sm:px-4"
                  >
                    Band A (higher)
                    {isTypicalBandA ? (
                      <span className="mt-1 block text-xs font-normal text-amber-900">
                        Typical for this code
                      </span>
                    ) : null}
                  </th>
                  <td className="px-3 py-3 font-mono text-foreground sm:px-4">
                    {formatFinePair(t.outsideLondon.bandA)}
                  </td>
                  <td className="px-3 py-3 font-mono text-foreground sm:px-4">
                    {entry.fineAmount.londonBandA
                      ? formatFinePair(entry.fineAmount.londonBandA)
                      : formatFinePair(t.london.bandA)}
                  </td>
                </tr>
                <tr className={!isTypicalBandA ? "bg-amber-50/90" : ""}>
                  <th
                    scope="row"
                    className="px-3 py-3 font-semibold text-foreground sm:px-4"
                  >
                    Band B (lower)
                    {!isTypicalBandA ? (
                      <span className="mt-1 block text-xs font-normal text-amber-900">
                        Typical for this code
                      </span>
                    ) : null}
                  </th>
                  <td className="px-3 py-3 font-mono text-foreground sm:px-4">
                    {formatFinePair(t.outsideLondon.bandB)}
                  </td>
                  <td className="px-3 py-3 font-mono text-foreground sm:px-4">
                    {entry.fineAmount.londonBandB
                      ? formatFinePair(entry.fineAmount.londonBandB)
                      : formatFinePair(t.london.bandB)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            Fine amounts vary by council. The amounts shown are the standard
            levels set under the Civil Enforcement of Parking Contraventions
            regulations. Always check the exact amount on your Penalty Charge
            Notice.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            {entry.fineAmount.note}
          </p>
        </div>

        <section className="mt-10" aria-labelledby="overview-heading">
          <h2
            id="overview-heading"
            className="font-heading text-xl font-semibold text-foreground"
          >
            Overview
          </h2>
          <p className="mt-3 leading-relaxed text-muted">{entry.description}</p>
        </section>

        <section
          className="mt-10 border-l-4 border-accent bg-amber-50/80 pl-5 pr-4 py-5"
          aria-labelledby="warden-heading"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-900/80">
            From the warden&apos;s perspective
          </p>
          <h2
            id="warden-heading"
            className="mt-1 font-heading text-xl font-semibold text-foreground"
          >
            Warden&apos;s note
          </h2>
          <p className="mt-3 leading-relaxed text-foreground">
            {entry.wardenNote}
          </p>
        </section>

        <section className="mt-10" aria-labelledby="mistakes-heading">
          <h2
            id="mistakes-heading"
            className="font-heading text-xl font-semibold text-foreground"
          >
            Common mistakes
          </h2>
          <p className="mt-2 text-sm text-muted">
            Grounds councils sometimes get wrong — worth checking against your
            PCN and evidence pack.
          </p>
          <ul className="mt-4 space-y-3">
            {entry.commonMistakes.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white"
                  aria-hidden
                >
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="leading-relaxed text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="rights-heading">
          <h2
            id="rights-heading"
            className="font-heading text-xl font-semibold text-foreground"
          >
            Your rights
          </h2>
          <p className="mt-3 leading-relaxed text-muted">{entry.yourRights}</p>
        </section>

        {entry.tags.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-sm font-semibold text-foreground">Tags</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-12 rounded-lg border border-border bg-primary px-6 py-8 text-center text-white">
          <p className="font-heading text-lg font-semibold sm:text-xl">
            Think you have grounds to appeal?
          </p>
          <p className="mt-2 text-sm text-white/90">
            Generate your appeal letter — from £6.99
          </p>
          <Link
            href="/appeal"
            className="mt-5 inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary no-underline shadow-sm hover:bg-surface"
          >
            Generate appeal letter
          </Link>
        </div>

        <p className="mt-10">
          <Link
            href="/codes"
            className="text-sm font-medium text-primary no-underline hover:text-primary-hover"
          >
            ← Back to Code Lookup
          </Link>
        </p>
      </div>
    </div>
  );
}
