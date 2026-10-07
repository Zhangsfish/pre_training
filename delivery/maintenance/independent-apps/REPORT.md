# 个人主页独立产品展示：Lecture Asset / Everwhile

日期：2026-10-07。用户要求先做一版，发布到原个人主页查看。已发布并完成匿名线上验收；PR 保持开放，供用户看版后提出调整。

## 范围

- 在 QQ → SPPS → KIN 三个既有主画廊之前增加 Lecture Asset 与 Everwhile；原三者内部顺序不变。
- Lecture Asset 为 20.5 秒网页宣传片与 6 张已整理的中文商店截图并排，截图可前后切换与放大；影片从 PR #18 的 720p 中文版生成，在未经核实的 App Store 下载二维码出现前结束并淡出。
- Everwhile 用 4 张中文商店截图和旁边的需求场景、产品回应、推广计划展示，不伪造宣传片。
- 两款 App 的状态均明确为尚未公开发布；推广段落明确为构想，没有虚构用户数、下载量或转化表现。
- 简历 bullet、项目顺序、PDF、六个既有详情页、`publication/home.json` 和 `site/LINKS.json` 均未修改。新增仓库外链会使四份锁定简历快照失效，因此本版暂不加入新的外链。

## 素材与公开边界

来源 SHA 与精确文件见 [AGENTS.md](AGENTS.md)，公开文件的逐项 SHA-256 见 `site/assets-manifest.json` 与 [dist-manifest.json](dist-manifest.json)。Lecture Asset 影片仍在上游 PR #18 导演审阅中；用户已明确要求使用已有宣传片做在线预览，本站展示为去下载结尾的“宣传片节选”。原始片和检查帧留在 Git 忽略的 `tmp/`，未进入 `site/dist` 或 Git 提交。

## 本地验收

| 检查 | 结果 |
|---|---|
| `npm ci` | 锁定依赖安装完成 |
| `npm run check` | Astro 31 文件，0 error / 0 warning / 0 hint |
| `npm test` | 32/32 通过 |
| `npm run test:jd` | 9/9 通过，简历来源快照保持一致 |
| `npm run build` | 9 页；公开输出审计通过 |
| `node site/scripts/check-alignment.mjs` | 原三作品、六案例及事实信号通过 |
| `npm run test:gallery` | 375/1366 两断点、16 条路由、两组轮播、影片解码、原三影片、弹窗焦点、reduce-motion、PDF hash、404 通过 |

发布包为 43 个文件、27,865,427 bytes，低于 32 MiB 上限；客户端 JS 3,563 bytes，低于 20 KB 上限。通用简历 PDF SHA-256 保持 `6ffad2b816e42127769360cac709ad037db7a9699f53ffad6b584bb6daaa1abf`。

旧的 `npm run test:e2e` 是 R04 文字版脚本，仍断言全站不得出现 `script, iframe, img, video`，与已接受的 R07 媒体画廊冲突；本轮运行后如实记录为历史脚本不适用，而以现行 `test:gallery` 和生产输出审计为发布门禁。`node resume/scripts/check.mjs` 在新的隔离工作区缺少未跟踪的 `resume/exports/*.latest.json` 而无法启动；没有重建或修改锁定 PDF，实际公开 PDF 与 manifest SHA-256 一致。

## 发布与线上验收

- PR：[#26](https://github.com/Zhangsfish/pre_training/pull/26)，分支 `maintenance/independent-apps-showcase`，截至本报告仍开放、未合并；`main` 保持 `b247d040ee8e598b799150557f0388fe727f59d0`。
- 站点源码提交：`f1188a996d8ce5c9749fa76a71b5a7b0172b9c91`。从此提交对应的 `site/dist` 生成静态 Build Output 包，预部署逐文件比较 43/43 SHA-256 一致。
- 原 Vercel Hobby 项目：`zhangsfishs-projects/zhang-shuo-portfolio`，Project ID `prj_CfECSSKoBni34VGDTa89UhKu4n09`。未新建项目、域名或团队，未修改 DNS、认证、analytics 或付费设置。
- Deployment ID：`dpl_rKqzBnNhKGH7dp8MXc4V6yL5QPzC`，状态 `READY`。正式地址：[https://zhang-shuo-portfolio.vercel.app/](https://zhang-shuo-portfolio.vercel.app/)；不可变地址：[https://zhang-shuo-portfolio-k2wdjb8pg-zhangsfishs-projects.vercel.app/](https://zhang-shuo-portfolio-k2wdjb8pg-zhangsfishs-projects.vercel.app/)。
- 2026-10-07 15:13–15:14（北京时间）从正式域名逐个下载 43 个文件；HTTP 200、字节数及 SHA-256 全部与本地审计包一致，见 [production-resource-audit.json](production-resource-audit.json)。通用 PDF 线上 SHA-256 仍为 `6ffad2b816e42127769360cac709ad037db7a9699f53ffad6b584bb6daaa1abf`。
- 全新匿名 Chrome 访问正式 HTTPS 域名：375/1366 两视口的首页、六个案例和 `/resume/` 共 16 次路由均返回 200，无横向溢出和页面脚本错误。Lecture Asset → Everwhile → QQ → SPPS → KIN 顺序正确；两组轮播、图片放大/Esc、焦点恢复、Lecture Asset 影片与原有三段影片均通过真实解码；reduce-motion、PDF 下载 hash 和未知路径 404 通过。证据见 [production-gallery.log](production-gallery.log) 与 [桌面截图](evidence/production-apps-1366.png)、[手机截图](evidence/production-apps-375.png)。
- 发布命令、项目检查和部署详情分别见 [vercel-deploy.log](vercel-deploy.log)、[vercel-inspect.log](vercel-inspect.log)。原项目未连接 Git 自动部署；PR 后续合并本身不会自动替换已核验的版本。

当前外部状态：Lecture Asset 宣传片上游仍在导演审阅，应用提交 App Review 但未公开发布；Everwhile 仍在商店发布准备中。网页因此只展示宣传素材与推广构想，不提供未核实的下载入口。
