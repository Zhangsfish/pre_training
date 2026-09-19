# Experience: QQ 灵犀 — AI Native 智能连接平台

> Status: resume-usable project record.
> Source: public `Zhangsfish/qq-lingxi-agent-platform` repository + user narrative.

## Competition context

- Competition: **腾讯 PCG 校园 AI 产品创意大赛**
- Result: **进入复赛**
- Human team size: **1**
- Working model: **user + ChatGPT Plus / Codex**
- No human teammate contribution reported.

Do not state a more specific ranking / shortlist percentage unless later verified.

## Ownership model

The user confirms the product was conceived and driven entirely by the user, with ChatGPT Plus / Codex acting as the implementation partner.

### User-owned
- product problem / thesis;
- product definition and system logic;
- product architecture / workflow decisions;
- iterative requirements;
- agent roles / interaction logic at the product level;
- review / acceptance of implementation;
- competition submission direction.

### AI / Codex-owned execution
- substantial code generation / implementation;
- engineering execution and iteration;
- implementation reports / technical audits visible in the repository.

Resume rule:
- do not write "independently coded the full-stack product";
- stronger and more accurate framing is:
  **solo product owner who used AI/Codex to turn an idea into a working full-stack demo.**

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

## Why this experience matters

This is the first clearly documented project in the experience bank where the user:
- left the chemistry / biomedical task environment;
- defined an AI-native consumer / social product;
- used AI not just as a helper, but as the primary execution workforce;
- retained product judgment, architecture, prioritization, and QA.

This is a major transition point from:
**personally executing most work**
to
**defining work, delegating to AI, reviewing output, and iterating the specification.**

## AI-collaboration behavior

User self-description:
- when AI output is poor, the default reaction is not frustration with the model;
- the user first asks whether the prompt, decomposition, constraints, context, or acceptance criteria were underspecified;
- then rewrites the task structure and reruns.

Do not write this literally as a resume bullet.

Interpretation:
- strong fit for iterative human-AI collaboration;
- specification / prompt refinement;
- treating model failure as feedback on task definition;
- emotional stability in repeated AI iteration.

Potential interview phrasing:
**"I treat bad model output as a debugging signal for my specification before blaming the tool."**

## Capability primitives trained

- AI-native product conception;
- solo product ownership;
- turning an abstract social problem into an agent workflow;
- product architecture;
- user-model / preference representation;
- recommendation / matching product thinking;
- AI-assisted full-stack prototyping;
- requirements decomposition;
- output QA / acceptance testing;
- iterative prompt / specification refinement;
- competition pitching / iteration.

## Resume usefulness

### High value for
- AI product;
- product manager;
- commercial product / innovation;
- GTM roles that value AI-native execution;
- Tencent / internet / platform roles.

### Moderate value for
- P&G / brand / CMK:
  useful as evidence of consumer-product curiosity and AI-native execution, but likely secondary to stronger consumer / business evidence.

## Claim boundaries

- Do not imply a human engineering team.
- Do not claim all code was hand-written by the user.
- Do not state a competition ranking beyond "entered the second round" without evidence.
- Do not inflate mock data into real QQ user data.
