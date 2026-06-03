"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "../i18n/routing";
import { track } from "../lib/analytics";

/**
 * Sticky bottom CTA bar — mobile only (+31% mobile conversion lever).
 * Hidden on /contact (that whole page is the CTA).
 */
export function StickyCTA() {
  const t = useTranslations("stickyCta");
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/contact") return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-line)] bg-[var(--color-cream)]/95 backdrop-blur-md transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-[var(--color-muted)]">{t("tagline")}</p>
          <p className="figure text-sm font-semibold text-[var(--color-ink)]">From RM299,000</p>
        </div>
        <Link
          href="/calculator"
          onClick={() => track("calculator_started", { source: "sticky_cta" })}
          className="shrink-0 rounded-full bg-[var(--color-gold)] px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-gold-deep)] hover:text-white"
        >
          {t("calculateCost")}
        </Link>
      </div>
    </div>
  );
}
