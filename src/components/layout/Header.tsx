"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/codes", label: "Code Lookup" },
  { href: "/check", label: "Check Your PCN" },
  { href: "/appeal", label: "Appeal Letter" },
  { href: "/business", label: "Business" },
] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    function handleMouseDown(e: MouseEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-border bg-background"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:gap-4 md:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-h-[44px] shrink-0 items-center font-heading text-xl font-semibold text-primary no-underline hover:text-primary-hover"
        >
          PCNGuide
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground no-underline hover:bg-surface hover:text-primary"
            >
              {label}
            </Link>
          ))}
        </nav>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-end gap-0.5 overflow-x-auto md:flex lg:hidden"
          aria-label="Primary"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="shrink-0 rounded-lg px-2 py-2 text-xs font-medium text-foreground no-underline hover:bg-surface hover:text-primary"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/appeal"
            className="hidden rounded-lg bg-primary px-3 py-2.5 text-xs font-semibold text-white no-underline shadow-sm hover:bg-primary-hover md:inline-flex lg:px-4 lg:py-2 lg:text-sm"
          >
            Start Appeal
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-border text-foreground hover:bg-surface md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="mobile-nav"
          className="border-b border-border bg-background md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex min-h-12 items-center rounded-lg px-3 py-3 text-base font-medium text-foreground no-underline hover:bg-surface"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/appeal"
              className="mt-2 flex min-h-12 w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-center text-base font-semibold text-white no-underline hover:bg-primary-hover"
              onClick={() => setMenuOpen(false)}
            >
              Start Appeal
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
