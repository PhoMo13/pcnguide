export default function TermsPage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-muted">Last updated: May 2026</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="space-y-10 text-muted leading-relaxed">
          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              1. About PCNGuide
            </h2>
            <p className="mt-4">
              PCNGuide provides parking fine information, tools and appeal letter
              generation services. By using this site you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              2. Information only — not legal advice
            </h2>
            <p className="mt-4">
              All content on PCNGuide is provided for information purposes only. It
              does not constitute legal advice. We are not solicitors. You should
              not rely solely on information from PCNGuide when deciding whether
              to challenge a Penalty Charge Notice. Appeal outcomes cannot be
              guaranteed.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              3. Accuracy
            </h2>
            <p className="mt-4">
              We make every effort to ensure the information on PCNGuide is
              accurate and up to date. However, parking enforcement rules vary
              between councils and change over time. We cannot guarantee that all
              information is current or applicable to your specific situation.
              Always check with your issuing council.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              4. Appeal letter service
            </h2>
            <p className="mt-4">
              When you purchase an appeal letter, you receive an AI-generated
              document based on the information you provide. The quality of the
              letter depends on the accuracy of the information you supply. We do
              not review letters manually before delivery. Letters are provided as
              a starting point — you should review and edit them before
              submission.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              5. Payment and refunds
            </h2>
            <p className="mt-4">
              Payments are processed securely by Stripe. As appeal letters are
              generated and delivered digitally upon payment, we do not offer
              refunds once a letter has been generated. If you experience a
              technical issue that prevented delivery, contact us within 48
              hours.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              6. Acceptable use
            </h2>
            <p className="mt-4">
              You must not use PCNGuide to submit false information, generate
              fraudulent documents, or misrepresent the circumstances of a PCN to
              a council or tribunal.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              7. Limitation of liability
            </h2>
            <p className="mt-4">
              PCNGuide is not liable for any outcome of an appeal, including the
              upholding or cancellation of a Penalty Charge Notice. We are not
              liable for any loss arising from reliance on information provided on
              this site.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              8. Governing law
            </h2>
            <p className="mt-4">
              These terms are governed by the laws of England and Wales.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
