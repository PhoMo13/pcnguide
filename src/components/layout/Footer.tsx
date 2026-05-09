import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <nav
          className="flex flex-wrap gap-x-6 gap-y-2"
          aria-label="Footer"
        >
          {footerLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-foreground no-underline hover:text-primary"
            >
              {label}
            </Link>
          ))}
        </nav>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
          PCNGuide provides information and tools to help you understand parking
          enforcement and prepare appeals. This is not legal advice. Information
          is for guidance only and may not reflect the specific rules of your
          local council. Appeal outcomes cannot be guaranteed. Always check your
          PCN and any correspondence from your council carefully.
        </p>
        <p className="mt-4 text-sm text-muted">
          © {year} PCNGuide. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
