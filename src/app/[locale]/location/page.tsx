import type { Metadata } from "next";
import { Container } from "../../../components/ui/Container";
import { Button } from "../../../components/ui/Button";
import { Reveal } from "../../../components/Reveal";
import { distances, ecosystem, macro } from "../../../data/project";

export const metadata: Metadata = {
  title: "Location — Medini, Iskandar Puteri: RTS, JS-SEZ & What's Nearby",
  description:
    "Where is Bodaiju Residences? In Medini Zone C, Iskandar Puteri — 9 km from the Tuas Second Link, ~2 km from LEGOLAND, minutes from EduCity and Gleneagles, inside the JS-SEZ. Full distance table and connectivity guide.",
  alternates: { canonical: "/location" },
};

const catLabel: Record<string, string> = {
  border: "Singapore border",
  transport: "Transport",
  retail: "Shopping & daily needs",
  education: "Education",
  healthcare: "Healthcare",
  leisure: "Leisure",
};

export default function LocationPage() {
  return (
    <>
      <section className="section-dark pt-32 pb-16">
        <Container>
          <Reveal immediate>
            <p className="eyebrow">The location</p>
            <h1 className="heading-tight mt-4 max-w-3xl font-serif text-[var(--text-h1)] font-semibold">
              Quiet by nature. Connected by design.
            </h1>
            {/* Answer-first capsule (GEO: front-loaded 40–60 word answer) */}
            <p className="mt-5 max-w-2xl text-lg text-[var(--color-cream)]/80">
              Bodaiju Residences sits in Medini Zone C, Iskandar Puteri, Johor — about 9 km
              (12–15 minutes) from the Tuas Second Link to Singapore, ~2 km from LEGOLAND Malaysia,
              and within a short drive of EduCity&rsquo;s international schools and Gleneagles Hospital.
              It lies inside the Johor–Singapore Special Economic Zone.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Distance table */}
      <section className="py-16">
        <Container>
          <Reveal>
            <h2 className="heading-tight font-serif text-[var(--text-h2)] font-semibold text-[var(--color-ink)]">
              How far is everything?
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--color-muted)]">
              Distances are approximate; drive times are off-peak estimates and vary with traffic and
              border conditions.
            </p>
          </Reveal>
          <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--color-cream-deep)] text-[var(--color-ink)]">
                <tr>
                  <th className="px-5 py-3 font-semibold">Destination</th>
                  <th className="px-5 py-3 font-semibold">Distance</th>
                  <th className="px-5 py-3 font-semibold">Time</th>
                  <th className="hidden px-5 py-3 font-semibold sm:table-cell">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-line)] bg-[var(--color-paper)]">
                {distances.map((d) => (
                  <tr key={d.place}>
                    <td className="px-5 py-3 text-[var(--color-ink)]">{d.place}</td>
                    <td className="figure px-5 py-3 text-[var(--color-ink-soft)]">{d.distance}</td>
                    <td className="px-5 py-3 text-[var(--color-muted)]">{d.time}</td>
                    <td className="hidden px-5 py-3 text-[var(--color-muted)] sm:table-cell">{catLabel[d.category]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* JS-SEZ + RTS */}
      <section className="bg-[var(--color-cream-deep)] py-16">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal>
              <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)] p-7 h-full">
                <p className="eyebrow">Macro tailwind</p>
                <h3 className="mt-3 font-serif text-xl font-semibold text-[var(--color-ink)]">{macro.jsSez.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{macro.jsSez.note}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{macro.jsSez.incentives}</p>
                <p className="mt-3 text-sm font-medium text-[var(--color-ink)]">{macro.jsSez.fdiFacilitated}</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)] p-7 h-full">
                <p className="eyebrow">Connectivity</p>
                <h3 className="mt-3 font-serif text-xl font-semibold text-[var(--color-ink)]">{macro.rtsLink.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                  The RTS Link will connect {macro.rtsLink.route} in about {macro.rtsLink.journeyMinutes} minutes,
                  targeted to begin service {macro.rtsLink.serviceStart}.
                </p>
                <p className="mt-3 rounded-lg bg-[var(--color-cream)] p-3 text-sm text-[var(--color-ink-soft)]">
                  <strong>Honest note:</strong> the nearest RTS station (Bukit Chagar) is ~{macro.rtsLink.distanceFromBodajuKm} km
                  from Bodaiju — a drive, not a walk. Treat the RTS as a regional catalyst, not a doorstep amenity.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Ecosystem */}
      <section className="py-16">
        <Container>
          <Reveal>
            <h2 className="heading-tight font-serif text-[var(--text-h2)] font-semibold text-[var(--color-ink)]">
              The neighbourhood
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--color-muted)]">{ecosystem.note}</p>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {([
              ["Education", ecosystem.education],
              ["Healthcare", ecosystem.healthcare],
              ["Shopping", ecosystem.retail],
              ["Leisure", ecosystem.leisure],
            ] as const).map(([title, items], i) => (
              <Reveal key={title} delay={i * 60}>
                <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)] p-6 h-full">
                  <h3 className="font-serif text-lg font-semibold text-[var(--color-ink)]">{title}</h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-[var(--color-muted)]">
                    {items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-dark py-16">
        <Container className="text-center">
          <h2 className="heading-tight mx-auto max-w-xl font-serif text-[var(--text-h2)] font-semibold">
            See how the location translates into value.
          </h2>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Button href="/calculator" variant="gold" size="lg">Calculate your cost →</Button>
            <Button href="/units" variant="outline" size="lg" className="border-white/30 text-[var(--color-cream)] hover:border-white">View residences</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
