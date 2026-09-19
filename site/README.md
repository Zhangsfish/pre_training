# R01 本地审阅工程

唯一网站工程目录，不为每个 JD 复制网站。请从根 START_HERE.md 启动；本目录 WEBSITE_BRIEF、CONTENT_ARCHITECTURE、CONTENT_CONTRACT、TECH_DECISION 为策划合同，LINKS 与媒体登记按需读取。

R01 返工待验收。仅实现固定身份、四案例摘要、教学链接与联系入口；详情和简历位置有明确说明，没有虚假下载或 Demo。依据 `delivery/reviews/R01-a01.md` 第5项授权，指定修正后的这批 publication 内容已改为 approved；这不代表轮次验收或部署获准。

## 环境与命令

Node **24.15.0**（偶数 LTS），npm **11.12.1**；Astro **7.3.3**、@astrojs/check **0.9.10**、TypeScript **6.0.3**、@types/node **24.13.6**。精确依赖在 package-lock.json。检查器的 peer range 是 TypeScript `^5 || ^6`，因此不使用不兼容的 TypeScript 7，也不使用 force/legacy-peer-deps。

从仓库根运行：

```sh
npm --prefix site ci
npm --prefix site run check
npm --prefix site run test
npm --prefix site run review:build
npm --prefix site run review:preview
```

生产构建与本地查看（先停掉审阅预览）：

```sh
npm --prefix site run build
npm --prefix site run preview -- --port 4322
```

依次执行检查和构建（两者会写同一 `.astro` 内容缓存，不能并行运行）。审阅结束在 site 目录执行 `node node_modules/astro/bin/astro.mjs preview stop` 停止本机服务。

预览只监听 `http://127.0.0.1:4321/`，输出在 gitignored `site/.review-dist/`。不要上传该目录。

`npm --prefix site run build` 是生产命令。本批内容获授权后应成功；任何必要内容或引用 claim 被改为 draft 时仍拒绝构建。负例测试在隔离临时副本中验证拒绝行为，不修改真实公开稿。即使父进程带有 review 环境变量，这条命令仍显式验证 production；直接 Astro build 也有 integration hook 门禁。生产目标是 `site/dist/`，出生年月和手机号不得进入输出。不通过 noindex 隐藏不应输出的内容。

## 数据与检查范围

Astro 当前 `glob` 内容集合读取 `publication/projects/*.md`，使用 `astro/zod` 校验结构。frontmatter 用 JSON（YAML 兼容）保持无需额外解析器的确定性读取。页面的事实来自 publication；模板只含导航、状态提示和布局。

构建前检查 claim ID、来源/标题、引用、发布状态、上下文、外链与媒体。source blob 漂移只提示相关 claim 需要策划核对，不自动改写。网页以显式字段投影编译，不带 claim 对象、源文件路径或媒体内部记录。未知 claim 一律不用于本轮事实性文案，不能升级成成果数字。语义是否准确仍需策划对照事实源审查，自动检查不能替代人工判读。

## 浏览器证据

复用已有 Playwright 库和 Chrome，无需新的浏览器下载。设 `PLAYWRIGHT_MODULE` 为已安装模块目录、`CHROME_EXECUTABLE` 为 Chrome 可执行文件，然后在仓库根执行：

```sh
node site/scripts/browser-evidence.mjs home delivery/audits/R01/attempt-02
node site/scripts/browser-evidence.mjs production delivery/audits/R01/attempt-02
```

home 需先启动4321端口的本地审阅预览；production 需启动4322端口的生产预览。两种模式均检查1440/768/375/320px、锚点、键盘访问、必需链接与全部输出文件泄漏，并分别生成桌面/手机真实截图。链接未变化，按审查单复用 attempt-01 匿名核验；需要重查时脚本 links 模式只记录内容标记与状态，不复制课程全文或第三方联系方式。

这两个脚本不是正式后续轮次的 test:e2e / audit:dist。R02–R06 工作、媒体公开桥接、简历与部署尚未实施。

## 官方依据（2026-09-20 核对）

- [Astro 安装与 Node 前提](https://docs.astro.build/en/install-and-setup/)
- [Astro 内容集合、glob 与 astro/zod](https://docs.astro.build/en/guides/content-collections/)
- [Playwright 页面 API](https://playwright.dev/docs/api/class-page)

包版本和兼容范围另以 npm registry 元数据及安装成功的 lockfile 为准。具体实测以 delivery/audits/R01/REPORT.md 为入口。
