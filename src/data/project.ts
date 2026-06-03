/**
 * BODAIJU RESIDENCES @ MEDINI — MASTER DATA FILE
 * =================================================
 * Single source of truth for the entire website.
 * Compiled from 5 research dossiers (May 2026), prioritising VERIFIED facts.
 *
 * VERIFICATION LEGEND:
 *   "verified"   = confirmed by primary source (Bursa filing, official site, gov source)
 *   "likely"     = reported by aggregators/secondary sources, not yet primary-confirmed
 *   "unverified" = NOT in public record — MUST be confirmed in writing from CI Medini
 *                  before being used as a marketing claim (BOVAEP compliance).
 *
 * RULE: Do not surface any "unverified" field as a factual claim on the live site.
 *       Use the disclaimer wording instead.
 */

export type Verification = "verified" | "likely" | "unverified";

/* -------------------------------------------------------------------------- */
/*  FX — update at publication                                                 */
/* -------------------------------------------------------------------------- */
export const fx = {
  /** RM per 1 SGD. Mid-2026 reference. Update before each campaign. */
  myrPerSgd: 3.4,
  asOf: "May 2026",
};

export function rmToSgd(rm: number): number {
  return rm / fx.myrPerSgd;
}

/* -------------------------------------------------------------------------- */
/*  CORE PROJECT FACTS                                                         */
/* -------------------------------------------------------------------------- */
export const project = {
  name: "Bodaiju Residences",
  fullName: "Bodaiju Residences @ Medini",
  kanji: "菩提樹",
  meaning: "The Bodhi Tree — a symbol of enlightenment, peace, longevity and growth.",
  tagline: "Restful living in the heart of Medini.",
  type: "Service Residence",
  location: {
    zone: "Medini Zone C",
    mukim: "Mukim Pulai",
    city: "Iskandar Puteri",
    state: "Johor",
    country: "Malaysia",
    postcode: "79250",
  },
  landAreaAcres: 3.54,
  tenure: {
    label: "99-year Leasehold",
    leaseExpiry: "27 December 2114",
    verification: "likely" as Verification,
    // The single highest-priority FLAG. Medini land is IIB freehold under a
    // Private Lease Scheme (PLS). IIB has offered PLS→freehold conversion since
    // Jan 2025 (RM8 psf GFA undeveloped / RM10,000 per completed unit).
    flag:
      "Exact title structure (registered strata vs PLS sub-lease vs freehold-converted) " +
      "is NOT in the public record. Confirm CI Medini's written position before publishing.",
  },
  totalUnits: 802,
  towers: [
    { name: "Tower A", storeys: 32, units: 405, phase: 1 },
    { name: "Tower B", storeys: 31, units: 397, phase: 2 },
  ],
  carParkPodiumLevels: 7,
  facilitiesLevel: 8,
  unitSizeRangeSqft: [463, 1012] as [number, number],
  bedroomTypes: [1, 2, 3],
  startingPriceRm: 299000,
  completionYear: 2028,
  towerAConstructionCompletion: "30 November 2027", // per LOA disclosure
  constructionStart: "1 September 2025",
  constructionPeriodMonths: 27,
  launchDate: "9 May 2026",
  officialWebsite: "https://www.bodaiju-residence.com",
  verification: "verified" as Verification,
};

/* -------------------------------------------------------------------------- */
/*  CONTACT                                                                    */
/*  No professional credential (REN/agency) is asserted on the public site.   */
/*  Enquiries route to the project sales team. If a licensed REN/agency is     */
/*  added later, set renName/renNumber/agencyName/agencyE + office line and    */
/*  re-enable the BOVAEP estate-agency notice in /legal and the footer.        */
/* -------------------------------------------------------------------------- */
export const contact = {
  teamName: "Bodaiju Residences Sales Team",
  // All live contact runs through the Crisp chat widget (the owner's inbox).
  // No phone/email is published — they were the developer's, not the seller's.
  salesGallery: {
    name: "Bodaiju Residences Sales Gallery",
    address:
      "Blok C, Pusat Perdagangan Ion Akses, Persiaran Medini Sentral 6, Bandar Medini Iskandar, 79250 Iskandar Puteri, Johor",
    mapsQuery: "Pusat Perdagangan Ion Akses, Medini, Iskandar Puteri, Johor",
  },
};

