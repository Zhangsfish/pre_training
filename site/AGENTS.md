# R01 网站工程

继承根规则与本目录只读架构合同。工程只从 publication、LINKS 和素材 manifest 构建，不在运行时读取 experience 或远程 API。

- `scripts/content.mjs`：读取公开稿、合同校验、显式字段投影；源文件仅用于构建前校验，不打包。
- `scripts/build.mjs`、`astro.config.mjs`：双层生产门禁；只有显式 review 模式可输出 draft 到 `.review-dist/`。
- `src/content.config.ts`：Astro glob 内容集合；`src/pages/index.astro`：R01 单页审阅壳。
- `tests/`：Node 原生负例/合同测试，不依赖网络。
- `scripts/browser-evidence.mjs`：真实浏览器验收与匿名外链检查；通过环境指定已安装 Playwright 和 Chrome。
- `README.md`：精确命令、版本、限制和官方文档来源。

工程版本锁定在 package-lock。R02 已授权，仅在 `review/` 建三种小型视觉方向，生产路由和首页不变；不引入 R03 详情。公开媒体尚无许可，不能加入 public。R01 证据保留；本轮证据在 delivery/audits/R02/。
