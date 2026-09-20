# R07 — Media-first portfolio

Status: IMPLEMENTED; public deployment BLOCKED. No final ACCEPT assigned. No remote push or production mutation performed.

Based on main commit 46a5ac0. Current user explicitly requested direct implementation and a finished media-led homepage; overrides old text-only visual freeze.

## Delivered

- Three primary works: QQ Lingxi, automated flow-chemistry peptide synthesis platform, KIN.
- Homepage: large real media, short caption, watch/open controls; no career timeline, ownership blocks, audit language or How I Work.
- Existing project routes become galleries. Full SPPS English title displayed. PET points to résumé. Both historical course links are on résumé page.
- QQ: three scene stills, 12s muted preview, full 172s film and user-provided Demo link.
- SPPS: four photos, 19s equipment film, 18s secondary film. Incidental audio removed, unnecessary monitor data obscured in photo/secondary-film derivatives.
- KIN: 12s preview combining 11–17s and 24–30s, three stills and 49.792s film; clearly labeled concept demonstration.
- Original masters excluded. 17 derived media files registered with source and derivative SHA-256.
- Accessible native dialog, Escape/close and focus return, scene switching, zoom, visible-only muted previews, reduced-motion behavior.
- Public résumé PDF bytes unchanged. All four résumé display projections compared equal before/after adding the Demo registry entry; source snapshot hashes refreshed for that registry-only addition.

## Verification actually completed

- `npm run check`: zero errors/warnings.
- `npm test`: 31/31 passed, including existing content and private-data rejection tests.
- `npm run build`: seven routes and strict public output audit passed. Output roughly 22MB, client JS 2.95KB. Only registered derived media, compiled local CSS/JS and the existing general PDF ship.
- Cloud Chrome at 1363px: all homepage images loaded; no horizontal overflow; QQ preview playing; QQ full film readyState 4, duration 172.013s and time advancing; KIN full film readyState 4, duration 49.792s and time advancing; SPPS film decoded and reached its 19s end.
- Scene switch and image zoom opened the selected frame; Escape/close worked. SPPS detail shows exact English title.
- Responsive iframe with 375px document width: scrollWidth 375; visual screenshot reviewed.
- Self-contained HTML: embedded QQ movie decoded and played; internal navigation reached SPPS detail. This is a downloadable local preview, NOT a public website URL.
- `gallery-e2e.mjs` supplied for follow-up reproducible browser verification; not run as a complete automated suite here. Old `test:e2e` has R03/R04 assertions for text-only rendering and is not the acceptance test for this intentional redesign.

## Remaining external blockers

- Vercel connection: existing project prj_CfECSSKoBni34VGDTa89UhKu4n09 / team_iUtfj6fbX7ntRyux5VD2Req3 returned 403. Message requires re-authentication to `zhangsfishs-projects`.
- An earlier generic `deploy_to_vercel({})` call was rejected by automatic approval review because target ownership and exact publish scope were not established. It did not deploy. Do not bypass this rejection through Git-triggered deployment or another host. A future authorized session must verify project identity and explicitly restrict publishing to this audited site output before retrying.
- QQ external Demo browser navigation returned ERR_BLOCKED_BY_CLIENT in this environment; current external availability is unverified. URL is from user's supplied material, not invented.
- No new production URL, deployment ID or remote PR exists for R07. Current public site still shows R06.

## Handoff

Use the provided ZIP's source patch plus `site-dist/media` to integrate into the existing repository at its recorded base. The ZIP includes a file manifest and import helper that defaults to checking; apply only in a clean checkout. Rebuild from source and verify before publication. Do not publish the ZIP, repository root, audit evidence or offline HTML wrapper as the production site.