/* -------------------------------------------------------------------------- */
/*  DEVELOPER & CONTRACTOR                                                     */
/* -------------------------------------------------------------------------- */
export const developer = {
  entity: "Creed Property Malaysia Sdn Bhd",
  formerly: "CI Medini Sdn Bhd",
  parent: "Creed Group (Japan)",
  parentFounded: 1996,
  founder: "Toshihiko Muneyoshi",
  ownershipNote: "100% Creed Group-owned since November 2015.",
  groupGdvUsd: "Over USD 3 billion across South & Southeast Asia",
  groupGdvVerification: "likely" as Verification, // self-reported, not independently audited
  countriesActive: 9,
  history:
    "Began as Sunsuria Medini Sdn Bhd (2013). Creed Group joined as JV partner in Nov 2014 and " +
    "took 100% ownership in Nov 2015, renaming the entity CI Medini Sdn Bhd. Now operates as " +
    "Creed Property Malaysia Sdn Bhd.",
  priorMediniDelivery:
    "Delivered the ION Medini commercial nodes (ION1–ION4) in the same Zone C area, all with CCC.",
  flagshipReference: {
    name: "Bodaiju Residences, Phnom Penh",
    units: 928,
    floors: 14,
    completed: "January 2020",
    note:
      "Japan's first and largest condominium development in Cambodia — a delivered, occupied " +
      "precedent at the same scale as Bodaiju Medini.",
    verification: "verified" as Verification,
  },
  // Critical differentiator for cross-border buyers.
  notForestCity:
    "Creed is a privately-held Japanese investor with no exposure to the China property crisis. " +
    "It is unrelated to Country Garden / Forest City.",
  verification: "verified" as Verification,
};

export const contractor = {
  entity: "MGB Construction & Engineering Sdn Bhd",
  parent: "MGB Berhad (subsidiary of LBS Bina Group Berhad)",
  contractValueRm: 185_990_000,
  contractValueLabel: "RM185.99 million",
  loaDate: "12 August 2025",
  source: "MGB Berhad Bursa Malaysia announcement, 12 Aug 2025",
  trackRecord: "Listed Malaysian construction group with delivered residential projects in Johor.",
  verification: "verified" as Verification,
};

/* -------------------------------------------------------------------------- */
/*  UNIT TYPES & PRICING                                                       */
/*  Per-unit prices are LIKELY (aggregator/dossier) — confirm vs CI Medini     */
/*  price list before publishing exact figures.                               */
/* -------------------------------------------------------------------------- */
export interface UnitType {
  code: string;
  label: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  priceRm: number;
  dualKey?: boolean;
  positioning: string;
  bestFor: string;
}

export const units: UnitType[] = [
  {
    code: "A",
    label: "Type A",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 463,
    priceRm: 299000,
    positioning: "The entry point — the lowest-priced new launch in Medini.",
    bestFor: "Singles, cross-border commuters, first-step investors.",
  },
  {
    code: "B",
    label: "Type B",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 753,
    priceRm: 432000,
    positioning: "The mainstream own-stay layout.",
    bestFor: "Couples and small families; the strongest rental layout.",
  },
  {
    code: "C",
    label: "Type C",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 893,
    priceRm: 512000,
    positioning: "The family layout.",
    bestFor: "Families wanting space near EduCity's international schools.",
  },
  {
    code: "C1",
    label: "Type C1",
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1012,
    priceRm: 609999,
    dualKey: true,
    positioning: "Dual-key — live in one half, rent the other.",
    bestFor: "Investors wanting rental income while owner-occupying.",
  },
];

