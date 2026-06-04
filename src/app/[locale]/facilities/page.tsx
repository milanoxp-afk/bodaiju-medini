import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "../../../components/ui/Container";
import { Button } from "../../../components/ui/Button";
import { CrispButton } from "../../../components/CrispButton";
import { Reveal } from "../../../components/Reveal";
import { facilities } from "../../../data/project";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "facilities" });
  return {
    title: t("metaTitle"),
    description:
      "Confirmed facilities at Bodaiju Residences @ Medini — pool, gymnasium, landscaped gardens, multipurpose hall, courts and more, on the Level 7 facilities deck and roof sky garden of Tower A.",
    alternates: { canonical: "/facilities" },
  };
}

const groupKey: Record<string, string> = {
  recreation: "groupRecreation",
  wellness: "groupWellness",
  community: "groupCommunity",
  security: "groupSecurity",
};

export default async function FacilitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FacilitiesContent />;
}

function FacilitiesContent() {
  const t = useTranslations("facilities");
  const c = useTranslations("common");

  return (
    <>
      <section className="section-dark pt-32 pb-16">
        <Container>
          <Reveal immediate>
            <p className="eyebrow">{t("heroEyebrow")}</p>
            <h1 className="heading-tight mt-4 max-w-3xl font-serif text-[var(--text-h1)] font-semibold">
              {t("heroTitle")}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-[var(--color-cream)]/80">{t("heroSubtitle")}</p>
            <p className="mt-5 inline-block rounded-full border border-white/15 px-4 py-1.5 text-sm text-[var(--color-gold-soft)]">
              {t("level8Note")}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {facilities.map((fg, gi) => (
              <Reveal key={fg.group} delay={gi * 70}>
                <div className="h-full rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)] p-7">
                  <h2 className="font-serif text-xl font-semibold text-[var(--color-ink)]">
                    {t(groupKey[fg.group])}
                  </h2>
                  <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {fg.items.map((it) => (
                      <li key={it.key} className="flex items-start gap-2.5 text-sm text-[var(--color-ink-soft)]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-gold)]" />
                        <span>{t(`items.${it.key}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-cream-deep)] p-5 text-sm leading-relaxed text-[var(--color-muted)]">
            {t("caveat")}
          </p>
        </Container>
      </section>

      <section className="section-dark py-16">
        <Container className="text-center">
          <Reveal>
            <h2 className="heading-tight mx-auto max-w-xl font-serif text-[var(--text-h2)] font-semibold">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[var(--color-cream)]/70">{t("ctaBody")}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <CrispButton message="Hi, may I have the full facilities fact sheet and the Level 7 plan for Bodaiju Residences?" location="facilities_cta" variant="gold" size="lg">
                {c("contactUs")}
              </CrispButton>
              <Button href="/units" variant="outline" size="lg" className="border-white/30 text-[var(--color-cream)] hover:border-white">
                {c("viewResidences")}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
