# Native App media follow-up

Date: 2026-10-08. The owner pointed out that both apps have English promotional images and asked that the two Lecture Asset films follow the site language directly.

## Sources and behavior

- Lecture Asset English carousel: six existing images from `Zhangsfish/lecture-asset` commit `862532409a43fa7e3e224cdd00cc296130b719d4`, `reports/S05/store-screenshots-01/store/en/`. Local files were byte-identical to that commit's Git blobs.
- Everwhile English carousel: four existing images from `Zhangsfish/Elapse` commit `ffe21d5efaec8c14e859c21ba1f63ca88432326f`, `store-assets/en/`. Downloaded from commit-pinned raw URLs; hashes match the upstream `ENGLISH_FREEZE.json` and the local manifest.
- All ten copied files match the SHA-256 values in `app-media-provenance.json` and `site/assets-manifest.json`. Chinese pages keep their existing Chinese promotional images.
- Lecture Asset uses `lecture-film-zh.mp4` on `/` and `lecture-film-en.mp4` on `/en/`; the former in-page language buttons were removed. Everwhile's only film is English, including on the Chinese page, where the caption explicitly calls it an English film.
- The English translation-review subagent rechecked this follow-up and found no blocking text/media mismatch. Its original Chinese-screenshot caveat was superseded by these newly connected existing images.

## Verification

- `npm --prefix site test`: 33/33 passed; `npm --prefix site run test:jd`: 9/9 passed.
- `npm --prefix site run check`: 42 files, no errors/warnings/hints.
- `npm --prefix site run build`: 18 pages and public-output audit passed; 40 approved media assets, 34,024,919 bytes total.
- `npm --prefix site run test:gallery`: passed at 375 and 1366 px; decoded Chinese Lecture and English Everwhile films on the Chinese page.
- `npm --prefix site run test:locale`: 40 bilingual route/width checks passed; English page references both English carousels and decoded the English Lecture film.
- Visually inspected the real English App section at 375 and 1366 px; selected screenshots are `screenshots/apps-en-375.png` and `screenshots/apps-en-1366.png`.
