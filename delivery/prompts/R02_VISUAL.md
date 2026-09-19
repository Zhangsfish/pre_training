# R02 — 用真实页面选视觉，不用口头选模板

前置：R01 accepted、当前轮R02授权、public-safe公开稿已批准。若内容仍draft，先报告缺口，不自批准。

## 必读

AGENTS、STATE、CONTENT_ARCHITECTURE、TECH_DECISION、MEDIA_POLICY、R01 review和publication。已知事实不再采访。

## 工作

实现三个小型方向：A编辑式作品档案（推荐）、B产品案例展厅、C简洁研究札记。每案只做同一首屏+KIN/SPPS项目示例+教学双链接的一小段，结构/图文比必须不同，不仅换色。

三个方向共享同一数据；不用生成虚构设备/客户照片。SPPS只有已获公开许可的派生物才能进入公开分支/截图。尚无图就开发态标示“实拍素材整理中”，不能假装成品。媒体交接由策划端处理，不让用户重传。

预览方案放site的review-only实现，不能在生产getStaticPaths、sitemap或dist出现。选定后只保留一个正式tokens.css与布局；其他方向只留审查截图而非三个网站。

## 视觉验收

每案必须真实运行，保存1440×1000和375×812截图，共6张；另看768布局。第一屏看见姓名、具体价值和项目入口；无横向滚动、超长口号、装饰性软件墙；文字不得依赖hover。关闭JS仍能阅读主内容。

给出你推荐哪个方向及一个具体原因，不能替用户选择。不要进入完整案例开发。

## 交付

允许改site/review实现、样式/必要组件、tests、delivery/audits/R02；不改事实/STATE。check/test/review:build/e2e实跑，按模板交codex/R02。

审查者先排除事实/实现问题，再向用户展示A/B/C实际截图，获得一次选择并记入STATE.selected_design。未选定时结论NEEDS_USER，不自行开始R03。
