# R06 — Codex 本机认证检查：BLOCKED

分支 `codex/R06`，源自 main `9c4c3e885e9f5e03bfb6c8939e52d1de90a305ad`。用户与 STATE 已授权 Vercel、公网、平台临时域名、免费；不改 DNS/自定义域名、仓库可见性，不加 analytics。授权没有缺项。

本次重新实测，未沿用旧环境结论：Vercel connector 返回 0 teams，但默认账户查询可读到 1 个其他项目；未修改该项目。实际调用部署工具返回 `Tool deploy_to_vercel not found`。本机无已有 CLI，安装官方 `vercel@59.23.2` 后实际运行 `vercel whoami --no-color`，返回 `loggedIn: false`、`reason: login_required`、`userActionRequired: true`；VERCEL_TOKEN 未设置。CLI 另有更新 worker 超时/EPIPE，完整日志保留，不以该警告代替认证结论。

**唯一待补：在这个 Codex 本机环境完成一次有效的 Vercel CLI 登录（`vercel login`）。** 不需要再次给予发布授权，不要把 token 发到聊天或 Git。

从 `E:/myself/pre_training-r06` 的交互式终端运行已安装 CLI：`./delivery/audits/R06/tmp/cli/node_modules/.bin/vercel.cmd login`。本轮未启动登录流程，遵照用户要求在缺认证时停止。

发布范围复核：站点/简历实现与已接受 R05 无差异；public 只有已登记 general PDF，hash 匹配；允许输出仍为 R05 的 7 HTML、1 CSS、1 general PDF。尚未构建/上传新的发布包，未编造生产 URL/canonical。

实际 production URL、preview URL、deployment ID、deployed commit：均无。未创建部署，故 HTTPS、公网路由、下载、手机版、404、外链与在线 PDF 链接检查均**未执行**；没有伪造截图。中国访问未实测。未发生付费升级、DNS/域名或 analytics 操作；无部署需要回滚。登录就绪后仍须确认免费账户、重建 allowlist 产物并完成 R06 全部公网检查。

证据：[evidence.json](evidence.json)、[CLI 原始结果](attempt-01/cli-whoami.log)；[旧环境报告](previous-environment-report.md)仅保留历史。按用户指令在认证缺失处停止，不自签 ACCEPT，不修改 STATE。

PR：待创建后回填。
