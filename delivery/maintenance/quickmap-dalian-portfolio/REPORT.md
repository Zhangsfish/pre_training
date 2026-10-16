# QuickMap 大连案例实施与验收报告

## 变更范围

- 基于 `pre_training` 默认分支 `09b7286`，新增 QuickMap 事实记录、可审阅 claim、中英文详情、首页 App 卡、公开截图与来源链接。
- 两语详情新增显式路由、站点地图和输出审计白名单；三个既有主画廊作品及补充经历顺序不变。
- 旧 PET 公开稿的历史冻结改为核对 PET claim 子集哈希，使新站点专用 claim 不解除原有冻结；相关负例测试通过。
- 站点专用 claim 和链接追加后，四份简历 variant 的来源快照同步更新。公开简历 PDF 按原批准内容重建；新旧 PDF 的提取文字、A4 页数与 120 dpi 渲染像素完全相同，公开 PDF 哈希与新输入快照一致。未加入 QuickMap 简历条目。

## 已验证

| 检查 | 结果 |
| --- | --- |
| `npm --prefix site run check` | 通过，42 个 Astro 文件 0 错误/警告 |
| `npm --prefix site test` | 33/33 通过 |
| `npm --prefix site run test:jd` | 9/9 通过 |
| `npm --prefix site run build` | 20 个静态页面生成；公开输出审计通过 |
| `node site/scripts/check-alignment.mjs` | 通过，新 App 与第 7 对案例接入 |
| `npm --prefix site run test:locale` | 44 项页面/语言检查通过；含 QuickMap 两语路由与 375、1366 像素视口 |
| `npm --prefix site run test:gallery` | 375、1366 像素视口的案例路由、首页进入案例、图片和既有媒体检查通过 |
| `node resume/scripts/build.mjs --variant general-zh --verify-published` | 通过，新公开 PDF 可复现 |
| `npm --prefix site run resume:check -- --variant general-zh` | 通过，A4 单页、文本顺序、链接、字体与渲染检查通过 |

截图：`evidence/home-zh-{1366,375}.png`、`evidence/case-zh-{1366,375}.png`、`evidence/case-en-{1366,375}.png`。图片内容来自本地构建，不代表现有生产域名已更新。

## 发布与待验

- QuickMap 的 Codex→地图功能仍位于 [QuickMap PR #2](https://github.com/Zhangsfish/QuickMap/pull/2)；本仓库只展示该原型。没有在本次任务中重新打包、运行或验收 QuickMap Windows 程序。
- 英文案例文字已本地检查；截图是原型中的中文画面，英文页已明确标注，待 QuickMap 有英文原生画面后可替换。
- 用户在本次任务要求“更新一下吧，渲染我看看效果”后，已合并 [PR #31](https://github.com/Zhangsfish/pre_training/pull/31) 并发布正式站点。生产部署、匿名浏览器验收和回滚 ID 见 [RELEASE_2026-10-16.md](RELEASE_2026-10-16.md)。后续每次生产变更仍须遵守主页更新交接。
