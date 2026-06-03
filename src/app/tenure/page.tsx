import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { Button } from "../../components/ui/Button";
import { Reveal } from "../../components/Reveal";
import { project, macro } from "../../data/project";

export const metadata: Metadata = {
  title: "Understanding Your Title — Tenure, PLS & Freehold in Medini",
  description:
    "Is Bodaiju Residences freehold or leasehold? A plain-English guide to Medini's 99-year leasehold, the Private Lease Scheme (PLS), and IIB's PLS-to-freehold conversion programme — with the honest caveats every buyer should check.",
  alternates: { canonical: "/tenure" },
};

export default function TenurePage() {
  return (
    <>
      <section className="section-dark pt-32 pb-16">
        <Container>
          <Reveal immediate>
            <p className="eyebrow">Buy with eyes open</p>
            <h1 className="heading-tight mt-4 max-w-3xl font-serif text-[var(--text-h1)] font-semibold">
              Understanding your title
            </h1>
            {/* Answer-first capsule */}
            <p className="mt-5 max-w-2xl text-lg text-[var(--color-cream)]/80">
              Bodaiju Residences is marketed as a {project.tenure.label.toLowerCase()} serviced residence
              (lease to {project.tenure.leaseExpiry}). Land in Medini historically sits on Iskandar Investment
              Berhad (IIB) freehold land under a Private Lease Scheme (PLS). The exact title structure for this
              project should be confirmed in writing and checked by your own lawyer before you sign.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16">
        <Container size="narrow">
          <Reveal>
            <h2 className="heading-tight font-serif text-[var(--text-h2)] font-semibold text-[var(--color-ink)]">
              What is a Private Lease Scheme (PLS)?
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
              In Medini, the master land is owned by IIB. Rather than issuing conventional state leasehold or
              freehold titles directly, developments have historically been structured under a Private Lease
              Scheme — a long contractual lease registered against the master title. It is a legitimate,
              established structure for the Medini special zone, but it is not identical to a standard
              National Land Code strata title, which is why it deserves careful legal review.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="heading-tight mt-12 font-serif text-[var(--text-h2)] font-semibold text-[var(--color-ink)]">
              The PLS-to-freehold conversion programme
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">{macro.plsToFreehold.note}</p>
            <p className="mt-4 rounded-lg bg-[var(--color-cream-deep)] p-4 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              Whether Bodaiju&rsquo;s land has been, or will be, converted to freehold is a project-specific
              question we are confirming with the developer. We will publish the SPA tenure clause verbatim
              once received rather than summarise it.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="heading-tight mt-12 font-serif text-[var(--text-h2)] font-semibold text-[var(--color-ink)]">
              Questions to ask before you sign
            </h2>
            <ul className="mt-4 space-y-3 text-[var(--color-muted)]">
              {[
                "Is the title a registered strata title, a PLS sub-lease, or freehold-converted?",
                "Who holds the master lease, and what are the renewal/extension terms?",
                "Does the SPA follow Schedule H (HDA) or a Medini-specific exemption?",
                "What management-corporation and sinking-fund rules apply?",
                "Have any conversion premiums been paid, and by whom?",
              ].map((q) => (
                <li key={q} className="flex gap-3">
                  <span className="mt-1 text-[var(--color-gold-text)]">→</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-[var(--color-muted)]">
              This page is general information, not legal advice. Engage an independent Malaysian property
              lawyer to review the title and SPA for your specific transaction.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="section-dark py-16">
        <Container className="text-center">
          <h2 className="heading-tight mx-auto max-w-xl font-serif text-[var(--text-h2)] font-semibold">
            Have a tenure question?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[var(--color-cream)]/70">
            Ask us anything — including the things still being confirmed. We&rsquo;d rather you buy with full information.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Button href="/faq" variant="gold" size="lg">Read the full FAQ →</Button>
            <Button href="/contact" variant="outline" size="lg" className="border-white/30 text-[var(--color-cream)] hover:border-white">Contact us</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
