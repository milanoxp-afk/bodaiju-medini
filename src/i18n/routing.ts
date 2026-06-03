import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

/**
 * Bilingual routing. English stays at the root ("/") so all existing SEO equity
 * and inbound links are preserved; Simplified Chinese lives under "/zh".
 * localePrefix "as-needed" = no "/en" prefix for the default locale.
 */
export const routing = defineRouting({
  locales: ["en", "zh"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
