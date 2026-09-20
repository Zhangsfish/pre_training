# R06 — Vercel 发布完成，等待审查

R06 已按用户授权发布并完成公网核验；本报告只提交事实与证据，不自签 `published_and_verified` 或 ACCEPT，不修改 `delivery/STATE.json`。

## 正式入口

- 生产 URL：<https://zhang-shuo-portfolio.vercel.app>
- 本次不可变部署 URL：<https://zhang-shuo-portfolio-gqu10i1r9-zhangsfishs-projects.vercel.app>
- Vercel deployment ID：`dpl_YagSCrhDMgnDtnFQGYTFnVcqrJZw`
- Vercel project ID：`prj_CfECSSKoBni34VGDTa89UhKu4n09`
- 部署源提交：`2aca9cd130d9b57db608dc80bb952e5f3bf9894e`
- 公网验证时间：2026-09-20 03:34:51–03:38:00 UTC

Edge 中完成的设备登录已由本机 CLI 验证，账号为 `zhangsfish`。账户计划为免费 Hobby，未升级付费方案；项目仅有 `vercel.app` 平台域名，未绑定自定义域名、未操作 DNS、未新增 analytics、未改变 GitHub 仓库可见性。项目未连接 Git 自动部署，后续不会因 push 自动发布。

## 发布内容与构建

在提交 `14c78ce` 写入真实 canonical、Open Graph、robots、sitemap 与 Vercel 配置，并在 `2aca9cd` 增加“静态文件优先、其余返回自定义 404”的路由。`npm ci` 安装 272 个锁定依赖，审计 0 漏洞；`npm run check` 为 0 error / 0 warning / 0 hint；31 项 Node 测试通过；生产构建和 `audit:dist` 通过。

最终 allowlist 共 11 个文件、206,629 bytes：7 HTML、1 CSS、`robots.txt`、`sitemap.xml`、1 份 general PDF。客户端 JS 为 0；公开媒体为 0；SPPS 待许可原始素材未上传；没有其他简历或私有/审查文件。线上 11 个资源逐文件下载后 SHA-256 与已审计 `site/dist` 完全一致，见 [dist-resource-manifest.json](attempt-02/dist-resource-manifest.json)。

第一次远端源码构建只上传 `site/`，因生产门禁需要读取仓库同级 `resume/` 而失败；未成为生产版本。为同时满足“只发布 site”和完整门禁，最终从本机已通过检查的 `site/dist` 生成 Vercel Build Output API 静态包并发布。第一份可访问预构建部署缺少自定义 404 fallback，已被最终部署取代；最终 alias 只指向上述 `dpl_Yag...`。

## 未登录公网验收

使用全新临时 Chrome 153 profile，未带登录态且未忽略 HTTPS 错误：

| 检查 | 结果 |
|---|---|
| 首页、KIN、SPPS、QQ 灵犀、PET、`/resume/` | 全部 HTTPS 200；真实 canonical/OG URL 正确 |
| 未知路径 | HTTP 404；显示仓库自定义 404；`noindex, follow` |
| 手机页面 | 上述 7 条路由均以 375×812 访问，无横向溢出，已保存整页截图 |
| HTTPS/资源 | 生产 URL 200；HSTS `max-age=63072000; includeSubDomains; preload`；无失败站内资源 |
| 通用 PDF | 下载 200、`application/pdf`、166,740 bytes、SHA-256 `958469…034e` |
| PDF 在线链接 | 原生 Chrome PDF reader 实际点击 KIN / SPPS / QQ 灵犀 / PET 四个相对链接，均进入真实生产 URL 并返回 200 |
| 外链 | QQ 灵犀 GitHub 与两个 Notion 页面均在匿名上下文返回 200，并通过可见内容与非私有页标记检查 |
| robots / sitemap | 均为 200；sitemap 仅含 6 个正式内容路由，不含 404 |

完整机器结果见 [production-browser.json](attempt-02/production-browser.json)。主要截图包括 [桌面首页](attempt-02/home-production-1440.png)、[375px 首页](attempt-02/home-production-375.png)、[自定义 404](attempt-02/404-production-1440.png) 和 [生产 PDF 原生阅读器](attempt-02/pdf-production-native-reader.png)；四个详情、resume、全部手机版、四次 PDF 点击以及三项外链截图也在 `attempt-02/`。

## 回滚与限制

这是该项目第一份完整通过 R06 的生产部署，没有更早的已接受生产版本。未来发布若出现问题，应把 production alias 回滚到 `dpl_YagSCrhDMgnDtnFQGYTFnVcqrJZw`（或从 `2aca9cd` 的同一 allowlist 重新部署）；不要回滚到缺少自定义 404 的中间部署 `dpl_7Zp2QRRET5LAP7BLGeyXpZ5XQWTV`。项目没有 Git 自动生产规则。

中国大陆不同运营商/地区的访问质量未实测；本轮只证明当前环境匿名访问、TLS、页面与外链行为。SPPS 素材继续按已接受的文字降级方案，不构成阻塞。

PR：<https://github.com/Zhangsfish/pre_training/pull/6>。等待策划者审查；不进入后续轮次，不部署其他版本。
