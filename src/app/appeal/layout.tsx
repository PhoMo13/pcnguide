import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generate Your Parking Fine Appeal Letter — From £6.99",
  description:
    "Generate a formal parking fine appeal letter based on your specific grounds and contravention code. Written using insider warden knowledge. Standard from £6.99, Premium from £14.99.",
  alternates: { canonical: "https://www.pcnguide.co.uk/appeal" },
};

export default function AppealLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
