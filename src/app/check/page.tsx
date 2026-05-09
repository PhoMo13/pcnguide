"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";

type View =
  | "step-1"
  | "private-stop"
  | "step-2"
  | "warn-county"
  | "warn-charge"
  | "step-3"
  | "step-4"
  | "step-5"
  | "step-6";

type PcnType = "on_street" | "off_street" | "tfl" | "private" | null;
type Timing =
  | "within_14"
  | "days_15_28"
  | "nto"
  | "charge_cert"
  | "county_court"
  | null;
type SignsAnswer = "clear" | "unclear" | "unsure" | null;

type CeoKey =
  | "observe"
  | "before_return"
  | "vehicle_wrong"
  | "wrong_code"
  | "none";

type EvidenceKey =
  | "photos"
  | "payment"
  | "blue_badge"
  | "breakdown"
  | "witness"
  | "none";

function progressForView(v: View): number {
  switch (v) {
    case "step-1":
    case "private-stop":
      return 1;
    case "step-2":
    case "warn-county":
    case "warn-charge":
      return 2;
    case "step-3":
      return 3;
    case "step-4":
      return 4;
    case "step-5":
      return 5;
    case "step-6":
      return 6;
    default:
      return 1;
  }
}

type Strength = "strong" | "moderate" | "weak";

type SummaryLine = { text: string; tier: "strong" | "moderate" | "info" };

function assess(
  signs: SignsAnswer,
  ceo: Set<CeoKey>,
  evidence: Set<EvidenceKey>,
): { strength: Strength; lines: SummaryLine[] } {
  const lines: SummaryLine[] = [];

  const hasCeoNone = ceo.has("none");
  const hasEviNone = evidence.has("none");

  const strongSignsUnclear = signs === "unclear";
  const strongVehicle =
    ceo.has("vehicle_wrong") && !hasCeoNone;
  const strongCode = ceo.has("wrong_code") && !hasCeoNone;
  const strongPayment = evidence.has("payment") && !hasEviNone;

  if (strongSignsUnclear) {
    lines.push({
      text: "You said signs or markings were missing, damaged, or unclear — often a strong challenge point.",
      tier: "strong",
    });
  }
  if (strongVehicle) {
    lines.push({
      text: "You said the vehicle details on the PCN are wrong — this can be decisive if provable.",
      tier: "strong",
    });
  }
  if (strongCode) {
    lines.push({
      text: "You said the contravention code does not match what happened — worth checking against the facts.",
      tier: "strong",
    });
  }
  if (strongPayment) {
    lines.push({
      text: "You have a valid ticket or payment confirmation — strong evidence if it matches the contravention.",
      tier: "strong",
    });
  }

  const modCeo =
    !hasCeoNone &&
    (ceo.has("observe") || ceo.has("before_return"));
  const modPhotos = evidence.has("photos") && !hasEviNone;
  const modBadge = evidence.has("blue_badge") && !hasEviNone;
  const modBreakdown = evidence.has("breakdown") && !hasEviNone;
  const modWitness = evidence.has("witness") && !hasEviNone;

  if (modCeo) {
    lines.push({
      text: "You flagged possible CEO procedure issues (observation time or timing of issue).",
      tier: "moderate",
    });
  }
  if (modPhotos) {
    lines.push({
      text: "You have photos of the location, signs, or markings — useful for an evidence-led challenge.",
      tier: "moderate",
    });
  }
  if (modBadge) {
    lines.push({
      text: "You have a Blue Badge that was valid at the time — relevant for some contraventions.",
      tier: "moderate",
    });
  }
  if (modBreakdown) {
    lines.push({
      text: "You have breakdown or emergency-related evidence — may support mitigation in some cases.",
      tier: "moderate",
    });
  }
  if (modWitness) {
    lines.push({
      text: "You have witness or dashcam material — can support your version of events.",
      tier: "moderate",
    });
  }

  const hasStrong =
    strongSignsUnclear || strongVehicle || strongCode || strongPayment;
  const hasModerate =
    modCeo || modPhotos || modBadge || modBreakdown || modWitness;

  if (signs === "clear" && !hasStrong && !hasModerate) {
    lines.push({
      text: "You said signs and markings were clear — signage challenges are harder on those facts alone.",
      tier: "info",
    });
  }
  if (signs === "unsure" && !hasStrong) {
    lines.push({
      text: "You were unsure about signage — consider revisiting the location (safely) or checking council photos if offered.",
      tier: "info",
    });
  }
  if (hasCeoNone && !hasStrong) {
    lines.push({
      text: "You did not identify CEO procedure issues in this checklist.",
      tier: "info",
    });
  }
  if (hasEviNone && !hasStrong) {
    lines.push({
      text: "You indicated no documentary evidence from this list — gathering evidence often strengthens a case.",
      tier: "info",
    });
  }

  let strength: Strength = "weak";
  if (hasStrong) strength = "strong";
  else if (hasModerate) strength = "moderate";

  return { strength, lines };
}

