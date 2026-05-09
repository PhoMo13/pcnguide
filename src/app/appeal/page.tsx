"use client";

import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { AppealData, AppealTier } from "@/lib/letterPrompt";
import { getContraventionByCodeParam, normalizeContraventionCodeParam } from "@/lib/contraventionCodes";

const STRIPE_PUBLISHABLE = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";
const stripePromise = STRIPE_PUBLISHABLE ? loadStripe(STRIPE_PUBLISHABLE) : null;

const GENERATING_MESSAGES = [
  "Analysing your PCN details...",
  "Applying warden knowledge to your grounds...",
  "Drafting your appeal letter...",
] as const;

const GROUND_OPTIONS = [
  {
    id: "signs",
    label:
      "Signs or road markings were missing, damaged or unclear",
  },
  {
    id: "ceo_observe",
    label:
      "The CEO did not observe for long enough before issuing",
  },
  {
    id: "loading",
    label: "I was actively loading or unloading",
  },
  {
    id: "vehicle_wrong",
    label: "The PCN vehicle details are incorrect",
  },
  {
    id: "wrong_code",
    label: "The contravention code does not match what happened",
  },
  {
    id: "payment",
    label: "I had a valid pay and display ticket or payment confirmation",
  },
  {
    id: "blue_badge",
    label: "I had a valid Blue Badge correctly displayed",
  },
  {
    id: "not_in_force",
    label: "The bay or restriction was not in force at the time",
  },
  {
    id: "emergency",
    label: "A genuine emergency prevented me from moving",
  },
  {
    id: "other",
    label: "Other",
  },
] as const;

const EVIDENCE_OPTIONS = [
  {
    id: "photos",
    label: "Photographs of the location, signs or markings",
  },
  {
    id: "ticket",
    label: "Pay and display ticket or payment confirmation",
  },
  {
    id: "badge",
    label: "Blue Badge",
  },
  {
    id: "dashcam",
    label: "Dashcam or witness evidence",
  },
  {
    id: "breakdown",
    label: "Breakdown or emergency service records",
  },
  { id: "none", label: "None of the above" },
] as const;

type GroundId = (typeof GROUND_OPTIONS)[number]["id"];
type EvidenceId = (typeof EVIDENCE_OPTIONS)[number]["id"];

