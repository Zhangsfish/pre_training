# 主页内容对齐：终验、合并与发布记录

日期：2026-09-21。状态：`published_and_verified`。

## 结果

- PR [#21](https://github.com/Zhangsfish/pre_training/pull/21) 已合并。接手时指定 HEAD 为 `8433c31059189f3b2c1bc037bd963815a9ba2620`；补入真实浏览器与 PDF 证据后的最终 PR HEAD 为 `a375d74d011a2a190653eb1c3af54812c56e425a`，合并提交为 `5ea262632032d2a885656dc5c197f9cd869e92d2`。
- 已从该合并提交的 clean checkout 重新安装锁定依赖、重建四份简历和站点，并只把审计通过的 `site/dist` 发布到原 Vercel Hobby 项目 `zhang-shuo-portfolio`。
- 正式域名：[https://zhang-shuo-portfolio.vercel.app](https://zhang-shuo-portfolio.vercel.app)。不可变部署地址：[https://zhang-shuo-portfolio-cqr7ec31y-zhangsfishs-projects.vercel.app](https://zhang-shuo-portfolio-cqr7ec31y-zhangsfishs-projects.vercel.app)。
- Deployment ID：`dpl_QGDVe9yHQHvQBzXvRLcnQgjDP8cp`；Vercel project ID：`prj_CfECSSKoBni34VGDTa89UhKu4n09`；team ID：`team_iUtfj6fbX7ntRyux5VD2Req3`；状态 `READY`。
- 未新建项目，未改 DNS、认证、仓库可见性、analytics 或付费方案。

## 实施边界

- 首页保持 QQ → SPPS → KIN 的主作品顺序，随后呈现个人表达、教学、PET、全合成与联系入口。
- 六个详情页、通用简历页面和 PDF 使用已批准的经历事实；没有重新采访、增加新联系方式、公开实验结构或原始科研数据。
- KIN 的市场判断与长期方向默认展开；QQ Demo 继续明确标注“需访问权限”。
- 终验未发现需要修改生产排版或文案的问题，因此本阶段只补充测试、截图、发布与审计记录。

## Clean checkout 检查

合并后从 `5ea262632032d2a885656dc5c197f9cd869e92d2` 建立独立 clean checkout，执行 `npm ci` 后得到：

| 检查 | 结果 |
|---|---|
| `npm --prefix site run check` | 通过；Astro 0 错误、0 警告、0 提示 |
| `npm --prefix site test` | 32/32 通过 |
| `npm --prefix site run test:jd` | 9/9 通过；JD 只使用仓库 fixture |
| `node resume/scripts/build.mjs --date 2026-09-20 --verify-published` | 四份 PDF 重建通过 |
| `node resume/scripts/check.mjs` | 四份均为一页 A4；中文可提取；链接注释通过 |
| `npm --prefix site run build` | 9 页；公开安全与输出审计通过 |
| `node site/scripts/check-alignment.mjs` | 事实、主页锚点、详情页与简历对齐通过 |

发布包共 31 个文件、22,364,182 bytes，含 17 份批准媒体和 2,952 bytes 客户端 JavaScript。

## 浏览器终验

系统 Chrome `153.0.8010.52`、全新匿名 profile 完成 375px 与 1366px 的首页、六个案例页和 `/resume/` 检查：16/16 路由返回 200，每页只有一个 H1，页面宽度等于视口宽度，无横向溢出。首页首屏能快速看到作品，主作品顺序与全部辅助入口正确，未出现完整简历堆叠、旧 `Codex` 对外称呼或 PET 占位文案。

交互检查通过：QQ 场景切换、图片放大、Esc 关闭、关闭后焦点恢复、详情键盘开合、reduce-motion 下预览不下载；QQ、SPPS、KIN 三段主影片实际解码并播放推进，SPPS 详情两段实拍均解码。真实未知路径返回 404。

匿名外链检查：KIN 独立体验、QQ GitHub、两个 Notion 页面均返回 200 且有可见正文；QQ Demo 返回预期 401，未尝试绕过 Basic Auth。

生产截图与机器可读结果位于 `attempt-02/browser-production/`；标准画廊回归见 `attempt-02/production-gallery.log`，扩展终验见 `attempt-02/production-final.log`。

## PDF 与发布文件一致性

- 通用 PDF：83,934 bytes；SHA-256 `aa92cf7c795cf4df8fafc37bc8a93b719b4325975d0ef18c8363f141e2985b07`。
- PDF 为一页 A4，中文无缺字或裁切，文字可选择；Chrome 原生 PDF 阅读器实际点击 6 个项目链接，均打开目标并返回 200。
- 正式域名逐一下载全部 31 个文件，远端总字节数 22,364,182；每个文件均与合并提交 clean checkout 中的 `site/dist` SHA-256 完全一致。
- HTTPS 正常，正式域名已指向上述 READY 部署，验证时间为 `2026-09-20T19:21:25.915Z`（北京时间 2026-09-21 03:21:25）。

## 唯一外部限制

独立 QQ Demo 仍受原有 Basic Auth 保护，匿名访问返回 401；主页已明确写明“需访问权限”。这不影响本站、QQ GitHub、KIN 独立体验、Notion 页面或 PDF 的公开访问。

证据入口：`delivery/maintenance/home-alignment/attempt-02/`。此前 R07 审计和本维护早期证据均保留，未覆盖。
