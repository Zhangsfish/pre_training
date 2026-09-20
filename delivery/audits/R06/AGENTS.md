# R06 发布记录

继承根 AGENTS；依据 main 的 R06 授权及用户明确发布许可：Vercel、公网、仅平台临时域名、免费、不改 DNS、不加 analytics。

- REPORT.md：本轮唯一交付入口；只能记录真实部署或 BLOCKED，不自签 ACCEPT。
- evidence.json / attempt-01：初次认证缺失的历史记录；已由 attempt-02 的成功登录、部署与公网验证取代。
- attempt-02：最终 Vercel 部署日志、未登录 Chrome 桌面/手机/PDF/外链截图、线上逐文件 hash 清单；下载验证产生的重复 PDF 被 Git 忽略，仅保留 hash 结果。
- verify-production.mjs / verify-deployed-inventory.mjs：可复跑的匿名生产浏览器验收和线上资源逐字节核对。
- previous-environment-report.md：main 原有 ChatGPT 环境阻塞记录，保留历史，不作为本次失败依据。
- tmp（Git 忽略）：隔离 CLI 工具及缓存，不进入 site/public 或发布包。

仅操作 pre_training 的 site，其他 Vercel 项目只可在识别当前账户时只读查看；不改事实层、STATE、仓库可见性或其他项目。
