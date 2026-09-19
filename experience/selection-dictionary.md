# Experience: Selection Dictionary — AI chat pages low-latency local dictionary

> Status: resume-ready public project record.
> Source: public `Zhangsfish/selection-dictionary` repository.

## Product

A Chrome extension for people reading mixed Chinese / English responses on ChatGPT, Claude and Gemini.

Core interaction:
- double-click / select a word or text;
- immediately show Chinese meaning and phonetic notation for words;
- click to hear English pronunciation;
- use Chrome's on-device Translator API for phrases / sentences / paragraphs.

Product priority:
**latency > interaction friction > reliability > common-word accuracy > visual simplicity > advanced features.**

## User problem

The project originated from the user's own recurring pain while reading AI-chat responses:
English words embedded in otherwise understandable text interrupt reading flow, and existing translation tools add too much interaction friction.

The product therefore optimized for:
- zero / near-zero lookup latency;
- no context switching;
- local-first privacy;
- no account / cloud / telemetry dependence.

## Ownership model

Human ownership:
- problem discovery from personal use;
- product boundary;
- architecture decisions;
- acceptance criteria;
- prioritization;
- privacy / distribution principles;
- final QA / go-no-go decisions.

AI / Codex:
- implementation partner;
- code generation / modification;
- testing / audit execution;
- documentation assistance.

Do not describe the user as hand-writing all production code.

## Key product / architecture decisions

- Chrome Manifest V3, Chrome 138+.
- No UI framework at runtime.
- Common single-word lookup uses bundled local ECDICT data.
- No HTTP request for word lookup.
- Phrase / sentence translation uses Chrome Translator API, with no remote fallback.
- TTS only uses browser-reported local English voices.
- Single Shadow DOM popup.
- No login, server, API key, cloud sync, telemetry, subscription, whole-page translation, OCR or wordbook.

This is a deliberately constrained product rather than a feature-maximized platform.

## Verification evidence

The repository records a clean reproducibility / verification pass:
- strict typecheck + build passed;
- **17 unit tests passed**;
- **21 browser checks passed**;
- actual unpacked MV3 extension loaded in browser fixtures for ChatGPT / Claude / Gemini origins;
- repeated word lookup produced zero HTTP requests;
- local-only speech refusal / wiring tested;
- package reproducibility checked in a fresh environment.

Measured synthetic event-to-definition DOM latency after dictionary loading:
- p50 ~1.0 ms;
- p95 ~1.8 ms;
- max ~2.4 ms.

Do not generalize these synthetic measurements into universal end-user paint latency.

## Distribution / artifact

The repository contains:
- public source;
- reproducible build / package flow;
- adaptation guide;
- publication / discoverability documents;
- screenshots / verification artifacts.

The project intentionally emphasizes reuse and modification by other users / AI coding agents rather than commercial lock-in.

## Capability primitives trained

- self-originated user-problem discovery;
- product constraint / non-goal definition;
- latency-first UX;
- privacy-by-architecture;
- architecture trade-offs;
- AI-assisted implementation management;
- QA / acceptance criteria;
- reproducibility / release discipline;
- product documentation for reuse.

## Transferability

Strong evidence for:
- product management;
- AI-native product work;
- developer tools / utility products;
- consumer software;
- roles that value sharp scope control rather than feature accumulation.

The strongest story is:
**felt a real recurring pain → defined a very small product → set unusually strict latency / privacy boundaries → used AI as implementation workforce → verified the artifact rigorously enough to publish and reuse.**
