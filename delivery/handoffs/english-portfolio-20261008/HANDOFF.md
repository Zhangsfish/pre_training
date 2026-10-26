# 张朔个人主页英文版交接

核对日期：2026-10-08（北京时间）。本次只制作交接，没有实施英文站或发布。

## 1. 任务背景与授权边界

用户想在现有个人主页加入中文 / English 入口，并基于当前结构做专门的英文版；准备在另一段对话推进。目的不是新建第二个品牌网站、重新设计视觉或重新采访经历。

已确定背景：中文主页、六段经历、已确认的公开表达和简历边界是基础。英文要自然、可读，保留事实、数字口径和 ownership（本人/协作者/AI 各自贡献）。不要直译出冗长、夸大的求职套话。

建议方案：中文留在 `/`，英文放 `/en/`，共用组件、CSS 和媒体。这是本交接的工程建议；完整翻译范围、英文 PDF、合并及英文生产发布尚需接手对话取得对应明确授权。当前请求只授权交接文档。不要把历史中文站发布许可视为未审英文稿的自动发布许可。

仓库旧轮次 R01–R07 已结束；STATE 不是最新维护任务的完整流水账。本交接不新增轮次、不修改 STATE 授权、不自签 ACCEPT。新的用户明确指令优先于旧维护冻结，但不能由实施者自行扩大范围。

## 2. 最新基线：不要从旧工作区接错

