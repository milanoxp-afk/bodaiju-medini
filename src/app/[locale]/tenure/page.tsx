import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "../../../components/ui/Container";
import { Button } from "../../../components/ui/Button";
import { Reveal } from "../../../components/Reveal";
import { project } from "../../../data/project";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tenure" });
  return {
    title: t("metaTitle"),
    description:
      "Is Bodaiju Residences freehold or leasehold? A plain-English guide to Medini's 99-year leasehold, the Private Lease Scheme (PLS), and IIB's PLS-to-freehold conversion programme — with the honest caveats every buyer should check.",
    alternates: { canonical: "/tenure" },
  };
}

export default async function TenurePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale); // enable static rendering for this locale
  return <TenureContent />;
}

function TenureContent() {
  const t = useTranslations("tenure");
  const c = useTranslations("common");
  const questionKeys = ["q0", "q1", "q2", "q3", "q4"] as const;

  return (
    <>
      <section className="section-dark pt-32 pb-16">
        <Container>
          <Reveal immediate>
            <p className="eyebrow">{t("heroEyebrow")}</p>
            <h1 className="heading-tight mt-4 max-w-3xl font-serif text-[var(--text-h1)] font-semibold">
              {t("heroTitle")}
            </h1>
            {/* Answer-first capsule */}
            <p className="mt-5 max-w-2xl text-lg text-[var(--color-cream)]/80">
              {t("heroSubtitle", {
                tenure: project.tenure.label.toLowerCase(),
                expiry: project.tenure.leaseExpiry,
              })}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16">
        <Container size="narrow">
          <Reveal>
            <h2 className="heading-tight font-serif text-[var(--text-h2)] font-semibold text-[var(--color-ink)]">
              {t("s1Title")}
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
              {t("s1Body")}
            </p>
          </Reveal>

          <Reveal>
            <h2 className="heading-tight mt-12 font-serif text-[var(--text-h2)] font-semibold text-[var(--color-ink)]">
              {t("s2Title")}
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">{t("s2Body")}</p>
            <p className="mt-4 rounded-lg bg-[var(--color-cream-deep)] p-4 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              {t("s2Note")}
            </p>
          </Reveal>

          <Reveal>
            <h2 className="heading-tight mt-12 font-serif text-[var(--text-h2)] font-semibold text-[var(--color-ink)]">
              {t("s3Title")}
            </h2>
            <ul className="mt-4 space-y-3 text-[var(--color-muted)]">
              {questionKeys.map((q) => (
                <li key={q} className="flex gap-3">
                  <span className="mt-1 text-[var(--color-gold-text)]">→</span>
                  <span>{t(q)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-[var(--color-muted)]">
              {t("s3Disclaimer")}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="section-dark py-16">
        <Container className="text-center">
          <h2 className="heading-tight mx-auto max-w-xl font-serif text-[var(--text-h2)] font-semibold">
            {t("finalTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[var(--color-cream)]/70">
            {t("finalBody")}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Button href="/faq" variant="gold" size="lg">{t("readFaqCta")} →</Button>
            <Button href="/contact" variant="outline" size="lg" className="border-white/30 text-[var(--color-cream)] hover:border-white">{c("contactUs")}</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
