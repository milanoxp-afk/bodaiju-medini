import type { ReactNode } from "react";

/**
 * Root layout is a minimal pass-through. The real <html>/<body>, fonts, locale
 * and chrome live in src/app/[locale]/layout.tsx so next-intl can set lang per
 * locale. This file just forwards children.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
