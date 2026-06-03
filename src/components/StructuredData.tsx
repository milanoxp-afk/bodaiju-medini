import { project, units, contact, developer, pricePsf } from "../data/project";

const SITE_URL = "https://www.bodaijumedini.my";

/**
 * Site-wide JSON-LD. The 2026 SEO/GEO brief found pages with 3+ schema types
 * had ~13% higher LLM-citation likelihood, and that schema must mirror visible
 * content. Everything here is drawn from the verified project data.
 *
 * Types emitted: Organization (developer), RealEstateListing (the project +
 * unit offers), Place/geo, and BreadcrumbList. FAQPage is emitted separately
 * on /faq so its Q&A mirrors that page.
 */
export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#developer`,
        name: developer.entity,
        parentOrganization: { "@type": "Organization", name: developer.parent },
        foundingDate: String(developer.parentFounded),
        description:
          "Creed Group is a Japanese real-estate investor (est. 1996), developer of Bodaiju Residences @ Medini.",
        url: SITE_URL,
      },
      {
        "@type": ["Residence", "Product"],
        "@id": `${SITE_URL}/#project`,
        name: project.fullName,
        description:
          "Japanese-inspired serviced residence in Medini, Iskandar Puteri, Johor — 802 units across two towers, from RM299,000, completion 2028.",
        url: SITE_URL,
        numberOfRooms: project.totalUnits,
        address: {
          "@type": "PostalAddress",
          streetAddress: project.location.zone,
          addressLocality: project.location.city,
          addressRegion: project.location.state,
          postalCode: project.location.postcode,
          addressCountry: "MY",
        },
        geo: { "@type": "GeoCoordinates", latitude: 1.4233, longitude: 103.6299 },
        developer: { "@id": `${SITE_URL}/#developer` },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "MYR",
          lowPrice: Math.min(...units.map((u) => u.priceRm)),
          highPrice: Math.max(...units.map((u) => u.priceRm)),
          offerCount: project.totalUnits,
          availability: "https://schema.org/PreOrder",
        },
      },
      // Each unit type as its own listing/offer (mirrors the /units page).
      ...units.map((u) => ({
        "@type": "Apartment",
        "@id": `${SITE_URL}/units#${u.code}`,
        name: `${project.name} — ${u.label}`,
        numberOfBedrooms: u.bedrooms,
        numberOfBathroomsTotal: u.bathrooms,
        floorSize: { "@type": "QuantitativeValue", value: u.sqft, unitCode: "FTK" },
        offers: {
          "@type": "Offer",
          price: u.priceRm,
          priceCurrency: "MYR",
          availability: "https://schema.org/PreOrder",
          description: `${u.bedrooms}-bed ${u.label}, ${u.sqft} sq ft, from RM${u.priceRm.toLocaleString()} (≈RM${Math.round(pricePsf(u))} psf).`,
        },
      })),
      {
        "@type": "RealEstateAgent",
        "@id": `${SITE_URL}/#salesgallery`,
        name: contact.salesGallery.name,
        address: contact.salesGallery.address,
        areaServed: "Iskandar Puteri, Johor",
        url: `${SITE_URL}/contact`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
