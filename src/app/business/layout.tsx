import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business PCN Management — Fleet Appeal Letters Subscription",
  description:
    "Stop PCNs costing your business. Monthly subscription for taxis, couriers, delivery fleets and property managers. Unlimited appeal letters from £9.99/month.",
  alternates: { canonical: "https://www.pcnguide.co.uk/business" },
};

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
