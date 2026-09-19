# Resume assembly — 一个事实库，多份简历

## 产品边界

网站固定；简历随JD重新选材和排序。不把一份通用简历仅换岗位名后当定向版，也不为每次投递重做主页。

`resume/MASTER.md`仍是经历全集/内容壳，不等于一页成品。`publication/claims.json`提供可用事实；每份简历只能重组与表达，不能发明经历。

## 版本

R04制作四份中文baseline：general-zh、product-commercial-zh、brand-insight-zh、ai-product-zh，取舍见PRESETS。后面每个真实JD生成application variant，不无限增加baseline。

公开网站默认只提供general-zh。其他PDF保存在gitignored的resume/exports或generated_private供用户投递；不能仅靠noindex保护，不得自动暴露公司投递清单。需要公开某版本时，用户/审查者明确加入导出allowlist。

## 同一输入，两种产物

每份 `resume/variants/<id>.json` 包含：id/locale/preset/target_label或null/selected_claim_ids/section_order/experience_order/bullets（text+claim_ids）/source_snapshot/approved_for_export。

PDF由同一结构生成print HTML后导出；Markdown为可编辑内容源。可选DOCX也必须来自同一JSON，不能手工另改事实。

输出名：`zhang-shuo_<variant>_<YYYYMMDD>.pdf`。公开general副本固定为site/public/downloads/zhang-shuo-resume.pdf，hash和日期记publication manifest，避免按钮指向旧版本。

## 针对真实JD的最短流程

1. 读取原始JD，保留来源/获取时间；需要登录/权限时说清，不编造职责。没有JD时只生成baseline。
2. 提取最多5项真正需要的能力/任务，分must-have与preferable，不制造假量化匹配分。
3. 从事实库选最相关的2–4段经历；写短MATCH，说明为什么选、不选及缺口。不能把听课变成会计工作、研究原型变成上市销售、大学同伴变成直属团队。
4. 每条bullet写本人行动＋问题/限制＋可证明结果，关联claim_ids；术语可换，身份、数量、状态不变。
5. 渲染PDF，检查一页、字不挤、中文可提取、链接和年月正确。提交原始JD、选材输入、对照说明、PDF和审查证据；不自动投递。

若MATCH含私人判断或招聘者联系方式，留generated_private。该公开仓库可以保存脱敏JD fixture、版式、通用选材、公开事实，不要假装applications文件夹是私密空间。

## 固定版式

遵守STYLE：A4、一页、单栏、黑白、无头像/技能条/表格排履历、正文10–12pt。姓名、2002.01、电话、邮箱；教育先列。北大不加GPA/荣誉；吉大保留3.85/4.00、4/27；英语默认CET-6 502。项目链接在项目旁。

每个baseline按相关性最多4个主项目；TA视岗位替换或压成一行，不要求每份收齐。写不下先删弱项/重复句，不自动缩字或去掉成果状态。未确认起止月可不列该非核心项目日期，不能拿repo首次commit冒充开始时间。

## 验收

每页全量视觉检查；至少提取姓名、两段教育、项目标题、关键数字并核对阅读顺序；链接注释可点；无黑块/缺字/裁切；正式PDF不含审计语、tool citation、TODO或内部路径。

R04用两个明确标为测试的JD fixture验证选材确实不同，不能声称那是宝洁/安克实时招聘JD。不承诺ATS必过；只证明结构简单、文本和顺序可解析。真实投递前仍读该岗位原文。