export const pricingVerification: Verification = "likely";

export function pricePsf(u: UnitType): number {
  return u.priceRm / u.sqft;
}

/* -------------------------------------------------------------------------- */
/*  COST MODEL  — drives the calculator (the most important page)             */
/*  Rates current as of Budget 2026. Always show "estimates only" disclaimer. */
/* -------------------------------------------------------------------------- */
export const costModel = {
  // Memorandum of Transfer (MOT) / instrument of transfer stamp duty.
  foreignerMotRate: 0.08, // 8% FLAT for foreigners from 1 Jan 2026 (doubled from 4%).
  citizenMotTiers: [
    { upTo: 100_000, rate: 0.01 },
    { upTo: 500_000, rate: 0.02 },
    { upTo: 1_000_000, rate: 0.03 },
    { upTo: Infinity, rate: 0.04 },
  ],
  loanAgreementStampRate: 0.005, // 0.5% of loan amount.
  legalFeesRate: 0.015, // ~1.5% combined SPA + loan (SRO sliding scale approximation).
  // Johor state consent for foreign acquisition.
  stateConsent: {
    rate: 0.03, // moved to 3% / RM30,000 min from Jul 2025 (confirm vs land office circular).
    minimumRm: 30_000,
    verification: "likely" as Verification,
  },
  // Default financing assumptions (editable in the UI).
  defaultLtvForeigner: 0.7, // foreigners typically 60–70%.
  defaultLtvCitizen: 0.9,
  defaultInterestRate: 0.0385, // ~3.85% p.a.
  defaultTenureYears: 30,
  // Exit taxes (for the investment page, not the upfront calculator).
  rpgtNonCitizen: { y1to5: 0.3, y6plus: 0.1 },
  rentalIncomeTaxNonResident: 0.3,
  firstTimeCitizenExemptionUpToRm: 500_000, // extended to 31 Dec 2027.
  opr: 0.0275, // Bank Negara OPR after 9 Jul 2025 cut.
  // Maintenance fee is NOT public — do not display a figure as fact.
  maintenanceFee: {
    verification: "unverified" as Verification,
    typicalRangePsf: [0.3, 0.5] as [number, number],
    flag: "Bodaiju's maintenance fee is not yet published. Range shown is the Medini norm, not a quote.",
  },
};

/** Tiered citizen MOT stamp duty. */
export function citizenStampDuty(price: number): number {
  let duty = 0;
  let lower = 0;
  for (const tier of costModel.citizenMotTiers) {
    const taxable = Math.min(price, tier.upTo) - lower;
    if (taxable > 0) duty += taxable * tier.rate;
    lower = tier.upTo;
    if (price <= tier.upTo) break;
  }
  return duty;
}

/** Standard amortised monthly repayment. */
export function monthlyRepayment(principal: number, annualRate: number, years: number): number {
  const r = annualRate / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
}

export type BuyerType = "citizen" | "singaporean" | "foreigner";

export interface CostBreakdown {
  price: number;
  downPayment: number;
  loanAmount: number;
  motStampDuty: number;
  loanStampDuty: number;
  legalFees: number;
  stateConsent: number;
  totalUpfront: number;
  totalUpfrontPct: number;
  monthly: number;
}

