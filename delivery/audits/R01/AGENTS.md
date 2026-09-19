# R01 工作记忆

本目录承接默认分支 START_HERE.md、AGENTS.md、delivery/STATE.json 和 R01_FOUNDATION.md；仅实施 R01，策划者维护授权与裁决。

- `REPORT.md`：本轮报告唯一入口，完成实测后生成；实施者只标 pending。
- `evidence.json`：实际命令、退出码、环境与证据 SHA256。
- `attempt-01/`：实测日志和真实浏览器截图，报告之外不放个人原始材料。
- `attempt-02/`：针对 R01-a01 的返工测试、审阅/生产页面截图；本次真实生产构建应成功，外链复用未变的 attempt-01 核验。
- `tmp/`：本地临时脚本与产物，gitignored，不是交付证据。

初始基线：bd25d1d62d13b1624d9f99be05bd3b6f7b7517e2；返工依据默认分支 f8fda5a 的 `delivery/reviews/R01-a01.md`。原 PR #1 继续承接 attempt 02。审查单第5项已授权指定修正后将已审内容改 approved；原始媒体仍 pending，不复制。只修 R01，不修改授权，不部署。旧报告可从 5c024e2 查看，旧证据目录必须保留。
