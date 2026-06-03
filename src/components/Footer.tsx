import { getTranslations } from "next-intl/server";
import { Link } from "../i18n/routing";
import { project, contact, legal } from "../data/project";
import { ChatLink } from "./ChatLink";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  // Only real, existing routes — no 404 links (SEO brief requirement).
  const footerNav = [
    {
      heading: t("exploreHeading"),
      links: [
        { label: nav("residences"), href: "/units" as const },
        { label: nav("calculator"), href: "/calculator" as const },
        { label: nav("location"), href: "/location" as const },
      ],
    },
    {
      heading: t("buyHeading"),
      links: [
        { label: t("understandingTenure"), href: "/tenure" as const },
        { label: nav("faq"), href: "/faq" as const },
        { label: t("legalNotices"), href: "/legal" as const },
      ],
    },
  ];

  return (
    <footer className="section-dark mt-24">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <div className="font-serif text-2xl font-semibold tracking-tight">Bodaiju Residences</div>
            <div className="mt-1 text-xs uppercase tracking-[0.3em] text-[var(--color-gold-soft)]">
              {project.kanji} · Medini, Iskandar Puteri
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[var(--color-cream)]/70">
              {contact.salesGallery.name}
              <br />
              {contact.salesGallery.address}
            </p>
            <div className="mt-5 text-sm">
              <ChatLink
                message="Hi, I'd like to enquire about Bodaiju Residences @ Medini."
                location="footer"
                className="block font-medium text-[var(--color-cream)]/90 hover:text-[var(--color-gold-soft)]"
              >
                {t("chatWithTeam")} →
              </ChatLink>
            </div>
          </div>

          {footerNav.map((col) => (
            <div key={col.heading}>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-soft)]">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-[var(--color-cream)]/75 transition-colors hover:text-[var(--color-cream)]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compliance block — kept in English: legal/regulatory accuracy takes
            priority over translation for disclaimers and permit particulars. */}
        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="grid gap-6 text-xs leading-relaxed text-[var(--color-cream)]/55 sm:grid-cols-2">
            <div className="space-y-1">
              <p><span className="text-[var(--color-cream)]/80">Developer:</span> {project.fullName} is developed by Creed Property Malaysia Sdn Bhd (formerly CI Medini Sdn Bhd).</p>
              <p><span className="text-[var(--color-cream)]/80">Developer Licence:</span> {legal.developerLicence.number} ({legal.developerLicence.valid}).</p>
              <p><span className="text-[var(--color-cream)]/80">Advertising Permit:</span> {legal.advertisingPermit.number} ({legal.advertisingPermit.valid}).</p>
              <p><span className="text-[var(--color-cream)]/80">Approving Authority:</span> {legal.approvingAuthority} · Ref {legal.planApprovalRef}.</p>
              <p className="text-[var(--color-cream)]/40">Permit details are reproduced from project marketing materials and should be verified against the official brochure.</p>
            </div>
            <div className="space-y-3">
              <p>{legal.disclaimers.general}</p>
              <p>{legal.disclaimers.foreignBuyer}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-[var(--color-cream)]/45 sm:flex-row sm:items-center">
            <span>© 2026 Bodaiju Residences @ Medini. {t("rights")}</span>
            <span className="flex gap-4">
              <Link href="/legal" className="hover:text-[var(--color-cream)]/80">Legal</Link>
              <Link href="/legal#privacy" className="hover:text-[var(--color-cream)]/80">Privacy</Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
