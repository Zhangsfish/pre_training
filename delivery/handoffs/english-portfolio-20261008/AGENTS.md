# 英文个人主页交接记忆

## 用途与来源

用户于 2026-10-08 要求给另一段对话准备英文个人主页交接文档。本目录只保存交接，不实施英文网站、不修改中文站、简历、事实层、STATE 或生产部署。

上游为根 `AGENTS.md`、`START_HERE.md`、`publication/AGENTS.md`、`site/AGENTS.md`，以及 `delivery/maintenance/independent-apps/REPORT.md` 的 Attempt 03。
本次成功 fetch 后核对的 main：`b43128fdbdedb3b54e0e3ea0da9046bf4d154e70`。GitHub connector 确认 PR #26 已合并；旧报告中的“仍开放”是当时快照。

## 文件地图

- `HANDOFF.md`：交接主文档。当前状态与硬边界为已核对背景；英文路由和实现方式为建议，不能冒充已经批准或实现。
- `START_PROMPT.md`：新对话可直接使用的启动语。要求先核对最新 main 和已有 PET 来源漂移，再确认实施范围；不授予发布权限。
- `baseline-build-check.log`：本次对干净 main 执行 production build 的真实输出。没有安装依赖或执行全面网站终验；失败停在既有来源漂移门禁。

## 决策与未决项

- 本任务独立文档分支，不合并、不发布；不影响现有维护工作区。
- 推荐保留 `/` 中文并增加 `/en/`，共用组件、样式、媒体，不重新设计。
- 公开中文 PDF 及锁定简历不改。英文 PDF 是独立范围，尚未授权或生成。
- main PET 事实更新与 publication claims 来源指纹尚未同步；需要审查实际事实差异后处理，不能直接换 SHA、回退事实或删除门禁。
- 未来英文稿、页面范围、合并与发布由接手对话按用户当时明确授权推进。这里不是新轮次 ACCEPT。

## 接手

先读 `HANDOFF.md`。从实时默认分支建英文实施工作区，不把本交接工作区或旧 `codex/R04` 当成唯一基线。重新验证 auth、外链、App 上架与稿件状态，不沿用历史测试结果宣称当前通过。
