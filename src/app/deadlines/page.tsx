"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";

type IssueMethod = "reg9" | "reg10";

const STORAGE_KEY = "pcnguide_deadline";

type SavedDeadlinePayload = {
  pcnDate: string;
  issuedType: IssueMethod;
  pcnRef: string;
  savedAt: string;
};

type Urgency = "green" | "amber" | "red" | "grey";

type ComputedDeadline = {
  id: string;
  title: string;
  date: Date;
  explanation: string;
  note?: string;
};

const STATUS = {
  green: { dot: "bg-[#16a34a]", ring: "ring-[#16a34a]/30", label: "Plenty of time" },
  amber: { dot: "bg-[#d97706]", ring: "ring-[#d97706]/30", label: "Approaching" },
  red: { dot: "bg-[#dc2626]", ring: "ring-[#dc2626]/30", label: "Urgent" },
  grey: { dot: "bg-[#9ca3af]", ring: "ring-[#9ca3af]/20", label: "Passed" },
} as const;

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function parseDateInput(iso: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  const dt = new Date(y, m - 1, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) {
    return null;
  }
  return dt;
}

function addCalendarDays(base: Date, days: number): Date {
  const x = new Date(base);
  x.setDate(x.getDate() + days);
  return x;
}

/** First day strictly after `start` that is a Mon–Fri; repeat until `n` working days added. */
function addWorkingDaysAfter(start: Date, n: number): Date {
  const d = new Date(start);
  let count = 0;
  while (count < n) {
    d.setDate(d.getDate() + 1);
    const wd = d.getDay();
    if (wd !== 0 && wd !== 6) count++;
  }
  return d;
}

