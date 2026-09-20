# R06 发布记录

继承根 AGENTS；依据 main 的 R06 授权及用户明确发布许可：Vercel、公网、仅平台临时域名、免费、不改 DNS、不加 analytics。

- REPORT.md：本轮唯一交付入口；只能记录真实部署或 BLOCKED，不自签 ACCEPT。
- evidence.json / attempt-01：本次 Codex 环境的实测连接、CLI 和发布/验证证据；不写 token。
- previous-environment-report.md：main 原有 ChatGPT 环境阻塞记录，保留历史，不作为本次失败依据。
- tmp（Git 忽略）：隔离 CLI 工具及缓存，不进入 site/public 或发布包。

仅操作 pre_training 的 site，其他 Vercel 项目只可在识别当前账户时只读查看；不改事实层、STATE、仓库可见性或其他项目。
