# Task Memory — Home Experience Alignment

## Task Purpose

This folder records the authorized maintenance that aligns the published portfolio homepage, six case pages, and general résumé with the approved experience narratives, then validates, merges, and releases the result to the existing Vercel project.

## Upstream Context

- Project rules: `../../../AGENTS.md` and `../../../START_HERE.md`
- Authorized implementation: `03-IMPLEMENTATION.md`
- Execution handoff: `04-CODEX-HANDOFF.md`
- Source PR: `maintenance/home-experience-alignment` / PR #21
- Canonical approved narratives: `../../../skills/zhang-shuo-experience-writing/references/`

## File Map

- `01-CONTENT-DIFF.md`: gap analysis against the approved narratives.
- `02-REFERENCE-REVIEW.md`: accepted and rejected parts of the uploaded homepage reference.
- `03-IMPLEMENTATION.md`: scoped implementation contract.
- `04-CODEX-HANDOFF.md`: browser, merge, and release handoff.
- `REPORT.md`: single review and release report.
- `evidence/`: earlier static/PDF evidence supplied with PR #21.
- `attempt-02/`: final local browser, build, PDF, deployment, and anonymous production evidence produced by the completing Codex session.

## Current Decisions

- Preserve QQ → SPPS → KIN as the primary media order and the approved content facts.
- Fix only reproducible layout, interaction, build, PDF, or release defects.
- Publish only audited `site/dist` to the existing free Vercel project and domain.
- Do not alter DNS, authentication, repository visibility, analytics, or the separate KIN/QQ projects.

## Open Questions

- Final reviewer acceptance remains separate from this implementation report.
- The independent QQ Demo is expected to remain behind Basic Auth and is not bypassed.

## Handoff Notes

Use the newest numbered attempt as the authoritative evidence. Preserve prior R07 audits and the earlier `evidence/` directory. Record the merged `main` commit and production deployment before claiming the maintenance is live.