/** The core calculator engine. */
export function computeCosts(
  price: number,
  buyer: BuyerType,
  opts?: { ltv?: number; interestRate?: number; tenureYears?: number }
): CostBreakdown {
  const isForeign = buyer !== "citizen";
  const ltv = opts?.ltv ?? (isForeign ? costModel.defaultLtvForeigner : costModel.defaultLtvCitizen);
  const rate = opts?.interestRate ?? costModel.defaultInterestRate;
  const years = opts?.tenureYears ?? costModel.defaultTenureYears;

  const loanAmount = price * ltv;
  const downPayment = price - loanAmount;

  const motStampDuty = isForeign ? price * costModel.foreignerMotRate : citizenStampDuty(price);
  const loanStampDuty = loanAmount * costModel.loanAgreementStampRate;
  const legalFees = price * costModel.legalFeesRate;
  const stateConsent = isForeign
    ? Math.max(price * costModel.stateConsent.rate, costModel.stateConsent.minimumRm)
    : 0;

  const totalUpfront = downPayment + motStampDuty + loanStampDuty + legalFees + stateConsent;
  const monthly = monthlyRepayment(loanAmount, rate, years);

  return {
    price,
    downPayment,
    loanAmount,
    motStampDuty,
    loanStampDuty,
    legalFees,
    stateConsent,
    totalUpfront,
    totalUpfrontPct: totalUpfront / price,
    monthly,
  };
}

/* -------------------------------------------------------------------------- */
/*  THE ABSD COMPARISON — the strongest cross-border sales lever              */
/*  Singapore charges foreigners 60% Additional Buyer's Stamp Duty.           */
/* -------------------------------------------------------------------------- */
export const singaporeAbsd = {
  foreignerRate: 0.6,
  note:
    "In Singapore, a foreigner pays 60% Additional Buyer's Stamp Duty on a residential purchase — " +
    "before the price of the property itself.",
};

/* -------------------------------------------------------------------------- */
/*  MACRO TAILWINDS                                                            */
/* -------------------------------------------------------------------------- */
export const macro = {
  jsSez: {
    name: "Johor–Singapore Special Economic Zone (JS-SEZ)",
    signed: "7 January 2025",
    note:
      "Formally signed at the 11th Malaysia–Singapore Leaders' Retreat. Iskandar Puteri (which " +
      "contains Medini) is one of the flagship zones.",
    incentives:
      "5% corporate tax (up to 15 yrs) for qualifying investments; 15% concessionary personal " +
      "income tax (up to 10 yrs) for eligible knowledge workers.",
    fdiFacilitated: "Over RM18 billion in FDI facilitated since 2024.",
    verification: "verified" as Verification,
  },
  rtsLink: {
    name: "JB–Singapore RTS Link",
    route: "Bukit Chagar (JB) ↔ Woodlands North (Singapore)",
    // Official position (Transport Minister Anthony Loke, Jan 2026): construction
    // targeted complete by end-2026, passenger operations from January 2027.
    serviceStart: "January 2027",
    journeyMinutes: 5,
    capacityPerHour: 10000,
    fareRange: "RM15.50 – RM21.70 per journey (indicative)",
    // No single authoritative overall % is officially published; do not render a
    // hard figure. Officials describe physical works as substantially complete.
    progressNote: "Physical works substantially complete; systems testing under way (2026).",
    distanceFromBodajuKm: 25, // RTS is a drive/cycle play, not walkable from Medini.
    verification: "verified" as Verification,
  },
  foreignOwnership: {
    noMinimumPrice:
      "Medini is exempt from Johor's RM1 million minimum price floor for foreign buyers — the " +
      "single biggest legal advantage Medini retains over the rest of Johor.",
    noBumiQuota: "No Bumi quota and no low-cost component requirement at the Medini zone level.",
    verification: "verified" as Verification,
    flag:
      "Verified at the Medini zone level. Always confirm the project-specific position and current " +
      "state rules with a licensed lawyer before relying on it.",
  },
  plsToFreehold: {
    note:
      "Since January 2025, IIB offers PLS→freehold conversion (RM8 psf GFA undeveloped, or " +
      "RM10,000 per completed unit). A freehold-converted comparable (Sunway Maple) trades ~25% " +
      "above its PLS sibling (Aviana).",
    verification: "verified" as Verification,
  },
  oprNote: "Bank Negara cut the OPR to 2.75% on 9 July 2025 — modestly supportive for mortgages.",
};

