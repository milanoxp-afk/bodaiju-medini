# BODAIJU WEBSITE — SESSION HANDOFF (read this first)

_Last updated: 4 June 2026 (after official Sales Kit applied). Single source of
truth for resuming work. Everything important lives in the **git repo**, not chat.
NOTE: a parallel session pushed commits b6fc9f8 / 5ab81a1 / df3c8e6 after the
original handoff — always re-clone fresh to get the latest preview-site._

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

## ⚠️ NOTE: Official Sales Kit applied (commit df3c8e6, 4 Jun 2026)
The owner provided the developer's OFFICIAL Sales Kit + e-brochure (primary
sources). This resolved most of the old UNVERIFIED list and fixed one error.
Key changes already live on preview-site — do NOT undo:
- Facilities deck is **Level 7 + roof sky garden** (was wrongly "Level 8").
- Tenure: 99-yr parcel lease (28 Dec 2015→2114), Service Apartment Title
  HSD 546583 / PTD 200287. Now VERIFIED; tenure FAQ rewritten.
- Maintenance fee **RM0.32/sq ft** (+10% sinking fund) — now VERIFIED.
- Facilities now DO include roof sky garden, 3-tier security, EV charging
  (officially confirmed — the earlier "exclude" rule is superseded).
- Financing FAQ: Bank Islam/Muamalat/RHB approved; Affin/Public/CIMB pending.
- Extra data: plot ratio 4.29, Tower A RM299k–RM659k, dev reg 200901023760
  (866859-P), panel lawyers, lease particulars.
- /legal "awaiting confirmation" trimmed 9→5 items.

## ❌ MISSING CONTENT — still not on the site (audited 4 Jun 2026, post-Sales-Kit)
These dossier sections have data in project.ts but NO page renders them:
1. **`/developer`** (HIGH VALUE) — Creed timeline (Sunsuria→CI Medini→Creed),
   ION1–4 completions, Phnom Penh 928-unit case study, and the **"≠ Country
   Garden / Forest City" comparison table**. Strongest trust content. Footer
   link is currently absent because the page doesn't exist.
2. **`/compare`** (HIGH VALUE) — Medini competitor table (Afiniti, Grand Medini,
   The M, D'Pristine, Sunway Citrine + PSF). `competitors` array exists in
   project.ts but is used in 0 files. Footer link trimmed for the same reason.
3. **`/investment`** (HIGH VALUE) — rental yields (5.2–6.35%), RPGT exit math,
   rental income tax, MM2H tiers, financing/banks/CPF, currency, Johor market
   momentum stats (300k cross-border commuters, +20.4% YoY). All in project.ts
   (`costModel`, `macro`) but not surfaced as a page.
Partial gaps (page exists, content not added):
4. Japanese design philosophy — **Ma (間) / Omotenashi** — not on any page.
5. **Medini township context** — 2,230 acres, Khazanah + Mitsui backing,
   USD 20bn GDV — not on /location.
6. Official launch date **9 May 2026 + IIB ribbon-cutting**; fuller two-tower
   phasing detail (A 32st/405u, B 31st/397u, 7-level podium) — not surfaced.
Recommended build order: **/developer → /compare → /investment** (data ready).

## OTHER OPEN ITEMS / TODO
A. **GATING for /zh going live: Chinese copy needs NATIVE-SPEAKER REVIEW.**
   Professional AI translation, not human-verified. All zh copy in messages/zh.json.
B. **BOVAEP / agent identity:** user does NOT want a REN tag. REN/agency claims
   stripped; contact = generic "sales team" → Crisp. Dormant fields exist to
   re-enable a compliant notice if a licensed REN is added.
C. **Assets pending:** hero image, renders, floor plans, public/og-image.jpg
   (referenced, missing). Units page shows "floor plan on request" placeholders.
D. **Off-site (only user can do):** Google Business Profile, Bing Webmaster +
   IndexNow, PropertyGuru/iProperty/EdgeProp listings, YouTube walkthroughs;
   load crisp-ai-knowledge-base.md into Crisp's AI agent.
E. **GO LIVE** = merge preview-site → main (needs user approval). Recommend NOT
   before (A) native zh review + (B) BOVAEP decision + ideally (C) real assets.

## UNVERIFIED FACTS — never assert as fact (now only 5, shown on /legal)
GDV; Tower B start/completion dates (developer: TBC); project-level Bumi-quota
release; Airbnb/short-term-rental policy; per-floor pricing & current availability.
(Tenure, maintenance fee, facilities, financing panel are now VERIFIED via Sales Kit.)

## SOURCE DOCS (on user's machine; access may vary)
/Users/salmon/Documents/Bodaiju_Master_Content_Brief.md (consolidated 5-dossier brief)
/Users/salmon/Documents/Bodaiju_Website_Strategy.md (sales/marketing strategy)
crisp-ai-knowledge-base.md (in repo) — vetted Q&A for Crisp AI agent.
