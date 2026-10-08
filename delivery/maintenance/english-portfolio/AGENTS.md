# English portfolio task memory

## Purpose

Build an English version of the existing Zhang Shuo portfolio from the current public Chinese copy. The user requested independent Markdown translations linked to each Chinese source, a subagent language/fidelity review, then shared site pages with visible Chinese / English navigation.

## Upstream

- Repository baseline: `origin/main` at `b43128fdbdedb3b54e0e3ea0da9046bf4d154e70` (fetched 2026-10-08).
- Handoff: `delivery/handoffs/english-portfolio-20261008/HANDOFF.md` on the separate `docs/english-portfolio-handoff` branch.
- Public source: `publication/home.json`, `gallery.json`, `apps-showcase.json`, `profile.json`, `projects/*.md`, and `resume/variants/general-zh.json`.
- The user explicitly chose the existing PET public wording for this English version. Do not promote the later research-status update into the site in this task.

## File map

- `publication/en/*.md` and `publication/en/projects/*.md`: canonical English translation documents. Each records the corresponding Chinese source path and SHA-256. They are reviewed before site implementation.
- `review/`: subagent language and fidelity findings, decisions, and source-to-page coverage.
- `review/app-media-provenance.json`: upstream repositories, commits, paths, and SHA-256 values for ten existing English promotional images copied into `site/public/media/`.
- `REPORT.md`: implementation, tests, limitations, and handoff.

## Current decisions

- Keep `/` Chinese and add `/en/`, corresponding `/en/work/<id>/` pages and `/en/resume/`.
- Share components, media, styling, factual figures, and project order. Offer same-page language links in both directions.
- The user corrected App media pairing on 2026-10-08: both screenshot carousels follow the site language; Lecture Asset's two films also follow the site language without a player-level switch. Everwhile has only an English film, explicitly labeled on the Chinese page.
- Existing PDF is Chinese; label it accurately on the English page. No English PDF has been prepared.
- This task authorizes translation and implementation. PR may be prepared for review; do not merge or publish without a separate user request.
- Freeze the chosen PET public copy with an exact source-hash policy in `pet-public-copy-freeze.json`; unrelated source drift still fails the production build.

## Delivery state

- All 12 English Markdown translations were reviewed by a subagent, corrected, and approved in a second pass; see `review/subagent-language-review.md`.
- Shared site components, English routes, same-page language switches, metadata, sitemap, and language-aware fallback configuration are implemented.
- Local tests and browser evidence are summarized in `REPORT.md`; test logs and screenshots are under `review/`.
- `review/native-media-verification.md` records the follow-up. The original translation-review document remains historical; its Chinese-screenshot caveat was superseded by the user's correction and the newly connected English images.
- Recheck external link availability and app-release status before any production publication. Production deployment has not been authorized.