/* -------------------------------------------------------------------------- */
/*  LOCATION & DISTANCES                                                       */
/* -------------------------------------------------------------------------- */
export interface Distance {
  place: string;
  distance: string;
  time: string;
  category: "border" | "transport" | "retail" | "education" | "healthcare" | "leisure";
}

export const distances: Distance[] = [
  { place: "Tuas Second Link CIQ (Malaysia side)", distance: "9 km", time: "12–15 min", category: "border" },
  { place: "Sunway Big Box & NSK Trade Centre", distance: "350 m", time: "5 min walk", category: "retail" },
  { place: "Mall of Medini", distance: "~1 km", time: "5 min", category: "retail" },
  { place: "LEGOLAND Malaysia Resort", distance: "~2 km", time: "5 min", category: "leisure" },
  { place: "Gleneagles Hospital Medini", distance: "Within Medini zone", time: "Short drive", category: "healthcare" },
  { place: "EduCity (international schools)", distance: "2–4 km", time: "5–10 min", category: "education" },
  { place: "Puteri Harbour", distance: "~5 km", time: "8–10 min", category: "leisure" },
  { place: "Bukit Chagar RTS Station / JB Sentral", distance: "~25 km", time: "30–40 min", category: "transport" },
  { place: "Senai International Airport", distance: "~30 km", time: "20–25 min", category: "transport" },
];

export const ecosystem = {
  education: [
    "Marlborough College Malaysia (UK boarding + IB)",
    "Raffles American School (American + IB)",
    "University of Southampton Malaysia",
    "Newcastle University Medicine Malaysia (NUMed)",
    "University of Reading Malaysia",
    "Sunway International School Iskandar Puteri",
  ],
  healthcare: ["Gleneagles Hospital Medini", "Columbia Asia Hospital"],
  retail: ["Sunway Big Box Retail Park", "NSK Trade Centre", "Mall of Medini", "Eco Botanic dining strip"],
  leisure: ["LEGOLAND Malaysia Resort", "Puteri Harbour Marina", "X-Park Sunway Iskandar", "Pinewood Studios"],
  note: "Iskandar Puteri's registered private schools are all international schools, by EduCity design.",
};

/* -------------------------------------------------------------------------- */
/*  COMPETITIVE BENCHMARKS (for /compare)                                      */
/*  PSF figures are aggregator-computed; treat as directional.                */
/* -------------------------------------------------------------------------- */
export interface Competitor {
  name: string;
  status: string;
  psf: string;
  note: string;
}

export const competitors: Competitor[] = [
  {
    name: "Bodaiju Residences",
    status: "New launch · Tower A completion target Nov 2027",
    psf: "from ~RM574 (RM299k entry)",
    note: "Japanese brand, RTS-cycle delivery, 802 units, no foreigner price floor.",
  },
  { name: "Afiniti Residences", status: "Completed 2017", psf: "~RM526–558", note: "Wellness-themed, 147 units, premium." },
  { name: "Grand Medini", status: "Completed 2018", psf: "~RM537–710", note: "Established occupancy, proven rentals." },
  { name: "The M @ Medini", status: "Completed 2017", psf: "~RM588–639", note: "High-density; wide price dispersion." },
  { name: "D'Pristine @ Medini", status: "Completed 2017", psf: "~RM303–646", note: "1,182 SOFO units; deeper supply." },
  { name: "Sunway Citrine", status: "Completed 2017", psf: "~RM823–979", note: "Premium; integrated into Sunway township." },
];

/* -------------------------------------------------------------------------- */
/*  FAQ — answers the real objections of cross-border buyers                  */
/* -------------------------------------------------------------------------- */
export interface Faq {
  q: string;
  a: string;
  category: "tenure" | "trust" | "cost" | "market" | "delivery" | "eligibility" | "rental" | "financing";
}

