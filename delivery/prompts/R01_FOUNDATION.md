# R01 — 固定事实、公开内容和最小工程

## 任务

你是实施者，不重做职业访谈。为一个稳定个人网站和多个离线简历版本建立可运行地基，本轮不做完整视觉和部署。

## 必读

START_HERE、AGENTS、STATE；site/WEBSITE_BRIEF、CONTENT_ARCHITECTURE、CONTENT_CONTRACT、TECH_DECISION、LINKS、MEDIA_POLICY；PROFILE，以及kin-portfolio、jlu-spps-instrument、qq-lingxi-competition、pku-pap-pet-project、jlu-organic-lab-ta这五个experience文件。不要读完整notes、未公开论文或SPPS原始技术库。

## 允许改动

publication/、site工程文件和测试、site/assets-manifest.json、site/LINKS.json的验证字段、必要.gitignore、delivery/audits/R01/。PROFILE/experience、架构合同、STATE、后续prompt只读；发现事实疑问在REPORT提出，不自改。

## 实施

1. 建publication/profile.json、claims.json、四案例+teaching短稿和home.json。把现有材料翻译成简洁中文，事实与本人/同伴/AI贡献分开。KIN H1/H2/H3不重新发明；外链从LINKS取。
2. 本轮公开稿统一draft，等策划审查再批准；draft只是尚未完成编辑审查，不允许包含本来不该公开的内容。敏感内容不可进PR。实现显式本地review模式：`npm --prefix site run review:build`输出`site/.review-dist/`（gitignore），可展示这些public-safe draft；生产build拒绝发布未批准的必要内容。不得用noindex替代排除。
3. 初始化最小Astro静态项目，版本用当下官方支持组合并lock。最小首页先显示身份、四案例索引、教学双Notion入口和邮箱。此为review shell，不做四个详情页面的大段实现；案例待做不能是无说明死链接。
4. 建内容校验：引用/source存在，ID唯一，排除项不入默认输出，三条必需外链存在；增加故意缺claim、unknown冒充成果、excluded项目误入首页、未批准内容误发生产的负例测试。
5. 建assets-manifest：原片private_archive/pending，path=null；不填写不存在的公开文件。不得去Library找不到就向用户重传索取。
6. 匿名检查QQ仓库/两个Notion链接；网页需确认不是仅HTTP200登录壳。网络/权限限制记未证实，不改地址。没有公开Demo真实URL就只显示仓库链接。
7. `check`、`test`、`review:build`实跑；生产build在draft未获批时应按设计失败，该负例是预期，不伪报正式build已PASS。留一张桌面、一张手机review shell截图。

## 报告与停止

按ROUNDS和REPORT模板提交codex/R01及PR，报告注明“内容待审”。审查者核对原始事实、批准公开稿并合入后，下一轮才做视觉。不要为了提前通过自把publication改approved。R01要通过的是内容正确与工程合同可执行，不是网站已发布。
