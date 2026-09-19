# Experience: Selection Dictionary — AI chat pages low-latency local dictionary

> Status: **archive-only / excluded from default resume and homepage by user decision.**
> Source: public `Zhangsfish/selection-dictionary` repository.

## User decision

The user considers this project a useful personal tool / toy rather than a strong enough career signal for the current job search.

Therefore:
- do **not** place it in the default one-page resume;
- do **not** place it in the default personal homepage project set;
- retain the record only as backup evidence of product scope control / AI-assisted execution;
- surface it only if a future JD specifically makes a small self-originated utility materially relevant.

## Product

A Chrome extension for people reading mixed Chinese / English responses on ChatGPT, Claude and Gemini.

Core interaction:
- double-click / select a word or text;
- immediately show Chinese meaning and phonetic notation for words;
- click to hear English pronunciation;
- use Chrome's on-device Translator API for phrases / sentences / paragraphs.

Product priority:
**latency > interaction friction > reliability > common-word accuracy > visual simplicity > advanced features.**

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

## Evidence

The repository records:
- strict typecheck + build pass;
- 17 unit tests;
- 21 browser checks;
- reproducibility / packaging evidence;
- local-first runtime design.

These remain useful backup evidence but should not displace stronger projects.
