import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { CostCalculator } from "../../components/CostCalculator";
import { Reveal } from "../../components/Reveal";

export const metadata: Metadata = {
  title: "Cost Calculator — What a Bodaiju Home Really Costs",
  description:
    "Calculate the full upfront cost of a Bodaiju Residences unit as a Singaporean or foreign buyer — including 8% stamp duty, Johor state consent and legal fees, in both MYR and SGD.",
  alternates: { canonical: "/calculator" },
};

export default function CalculatorPage() {
  return (
    <>
      <section className="section-dark pt-32 pb-16">
        <Container>
          <Reveal immediate>
            <p className="eyebrow">The honest numbers</p>
            <h1 className="heading-tight mt-4 max-w-3xl font-serif text-[var(--text-h1)] font-semibold">
              What a Bodaiju home really costs you
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-[var(--color-cream)]/75">
              Most listings show you RM299,000 and stop there. This shows the full picture — stamp duty,
              state consent, legal fees and monthly repayment — in ringgit and Singapore dollars. No surprises
              at the lawyer&rsquo;s office.
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
            <strong className="text-[var(--color-ink)]">How we calculate this.</strong> Foreign buyers pay a flat 8%
            Memorandum of Transfer stamp duty (effective 1 January 2026), plus Johor state consent (≈3% or
            RM30,000, whichever is higher), 0.5% loan stamp duty and ~1.5% legal fees. Malaysian citizens pay
            tiered MOT stamp duty (1–4%) with no state consent. Monthly repayment assumes ~3.85% p.a. over 30
            years at the indicated loan-to-value. All figures are estimates — confirm with your solicitor and bank.
          </div>
        </Container>
      </section>
    </>
  );
}
