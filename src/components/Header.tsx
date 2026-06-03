"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { track } from "../lib/analytics";
import { openCrisp } from "../lib/crisp";

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
        {/* Wordmark — adapts: light over the dark hero, dark once scrolled onto cream */}
        <Link href="/" className="group flex flex-col leading-none">
          <span className={`font-serif text-xl font-semibold tracking-tight transition-colors ${scrolled ? "text-[var(--color-ink)]" : "text-[var(--color-cream)]"}`}>
            Bodaiju
          </span>
          <span className={`text-[0.62rem] font-semibold uppercase tracking-[0.25em] transition-colors ${scrolled ? "text-[var(--color-gold-text)]" : "text-[var(--color-gold-soft)]"}`}>
            Residences · Medini
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-[var(--color-gold-deep)] ${scrolled ? "text-[var(--color-ink-soft)]" : "text-[var(--color-cream)]/90"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => { track("whatsapp_clicked", { location: "header", channel: "crisp" }); openCrisp("Hi, I'd like to enquire about Bodaiju Residences @ Medini."); }}
            className="hidden rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-[var(--color-cream)] transition-all hover:bg-[var(--color-ink-soft)] sm:inline-flex"
          >
            Enquire
          </button>

          {/* Mobile toggle — bars adapt to header background */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center lg:hidden"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 transition-all ${open || scrolled ? "bg-[var(--color-ink)]" : "bg-[var(--color-cream)]"} ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 transition-all ${open || scrolled ? "bg-[var(--color-ink)]" : "bg-[var(--color-cream)]"} ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 transition-all ${open || scrolled ? "bg-[var(--color-ink)]" : "bg-[var(--color-cream)]"} ${open ? "-translate-y-2 -rotate-45" : ""}`} />
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
          <button
            type="button"
            onClick={() => { track("whatsapp_clicked", { location: "mobile_menu", channel: "crisp" }); setOpen(false); openCrisp("Hi, I'd like to enquire about Bodaiju Residences @ Medini."); }}
            className="mt-3 mb-2 inline-flex justify-center rounded-full bg-[var(--color-gold)] px-5 py-3 text-sm font-medium text-[var(--color-ink)]"
          >
            Chat with us
          </button>
        </nav>
      </div>
    </header>
  );
}
