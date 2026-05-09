"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { FormEvent, useState } from "react";

const SUBJECT_OPTIONS = [
  "Report an inaccuracy",
  "General enquiry",
  "Business enquiry",
  "Press",
  "Other",
] as const;

const reasons: { title: string; body: ReactNode }[] = [
  {
    title: "Report an inaccuracy",
    body: "If you believe any information on PCNGuide is wrong, please tell us. We take accuracy seriously.",
  },
  {
    title: "General enquiry",
    body: "Questions about the site, our tools, or how we work.",
  },
  {
    title: "Business enquiry",
    body: (
      <>
        Interested in our business subscription? Visit our{" "}
        <Link
          href="/business"
          className="font-semibold text-primary no-underline hover:underline"
        >
          Business page
        </Link>
        .
      </>
    ),
  },
  {
    title: "Press",
    body: "Media enquiries welcome.",
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<string>(SUBJECT_OPTIONS[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (message.trim().length < 20) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject,
          message: message.trim(),
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-w-0 bg-background">
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            Contact PCNGuide
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted md:text-lg">
            Get in touch — we aim to respond within two working days.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl min-w-0 px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="min-w-0">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Why you might contact us
            </h2>
            <ul className="mt-6 space-y-6">
              {reasons.map((item) => (
                <li key={item.title}>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Send a message
            </h2>
            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5 rounded-xl border border-border bg-background p-4 shadow-sm sm:p-6 md:p-8"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-foreground"
                >
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 min-h-[44px] w-full rounded-lg border border-border px-3 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-foreground"
                >
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 min-h-[44px] w-full rounded-lg border border-border px-3 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-medium text-foreground"
                >
                  Subject <span className="text-red-600">*</span>
                </label>
                <select
                  id="contact-subject"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1 min-h-[44px] w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
                >
                  {SUBJECT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-foreground"
                >
                  Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  minLength={20}
                  rows={6}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder="Please include enough detail for us to help (at least 20 characters)."
                  className="mt-1 w-full rounded-lg border border-border px-3 py-2.5 text-foreground placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
                {message.length > 0 && message.trim().length < 20 ? (
                  <p className="mt-1 text-xs text-amber-800">
                    Message must be at least 20 characters.
                  </p>
                ) : null}
              </div>

              {status === "success" ? (
                <p className="text-sm font-medium text-emerald-800" role="status">
                  ✅ Message sent. We&apos;ll be in touch within two working
                  days.
                </p>
              ) : null}
              {status === "error" ? (
                <p className="text-sm font-medium text-red-700" role="alert">
                  Something went wrong. Please try again.
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "loading" || message.trim().length < 20}
                className="min-h-[44px] w-full rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? "Sending…" : "Send message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
