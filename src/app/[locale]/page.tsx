import Link from "next/link";
import { Container } from "../../components/ui/Container";
import { Button } from "../../components/ui/Button";
import { CrispButton } from "../../components/CrispButton";
import { Reveal } from "../../components/Reveal";
import { BodhiMotif } from "../../components/BodhiMotif";
import {
  project,
  units,
  developer,
  contractor,
  sellingPoints,
  distances,
  singaporeAbsd,
  computeCosts,
} from "../../data/project";
import { rm, sgd, num } from "../../lib/format";

const heroStats = [
  { label: "From", value: "RM299,000" },
  { label: "Layouts", value: "1–3 Bedrooms" },
  { label: "Built-up", value: "463–1,012 sq ft" },
  { label: "Tenure", value: "99-yr Leasehold" },
  { label: "Completion", value: "2028" },
];

export default function Home() {
  // ABSD example: a Type A unit's true cost vs Singapore's 60% ABSD alone.
  const typeA = units[0];
  const sgAbsdOnEntry = typeA.priceRm * singaporeAbsd.foreignerRate;
  const foreignerCost = computeCosts(typeA.priceRm, "foreigner");

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="section-dark relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 top-1/2 hidden -translate-y-1/2 text-[var(--color-gold)]/10 lg:block">
          <BodhiMotif className="h-[42rem] w-auto" />
        </div>
        <Container className="relative flex min-h-[92vh] flex-col justify-center pt-28 pb-16">
          <Reveal immediate>
            <p className="eyebrow">Medini · Iskandar Puteri · Johor</p>
            <h1 className="heading-tight mt-5 max-w-3xl font-serif text-[var(--text-display)] font-semibold">
              A quiet place to come home to.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-cream)]/75">
              Bodaiju Residences — Japanese-inspired serviced living in the heart of Medini.
              Foreign-eligible from RM299,000, minutes from the Second Link, LEGOLAND, EduCity and Gleneagles.
            </p>
          </Reveal>

          <Reveal immediate>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/calculator" variant="gold" size="lg">
                Calculate your true cost →
              </Button>
              <Button href="/units" variant="outline" size="lg" className="border-white/30 text-[var(--color-cream)] hover:border-white">
                Explore residences
              </Button>
            </div>
            <p className="mt-6 text-sm text-[var(--color-cream)]/55">
              By {developer.parent} · Built by {contractor.parent.split(" (")[0]} · Completion {project.completionYear}
            </p>
          </Reveal>
        </Container>

        {/* hero stat bar */}
        <div className="relative border-t border-white/10 bg-black/20">
          <Container>
            <dl className="grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-3 lg:grid-cols-5">
              {heroStats.map((s) => (
                <div key={s.label} className="px-2 py-5 text-center first:pl-0">
                  <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-gold-soft)]">{s.label}</dt>
                  <dd className="mt-1 font-serif text-lg font-medium text-[var(--color-cream)]">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      </section>

      {/* ================= CONCEPT ================= */}
      <section className="py-24">
        <Container size="narrow" className="text-center">
          <Reveal>
            <BodhiMotif className="mx-auto h-14 w-auto text-[var(--color-sage)]" />
            <p className="eyebrow mt-6">{project.kanji} · The Bodhi Tree</p>
            <h2 className="heading-tight mt-4 font-serif text-[var(--text-h2)] font-semibold">
              Named for the tree of stillness and growth
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">
              {project.meaning} That philosophy shapes everything here — sky gardens, green courtyards
              and Japanese-considered spaces designed to let modern life slow down, even at the edge of
              one of Southeast Asia&rsquo;s fastest-growing corridors.
            </p>
            <div className="mt-8">
              <Button href="/units" variant="ghost">Discover the concept →</Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-cream-deep)] py-16">
        <Container>
          <Reveal>
            <p className="eyebrow text-center">Why you can take this seriously</p>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              <TrustItem
                stat="928 units"
                title="A developer that delivers"
                body="Creed Group (Japan, est. 1996) completed a 928-unit Bodaiju in Phnom Penh in 2020 — a real, occupied precedent at this exact scale."
              />
              <TrustItem
                stat="RM185.99m"
                title="Construction is contracted"
                body="A Bursa-disclosed contract with listed builder MGB Construction & Engineering. Tower A targets completion by 30 Nov 2027."
              />
              <TrustItem
                stat="Not Forest City"
                title="No China-property exposure"
                body="Creed is a privately-held Japanese investor — financially unrelated to Country Garden / Forest City."
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ================= ABSD COMPARISON (the lever) ================= */}
      <section className="py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="eyebrow">For Singapore buyers</p>
              <h2 className="heading-tight mt-4 font-serif text-[var(--text-h2)] font-semibold">
                In Singapore, {sgd(typeA.priceRm / 3.4)} buys you nothing.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">
                A foreigner buying residential property in Singapore pays{" "}
                <strong className="text-[var(--color-ink)]">60% Additional Buyer&rsquo;s Stamp Duty</strong> —
                before the price of the home itself. On a sum the size of a Bodaiju Type A, that&rsquo;s{" "}
                <strong className="text-[var(--color-ink)]">{sgd(sgAbsdOnEntry / 3.4)} in tax alone.</strong>
              </p>
              <p className="mt-4 text-lg leading-relaxed text-[var(--color-muted)]">
                Here, the same budget buys a brand-new 1-bedroom serviced residence in Medini —
                with no minimum-price barrier for foreigners.
              </p>
              <div className="mt-8">
                <Button href="/calculator" variant="primary" size="lg">See the full cost breakdown →</Button>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)] shadow-sm">
                <div className="grid grid-cols-2 text-center">
                  <div className="border-r border-[var(--color-line)] p-7">
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">Singapore</p>
                    <p className="mt-3 font-serif text-3xl font-semibold text-[var(--color-ink)]">{sgd(sgAbsdOnEntry / 3.4)}</p>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">60% ABSD — tax only, no property</p>
                  </div>
                  <div className="bg-[var(--color-cream)] p-7">
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-text)]">Bodaiju · Type A</p>
                    <p className="mt-3 font-serif text-3xl font-semibold text-[var(--color-ink)]">{rm(typeA.priceRm)}</p>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">{num(typeA.sqft)} sq ft · 1 bed · yours</p>
                  </div>
                </div>
                <div className="border-t border-[var(--color-line)] bg-[var(--color-ink)] px-7 py-5 text-center text-sm text-[var(--color-cream)]/80">
                  All-in upfront as a foreign buyer ≈ <strong className="text-[var(--color-cream)]">{rm(foreignerCost.totalUpfront)}</strong>{" "}
                  <span className="text-[var(--color-cream)]/55">({sgd(foreignerCost.totalUpfront / 3.4)})</span>
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-[var(--color-muted)]">
                Illustrative. Includes 8% stamp duty, state consent &amp; legal fees. Confirm with your solicitor.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ================= SELLING POINTS ================= */}
      <section className="bg-[var(--color-cream-deep)] py-24">
        <Container>
          <Reveal>
            <p className="eyebrow">Why Bodaiju</p>
            <h2 className="heading-tight mt-4 max-w-2xl font-serif text-[var(--text-h2)] font-semibold">
              Eight reasons that hold up to scrutiny
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
            {sellingPoints.map((p, i) => (
              <Reveal key={p.title} delay={i * 60} className="bg-[var(--color-cream)] p-7">
                <div className="font-serif text-3xl text-[var(--color-gold)]">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-4 font-serif text-lg font-semibold text-[var(--color-ink)]">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{p.detail}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= RESIDENCES PREVIEW ================= */}
      <section className="py-24">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">The residences</p>
                <h2 className="heading-tight mt-4 font-serif text-[var(--text-h2)] font-semibold">Four ways to live here</h2>
              </div>
              <Button href="/units" variant="ghost">All layouts &amp; floor plans →</Button>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {units.map((u, i) => (
              <Reveal key={u.code} delay={i * 70}>
                <Link
                  href="/units"
                  className="group block h-full rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-gold)] hover:shadow-lg"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-2xl font-semibold text-[var(--color-ink)]">{u.label}</span>
                    {u.dualKey && (
                      <span className="rounded-full bg-[var(--color-sage)]/15 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-[var(--color-sage-deep)]">
                        Dual-key
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {u.bedrooms} bed · {u.bathrooms} bath · {num(u.sqft)} sq ft
                  </p>
                  <div className="mt-5 border-t border-[var(--color-line)] pt-4">
                    <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">From</p>
                    <p className="font-serif text-xl font-semibold text-[var(--color-ink)]">{rm(u.priceRm)}</p>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">{u.positioning}</p>
                  <span className="mt-5 inline-block text-sm font-medium text-[var(--color-gold-deep)] transition-transform group-hover:translate-x-1">
                    View details →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-[var(--color-muted)]">
            Indicative prices, subject to unit, level and availability. Per-floor pricing confirmed on enquiry.
          </p>
        </Container>
      </section>

      {/* ================= LOCATION ================= */}
      <section className="section-dark py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <p className="eyebrow">The location</p>
              <h2 className="heading-tight mt-4 font-serif text-[var(--text-h2)] font-semibold">
                Quiet by nature.<br />Connected by design.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-cream)]/70">
                Medini sits inside the Johor–Singapore Special Economic Zone, with the RTS Link arriving in 2027.
                You&rsquo;re 9 km from the Second Link and steps from daily life.
              </p>
              <div className="mt-8">
                <Button href="/location" variant="gold">Explore the neighbourhood →</Button>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ul className="divide-y divide-white/10">
                {distances.slice(0, 7).map((d) => (
                  <li key={d.place} className="flex items-center justify-between py-3.5">
                    <span className="text-[var(--color-cream)]/85">{d.place}</span>
                    <span className="text-right text-sm">
                      <span className="font-medium text-[var(--color-gold-soft)]">{d.distance}</span>
                      {d.time && <span className="block text-xs text-[var(--color-cream)]/50">{d.time}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ================= TRANSPARENCY ================= */}
      <section className="py-24">
        <Container size="narrow" className="text-center">
          <Reveal>
            <p className="eyebrow">Bought with eyes open</p>
            <h2 className="heading-tight mt-4 font-serif text-[var(--text-h2)] font-semibold">
              We publish what we can verify — and flag what we can&rsquo;t
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">
              Cross-border property has real risks: tenure structure, oversupply, currency, delivery. We don&rsquo;t
              bury them. Every claim here is sourced, and the items still awaiting the developer&rsquo;s written
              confirmation are listed openly.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/tenure" variant="outline">Understand the tenure</Button>
              <Button href="/faq" variant="ghost">Read the honest FAQ →</Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="section-dark relative overflow-hidden py-24">
        <div className="pointer-events-none absolute -left-16 -bottom-16 text-[var(--color-gold)]/10">
          <BodhiMotif className="h-80 w-auto" />
        </div>
        <Container className="relative text-center">
          <Reveal>
            <h2 className="heading-tight mx-auto max-w-2xl font-serif text-[var(--text-h1)] font-semibold">
              Start with the numbers, not the sales pitch.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-[var(--color-cream)]/70">
              See exactly what a Bodaiju home costs you — all-in, in ringgit and Singapore dollars — before you
              speak to anyone.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button href="/calculator" variant="gold" size="lg">Open the cost calculator →</Button>
              <CrispButton
                message="Hi, I'd like to book a showroom visit at Bodaiju Residences @ Medini."
                location="home_final_cta"
                size="lg"
                className="border border-white/30 text-[var(--color-cream)] hover:-translate-y-0.5 hover:border-white"
              >
                Book a showroom visit
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
