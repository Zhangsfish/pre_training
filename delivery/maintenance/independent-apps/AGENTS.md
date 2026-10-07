# Independent Apps homepage task

## Current attempt — compact row and approved copy

The user approved a desktop row with responsive wrapping, removed promotional plans, and approved revised scenario/response copy. Current evidence is in `attempt-03/AGENTS.md` and parent REPORT (Attempt 03). Films remain the verified latest Lecture Asset Chinese/English and Everwhile English derivatives from Attempt 02; their provenance/hashes remain in `attempt-02/media-provenance.json`. Earlier evidence is historical and is not overwritten.

## Purpose and scope

This folder records the 2026-10-07 user-requested homepage addition and publication of Lecture Asset and Everwhile before QQ Lingxi. The existing project cases, fact records, résumé, PDF, Vercel project, and domain remain unchanged.

## Upstream sources

- Portfolio base: `origin/main` at `b247d040ee8e598b799150557f0388fe727f59d0`.
- Lecture Asset accepted Chinese Store screenshots: `Zhangsfish/lecture-asset` main `df7755abea679fc776959fa0843c625428034541`, `reports/S05/store-screenshots-01/store/zh-Hans/01...06*.png`.
- Lecture Asset promotional film source: PR #18 head `a5a2e8bdab27c04bd0feb5636f0a649f29eebfe8`, `marketing/video/v2/review/director-r3/director-cut-zh-workbuddy-720.mp4`, SHA-256 `0d05b331f4c4667854f3a1b07476b8ccf6981a2e4885ec11091f585782940158`. The PR remains in director review. The user explicitly requested an online portfolio preview; the web cut ends at 20.5 s and fades out before the unverified App Store QR/download end card. It is labeled as a clip, not a released advertisement.
- Everwhile accepted Chinese Store screenshots: `Zhangsfish/Elapse` main `3afd08da4408860e9a2236904fe92c543f4d37d8`, `store-assets/zh-Hans/01...04*.png`.
- Product and release status: both repositories' `STATUS.md`, Lecture Asset `docs/PRODUCT_DECISIONS.md` and Everwhile `docs/PRODUCT_DECISIONS.md` / `docs/S03_APP_STORE_RELEASE_PLAN.md` as read on 2026-10-07.

## File map

- `publication/apps-showcase.json`: site-only, user-authorized scenario/response copy. Promotional-plan fields and sections were removed by direct user request.
- `site/public/media/lecture-*`, `everwhile-*`: copied public screenshots and the derived web film. SHA-256 and publication allowlist live in `site/assets-manifest.json`.
- `site/src/components/AppCarousel.astro`, `site/src/pages/index.astro`, `site/src/scripts/gallery.ts`, `site/src/styles/gallery.css`: presentation and accessible carousel behavior.
- `REPORT.md`: build, browser, and deployment acceptance results.
- `scripts/resources.mjs`: generate the local dist SHA-256 manifest and verify every published resource against it.
- `evidence/`: browser screenshots and logs for this attempt.
- `tmp/`: local source film and inspection frames, intentionally Git-ignored and never published.

## Decisions and boundaries

- The two apps appear before the existing QQ → SPPS → KIN gallery. `publication/home.json` and locked résumé selection stay unchanged.
- No App Store download link is shown until a verified public listing exists. Both apps are explicitly labeled not publicly released.
- Lecture Asset's PDF is for human reading and its ZIP for an external AI; the app itself does not generate AI summaries. Cleanup requires saved-archive confirmation.
- Everwhile informs the user's time choices without blocking or scoring them. Its store screenshots use visible tutorial examples, not claimed live usage data.
- No analytics, new contact field, paid feature, new Vercel project, DNS change, or source-app code change.

## Handoff

- PR #26 is open for the owner's visual feedback; do not claim it is merged. Current published site artifact corresponds to source commit `f7e2d6b8538b6e7b3b861278a19f89d734513ad6` with the compact row, approved copy and latest bilingual/English films.
- Current production deployment `dpl_Cgrah1FZN6AwbCSKJr5cYd1vTazh` at the existing `zhang-shuo-portfolio.vercel.app` domain was anonymously browser-tested and 45/45 files hash-matched. `REPORT.md` (Attempt 03) and `attempt-03/production-resource-audit.json` are the current evidence entry points. Earlier deployment/evidence remain historical.
- Any further copy or layout change requires rebuilding, reauditing, and redeploying the same existing project before saying production reflects it.
