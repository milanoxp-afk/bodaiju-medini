import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Container } from "../../components/ui/Container";
import { Button } from "../../components/ui/Button";
import { CrispButton } from "../../components/CrispButton";
import { Reveal } from "../../components/Reveal";
import { BodhiMotif } from "../../components/BodhiMotif";
import { Link } from "../../i18n/routing";
import {
  project,
  units,
  developer,
  contractor,
  sellingPoints,
  distances,
  singaporeAbsd,
  computeCosts,
  rmToSgd,
} from "../../data/project";
import { rm, sgd, num } from "../../lib/format";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale); // enable static rendering for this locale
  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("home");
  const c = useTranslations("common");
  const sp = useTranslations("sellingPoints");
  const ud = useTranslations("unitData");
  const pl = useTranslations("places");

  const typeA = units[0];
  const sgAbsdOnEntry = typeA.priceRm * singaporeAbsd.foreignerRate;
  const foreignerCost = computeCosts(typeA.priceRm, "foreigner");

  const heroStats = [
    { label: c("from"), value: "RM299,000" },
    { label: c("layouts"), value: "1–3" },
    { label: c("builtUp"), value: "463–1,012 sq ft" },
    { label: c("tenure"), value: "99-yr" },
    { label: c("completion"), value: "2028" },
  ];

  return (
    <>
      {/* HERO */}
      <section className="section-dark relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 top-1/2 hidden -translate-y-1/2 text-[var(--color-gold)]/10 lg:block">
          <BodhiMotif className="h-[42rem] w-auto" />
        </div>
        <Container className="relative flex min-h-[92vh] flex-col justify-center pt-28 pb-16">
          <Reveal immediate>
            <p className="eyebrow">{t("heroEyebrow")}</p>
            <h1 className="heading-tight mt-5 max-w-3xl font-serif text-[var(--text-display)] font-semibold">
              {t("heroTitle")}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-cream)]/75">
              {t("heroSubtitle")}
            </p>
          </Reveal>

          <Reveal immediate>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/calculator" variant="gold" size="lg">{c("calculateCost")} →</Button>
              <Button href="/units" variant="outline" size="lg" className="border-white/30 text-[var(--color-cream)] hover:border-white">
                {c("exploreResidences")}
              </Button>
            </div>
            <p className="mt-6 text-sm text-[var(--color-cream)]/55">{t("heroByline")}</p>
          </Reveal>
        </Container>

        <div className="relative border-t border-white/10 bg-black/20">
          <Container>
            <dl className="grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-3 lg:grid-cols-5">
              {heroStats.map((s) => (
                <div key={s.label} className="px-2 py-5 text-center first:pl-0">
                  <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-gold-soft)]">{s.label}</dt>
                  <dd className="figure mt-1 text-lg font-medium text-[var(--color-cream)]">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      </section>

      {/* CONCEPT */}
      <section className="py-24">
        <Container size="narrow" className="text-center">
          <Reveal>
            <BodhiMotif className="mx-auto h-14 w-auto text-[var(--color-sage)]" />
            <p className="eyebrow mt-6">{t("conceptEyebrow")}</p>
            <h2 className="heading-tight mt-4 font-serif text-[var(--text-h2)] font-semibold">{t("conceptTitle")}</h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">{t("conceptBody")}</p>
            <div className="mt-8"><Button href="/units" variant="ghost">{c("discoverConcept")} →</Button></div>
          </Reveal>
        </Container>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-cream-deep)] py-16">
        <Container>
          <Reveal>
            <p className="eyebrow text-center">{t("trustEyebrow")}</p>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              <TrustItem stat="928 units" title={t("trust1Title")} body={t("trust1Body")} />
              <TrustItem stat="RM185.99m" title={t("trust2Title")} body={t("trust2Body")} />
              <TrustItem stat="≠ Forest City" title={t("trust3Title")} body={t("trust3Body")} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ABSD COMPARISON */}
      <section className="py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="eyebrow">{t("absdEyebrow")}</p>
              <h2 className="heading-tight mt-4 font-serif text-[var(--text-h2)] font-semibold">
                <span className="figure">{sgd(rmToSgd(typeA.priceRm))}</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">{t("absdBody1")}</p>
              <p className="mt-4 text-lg leading-relaxed text-[var(--color-muted)]">{t("absdBody2")}</p>
              <div className="mt-8"><Button href="/calculator" variant="primary" size="lg">{t("absdSeeBreakdown")} →</Button></div>
            </Reveal>

            <Reveal delay={120}>
              <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)] shadow-sm">
                <div className="grid grid-cols-2 text-center">
                  <div className="border-r border-[var(--color-line)] p-7">
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">{t("absdSingapore")}</p>
                    <p className="figure mt-3 text-3xl font-semibold text-[var(--color-ink)]">{sgd(rmToSgd(sgAbsdOnEntry))}</p>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">{t("absdSgNote")}</p>
                  </div>
                  <div className="bg-[var(--color-cream)] p-7">
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-text)]">Bodaiju · Type A</p>
                    <p className="figure mt-3 text-3xl font-semibold text-[var(--color-ink)]">{rm(typeA.priceRm)}</p>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">{t("absdBodaijuNote")}</p>
                  </div>
                </div>
                <div className="border-t border-[var(--color-line)] bg-[var(--color-ink)] px-7 py-5 text-center text-sm text-[var(--color-cream)]/80">
                  {t("absdAllIn")} <strong className="text-[var(--color-cream)]">{rm(foreignerCost.totalUpfront)}</strong>{" "}
                  <span className="text-[var(--color-cream)]/55">({sgd(rmToSgd(foreignerCost.totalUpfront))})</span>
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-[var(--color-muted)]">{t("absdDisclaimer")}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* SELLING POINTS */}
      <section className="bg-[var(--color-cream-deep)] py-24">
        <Container>
          <Reveal>
            <p className="eyebrow">{t("sellingEyebrow")}</p>
            <h2 className="heading-tight mt-4 max-w-2xl font-serif text-[var(--text-h2)] font-semibold">{t("sellingTitle")}</h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
            {sellingPoints.map((p, i) => (
              <Reveal key={i} delay={i * 60} className="bg-[var(--color-cream)] p-7">
                <div className="font-serif text-3xl text-[var(--color-gold)]">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-4 font-serif text-lg font-semibold text-[var(--color-ink)]">{sp(`p${i}t`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{sp(`p${i}d`)}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-[var(--color-muted)]">{t("residencesDisclaimer")}</p>
        </Container>
      </section>

      {/* RESIDENCES PREVIEW */}
      <section className="py-24">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">{t("residencesEyebrow")}</p>
                <h2 className="heading-tight mt-4 font-serif text-[var(--text-h2)] font-semibold">{t("residencesTitle")}</h2>
              </div>
              <Button href="/units" variant="ghost">{c("allLayouts")} →</Button>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {units.map((u, i) => (
              <Reveal key={u.code} delay={i * 70}>
                <Link href="/units" className="group block h-full rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-gold)] hover:shadow-lg">
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-2xl font-semibold text-[var(--color-ink)]">{u.label}</span>
                    {u.dualKey && <span className="rounded-full bg-[var(--color-sage)]/15 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-[var(--color-sage-deep)]">{ud("dualKey")}</span>}
                  </div>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{u.bedrooms} {c("layouts")} · {num(u.sqft)} sq ft</p>
                  <div className="mt-5 border-t border-[var(--color-line)] pt-4">
                    <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">{c("from")}</p>
                    <p className="figure text-xl font-semibold text-[var(--color-ink)]">{rm(u.priceRm)}</p>
                  </div>
                  <span className="mt-5 inline-block text-sm font-medium text-[var(--color-gold-text)] transition-transform group-hover:translate-x-1">{c("viewDetails")} →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* LOCATION */}
      <section className="section-dark py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <p className="eyebrow">{t("locationEyebrow")}</p>
              <h2 className="heading-tight mt-4 font-serif text-[var(--text-h2)] font-semibold">{t("locationTitle")}</h2>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-cream)]/70">{t("locationBody")}</p>
              <div className="mt-8"><Button href="/location" variant="gold">{t("locationCta")} →</Button></div>
            </Reveal>

            <Reveal delay={120}>
              <ul className="divide-y divide-white/10">
                {distances.slice(0, 7).map((d, i) => (
                  <li key={i} className="flex items-center justify-between py-3.5">
                    <span className="text-[var(--color-cream)]/85">{pl(`d${i}`)}</span>
                    <span className="text-right text-sm">
                      <span className="figure font-medium text-[var(--color-gold-soft)]">{d.distance}</span>
                      <span className="block text-xs text-[var(--color-cream)]/50">{pl(`t${i}`)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* TRANSPARENCY */}
      <section className="py-24">
        <Container size="narrow" className="text-center">
          <Reveal>
            <p className="eyebrow">{t("transparencyEyebrow")}</p>
            <h2 className="heading-tight mt-4 font-serif text-[var(--text-h2)] font-semibold">{t("transparencyTitle")}</h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">{t("transparencyBody")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/tenure" variant="outline">{c("understandTenure")}</Button>
              <Button href="/faq" variant="ghost">{c("readFaq")} →</Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="section-dark relative overflow-hidden py-24">
        <div className="pointer-events-none absolute -left-16 -bottom-16 text-[var(--color-gold)]/10">
          <BodhiMotif className="h-80 w-auto" />
        </div>
        <Container className="relative text-center">
          <Reveal>
            <h2 className="heading-tight mx-auto max-w-2xl font-serif text-[var(--text-h1)] font-semibold">{t("finalTitle")}</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-[var(--color-cream)]/70">{t("finalBody")}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button href="/calculator" variant="gold" size="lg">{c("openCalculator")} →</Button>
              <CrispButton message="Hi, I'd like to book a showroom visit at Bodaiju Residences @ Medini." location="home_final_cta" size="lg" className="border border-white/30 text-[var(--color-cream)] hover:-translate-y-0.5 hover:border-white">
                {c("bookViewing")}
              </CrispButton>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

function TrustItem({ stat, title, body }: { stat: string; title: string; body: string }) {
  return (
    <div className="text-center md:text-left">
      <div className="font-serif text-3xl font-semibold text-[var(--color-gold-deep)]">{stat}</div>
      <h3 className="mt-3 font-serif text-lg font-semibold text-[var(--color-ink)]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{body}</p>
    </div>
  );
}
