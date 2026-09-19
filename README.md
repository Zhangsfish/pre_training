# pre_training

A structured career evidence bank for generating job-specific, ATS-friendly resumes from one verified source of truth.

Primary application context: **China campus recruiting**, especially consumer, technology, hardware, and multinational companies. English / overseas-style variants can be generated from the same evidence bank when needed.

## Core idea

Use the "pre-training → task adaptation" metaphor internally to organize career evidence:

- Training environments — where difficult problems were encountered.
- Capability primitives — what reusable abilities were trained.
- Evidence — what decisions, actions, outputs, feedback, and results prove those abilities.
- JD adaptation — select and reframe only the evidence relevant to a specific role.

The metaphor is a data architecture, not a gimmick to print on the resume.

## Workflow

PROFILE + EXPERIENCE BANK
→ CAPABILITIES + EVIDENCE MAP
→ Job Description
→ Role requirements / paid-for capabilities
→ Select strongest relevant evidence
→ One-page targeted resume
→ Interview evidence pack

## Repository structure

- PROFILE.md — canonical personal / education / contact-field schema.
- PRINCIPLES.md — rules for what may and may not be claimed.
- CAPABILITIES.md — reusable capability primitives.
- EVIDENCE_MAP.md — capability → evidence index.
- experience/ — raw experience records; facts first, resume bullets later.
- resume/STYLE.md — ATS-safe resume formatting and writing rules.
- resume/MASTER.md — master resume shell; not submitted directly.
- applications/ — one folder per JD with match analysis and targeted resume.

## Source-of-truth rule

Do not write a resume bullet from memory if the underlying fact is not recorded in PROFILE.md or an experience record.

Always separate:
- what the user personally decided / did / owned;
- what AI, collaborators, or tools executed;
- what was observed;
- what was assumed / simulated;
- what produced a real external result.

## Current header decisions

- Name: 张朔 / Zhang Shuo
- Primary market: China
- LinkedIn: none
- Generic location: omitted by default
- Phone and email: required in actual resume but kept outside this public repository
- Project links: embedded directly in relevant project entries

## Current status

Repository initialized. Basic profile is being filled through Q&A before experience ingestion starts.
