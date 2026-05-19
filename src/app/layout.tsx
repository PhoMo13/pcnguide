import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CookieBanner } from "@/components/ui/CookieBanner";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pcnguide.co.uk"),
  title: {
    default: "PCNGuide — UK Parking Fine Appeals | Insider Warden Knowledge",
    template: "%s | PCNGuide",
  },
  description:
    "Beat your parking fine with insider knowledge from a serving traffic warden. Free contravention code lookup, PCN checker, deadline tracker and AI appeal letter generator.",
  keywords: [
    "parking fine appeal",
    "PCN appeal",
    "penalty charge notice",
    "contravention code",
    "parking ticket UK",
    "how to appeal parking fine",
    "traffic warden",
  ],
  authors: [{ name: "PCNGuide" }],
  creator: "PCNGuide",
  publisher: "PCNGuide",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://www.pcnguide.co.uk",
    siteName: "PCNGuide",
    title: "PCNGuide — UK Parking Fine Appeals | Insider Warden Knowledge",
    description:
      "Beat your parking fine with insider knowledge from a serving traffic warden. Free advice, appeal letter generator, and contravention code lookup.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PCNGuide — UK Parking Fine Appeals",
    description:
      "Beat your parking fine with insider knowledge from a serving traffic warden.",
  },
  alternates: {
    canonical: "https://www.pcnguide.co.uk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={fraunces.variable}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-99VNQ4GFXQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-99VNQ4GFXQ', {
      anonymize_ip: true
    });
  `}
        </Script>
      </head>
      <body
        className={`${dmSans.variable} ${jetbrainsMono.variable} flex min-h-screen flex-col font-sans antialiased`}
      >
        <a
          href="#main-content"
          className="absolute -left-[9999px] top-4 z-[100] rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-md focus:left-4 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
