import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "../../../components/ui/Container";
import { CostCalculator } from "../../../components/CostCalculator";
import { Reveal } from "../../../components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "calculator" });
  return {
    title: t("metaTitle"),
    description:
      "Calculate the full upfront cost of a Bodaiju Residences unit as a Singaporean or foreign buyer — including 8% stamp duty, Johor state consent and legal fees, in both MYR and SGD.",
    alternates: { canonical: "/calculator" },
  };
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale); // enable static rendering for this locale
  return <CalculatorContent />;
}

function CalculatorContent() {
  const t = useTranslations("calculator");
  return (
    <>
      <section className="section-dark pt-32 pb-16">
        <Container>
          <Reveal immediate>
            <p className="eyebrow">{t("heroEyebrow")}</p>
            <h1 className="heading-tight mt-4 max-w-3xl font-serif text-[var(--text-h1)] font-semibold">
              {t("heroTitle")}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-[var(--color-cream)]/75">
              {t("heroSubtitle")}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <CostCalculator />
        </Container>
      </section>

      <section className="pb-8">
        <Container>
          <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-cream-deep)] p-6 text-sm leading-relaxed text-[var(--color-muted)]">
            <strong className="text-[var(--color-ink)]">{t("howWeCalc")}</strong> {t("howWeCalcBody")}
          </div>
        </Container>
      </section>
    </>
  );
}
