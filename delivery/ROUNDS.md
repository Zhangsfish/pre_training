# 六轮交付 — 一轮、一次审查、再往前

## 当前授权

只执行STATE的authorized_round。本文件和未来prompt不是并行开工许可。一个网站工程只开一个实施会话，不启动多Agent互审链。

| 轮次 | 本轮交付 | 验收核心 | 不做 |
|---|---|---|---|
| R01 地基 | 公开事实/短稿、links/assets登记、Astro最小工程、内容校验 | 事实与归属正确，三个必需链接在，review build可跑 | 精装修、所有案例、部署 |
| R02 视觉定向 | 同内容的A/B/C首屏+一个项目模块，真实浏览器截图 | 结构差异明确、手机可读；用户选一案 | 三个完整站、未经许可原片 |
| R03 完整网站 | 一套首页、四详情、教学Notion区、媒体与联系 | 项目各讲对、交互/链接可用、只有一个最终身份 | 完整复制KIN/QQ产品、动态后台 |
| R04 简历系统 | 一页通用版+三个方向版、选材输入、PDF/Markdown、JD流程 | 同事实不同选材、PDF一页可解析、主页不变 | 自动投递、造真实招聘JD |
| R05 总验收 | clean build、浏览器/链接/隐私/简历复检、发布包 | 同一commit可复现；足够发布但尚未发布 | 用新模板重做、顺手部署 |
| R06 发布 | 获得单独授权后配置静态host并实测 | 真URL、回滚记录、线上下载和链接正常 | 未授权付费/DNS/改仓库可见性 |

R05通过意味着“作品可发布”；只有R06真实上线并实测才能说“已发布”。没有域名不阻塞R01–R05。

## 每轮Git流程

1. Codex从最新main读取STATE和对应prompt。若固定分支已有未审REPORT，停止并返回，不重写未审成果。
2. 新轮从最新main创建codex/Rxx；返工使用原分支。保留用户未提交文件，不强制覆盖、不force push。
3. 提交实现代码，得到tested_commit；在该快照上实际运行命令。真实变更后须重测。
4. 提交 `delivery/audits/Rxx/REPORT.md`（当前入口）、`evidence.json`和`attempt-01/`的日志/截图。REPORT引用tested_commit和每个证据的sha256。报告提交本身可以晚于tested_commit，但其间不允许未测试代码变化。
5. push分支并建PR；不自行merge。返回仓库、分支、PR、实现SHA、报告路径、未解决问题，然后停止。
6. 策划者读报告+实际证据+diff，写 `delivery/reviews/Rxx-a01.md`；给ACCEPT/FIX/BLOCKED/NEEDS_USER。通过后才合并，并更新STATE解锁下一轮。合并后的代码内容必须与已测试快照一致；新增实现冲突解决需要再测。
7. FIX：审查单写症状、文件/界面、验收条件；Codex同轮改，追加attempt-02，保留前次证据，不绕过门槛。

若工具不能建PR，仍须push有报告的分支，返回PR缺失并等审查者处理；不能宣称已merge。若连push也失败，只能说本地完成、远端未提交，后续轮仍锁定。

## 状态与责任

STATE由审查者维护：ready / awaiting_review / changes_requested / accepted / blocked / locked。Codex不修改授权；主分支尚未标awaiting_review但轮次分支已有报告时，同样视为待审。

`selected_design`仅在用户作出R02选择后填入。`deployment_approval`记录用户授权时间、host、公开范围和域名/费用边界；null时R06不能执行外部发布。

## 证据包保持小

每轮只有一个REPORT（尽量≤600中文字）+一个evidence.json+必要原始证据。测试日志保留实际命令、exit code、版本；不要几万字自我表扬，不复制全量聊天、私人路径或密钥。截图必须由真实浏览器生成；设计稿不能冒充已实现截图。

报告与截图也是公开GitHub内容；涉密媒体不能因为叫audit就上传。只放已允许公开的数据与截图。较大运行日志/trace可留本地，但核心裁决证据不能只有会过期的CI artifact链接。
