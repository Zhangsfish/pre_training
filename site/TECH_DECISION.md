# Technical decision — architecture-v1

## 1. 固定选择

Astro静态构建 + TypeScript严格模式 +普通CSS token +少量必要JavaScript。网站只有公开内容、图片/视频、外链和简历；不使用Next/React运行时、数据库、CMS、登录、SSR、支付、聊天窗口、第三方分析或外部字体。

框架只负责显示，生成简历是离线作者流程。无需在服务器运行大模型。浏览器不读GitHub/Notion API。

官方依据（2026-09-20检查）：
- Astro静态输出与内容集合：https://docs.astro.build/en/guides/content-collections/
- 安装前提：https://docs.astro.build/en/install-and-setup/ （本次文档要求Node22.12+且不支持奇数版本）
- Playwright截图/页面PDF：https://playwright.dev/docs/api/class-page
- 可视对比：https://playwright.dev/docs/test-snapshots

R01选择官方支持的Node偶数LTS与Astro稳定版本，锁定实际版本/lockfile并记录；后面不无理由升大版本。采用当前官方内容集合API，不混搭旧教程。无需追逐最新版本号。

## 2. 工程边界

```text
publication/                 # 审核后的内容，唯一网页/简历输入
site/
  src/content.config.ts      # 按锁定Astro API读取publication/projects
  src/components/            # Header/ProjectCard/EvidenceLink/Media/Ownership/Footer
  src/layouts/               # BaseLayout/CaseLayout
  src/pages/index.astro
  src/pages/work/[slug].astro # getStaticPaths，四个固定slug
  src/pages/resume/index.astro
  src/pages/404.astro
  src/styles/tokens.css
  src/styles/global.css
  public/media/              # 只放通过公开审核的衍生物
  public/downloads/          # 只放发布manifest允许的通用简历
  assets-manifest.json
  package.json + package-lock.json
  tests/
  scripts/
resume/
  templates/                 # 打印模板
  variants/                  # 可公开的版本选材输入
  exports/                   # 本地生成，默认gitignored
applications/                # 按JD维护已获准公开的输入；私有内容留generated_private
```

仅部署 `site/dist/`，不能部署仓库根。public下面每个字节都能被访问，不可放“隐藏”的候选简历/原片。

## 3. 命令接口（由对应轮次实现）

从根目录：
- `npm --prefix site ci`
- `npm --prefix site run check`：Astro/TS+内容合同校验
- `npm --prefix site run build`：只构建可发布站
- `npm --prefix site run preview -- --host 127.0.0.1`
- `npm --prefix site run test`：本地确定性合同/组件测试
- `npm --prefix site run test:e2e`：Playwright实际页面操作
- `npm --prefix site run audit:dist`：公开输出、broken local links、资源预算
- `npm --prefix site run resume:build -- --variant general-zh`（R04）
- `npm --prefix site run resume:check -- --variant general-zh`（R04）

外链活性另报，不让网络偶发问题破坏本地可复现测试。R01先实现check/build/test；R02起e2e，R04后resume。未实现命令不可写测试通过。

## 4. 视觉与浏览器

桌面1440、平板768、手机375px；额外320px不溢出。语义HTML、单一h1、可见键盘焦点、图片alt、视频controls、prefers-reduced-motion。不用滚动劫持、默认自动播放、cursor特效、轮播藏证据。

主页正文16–18px，合理中文行长；每屏一个主要问题。CSS变量控制字级/间距/色彩，不堆多个UI库。

工程预算（我们的验收目标，不是外部标准）：首屏不预载视频；普通首页初始资源尽量≤1MB；自写客户端JS gzip≤30KB；主图约≤350KB。超预算说明原因并得到审查裁决。性能工具分数不冒充中国真实网络体验。

## 5. 简历导出

以结构化选材JSON为共同输入，先生成单栏print HTML，通过Playwright Chromium导出可选中文本PDF；A4单页，固定字体/纸张/边距，等待fonts.ready。逐页渲染并肉眼检查，不把浏览器PDF成功当排版合格。

Markdown保留可编辑内容源。DOCX为雇主确需时的可选导出，不阻塞首版；需要时由同一JSON生成，不另写一套事实。不要将PDF变成截图，不能靠缩到无法阅读塞下一页。工具/字体只写环境安装前提，不提交未经许可的字体二进制。

## 6. 部署

保持host-neutral静态dist。先沿用EdgeOne Pages作为候选，不承诺免备案、永久免费或中国必定可达。R06才核对官方当前方案、账号、地区、域名、费用和访问条件，获得授权再部署。不自动接上生产分支自动发布。

开发/验收本地即可；如需要在线预览，单独取得该预览的公开许可。生产发布后独立打开确认，不把域名绑定成功等同线上全部功能可用。
