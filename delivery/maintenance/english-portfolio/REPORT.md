# English portfolio delivery

Date: 2026-10-08. Source baseline: `origin/main` at `b43128fdbdedb3b54e0e3ea0da9046bf4d154e70`.

## Scope and source

The existing Chinese portfolio remains the source of truth. This task adds a complete English site using the currently public Chinese wording. In particular, the PET project retains its older public status (draft manuscript, planned JMC submission, and two anticipated patent applications) as the user requested; the later research-status update was not substituted.

Twelve files under `publication/en/` contain the English copy for the homepage, gallery, apps, profile, resume, shared interface text, and six case studies. Each content file records its Chinese source path and normalized-LF SHA-256; `ui.md` records the interface source paths and baseline commit. The site build reads these files, checks the source hashes, and refuses to use stale translations after source changes. Original media and figures are reused. Both app showcases visibly say that their screenshots show the Chinese interface.

A separate language-review subagent compared all 12 files with the Chinese copy. Its first pass identified inaccurate QQ competition-stage wording, missing SPPS solid-phase specificity, a misleading PET heading, and unnatural short phrases. These were corrected, and its second pass found no remaining blocking translation or ownership/status issues. The full review is in `review/subagent-language-review.md`.

## Site implementation

- Chinese routes stay at `/`, `/work/<id>/`, and `/resume/`; corresponding English routes are `/en/`, `/en/work/<id>/`, and `/en/resume/`.
- A visible 中文 / English control links to the counterpart of the current page. Each page declares its actual language, canonical URL, and alternate-language metadata.
- Shared page components and localized media controls keep gallery, app carousel, zoom dialog, video controls, keyboard behavior, and responsive layout consistent across both languages.
- The English resume translates the HTML content. Its download button identifies the existing PDF as **Chinese**; no English PDF is claimed or generated. The PDF SHA-256 remains `6ffad2b816e42127769360cac709ad037db7a9699f53ffad6b584bb6daaa1abf`.
- Sitemap and static-output audit cover both languages. `site/vercel-output-config.json` provides a language-aware 404 fallback for a future Vercel deployment; the deployer must place these routes into the final Vercel output config.
- `pet-public-copy-freeze.json` suppresses only nine previously known PET source-drift warnings when the exact approved public content and source hashes match. A test confirms that a further PET change restores the warning.

## Verification

- `npm --prefix site test`: 33/33 passed.
- `npm --prefix site run test:jd`: 9/9 passed.
- `npm --prefix site run check`: 42 files, zero errors/warnings/hints.
- `npm --prefix site run build`: 18 static pages, production audit passed, 30 approved media assets.
- `node site/scripts/check-alignment.mjs`: passed.
- `npm --prefix site run test:locale`: 40 browser page/width/language checks passed at 320, 375, 768, 1024, 1366, and 1440 px; tested route pairs, language metadata, overflow, visible translations, controls, and PDF hash.
- `npm --prefix site run test:gallery`: existing Chinese gallery behavior passed at mobile and desktop sizes, including video playback, dialogs, focus, reduced motion, and unknown-route handling.

Logs and representative screenshots are in `review/`. The local Astro preview does not apply Vercel's routing config to unknown `/en/*` paths; only a Vercel preview deployment can verify that server-level fallback. The `/en/404/` page itself was browser-tested.

## Before production

Review the PR, verify the Vercel output fallback on a preview deployment, and recheck live external links and current App Store availability. Publication or merge requires a separate user request.
