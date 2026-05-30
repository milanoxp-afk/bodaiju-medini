"use client";

import Script from "next/script";

/**
 * Crisp live-chat + AI agent widget.
 * Loads ONLY when NEXT_PUBLIC_CRISP_ID is set (or DEFAULT_CRISP_ID below is
 * filled in). With no ID, renders nothing — safe to ship before configuring.
 *
 * Get your Website ID from Crisp:
 *   Settings → Website Settings → (your site) → Setup instructions
 *   It's a UUID like "1a2b3c4d-5e6f-7890-abcd-ef1234567890".
 *
 * The Website ID is PUBLIC (it ships in the page on every Crisp site), so it's
 * safe to commit. Paste it into DEFAULT_CRISP_ID, or set NEXT_PUBLIC_CRISP_ID
 * in Vercel.
 */
const DEFAULT_CRISP_ID = "1d52612f-ce6b-4ed2-9fc3-ad8696cfba83";

export function CrispChat() {
  const id = process.env.NEXT_PUBLIC_CRISP_ID || DEFAULT_CRISP_ID;
  if (!id) return null;

  return (
    <Script id="crisp-widget" strategy="afterInteractive">
      {`
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = "${id}";
        (function () {
          var d = document, s = d.createElement("script");
          s.src = "https://client.crisp.chat/l.js";
          s.async = 1;
          d.getElementsByTagName("head")[0].appendChild(s);
        })();
      `}
    </Script>
  );
}
