"use client";

import { useMemo, useState } from "react";
import { FAQ_CATEGORIES } from "./faqData";

export function FaqContent() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQ_CATEGORIES;
    return FAQ_CATEGORIES.map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => {
        const blob = `${item.question} ${item.searchText}`.toLowerCase();
        return blob.includes(q);
      }),
    })).filter((cat) => cat.items.length > 0);
  }, [query]);

  function toggle(id: string) {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-8 sm:px-6 md:space-y-10 md:py-12 lg:px-8 lg:py-16">
      <div>
        <label htmlFor="faq-search" className="sr-only">
          Search questions
        </label>
        <input
          id="faq-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions…"
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
          autoComplete="off"
        />
        {query.trim() && filtered.length === 0 ? (
          <p className="mt-3 text-sm text-muted" role="status">
            No questions match &ldquo;{query.trim()}&rdquo;. Try different
            keywords.
          </p>
        ) : null}
      </div>

      {filtered.map((category) => (
        <section key={category.title} className="min-w-0">
          <h2 className="font-heading text-xl font-semibold text-primary md:text-2xl">
            {category.title}
          </h2>
          <div className="mt-4 space-y-2">
            {category.items.map((item) => {
              const isOpen = Boolean(open[item.id]);
              return (
                <div
                  key={item.id}
                  className={`rounded-lg border border-border bg-background shadow-sm transition-colors ${
                    isOpen ? "border-l-4 !border-l-primary" : ""
                  }`}
                >
                  <h3 className="m-0">
                    <button
                      type="button"
                      onClick={() => toggle(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${item.id}`}
                      id={`faq-trigger-${item.id}`}
                      className="flex w-full min-h-[48px] items-center justify-between gap-3 px-4 py-3 text-left text-base font-medium text-foreground hover:bg-surface/80 md:px-5 md:py-4"
                    >
                      <span>{item.question}</span>
                      <span
                        className={`shrink-0 text-primary transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${item.id}`}
                    className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                    }}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="border-t border-border px-4 pb-4 pt-1 text-base leading-relaxed text-muted md:px-5 md:pb-5">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
