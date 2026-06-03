import type { Metadata } from "next";
import { Container } from "../../../components/ui/Container";
import { Button } from "../../../components/ui/Button";
import { CrispButton } from "../../../components/CrispButton";
import { Reveal } from "../../../components/Reveal";
import { units, pricePsf, project } from "../../../data/project";
import { rm, num } from "../../../lib/format";

export const metadata: Metadata = {
  title: "Residences — 1, 2 & 3-Bedroom Layouts from RM299,000",
  description:
    "Four Japanese-considered layouts at Bodaiju Residences, from a 463 sq ft 1-bedroom to a 1,012 sq ft dual-key 3-bedroom. View sizes, prices and configurations.",
  alternates: { canonical: "/units" },
};

export default function UnitsPage() {
  return (
    <>
      <section className="section-dark pt-32 pb-16">
        <Container>
          <Reveal immediate>
            <p className="eyebrow">The residences</p>
            <h1 className="heading-tight mt-4 max-w-3xl font-serif text-[var(--text-h1)] font-semibold">
              Four ways to live at Bodaiju
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-[var(--color-cream)]/75">
              From an efficient one-bedroom to a dual-key three-bedroom, every layout is designed around the
              Japanese principle of <em>Ma</em> — meaningful, unhurried space. All units include a balcony.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="space-y-6">
            {units.map((u, i) => (
              <Reveal key={u.code} delay={i * 60}>
                <article className="grid gap-6 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)] p-6 transition-shadow hover:shadow-md sm:p-8 lg:grid-cols-[1.4fr_1fr]">
                  <div>
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h2 className="font-serif text-2xl font-semibold text-[var(--color-ink)]">{u.label}</h2>
                      {u.dualKey && (
                        <span className="rounded-full bg-[var(--color-sage)]/15 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-[var(--color-sage-deep)]">
                          Dual-key
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[var(--color-muted)]">
                      {u.bedrooms} bedroom · {u.bathrooms} bathroom · 1 balcony · {num(u.sqft)} sq ft
                    </p>
                    <p className="mt-4 leading-relaxed text-[var(--color-ink-soft)]">{u.positioning}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                      <strong className="text-[var(--color-ink)]">Best for:</strong> {u.bestFor}
                    </p>

                    {/* Floor plan placeholder — replace with real plan image when received */}
                    <div className="mt-5 flex h-40 items-center justify-center rounded-lg border border-dashed border-[var(--color-line)] bg-[var(--color-cream)] text-xs text-[var(--color-muted)]">
                      Floor plan available on request
                    </div>
                  </div>

                  <div className="flex flex-col justify-between rounded-xl bg-[var(--color-cream)] p-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">From</p>
                      <p className="font-serif text-3xl font-semibold text-[var(--color-ink)]">{rm(u.priceRm)}</p>
                      <p className="mt-1 text-sm text-[var(--color-muted)]">≈ RM{Math.round(pricePsf(u))} psf</p>
                    </div>
                    <div className="mt-6 space-y-2">
                      <Button href="/calculator" variant="primary" className="w-full">Calculate my cost</Button>
                      <CrispButton
                        message={`Hi, I'm interested in ${u.label} (${u.bedrooms}-bed, ${num(u.sqft)} sqft) at Bodaiju Residences. What's the current availability?`}
                        variant="outline"
                        className="w-full"
                        location={`units_${u.code}`}
                      >
                        Ask about {u.label}
                      </CrispButton>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-[var(--color-muted)]">
            Prices are indicative starting prices, subject to unit, level, orientation and availability. Built-up
            areas are approximate. Refer to the Sale and Purchase Agreement for final specifications. Completion {project.completionYear}.
          </p>
        </Container>
      </section>
    </>
  );
}
