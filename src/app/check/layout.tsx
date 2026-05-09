import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check Your PCN — Do You Have Grounds to Appeal?",
  description:
    "Answer a few questions about your parking fine and find out whether you have grounds to challenge it. Free PCN checker built by a serving traffic warden.",
  alternates: { canonical: "https://www.pcnguide.co.uk/check" },
};

export default function CheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
