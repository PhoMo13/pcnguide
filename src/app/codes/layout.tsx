import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contravention Code Lookup — Find Your PCN Code",
  description:
    "Look up any UK parking contravention code. Find out exactly what your code means, what the warden should have checked, and whether you have grounds to appeal.",
  alternates: { canonical: "https://www.pcnguide.co.uk/codes" },
};

export default function CodesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