export default function CheckPcnPage() {
  const router = useRouter();
  const [view, setView] = useState<View>("step-1");
  const [pcnType, setPcnType] = useState<PcnType>(null);
  const [timing, setTiming] = useState<Timing>(null);
  const [signs, setSigns] = useState<SignsAnswer>(null);
  const [ceo, setCeo] = useState<Set<CeoKey>>(new Set());
  const [evidence, setEvidence] = useState<Set<EvidenceKey>>(new Set());

  const progress = progressForView(view);
  const progressPct = (progress / 6) * 100;

  const resetAll = useCallback(() => {
    setView("step-1");
    setPcnType(null);
    setTiming(null);
    setSigns(null);
    setCeo(new Set());
    setEvidence(new Set());
  }, []);

  const goBack = useCallback(() => {
    switch (view) {
      case "step-1":
        break;
      case "private-stop":
        setPcnType(null);
        setView("step-1");
        break;
      case "step-2":
        setTiming(null);
        setView("step-1");
        break;
      case "warn-county":
      case "warn-charge":
        setTiming(null);
        setView("step-2");
        break;
      case "step-3":
        setSigns(null);
        setView("step-2");
        break;
      case "step-4":
        setCeo(new Set());
        setView("step-3");
        break;
      case "step-5":
        setView("step-4");
        break;
      case "step-6":
        setView("step-5");
        break;
      default:
        break;
    }
  }, [view]);

  const { strength, lines } = useMemo(
    () => assess(signs, ceo, evidence),
    [signs, ceo, evidence],
  );

  const canAdvanceStep4 = ceo.size > 0;
  const canAdvanceStep5 = evidence.size > 0;

  const strengthStyles = {
    strong: {
      wrap: "border-emerald-200 bg-emerald-50",
      title: "text-emerald-900",
      badge: "bg-emerald-100 text-emerald-900 ring-emerald-600/20",
    },
    moderate: {
      wrap: "border-amber-200 bg-amber-50",
      title: "text-amber-950",
      badge: "bg-amber-100 text-amber-950 ring-amber-600/25",
    },
    weak: {
      wrap: "border-border bg-surface",
      title: "text-foreground",
      badge: "bg-stone-100 text-stone-800 ring-stone-500/15",
    },
  } as const;

  const strengthLabel =
    strength === "strong"
      ? "Strong grounds"
      : strength === "moderate"
        ? "Moderate grounds"
        : "Weak grounds";

  const pcnTypeLabel =
    pcnType === "on_street"
      ? "On-street council PCN"
      : pcnType === "off_street"
        ? "Off-street / car park council PCN"
        : pcnType === "tfl"
          ? "TfL PCN"
          : null;

  const timingLabel =
    timing === "within_14"
      ? "Stage: within 14-day discount period"
      : timing === "days_15_28"
        ? "Stage: 15–28 days from issue"
        : timing === "nto"
          ? "Stage: Notice to Owner received"
          : null;

  const nextStepCopy =
    strength === "strong"
      ? "You have specific grounds to challenge. We recommend writing a formal challenge to the council."
      : strength === "moderate"
        ? "You may have grounds. It is worth challenging — councils do cancel PCNs on procedural grounds."
        : "Your grounds are limited. You can still challenge but should consider whether to pay at the reduced rate.";

  return (
    <div className="min-h-[70vh] bg-background px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-[600px]">
        <p className="text-center font-heading text-2xl font-semibold text-foreground sm:text-3xl">
          PCN Checker
        </p>
        <p className="mt-2 text-center text-sm text-muted">
          Step-by-step guide — not legal advice. Answer honestly for a clearer
          picture of your options.
        </p>

        <div className="mt-8">
          <div className="flex items-center justify-between text-xs font-medium text-muted">
            <span>
              Step {progress} of 6
            </span>
            <span className="tabular-nums">{Math.round(progressPct)}%</span>
          </div>
          <div
            className="mt-2 h-2 overflow-hidden rounded-full bg-surface ring-1 ring-border"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={1}
            aria-valuemax={6}
            aria-label={`Step ${progress} of 6`}
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div
          key={view}
          className="animate-step-in mt-10 rounded-lg border border-border bg-background p-6 shadow-sm sm:p-8"
        >
          {view === "step-1" && (
            <StepShell
              title="What type of PCN did you receive?"
              onBack={() => router.push("/")}
              backLabel="← Home"
            >
              <OptionList
                options={[
                  {
                    id: "on_street",
                    label: "On-street parking PCN (issued by council)",
                  },
                  {
                    id: "off_street",
                    label: "Off-street / car park PCN (issued by council)",
                  },
                  {
                    id: "tfl",
                    label:
                      "TfL PCN (Transport for London — red route, bus lane, ULEZ)",
                  },
                  {
                    id: "private",
                    label: "Private parking ticket (issued by private company)",
                  },
                ]}
                selectedId={pcnType}
                onSelect={(id) => {
                  setPcnType(id as PcnType);
                  if (id === "private") setView("private-stop");
                  else setView("step-2");
                }}
              />
            </StepShell>
          )}

          {view === "private-stop" && (
            <div>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                PCNGuide does not cover private parking tickets
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                PCNGuide covers council-issued Penalty Charge Notices only.
                Private parking tickets are issued by companies like Excel, Euro
                Car Parks, or NCP and are governed by different rules. You should
                contact the British Parking Association (BPA) or International
                Parking Community (IPC) — the trade bodies that govern private
                operators. We cannot help with private tickets.
              </p>
              <button
                type="button"
                className="mt-8 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-hover"
                onClick={resetAll}
              >
                Back to start
              </button>
            </div>
          )}

          {view === "step-2" && (
            <StepShell
              title="How long ago was the PCN issued?"
              onBack={goBack}
            >
              <OptionList
                options={[
                  {
                    id: "within_14",
                    label: "Within 14 days (discount period — pay at 50%)",
                  },
                  {
                    id: "days_15_28",
                    label: "15–28 days (still within payment/challenge window)",
                  },
                  {
                    id: "nto",
                    label: "I've received a Notice to Owner (NtO)",
                  },
                  {
                    id: "charge_cert",
                    label: "I've received a Charge Certificate",
                  },
                  {
                    id: "county_court",
                    label: "I've received a County Court order",
                  },
                ]}
                selectedId={timing}
                onSelect={(id) => {
                  setTiming(id as Timing);
                  if (id === "county_court") setView("warn-county");
                  else if (id === "charge_cert") setView("warn-charge");
                  else setView("step-3");
                }}
              />
            </StepShell>
          )}

          {view === "warn-county" && (
            <div>
              <h2 className="font-heading text-xl font-semibold text-red-900">
                Important — County Court stage
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground">
                At this stage the debt has been registered with the County Court.
                You should contact the Traffic Enforcement Centre (TEC)
                immediately on{" "}
                <a
                  href="tel:03001231059"
                  className="font-semibold text-primary hover:text-primary-hover"
                >
                  0300 123 1059
                </a>{" "}
                or visit{" "}
                <a
                  href="https://www.tec.gov.uk"
                  className="font-semibold text-primary underline-offset-2 hover:text-primary-hover"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  tec.gov.uk
                </a>
                . Time is critical. PCNGuide can help you understand the process
                but you should seek independent advice urgently.
              </p>
              <button
                type="button"
                className="mt-8 w-full rounded-lg border-2 border-primary bg-background py-3 text-sm font-semibold text-primary hover:bg-surface"
                onClick={goBack}
              >
                Back
              </button>
            </div>
          )}

          {view === "warn-charge" && (
            <div>
              <h2 className="font-heading text-xl font-semibold text-amber-950">
                Charge Certificate
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground">
                A Charge Certificate means the penalty has increased by 50%. You
                can no longer make informal representations — you must either pay
                or make a formal witness statement to the Traffic Enforcement
                Centre (TEC). Contact TEC on{" "}
                <a
                  href="tel:03001231059"
                  className="font-semibold text-primary hover:text-primary-hover"
                >
                  0300 123 1059
                </a>
                .
              </p>
              <button
                type="button"
                className="mt-8 w-full rounded-lg border-2 border-primary bg-background py-3 text-sm font-semibold text-primary hover:bg-surface"
                onClick={goBack}
              >
                Back
              </button>
            </div>
          )}

          {view === "step-3" && (
            <StepShell
              title="Was your vehicle correctly signed and marked?"
              subtitle="Were the signs and road markings at the location clear and in good condition?"
              onBack={goBack}
            >
              <OptionList
                options={[
                  { id: "clear", label: "Yes, signs and markings were clear" },
                  {
                    id: "unclear",
                    label: "No — signs were missing, damaged or unclear",
                  },
                  { id: "unsure", label: "I'm not sure" },
                ]}
                selectedId={signs}
                onSelect={(id) => {
                  setSigns(id as SignsAnswer);
                  setView("step-4");
                }}
              />
            </StepShell>
          )}

          {view === "step-4" && (
            <StepShell
              title="Did the Civil Enforcement Officer follow correct procedure?"
              subtitle="Do you have any reason to believe the CEO made a procedural error? Select all that apply."
              onBack={goBack}
            >
              <CheckboxGroup
                items={[
                  {
                    key: "observe",
                    label:
                      "The CEO didn't observe for long enough (loading/overstay contraventions)",
                  },
                  {
                    key: "before_return",
                    label: "The PCN was issued before I returned to my vehicle",
                  },
                  {
                    key: "vehicle_wrong",
                    label:
                      "The vehicle details on the PCN are wrong (reg plate, make, colour)",
                  },
                  {
                    key: "wrong_code",
                    label:
                      "The contravention code on the PCN doesn't match what happened",
                  },
                  {
                    key: "none",
                    label: "None of the above",
                  },
                ]}
                selected={ceo}
                onToggle={(key) => {
                  setCeo((prev) => {
                    const n = new Set(prev);
                    if (key === "none") {
                      return new Set<CeoKey>(["none"]);
                    }
                    n.delete("none");
                    if (n.has(key as CeoKey)) n.delete(key as CeoKey);
                    else n.add(key as CeoKey);
                    return n;
                  });
                }}
              />
              <button
                type="button"
                disabled={!canAdvanceStep4}
                className="mt-8 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => setView("step-5")}
              >
                Continue
              </button>
            </StepShell>
          )}

          {view === "step-5" && (
            <StepShell
              title="Do you have evidence?"
              subtitle="Select all that apply."
              onBack={goBack}
            >
              <CheckboxGroup
                items={[
                  {
                    key: "photos",
                    label: "Photos of the location / signs / markings",
                  },
                  {
                    key: "payment",
                    label: "Valid pay and display ticket or payment confirmation",
                  },
                  {
                    key: "blue_badge",
                    label: "Blue Badge (valid at time of contravention)",
                  },
                  {
                    key: "breakdown",
                    label: "Breakdown or emergency evidence",
                  },
                  {
                    key: "witness",
                    label: "Witness or dashcam footage",
                  },
                  { key: "none", label: "None of the above" },
                ]}
                selected={evidence}
                onToggle={(key) => {
                  setEvidence((prev) => {
                    const n = new Set(prev);
                    if (key === "none") {
                      return new Set<EvidenceKey>(["none"]);
                    }
                    n.delete("none");
                    if (n.has(key as EvidenceKey)) n.delete(key as EvidenceKey);
                    else n.add(key as EvidenceKey);
                    return n;
                  });
                }}
              />
              <button
                type="button"
                disabled={!canAdvanceStep5}
                className="mt-8 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => setView("step-6")}
              >
                See results
              </button>
            </StepShell>
          )}

          {view === "step-6" && (
            <div>
              <button
                type="button"
                onClick={goBack}
                className="mb-6 text-sm font-medium text-primary hover:text-primary-hover"
              >
                ← Back
              </button>
              <div
                className={`rounded-lg border p-5 ${strengthStyles[strength].wrap}`}
              >
                {pcnTypeLabel || timingLabel ? (
                  <p className="text-xs text-muted">
                    {[pcnTypeLabel, timingLabel].filter(Boolean).join(" · ")}
                  </p>
                ) : null}
                <p
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${strengthStyles[strength].badge} ${pcnTypeLabel || timingLabel ? "mt-2" : ""}`}
                >
                  {strengthLabel}
                </p>
                <h2
                  className={`mt-3 font-heading text-xl font-semibold ${strengthStyles[strength].title}`}
                >
                  Assessment
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  {nextStepCopy}
                </p>
              </div>

              <h3 className="mt-8 font-heading text-lg font-semibold text-foreground">
                Based on your answers
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                {lines.map((line, i) => (
                  <li
                    key={i}
                    className={
                      line.tier === "strong"
                        ? "text-emerald-900"
                        : line.tier === "moderate"
                          ? "text-amber-950"
                          : "text-muted"
                    }
                  >
                    <span className="font-semibold text-foreground">
                      {line.tier === "strong"
                        ? "Strong: "
                        : line.tier === "moderate"
                          ? "Moderate: "
                          : ""}
                    </span>
                    {line.text}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/appeal"
                  className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary px-5 py-3 text-center text-sm font-semibold text-white no-underline shadow-sm hover:bg-primary-hover sm:flex-none sm:min-w-[200px]"
                >
                  Generate your appeal letter — from £6.99
                </Link>
                <Link
                  href="/codes"
                  className="inline-flex flex-1 items-center justify-center rounded-lg border-2 border-primary bg-background px-5 py-3 text-center text-sm font-semibold text-primary no-underline hover:bg-surface sm:flex-none sm:min-w-[200px]"
                >
                  Look up your contravention code
                </Link>
              </div>

              <p className="mt-8 text-xs leading-relaxed text-muted">
                This assessment is a guide only. It is not legal advice. Appeal
                outcomes depend on the specific facts of your case and the
                discretion of the issuing council. There is no guarantee of
                success.
              </p>

              <button
                type="button"
                className="mt-6 text-sm font-medium text-muted underline-offset-2 hover:text-primary"
                onClick={resetAll}
              >
                Start again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StepShell({
  title,
  subtitle,
  onBack,
  backLabel = "← Back",
  children,
}: {
  title: string;
  subtitle?: string;
  onBack: (() => void) | null;
  backLabel?: string;
  children: ReactNode;
}) {
  return (
    <div>
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="mb-6 text-sm font-medium text-primary hover:text-primary-hover"
        >
          {backLabel}
        </button>
      ) : null}
      <h2 className="font-heading text-xl font-semibold text-foreground">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 text-sm leading-relaxed text-muted">{subtitle}</p>
      ) : null}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function OptionList<T extends string>({
  options,
  selectedId,
  onSelect,
}: {
  options: { id: T; label: string }[];
  selectedId: T | null;
  onSelect: (id: T) => void;
}) {
  return (
    <ul className="flex flex-col gap-2">
      {options.map((opt) => {
        const selected = selectedId === opt.id;
        return (
          <li key={opt.id}>
            <button
              type="button"
              onClick={() => onSelect(opt.id)}
              className={`w-full rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-colors ${
                selected
                  ? "border-primary bg-emerald-50/80 text-primary ring-1 ring-primary/20"
                  : "border-border bg-surface text-foreground hover:border-primary/40 hover:bg-background"
              }`}
            >
              {opt.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function CheckboxGroup<
  K extends string,
>({
  items,
  selected,
  onToggle,
}: {
  items: { key: K; label: string }[];
  selected: Set<K>;
  onToggle: (key: K) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="sr-only">Select all that apply</legend>
      {items.map((item) => {
        const isOn = selected.has(item.key);
        return (
          <label
            key={item.key}
            className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 px-4 py-3 text-sm transition-colors ${
              isOn
                ? "border-primary bg-emerald-50/80 ring-1 ring-primary/20"
                : "border-border bg-surface hover:border-primary/40"
            }`}
          >
            <input
              type="checkbox"
              checked={isOn}
              onChange={() => onToggle(item.key)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-primary focus:ring-accent"
            />
            <span className="text-foreground">{item.label}</span>
          </label>
        );
      })}
    </fieldset>
  );
}
