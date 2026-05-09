import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact PCNGuide",
  description:
    "Get in touch with PCNGuide. Report an inaccuracy, make a general enquiry, or ask about our business subscription.",
  alternates: { canonical: "https://www.pcnguide.co.uk/contact" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
