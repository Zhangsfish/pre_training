# START HERE — 唯一工作入口

架构版本：`architecture-v1`，建立日期：2026-09-20。

## 给 Codex 的固定启动语

> 读取 Zhangsfish/pre_training 默认分支的 START_HERE.md 和 AGENTS.md，依据 delivery/STATE.json 只执行当前授权轮次。读取该轮提示词及其列出的必要文件，在该轮分支实施并提交代码、REPORT.md 和实际测试/截图证据，创建 PR 后停止。已有待审提交时只返回审查入口；有 FIX 则只处理该轮返工。不要自行进入下一轮，不要部署。

启动顺序：
1. 读取 `AGENTS.md`、`delivery/STATE.json`。
2. 校验仓库/分支；工作区有用户未提交修改时保留，不 reset、不覆盖。
3. 仅加载 active_round 对应 `delivery/prompts/` 文件。后续轮次提示词是计划，不是当前授权。
4. 读取该轮指定的合同；按需读相关经历，不能继续从头采访用户。
5. 当前轮状态 ready 才开始新实现；awaiting_review 停止；changes_requested 读取 review_path 修复；blocked 报告具体依赖。
6. 完成按 `delivery/ROUNDS.md` 提交；无法 push/建 PR 时诚实报告权限阻塞，不说已经上传。

## 给后续策划/审查者的固定启动语

> 你接任 pre_training 的策划与审查。先读 START_HERE.md、AGENTS.md、delivery/STATE.json、delivery/REVIEWER.md；再读取当前轮分支中的 REPORT 与实际证据，检查 diff、页面截图及事实来源。作出 ACCEPT/FIX/BLOCKED/NEEDS_USER，写回 review 和 STATE。不要重新采访，不改变一个主页/多个简历版本的边界，不用实施者自报 PASS 代替审查。

## 文件地图（按任务读）

- 网站目的/边界：`site/WEBSITE_BRIEF.md`
- 屏幕、文案顺序、案例侧重点：`site/CONTENT_ARCHITECTURE.md`
- 数据与公开安全：`site/CONTENT_CONTRACT.md`
- 工程及测试命令：`site/TECH_DECISION.md`
- 外链：`site/LINKS.json`
- 媒体交接：`site/MEDIA_POLICY.md`、`site/SPPS_ASSETS.md`
- 多版本简历：`resume/ASSEMBLY.md`、`resume/PRESETS.json`、`resume/STYLE.md`
- 中文项目经历、申请表长描述与个人表达：`skills/zhang-shuo-experience-writing/SKILL.md`
- 每轮交付与裁决：`delivery/ROUNDS.md`、`delivery/REVIEWER.md`
- 原始经历：`PROFILE.md`、`experience/`

本次只完成架构与分轮任务，不声称网站、PDF、测试、素材脱敏、发布已经完成。准确实施状态只看 STATE；READINESS 只是资料准备状态。