export const faqs: Faq[] = [
  {
    category: "tenure",
    q: "What is the land tenure — is it freehold or leasehold?",
    a:
      "Bodaiju is marketed as a 99-year leasehold service residence. Medini's land historically sits " +
      "on IIB freehold land under a Private Lease Scheme (PLS), and since January 2025 IIB has offered " +
      "PLS→freehold conversion. The exact title structure for this project is being confirmed in writing " +
      "from the developer, and the SPA tenure clause will be shown verbatim. Always verify the title " +
      "structure with your own lawyer before signing.",
  },
  {
    category: "trust",
    q: "Is this connected to Forest City or Country Garden?",
    a:
      "No. Bodaiju's developer is CI Medini Sdn Bhd, 100% owned by Creed Group — a privately-held " +
      "Japanese real-estate investor with no exposure to the China property crisis. Creed has a " +
      "delivered, occupied 928-unit precedent (Bodaiju Phnom Penh, completed January 2020). Country " +
      "Garden Pacificview, Forest City's developer, is an unrelated Chinese listed company.",
  },
  {
    category: "cost",
    q: "What does it really cost a Singaporean to buy, beyond the headline price?",
    a:
      "Beyond the purchase price, foreign buyers pay 8% stamp duty (from 1 Jan 2026), Johor state " +
      "consent (~3% or RM30,000 minimum, whichever is higher), 0.5% loan stamp duty and ~1.5% legal " +
      "fees — roughly 13–20% in transaction costs on top of the price, proportionally higher on lower-" +
      "priced units because of the RM30,000 consent floor. Our cost calculator shows the exact breakdown " +
      "per unit in both MYR and SGD. For context, Singapore charges foreigners 60% ABSD before the " +
      "property price itself.",
  },
  {
    category: "market",
    q: "Won't there be oversupply pressure in Medini?",
    a:
      "Medini has meaningful existing strata supply, and Johor leads Malaysia on residential overhang " +
      "by value. We don't hide this. The counter-point: Bodaiju's RM299k entry undercuts most resale " +
      "stock, and Medini high-rise has appreciated an estimated 25–35% since 2020 as supply absorbed. " +
      "Treat it as a stock-vs-flow question and buy on fundamentals, not speculation.",
  },
  {
    category: "delivery",
    q: "What happens if construction is delayed?",
    a:
      "Tower A has a Bursa-disclosed construction completion target of 30 November 2027, backed by a " +
      "RM185.99 million contract with MGB Construction & Engineering (a listed builder). The SPA carries " +
      "statutory liquidated-damages (LAD) protection for late delivery. Tower B's start date is still to " +
      "be announced — Tower B buyers should insist on a hard SPA-defined delivery date.",
  },
  {
    category: "eligibility",
    q: "Can foreigners actually buy here?",
    a:
      "Medini is exempt from Johor's RM1 million minimum price floor for foreigners — so foreigners can " +
      "buy from RM299,000, which is rare in Malaysia. Foreign acquisitions still require Johor state " +
      "consent (a structured but routine process in Medini). Confirm current rules with a licensed " +
      "lawyer, as eligibility and thresholds can change.",
  },
  {
    category: "rental",
    q: "Can I rent it out on Airbnb / short-term?",
    a:
      "Short-term rental depends on Bodaiju's building house rules, which are not yet published. Some " +
      "Medini buildings permit short stays; others don't. Don't base an investment case on Airbnb income " +
      "until the developer confirms the policy in writing.",
  },
  {
    category: "financing",
    q: "Can a Singaporean get a mortgage for this?",
    a:
      "Yes. Malaysian banks (CIMB, Maybank, Hong Leong, RHB) and the Malaysian arms of UOB, OCBC and " +
      "Standard Chartered offer cross-border mortgages, typically at 60–70% loan-to-value for foreign " +
      "buyers (up to 80% under MM2H). CPF cannot be used for overseas property. Approval depends on your " +
      "credit profile and the bank's valuation.",
  },
];

