import type { Metadata } from "next";
import { FaqContent } from "./FaqContent";

export const metadata: Metadata = {
  title: "Parking Fine FAQ — Common Questions Answered",
  description:
    "Answers to the most common questions about UK parking fines. Can I appeal after 28 days? What if the council rejects my appeal? Do I need a solicitor? All answered here.",
  alternates: { canonical: "https://www.pcnguide.co.uk/faq" },
};

export default function FaqPage() {
  return (
    <div className="min-w-0 bg-background">
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16">
          <h1 className="text-balance font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            Parking Fine FAQs
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Straight answers to the questions we get asked most — written by a
            serving traffic warden.
          </p>
        </div>
      </section>
      <FaqContent />
    </div>
  );
}
