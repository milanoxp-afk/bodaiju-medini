# BODAIJU WEBSITE — SESSION HANDOFF (read this first)

_Last updated: 4 June 2026. This file is the single source of truth for resuming
work. Everything important lives in the **git repo**, not in any chat history._

## GOAL
World-class bilingual (EN/中文) property sales website for **Bodaiju Residences @
Medini** (Iskandar Puteri, Johor) to help sell ~50 units, mainly to Singaporean /
cross-border buyers. Organic traffic only (no paid ads). Credibility-led: honest,
fact-checked, no overclaiming. Owner is "Simon"; contact runs through Crisp chat.

## HOW TO RESUME IN A NEW SESSION
```bash
cd /tmp
gh repo clone milanoxp-afk/bodaiju-medini bodaiju -- --branch preview-site
cd bodaiju && npm install && npm run build   # must exit 0, ~23 static routes
npm run start                                 # serve :3000 → preview / and /zh
```
Then tell the new agent: **"Read HANDOFF.md in /tmp/bodaiju and continue."**

- **Repo:** `milanoxp-afk/bodaiju-medini` (GitHub; gh CLI authed as milanoxp-afk).
- **Active branch:** `preview-site` ← ALL work here. `main` = old blank placeholder
  still on the live domain.
- **Live domain:** https://www.bodaijumedini.my → still BLANK placeholder. Real
  site is preview-only until go-live.
- **Preview URL (auto-updates on each push to preview-site):**
  https://bodaiju-medini-git-preview-site-simons-projects-f814a63a.vercel.app
  (+ /zh). Preview is behind Vercel login wall → owner's browser sees it; `curl`
  returns 401 (expected, not a bug). To verify rendered HTML, run `npm run start`
  locally and curl localhost.

## WORKFLOW RULES (learned the hard way — follow these)
1. Work in the /tmp git clone, NOT `~/Desktop/bodaiju-website` (it's permission-
   locked / stale — ignore it).
2. If the /tmp clone ever corrupts (`git status` → "not a repository"), just
   re-clone from GitHub. Nothing is lost because everything is pushed.
3. Bash sometimes can't cat/cp the project files — use Read/Write/Edit tools
   instead. npm/git/grep/node via Bash are fine.
4. NEVER push to `main` without explicit user approval (live domain; classifier
   blocks it too). Push to `preview-site`.
5. VERIFY don't claim: build, then serve+curl to confirm before saying it works.
   Do NOT put unmeasured metrics in commit messages (past mistake).
6. Never invent IDs or facts. Real GA + Crisp IDs are already baked in (below).
7. End commit messages with the Co-Authored-By line.

## TECH STACK
Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · TypeScript ·
next-intl v4 · Vercel (deploy on GitHub push).
- Master facts: `src/data/project.ts`
- UI copy: `messages/en.json` + `messages/zh.json` (must keep key parity)
- Routes live under `src/app/[locale]/…`; root layout passes through, locale
  layout sets <html lang>, fonts, chrome.

## WHAT'S BUILT & VERIFIED (all on preview-site, build green, 23 routes)
- Pages (EN `/…` + 中文 `/zh/…`): home, units, calculator, contact, faq,
  location, tenure, legal, facilities.
- Cost calculator: citizen/Singaporean/foreigner; 8% foreigner stamp duty; Johor
  consent 3% or RM30k min; loan+legal; 30yr amortisation; MYR+SGD; ABSD compare.
  Math independently re-verified.
- Crisp live chat is THE contact channel. Every CTA opens Crisp (owner inbox).
  ID `1d52612f-ce6b-4ed2-9fc3-ad8696cfba83` in src/components/CrispChat.tsx.
  Developer's WhatsApp/email were removed sitewide.
- GA4 `G-GCSE1091XB` in src/components/Analytics.tsx.
- Multi-step lead form (layout→budget→contact) → Crisp.
- SEO/GEO: robots.ts (AI bots allowed), sitemap.ts, JSON-LD (Org +
  RealEstateListing + per-unit Apartment + RealEstateAgent), FAQ schema (kept EN),
  canonical=bodaijumedini.my, per-locale metadata + hreflang en/zh-Hans/x-default.
- 2026 UX: mono `.figure` numerals, sticky mobile CTA, film grain, View
  Transitions, adaptive header, AA contrast (a11y 100 local), reduced-motion.
- Bilingual: full [locale] tree, EN·中文 toggle, Noto SC fonts + .lang-zh CJK
  typography (1.7 line-height). All pages+components translated; key parity OK.
- FACT-CHECK.md in repo: every claim VERIFIED/LIKELY/UNVERIFIED, web-checked
  June 2026 (9/10 macro facts TRUE; stale RTS % removed).

## OPEN ITEMS / TODO
1. **GATING for /zh going live: Chinese copy needs NATIVE-SPEAKER REVIEW.** It's
   professional AI translation, not human-verified. All zh copy is in
   `messages/zh.json` (one file).
2. **Dossier content compiled but NOT yet on pages** (user chose "Facilities only"
   last round; rest await go-ahead):
   - `/compare` — competitor table (`competitors` in project.ts, used in 0 files;
     footer link trimmed because page missing). HIGH VALUE.
   - `/developer` — Creed timeline, ION completions, Phnom Penh 928-unit case
     study, "not Country Garden" table. HIGH VALUE (trust).
   - `/investment` — yields, RPGT exit, MM2H tiers, financing/banks, currency.
   - Deeper concept (Ma/Omotenashi), launch date 9 May 2026, fuller phasing.
   Recommended next: Developer + Compare (data already structured).
3. **BOVAEP / agent identity:** user does NOT want a REN tag. All REN/agency
   claims stripped; contact is generic "sales team" → Crisp. Dormant fields +
   re-enable note exist if a licensed REN is added later.
4. **Assets pending from user/developer:** hero image, renders, floor plans,
   public/og-image.jpg (referenced, missing). Units page shows "floor plan on
   request" placeholders.
5. **Off-site (only user can do):** Google Business Profile, Bing Webmaster +
   IndexNow, PropertyGuru/iProperty/EdgeProp listings, YouTube walkthroughs.
   Also: load crisp-ai-knowledge-base.md into Crisp's AI agent.
6. **GO LIVE** = merge preview-site → main. Needs user approval. Recommend NOT
   before (1) native zh review + (3) BOVAEP details + ideally (4) real assets.

## UNVERIFIED FACTS — never assert as fact (shown on /legal "awaiting confirmation")
tenure structure (PLS/strata/freehold), maintenance fee, sinking fund, GFA/GDV,
SPA VP date, Tower B dates, verbatim facilities list, project-level Bumi exemption,
Airbnb policy, per-floor pricing. Per-unit prices + APDL numbers are LIKELY (caveated).
Facilities page shows VERIFIED-only (19 brochure items); excludes sky garden,
CCTV, 3-tier security, EV charging, GreenRE.

## SOURCE DOCS (on user's machine; access may vary)
/Users/salmon/Documents/Bodaiju_Master_Content_Brief.md (consolidated 5-dossier brief)
/Users/salmon/Documents/Bodaiju_Website_Strategy.md (sales/marketing strategy)
crisp-ai-knowledge-base.md (in repo) — vetted Q&A for Crisp AI agent.