/* -------------------------------------------------------------------------- */
/*  UNVERIFIED ITEMS — the honest "Receipts" list (transparency = trust)      */
/* -------------------------------------------------------------------------- */
export const unverifiedItems: string[] = [
  "Exact land tenure / title structure (PLS, registered strata, or freehold-converted)",
  "Monthly maintenance fee and sinking fund (PSF)",
  "Total gross floor area (GFA) and project GDV",
  "Formal SPA vacant-possession date",
  "Tower B construction start and completion dates",
  "Verbatim facilities list",
  "Bumi-quota exemption confirmation at project level",
  "Short-term rental / Airbnb house-rules position",
  "Per-floor pricing and current unit availability",
];

/* -------------------------------------------------------------------------- */
/*  LEGAL / COMPLIANCE  (BOVAEP + KPKT)                                        */
/*  Sourced from the project brochure footer — verify vs the live brochure.   */
/* -------------------------------------------------------------------------- */
export const legal = {
  developerLicence: { number: "30949/01-2030/0005", valid: "06 Jan 2025 – 05 Jan 2030" },
  advertisingPermit: { number: "30949-1/11-2028/0935", valid: "06 Nov 2025 – 05 Nov 2028" },
  approvingAuthority: "Majlis Bandaraya Iskandar Puteri (MBIP)",
  planApprovalRef: "MBIP(JB)RP/9/2/2024(40)",
  verification: "likely" as Verification,
  // BOVAEP Standard 6 (2018) — mandatory on property advertisements.
  buyerFeeDisclaimer:
    "Persons responding to this advertisement are not required to pay any estate agency fee whatsoever " +
    "for properties referred to in this advertisement as this firm is already retained by a particular principal.",
  disclaimers: {
    general:
      "All information, images, layouts, plans, specifications, facilities, pricing and illustrations " +
      "are for general guidance only and may include artist's impressions. All particulars are subject " +
      "to approval by the relevant authorities and may change without prior notice. Please refer to the " +
      "Sale and Purchase Agreement for final terms, specifications and layouts.",
    foreignBuyer:
      "Eligibility for purchase by non-Malaysian buyers is subject to current federal and Johor State " +
      "rules, relevant approvals, and legal advice specific to the purchaser and transaction.",
    pricing:
      "Prices shown are indicative published prices only, subject to unit type, level, orientation, " +
      "promotions, availability, stamp duties, legal fees and financing approval.",
    calculator:
      "Calculator figures are estimates for general guidance only, based on stated assumptions and " +
      "current tax rates. They are not a quotation or financial advice. Confirm all figures with your " +
      "solicitor and bank before transacting.",
  },
};

/* -------------------------------------------------------------------------- */
/*  TOP SELLING POINTS (factually defensible)                                  */
/* -------------------------------------------------------------------------- */
export const sellingPoints: { title: string; detail: string }[] = [
  { title: "Japanese developer, delivered track record", detail: "Creed Group delivered a 928-unit comparable in Phnom Penh (completed Jan 2020)." },
  { title: "From RM299,000", detail: "Among the lowest-priced new launches in Medini — and foreign-eligible with no RM1m floor." },
  { title: "Inside the JS-SEZ", detail: "Iskandar Puteri is a flagship zone of the Johor–Singapore SEZ, signed 7 Jan 2025." },
  { title: "RTS Link from 2027", detail: "~5-minute JB–Singapore crossing targeted to open January 2027." },
  { title: "Bursa-disclosed construction", detail: "RM185.99m contract with listed builder MGB; Tower A target 30 Nov 2027." },
  { title: "No Bumi quota, no foreigner price floor", detail: "Medini's special-zone status remains in force in 2026." },
  { title: "Education, healthcare & leisure minutes away", detail: "EduCity (2–4 km), Gleneagles Medini and LEGOLAND (~2 km) are all a short drive away." },
  { title: "Possible freehold conversion path", detail: "IIB's Jan-2025 PLS→freehold programme may apply — subject to developer election." },
];
