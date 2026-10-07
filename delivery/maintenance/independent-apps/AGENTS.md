# Independent Apps homepage task

## Current attempt — latest films

The 2026-10-07 follow-up replaces the earlier Chinese cut with the newest Lecture Asset Chinese/English films and adds the latest Everwhile English film. See `attempt-02/AGENTS.md`, source/derivative hashes in `attempt-02/media-provenance.json`, and the appended current-attempt section of `REPORT.md`. Earlier evidence below remains historical and is not overwritten.

## Purpose and scope

This folder records the 2026-10-07 user-requested homepage addition and publication of Lecture Asset and Everwhile before QQ Lingxi. The existing project cases, fact records, résumé, PDF, Vercel project, and domain remain unchanged.

## Upstream sources

- Portfolio base: `origin/main` at `b247d040ee8e598b799150557f0388fe727f59d0`.
- Lecture Asset accepted Chinese Store screenshots: `Zhangsfish/lecture-asset` main `df7755abea679fc776959fa0843c625428034541`, `reports/S05/store-screenshots-01/store/zh-Hans/01...06*.png`.
- Lecture Asset promotional film source: PR #18 head `a5a2e8bdab27c04bd0feb5636f0a649f29eebfe8`, `marketing/video/v2/review/director-r3/director-cut-zh-workbuddy-720.mp4`, SHA-256 `0d05b331f4c4667854f3a1b07476b8ccf6981a2e4885ec11091f585782940158`. The PR remains in director review. The user explicitly requested an online portfolio preview; the web cut ends at 20.5 s and fades out before the unverified App Store QR/download end card. It is labeled as a clip, not a released advertisement.
- Everwhile accepted Chinese Store screenshots: `Zhangsfish/Elapse` main `3afd08da4408860e9a2236904fe92c543f4d37d8`, `store-assets/zh-Hans/01...04*.png`.
- Product and release status: both repositories' `STATUS.md`, Lecture Asset `docs/PRODUCT_DECISIONS.md` and Everwhile `docs/PRODUCT_DECISIONS.md` / `docs/S03_APP_STORE_RELEASE_PLAN.md` as read on 2026-10-07.

## File map

- `publication/apps-showcase.json`: site-only, user-authorized homepage copy. Its marketing paragraphs are explicitly proposed plans, not measured outcomes.
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

- PR #26 is open for the owner's visual feedback; do not claim it is merged. The published site artifact corresponds to source commit `f1188a996d8ce5c9749fa76a71b5a7b0172b9c91`.
- Production deployment `dpl_rKqzBnNhKGH7dp8MXc4V6yL5QPzC` at the existing `zhang-shuo-portfolio.vercel.app` domain was anonymously browser-tested and 43/43 files hash-matched. `REPORT.md` and `production-resource-audit.json` are the current evidence entry points.
- Any further copy or layout change requires rebuilding, reauditing, and redeploying the same existing project before saying production reflects it.
