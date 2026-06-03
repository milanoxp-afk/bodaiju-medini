import type { Metadata } from "next";
import { Fraunces, Inter, Geist_Mono, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";
import { routing } from "../../i18n/routing";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Analytics } from "../../components/Analytics";
import { CrispChat } from "../../components/CrispChat";
import { StickyCTA } from "../../components/StickyCTA";
import { StructuredData } from "../../components/StructuredData";

const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap", axes: ["opsz"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-mono-geist", subsets: ["latin"], display: "swap" });

// CJK fonts — Noto's "no tofu" universal family (Simplified Chinese).
// next/font handles subsetting + WOFF2 automatically to protect page speed.
const notoSans = Noto_Sans_SC({ variable: "--font-noto-sans-sc", subsets: ["latin"], weight: ["400", "500", "700"], display: "swap" });
const notoSerif = Noto_Serif_SC({ variable: "--font-noto-serif-sc", subsets: ["latin"], weight: ["500", "600", "700"], display: "swap" });

const SITE_URL = "https://www.bodaijumedini.my";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh";
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: isZh
        ? "菩提树·美迪尼 | 日系服务式公寓，RM299,000起"
        : "Bodaiju Residences @ Medini | Japanese-Inspired Living from RM299,000",
      template: isZh ? "%s | 菩提树·美迪尼" : "%s | Bodaiju Residences @ Medini",
    },
    description: isZh
      ? "菩提树·美迪尼——坐落柔佛依斯干达公主城的日系服务式公寓。RM299,000起，外籍人士可购、无最低价门槛。毗邻第二通道、LEGOLAND、EduCity与Gleneagles，2028年竣工。"
      : "Bodaiju Residences is a Japanese-inspired serviced residence in Medini, Iskandar Puteri — from RM299,000, foreign-eligible with no minimum price. Minutes from the Second Link, LEGOLAND, EduCity and Gleneagles. Completion 2028.",
    alternates: {
      canonical: isZh ? "/zh" : "/",
      // hreflang: bidirectional + x-default (SEO/GEO brief requirement)
      languages: {
        en: "/",
        "zh-Hans": "/zh",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: isZh ? "zh_CN" : "en_MY",
      url: isZh ? `${SITE_URL}/zh` : SITE_URL,
      siteName: isZh ? "菩提树·美迪尼" : "Bodaiju Residences @ Medini",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Bodaiju Residences @ Medini" }],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const fontVars = `${fraunces.variable} ${inter.variable} ${geistMono.variable} ${notoSans.variable} ${notoSerif.variable}`;

  return (
    <html lang={locale === "zh" ? "zh-Hans" : "en"} data-locale={locale}>
      <body className={`${fontVars} antialiased ${locale === "zh" ? "lang-zh" : ""}`}>
        <NextIntlClientProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <StickyCTA />
          <StructuredData />
          <Analytics />
          <CrispChat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
