import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "../../../components/ui/Container";
import { Button } from "../../../components/ui/Button";
import { CrispButton } from "../../../components/CrispButton";
import { LeadForm } from "../../../components/LeadForm";
import { contact } from "../../../data/project";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("metaTitle"),
    description:
      "Book a showroom visit or register your interest in Bodaiju Residences @ Medini. Visit the sales gallery at Pusat Perdagangan Ion Akses, Iskandar Puteri, or chat with our team online.",
    alternates: { canonical: "/contact" },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale); // enable static rendering for this locale
  return <ContactContent />;
}

function ContactContent() {
  const t = useTranslations("contact");
  const mapsSrc = `https://www.google.com/maps?q=${encodeURIComponent(contact.salesGallery.mapsQuery)}&output=embed`;

  return (
    <>
      <section className="section-dark pt-32 pb-16">
        <Container>
          <p className="eyebrow">{t("heroEyebrow")}</p>
          <h1 className="heading-tight mt-4 max-w-3xl font-serif text-[var(--text-h1)] font-semibold">
            {t("heroTitle")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[var(--color-cream)]/75">
            {t("heroSubtitle")}
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

              <p className="mt-5 text-sm text-[var(--color-muted)]">
                {t("preferChat")}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <CrispButton message="Hi, I'd like to book a showroom visit at Bodaiju Residences." location="contact_book_visit" variant="gold">
                  {t("bookVisit")}
                </CrispButton>
                <CrispButton message="Hi, I have a question about Bodaiju Residences." location="contact_ask" variant="outline">
                  {t("askQuestion")}
                </CrispButton>
                <Button href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.salesGallery.mapsQuery)}`} external variant="outline">
                  {t("openInMaps")}
                </Button>
              </div>

              <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)]">
                <iframe
                  title={t("mapTitle")}
                  src={mapsSrc}
                  className="h-72 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right: form */}
            <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-cream-deep)] p-6 sm:p-8">
              <h2 className="font-serif text-xl font-semibold text-[var(--color-ink)]">{t("registerInterest")}</h2>
              <p className="mt-1 mb-6 text-sm text-[var(--color-muted)]">
                {t("registerSubtitle")}
              </p>
              <LeadForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
