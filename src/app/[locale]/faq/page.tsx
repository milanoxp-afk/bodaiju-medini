import type { Metadata } from "next";
import { Container } from "../../../components/ui/Container";
import { Button } from "../../../components/ui/Button";
import { faqs } from "../../../data/project";

export const metadata: Metadata = {
  title: "FAQ — Honest Answers for Cross-Border Buyers",
  description:
    "Straight answers on tenure, foreign-buyer eligibility, total cost, oversupply, construction risk and financing for Bodaiju Residences @ Medini.",
  alternates: { canonical: "/faq" },
};

// FAQ structured data for rich results in Google.
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

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd />
      <section className="section-dark pt-32 pb-16">
        <Container>
          <p className="eyebrow">No spin</p>
          <h1 className="heading-tight mt-4 max-w-3xl font-serif text-[var(--text-h1)] font-semibold">
            The questions a careful buyer actually asks
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[var(--color-cream)]/75">
            Cross-border property has real risks. Here&rsquo;s where we stand on the ones that matter — including
            the things we&rsquo;re still confirming with the developer.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container size="narrow">
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)] p-5 transition-colors open:bg-[var(--color-cream-deep)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg font-medium text-[var(--color-ink)]">
                  {f.q}
                  <span className="shrink-0 text-[var(--color-gold-deep)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-[var(--color-muted)]">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-12 rounded-[var(--radius-card)] bg-[var(--color-ink)] p-8 text-center text-[var(--color-cream)]">
            <h2 className="font-serif text-xl font-semibold">Still have a question?</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-[var(--color-cream)]/70">
              Ask us anything — including the things that aren&rsquo;t on this page. We&rsquo;d rather you buy with full information.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button href="/calculator" variant="gold">Calculate your cost</Button>
              <Button href="/contact" variant="outline" className="border-white/30 text-[var(--color-cream)] hover:border-white">Contact us</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