function formatUkDate(d: Date): string {
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function daysFromTodayTo(deadline: Date): number {
  const today = startOfDay(new Date());
  const end = startOfDay(deadline);
  return Math.round((end.getTime() - today.getTime()) / 86400000);
}

function urgencyForDeadline(deadline: Date): Urgency {
  const diff = daysFromTodayTo(deadline);
  if (diff < 0) return "grey";
  if (diff > 14) return "green";
  if (diff >= 7) return "amber";
  return "red";
}

function buildDeadlines(day0: Date): ComputedDeadline[] {
  const reduced = addCalendarDays(day0, 14);
  const day28 = addCalendarDays(day0, 28);
  const ntoEst = addCalendarDays(day0, 56);
  const formalAndCharge = addCalendarDays(ntoEst, 28);

  return [
    {
      id: "reduced",
      title: "Pay at reduced rate",
      date: reduced,
      explanation:
        "After this date the fine increases to the full amount.",
    },
    {
      id: "informal",
      title: "Deadline to challenge informally",
      date: day28,
      explanation:
        "This is your first opportunity to challenge in writing. After 28 days you must wait for a Notice to Owner.",
    },
    {
      id: "full",
      title: "Full payment deadline",
      date: day28,
      explanation:
        "If unpaid and unchallenged, the council will issue a Notice to Owner (NtO).",
    },
    {
      id: "nto",
      title: "Notice to Owner — expected by",
      date: ntoEst,
      explanation:
        "This is an estimate only. The NtO gives you a further 28 days to make formal representations.",
      note: "Estimated — actual date set by council",
    },
    {
      id: "formal",
      title: "Formal representations deadline",
      date: formalAndCharge,
      explanation:
        "If you miss this, you lose the right to make formal representations and the penalty increases by 50%.",
      note: "Based on estimated NtO date",
    },
    {
      id: "charge",
      title: "Charge Certificate — penalty increases 50%",
      date: formalAndCharge,
      explanation:
        "The penalty increases by 50% if not paid or challenged by this date.",
    },
  ];
}

function UrgencyBanner({
  reducedPassed,
  fullPassed,
}: {
  reducedPassed: boolean;
  fullPassed: boolean;
}) {
  if (fullPassed) {
    return (
      <div
        className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
        role="status"
      >
        <p className="font-semibold">
          🚨 The payment deadline has passed. Challenge immediately or contact
          your council — do not ignore this.
        </p>
      </div>
    );
  }
  if (reducedPassed) {
    return (
      <div
        className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
        role="status"
      >
        <p className="font-semibold">
          ⚠️ The reduced rate period has passed. You can still challenge or pay
          the full amount.
        </p>
      </div>
    );
  }
  return (
    <div
      className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-950"
      role="status"
    >
      <p className="font-semibold">
        ✅ You are within the challenge window. Act now to protect your rights.
      </p>
    </div>
  );
}

function DeadlineCard({
  item,
  urgency,
  daysPhrase,
  isLast,
}: {
  item: ComputedDeadline;
  urgency: Urgency;
  daysPhrase: string;
  isLast: boolean;
}) {
  const s = STATUS[urgency];
  return (
    <li className="flex gap-4 items-stretch">
      <div className="flex w-5 shrink-0 flex-col items-center pt-1.5">
        <div
          className={`z-10 h-3 w-3 shrink-0 rounded-full ${s.dot} ring-4 ${s.ring}`}
          aria-hidden
        />
        {!isLast ? (
          <div className="mt-2 w-0.5 flex-1 min-h-6 bg-border" aria-hidden />
        ) : null}
      </div>
      <div className={`min-w-0 flex-1 ${isLast ? "pb-0" : "pb-8"}`}>
        <div className="rounded-lg border border-border bg-background p-4 shadow-sm sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="font-heading text-lg font-semibold text-foreground">
              {item.title}
            </h3>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
              <span
                className={`inline-block h-2 w-2 rounded-full ${s.dot}`}
                aria-hidden
              />
              {s.label}
            </span>
          </div>
          <p className="mt-1 font-mono text-sm font-semibold text-primary">
            {formatUkDate(item.date)}
          </p>
          <p className="mt-2 text-sm font-medium text-foreground">{daysPhrase}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {item.explanation}
          </p>
          {item.note ? (
            <p className="mt-2 text-xs font-medium text-amber-800">{item.note}</p>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export default function DeadlinesPage() {
  const [issueDate, setIssueDate] = useState("");
  const [issueMethod, setIssueMethod] = useState<IssueMethod>("reg9");
  const [reference, setReference] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [day0, setDay0] = useState<Date | null>(null);
  const [deadlines, setDeadlines] = useState<ComputedDeadline[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const [showRestoredBanner, setShowRestoredBanner] = useState(false);
  const [restoredPcnLabel, setRestoredPcnLabel] = useState<string | null>(null);
  const [reminderEmail, setReminderEmail] = useState("");
  const [reminderStatus, setReminderStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw) as Partial<SavedDeadlinePayload>;
      if (
        typeof data.pcnDate !== "string" ||
        (data.issuedType !== "reg9" && data.issuedType !== "reg10")
      ) {
        return;
      }
      const pcn = parseDateInput(data.pcnDate);
      if (!pcn) return;
      const ref = typeof data.pcnRef === "string" ? data.pcnRef : "";
      setIssueDate(data.pcnDate);
      setIssueMethod(data.issuedType);
      setReference(ref);
      const d0 =
        data.issuedType === "reg9" ? pcn : addWorkingDaysAfter(pcn, 2);
      setDay0(d0);
      setDeadlines(buildDeadlines(d0));
      setSubmitted(true);
      setShowRestoredBanner(true);
      setRestoredPcnLabel(formatUkDate(pcn));
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  const reducedDate = deadlines.find((d) => d.id === "reduced")?.date ?? null;
  const fullDate = deadlines.find((d) => d.id === "full")?.date ?? null;

  const reducedPassed = reducedDate ? daysFromTodayTo(reducedDate) < 0 : false;
  const fullPassed = fullDate ? daysFromTodayTo(fullDate) < 0 : false;

  const day0Label = useMemo(() => {
    if (!day0 || !submitted) return null;
    const pcn = parseDateInput(issueDate);
    if (!pcn) return null;
    if (issueMethod === "reg9") {
      return (
        <p className="text-sm text-muted">
          <span className="font-medium text-foreground">Day 0</span> (Reg 9 —
          date on PCN):{" "}
          <span className="font-mono text-foreground">
            {formatUkDate(pcn)}
          </span>
        </p>
      );
    }
    return (
      <p className="text-sm text-muted">
        <span className="font-medium text-foreground">Day 0</span> (Reg 10 —
        two working days after date on PCN, weekends only):{" "}
        <span className="font-mono text-foreground">{formatUkDate(day0)}</span>
        <span className="block mt-1 text-xs">
          PCN dated{" "}
          <span className="font-mono text-foreground">{formatUkDate(pcn)}</span>
        </span>
      </p>
    );
  }, [day0, submitted, issueDate, issueMethod]);

  function persistDeadlineForm() {
    try {
      const payload: SavedDeadlinePayload = {
        pcnDate: issueDate,
        issuedType: issueMethod,
        pcnRef: reference,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* quota / private mode */
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    const pcn = parseDateInput(issueDate);
    if (!pcn) {
      setFormError("Enter a valid date the PCN was issued.");
      return;
    }
    const d0 =
      issueMethod === "reg9" ? pcn : addWorkingDaysAfter(pcn, 2);
    setDay0(d0);
    setDeadlines(buildDeadlines(d0));
    setSubmitted(true);
    setShowRestoredBanner(false);
    setRestoredPcnLabel(null);
    setReminderStatus("idle");
    persistDeadlineForm();
  }

  function handleClearSaved() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setShowRestoredBanner(false);
    setRestoredPcnLabel(null);
    setReminderEmail("");
    setReminderStatus("idle");
    setIssueDate("");
    setIssueMethod("reg9");
    setReference("");
    setSubmitted(false);
    setDay0(null);
    setDeadlines([]);
    setFormError(null);
  }

  function handleRecalculate() {
    setIssueDate("");
    setIssueMethod("reg9");
    setReference("");
    setSubmitted(false);
    setDay0(null);
    setDeadlines([]);
    setFormError(null);
    setShowRestoredBanner(false);
    setRestoredPcnLabel(null);
    setReminderEmail("");
    setReminderStatus("idle");
  }

  async function handleReminderSubmit(e: FormEvent) {
    e.preventDefault();
    if (!reducedDate || !fullDate) return;
    setReminderStatus("loading");
    try {
      const res = await fetch("/api/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: reminderEmail.trim(),
          pcnDate: issueDate,
          issuedType: issueMethod,
          pcnRef: reference,
          reducedDeadline: formatUkDate(reducedDate),
          fullDeadline: formatUkDate(fullDate),
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (res.ok && data.success) {
        setReminderStatus("success");
      } else {
        setReminderStatus("error");
      }
    } catch {
      setReminderStatus("error");
    }
  }

  function daysPhraseFor(d: Date): string {
    const diff = daysFromTodayTo(d);
    if (diff > 0) return `${diff} day${diff === 1 ? "" : "s"} remaining`;
    if (diff === 0) return "Due today";
    const ago = Math.abs(diff);
    return `${ago} day${ago === 1 ? "" : "s"} ago`;
  }

  return (
    <div className="bg-background">
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl text-balance">
            PCN deadline tracker
          </h1>
          <p className="mt-4 text-lg text-muted text-balance">
            Enter when your PCN was issued and how you received it. We map the
            key payment and challenge dates so you can see what is coming — and
            act before you lose options.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        {showRestoredBanner && restoredPcnLabel ? (
          <div
            className="mb-6 flex flex-col gap-2 rounded-lg border border-primary/20 bg-emerald-50/90 px-4 py-3 text-sm text-foreground sm:flex-row sm:items-center sm:justify-between"
            role="status"
          >
            <p>
              📋 We found a saved PCN from{" "}
              <span className="font-semibold">{restoredPcnLabel}</span>. Your
              deadlines are shown below.
            </p>
            <button
              type="button"
              onClick={handleClearSaved}
              className="shrink-0 text-left text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-2 hover:text-primary-hover"
            >
              Clear saved data
            </button>
          </div>
        ) : null}

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-border bg-background p-5 shadow-sm sm:p-6"
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="issue-date"
                className="block text-sm font-medium text-foreground"
              >
                Date on the PCN <span className="text-red-600">*</span>
              </label>
              <input
                id="issue-date"
                name="issueDate"
                type="date"
                required
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="mt-1 w-full max-w-xs rounded-lg border border-border px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>

            <fieldset>
              <legend className="text-sm font-medium text-foreground">
                How was it issued? <span className="text-red-600">*</span>
              </legend>
              <div className="mt-3 space-y-3">
                <label className="flex cursor-pointer gap-3 rounded-lg border border-border bg-surface p-3 has-[:checked]:border-primary has-[:checked]:bg-emerald-50/40">
                  <input
                    type="radio"
                    name="issueMethod"
                    value="reg9"
                    checked={issueMethod === "reg9"}
                    onChange={() => setIssueMethod("reg9")}
                    className="mt-1"
                  />
                  <span className="text-sm text-foreground">
                    <span className="font-medium">
                      Handed to me or placed on windscreen
                    </span>
                    <span className="mt-0.5 block text-muted">
                      Reg 9 — the date on the PCN is day 0 for these deadlines.
                    </span>
                  </span>
                </label>
                <label className="flex cursor-pointer gap-3 rounded-lg border border-border bg-surface p-3 has-[:checked]:border-primary has-[:checked]:bg-emerald-50/40">
                  <input
                    type="radio"
                    name="issueMethod"
                    value="reg10"
                    checked={issueMethod === "reg10"}
                    onChange={() => setIssueMethod("reg10")}
                    className="mt-1"
                  />
                  <span className="text-sm text-foreground">
                    <span className="font-medium">Received by post</span>
                    <span className="mt-0.5 block text-muted">
                      Reg 10 — day 0 is two working days after the date on the
                      PCN (weekends skipped; bank holidays not adjusted in this
                      tool).
                    </span>
                  </span>
                </label>
              </div>
            </fieldset>

            <div>
              <label
                htmlFor="pcn-ref"
                className="block text-sm font-medium text-foreground"
              >
                PCN reference (optional)
              </label>
              <input
                id="pcn-ref"
                name="reference"
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="Shown on your ticket for your records only"
                className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-foreground placeholder:text-muted/80 focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>

            {formError ? (
              <p className="text-sm font-medium text-red-700" role="alert">
                {formError}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover"
              >
                Calculate deadlines
              </button>
              {submitted ? (
                <button
                  type="button"
                  onClick={handleRecalculate}
                  className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-surface"
                >
                  Recalculate
                </button>
              ) : null}
            </div>
          </div>
        </form>

        {submitted && deadlines.length > 0 ? (
          <div className="animate-step-in mt-10 space-y-8">
            {reference.trim() ? (
              <p className="text-sm text-muted">
                Reference:{" "}
                <span className="font-mono font-medium text-foreground">
                  {reference.trim()}
                </span>
              </p>
            ) : null}

            <UrgencyBanner
              reducedPassed={reducedPassed}
              fullPassed={fullPassed}
            />

            {day0Label}

            <div>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Your timeline
              </h2>
              <p className="mt-1 text-sm text-muted">
                Status colours compare each date to today — not legal advice.
              </p>

              <ul className="mt-8 list-none p-0" aria-label="Deadline timeline">
                {deadlines.map((item, i) => (
                  <DeadlineCard
                    key={item.id}
                    item={item}
                    urgency={urgencyForDeadline(item.date)}
                    daysPhrase={daysPhraseFor(item.date)}
                    isLast={i === deadlines.length - 1}
                  />
                ))}
              </ul>
            </div>

            <section
              className="rounded-lg border border-emerald-200 bg-[#f0fdf4] p-5 sm:p-6"
              aria-labelledby="reminder-heading"
            >
              <h2
                id="reminder-heading"
                className="font-heading text-lg font-semibold text-primary sm:text-xl"
              >
                Get deadline reminders by email
              </h2>
              <p className="mt-2 text-sm text-foreground/90">
                We&apos;ll remind you 14 days, 7 days, and 3 days before your
                key deadlines. Free.
              </p>

              <form onSubmit={handleReminderSubmit} className="mt-5 space-y-4">
                <input type="hidden" name="pcnDate" value={issueDate} readOnly />
                <input
                  type="hidden"
                  name="issuedType"
                  value={issueMethod}
                  readOnly
                />
                <input type="hidden" name="pcnRef" value={reference} readOnly />
                <input
                  type="hidden"
                  name="reducedDeadline"
                  value={
                    reducedDate ? formatUkDate(reducedDate) : ""
                  }
                  readOnly
                />
                <input
                  type="hidden"
                  name="fullDeadline"
                  value={fullDate ? formatUkDate(fullDate) : ""}
                  readOnly
                />
                <div>
                  <label
                    htmlFor="reminder-email"
                    className="block text-sm font-medium text-foreground"
                  >
                    Email address <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="reminder-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={reminderEmail}
                    onChange={(e) => {
                      setReminderEmail(e.target.value);
                      if (reminderStatus !== "idle") setReminderStatus("idle");
                    }}
                    placeholder="you@example.com"
                    className="mt-1 w-full rounded-lg border border-emerald-200 bg-background px-3 py-2.5 text-foreground placeholder:text-muted/80 focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>
                <button
                  type="submit"
                  disabled={reminderStatus === "loading"}
                  className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {reminderStatus === "loading"
                    ? "Sending…"
                    : "Send me reminders"}
                </button>
              </form>

              {reminderStatus === "success" ? (
                <p
                  className="mt-4 text-sm font-medium text-emerald-800"
                  role="status"
                >
                  ✅ Reminders set. Check your inbox — we&apos;ll email you
                  before your deadlines.
                </p>
              ) : null}
              {reminderStatus === "error" ? (
                <p className="mt-4 text-sm font-medium text-red-700" role="alert">
                  Something went wrong. Please try again.
                </p>
              ) : null}

              <p className="mt-4 text-xs leading-relaxed text-muted">
                We only use your email to send PCN reminders. We never share your
                data. Unsubscribe any time.
              </p>
            </section>

            <div
              className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
              role="note"
            >
              <p className="font-medium">Important</p>
              <p className="mt-2 leading-relaxed">
                These deadlines are calculated from the date you entered. Notice
                to Owner and subsequent deadlines are estimates — the actual
                dates will be shown on correspondence from your council. Always
                check the dates on any letters you receive. Do not rely solely
                on this calculator.
              </p>
            </div>

            <p className="text-xs leading-relaxed text-muted">
              This tool is for general guidance based on typical civil parking
              enforcement time limits. It is not legal advice. Councils and
              procedures vary; read your PCN and any NtO carefully.
            </p>

            <div className="rounded-lg border border-border bg-surface p-6">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                Ready to challenge before your deadline?
              </h2>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/appeal"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-center text-sm font-semibold text-white no-underline shadow-sm hover:bg-primary-hover"
                >
                  Generate your appeal letter — from £6.99
                </Link>
                <Link
                  href="/check"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-primary bg-background px-5 py-3 text-center text-sm font-semibold text-primary no-underline hover:bg-background"
                >
                  Check if you have grounds
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
