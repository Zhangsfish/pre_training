# R03 — 一个完整网站，四个案例和教学作品

前置：R02 accepted，`selected_design = A`，R03已授权。

**固定设计方向：A — 编辑式作品档案。**
不要再做A/B/C比较，不把B/C保留为生产主题、切换器或隐藏路由。R03的目标是把A扩展成唯一完整网站。

## 必读

AGENTS、STATE、`delivery/reviews/R02-a02.md`；CONTENT_ARCHITECTURE、CONTENT_CONTRACT、TECH_DECISION、MEDIA_POLICY、LINKS、publication、assets-manifest。只按需回看对应experience，不重新采访用户。

## 实施范围

1. **完整首页 S1–S6**：首屏、四主案例、教学/Notion、How I Work、教育、联系。首页保持当前稳定顺序 KIN → SPPS → QQ 灵犀 → PET。
2. **四个详情页**：`/work/kin/`、`/work/spps/`、`/work/qq-lingxi/`、`/work/pet/`。详情不是把experience全文复制出来，而是按CONTENT_ARCHITECTURE压缩成可读案例。
3. **KIN**：首卡和详情开场优先H2“普通一天值得被看见”；H1/H2/H3是用户原始洞察。竞品/爱牵挂只在后段作为研究检查，不得写成洞察来源或已证明商业成功。
4. **SPPS**：突出实体系统交付、需求/选型/采购/接口/高层时序/测试；低层驱动和部分机械由协作者完成。未经审查的150万元、10倍、95%等数字不得出现。
5. **QQ灵犀**：必须有本地详情 + 可见GitHub仓库链接。产品定义/系统逻辑归用户；大量工程实施归ChatGPT/Codex。复赛不是获奖冠军，示例数据不是用户数。没有真实匿名Demo就不写“立即体验”。
6. **教学区**：两个Notion按钮在首页明确可见，并保留历史课程资料说明；本地摘要自足，不抓取Notion全文。
7. **PET**：一作稿件已交导师、准备投稿；外部医院关系由导师建立，大设备已有；用户补齐日常耗材/操作体系、参与实验设计与执行。不得写已投稿/发表、不得公开化合物/专利细节。
8. **resume页骨架**：`/resume/` 先提供可读通用简历结构/“R04生成PDF”状态。PDF尚未生成时不得挂假下载链接。
9. **404、导航、联系**：所有页面可直达；手机导航简单，不做花哨菜单。
10. **A视觉延展**：保留R02 A的编辑式浅底/深字/强排版、平行证据气质。允许为完整站调整组件、节奏和层级，但不重新发明第二套美术方向。项目详情应像同一本作品档案，而不是四套不同模板。

## SPPS媒体

当前STATE仍是 `private_archive / pending_review / bridge_pending`。

- 没有planner批准的Git可读衍生物时，继续用明确的开发占位或安全文字版；不要向用户重新索要原片。
- 不生成“像真的一样”的假仪器图。
- 如果本轮除SPPS媒体外都完成，REPORT明确列为单项媒体缺口；不要因此停掉KIN/QQ/PET/教学/响应式工作。
- 如planner在R03过程中补交已批准衍生物，则只按assets-manifest登记的文件集成。

## 工程约束

- Astro静态站、TypeScript严格模式、普通CSS token、最少JS。
- production中删除/不注入R02候选路由和review bar；A只能作为正式组件/样式存在。
- 运行时不访问GitHub/Notion API，不加远程字体、analytics、聊天机器人、账号/数据库。
- 正文只读publication；链接只读LINKS；媒体只读approved assets manifest。
- 首页初始不加载MP4；图片有尺寸/alt；视频若有则controls且不自动有声播放。

## 测试与截图

必须实际运行：
- `npm --prefix site run check`
- `npm --prefix site run build`
- `npm --prefix site run test`
- `npm --prefix site run test:e2e`

E2E至少覆盖：首页、四详情、resume骨架、404；375 / 768 / 1440真实截图，320无横向溢出；键盘focus；JS关闭仍可读；两个Notion和QQ仓库href可见；无未授权媒体/私有字段/内部source metadata泄漏。

额外验收：
- 首页30秒层：姓名、2027届、四案例定位和入口在首轮浏览中可理解；
- KIN首段不被竞品叙事抢走；
- 四项目不会全写成同一个“0→1”模板；
- B/C review路由、review bar、候选CSS命名不进入production；
- `/resume/` 不出现不存在的PDF按钮。

## 交付

只在 `codex/R03` 分支提交：
- 完整网站代码；
- `delivery/audits/R03/REPORT.md`；
- evidence.json；
- 必要的真实页面截图/测试日志。

创建PR后停止。不要进入R04，不部署，不自行修改STATE或事实层。