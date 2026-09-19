# R04 — 多版本简历，不改个人主页

前置：R03 accepted、R04授权。任务不是再写履历问卷，也不是自动投递。

## 必读

AGENTS、STATE、PROFILE、publication/claims和projects；resume/STYLE、ASSEMBLY、PRESETS；必要时回看对应experience的ownership。site结构不重新设计。

## 交付

1. 同一结构化选材输入生成四份中文baseline：general-zh、product-commercial-zh、brand-insight-zh、ai-product-zh。每份至少说明纳入/删去/排序理由，每条bullet带claim_ids侧表。不要因为原文长就写成五页。
2. 固定一页单栏排版，生成print HTML、可编辑Markdown、可选中文本PDF。用Playwright导出并逐页渲染检查。PDF不是网页截图。无须等真实JD才能做好baseline。
3. 按ASSEMBLY.md规定字段：姓名、出生年月、电话/邮箱；北大教育状态和吉大GPA排名；不添籍贯、精确学位或未经确认项目年月。四级默认不占位；无技能墙。
4. 通用版接入/resume/与唯一公开PDF路径；其他版本输出到gitignored的resume/exports，不自动进网站、不做主页岗位切换。REPORT给实际本地输出路径和hash；公共审查只附可公开baseline的逐页截图/文本核对结果，不上传私密投递分析。
5. 建两个标明TEST FIXTURE的JD（产品商业/消费者洞察方向）做回归：必须导致不同选材/顺序；所有claim都合法，首页身份与项目顺序完全不变。不把fixture冠成宝洁或安克真实在招。
6. 使后续 `delivery/prompts/JD_RESUME.md` 可复用：输入JD→选择claim→生成variant→PDF→审查。需要用户提供JD只发生在真实定向投递时。

## 验收

每份PDF恰一页；不能以小于10pt正文/极窄边距作弊。所有页面真实渲染检查，无缺字/黑框/溢出；抽取文本核对姓名、两校、关键状态及阅读顺序；project链接可点击。4份PDF各有截图。JMC不能变published/submitted；QQ不能变获奖；SPPS不写已核实150万元/90%节省。

check/build/test/e2e/resume:build/resume:check与JD fixture测试实际运行。DOCX可暂缓，Markdown源已提供；雇主确需DOCX时同JSON导出，另作渲染验收。

允许改resume模板/variants/scripts、publication中已获批准的选材表达、site/resume页与通用下载、相关测试和本轮audits；不改事实、不改主页结构。交codex/R04并停止。
