# 个人主页更新交接

> 给接手的 Codex：先读本文，再读根目录 `AGENTS.md` 和与改动相关的源文件。用户可以按 [材料模板](SUBMISSION_TEMPLATE.md) 提交新项目或状态更新；模板是供整理信息的 Markdown，不会自动进入网站。不要要求用户重新讲已有项目。

**站点**：[中文](https://zhang-shuo-portfolio.vercel.app/) · [English](https://zhang-shuo-portfolio.vercel.app/en/)　**仓库**：`Zhangsfish/pre_training`，默认分支 `main`。本说明核对截至 **2026-10-16**；上游 App 状态、外链可达性和线上版本都要在下次更新时重查。

## 1. 这个主页现在有什么

保持一个身份、一套页面框架、对应的中英文入口；首页次序由现有代码与公开稿决定，不为不同职位生成另一套主页。

| 首页区域 | 当前内容 | 数据入口 |
| --- | --- | --- |
| 开场与个人表达 | 张朔、关注的问题及工作方式 | `publication/home.json`、`publication/profile.json`；英文见 `publication/en/home.md`、`profile.md` |
| 两款 App | Lecture Asset、Everwhile；各有中英文宣传截图。Lecture 影片随页面语言选择中/英文；Everwhile 只有英文影片，中文页有说明 | `publication/apps-showcase.json`、`publication/en/apps-showcase.md`、`site/public/media/` |
| 三项主作品 | QQ 灵犀、SPPS 流动化学自动多肽合成平台、KIN；首页有画面/影片，详情页有过程与边界 | `publication/gallery.json`、`publication/en/gallery.md`、`publication/projects/{qq-lingxi,spps,kin}.md` 和英文对应文件 |
| 补充经历 | 教学协作、PET、天然产物；有中英文详情 | `publication/home.json` 的 `more_projects`、`publication/projects/{teaching,pet,natural-product}.md` 和英文对应文件 |
| 简历与联系 | `/resume/`、`/en/resume/`，当前下载的是**中文 PDF**；联系及外链 | `resume/variants/general-zh.json`、`publication/resume-manifest.json`、`publication/en/resume.md`、`site/LINKS.json` |

详情路由当前是六对：`/work/{kin,spps,qq-lingxi,pet,teaching,natural-product}/` 与 `/en/work/.../`。`site/scripts/audit-dist.mjs` 明列了这些页面；新增第七个案例不能只复制一份 Markdown 就声称已上线。两款 App 目前是首页模块，**没有独立 `/work/` 路由**。早期 `site/CONTENT_ARCHITECTURE.md` 与 `delivery/STATE.json` 记载 R01–R07 的历史设计，不代表当前首页清单。

## 2. 一份更新材料怎样进入网站

1. **收材料并定范围。** 用 [模板](SUBMISSION_TEMPLATE.md) 记录是“已有项目改动”还是“新增项目”，目标页面位置、最新状态与日期、本人/他人/AI 的贡献、可公开证据、链接、中文与英文媒体。空缺记“未知”；有保密内容时只在受控工作区审阅，公开仓库只提交批准公开的版本。
2. **核对事实层。** `PROFILE.md` 与 `experience/*.md` 保存事实；`publication/claims.json` 记录可复用 claim、来源 Git blob SHA、确信度、公开状态和适用范围。更新成果/数字/顺位时，先处理事实和 claim，再写网页。当前 `publication/` 是经过审查的表达，不可凭新宣传语倒填事实。旧 PET 页面被 `delivery/maintenance/english-portfolio/pet-public-copy-freeze.json` 精确冻结为用户选定的旧公开口径；改它需用户明确选择新公开说法，再同步相关校验。
3. **更新中文公开稿。** 首页短文案在 `publication/home.json`；带影片的主画廊在 `publication/gallery.json`；App 区在 `publication/apps-showcase.json`；六篇详情在 `publication/projects/*.md`（JSON frontmatter + Markdown 正文）。外链只改 `site/LINKS.json`；获准公开的媒体存 `site/public/media/` 并登记 `site/assets-manifest.json` 的路径、SHA-256 与授权状态。不得把原片、内部评审或凭证放进公开仓库。
4. **逐项维护英文。** `publication/en/` 有 12 份独立译稿：主页、profile、gallery、apps、resume、UI 和六篇详情。其中 11 份内容稿记录中文 `source_path` 与按 LF 规范化后的 `source_sha256`；`ui.md` 列出界面源文件路径。中文内容源文件改动后，核对并更新对应英文稿及哈希。`site/scripts/english.mjs` 会在构建时拒绝旧哈希；正文分节数量也必须与中文一致。英文稿应做原意、事实边界与自然表达复核；中文新增的媒体字幕/标签也要有英文对应。当前网页共用组件，`site/src/components/` 和 `site/src/pages/en/` 是实现层。
5. **校验与交付。** 在新分支保留原有工作区改动，提交源文件、必要的公开媒体、说明本次变更及测试结果的报告，向 `main` 建 PR。先验证本地中英文页面与媒体，再由用户明确授权该次生产发布；发布后验证匿名访问、路由状态和构建文件。PR 合并不等于正式域名自动更新：2026-10-08 使用 Vercel Build Output API 手动部署并 promotion，见 [首次英文版发布记录](RELEASE_2026-10-08.md)。

### 本地常用验收

已有项目依赖见 `site/package-lock.json`；先检查现成环境，不要静默安装新工具。从仓库根运行，避免并发构建同一 `site/dist`：

```sh
npm --prefix site run check
npm --prefix site test
npm --prefix site run test:jd
npm --prefix site run build
npm --prefix site run test:locale
npm --prefix site run test:gallery
```

`test:locale` 和 `test:gallery` 需要可用的 Playwright 与 Chrome；Windows 本机已有运行时路径见 `site/README.md` 或当前环境。`build` 内含公开输出白名单审计，也可单独运行 `npm --prefix site run audit:dist`。若这次改了公开 PDF，按 `resume/README.md` 另做生成、manifest/hash 和下载检查。只改文档时不必重建网站。

## 3. 新项目放在哪里

优先把新材料纳入**现有模块**，保持版式与交互不变：主视觉作品用已有画廊样式，补充经历用文字详情样式，独立 App 用现有 App 区样式。新增项目仍需先确定它是首页主展示、补充经历还是 App；不要把模板里的建议位置当成用户已经批准的排序。

现有实现有显式清单：`site/scripts/content.mjs` 的 `projectOrder` / `supplementaryIds`，`publication/home.json` 的顺序，`site/scripts/audit-dist.mjs` 的路由与输出白名单，相关页面生成代码和导航。新案例还要有中英文详情、关联 claim、必要链接/媒体登记及对应测试。若仅更新已有案例，通常无需动路由和总体样式。**没有自动“把模板文件放入目录就生成项目”的功能。**

## 4. 已完成的几轮主页工作与别踩的坑

- R01–R06 建立事实→公开稿→静态网站/简历与首次发布；R07 改成真实媒体主导的画廊。历史记录在 `delivery/audits/R*/REPORT.md`。
- 后续维护对齐了经历和主页，加入补充案例；独立 App 展示与紧凑响应式布局见 `delivery/maintenance/independent-apps/REPORT.md`；英文版与原生语言媒体见 `delivery/maintenance/english-portfolio/REPORT.md` 和 [PR #28](https://github.com/Zhangsfish/pre_training/pull/28)。
- 2026-10-08 已验证中文 `/`、英文 `/en/`、六对详情、两语 404、媒体和简历；线上 64/64 个资源与构建匹配。证据摘要在 [发布记录](RELEASE_2026-10-08.md)。这是有日期的快照，不能替代新版本验收。
- 截至那次发布，KIN 仓库链接匿名访问返回 404，但 KIN 演示可用；两款 App 尚未证实公开下载；英文页的 PDF 按钮明确标为中文。复核后才能更新这些说法。不要把 PET 旧公开稿自动替换为后来研究状态，也不要将待验证数字写成成果。

## 给另一个对话的直接提示

> 请阅读 GitHub 仓库 `Zhangsfish/pre_training` 默认分支的 `delivery/maintenance/portfolio-update-handoff/README.md`、`SUBMISSION_TEMPLATE.md` 与根 `AGENTS.md`。我会给你一份按模板整理的材料。保持现有主页框架与中英文对应，核对事实和公开许可，实施、测试并在 GitHub 提交可审查的改动；若我明确要求上线，再完成生产部署与匿名访问验证。不要凭旧 R01–R07 状态判断网站尚未发布。

