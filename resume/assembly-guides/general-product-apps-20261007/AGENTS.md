# 2026-10-07 产品与商业化简历组装快照

## 任务

用户要求给其他 AI 一份能从 GitHub 组装当前简历的 README。先前 GitHub 已收录两款 App 的单项短版，但旧六段、KIN + QQ 合并版与 PAP 最新进度未完整对应当时本地一页 PDF，因此本目录保存整页选材快照，避免后续从过时文件拼错。

## 上游与文件

- `README.md`：接手 AI 的入口；解释复现、本版与现有生成器的区别、按岗位排列组合和事实边界。
- `selected_projects.json`：2026-10-07 用户审阅通过的一页文字、顺序、分组、日期、联系方式与链接。生成自本地已审阅的 `locked_master.json`、`app_projects.json` 和 `application_config.json`；那套本地源在 `resume/exports/` 下，受 Git 忽略，不作为远端依赖。
- 上游事实：`experience/*.md`、两款 App 的各自项目仓库；用户当日口述优先用于本版最新状态。单项 App 短版见写作技能 references。

## 使用与待核实

- 本目录是内容快照，不是网站公开 PDF，也不修改现有 `resume/variants`、`publication/claims.json` 或生成脚本。要复现本版，直接读 JSON；要接入旧生成器，另做 claim 映射与验收。
- 美区审核来自用户带“应该”的口述；PAP 稿件及伦理进度也随时间变化。正式投递前逐项核对；不得把计划写成成果。
- 快照本身不可为某 JD 静默改写。新岗位可复制选材到 Git 忽略的 `resume/exports/`，按 JD 排列组合；用户确认新固定文案时另存版本并更新入口。
