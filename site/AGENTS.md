# R03 网站工程

继承根规则与只读架构合同。唯一视觉方向 A；只从 publication、LINKS 和已批准素材登记构建。无运行时 API。

- src/lib/site.ts：Astro 内容集合与显式公开字段；仅投影获准正文。
- src/layouts/BaseLayout.astro、styles/tokens.css/global.css：唯一编辑式档案布局。
- src/pages/：首页 S1–S6、四详情、resume骨架、404。
- scripts/content.mjs：内容合同、发布状态、来源漂移与字段门禁。
- scripts/sections.mjs：批准正文分段；KIN竞争检查放在后段，不生成新事实。
- scripts/build.mjs、audit-dist.mjs：构建及公开输出/路由/预算门禁。
- scripts/site-e2e.mjs：56组真实浏览器检查及截图；scripts/check-links.mjs：独立匿名外链检查。
- tests/：合同负例、正文保真与输出拒绝测试。

R02候选实现已移除，历史证据留在 delivery/audits/R02。当前证据仅写 R03。依赖版本不变。SPPS媒体仍未获公开许可/桥接，使用文字版。resume不生成PDF，未进入R04；不得部署。
