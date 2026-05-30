import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { Analytics } from "../components/Analytics";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://www.bodaiju-residence.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bodaiju Residences @ Medini | Japanese-Inspired Living from RM299,000",
    template: "%s | Bodaiju Residences @ Medini",
  },
  description:
    "Bodaiju Residences is a Japanese-inspired serviced residence in Medini, Iskandar Puteri — from RM299,000, foreign-eligible with no minimum price. Minutes from the Second Link, LEGOLAND, EduCity and Gleneagles. Completion 2028.",
  keywords: [
    "Bodaiju Residences",
    "Bodaiju Medini",
    "Medini property for sale",
    "Iskandar Puteri serviced residence",
    "Johor property for Singaporeans",
    "Medini no minimum price foreign buyer",
    "Creed Property Malaysia",
    "property near LEGOLAND Johor",
    "RTS Link property Johor",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: SITE_URL,
    siteName: "Bodaiju Residences @ Medini",
    title: "Bodaiju Residences @ Medini | From RM299,000",
    description:
      "Japanese-inspired serviced residences in Medini, Iskandar Puteri. Foreign-eligible with no minimum price. Minutes from the Second Link, LEGOLAND and EduCity.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Bodaiju Residences @ Medini" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bodaiju Residences @ Medini | From RM299,000",
    description:
      "Japanese-inspired serviced residences in Medini, Iskandar Puteri. Foreign-eligible, no minimum price.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
