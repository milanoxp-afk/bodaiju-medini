import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { Button } from "../../components/ui/Button";
import { LeadForm } from "../../components/LeadForm";
import { contact, whatsappLink } from "../../data/project";

export const metadata: Metadata = {
  title: "Contact & Showroom Visit",
  description:
    "Book a showroom visit or register your interest in Bodaiju Residences @ Medini. Visit the sales gallery at Pusat Perdagangan Ion Akses, Iskandar Puteri, or message us on WhatsApp.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const mapsSrc = `https://www.google.com/maps?q=${encodeURIComponent(contact.salesGallery.mapsQuery)}&output=embed`;

  return (
    <>
      <section className="section-dark pt-32 pb-16">
        <Container>
          <p className="eyebrow">Get in touch</p>
          <h1 className="heading-tight mt-4 max-w-3xl font-serif text-[var(--text-h1)] font-semibold">
            Come see it for yourself
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[var(--color-cream)]/75">
            Book a showroom visit, ask a question, or register your interest. We reply fast — usually within minutes during the day.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Left: details + map */}
            <div>
              <h2 className="font-serif text-xl font-semibold text-[var(--color-ink)]">{contact.salesGallery.name}</h2>
              <p className="mt-2 leading-relaxed text-[var(--color-muted)]">{contact.salesGallery.address}</p>

              <div className="mt-5 space-y-2 text-sm">
                <a href={whatsappLink("Hi, I'd like to book a showroom visit at Bodaiju Residences.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium text-[var(--color-ink)] hover:text-[var(--color-gold-deep)]">
                  WhatsApp: {contact.whatsappDisplay}
                </a>
                <br />
                <a href={`mailto:${contact.email}`} className="font-medium text-[var(--color-ink)] hover:text-[var(--color-gold-deep)]">
                  {contact.email}
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={whatsappLink("Hi, I'd like to book a showroom visit at Bodaiju Residences.")} external variant="gold">
                  Book showroom visit
                </Button>
                <Button href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.salesGallery.mapsQuery)}`} external variant="outline">
                  Open in Maps
                </Button>
              </div>

              <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)]">
                <iframe
                  title="Sales gallery location"
                  src={mapsSrc}
                  className="h-72 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right: form */}
            <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-cream-deep)] p-6 sm:p-8">
              <h2 className="font-serif text-xl font-semibold text-[var(--color-ink)]">Register your interest</h2>
              <p className="mt-1 mb-6 text-sm text-[var(--color-muted)]">
                Leave your details and we&rsquo;ll send pricing, availability and floor plans.
              </p>
              <LeadForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
