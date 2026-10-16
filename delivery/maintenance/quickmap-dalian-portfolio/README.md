# QuickMap × Codex：大连北极航线静态案例交接

此包按 [个人主页更新交接](../portfolio-update-handoff/README.md)实施。**页面是静态作品案例**；它展示已运行的 Windows 原型和真实截图，不在网页上调用 Codex，也不把 QuickMap PR #2 当成已发布版本。

## 提交材料（对应更新模板）

| 项目 | 本次确认的内容 |
| --- | --- |
| 类型与位置 | 新增项目；首页 App 区第 3 项，原有三项主画廊顺序不变；增加 `/work/quickmap/` 与 `/en/work/quickmap/` 两页 |
| 中英文名称 | QuickMap｜让地理问题在地图上得到回答 / QuickMap \| Answering geographic questions on a map |
| 一句话 | 把地理问题的文字解释、示意图层和来源放在同一视野里；用大连港与北极航线为例 |
| 阶段 | 2026-10-16 时为 Windows 本地原型，相关功能在 [QuickMap PR #2](https://github.com/Zhangsfish/QuickMap/pull/2) 审阅中；本网站仅是静态展示 |
| 分工 | 用户提出需求、选题和验收要求；Codex 协助调研、实现与验证。文案不声称用户独立编写全部代码 |
| 媒体 | `site/public/media/quickmap-dalian-arctic.png`，用户 QuickMap 原型窗口截图，来自 PR #2 的 `docs/screenshots/arctic-dalian-1280.png`；当前只有中文原型画面，英文页明确标注 |
| 发布 | [PR #31](https://github.com/Zhangsfish/pre_training/pull/31) 已合并；2026-10-16 已部署到[正式站点](https://zhang-shuo-portfolio.vercel.app/work/quickmap/)，详见[发布记录](RELEASE_2026-10-16.md) |

## 访客看到什么

首页 QuickMap App 卡片用一张真实窗口图引到详情页。案例页从“北极航线会让大连港受益吗”开始，解释 Codex 对话如何给 QuickMap 发送含段落、`layerIds` 与来源 ID 的结构化回答。地图显示大连、白令海峡、鹿特丹和北线/南线的**方向示意**，正文解释已有航次、可能运输的货类及季节性、船舶、保险和货源约束。点击截图可查看原始尺寸。

表述边界：2013 年大连出发并抵达鹿特丹、2024 年大连至阿尔汉格尔斯克集装箱航线有辽宁省交通运输厅记录；2018 年铁板桩从**营口**出发，不能当成大连常态货种。海冰减少不等于全年安全通航，大连可能受益不等于港口收益已经增长。图线不是 AIS 航迹或航行建议。

## 文件与来源

- 事实层：`experience/quickmap.md`；已核对的站点 claim：`publication/claims.json` 中 `quickmap.*`。
- 中文/英文公开稿：`publication/projects/quickmap.md`、`publication/en/projects/quickmap.md`。英文文件记录中文 SHA-256；两语页面共用既有 `CasePage`、`HomePage` 与 `BaseLayout`。
- 外链唯一来源：`site/LINKS.json` 的 `quickmap-*`。媒体哈希与公开许可登记：`site/assets-manifest.json`。
- 路由、内容门禁、sitemap、端到端检查均已接线；本地截图见 `evidence/`，测试结果见 [REPORT.md](REPORT.md)，正式站点验收见[发布记录](RELEASE_2026-10-16.md)。
- 项目功能证据：[QuickMap PR #2](https://github.com/Zhangsfish/QuickMap/pull/2)，地图回答样例在 `docs/examples/arctic-dalian-answer.json`。

官方事实来源：[辽宁省交通运输厅 2018 航次](https://jtt.ln.gov.cn/jtt/fw/jtxw/414B399A24DF44BF89A4B15A17FC9AC8/index.shtml)、[辽宁省交通运输厅 2025 答复](https://jtt.ln.gov.cn/jtt/zfxxgk/fdzdgknr/jyta/srddbjy35/szxssjschy2025n/2025090914053263501/index.shtml)、[NSIDC 2026 年海冰观察](https://nsidc.org/sea-ice-today/analyses/stranger-things-2026-arctic)、[IMO 极地规则](https://www.imo.org/en/ourwork/safety/pages/polar-code.aspx)。核对的是各来源支持的特定航次和航行条件，不把一篇报道的航程/成本数字外推到所有航线。

## 交给下一个对话

先审 [REPORT.md](REPORT.md)、[发布记录](RELEASE_2026-10-16.md)与中英文截图，再看 [PR #31](https://github.com/Zhangsfish/pre_training/pull/31) diff。若 QuickMap PR #2 合并或交互方式变化，更新 `experience/quickmap.md`、claims、两语公开稿及状态；重新计算英文源哈希并跑门禁。后续生产改动仍按[主页发布交接](../portfolio-update-handoff/README.md)逐次验证与发布。页面当前不嵌入实时地图或开放式问答。
