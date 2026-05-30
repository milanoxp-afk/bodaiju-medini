import Script from "next/script";

/**
 * Loads GA4, Microsoft Clarity and Meta Pixel — but only when their IDs are
 * present as environment variables. With no IDs set, this renders nothing,
 * so the site works fine in development and before analytics is configured.
 *
 * Set these in Vercel → Project → Settings → Environment Variables:
 *   NEXT_PUBLIC_GA_ID       e.g. G-XXXXXXXXXX   (Google Analytics 4)
 *   NEXT_PUBLIC_CLARITY_ID  e.g. abcd1234       (Microsoft Clarity, optional)
 *   NEXT_PUBLIC_META_PIXEL  e.g. 1234567890     (Meta Pixel, optional)
 *
 * The track() helper in src/lib/analytics.ts then sends events to whichever
 * of these are loaded.
 */
// GA4 Measurement ID. This is PUBLIC (it ships in page HTML on every GA site),
// so it is safe to commit. An env var override takes precedence if set in Vercel.
const DEFAULT_GA_ID = "G-GCSE1091XB";

export function Analytics() {
  const ga = process.env.NEXT_PUBLIC_GA_ID || DEFAULT_GA_ID;
  const clarity = process.env.NEXT_PUBLIC_CLARITY_ID;
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL;

  return (
    <>
      {/* ---- Google Analytics 4 ---- */}
      {ga && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {/* ---- Microsoft Clarity (heatmaps + session replay) ---- */}
      {clarity && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarity}");
          `}
        </Script>
      )}

      {/* ---- Meta (Facebook) Pixel ---- */}
      {pixel && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixel}'); fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
