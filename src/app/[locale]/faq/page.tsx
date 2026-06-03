import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "../../../components/ui/Container";
import { Button } from "../../../components/ui/Button";
import { faqs } from "../../../data/project";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return {
    title: t("metaTitle"),
    description:
      "Straight answers on tenure, foreign-buyer eligibility, total cost, oversupply, construction risk and financing for Bodaiju Residences @ Medini.",
    alternates: { canonical: "/faq" },
  };
}

// FAQ structured data for rich results in Google. Kept in English on purpose:
// search engines index a single canonical machine-readable Q&A set.
function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale); // enable static rendering for this locale
  return <FaqContent />;
}

function FaqContent() {
  const t = useTranslations("faq");
  const c = useTranslations("common");
  return (
    <>
      <FaqJsonLd />
      <section className="section-dark pt-32 pb-16">
        <Container>
          <p className="eyebrow">{t("heroEyebrow")}</p>
          <h1 className="heading-tight mt-4 max-w-3xl font-serif text-[var(--text-h1)] font-semibold">
            {t("heroTitle")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[var(--color-cream)]/75">
            {t("heroSubtitle")}
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container size="narrow">
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)] p-5 transition-colors open:bg-[var(--color-cream-deep)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg font-medium text-[var(--color-ink)]">
                  {t(`q${i}`)}
                  <span className="shrink-0 text-[var(--color-gold-deep)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-[var(--color-muted)]">{t(`a${i}`)}</p>
              </details>
            ))}
          </div>

          <div className="mt-12 rounded-[var(--radius-card)] bg-[var(--color-ink)] p-8 text-center text-[var(--color-cream)]">
            <h2 className="font-serif text-xl font-semibold">{t("stillTitle")}</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-[var(--color-cream)]/70">
              {t("stillBody")}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button href="/calculator" variant="gold">{c("calcCta")}</Button>
              <Button href="/contact" variant="outline" className="border-white/30 text-[var(--color-cream)] hover:border-white">{c("contactUs")}</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