export default function AppealPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [tier, setTier] = useState<AppealTier | null>(null);
  const [pcnNumber, setPcnNumber] = useState("");
  const [pcnDate, setPcnDate] = useState("");
  const [vehicleReg, setVehicleReg] = useState("");
  const [issuingCouncil, setIssuingCouncil] = useState("");
  const [location, setLocation] = useState("");
  const [contraventionCode, setContraventionCode] = useState("");
  const [contraventionDescription, setContraventionDescription] = useState("");
  const [grounds, setGrounds] = useState<Set<GroundId>>(new Set());
  const [groundOther, setGroundOther] = useState("");
  const [evidence, setEvidence] = useState<Set<EvidenceId>>(new Set());
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [paymentInfo, setPaymentInfo] = useState<{
    clientSecret: string;
    mock: boolean;
  } | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [genMessageIndex, setGenMessageIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (step !== 6) return;
    const t = setInterval(() => {
      setGenMessageIndex((i) => (i + 1) % GENERATING_MESSAGES.length);
    }, 2000);
    return () => clearInterval(t);
  }, [step]);

  useEffect(() => {
    const norm = normalizeContraventionCodeParam(contraventionCode.trim());
    if (!norm) return;
    const entry = getContraventionByCodeParam(norm);
    if (entry) {
      setContraventionDescription(
        `${entry.title}. ${entry.description}`,
      );
    }
  }, [contraventionCode]);

  useEffect(() => {
    if (step !== 5 || !tier) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tier }),
        });
        const data = await res.json();
        if (!cancelled && data.clientSecret) {
          setPaymentInfo({
            clientSecret: data.clientSecret,
            mock: Boolean(data.mock),
          });
        }
      } catch {
        if (!cancelled) setPaymentError("Could not prepare payment.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [step, tier]);

  const progress = step;
  const progressPct = (progress / 6) * 100;

  const goBack = useCallback(() => {
    if (step <= 1) {
      router.push("/");
      return;
    }
    setStep((s) => s - 1);
  }, [step, router]);

  const groundsList = useMemo(() => {
    const labels: string[] = [];
    GROUND_OPTIONS.forEach((g) => {
      if (grounds.has(g.id) && g.id !== "other") labels.push(g.label);
    });
    if (grounds.has("other") && groundOther.trim()) {
      labels.push(`Other: ${groundOther.trim()}`);
    } else if (grounds.has("other")) {
      labels.push("Other (details to be provided in additional information)");
    }
    return labels;
  }, [grounds, groundOther]);

  const evidenceList = useMemo(() => {
    if (evidence.has("none")) return ["None of the above"];
    const labels: string[] = [];
    EVIDENCE_OPTIONS.forEach((e) => {
      if (evidence.has(e.id) && e.id !== "none") labels.push(e.label);
    });
    return labels;
  }, [evidence]);

  const buildAppealData = useCallback((): AppealData | null => {
    if (!tier) return null;
    return {
      tier,
      contraventionCode: contraventionCode.trim(),
      contraventionDescription: contraventionDescription.trim(),
      pcnNumber: pcnNumber.trim(),
      pcnDate,
      vehicleReg: vehicleReg.trim().toUpperCase(),
      issuingCouncil: issuingCouncil.trim(),
      location: location.trim(),
      grounds: groundsList,
      evidence: evidenceList,
      additionalInfo,
    };
  }, [
    tier,
    contraventionCode,
    contraventionDescription,
    pcnNumber,
    pcnDate,
    vehicleReg,
    issuingCouncil,
    location,
    groundsList,
    evidenceList,
    additionalInfo,
  ]);

  const validateStep2 =
    pcnNumber.trim() &&
    pcnDate &&
    vehicleReg.trim() &&
    issuingCouncil.trim() &&
    location.trim() &&
    contraventionCode.trim() &&
    contraventionDescription.trim();

  const validateStep3 =
    grounds.size > 0 &&
    (!grounds.has("other") || groundOther.trim().length > 0);

  const validateStep4 = evidence.size > 0;

  const toggleGround = (id: GroundId) => {
    setGrounds((prev) => {
      const n = new Set(prev);
      if (id === "other") {
        if (n.has("other")) {
          n.delete("other");
        } else {
          n.add("other");
        }
        return n;
      }
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  const toggleEvidence = (id: EvidenceId) => {
    setEvidence((prev) => {
      const n = new Set(prev);
      if (id === "none") {
        return new Set<EvidenceId>(["none"]);
      }
      n.delete("none");
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  const runGeneration = async () => {
    const data = buildAppealData();
    if (!data) return;
    setStep(6);
    setSubmitting(true);
    setPaymentError(null);
    try {
      const res = await fetch("/api/generate-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const out = await res.json();
      if (!res.ok) {
        throw new Error(out.error || "Generation failed");
      }
      sessionStorage.setItem(
        "pcnguideAppealResult",
        JSON.stringify({
          pcnDate: data.pcnDate,
          tier: data.tier,
          letter: out.letter as string,
          ntoLetter: out.ntoLetter as string | undefined,
          evidenceChecklist: out.evidenceChecklist as string | undefined,
          submissionGuide: out.submissionGuide as string | undefined,
        }),
      );
      router.push("/appeal/success");
    } catch (e) {
      setPaymentError(
        e instanceof Error ? e.message : "Could not generate letter.",
      );
      setStep(5);
    } finally {
      setSubmitting(false);
    }
  };

  const cardStyle = {
    style: {
      base: {
        fontSize: "16px",
        color: "#1a1a1a",
        "::placeholder": { color: "#6b7280" },
      },
      invalid: { color: "#991b1b" },
    },
  };

  return (
    <div className="min-h-[70vh] bg-background px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-[640px]">
        <h1 className="text-center font-heading text-2xl font-semibold text-foreground sm:text-3xl">
          Appeal letter generator
        </h1>
        <p className="mt-2 text-center text-sm text-muted">
          Build a formal challenge letter from your facts. Not legal advice.
        </p>

        <div className="mt-8">
          <div className="flex justify-between text-xs font-medium text-muted">
            <span>Step {Math.min(step, 6)} of 6</span>
            <span className="tabular-nums">{Math.round(progressPct)}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface ring-1 ring-border">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div
          key={step}
          className="animate-step-in mt-10 rounded-lg border border-border bg-background p-6 shadow-sm sm:p-8"
        >
          {step === 1 && (
            <StepShell title="Choose your tier" onBack={goBack} backLabel="← Home">
              <div className="grid gap-4 sm:grid-cols-2">
                <TierCard
                  title="Standard"
                  price="£6.99"
                  badge={null}
                  features={[
                    "AI-generated appeal letter",
                    "Covers your contravention code and grounds",
                    "Formally structured for council submission",
                    "Downloadable instantly",
                  ]}
                  selected={tier === "standard"}
                  onSelect={() => {
                    setTier("standard");
                    setStep(2);
                  }}
                  cta="Select Standard"
                />
                <TierCard
                  title="Premium"
                  price="£14.99"
                  badge="Best value"
                  features={[
                    "Everything in Standard, plus:",
                    "Second letter for NtO stage if first appeal rejected",
                    "Stronger warden-specific procedural language",
                    "Evidence checklist for your specific case",
                    "Step-by-step submission guide",
                  ]}
                  selected={tier === "premium"}
                  onSelect={() => {
                    setTier("premium");
                    setStep(2);
                  }}
                  cta="Select Premium"
                />
              </div>
            </StepShell>
          )}

          {step === 2 && (
            <StepShell title="Your PCN details" onBack={goBack}>
              <div className="space-y-4">
                <Field
                  label="PCN number"
                  required
                  value={pcnNumber}
                  onChange={setPcnNumber}
                  placeholder="e.g. AB12345678"
                />
                <div>
                  <label className="block text-sm font-medium text-foreground">
                    Date of PCN <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={pcnDate}
                    onChange={(e) => setPcnDate(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>
                <Field
                  label="Vehicle registration"
                  required
                  value={vehicleReg}
                  onChange={(v) => setVehicleReg(v.toUpperCase())}
                  placeholder="AB12 CDE"
                />
                <Field
                  label="Issuing council"
                  required
                  value={issuingCouncil}
                  onChange={setIssuingCouncil}
                  placeholder="e.g. Manchester City Council"
                />
                <Field
                  label="Location of contravention"
                  required
                  value={location}
                  onChange={setLocation}
                  placeholder="e.g. High Street, Manchester"
                />
                <div>
                  <label className="block text-sm font-medium text-foreground">
                    Contravention code <span className="text-red-600">*</span>
                  </label>
                  <input
                    value={contraventionCode}
                    onChange={(e) => setContraventionCode(e.target.value)}
                    placeholder="e.g. 01, 30, 45"
                    className="mt-1 w-full rounded-lg border border-border px-3 py-2 font-mono text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                  <p className="mt-1 text-xs text-muted">
                    <Link
                      href="/codes"
                      className="font-medium text-primary hover:text-primary-hover"
                    >
                      Look up your code
                    </Link>
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">
                    Contravention description{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    value={contraventionDescription}
                    onChange={(e) => setContraventionDescription(e.target.value)}
                    rows={4}
                    className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
                    placeholder="Describe the contravention as on your PCN, or edit the auto-filled text."
                  />
                </div>
                <button
                  type="button"
                  disabled={!validateStep2}
                  onClick={() => setStep(3)}
                  className="mt-4 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            </StepShell>
          )}

          {step === 3 && (
            <StepShell title="Your grounds" onBack={goBack}>
              <p className="text-sm text-muted">
                Select all that apply. These will shape your letter.
              </p>
              <ul className="mt-4 space-y-2">
                {GROUND_OPTIONS.map((g) => (
                  <li key={g.id}>
                    <label
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 px-3 py-2.5 text-sm ${
                        grounds.has(g.id)
                          ? "border-primary bg-emerald-50/80 ring-1 ring-primary/20"
                          : "border-border bg-surface"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={grounds.has(g.id)}
                        onChange={() => toggleGround(g.id)}
                        className="mt-0.5 h-4 w-4 rounded border-border text-primary"
                      />
                      <span>{g.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
              {grounds.has("other") ? (
                <textarea
                  value={groundOther}
                  onChange={(e) => setGroundOther(e.target.value)}
                  placeholder="Describe your other ground"
                  rows={3}
                  className="mt-3 w-full rounded-lg border border-border px-3 py-2 text-sm"
                />
              ) : null}
              <button
                type="button"
                disabled={!validateStep3}
                onClick={() => setStep(4)}
                className="mt-6 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-50"
              >
                Continue
              </button>
            </StepShell>
          )}

          {step === 4 && (
            <StepShell title="Evidence you have" onBack={goBack}>
              <ul className="space-y-2">
                {EVIDENCE_OPTIONS.map((e) => (
                  <li key={e.id}>
                    <label
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 px-3 py-2.5 text-sm ${
                        evidence.has(e.id)
                          ? "border-primary bg-emerald-50/80 ring-1 ring-primary/20"
                          : "border-border bg-surface"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={evidence.has(e.id)}
                        onChange={() => toggleEvidence(e.id)}
                        className="mt-0.5 h-4 w-4 rounded border-border text-primary"
                      />
                      <span>{e.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <label className="block text-sm font-medium text-foreground">
                  Additional information
                </label>
                <p className="text-xs text-muted">
                  Tell us anything else relevant. Include context the council
                  should know.
                </p>
                <textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  rows={5}
                  className="mt-2 w-full rounded-lg border border-border px-3 py-2 text-sm"
                />
              </div>
              <button
                type="button"
                disabled={!validateStep4}
                onClick={() => setStep(5)}
                className="mt-6 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-50"
              >
                Continue
              </button>
            </StepShell>
          )}

          {step === 5 && tier && (
            <StepShell title="Payment" onBack={goBack}>
              <div className="rounded-lg border border-border bg-surface p-4">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  Order summary
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {tier === "standard" ? "Standard" : "Premium"} —{" "}
                  {tier === "standard" ? "£6.99" : "£14.99"}
                </p>
                <ul className="mt-3 list-inside list-disc text-sm text-foreground">
                  {tier === "standard" ? (
                    <>
                      <li>AI-generated appeal letter</li>
                      <li>Tailored to your grounds and PCN details</li>
                      <li>Ready to download after payment</li>
                    </>
                  ) : (
                    <>
                      <li>First appeal letter + NtO-stage template</li>
                      <li>Evidence checklist and submission guide</li>
                      <li>Stronger procedural framing</li>
                    </>
                  )}
                </ul>
              </div>

              {paymentError ? (
                <p className="mt-4 text-sm text-red-700">{paymentError}</p>
              ) : null}

              {!paymentInfo && !paymentError ? (
                <p className="mt-4 text-sm text-muted">Preparing payment…</p>
              ) : null}

              <div className="mt-6">
                {stripePromise &&
                paymentInfo &&
                !paymentInfo.mock &&
                paymentInfo.clientSecret.startsWith("pi_") ? (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret: paymentInfo.clientSecret,
                      appearance: {
                        theme: "stripe",
                        variables: {
                          colorPrimary: "#1b4332",
                          borderRadius: "8px",
                        },
                      },
                    }}
                  >
                    <LivePaymentForm
                      clientSecret={paymentInfo.clientSecret}
                      onPaid={runGeneration}
                      disabled={submitting}
                      cardStyle={cardStyle}
                    />
                  </Elements>
                ) : (
                  <div className="rounded-lg border border-dashed border-border bg-surface p-4">
                    <p className="text-sm font-medium text-foreground">
                      Payment integration coming soon — your letter will be
                      generated instantly for testing
                    </p>
                    <div className="mt-4 space-y-2 opacity-50 pointer-events-none">
                      <div className="h-10 rounded-lg border border-border bg-white" />
                      <div className="h-10 rounded-lg border border-border bg-white" />
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-10 rounded-lg border border-border bg-white" />
                        <div className="h-10 rounded-lg border border-border bg-white" />
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={runGeneration}
                      className="mt-6 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-50"
                    >
                      Generate my appeal letter
                    </button>
                  </div>
                )}
              </div>

              <p className="mt-4 text-xs text-muted">
                Payments secured by Stripe. We do not store your card details.
              </p>
            </StepShell>
          )}

          {step === 6 && (
            <div className="py-8 text-center">
              <div
                className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent"
                aria-hidden
              />
              <p className="mt-6 font-medium text-foreground">
                {GENERATING_MESSAGES[genMessageIndex]}
              </p>
              <p className="mt-2 text-sm text-muted">Please wait…</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LivePaymentForm({
  clientSecret,
  onPaid,
  disabled,
  cardStyle,
}: {
  clientSecret: string;
  onPaid: () => void | Promise<void>;
  disabled: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cardStyle: any;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const handle = async () => {
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) return;
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card },
      },
    );
    if (error) {
      alert(error.message ?? "Payment failed");
      return;
    }
    if (paymentIntent?.status === "succeeded") {
      await onPaid();
    }
  };

  return (
    <div>
      <div className="rounded-lg border border-border bg-white p-3">
        <CardElement options={cardStyle} />
      </div>
      <button
        type="button"
        onClick={() => void handle()}
        disabled={disabled || !stripe}
        className="mt-6 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-50"
      >
        Generate my appeal letter
      </button>
    </div>
  );
}

function TierCard({
  title,
  price,
  badge,
  features,
  selected,
  onSelect,
  cta,
}: {
  title: string;
  price: string;
  badge: string | null;
  features: string[];
  selected: boolean;
  onSelect: () => void;
  cta: string;
}) {
  return (
    <div
      className={`flex flex-col rounded-lg border-2 p-4 ${
        selected
          ? "border-primary bg-emerald-50/50 ring-1 ring-primary/20"
          : "border-border bg-surface"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-heading text-lg font-semibold text-foreground">
          {title}
        </h3>
        {badge ? (
          <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-amber-950">
            {badge}
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-2xl font-semibold text-primary">{price}</p>
      <ul className="mt-4 flex-1 space-y-2 text-sm text-muted">
        {features.map((f) => (
          <li key={f} className="flex gap-2">
            <span className="text-primary" aria-hidden>
              •
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onSelect}
        className="mt-6 w-full rounded-lg border-2 border-primary bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
      >
        {cta}
      </button>
    </div>
  );
}

function StepShell({
  title,
  children,
  onBack,
  backLabel = "← Back",
}: {
  title: string;
  children: ReactNode;
  onBack: () => void;
  backLabel?: string;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-6 text-sm font-medium text-primary hover:text-primary-hover"
      >
        {backLabel}
      </button>
      <h2 className="font-heading text-xl font-semibold text-foreground">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground">
        {label}{" "}
        {required ? <span className="text-red-600">*</span> : null}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
      />
    </div>
  );
}