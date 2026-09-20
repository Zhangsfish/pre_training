# R02 工作记忆

本轮仅视觉定向；从默认分支 bdf4fb8 启动，R01已验收合并。输入为 R02_VISUAL、CONTENT_ARCHITECTURE、TECH_DECISION、MEDIA_POLICY、R01-a02及已批准publication。

- `REPORT.md`：唯一报告入口，推荐方向及未决选择。
- `evidence.json`：tested_commit、实际命令、退出码、截图/证据SHA256。
- `attempt-01/`：六张1440×1000/375×812真实页面截图、测试日志、浏览器布局指标。
- `site/review/`：可删除的三方向实现，只进入.review-dist。

不修改事实、授权、媒体状态或正式首页。完成后提交 codex/R02 和PR；待策划检查后由用户选择，未选择则NEEDS_USER；不进入R03、不部署。临时编写工具放已有gitignored R01/tmp 中，不列为交付证据。
