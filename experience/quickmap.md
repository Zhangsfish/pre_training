# QuickMap · Codex 驱动的地图图文回答

## 问题与角色

2026 年 10 月，我希望能在 Codex 里提出地理与运输问题，让 QuickMap 地图和文字回答联动。以“大连港会因北极航线受益吗”为例，我提出问题、交互目标和验收要求；Codex 协助检索资料、实现原型及验证。我不是独立编写全部代码的人。

## 已有原型与证据

QuickMap 的 `feature/hormuz-story-map-codex` 分支在 PR #2 中加入本地 Codex 对话到地图的结构化回答入口。回答文档将段落、地图图层和来源 ID 关联；地图端校验后展示文字与示意图层，可从正文定位地图。大连例子及 1280、1920 像素窗口截图在该 PR 的 `docs/examples/` 与 `docs/screenshots/`。本机曾对该原型运行测试与打包；它仍在 PR 中，不能描述为默认分支或公开发行版的功能。

## 大连案例的事实边界

辽宁省交通运输厅记录：2013 年“永盛”轮从大连港出发，经北极东北航道抵达鹿特丹；2024 年有大连至俄罗斯阿尔汉格尔斯克的集装箱北极航线。2018 年营口的铁板桩航次是另一港口、另一年份，不代表大连常态货种。海冰变化不能推出全年安全通航或大连港收入必然增长。截图中的北线与经苏伊士南线都是地理方向示意，不是 AIS 航迹或通航建议。

## 上游公开依据

- QuickMap PR #2: https://github.com/Zhangsfish/QuickMap/pull/2
- 辽宁省交通运输厅 2018: https://jtt.ln.gov.cn/jtt/fw/jtxw/414B399A24DF44BF89A4B15A17FC9AC8/index.shtml
- 辽宁省交通运输厅 2025: https://jtt.ln.gov.cn/jtt/zfxxgk/fdzdgknr/jyta/srddbjy35/szxssjschy2025n/2025090914053263501/index.shtml
- NSIDC 2026-10-07: https://nsidc.org/sea-ice-today/analyses/stranger-things-2026-arctic
- IMO Polar Code: https://www.imo.org/en/ourwork/safety/pages/polar-code.aspx
