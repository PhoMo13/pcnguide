"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type Plan = "basic" | "pro" | "not_sure";

const FLEET_OPTIONS = [
  { value: "1-5", label: "1–5 vehicles" },
  { value: "6-15", label: "6–15 vehicles" },
  { value: "16-50", label: "16–50 vehicles" },
  { value: "50+", label: "50+ vehicles" },
] as const;

const VEHICLE_OPTIONS = [
  { id: "taxi", label: "Taxis / Private hire" },
  { id: "courier", label: "Courier / Delivery vans" },
  { id: "hgv", label: "HGVs / Lorries" },
  { id: "company_car", label: "Company cars" },
  { id: "other", label: "Other" },
] as const;

function toggleInSet(set: Set<string>, id: string): Set<string> {
  const next = new Set(set);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}

function vehicleLabels(selected: Set<string>): string[] {
  return VEHICLE_OPTIONS.filter((o) => selected.has(o.id)).map((o) => o.label);
}

export default function BusinessPage() {
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fleetSize, setFleetSize] = useState("");
  const [vehicleTypes, setVehicleTypes] = useState<Set<string>>(new Set());
  const [plan, setPlan] = useState<Plan>("not_sure");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleEnquirySubmit(e: FormEvent) {
    e.preventDefault();
    setFormStatus("loading");
    try {
      const res = await fetch("/api/business-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          contactName,
          email,
          phone,
          fleetSize,
          vehicleTypes: vehicleLabels(vehicleTypes),
          plan,
          message,
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (res.ok && data.success) {
        setFormStatus("success");
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  }

  function scrollToEnquiry(preferredPlan?: Plan) {
    if (preferredPlan) setPlan(preferredPlan);
    window.setTimeout(() => {
      document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-primary">
            Business
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance max-w-4xl">
            Stop PCNs Costing Your Business
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted text-balance leading-relaxed">
            A subscription that covers your whole fleet. Appeal letters, deadline
            tracking, and insider enforcement knowledge — for taxis, couriers,
            takeaways and fleets.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-center text-base font-semibold text-white no-underline shadow-sm hover:bg-primary-hover"
            >
              See pricing
            </a>
            <a
              href="#enquiry"
              className="inline-flex items-center justify-center rounded-lg border-2 border-primary bg-background px-5 py-3 text-center text-base font-semibold text-primary no-underline hover:bg-surface"
            >
              Talk to us
            </a>
          </div>
          <p className="mt-8 max-w-2xl text-sm font-medium text-foreground/90 border-l-4 border-accent pl-4">
            Built by a serving traffic warden — we know exactly how PCNs are
            issued
          </p>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-b border-border py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            Built for businesses that move
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "🚕",
                title: "Taxis & Private Hire",
                text: "Stopping on red routes, bus stops, outside hotels. We know the rules — and the mistakes CEOs make.",
              },
              {
                icon: "📦",
                title: "Couriers & Delivery Fleets",
                text: "Loading bay rules, observation times, what counts as genuine loading. Your drivers have rights.",
              },
              {
                icon: "🍕",
                title: "Takeaways & Restaurants",
                text: "Collection stops, double parking, restricted hours. We help you challenge the ones that shouldn't stick.",
              },
              {
                icon: "🏢",
                title: "Property Managers & Dealerships",
                text: "Managing multiple vehicles across multiple locations. One subscription covers everything.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-lg border border-border bg-background p-6 shadow-sm"
              >
                <span className="text-2xl" aria-hidden>
                  {card.icon}
                </span>
                <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-b border-border bg-surface py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            PCNs add up fast
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                stat: "£100",
                text: "Average PCN fine for a higher-band contravention",
              },
              {
                stat: "40%",
                text: "Estimated proportion of PCNs that could be successfully challenged",
              },
              {
                stat: "£1,200+",
                text: "What an unchallenged fleet of 12 vehicles could pay per year",
              },
            ].map((box) => (
              <div
                key={box.stat}
                className="rounded-lg border border-border bg-background p-6 text-center shadow-sm"
              >
                <p className="font-heading text-3xl font-semibold text-primary sm:text-4xl">
                  {box.stat}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {box.text}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted">
            Figures are estimates based on standard Band A penalty rates and
            industry appeal success rates. Individual results vary.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="scroll-mt-20 border-b border-border py-14 sm:py-16"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            Simple, flat-rate pricing
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            No per-letter fees. One monthly subscription covers your whole fleet.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
            {/* Basic */}
            <div className="flex flex-col rounded-xl border-2 border-primary bg-background p-8 shadow-sm">
              <h3 className="font-heading text-xl font-semibold text-foreground">
                Basic
              </h3>
              <p className="mt-2 font-heading text-3xl font-semibold text-primary">
                £9.99
                <span className="text-base font-normal text-muted">
                  /month
                </span>
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-foreground">
                {[
                  "Up to 10 appeal letters per month",
                  "All contravention codes covered",
                  "Deadline tracker for multiple vehicles",
                  "Email support",
                  "Cancel any time",
                ].map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="text-primary" aria-hidden>
                      ✓
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => scrollToEnquiry("basic")}
                className="mt-8 w-full rounded-lg bg-primary px-5 py-3 text-center text-sm font-semibold text-white hover:bg-primary-hover"
              >
                Get started — Basic
              </button>
            </div>

            {/* Pro */}
            <div className="relative flex flex-col rounded-xl bg-primary p-8 text-white shadow-lg ring-2 ring-primary ring-offset-2 ring-offset-background">
              <span className="absolute -top-3 right-6 rounded-full bg-accent px-3 py-1 text-xs font-bold text-foreground">
                Most popular
              </span>
              <h3 className="font-heading text-xl font-semibold">Pro</h3>
              <p className="mt-2 font-heading text-3xl font-semibold text-white">
                £19.99
                <span className="text-base font-normal text-white/80">
                  /month
                </span>
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-white/95">
                {[
                  "Unlimited appeal letters",
                  "Fleet dashboard — track all active PCNs",
                  "Bulk PCN management",
                  "Priority processing",
                  "Monthly PCN summary report",
                  "Phone and email support",
                  "Cancel any time",
                ].map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="text-accent" aria-hidden>
                      ✓
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => scrollToEnquiry("pro")}
                className="mt-8 w-full rounded-lg bg-white px-5 py-3 text-center text-sm font-semibold text-primary hover:bg-white/90"
              >
                Get started — Pro
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-muted">
            Not ready to subscribe?{" "}
            <Link
              href="/appeal"
              className="font-semibold text-primary no-underline hover:underline"
            >
              Individual appeal letters from £6.99
            </Link>
            .
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-border bg-surface py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            How it works
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Sign up and add your vehicles",
                text: "Add your fleet registration numbers to your dashboard",
              },
              {
                step: "2",
                title: "Submit PCNs as they arrive",
                text: "Upload PCN details and we generate your appeal letters instantly",
              },
              {
                step: "3",
                title: "Track and manage everything",
                text: "Monitor all active PCNs, deadlines and outcomes in one place",
              },
            ].map((item) => (
              <li
                key={item.step}
                className="relative rounded-lg border border-border bg-background p-6 shadow-sm"
              >
                <span className="font-mono text-sm font-bold text-accent">
                  {item.step}
                </span>
                <h3 className="mt-2 font-heading text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonials placeholder */}
      <section className="border-b border-border py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            What our business customers say
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-col rounded-lg border border-border bg-surface p-6"
              >
                <p className="flex-1 text-sm italic leading-relaxed text-muted">
                  [Testimonial coming soon — be one of our first business
                  customers and shape the product]
                </p>
                <a
                  href="#enquiry"
                  className="mt-6 inline-flex items-center justify-center rounded-lg border border-primary bg-background px-4 py-2.5 text-center text-sm font-semibold text-primary no-underline hover:bg-surface"
                >
                  Request early access
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section
        id="enquiry"
        className="scroll-mt-20 border-b border-border py-14 sm:py-16"
      >
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            Get in touch
          </h2>
          <p className="mt-2 text-muted">
            Tell us about your fleet and we&apos;ll be in touch within one
            working day.
          </p>

          <form
            onSubmit={handleEnquirySubmit}
            className="mt-8 space-y-5 rounded-xl border border-border bg-background p-6 shadow-sm sm:p-8"
          >
            <div>
              <label
                htmlFor="company-name"
                className="block text-sm font-medium text-foreground"
              >
                Company name <span className="text-red-600">*</span>
              </label>
              <input
                id="company-name"
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border px-3 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>
            <div>
              <label
                htmlFor="contact-name"
                className="block text-sm font-medium text-foreground"
              >
                Contact name <span className="text-red-600">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border px-3 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>
            <div>
              <label
                htmlFor="biz-email"
                className="block text-sm font-medium text-foreground"
              >
                Email address <span className="text-red-600">*</span>
              </label>
              <input
                id="biz-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border px-3 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>
            <div>
              <label
                htmlFor="biz-phone"
                className="block text-sm font-medium text-foreground"
              >
                Phone number
              </label>
              <input
                id="biz-phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border px-3 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>
            <div>
              <label
                htmlFor="fleet-size"
                className="block text-sm font-medium text-foreground"
              >
                Fleet size <span className="text-red-600">*</span>
              </label>
              <select
                id="fleet-size"
                required
                value={fleetSize}
                onChange={(e) => setFleetSize(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
              >
                <option value="">Select…</option>
                {FLEET_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <fieldset>
              <legend className="text-sm font-medium text-foreground">
                Vehicle types
              </legend>
              <div className="mt-3 space-y-2">
                {VEHICLE_OPTIONS.map((o) => (
                  <label
                    key={o.id}
                    className="flex cursor-pointer items-center gap-2 text-sm text-foreground"
                  >
                    <input
                      type="checkbox"
                      checked={vehicleTypes.has(o.id)}
                      onChange={() =>
                        setVehicleTypes((s) => toggleInSet(s, o.id))
                      }
                      className="rounded border-border"
                    />
                    {o.label}
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-medium text-foreground">
                Interested in <span className="text-red-600">*</span>
              </legend>
              <div className="mt-3 space-y-2">
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="plan"
                    checked={plan === "basic"}
                    onChange={() => setPlan("basic")}
                  />
                  Basic (£9.99/month)
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="plan"
                    checked={plan === "pro"}
                    onChange={() => setPlan("pro")}
                  />
                  Pro (£19.99/month)
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="plan"
                    checked={plan === "not_sure"}
                    onChange={() => setPlan("not_sure")}
                  />
                  Not sure yet
                </label>
              </div>
            </fieldset>
            <div>
              <label
                htmlFor="biz-message"
                className="block text-sm font-medium text-foreground"
              >
                Message / anything else we should know
              </label>
              <textarea
                id="biz-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border px-3 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>

            {formStatus === "success" ? (
              <p className="text-sm font-medium text-emerald-800" role="status">
                ✅ Thanks — we&apos;ll be in touch within one working day.
              </p>
            ) : null}
            {formStatus === "error" ? (
              <p className="text-sm font-medium text-red-700" role="alert">
                Something went wrong. Please try again.
              </p>
            ) : null}

            <button
              type="submit"
              disabled={formStatus === "loading"}
              className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
            >
              {formStatus === "loading" ? "Sending…" : "Send enquiry"}
            </button>
          </form>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-primary py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-semibold text-white sm:text-3xl text-balance">
            Ready to stop paying PCNs you don&apos;t owe?
          </h2>
          <a
            href="#enquiry"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-semibold text-primary no-underline shadow-md hover:bg-white/95"
          >
            Get started today
          </a>
        </div>
      </section>
    </div>
  );
}
