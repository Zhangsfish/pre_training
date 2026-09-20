# 简历生成与复核

上游：ASSEMBLY、STYLE、PRESETS 和策划批准的 publication。四份 variants 为可公开的 baseline 选材输入；每条 bullet 的 claim_ids 与取舍理由保存在 JSON 侧表，不进入 PDF。R05 新环境安装与完整维护步骤见 [验收维护 README](../acceptance/README.md)，不再要求复用个人 Codex 缓存。

## 工具前提

沿用网站 Node 与锁定依赖。PDF 使用 Python + ReportLab + pypdf，渲染复核使用 Poppler；不再为文字打印启动浏览器。安装：`python -m pip install -r resume/requirements.txt`。网页端到端测试仍使用原 Playwright 工具。

- PLAYWRIGHT_MODULE：Playwright 模块绝对路径（不设则常规模块解析）
- CHROME_EXECUTABLE：Chrome 可执行路径
- RESUME_PYTHON：带 ReportLab 和 pypdf 的 Python（不设则 python）
- PDFTOPPM：Poppler pdftoppm（不设则 PATH）

## Baseline

从仓库根运行：

```powershell
npm --prefix site run resume:build
npm --prefix site run resume:check
npm --prefix site run test:jd
```

也可传 `-- --variant general-zh`。每份在 resume/exports 输出日期命名 PDF、可编辑 Markdown、print HTML、逐页 PNG、文本与机器核对 JSON。PDF 由 ReportLab 从同一展示模型生成，嵌入仓库中的 Noto Sans SC 字体子集，再用 pypdf 规范化时间/ID，中文可选择；不是截图 PDF。10.5pt、14mm边距，不缩放塞页。生成不代表审查通过。

唯一公开副本由 `resume:build -- --variant general-zh --publish` 更新，同时登记 publication/resume-manifest.json。该操作只写本地文件，不部署。`resume:build -- --verify-published` 重新生成并核对公开 PDF 字节。网站构建验证选材与 manifest，拒绝过期输入/其他 PDF。`/resume/` 同源生成，电话/出生年月只在这一简历页面和获准 PDF 中；首页与案例继续禁止这些字段。

项目标题使用已确认生产域名的绝对详情链接，下载到本地后仍可访问。QQ 独立 Demo 标明需要访问权限，本地案例和影片为首要入口。字体来自 Google Fonts 的 Noto Sans SC（OFL，许可证见 templates/OFL.txt），只嵌入 PDF，不增加网页字体请求。新增字符若不在子集中，导出会拒绝；使用上游完整字体执行 `python resume/scripts/prepare-font.py /path/to/NotoSansSC[wght].ttf` 后重新检查全部版式。

## JD 工作流

真实投递需先读原文和确认来源；以下只是明确 TEST FIXTURE：

```powershell
node resume/scripts/select-jd.mjs --jd resume/fixtures/product-commercial.json
npm --prefix site run resume:build -- --variant-file resume/exports/fixture-product-commercial/variant.json
npm --prefix site run resume:check -- --variant-file resume/exports/fixture-product-commercial/variant.json
```

另一个 fixture 为 consumer-insight.json。JSON 输入要求 id、label、source、acquired_at、text、最多5条 requirements（priority 为 must-have / preferable，text 为原文需求）。真实 JD 和 MATCH 留在 Git 忽略的 exports/generated_private；不能因为叫 applications 就认为私密。

selector 的明确需求词规则只选择合适 baseline，不声称智能理解或资格匹配；先用其产物作为起点，再人工按 JD 调整所选经历、bullet、claim_ids、选入/删去理由及缺口。`--variant-file` 接受这个已复核输入，严格检查 claim/来源快照/状态/归属。编辑 Markdown 可供雇主使用，但再导出须同步结构化 JSON；不能让 PDF 与事实侧表分叉。不自动投递，不改网站身份或顺序。

当前语言成绩未进入批准的 publication claims；本轮不新增 claim 审批，省略可选语言行。DOCX 未生成，需要时由同一 JSON 导出并另做渲染验收。
