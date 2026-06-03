import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "../../../components/ui/Container";
import { Button } from "../../../components/ui/Button";
import { Reveal } from "../../../components/Reveal";
import { distances, ecosystem, macro } from "../../../data/project";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "location" });
  return {
    title: t("metaTitle"),
    description:
      "Where is Bodaiju Residences? In Medini Zone C, Iskandar Puteri — 9 km from the Tuas Second Link, ~2 km from LEGOLAND, minutes from EduCity and Gleneagles, inside the JS-SEZ. Full distance table and connectivity guide.",
    alternates: { canonical: "/location" },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale); // enable static rendering for this locale
  return <LocationContent />;
}

function LocationContent() {
  const t = useTranslations("location");
  const c = useTranslations("common");
  const pl = useTranslations("places");

  const catLabel: Record<string, string> = {
    border: t("catBorder"),
    transport: t("catTransport"),
    retail: t("catRetail"),
    education: t("catEducation"),
    healthcare: t("catHealthcare"),
    leisure: t("catLeisure"),
  };

  return (
    <>
      <section className="section-dark pt-32 pb-16">
        <Container>
          <Reveal immediate>
            <p className="eyebrow">{t("heroEyebrow")}</p>
            <h1 className="heading-tight mt-4 max-w-3xl font-serif text-[var(--text-h1)] font-semibold">
              {t("heroTitle")}
            </h1>
            {/* Answer-first capsule (GEO: front-loaded 40–60 word answer) */}
            <p className="mt-5 max-w-2xl text-lg text-[var(--color-cream)]/80">
              {t("heroSubtitle")}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Distance table */}
      <section className="py-16">
        <Container>
          <Reveal>
            <h2 className="heading-tight font-serif text-[var(--text-h2)] font-semibold text-[var(--color-ink)]">
              {t("distTitle")}
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--color-muted)]">
              {t("distSubtitle")}
            </p>
          </Reveal>
          <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--color-cream-deep)] text-[var(--color-ink)]">
                <tr>
                  <th className="px-5 py-3 font-semibold">{t("thDestination")}</th>
                  <th className="px-5 py-3 font-semibold">{t("thDistance")}</th>
                  <th className="px-5 py-3 font-semibold">{t("thTime")}</th>
                  <th className="hidden px-5 py-3 font-semibold sm:table-cell">{t("thCategory")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-line)] bg-[var(--color-paper)]">
                {distances.map((d, i) => (
                  <tr key={d.place}>
                    <td className="px-5 py-3 text-[var(--color-ink)]">{pl(`d${i}`)}</td>
                    <td className="figure px-5 py-3 text-[var(--color-ink-soft)]">{d.distance}</td>
                    <td className="px-5 py-3 text-[var(--color-muted)]">{pl(`t${i}`)}</td>
                    <td className="hidden px-5 py-3 text-[var(--color-muted)] sm:table-cell">{catLabel[d.category]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* JS-SEZ + RTS */}
      <section className="bg-[var(--color-cream-deep)] py-16">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal>
              <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)] p-7 h-full">
                <p className="eyebrow">{t("macroEyebrow")}</p>
                <h3 className="mt-3 font-serif text-xl font-semibold text-[var(--color-ink)]">{macro.jsSez.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{t("jsSezNote")}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{t("jsSezIncentives")}</p>
                <p className="mt-3 text-sm font-medium text-[var(--color-ink)]">{t("jsSezFdi")}</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)] p-7 h-full">
                <p className="eyebrow">{t("connectivityEyebrow")}</p>
                <h3 className="mt-3 font-serif text-xl font-semibold text-[var(--color-ink)]">{macro.rtsLink.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                  {t("rtsBody", {
                    route: macro.rtsLink.route,
                    minutes: macro.rtsLink.journeyMinutes,
                    serviceStart: macro.rtsLink.serviceStart,
                  })}
                </p>
                <p className="mt-3 rounded-lg bg-[var(--color-cream)] p-3 text-sm text-[var(--color-ink-soft)]">
                  <strong>{t("honestLabel")}</strong> {t("rtsHonest", { km: macro.rtsLink.distanceFromBodajuKm })}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Ecosystem */}
      <section className="py-16">
        <Container>
          <Reveal>
            <h2 className="heading-tight font-serif text-[var(--text-h2)] font-semibold text-[var(--color-ink)]">
              {t("neighbourhoodTitle")}
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--color-muted)]">{t("ecosystemNote")}</p>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {([
              [t("catEducationTitle"), ecosystem.education],
              [t("catHealthcareTitle"), ecosystem.healthcare],
              [t("catShoppingTitle"), ecosystem.retail],
              [t("catLeisureTitle"), ecosystem.leisure],
            ] as const).map(([title, items], i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)] p-6 h-full">
                  <h3 className="font-serif text-lg font-semibold text-[var(--color-ink)]">{title}</h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-[var(--color-muted)]">
                    {items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-dark py-16">
        <Container className="text-center">
          <h2 className="heading-tight mx-auto max-w-xl font-serif text-[var(--text-h2)] font-semibold">
            {t("finalTitle")}
          </h2>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Button href="/calculator" variant="gold" size="lg">{c("calcCta")} →</Button>
            <Button href="/units" variant="outline" size="lg" className="border-white/30 text-[var(--color-cream)] hover:border-white">{c("viewResidences")}</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
