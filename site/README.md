# 唯一正式网站 · R04 简历接入

从仓库 START_HERE.md 和 STATE 启动。当前沿用已选 A：浅底、深字、衬线标题、并排 KIN/SPPS 与紧凑 QQ/PET；没有视觉切换器或候选路由。

## 本地运行

Node 24.15.0、npm 11.12.1；Astro 7.3.3、TypeScript 6.0.3、@astrojs/check 0.9.10、@types/node 24.13.6。版本由现有 lockfile 锁定，本轮未新增依赖。

从仓库根依次运行，避免 Astro 缓存并发写入：

```sh
npm --prefix site ci
npm --prefix site run check
npm --prefix site run test
npm --prefix site run build
npm --prefix site run audit:dist
npm --prefix site run test:e2e
```

浏览器命令复用已有 Playwright 和 Chrome：PLAYWRIGHT_MODULE 指向可解析的 playwright 模块目录，CHROME_EXECUTABLE 指向 Chrome 可执行文件。建议设置 CI=true、ASTRO_TELEMETRY_DISABLED=1。e2e 启停自己的 127.0.0.1 静态服务器，将证据写入 delivery/audits/R04/attempt-01；临时探测可用 `-- --output delivery/audits/R04/tmp/browser-probe`。不要覆盖已提交的历史证据。

手动查看：`npm --prefix site run preview -- --port 4322`，打开 http://127.0.0.1:4322/ 。Astro预览可能在后台运行；结束时从site目录执行 `node node_modules/astro/bin/astro.mjs preview stop`。仅本地预览，不部署。

## 页面与内容边界

- `/`：S1首屏、S2四案例、S3教学、S4方法、S5教育、S6联系。
- `/work/kin/`、`/work/spps/`、`/work/qq-lingxi/`、`/work/pet/`：同一本档案的四篇详情；批准短稿完整保留，不为字数目标新增事实。
- `/resume/`：由通用 variant 生成的网页与唯一 PDF 下载；仅此简历页和获准 PDF 使用电话/出生年月，其他页面仍禁止。
- `/404.html`：错误页与返回入口。实际未知路径HTTP状态由静态host配置决定；本地e2e模拟正确404回退，生产部署需R06再次验证。

正文来自已批准 publication；LINKS 是外链唯一来源。KIN重新分段以把竞争检查留到后段，所有原始句子保留。SPPS原件已收到但未获公开衍生物，当前使用安全文字版和整理提示；无假照片、视频播放器或未经允许的媒体。

review:build 仍支持内容审阅门禁，输出相同页面到 .review-dist，不再含A/B/C候选。R02截图仍保存在旧审计包；其旧复现说明只适用于当时的tested_commit。R01 browser-evidence.mjs同样是历史脚本，本轮以site-e2e为准。

## 验证范围

check检查内容门禁及严格类型；test包含不修改真实数据的负例。build后自动audit：只能输出规定页面/CSS/获准媒体及 manifest 登记且 hash 一致的通用 PDF，检查私有字段、候选CSS、外部资源、PDF和本地文件链接，并记录体积。e2e覆盖7页×4宽度×JS开关，检查文字保真、首屏、溢出、键盘跳转、页内/跨页锚点、详情往返、必需外链可见、零外部请求；保存三宽度全页图及首页首屏图。

匿名外链活性独立运行 `node site/scripts/check-links.mjs`：仅记录HTTP状态和公开内容标记，不复制Notion全文。不把网络波动混入本地确定性测试，也不更改LINKS的策划记录。SHA256、环境、测试快照及限制见本轮REPORT/evidence。

## R04 简历命令

详见 [简历复现与 JD 流程](../resume/README.md)。首次生成用 `npm --prefix site run resume:build`，验收用 `npm --prefix site run resume:check` 和 `npm --prefix site run test:jd`。生成公开副本须指定 `--variant general-zh --publish`；其他 PDF 永不自动复制到 public。e2e 额外执行真实下载并核对 hash。
