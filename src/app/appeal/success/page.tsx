"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type StoredResult = {
  pcnDate: string;
  tier: "standard" | "premium";
  letter: string;
  ntoLetter?: string;
  evidenceChecklist?: string;
  submissionGuide?: string;
};

type Tab = "first" | "nto" | "checklist" | "guide";

function formatDateGB(iso: string): string {
  if (!iso) return "—";
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function deadlinePlus28(iso: string): string {
  if (!iso) return "—";
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return "—";
  d.setDate(d.getDate() + 28);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function AppealSuccessPage() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<StoredResult | null>(null);
  const [tab, setTab] = useState<Tab>("first");
  const [copyDone, setCopyDone] = useState(false);

  useEffect(() => {
    setMounted(true);
    const raw = sessionStorage.getItem("pcnguideAppealResult");
    if (!raw) {
      setData(null);
      return;
    }
    try {
      setData(JSON.parse(raw) as StoredResult);
    } catch {
      setData(null);
    }
  }, []);

  const fullDownloadText = useMemo(() => {
    if (!data) return "";
    if (data.tier !== "premium") return data.letter;
    const parts = [`=== First appeal letter ===\n\n${data.letter}`];
    if (data.ntoLetter) {
      parts.push(`\n\n=== Notice to Owner (template) ===\n\n${data.ntoLetter}`);
    }
    if (data.evidenceChecklist) {
      parts.push(
        `\n\n=== Evidence checklist ===\n\n${data.evidenceChecklist}`,
      );
    }
    if (data.submissionGuide) {
      parts.push(`\n\n=== Submission guide ===\n\n${data.submissionGuide}`);
    }
    return parts.join("");
  }, [data]);

  const displayedLetter = useMemo(() => {
    if (!data) return "";
    if (data.tier !== "premium") return data.letter;
    if (tab === "nto" && data.ntoLetter) return data.ntoLetter;
    if (tab === "checklist" && data.evidenceChecklist)
      return data.evidenceChecklist;
    if (tab === "guide" && data.submissionGuide) return data.submissionGuide;
    return data.letter;
  }, [data, tab]);

  const premiumExtras =
    data?.tier === "premium"
      ? {
          nto: Boolean(data.ntoLetter),
          checklist: Boolean(data.evidenceChecklist),
          guide: Boolean(data.submissionGuide),
        }
      : null;

  const showPremiumTabs =
    data?.tier === "premium" &&
    Boolean(
      premiumExtras &&
        (premiumExtras.nto ||
          premiumExtras.checklist ||
          premiumExtras.guide),
    );

  const copyToClipboard = async () => {
    if (!data) return;
    try {
      await navigator.clipboard.writeText(fullDownloadText);
      setCopyDone(true);
      setTimeout(() => setCopyDone(false), 2000);
    } catch {
      alert("Could not copy. Select the text manually.");
    }
  };

  const downloadTxt = () => {
    const blob = new Blob([fullDownloadText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pcnguide-appeal-letter.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const printLetter = () => {
    window.print();
  };

  if (!mounted) {
    return (
      <div className="min-h-[40vh] bg-background px-4 py-16 text-center text-muted">
        Loading…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-lg bg-background px-4 py-16 text-center">
        <h1 className="font-heading text-xl font-semibold text-foreground">
          No letter found
        </h1>
        <p className="mt-2 text-sm text-muted">
          Complete the appeal flow to generate your letter here.
        </p>
        <Link
          href="/appeal"
          className="mt-6 inline-block text-sm font-semibold text-primary hover:text-primary-hover"
        >
          Start a new appeal
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background px-4 py-10 print:px-0 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
          Your appeal letter is ready
        </h1>

        {showPremiumTabs && data ? (
          <div className="mt-6 flex flex-wrap gap-2 print:hidden">
            <button
              type="button"
              onClick={() => setTab("first")}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                tab === "first"
                  ? "bg-primary text-white"
                  : "border border-border bg-surface text-foreground hover:bg-background"
              }`}
            >
              First Appeal Letter
            </button>
            {data.ntoLetter ? (
              <button
                type="button"
                onClick={() => setTab("nto")}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  tab === "nto"
                    ? "bg-primary text-white"
                    : "border border-border bg-surface text-foreground hover:bg-background"
                }`}
              >
                Second Appeal (NtO)
              </button>
            ) : null}
            {data.evidenceChecklist ? (
              <button
                type="button"
                onClick={() => setTab("checklist")}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  tab === "checklist"
                    ? "bg-primary text-white"
                    : "border border-border bg-surface text-foreground hover:bg-background"
                }`}
              >
                Evidence Checklist
              </button>
            ) : null}
            {data.submissionGuide ? (
              <button
                type="button"
                onClick={() => setTab("guide")}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  tab === "guide"
                    ? "bg-primary text-white"
                    : "border border-border bg-surface text-foreground hover:bg-background"
                }`}
              >
                Submission Guide
              </button>
            ) : null}
          </div>
        ) : null}

        <div className="letter-print-area mt-6 rounded-lg border border-border bg-white p-4 sm:p-6 print:border-0">
          <pre className="font-mono text-xs leading-relaxed text-foreground whitespace-pre-wrap sm:text-sm">
            {displayedLetter}
          </pre>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 print:hidden">
          <button
            type="button"
            onClick={() => void copyToClipboard()}
            className="rounded-lg border-2 border-primary bg-background px-4 py-2 text-sm font-semibold text-primary hover:bg-surface"
          >
            {copyDone ? "Copied" : "Copy to clipboard"}
          </button>
          <button
            type="button"
            onClick={downloadTxt}
            className="rounded-lg border-2 border-primary bg-background px-4 py-2 text-sm font-semibold text-primary hover:bg-surface"
          >
            Download as .txt
          </button>
          <button
            type="button"
            onClick={printLetter}
            className="rounded-lg border-2 border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:bg-background"
          >
            Print
          </button>
        </div>

        <div className="mt-8 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-950 print:hidden">
          Keep a copy of this letter and any evidence. Send your appeal in
          writing to the council before your deadline.
        </div>

        <div className="mt-6 rounded-lg border border-border bg-surface p-4 text-sm text-muted print:hidden">
          <p className="font-medium text-foreground">Deadline reminder</p>
          <p className="mt-2">
            If your PCN was issued on{" "}
            <span className="font-medium text-foreground">
              {formatDateGB(data.pcnDate)}
            </span>
            , your typical 28-day payment deadline is around{" "}
            <span className="font-medium text-foreground">
              {deadlinePlus28(data.pcnDate)}
            </span>
            . Challenge or pay before the date on your actual notice — always
            verify on the PCN and council correspondence.
          </p>
        </div>

        <p className="mt-8 text-center print:hidden">
          <Link
            href="/appeal"
            onClick={() => sessionStorage.removeItem("pcnguideAppealResult")}
            className="text-sm font-semibold text-primary hover:text-primary-hover"
          >
            Start a new appeal
          </Link>
        </p>
      </div>
    </div>
  );
}
