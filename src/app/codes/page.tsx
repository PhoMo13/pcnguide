"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CODES, type ContraventionCode } from "@/lib/contraventionCodes";

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

function matchesQuery(entry: ContraventionCode, q: string): boolean {
  const s = q.trim().toLowerCase();
  if (!s) return true;

  if (/^\d{1,2}$/.test(s)) {
    const padded = parseInt(s, 10).toString().padStart(2, "0");
    if (entry.code === padded) return true;
    if (s.length === 1 && entry.code.startsWith(s)) return true;
    return false;
  }

  if (entry.title.toLowerCase().includes(s)) return true;
  if (entry.description.toLowerCase().includes(s)) return true;
  if (entry.tags.some((t) => t.toLowerCase().includes(s))) return true;
  if (entry.wardenNote.toLowerCase().includes(s)) return true;
  return false;
}

function CodesLookupContent() {
  const searchParams = useSearchParams();
  const codeParam = searchParams.get("code");
  const [query, setQuery] = useState(() => codeParam?.trim() ?? "");

  const filtered = useMemo(
    () => CODES.filter((c) => matchesQuery(c, query)),
    [query],
  );

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl text-balance">
          Contravention Code Lookup
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-muted text-balance">
          Find your two-digit code on your Penalty Charge Notice and look up
          exactly what it means — and how to challenge it.
        </p>

        <div className="mt-8 max-w-xl">
          <label htmlFor="code-search" className="sr-only">
            Search by code or keyword
          </label>
          <input
            id="code-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by code (e.g. 30) or keyword (e.g. loading)"
            autoComplete="off"
            className="w-full rounded-lg border border-border bg-background px-4 py-3 font-sans text-base text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 text-base text-muted">
            Can&apos;t find your code? All codes are listed — try searching by
            keyword.
          </p>
        ) : (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <li key={c.code}>
                <Link
                  href={`/codes/${c.code}`}
                  className="flex h-full flex-col rounded-lg border border-border bg-surface p-5 no-underline shadow-sm transition hover:border-primary hover:bg-background hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex items-center rounded-lg bg-primary px-2.5 py-1 font-mono text-lg font-semibold text-white">
                      {c.code}
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${difficultyBadgeClass(c.difficulty)}`}
                    >
                      {c.difficulty}
                    </span>
                  </div>
                  <h2 className="mt-3 font-heading text-base font-semibold leading-snug text-foreground">
                    {c.title}
                  </h2>
                  {c.tags[0] ? (
                    <p className="mt-2 text-sm text-muted">{c.tags[0]}</p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function CodesLookupFallback() {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="h-10 max-w-xl animate-pulse rounded-lg bg-surface" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-36 animate-pulse rounded-lg border border-border bg-surface"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CodesLookupPage() {
  return (
    <Suspense fallback={<CodesLookupFallback />}>
      <CodesLookupContent />
    </Suspense>
  );
}
