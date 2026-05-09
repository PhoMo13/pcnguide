import Link from "next/link";
import type { ReactNode } from "react";

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:text-primary-hover"
    >
      {children}
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted">Last updated: May 2026</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="space-y-10 text-muted leading-relaxed">
          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              1. Who we are
            </h2>
            <p className="mt-4">
              PCNGuide (pcnguide.co.uk) is operated as an independent information
              service. For data enquiries, contact us via our{" "}
              <Link
                href="/contact"
                className="font-medium text-primary no-underline hover:underline"
              >
                contact page
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              2. What data we collect
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                Email addresses (when you sign up for deadline reminders or
                contact us)
              </li>
              <li>
                PCN details you enter into our tools (date, reference number,
                contravention code)
              </li>
              <li>
                Payment information (processed securely by Stripe — we do not
                store card details)
              </li>
              <li>
                Usage data (standard analytics — pages visited, time on site)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              3. How we use your data
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>To send deadline reminders you have requested</li>
              <li>To generate your appeal letter</li>
              <li>To respond to your enquiries</li>
              <li>To improve the site</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              4. Data storage
            </h2>
            <p className="mt-4">
              PCN details entered into our tools are processed to generate your
              appeal letter and are not stored permanently on our servers beyond
              what is necessary to complete the transaction. Email addresses for
              reminder services are stored securely.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              5. Third parties
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                Stripe (payment processing) —{" "}
                <ExternalLink href="https://stripe.com/privacy">
                  stripe.com/privacy
                </ExternalLink>
              </li>
              <li>
                Supabase (database) —{" "}
                <ExternalLink href="https://supabase.com/privacy">
                  supabase.com/privacy
                </ExternalLink>
              </li>
              <li>
                Vercel (hosting) —{" "}
                <ExternalLink href="https://vercel.com/legal/privacy-policy">
                  vercel.com/legal/privacy-policy
                </ExternalLink>
              </li>
              <li>
                Resend (email) —{" "}
                <ExternalLink href="https://resend.com/privacy">
                  resend.com/privacy
                </ExternalLink>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              6. Your rights
            </h2>
            <p className="mt-4">
              Under UK GDPR you have the right to access, correct or delete your
              personal data. Contact us via our{" "}
              <Link
                href="/contact"
                className="font-medium text-primary no-underline hover:underline"
              >
                contact page
              </Link>{" "}
              to make a request.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              7. Cookies
            </h2>
            <p className="mt-4">
              PCNGuide uses essential cookies only. We do not use tracking or
              advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              8. Changes
            </h2>
            <p className="mt-4">
              We may update this policy. The date at the top of this page shows
              when it was last updated.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