| 项目 | 本次核对结果 |
|---|---|
| GitHub | [Zhangsfish/pre_training](https://github.com/Zhangsfish/pre_training) |
| 默认分支 | `main` |
| 实时 fetch 后 main | `b43128fdbdedb3b54e0e3ea0da9046bf4d154e70` |
| 两款 App 展示 PR | [#26](https://github.com/Zhangsfish/pre_training/pull/26)，已于 2026-10-07 合并 |
| PR 原分支 / HEAD | `maintenance/independent-apps-showcase` / `185eff99f56673fb306beaad8f6cec70703cff29` |
| 中文正式站 | [zhang-shuo-portfolio.vercel.app](https://zhang-shuo-portfolio.vercel.app/) |
| 最近已核验部署 | `dpl_Cgrah1FZN6AwbCSKJr5cYd1vTazh` |
| 该部署源码 | `f7e2d6b8538b6e7b3b861278a19f89d734513ad6` |
| 不可变部署地址 | [7ifrljhum 部署](https://zhang-shuo-portfolio-7ifrljhum-zhangsfishs-projects.vercel.app/) |

PR 合并后，main 的站点/公开内容/锁定 variants 与已部署版本一致；main 同时带入了更新的 PET 事实文件，形成下节的来源校验问题。**合并 commit 与部署源码 commit 不同；不能声称已从合并后的 main 完成新构建。**

历史线上验收为 2026-10-07 23:26：45/45 文件字节数、SHA-256 与审计 dist 一致；匿名浏览器 375/1366 路由与交互通过，八种宽度布局通过。这些是历史证据，不是英文版或接手当日的新验收。

旧 `delivery/maintenance/independent-apps/REPORT.md`、attempt-03/evidence.json 记载“PR 未合并”，是提交时的历史快照。本次已通过 GitHub connector 重新确认 merged=true，不要据旧快照重复实施或合并。

本机 `E:/myself/pre_training` 还停在旧 `codex/R04`，不能当最新代码。`E:/myself/pre_training-apps` 是此前维护工作区，保留它。用 `git worktree list` 看完整列表，再从实时 `origin/main` 新建工作区。交接文档独立工作区为 `E:/myself/pre_training-english-handoff`，分支 `docs/english-portfolio-handoff`，不是英文实施分支。

## 3. 首先处理的已有基线问题

main 在 2026-10-07 更新 `experience/pku-pap-pet-project.md`：用户将一作稿件状态更新为“在投”；确切投稿系统状态未独立核实，人体伦理仍在准备申报。这比旧“准备投稿 / 拟投 JMC”母稿新。

`publication/claims.json` 的九条 PET claim 仍引用旧 source_blob_sha。本次对干净 main 执行 `node site/scripts/validate-content.mjs`，实际输出九条 drift warning 后 PASS；**这个命令会打印 warning 而不拒绝，不能据此宣称生产可构建。** 随后的 `node site/scripts/build.mjs production` 在简历模型的 zero-warning 门禁拒绝来源漂移，见本目录 `baseline-build-check.log`。

接手应先重现并审阅：新旧事实 diff、每条 claim 内容、来源段落、公开文案与 locked resume 的依赖。需要新的事实/公开状态审查时，把具体差异交给用户或审查者；不要再次采访整个经历。仅机械替换 SHA 无法证明文案仍准确；回退新事实、删测试、放宽 source-drift 或重新生成锁定 PDF 都不是修复。

历史分析：`delivery/maintenance/independent-apps/attempt-02/upstream-main-build-drift.log`、`upstream-main-jd-drift.log`。本交接不修复此问题，不宣称最新 main 的整套测试已通过。

## 4. 先读哪些文件

按需要加载，不必把全仓和原片灌入上下文。

| 用途 | 入口 |
|---|---|
| 总规则和历史轮次 | `AGENTS.md`、`START_HERE.md`、`delivery/STATE.json` |
| 工程/公开边界 | `site/AGENTS.md`、`publication/AGENTS.md`、`site/CONTENT_CONTRACT.md`、`site/MEDIA_POLICY.md` |
| 最近已确认展示及截图 | `delivery/maintenance/independent-apps/REPORT.md` 的 Attempt 03、`attempt-03/evidence.json` 与 screenshots |
| 原始事实 | `PROFILE.md`、相关 `experience/*.md`；优先核对最新更正 |
| 确认长稿及语气 | `skills/zhang-shuo-experience-writing/SKILL.md`、references 下 approved 各项目 long-form / resume-brm |
| 两款 App 新状态 | references 下 `approved-independent-apps-progress-20261007.md`、`approved-lecture-asset-resume.md`、`approved-everwhile-resume.md` |
| 公开网页文案 | `publication/home.json`、`gallery.json`、`apps-showcase.json`、`projects/*.md`、`profile.json`、`claims.json` |
| 外链唯一登记 | `site/LINKS.json` |
| 媒体来源与公开 hash | `site/assets-manifest.json`、`site/SPPS_ASSETS.md`、最新 maintenance media-provenance 与 dist-manifest |
| 锁定中文 PDF | `publication/resume-manifest.json`、`site/public/downloads/zhang-shuo-resume.pdf` |
| 新确认的特定简历组装 | `resume/assembly-guides/general-product-apps-20261007/README.md`、selected_projects.json；不自动替换网站 PDF |

## 5. 当前页面与不可回退的展示

当前 9 个静态页面：`/`、`/resume/`、`/404.html`，以及 `/work/kin/`、`/work/spps/`、`/work/qq-lingxi/`、`/work/pet/`、`/work/natural-product/`、`/work/teaching/`。

首页先展示 Lecture Asset 和 Everwhile：宽屏同排，空间不足自动换成上下两排；每个项目都有影片和可翻页/放大的宣传截图。之后保持 **QQ → SPPS → KIN**；关于、教学、PET、全合成、联系与简历入口可到达。不要重新塞入完整简历。

- Lecture 默认中文影片，支持 English 切换；换语言停止并重置，不自动播放。两版都是 20.4 秒节选，排除了未经核实的 App Store 下载/二维码片尾，不可改回完整版。
- Everwhile 用完整 18 秒英文影片。目前已接受的截图仍为中文；不伪造英文产品截图。可在英文说明中明确截图语言；如另用上游真实英文素材，要单独核对来源、许可、hash 与适用版本。
- 两款 App 公开下载尚未核实；上架状态在接手时重查，不编造 App Store 链接或已上线/用户数。用户已要求删除推广计划/宣传构想，英文不得恢复。
- Lecture 的回应是按拍摄时间导出供人阅读的 PDF 和交给外部 AI 的 ZIP（OCR 索引、AI 阅读说明、JPG）；**不说 App 自己生成 AI 总结**，保存资料后才清理相册。
- Everwhile 的场景是在刷视频、看小说时感知时间正在流逝；温和提醒和 Today 回看，继续/暂停/离开由用户决定，不改成强制阻断或自律评分。
- KIN 市场判断与长期方向默认展开。当前 QQ Demo 的 Basic Auth 和“需访问权限”文案已删除；不能从旧 README 恢复它。外部服务是否可访问须当时匿名复核。

只改 `pre_training`。`/work/kin/` 是个人主页下游案例页，不等于 KIN 独立产品；不要进入 KIN、QQ、Lecture Asset 或 Elapse 源仓库改代码。Everwhile 上游仓库名称是 **Elapse**，不叫 Everwhile；现有媒体已在本站登记，无需为了翻译重复下载原片。

## 6. 翻译时的事实与 ownership 红线

| 项目 | 必须守住的口径 |
|---|---|
| KIN | 未接电话、父母普通一天值得被看见、Now / Today / Data、状态消费、家庭注意力入口和 AI 时代流量判断。核心需求仍待真实验证。Gen 1 约2.85亿分析基准×10%=约2850万 DAU；米家约1.17亿 MAU 只作量级参照。Gen 1 不出现25%/50%/7130万/1.43亿；长期约5亿与10%/25%/50%情景独立，均不是实际采用量。 |
| SPPS | 本人整机方案、部件选型、参数/功能/控制要求、集成和高层脚本；机械/加工/电控协作者配套交付，不冒充本人完成全部 CAD/底层驱动。不写本人定义具体“部件接口/模块接口”。约150万元为资源管理规模；约88%只指近同规格 FEP 管单项价格；约97%只指单次偶联操作用时。 |
| QQ 灵犀 | 约10天、初赛和复赛两轮集中迭代；对外称 ChatGPT，不称 Codex。本人定义需求/判断，不把 AI 的代码实现冒充本人逐行手写。 |
| 全合成 | 2022.09–2023.11；约100 g仅为路线前两步中间体。技术判断扩展到复现、放大、持续供料；重新设计路线成为后续集群式合成基础。核心约5人，累计约10名本科生。 |
| PET | 2025.08–2026.07；已有大设备，从缺耗材/操作体系的0.5补到1。AI逐项教会陌生知识，再用文献和实验判断；先想清楚、连续低成本 MVP，不写“一次成功/一次完成正式实验”。医院关系由导师建立，不冒充本人管理同伴三人团队。核素源文本普通 `68Ga`，HTML 用 `<sup>68</sup>Ga`，不使用 `⁶⁸Ga` 或 `^68Ga`。半衰期约68分钟；约4小时是有效数据工作窗口，不是放射性归零；单次生物分布约4,000元人民币。论文与伦理状态见第3节，不能写已录用/发表/伦理批准；预计2项专利不等于已申请或授权。 |
| 教学 | 中文标题保持《有机化学实验 II》｜从课程重构到独立运行；19名核心学生、5名助教、约8个实验、3条并行流程、91个样品瓶、教材书稿，第四学期继任助教独立运行并完成传承。英文译名不提升为正式额外学位/职务。 |

英译数值注意人民币单位：150万元为 RMB 1.5 million；“约”仍保留 approximately/about。MAU 与 DAU 不改成同口径比较；分析情景、预期、初稿、用户自述与独立验证须保持区别。已确认项目名/机构英文名优先使用 PROFILE 与公开数据，不自行创造职称、学位或期刊状态。

不公开研究结构、原始科研数据、私人经历、密钥或新联系方式。非简历页不能引入只允许在简历公开的电话/出生信息。公开仓库里“private”目录和 noindex 都不构成访问控制。

## 7. 推荐的英文工程方案

**路由独立，渲染共用。** `/` 保持中文；建议 `/en/`、`/en/work/<same-id>/`、`/en/resume/`。当前六案例、首页与简历网页导航都覆盖，否则切换后容易掉回中文。英文 404 显示及真实 HTTP 404 的路由规则需要在实施时一并设计。

语言入口用真实 `<a>`，桌面和手机都可见；在同一案例间切换，而不是所有切换都返回首页。默认不强制按地区/浏览器语言跳转，不依赖 JS 翻译，不调用运行时翻译 API。锚点可以保留 work/about/contact ID，href 指向对应语言首页。

建议新增有版本记录的英文公开文案与 UI 字典，例如 `publication/en/`；这是拟定目录，不是现有文件。给翻译记录中文来源和审核状态，仍从同一事实层选材。不能把本任务的翻译审批伪装成旧 R01 的 approved。共用同一媒体路径，不重复复制大视频，也不建立一套不同经历/排序的英文事实。

主要工程点：

- `site/src/layouts/BaseLayout.astro` 当前硬编码 zh-CN、zh_CN、中文导航/skip/footer、`/` 首页判断和 `/#...` 链接。应加入 locale 与对应路由，而不是仅复制首页。
- `site/src/lib/site.ts`、types、content collections 和 `site/scripts/content.mjs` 决定数据装配与白名单；根据需要扩展 locale，同时保护旧中文输出。
- `site/src/pages/index.astro`、`work/*.astro`、`resume/index.astro`、404 需复用渲染逻辑；避免复制整套页面造成以后中文修复不同步。
- `AppFilm.astro`、`AppCarousel.astro`、`MediaExperience.astro`、`GalleryRuntime.astro` 与 `site/src/scripts/gallery.ts` 有中文 aria、计数器、弹窗、影片标签。完整翻译可见文字及辅助功能文字。影片自身语言选择与网站语言不是同一个状态。
- `tokens.css`、`global.css`、`gallery.css` 保持现有方向。英文更长，检查折行、宽度和中文字距规则，不靠缩小到难读字体解决。
- 增加正确 `lang="en"`、英文 title/description/og:locale、语言对应 canonical、hreflang、sitemap；公开字段审计与路由/文案测试必须真实覆盖英文。

现有技术是 Astro 静态站，无需迁移 React、增加后端、数据库、analytics 或付费翻译服务。共享静态资源后通常不会破坏中文页，但必须用双语回归证据验证，不能承诺零风险。

## 8. 简历独立边界

现有公开文件只允许通用中文 PDF：`/downloads/zhang-shuo-resume.pdf`。

SHA-256：`6ffad2b816e42127769360cac709ad037db7a9699f53ffad6b584bb6daaa1abf`。

不运行旧脚本覆盖 PDF，不改锁定 bullets、项目顺序或 `resume/variants/*.json` 来适配英文网页；不把四份内部简历全放进 dist。2026-10-07 新简历组装指南是特定新版本，不自动替换网站公开 PDF。

英文 `/en/resume/` 可按获准范围翻译网页骨架；若仍提供现有 PDF，必须标明 **Chinese résumé (PDF)**。不要用“English résumé”按钮下载中文 PDF。英文 PDF 的译稿、选材、打印、嵌入字体、页面/链接和公开许可需要另行确定。

## 9. GitHub 与本机使用方式

从当前已验证仓库运行以下命令；英文分支名/路径是建议，若已存在先检查并复用，不覆盖：

```powershell
git -C E:/myself/pre_training-apps status --short
git -C E:/myself/pre_training-apps remote -v
git -C E:/myself/pre_training-apps fetch origin
git -C E:/myself/pre_training-apps log -1 origin/main
git -C E:/myself/pre_training-apps worktree list
git -C E:/myself/pre_training-apps worktree add -b maintenance/english-portfolio E:/myself/pre_training-en origin/main
```

本次初次 fetch 因旧代理 `127.0.0.1:7890` 不在线失败；单次 `git -c http.proxy= -c https.proxy= fetch origin` 成功。不全局更改用户代理，不假装 fetch 失败后的缓存是最新 main。新电脑可正常 `git clone https://github.com/Zhangsfish/pre_training.git` 后建分支。

Git 身份/认证复用现有登录和 Git Credential Manager。不要读取、输出或提交 token、恢复码、密码、个人浏览器 profile。`gh` 此前未安装，不假设可用；可用 GitHub connector 创建/读取 PR，或在网页创建。工具名字按实际可用能力发现，不调用安全扫描专用工具替代普通 GitHub 操作。

实现放独立分支，证据放 `delivery/maintenance/english-portfolio/attempt-01/` 等新目录，建局部 AGENTS 记录文件用途。只 stage 相关文件，先 `git diff` / `git diff --cached`，不 `git add .` 夹带无关修改。禁止 reset --hard、force push、覆盖用户工作。不要提交 node_modules、dist、.env、.vercel 认证、原始片或未脱敏数据。

确认后正常 commit、`git push -u origin maintenance/english-portfolio`，创建针对 main 的 PR，记录 exact tested_commit、中文/英文变化、真实测试和截图。Codex 创建 PR 后使用 attach_artifact 关联本任务。合并前重新 fetch，审阅新 main diff 并重新测试必要部分；不主动 merge/deploy 未获准的英文稿。

## 10. 构建与验收

复用 `site/package-lock.json`，Node 22.12.x/22 或24.x（package engines），本机已验证 Node24.15.0 / npm11.12.1。Astro7.3.3、TypeScript6.0.3。本项目所需依赖已获自主安装授权，不必重复问普通依赖安装；仍先查已有工具。

在英文工作区根目录运行并逐条检查退出码：

```powershell
npm --prefix site ci
npm --prefix site run check
npm --prefix site test
npm --prefix site run test:jd
npm --prefix site run build
node site/scripts/check-alignment.mjs
npm --prefix site run audit:dist
npm --prefix site run preview -- --port 4321
```

另一个终端运行 `npm --prefix site run test:gallery`，并扩展到双语。既有浏览器脚本支持 PLAYWRIGHT_MODULE、CHROME_EXECUTABLE、PORTFOLIO_URL、GALLERY_EVIDENCE_DIR 等环境变量，先读脚本再配置。本机可复用：

- Playwright：`C:/Users/Zhang S/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright`
- Chrome：`C:/Program Files/Google/Chrome/Application/chrome.exe`

不要误测旧4321服务：核对实际工作区、进程与 dist。Astro preview 曾复用已运行服务而不是请求的新端口，必须确认加载的内容就是当前 tested_commit；不要随便杀个人浏览器或其他项目进程。

旧 `test:e2e` 是 R04 的禁止 img/video/script 合同，与已接受媒体站冲突；它不是当前媒体验收替代品。扩展现行 gallery 与路由测试，必要时合理更新历史测试用途，不删除/放宽断言掩盖失败。`resume/scripts/check.mjs` 在干净工作区可能缺少 Git 忽略的 exports 元数据，不因此重建锁定 PDF。

最少验收：

- 中文原路由、英文所有新路由、语言对应跳转、站内锚点、两个 Notion、QQ repo/Demo、KIN 独立体验、邮件和 PDF；不修改独立项目。
- 320/375/768/1024/1366/1440px，中文和英文无溢出、遮挡、长词撑破、文字过密；首屏能较快看到作品，两个 App 同排/换行正确。
- 键盘、skip link、切换焦点、QQ场景、三组既有视频/新增视频真实加载解码、截图翻页/放大、Esc关闭与焦点恢复、200%缩放、reduced-motion、禁用 JS 下基本阅读/导航。
- HTML lang、canonical/hreflang/og、sitemap、真实404状态；英文没有漏译的导航/aria，保留的中文素材/PDF明确标注。
- 重新审计事实/ownership、dist allowlist、原片排除、隐私、新增英文内容无敏感信息；PDF SHA完全相同，无旧Codex对外称呼或占位文案。
- 构建体积原门限32MiB、客户端JS20KB继续有效；英文共用媒体。上次30,259,269 bytes，余量有限，不能复制一套影片。

截图和日志存新 attempt，不覆盖 R07、home-alignment 或 independent-apps 历史证据。记录失败和限制；不把历史32/32单测、9/9简历测试当作当前main/英文实现结果。

## 11. 获准后沿用的 Vercel 发布方式

只在用户确认本次英文发布后执行。原免费项目：scope `zhangsfishs-projects`，Project ID `prj_CfECSSKoBni34VGDTa89UhKu4n09`，project name `zhang-shuo-portfolio`；原域名不变。不得新建项目/团队/域名、改DNS、认证、账号或付费升级。

此项目最近使用 **静态 Build Output API 的 prebuilt 发布包**，项目 root为`.`；不是默认从 Git 自动部署。不要随便运行 `vercel git connect` 改发布方式。推送/合并 PR 不等于已经发布。

本机曾验证 Vercel CLI59.23.2：`E:/myself/pre_training-r06/delivery/audits/R06/tmp/cli/node_modules/.bin/vercel.cmd`。接手先 whoami 和 inspect/project信息核对，认证是否仍有效以实时结果为准；需要重新设备登录时由用户在 Edge 等浏览器完成，不保存密码/token到交接。

在新 attempt 的 Git忽略 tmp 下创建新 pack；只复制审计通过的 `site/dist` 到 `.vercel/output/static`。`.vercel/project.json` 关联既有 projectId 和 orgId `team_iUtfj6fbX7ntRyux5VD2Req3`，以现有项目实时返回确认。`.vercel/output/config.json` 当前契约：

```json
{"version":3,"routes":[{"handle":"filesystem"},{"src":"/(.*)","status":404,"dest":"/404.html"}]}
```

英文404可能需要增补路由；先测试，不造成未知URL返回200。部署前逐文件hash比较pack与dist，确保无额外文件，再用现有CLI `deploy --prebuilt --prod --scope zhangsfishs-projects --non-interactive --cwd <pack>`，inspect确认READY和原生产域名指向。

若报 `Not authorized: Trying to access resource under scope "zhangsfishs-projects"`，立即停止发布，报告当前账号/scope/project和完整错误，需要重新授权此scope；不另建站点或换账号绕过。

发布后用全新匿名浏览器验收两种语言、桌面/手机、所有详情页、影片、外链、PDF和404；逐文件下载核对字节/hash，确认不是旧缓存。记录 deployed_git_commit、Deployment ID、不可变URL、正式域名、验证时间、结果与截图。**只有正式域名真实验收通过才能说“已上线”。** 未获本次授权时，交付PR和本地/获准预览证据后停止。

## 12. 建议接手节奏

第一步核对新main与来源漂移，确认网页英文范围/PDF边界；第二步先做共用语言入口、首页与一个案例英文样页，给用户看语气和折行，再按获准范围补齐其余页。最终进行双语回归、提交报告与PR；合并、发布按当时授权办理。不要重开用户经历访谈，也不要自动进入其他轮次。

可直接粘贴的启动语见同目录 `START_PROMPT.md`。
