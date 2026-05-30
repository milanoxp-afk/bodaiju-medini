"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { whatsappLink } from "../data/project";
import { track } from "../lib/analytics";

const nav = [
  { label: "Residences", href: "/units" },
  { label: "Cost Calculator", href: "/calculator" },
  { label: "Location", href: "/location" },
  { label: "Developer", href: "/developer" },
  { label: "FAQ", href: "/faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--color-cream)]/90 backdrop-blur-md shadow-[0_1px_0_var(--color-line)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        {/* Wordmark */}
        <Link href="/" className="group flex flex-col leading-none" aria-label="Bodaiju Residences home">
          <span className="font-serif text-xl font-semibold tracking-tight text-[var(--color-ink)]">
            Bodaiju
          </span>
          <span className="text-[0.6rem] uppercase tracking-[0.3em] text-[var(--color-gold-deep)]">
            Residences · Medini
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-gold-deep)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappLink("Hi, I'd like to enquire about Bodaiju Residences @ Medini.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_clicked", { location: "header" })}
            className="hidden rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-[var(--color-cream)] transition-all hover:bg-[var(--color-ink-soft)] sm:inline-flex"
          >
            Enquire
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center lg:hidden"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-[var(--color-ink)] transition-all ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-[var(--color-ink)] transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-[var(--color-ink)] transition-all ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-[var(--color-cream)] transition-all duration-500 lg:hidden ${
          open ? "max-h-96 border-t border-[var(--color-line)]" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-5 py-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-[var(--color-line)] py-3.5 text-[var(--color-ink-soft)] last:border-0"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={whatsappLink("Hi, I'd like to enquire about Bodaiju Residences @ Medini.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { track("whatsapp_clicked", { location: "mobile_menu" }); setOpen(false); }}
            className="mt-3 mb-2 inline-flex justify-center rounded-full bg-[#25D366] px-5 py-3 text-sm font-medium text-white"
          >
            Chat on WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
