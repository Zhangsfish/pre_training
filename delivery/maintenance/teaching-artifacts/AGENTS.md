# 教学作品网站展示（2026-10-25）

本目录为个人网站 `/work/teaching/` 增加两套期末试题与两份专题课件的展示。上游为本人当日补充、四份私人原件及 `experience/jlu-teaching-portfolio.md`。从 2026-10-16 的远端 `main`（`ab71d22`）实施，PR #34 合并为 `9694fa5`；2026-10-25 已部署到正式站点，详见 `RELEASE_2026-10-25.md`。

## 当前口径

- 两卷分别为《有机合成实验 I（荣誉）》上学期和《有机合成实验 II（荣誉）》下学期期末试题。本人编写。网站只提供试题页的逐页、不可辨题的模糊 raster 预览；不复制或提供 DOCX、清晰 PDF、答题卡、答题纸下载。
- 两份专题课件为 MHAT 与岸义人天然产物全合成。原始 PPT 含须清理的个人标识及第三方图片；仅审校后的 PDF 可公开下载。
- 无真实资产时只显示“审校中”，不显示下载假链接。资产到位后，需登记每个 JPEG/PDF 的源哈希、公开衍生哈希、真实路径和 `public_review` 状态。

## 文件地图

- `experience/jlu-teaching-portfolio.md`：可公开事实记录，不含原件。
- `publication/teaching-works.json` 和 `publication/en/teaching-works.json`：四件作品的双语标题、描述、来源 claim 和对应公开资产 ID。
- `publication/claims.json`：两条作品归属 claim，指向经历文件的 Git blob SHA。
- `site/src/components/CasePage.astro`：教学页专属展示、逐页预览和真实 PDF 下载按钮。
- `site/src/styles/gallery.css`：卡片与横向预览样式。
- `site/scripts/content.mjs`、`site/scripts/audit-dist.mjs`：出版状态、资产路径、审核标记、文件头和 SHA256 门禁。
- `site/tests/content.test.mjs`：禁止原卷下载与未审校课件下载的负例。
- `public_asset_manifest.json`：资产代理交付的最终清单，列出四份原件哈希、两份 42 页公开 PDF 和 39 张缩略图的哈希；其中仅 `downloads/*.pdf` 与 `previews/*.jpg` 可复制到站点。
- `REPORT.md`：实施、校验与安全边界；`RELEASE_2026-10-25.md`：干净 checkout、暂存部署、正式推广和线上响应证据。

## 验收与未完成

1. 仅复制不可逆模糊的试题 JPEG 与已去旧学号、邮箱、备注、他人肖像致谢页的两份 42 页讲座 PDF；原始 DOCX/PPTX 不入站。I 卷只含试题页 1–21、II 卷只含 1–18，已按真实页数登记 39 张预览。
2. 逐项核对清单 SHA256、JPEG/PDF 文件头，并人工检查预览模糊程度、无答题纸；PDF 需查可提取文本、备注和属性中的旧标识。`public_review` 是人工审核记录，不独立证明安全。课件保留原页文献引注；用户本轮明确表示这些本人制作的课件可以公开下载，未逐图审查第三方配图的权利链，网站不得声称全部图式为本人原创。
3. 运行内容校验、类型检查、单测、静态构建和 `audit:dist`；在真实浏览器检查四件作品、逐页预览、两份下载、手机布局及站内 404。
4. 本维护已手动更新现有 Vercel 项目；其 Git 自动部署仍未连接。后续修改须重新构建、审计并部署，合并 GitHub PR 不会自动更新正式域名。
