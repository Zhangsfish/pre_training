# Technical Decision — Personal Homepage

## Decision

Build a **static Astro site** with minimal client-side JavaScript.

Primary deployment target for China recruiting:
**Tencent EdgeOne Pages / equivalent EdgeOne static hosting with Git integration**, subject to deployment-time account / region / domain confirmation.

Do not deploy externally without explicit user confirmation.

## Why static

Requirements are:
- public content;
- mostly stable project cases;
- local images / video;
- outbound links;
- resume download;
- email contact.

There is no current requirement for:
- accounts;
- database;
- personalized content;
- authenticated workflow;
- server-side business logic.

Dynamic application complexity is not earned.

## Why Astro instead of one giant HTML file

A single-file site is excellent for a tiny resume page, but this site has:
- four substantive cases;
- reusable project-card structure;
- project detail pages;
- media;
- future resume / status updates.

Astro gives static output while preserving a clean content / component boundary.

Recommended structure:

```text
site/
  src/
    components/
    layouts/
    pages/
      index.astro
      work/
        spps.astro
        kin.astro
        qq-lingxi.astro
        pap-pet.astro
    content/
      work/
  public/
    media/
    resume/
  astro.config.mjs
  package.json
```

Use content collections only if repeated case metadata benefits from schema validation; do not add a CMS.

## Runtime policy

Default target:
- pre-rendered HTML;
- CSS;
- minimal JS only for genuinely useful interaction;
- no React unless a specific interactive module earns it.

Avoid:
- heavy animation libraries;
- client-side routing for static pages;
- third-party analytics in v1;
- external runtime APIs;
- chat widget;
- remote font dependency.

## China-first delivery

Reasoning:
- target recruiting market is primarily China;
- candidate sites must load reliably when a recruiter clicks once;
- Vercel itself documents possible degraded performance / connectivity from mainland China;
- EdgeOne supports static sites / static generators and Git-based deployment.

Deployment-time decisions still required:
- China vs global acceleration region;
- custom domain;
- whether ICP filing is needed for the chosen region / domain path.

For local / review builds, deployment is not required.

## Typography

Prefer high-quality system / locally available CJK stacks rather than Google Fonts.

Goal:
- no blocked font dependency;
- fast first render;
- predictable Chinese typography.

Use typography, spacing, images and editorial composition—not external font novelty—as the visual signature.

## Media

### SPPS
- compress hero image to responsive WebP / AVIF where practical;
- create a video poster;
- transcode operating video to web-friendly MP4 (H.264/AAC) and optionally WebM;
- do not autoplay with sound;
- provide controls / reduced-motion-safe fallback.

### KIN
Prefer linking / embedding static screenshots from the finished case rather than duplicating its entire interactive app inside this site.

### QQ Lingxi
Use one or two screenshots + link to public repository / demo.

### PAP/PET
Use a safe schematic / generic high-level visual only if publication / patent constraints allow it.

## SEO / sharing

v1 should include:
- semantic HTML;
- title / description;
- canonical URL after domain exists;
- Open Graph metadata;
- favicon;
- sitemap;
- robots.txt;
- JSON-LD Person + WebSite schema.

`llms.txt` may be added as an experimental discoverability aid, but should not be treated as a guaranteed AI-search ranking mechanism.

## Privacy / security

- no API keys;
- no private repo tokens;
- no unpublished confidential documents in `public/`;
- no hidden personal identifiers beyond intentionally public resume contact info;
- inspect all media metadata / visible labels before publishing.

## Accessibility / QA

Required viewport checks:
- ~375 px mobile
- ~768 px tablet
- ~1440 px desktop

Required checks:
- no horizontal overflow;
- visible focus;
- keyboard navigation;
- reduced-motion support;
- semantic headings;
- alt text;
- video controls;
- link correctness;
- readable Chinese line length;
- image / video lazy loading where appropriate.

## Build gate

Before deployment:
1. content review;
2. ownership / confidentiality audit;
3. rendered screenshots at three viewport classes;
4. link / media checks;
5. local production build;
6. only then ask user for deployment approval.
