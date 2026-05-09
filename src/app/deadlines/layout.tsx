import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PCN Deadline Tracker — Calculate Your Appeal Deadlines",
  description:
    "Enter your PCN issue date and instantly calculate all your appeal deadlines — reduced payment, challenge window, Notice to Owner, and more. Free tool.",
  alternates: { canonical: "https://www.pcnguide.co.uk/deadlines" },
};

export default function DeadlinesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
