# Latest film integration — 2026-10-07

This attempt updates the already-published independent-apps preview: Lecture Asset has Chinese/English film selection; Everwhile has the English film only. App screenshots and scenario/marketing copy remain. No source-app repository, locked résumé, public PDF, project/domain/team or DNS is changed.

Canonical sources are the accepted `director-r3-caption-male` output on Lecture Asset main `862532409a43fa7e3e224cdd00cc296130b719d4` and Everwhile `director-r2` on Elapse main `34bc5e808d79c03b7a8cb0e74200b51ce99ca4ad`. User directly authorized these films for the portfolio. Everwhile upstream subjective director verdict is not claimed by this integration.

The Lecture 26s masters contain an unverified App Store download/QR end card at 20.5s. The public clips stop at 20.4s and fade from 19.6s. Everwhile is complete at 18s. All are 720×1280, 30fps, H.264 CRF28/AAC96k/faststart web derivatives. Original downloaded films and inspection frames stay in parent `tmp/` (ignored).

`media-provenance.json` contains source/derivative hashes and full-decode results. Logs record commands; `dist-manifest.json` and `production-resource-audit.json` record exact output/online bytes. Full-page browser screenshots are local ignored evidence under `browser-local/` and `browser-production/`; selected viewport screenshots are committed under `screenshots/`.

Publication uses the existing maintenance branch and accepted website/résumé baseline. Latest main `5d8c524` was inspected and trial-merged; its newer PET source record causes the existing claims/source-drift and résumé gates to fail, while its assembly guide explicitly preserves the old public résumé edition. The trial merge is preserved on local branch `preservation/apps-main-sync-20261007`; it is not pushed or published. No claim, fact, test assertion or locked snapshot was rewritten to bypass this conflict. Upstream trial failures are retained in `upstream-main-*-drift.log`; a future content-sync task must review that version mapping separately.

This is a publication preview on PR #26, not a merge into main or a new planning-round acceptance.
