# R04 网站工程

继承根规则与只读架构合同。唯一视觉方向 A，首页与四案例延续已接受 R03。

- src/pages/resume/index.astro：由通用 variant 投影简历页面，只此页允许 resume 白名单电话/出生年月；唯一 PDF 链接来自 publication/resume-manifest，与 LINKS 登记核对。
- ../resume/scripts：选材校验、打印与 PDF 验证。../resume/README.md 为复现入口。
- scripts/build.mjs/audit-dist.mjs：构建验证通用 variant 和公开 PDF hash，禁止其他简历文件进入 dist；非简历页面仍拒绝 resume-only 字段。
- scripts/site-e2e.mjs：56组浏览器检查、真实下载 hash、导航与隐私隔离。默认证据目录 R04/attempt-01。
- scripts/content.mjs、sections.mjs：原 R01/R03事实来源与正文合同。
- tests：保留内容/安全负例，扩充 PDF 注册与隔离检查。

依赖版本不变，SPPS媒体仍为文字降级。仅通用 PDF 复制到 public/downloads；其他导出均留 resume/exports（Git忽略）。R05 已由 STATE 和 R04-a01 授权，维护/干净验收入口为 ../acceptance/README.md；不执行 R06，不部署。


## R07 current user override — 2026-09-20
The user explicitly requested a media-first redesign and publication in the current Work conversation. The old text-only visual freeze and R06 round lock are superseded for this scoped change. Homepage public copy comes from publication/gallery.json; project fact records and résumé are preserved. Selected derivatives are authorized; original masters stay excluded. New local media interaction JavaScript is permitted, with a hash-based output allowlist and no analytics. Existing Vercel/free-only/no-DNS scope applies.

## Current content-alignment maintenance
本轮用户已授权依最终经历与上传方案修改主页；以 delivery/maintenance/home-alignment/03-IMPLEMENTATION.md 为当前范围。保留三部视觉作品，加入关于与三个辅助案例，并修正通用简历。旧文字冻结不适用此范围；原R07验收记录保持不变。Vercel403时交接，不能绕过。
