# R07 — 媒体优先作品集已发布，等待审查

R07 已按用户提供的成品包完成集成、独立重建、真实浏览器验证和现有 Vercel 项目的生产发布。本报告提交可复核事实，不自签最终 ACCEPT；附件中记录的旧 403 blocker 已由本次成功认证与部署取代。

## 正式入口

- 生产 URL：<https://zhang-shuo-portfolio.vercel.app>
- 本次不可变部署 URL：<https://zhang-shuo-portfolio-65c454u79-zhangsfishs-projects.vercel.app>
- Vercel deployment ID：`dpl_D2TSX3HAx3HQTpQoYvxzxFgLVtCE`
- Vercel project ID：`prj_CfECSSKoBni34VGDTa89UhKu4n09`
- Vercel team ID：`team_iUtfj6fbX7ntRyux5VD2Req3`
- 部署源提交：`6c9bd47704eb620dcd1788d0f7cadd432a413e02`
- 部署创建时间：2026-09-20 05:38:59 UTC
- 最终匿名浏览器复验开始时间：2026-09-20 05:45:49 UTC

Vercel CLI 以账号 `zhangsfish` 登录，并在发布前逐项核对了团队、项目名、project ID 与 team ID。发布只使用通过审计的 `site/dist`；没有上传仓库根、ZIP、审计目录或媒体原片。沿用已接受 R06 的免费 Hobby 项目，没有升级付费方案、修改 DNS/自定义域名、添加 analytics、连接 Git 自动部署或改变仓库可见性。

## 集成与发布范围

用户附件 `portfolio-R07-release.zip` 的 SHA-256 为 `a13f55b03734e3a31862aa6cfb760a3edd743bc3681d9eeda61caf3fdef894e1`。ZIP 内 `SHA256SUMS.json` 的 33 项全部匹配，`R07.patch` SHA-256 为 `ae40de4c6e18d09b9901bde288e6411711794718ba2f3c58609100c13f193f51`，并从指定 base `46a5ac0b1e9abc02e37776eb8fde3631d2eeb0eb` 以 `git am` 无冲突应用。

正式页面按附件原样集成：主页三项作品、QQ 灵犀 / SPPS / KIN 媒体详情、PET 兼容入口、通用 resume、PDF 与 404。公开媒体共 17 个登记过哈希的衍生文件；QQ 与 KIN 含静音短预览和完整影片，SPPS 含四张公开照片和两段已处理运行片段。原片、私密资料和其余简历 PDF 均未进入公开产物。

## 独立重建与本地浏览器验证

在干净 R07 worktree 中重新执行：

- `npm ci`：272 个锁定依赖，`npm audit` 为 0 vulnerabilities。
- `npm run check`：Astro 0 error / 0 warning / 0 hint，内容合同通过。
- `npm test`：31/31 通过。
- `npm run build` 与 `npm run audit:dist`：7 个页面，严格输出审计通过。
- `npm run test:gallery`：真实 Astro preview + Chrome 153；375px / 1366px 路由、三段影片解码、场景切换、图片放大、Escape/关闭及焦点返回、reduce-motion、PDF 哈希和 404 全部通过。
- FFprobe：QQ 172.013s、KIN 49.792s、SPPS 主片 19s、SPPS 次片 18s；两个短预览均 12s 且无音轨，SPPS 两段公开运行片段均无音轨。

最终 `site/dist` 为 29 个文件、22,420,440 bytes，其中 17 个批准媒体、1 份 general PDF、本地客户端 JS 2,952 bytes。与 ZIP 的审核产物相比，27/29 文件逐字节一致；仅 `robots.txt` 与 `sitemap.xml` 因 Windows checkout 的 CRLF 不同，语义内容相同。实际部署以本次重新构建并通过审计的 `site/dist` 为准；复制进 Vercel Build Output API 静态包后，29 个文件的 SHA-256 再次全部匹配。

本地证据位于 [`attempt-02/`](attempt-02/)，包括构建日志、输出比较、ffprobe 结果和各路由整页截图。

## 未登录生产验收

使用 Chrome 153 的全新 incognito context，不带保存的登录状态且不忽略 HTTPS 错误：

| 检查 | 结果 |
|---|---|
| 首页、QQ 灵犀、SPPS、KIN、PET、`/resume/` | 1440px 与 375px 均为 HTTPS 200；每页一个 H1，无横向溢出 |
| 三段完整影片 | QQ 172.013s、SPPS 19s、KIN 49.792s 均解码并实际播放推进 |
| 交互与键盘 | 场景切换、图片放大、Escape、关闭按钮和触发器焦点返回通过 |
| reduce-motion | 短预览不自动下载 |
| 404 | 未知路径返回 HTTP 404，响应体 SHA-256 与本地 `404.html` 一致 |
| PDF | 200，166,740 bytes，SHA-256 `9584697754adb1d5b7b67f85e3bfb458ca4c50bafb6ba8820babc685a158034e` |
| HTTPS | HSTS `max-age=63072000; includeSubDomains; preload` |
| 发布一致性 | 线上全部 29 个文件逐项下载，字节数及 SHA-256 与审计后的 `site/dist` 完全一致 |
| QQ GitHub | 页面入口可见；匿名浏览器 200，可见内容 7,879 字符 |
| 两个 Notion 课程页 | resume 入口均可见；匿名浏览器均为 200，并渲染出课程标题与正文 |
| QQ Demo | 作品页入口可见；目标站当前返回 `401 Unauthorized` 与 `WWW-Authenticate: Basic realm="QQ Lingxi Demo"`，因此匿名访客不能进入 |

机器结果见 [`production-browser/results.json`](attempt-02/production-browser/results.json)，自动化脚本见 [`verify-production.mjs`](verify-production.mjs)。主要截图包括 [1440px 首页](attempt-02/production-browser/home-1440.png)、[375px 首页](attempt-02/production-browser/home-375.png)、[QQ 完整影片](attempt-02/production-browser/film-1-1440.png)、[SPPS 完整影片](attempt-02/production-browser/film-2-1440.png)、[KIN 完整影片](attempt-02/production-browser/film-3-1440.png) 与 [生产 404](attempt-02/production-browser/404-1440.png)。

## 审查提示与回滚

QQ Demo 的 401 来自独立的 `qq-lingxi-agent-platform.vercel.app`，不是本次作品集部署失败；它在 `site/LINKS.json` 中标为用户提供且非 required。本轮没有猜测凭据、移除用户链接或改动该外部项目。若要求匿名访客直接体验 QQ Demo，需要该外部项目的所有者另行移除 Basic Auth；这不影响作品集本站、影片和 GitHub 入口。

如需回滚作品集 production alias，可恢复 R06 已接受部署 `dpl_YagSCrhDMgnDtnFQGYTFnVcqrJZw`。附件导入的 `delivery/STATE.json` 仍保留旧环境的 blocked 记录；实施者未自行改写授权/验收状态，请审查者以本报告和 production evidence 裁决并更新 STATE。

等待策划者审查；不进入下一轮，不再发布其他版本。
