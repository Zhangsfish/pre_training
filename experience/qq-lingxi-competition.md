# Experience: QQ 灵犀 — AI Native 智能连接平台

> Status: draft. Product / implementation repository has been reviewed; personal ownership and competition facts require user clarification before resume use.
> Source: public `Zhangsfish/qq-lingxi-agent-platform` repository + user narrative.

## User-reported context

- Project was built for a Tencent competition.
- Team / project reached the second round (复赛).
- Exact competition name, dates, team composition, judging result, and personal role: TODO.

## Product thesis visible in repository

QQ 灵犀 is positioned as an AI-native intelligent connection layer for the QQ ecosystem:

```text
understand who the user is
+ understand what the user currently wants
→ match suitable content / people / QQ groups / communities
→ use Agent-to-Agent negotiation to reduce judgment and social-friction costs
```

The product distinguishes:
- long-term personality / preference profile;
- current need profile;
- content / person / group matching;
- A-to-A negotiation;
- privacy / authorization boundaries.

A later framing uses QQ-MBTI / 灵犀人格 as a shareable cold-start mechanism for a longer-term user model.

## Implemented demo visible in repository

The public repository documents a real working product rather than a slide-only concept.

Implemented modules include:
- multiple role-specific Agents;
- structured user profile extraction;
- group matching;
- people matching;
- content / "群域" recommendation;
- Agent-to-Agent negotiation;
- routing intent;
- UI panels;
- SiliconFlow / DeepSeek model integration;
- data schemas and validation;
- Vercel deployment preparation.

Repository data examples include:
- 96 group profiles;
- 192 content items;
- 64 people profiles;
- 8 scenes.

Step reports document API / local test passes for these modules.

## Current ownership boundary

DO NOT yet claim the user personally coded / designed every module.

Need to separate:
- original product insight / thesis;
- product architecture / requirements;
- prompt / agent design;
- data / evaluation design;
- AI / Codex implementation;
- teammates' work;
- competition submission / presentation.

This distinction is essential because the repository contains extensive implementation and AI-generated engineering reports.

## Potential training signals

Pending ownership confirmation:
- AI-native product conception;
- turning an abstract social problem into an agent workflow;
- product architecture;
- user-model / preference representation;
- recommendation / matching product thinking;
- rapid AI-assisted prototyping;
- competition pitching / iteration;
- first serious product work outside chemistry / biomedical research.

## Open questions

1. Exact Tencent competition name and date?
2. Team size and team members' roles?
3. What was the initial idea and who proposed it?
4. What parts did the user personally define / decide?
5. What parts were built by AI / Codex, and what parts by teammates?
6. What was submitted in the preliminary round, and what changed for the second round?
7. What feedback did judges / Tencent mentors give?
8. What exactly does "进复赛" mean (ranking / shortlist size / stage)?
9. Was there a deployed public demo during judging?
10. Did this project change the user's career direction or confidence about product / AI-native work?

## Claim boundaries

Until Q&A is complete:
- claim only that a working public demo repository exists;
- do not attribute all code or product decisions solely to the user;
- do not state a competition ranking beyond "entered the second round" without evidence.
