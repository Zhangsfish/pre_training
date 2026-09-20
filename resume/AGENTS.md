# R04 简历系统

继承根 AGENTS、ASSEMBLY、STYLE、PRESETS；事实与公开许可仍由策划维护。

- variants：四个可公开 baseline 的结构化选材及逐 bullet claim 侧表；不是私人投递分析。
- scripts：同输入生成 Markdown / print HTML / 可选择文本 PDF，PDF 渲染与文本检查；JD fixture 回归。
- templates：固定 A4 单栏、10.5pt、14mm 页边距。
- fixtures：明确虚构 TEST FIXTURE，只测试选材，不是实时招聘。
- exports（Git 忽略）：四版 PDF、Markdown、HTML、PDF 渲染和机器检查；实际定向材料也仅本地保存。
- publication/resume-manifest.json：唯一公开 general PDF 的日期、hash 和输入指纹；生成成功不等于策划验收。

公开只允许 general-zh；其他方向 PDF 不复制到 site/public。公开审查截图可包含已许可的 baseline 内容，不包含真实 JD/私人 MATCH。生成器不读取 experience，不修改主页。源码变化后重新生成并验收；R05 已授权，复现与维护详见 ../acceptance/README.md；R06 与部署未授权。
