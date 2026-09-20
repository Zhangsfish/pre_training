# AGENTS — pre_training

本仓库服务张朔的中国校招：**一个稳定个人网站，多份按岗位选材的简历**。先读 `START_HERE.md`，再按角色加载；不要全仓无差别灌入上下文。

## 不可静默改变的约束

1. 网站只有一个身份、一个默认项目顺序；不因 JD 改首页、生成企业专属网站或在浏览器里自动改写履历。
2. `PROFILE.md` 与 `experience/*.md` 保存事实；`publication/` 是经审查的公开表达，不是第二套事实源。旧 `CAPABILITIES.md` / `EVIDENCE_MAP.md` 只是索引，不能把推断升级为事实。
3. KIN 首先证明用户的 H1/H2/H3，尤以 H2「父母的普通一天也值得被看见」为中心。爱牵挂是后续竞争检查，不是洞察来源；竞品已有 state 不等于 H2 的关系消费命题被证伪。核心需求仍待现实验证，不能说已经商业成功。
4. SPPS 的整机方案、部件选型、任务指标、模块接口、整机集成和高层控制脚本由用户负责；2 名机械、1 名加工和 1 名电控协作者按用户下发的动作、参数、接口与交付标准完成结构细化、定制加工和低层驱动。不把用户降格写成普通协调者，也不写其独立完成全部 CAD 与底层驱动。PET 外部医院关系由导师建立，大设备已有，用户补齐的是耗材与操作体系；同伴各有 ownership，不写管理三人团队。JMC：一作稿件已交导师、准备投稿，不能写已投/在审/录用。专利正式申请与顺位未知。
5. AI 可以从问题定义阶段就参与共思考。既不抹去用户判断，也不把 AI/同伴执行冒充用户逐行编写或独立完成所有实验。
6. QQ 灵犀及两个 Notion 课程主页必须是可见、可点的真实链接，地址唯一来源 `site/LINKS.json`。不得编造 Demo 域名、登录凭证或线上可用状态。
7. Selection Dictionary、8 粉丝公众号、冗长旁听清单默认不进入网站/简历。旁听不是正式第二学位/MBA；保存的作业文件不证明做过作业。
8. 公开仓库不是私人笔记本。不得加入敏感人物、对导师/机构的负面动机描述、未公开研究细节或原始保密媒体。目录叫 private、不进 sitemap、noindex 都不产生访问控制。
9. 只执行 `delivery/STATE.json` 当前授权的一轮。实施者提交报告，不得自签验收、自行修改总架构/授权状态或进入下一轮。
10. 不部署、不买域名、不改 DNS、不启用付费/采集服务，直到单独获得发布授权。

## 分工

- 策划/审查者：维护架构、事实纠偏、公开内容许可、轮次提示词、`delivery/reviews/`、STATE；审阅代码/实际截图/测试证据后裁决。
- Codex：在该轮分支实施、测试、提交 `REPORT.md` 和实际证据；依据返工单修复。
- 用户：不重复讲经历；仅在确需主观选择、保密确认或发布授权时决定。

实施分支为 `codex/R01` 等；不得改其他项目仓库。遇到用户更正事实，提报具体冲突，交审查者先改事实层；不要用文案掩盖。规则的目的为防止事实漂移，不是生产更多文书。每轮只有一个报告入口、一包实际证据和一份审查裁决。


## R07 current user override — 2026-09-20
The user explicitly requested a media-first redesign and publication in the current Work conversation. The old text-only visual freeze and R06 round lock are superseded for this scoped change. Homepage public copy comes from publication/gallery.json; project fact records and résumé are preserved. Selected derivatives are authorized; original masters stay excluded. New local media interaction JavaScript is permitted, with a hash-based output allowlist and no analytics. Existing Vercel/free-only/no-DNS scope applies.
