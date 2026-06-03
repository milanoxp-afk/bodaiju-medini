import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { legal, project, contact, unverifiedItems } from "../../data/project";

export const metadata: Metadata = {
  title: "Legal Notices & Disclaimers",
  description:
    "Developer licence, advertising permit, regulatory approvals and disclaimers for Bodaiju Residences @ Medini.",
  alternates: { canonical: "/legal" },
  robots: { index: true, follow: true },
};

export default function LegalPage() {
  return (
    <section className="pt-32 pb-8">
      <Container size="narrow">
        <p className="eyebrow">Transparency</p>
        <h1 className="heading-tight mt-4 font-serif text-[var(--text-h1)] font-semibold">Legal notices &amp; disclaimers</h1>

        {/* Regulatory */}
        <div className="mt-10 space-y-2 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-cream-deep)] p-6 text-sm leading-relaxed text-[var(--color-ink-soft)]">
          <h2 className="font-serif text-lg font-semibold text-[var(--color-ink)]">Project &amp; regulatory particulars</h2>
          <p><strong>Project:</strong> {project.fullName}, {project.location.zone}, {project.location.city}, {project.location.state}.</p>
          <p><strong>Developer:</strong> Creed Property Malaysia Sdn Bhd (formerly CI Medini Sdn Bhd).</p>
          <p><strong>Developer Licence:</strong> {legal.developerLicence.number} (valid {legal.developerLicence.valid}).</p>
          <p><strong>Advertising Permit:</strong> {legal.advertisingPermit.number} (valid {legal.advertisingPermit.valid}).</p>
          <p><strong>Approving Authority:</strong> {legal.approvingAuthority}.</p>
          <p><strong>Plan Approval Reference:</strong> {legal.planApprovalRef}.</p>
          <p><strong>Tenure:</strong> {project.tenure.label} (to {project.tenure.leaseExpiry}).</p>
          <p className="text-xs text-[var(--color-muted)]">
            Regulatory particulars above are reproduced from project marketing materials and should be verified
            against the developer&rsquo;s official brochure and records at teduh.kpkt.gov.my before reliance.
          </p>
        </div>

        {/* Enquiries */}
        <div className="mt-6 rounded-[var(--radius-card)] border border-[var(--color-line)] p-6">
          <h2 className="font-serif text-lg font-semibold text-[var(--color-ink)]">Enquiries</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
            Enquiries about Bodaiju Residences are directed to the project sales team. This website is informational;
            no purchase obligation arises until a Sale and Purchase Agreement is executed.
          </p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">Contact: {contact.whatsappDisplay} · {contact.email}</p>
        </div>

        {/* Disclaimers */}
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-[var(--color-muted)]">
          <div>
            <h3 className="font-semibold text-[var(--color-ink)]">General</h3>
            <p>{legal.disclaimers.general}</p>
          </div>
          <div>
            <h3 className="font-semibold text-[var(--color-ink)]">Pricing</h3>
            <p>{legal.disclaimers.pricing}</p>
          </div>
          <div>
            <h3 className="font-semibold text-[var(--color-ink)]">Foreign buyers</h3>
            <p>{legal.disclaimers.foreignBuyer}</p>
          </div>
          <div>
            <h3 className="font-semibold text-[var(--color-ink)]">Calculator</h3>
            <p>{legal.disclaimers.calculator}</p>
          </div>
        </div>

        {/* Verification status — the "receipts" */}
        <div className="mt-8 rounded-[var(--radius-card)] border border-[var(--color-sage)]/30 bg-[var(--color-sage)]/8 p-6">
          <h2 className="font-serif text-lg font-semibold text-[var(--color-ink)]">Items awaiting written confirmation</h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            In the interest of transparency, the following project specifics are not yet confirmed in writing from
            the developer and are therefore not presented as facts on this website:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--color-ink-soft)]">
            {unverifiedItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <p id="privacy" className="mt-10 scroll-mt-28 text-xs leading-relaxed text-[var(--color-muted)]">
          <strong className="text-[var(--color-ink)]">Privacy.</strong> Personal data submitted through this website
          (name, contact details, enquiry) is used solely to respond to your enquiry about Bodaiju Residences and is
          handled in accordance with Malaysia&rsquo;s Personal Data Protection Act 2010. We do not sell your data or
          share it with third parties without your consent. To request access or deletion of your data, contact {contact.email}.
        </p>
      </Container>
    </section>
  );
}
