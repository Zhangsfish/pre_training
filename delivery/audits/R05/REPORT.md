# R05 — 成品验收交付

状态：**ready_for_deployment**，待策划审查；不是 ACCEPT / published。分支 `codex/R05`。

tested_commit：`b2eadcea9f9ae5def9df1068b9d715919e69586e`；基线 `5b1f48a99af87ee693f1b2c43d37756a418ac061`。独立 clean checkout 开始时无依赖/缓存/产物；新装网站、Playwright、Python 依赖后重建。工具版本、lockfile hash、命令/退出码及每件证据 SHA-256 均见 [evidence.json](evidence.json)。后续提交只补报告证据。

检查：类型/合同零错误；31 网站、9 简历测试通过；56 组 320/375/768/1440 与 JS 开关检查；7 页真实 200% 缩放、键盘及 reduce-motion 通过。本地路由、锚点、联系方式、真实下载 hash 已核对。四版 PDF 重新提取/渲染，均一页，正文与 R04 一致；原生阅读器实际点击 15 个站内相对链接成功。

交付：[维护 README](../../../acceptance/README.md)、[人工事实/公开安全复核](MANUAL_AUDIT.md)、[dist 清单](attempt-01/dist-inventory.md)、[截图与日志](attempt-01/)。dist 仅 7 HTML、1 CSS、通用 PDF，共 202411 bytes；无 JS、原片、审计材料或其他岗位 PDF。事实、publication、STATE、网站视觉与简历实现均未改。

阻塞项：无。非阻塞限制：KIN 匿名仓库仍 404；SPPS 按已接受审查继续文字降级；离线 PDF 相对链接无网站基址而失败，在线可用；CET-6 按 R04 省略。QQ 与两 Notion 匿名可读。公网宿主/真实域名与其他阅读器须另获 R06 授权后核验。未部署，不进入 R06。

PR：待创建后回填实际入口。
