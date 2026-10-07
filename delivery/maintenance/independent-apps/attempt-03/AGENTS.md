# Compact app row and approved copy — 2026-10-07

User approved the immediately preceding copy draft and requested publication: put Lecture Asset and Everwhile together in a desktop row, allow automatic wrapping on narrow screens, remove promotional plans, use the approved scenario/response paragraphs. This attempt inherits parent AGENTS.md and the film provenance/limits in attempt-02. No new assets or source-app changes.

`publication/apps-showcase.json` is the user-approved site copy. `site/src/pages/index.astro` groups the two apps in `.apps-grid`; CSS uses auto-fit and a 520px minimum card width bounded by 100%, so narrow containers wrap without overflow. Each app retains its video and screenshot carousel. Mobile stacks internal media; intermediate single-column tablet cards can use larger media.

`browser-layout.mjs` checks 320/375/768/1024/1170/1200/1366/1920 real viewports, actual card positions, content/controls fitting inside cards, approved visible text, and absence of marketing copy. It records local/production measurements and selected screenshots. Existing gallery tests still verify language selection, actual video decoding, carousel/modal/focus/reduced-motion, all routes, PDF hash and 404. Logs and screenshots are separate from prior attempts.

`dist-manifest.json`, `predeploy.json`, `production-resource-audit.json`, `evidence.json`, and parent REPORT are current publication evidence once populated. Only the existing Vercel project/domain is allowed. This remains PR #26's publication-preview branch; the separately documented main PET source-mapping issue is not addressed by this visual/copy task.
