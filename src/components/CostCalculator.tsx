"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  units,
  computeCosts,
  costModel,
  fx,
  singaporeAbsd,
  type BuyerType,
} from "../data/project";
import { rm, sgd, num } from "../lib/format";
import { openCrisp } from "../lib/crisp";
import { track } from "../lib/analytics";
import { Button } from "./ui/Button";

export function CostCalculator() {
  const t = useTranslations("calculator");

  const buyerOptions: { value: BuyerType; label: string; sub: string }[] = [
    { value: "singaporean", label: t("singaporean"), sub: t("foreignBuyer") },
    { value: "foreigner", label: t("otherForeigner"), sub: t("nonMalaysian") },
    { value: "citizen", label: t("malaysian"), sub: t("citizen") },
  ];

  const [buyer, setBuyer] = useState<BuyerType>("singaporean");
  const [unitCode, setUnitCode] = useState(units[1].code); // default Type B
  const [started, setStarted] = useState(false);

  const unit = units.find((u) => u.code === unitCode) ?? units[0];
  const [price, setPrice] = useState(unit.priceRm);

  // Keep price in sync when unit changes (reset to that unit's base).
  useEffect(() => {
    setPrice(unit.priceRm);
  }, [unit.priceRm]);

  // Fire "started" once on first interaction.
  const markStarted = () => {
    if (!started) {
      setStarted(true);
      track("calculator_started");
    }
  };

  const isForeign = buyer !== "citizen";
  const c = computeCosts(price, buyer);
  const absdEquivalent = price * singaporeAbsd.foreignerRate;

  // Transaction costs = everything EXCEPT the down payment (which is equity you
  // keep, not a cost). This is the honest "extra on top of price" figure.
  const txnCosts = c.totalUpfront - c.downPayment;
  const txnPct = Math.round((txnCosts / price) * 100);

  const lines = [
    { label: t("downPayment"), note: isForeign ? "30% (foreign LTV ~70%)" : "10% (citizen LTV ~90%)", value: c.downPayment },
    { label: isForeign ? t("stampDutyForeign") : t("stampDutyTiered"), note: t("stampDutyNote"), value: c.motStampDuty },
    { label: t("loanStamp"), note: t("loanStampNote"), value: c.loanStampDuty },
    { label: t("legalFees"), note: "~1.5%", value: c.legalFees },
    ...(isForeign ? [{ label: t("stateConsent"), note: t("stateConsentNote"), value: c.stateConsent }] : []),
  ];

  const chatMessage =
    `Hi, I just used the Bodaiju cost calculator.\n` +
    `Unit: ${unit.label} (${num(unit.sqft)} sq ft)\n` +
    `Buyer: ${buyerOptions.find((b) => b.value === buyer)?.label}\n` +
    `Price: ${rm(price)}\n` +
    `Est. total upfront: ${rm(c.totalUpfront)} (~${sgd(c.totalUpfront / fx.myrPerSgd)})\n` +
    `Est. monthly: ${rm(c.monthly)}\n` +
    `Can we discuss availability?`;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
      {/* ---------------- INPUTS ---------------- */}
      <div className="space-y-8">
        {/* Buyer type */}
        <fieldset>
          <legend className="eyebrow mb-3">{t("iAmA")}</legend>
          <div className="grid grid-cols-3 gap-2">
            {buyerOptions.map((b) => (
              <button
                key={b.value}
                aria-pressed={buyer === b.value}
                onClick={() => { setBuyer(b.value); markStarted(); track("calculator_nationality", { buyer: b.value }); }}
                className={`rounded-xl border px-3 py-3 text-left transition-all ${
                  buyer === b.value
                    ? "border-[var(--color-gold)] bg-[var(--color-gold)]/10 shadow-sm"
                    : "border-[var(--color-line)] hover:border-[var(--color-ink)]/30"
                }`}
              >
                <span className="block text-sm font-semibold text-[var(--color-ink)]">{b.label}</span>
                <span className="block text-xs text-[var(--color-muted)]">{b.sub}</span>
              </button>
            ))}
          </div>
        </fieldset>

        {/* Unit type */}
        <fieldset>
          <legend className="eyebrow mb-3">{t("chooseLayout")}</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {units.map((u) => (
              <button
                key={u.code}
                aria-pressed={unitCode === u.code}
                onClick={() => { setUnitCode(u.code); markStarted(); track("calculator_unit_selected", { unit: u.code }); }}
                className={`rounded-xl border px-3 py-3 text-center transition-all ${
                  unitCode === u.code
                    ? "border-[var(--color-gold)] bg-[var(--color-gold)]/10 shadow-sm"
                    : "border-[var(--color-line)] hover:border-[var(--color-ink)]/30"
                }`}
              >
                <span className="block font-serif text-base font-semibold text-[var(--color-ink)]">{u.label}</span>
                <span className="block text-xs text-[var(--color-muted)]">{u.bedrooms} bed · {num(u.sqft)} sq ft</span>
              </button>
            ))}
          </div>
        </fieldset>

        {/* Price slider */}
        <fieldset>
          <div className="mb-3 flex items-baseline justify-between">
            <legend className="eyebrow">{t("unitPrice")}</legend>
            <span className="figure text-lg font-semibold text-[var(--color-ink)]">{rm(price)}</span>
          </div>
          <input
            type="range"
            min={unit.priceRm}
            max={Math.round(unit.priceRm * 1.35)}
            step={1000}
            value={price}
            onChange={(e) => { setPrice(Number(e.target.value)); markStarted(); }}
            className="w-full accent-[var(--color-gold-deep)]"
            aria-label="Adjust unit price for higher floor or view"
          />
          <p className="mt-2 text-xs text-[var(--color-muted)]">
            {t("priceSliderNote", { price: rm(unit.priceRm) })}
          </p>
        </fieldset>
      </div>

      {/* ---------------- RESULTS ---------------- */}
      <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)] p-6 shadow-sm sm:p-8">
        <div className="flex items-baseline justify-between border-b border-[var(--color-line)] pb-4">
          <h3 className="font-serif text-lg font-semibold text-[var(--color-ink)]">{t("yourEstimate")}</h3>
          <span className="text-xs text-[var(--color-muted)]">FX ~RM{fx.myrPerSgd}/S$1</span>
        </div>

        <ul className="divide-y divide-[var(--color-line)]">
          {lines.map((l) => (
            <li key={l.label} className="flex items-start justify-between py-3">
              <span className="pr-3">
                <span className="block text-sm text-[var(--color-ink)]">{l.label}</span>
                <span className="block text-xs text-[var(--color-muted)]">{l.note}</span>
              </span>
              <span className="figure whitespace-nowrap text-right text-sm font-medium text-[var(--color-ink)]">{rm(l.value)}</span>
            </li>
          ))}
        </ul>

        {/* Total upfront */}
        <div className="mt-2 rounded-xl bg-[var(--color-ink)] p-5 text-[var(--color-cream)]">
          <div className="flex items-baseline justify-between">
            <span className="text-sm uppercase tracking-[0.15em] text-[var(--color-gold-soft)]">{t("totalUpfront")}</span>
          </div>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-3">
            <span className="figure text-3xl font-semibold">{rm(c.totalUpfront)}</span>
            <span className="figure text-[var(--color-cream)]/70">{sgd(c.totalUpfront / fx.myrPerSgd)}</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-[var(--color-cream)]/55">
            {t("upfrontExplain", {
              pct: isForeign ? "30%" : "10%",
              txn: `${txnPct}%`,
              extra: isForeign ? `${t("stateConsent")}, ` : "",
            })}
          </p>
          <div className="mt-3 border-t border-white/10 pt-3 text-sm text-[var(--color-cream)]/80">
            {t("thenMortgage")} <strong className="figure text-[var(--color-cream)]">{rm(c.monthly)}</strong>
            <span className="text-[var(--color-cream)]/55"> /mo over {costModel.defaultTenureYears} yrs</span>
          </div>
        </div>

        {/* ABSD comparison (foreigners only) */}
        {isForeign && (
          <div className="mt-4 rounded-xl border border-[var(--color-sage)]/30 bg-[var(--color-sage)]/8 p-4">
            <p className="text-sm leading-relaxed text-[var(--color-ink)]">
              {t("absdLine", { amount: sgd(absdEquivalent / fx.myrPerSgd) })}
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-6">
          <Button
            variant="gold"
            size="lg"
            className="w-full"
            onClick={() => {
              track("calculator_completed", { unit: unitCode, buyer, price });
              track("whatsapp_clicked", { location: "calculator", channel: "crisp" });
              openCrisp(chatMessage);
            }}
          >
            {t("sendEstimate")} →
          </Button>
          <p className="mt-3 text-xs leading-relaxed text-[var(--color-muted)]">{t("calcDisclaimer")}</p>
        </div>
      </div>
    </div>
  );
}
