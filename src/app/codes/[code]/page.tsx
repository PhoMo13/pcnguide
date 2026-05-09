import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CODES,
  getContraventionByCodeParam,
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

export default function ContraventionCodePage({ params }: Props) {
  const entry = getContraventionByCodeParam(params.code);
  if (!entry) notFound();

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
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Typical fine ({entry.fineAmount.band})
          </h2>
          <p className="mt-2 text-foreground">
            <span className="font-semibold">Reduced (paid promptly):</span>{" "}
            £{entry.fineAmount.reduced}
          </p>
          <p className="mt-1 text-foreground">
            <span className="font-semibold">Full amount:</span> £
            {entry.fineAmount.full}
          </p>
          <p className="mt-3 text-xs text-muted">
            Amounts vary by council area and whether the PCN is issued in
            London; always check your notice and the council&apos;s published
            charges.
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
            href="/appeal-letter"
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
