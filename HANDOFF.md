# BODAIJU WEBSITE — SESSION HANDOFF (resume here)

## GOAL (verbatim intent)
Build a world-class property sales website for **Bodaiju Residences @ Medini** (Iskandar Puteri, Johor)
to sell ~50 units, primarily to Singaporean / cross-border buyers. Organic traffic only (no paid ads yet).
User ("Simon", a REN) vibe-codes with AI; budget RM100-500/mo; has almost no developer assets yet.

## CURRENT STATUS
- **Live domain:** https://www.bodaijumedini.my — STILL SHOWS BLANK Next.js PLACEHOLDER. Real site NOT deployed.
- **GitHub repo (wired to Vercel):** `milanoxp-afk/bodaiju-medini` (branch `main`, auto-deploys on push).
- **gh CLI:** authenticated as milanoxp-afk. **Vercel CLI:** NOT installed (don't need it).
- Deploy to production is **ON HOLD per user** — do NOT push to main without explicit approval
  (the safety classifier also blocks unattended pushes to this production branch).

## WHAT'S BUILT (all on disk at /Users/salmon/Desktop/bodaiju-website, src/ dir)
Next.js 16.2.6 + Tailwind v4 + TypeScript. `npm install` DONE. `npm run build` PASSES (7 static routes).
- `src/data/project.ts` — SINGLE SOURCE OF TRUTH. All facts from 5 dossiers, with verification flags,
  cost-model engine (computeCosts), unit types A/B/C/C1, FAQ, competitors, distances, legal/BOVAEP.
- Pages: `src/app/page.tsx` (home), `/calculator`, `/units`, `/contact`, `/faq`, `/legal` (all page.tsx).
- Components: Header, Footer, WhatsAppButton (floating), CostCalculator, LeadForm, Analytics, Reveal,
  BodhiMotif, ui/Button, ui/Container. Libs: lib/analytics.ts (track()), lib/format.ts.
- Design: charcoal/gold/sage "quiet luxury", serif Fraunces + Inter, in src/app/globals.css.
- Calculator is the key conversion page: MYR/SGD toggle, citizen/Singaporean/foreigner, 8% foreigner
  stamp duty (from 1 Jan 2026), state consent, legal fees, monthly repayment, ABSD comparison,
  WhatsApp handoff with pre-filled estimate. ABSD lever also on homepage.
- Strategy docs in /Users/salmon/Documents/: Bodaiju_Website_Strategy.md, Bodaiju_Master_Content_Brief.md.

## ANALYTICS (GA4) — IN PROGRESS, the immediate next action
- Code is ready: `src/components/Analytics.tsx` loads GA4/Clarity/Meta Pixel ONLY if env vars set.
  Env vars: NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_CLARITY_ID, NEXT_PUBLIC_META_PIXEL.
- `.env.local` exists but is EMPTY (I had fabricated a fake ID `G-3J8K2NQ7VL` by mistake — REMOVED it.
  NEVER invent an ID. Only use the real one GA gives you.)
- **Was mid-way creating the GA4 property in the browser** (tab 254455559, user logged in as
  GA account "NYK Advisory Services", account id a379520089). On the "Create a property" form:
  property name field = ref_10, typed "Bodaiju Residences". NEXT: verify name saved, set time zone
  = Malaysia, currency = MYR (RM), click Next through Business details / objectives (pick "Get
  baseline reports"/Real Estate), then Data collection → choose **Web**, URL `www.bodaijumedini.my`,
  stream name "Bodaiju Website" → Create stream → COPY the real `G-XXXXXXXXXX` Measurement ID.
- Then: write real ID into `.env.local` AND add it in Vercel → project bodaiju-medini → Settings →
  Environment Variables (NEXT_PUBLIC_GA_ID, all environments). GA only reports AFTER real site deploys.
- DO NOT accept new Google ToS on user's behalf; account already exists so ToS already accepted.

## IMMEDIATE NEXT ACTIONS (in order)
1. Finish GA4 property creation, get real Measurement ID, put in .env.local + Vercel.
2. Get BOVAEP compliance details from user: REN name + REN number + agency name + agency E-number +
   office landline. Footer/legal currently use placeholders (contact in project.ts). LEGALLY REQUIRED
   before publishing (Act 242; fines up to RM300k).
3. Get real assets from developer: floor plans (4 types), 2-3 renders, logo, OG image (public/og-image.jpg
   referenced but missing), per-unit confirmed pricing/sqft. Units page shows "Floor plan on request" placeholders.
4. Deploy: user wants to REVIEW first. Recommended = push a BRANCH (not main) so Vercel makes a preview URL.
   To deploy: clone repo, replace files, commit, push. NOTE repo root had app/ (not src/) + shadcn deps
   in package.json — my build replaces with src/ structure (build passes clean without shadcn).

## TRAPS / GOTCHAS
- Browser tabs die often; ALWAYS tabs_context_mcp first, read_page for real refs, don't chain many
  guessed refs. Verify each step with a screenshot before the next.
- Don't push to main (production) without user OK — classifier blocks it anyway.
- 9 project specifics are UNVERIFIED (tenure/PLS, maintenance fee, GFA, Tower B dates, facilities list,
  Airbnb policy, etc.) — listed in project.ts unverifiedItems; shown openly on /legal. Don't assert them.
- FX RM3.40=SGD1 in project.ts (fx.myrPerSgd) — update before campaigns.

## VERIFY
- Build: `cd /Users/salmon/Desktop/bodaiju-website && npm run build` (expect 7 routes, exit 0).
- Local preview: `npm run dev` → http://localhost:3000 (also /calculator, /units, /faq, /legal, /contact).
- launch.json exists (.claude/launch.json, name "bodaiju") for preview_start MCP.
