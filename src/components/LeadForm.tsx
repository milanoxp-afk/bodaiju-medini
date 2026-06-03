"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { track } from "../lib/analytics";
import { openCrisp } from "../lib/crisp";
import { Button } from "./ui/Button";

/**
 * Multi-step lead form (unit type → budget → contact).
 * The conversion brief found progressive multi-step forms lift completion
 * 40–60% vs one long form for higher-friction asks, because each step is a
 * small, easy commitment. On finish it opens the Crisp chat (owner inbox)
 * with all answers pre-loaded as the first message — no data is lost and the
 * lead arrives fully qualified.
 *
 * Honest design: no fake scarcity, no guaranteed-return claims. Just a
 * lower-friction path to a real conversation.
 *
 * Note: option `value`s stay in English — they are the payload sent to the
 * Crisp inbox so the team reads a single consistent language. Only the visible
 * labels are localised.
 */

const BUDGET_OPTIONS = [
  "Under RM400,000",
  "RM400,000 – RM550,000",
  "RM550,000 – RM700,000",
  "Above RM700,000",
  "Still exploring",
];

type Step = 0 | 1 | 2;

export function LeadForm() {
  const t = useTranslations("form");

  const UNIT_OPTIONS = [
    { value: "Type A (1-bed, 463 sqft)", label: "Type A", sub: "1-bed · 463 sqft" },
    { value: "Type B (2-bed, 753 sqft)", label: "Type B", sub: "2-bed · 753 sqft" },
    { value: "Type C (3-bed, 893 sqft)", label: "Type C", sub: "3-bed · 893 sqft" },
    { value: "Type C1 (3-bed dual-key, 1,012 sqft)", label: "Type C1", sub: "3-bed dual-key" },
    { value: "Not sure yet", label: t("notSure"), sub: t("helpMeChoose") },
  ];

  const PURPOSE_OPTIONS = [
    { value: "Own stay", label: t("ownStay") },
    { value: "Investment / rental", label: t("investment") },
    { value: "Both", label: t("both") },
    { value: "Not sure yet", label: t("notSureYet") },
  ];

  const [step, setStep] = useState<Step>(0);
  const [unit, setUnit] = useState("");
  const [budget, setBudget] = useState("");
  const [purpose, setPurpose] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  const field =
    "w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3 text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-gold-deep)]";

  const chip = (active: boolean) =>
    `rounded-xl border px-4 py-3 text-left text-sm transition-all ${
      active
        ? "border-[var(--color-gold)] bg-[var(--color-gold)]/10 shadow-sm"
        : "border-[var(--color-line)] hover:border-[var(--color-ink)]/30"
    }`;

  function next(to: Step, ev: string, val: string) {
    track("calculator_unit_selected", { step: ev, value: val }); // reuse existing event names
    setStep(to);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    track("form_submitted", { unit, budget, purpose, channel: "crisp" });
    setDone(true);
    const msg =
      `Hi, I'd like to register my interest in Bodaiju Residences.\n` +
      `Name: ${name}\nPhone: ${phone}\n` +
      `Layout: ${unit || "—"}\nBudget: ${budget || "—"}\nPurpose: ${purpose || "—"}`;
    openCrisp(msg);
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-5 flex items-center gap-2" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= step ? "bg-[var(--color-gold)]" : "bg-[var(--color-line)]"
            }`}
          />
        ))}
      </div>
      <p className="mb-4 text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
        {t("step", { n: step + 1 })}
      </p>

      {/* Step 1 — layout */}
      {step === 0 && (
        <div>
          <h3 className="font-serif text-lg font-semibold text-[var(--color-ink)]">{t("whichLayout")}</h3>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {UNIT_OPTIONS.map((o) => (
              <button key={o.value} type="button" className={chip(unit === o.value)} onClick={() => { setUnit(o.value); next(1, "unit", o.value); }}>
                <span className="block font-semibold text-[var(--color-ink)]">{o.label}</span>
                <span className="block text-xs text-[var(--color-muted)]">{o.sub}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 — budget + purpose */}
      {step === 1 && (
        <div>
          <h3 className="font-serif text-lg font-semibold text-[var(--color-ink)]">{t("budgetGoal")}</h3>
          <p className="mb-3 mt-3 text-xs font-medium uppercase tracking-wide text-[var(--color-muted)]">{t("budget")}</p>
          <div className="grid gap-2">
            {BUDGET_OPTIONS.map((b) => (
              <button key={b} type="button" className={chip(budget === b)} onClick={() => setBudget(b)}>{b}</button>
            ))}
          </div>
          <p className="mb-3 mt-5 text-xs font-medium uppercase tracking-wide text-[var(--color-muted)]">{t("purpose")}</p>
          <div className="grid grid-cols-2 gap-2">
            {PURPOSE_OPTIONS.map((p) => (
              <button key={p.value} type="button" className={chip(purpose === p.value)} onClick={() => setPurpose(p.value)}>{p.label}</button>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <Button variant="outline" onClick={() => setStep(0)}>← {t("back")}</Button>
            <Button variant="primary" className="flex-1" onClick={() => setStep(2)}>{t("continue")} →</Button>
          </div>
        </div>
      )}

      {/* Step 3 — contact */}
      {step === 2 && (
        <form onSubmit={submit}>
          <h3 className="font-serif text-lg font-semibold text-[var(--color-ink)]">{t("whereToSend")}</h3>
          <p className="mt-1 mb-4 text-sm text-[var(--color-muted)]">
            {t("whereToSendNote")}
          </p>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">{t("name")}</label>
              <input id="name" required value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder={t("namePlaceholder")} />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">{t("phone")}</label>
              <input id="phone" required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={field} placeholder="+65 / +60 …" />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <Button variant="outline" onClick={() => setStep(1)}>← {t("back")}</Button>
            <Button type="submit" variant="gold" className="flex-1">{t("sendDetails")} →</Button>
          </div>
          {done && (
            <p className="mt-3 text-center text-sm text-[var(--color-sage-deep)]">
              {t("openingChat")}
            </p>
          )}
          <p className="mt-4 text-center text-xs text-[var(--color-muted)]">
            {t("consent")}
          </p>
        </form>
      )}
    </div>
  );
}
