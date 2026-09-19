# R02 视觉方向

依据默认分支 START_HERE、AGENTS、delivery/STATE.json、R02_VISUAL 及 R01-a02 验收。A/B/C 只比较同一首屏、KIN/SPPS 摘要和教学双链接；数据来自已批准 publication，不复制另一套事实。

- `routes.mjs`：仅 review 模式 injectRoute 三条候选路由；生产模式注入零条。
- `Direction.astro`、`components/`、`directions.css`：三种版式与共享内容组件。
- `a.astro` / `b.astro` / `c.astro`：固定三案入口，无生产 getStaticPaths。
- `e2e.mjs`：真实浏览器、内容一致性、无JS、响应式与生产排除验证。

媒体未获批准，不引用原片，SPPS统一“实拍素材整理中”。本轮不选定设计，不写 selected_design。用户选定后由后续授权工作保留一个正式布局/tokens，候选实现应删除，只保留审查截图。
