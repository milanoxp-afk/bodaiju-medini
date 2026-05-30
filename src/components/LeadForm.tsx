"use client";

import { useState } from "react";
import { whatsappLink } from "../data/project";
import { track } from "../lib/analytics";
import { Button } from "./ui/Button";

/**
 * Lead form. With no backend configured, it hands off to WhatsApp with the
 * captured details pre-filled (so no lead is lost). When a form endpoint is
 * added later, POST to it here before the WhatsApp handoff.
 */
export function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("Type B (2-bed)");
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    track("form_submitted", { interest });
    setDone(true);
    const msg =
      `Hi, I'd like to register my interest in Bodaiju Residences.\n` +
      `Name: ${name}\nPhone: ${phone}\nInterested in: ${interest}`;
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
  };

  const field =
    "w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3 text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-gold-deep)]";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">Name</label>
        <input id="name" required value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">Phone / WhatsApp</label>
        <input id="phone" required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={field} placeholder="+65 / +60 …" />
      </div>
      <div>
        <label htmlFor="interest" className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">Interested in</label>
        <select id="interest" value={interest} onChange={(e) => setInterest(e.target.value)} className={field}>
          <option>Type A (1-bed)</option>
          <option>Type B (2-bed)</option>
          <option>Type C (3-bed)</option>
          <option>Type C1 (3-bed dual-key)</option>
          <option>Not sure yet</option>
        </select>
      </div>
      <Button type="submit" variant="gold" size="lg" className="w-full">
        Register interest via WhatsApp →
      </Button>
      {done && (
        <p className="text-center text-sm text-[var(--color-sage-deep)]">
          Opening WhatsApp… if nothing happens, message us directly at the number above.
        </p>
      )}
      <p className="text-center text-xs text-[var(--color-muted)]">
        By submitting, you consent to be contacted about Bodaiju Residences. We never share your details with third parties without your consent.
      </p>
    </form>
  );
}
