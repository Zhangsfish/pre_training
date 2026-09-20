# Codex 接手：主页内容对齐的终验与原站发布

## 授权与入口

用户本轮明确授权：依据最终经历核对主页、参考上传方案、沉淀合并方案、完成能够完成的修改，其余交给本地Codex。本分支已完成内容和代码修改；不要从头策划或重新采访。

- 仓库：Zhangsfish/pre_training
- 分支：maintenance/home-experience-alignment
- 本轮起点main：178b5ae9bfaa0ae49430f037f9370a6066bd4464
- 生产域名：https://zhang-shuo-portfolio.vercel.app
- 先读本目录01、02、03及REPORT，再读根/相关子目录AGENTS。
- 保持现有Vercel项目、免费范围、原域名；不改DNS，不调整访问认证，不另建站点，不修改KIN或QQ仓库。

原R07为历史验收，不代表本分支已验收。此维护任务以本文件及根AGENTS的新用户授权为准，不被旧“无下一轮授权”文字误导；也不得把本轮自报检查改成用户验收。

## 已做

1. 首页保留QQ → SPPS → KIN三部媒体作品；增加紧凑身份、作品后的个人表达与教学/PET/全合成短入口。
2. 六项案例均有完整详情；KIN保留产品定义、状态消费、市场分析和AI时代流量判断；SPPS写清整机负责人；QQ补齐平台战略、ChatGPT与累计约10天；教学、全合成和PET按最终事实。
3. 通用简历网页/PDF和四个baseline的既有项目表达同步；最终BRM长短稿未改。PDF已嵌入OFL字体子集，使用绝对项目链接；不是最终六段BRM投递版。
4. 内容来源、claim引用与快照已校验。没有覆盖旧R07审计，也没有更新媒体原片。

## 当前环境的真实阻塞

- Vercel连接对原项目空间明确返回403，不具备权限；未部署、未改配置、未换帐号或项目。
- 云浏览器能审阅现有线上站和KIN展示站，但访问本地127.0.0.1预览被客户端阻止。未通过其他浏览器绕过；本分支桌面/手机页面、键盘、媒体和折叠交互需要你完成。
- QQ独立Demo已有Basic Auth限制，保留“需访问权限”标签。本地视频/案例是主要入口，不以解除认证为验收条件。

## 你要完成的步骤

1. 保留用户未提交改动，fetch本分支，比较最新main；有重叠变更先人工合并。检查本PR与事实差异，不回滚用户最终表达。不要直接hard reset。
2. 使用现有Node与锁文件安装/核验site依赖。Python依赖见resume/requirements.txt；如用专用环境，设置RESUME_PYTHON。
3. 从仓库根执行：

   ```text
   npm --prefix site run check
   npm --prefix site test
   npm --prefix site run test:jd
   node resume/scripts/build.mjs --date 2026-09-20 --verify-published
   node resume/scripts/check.mjs
   npm --prefix site run build
   node site/scripts/check-alignment.mjs
   ```

   不要运行旧验收脚本去覆盖本轮PDF，也不要要求新首页与旧R07截图逐字相同。

4. 启动真实Astro预览：`npm --prefix site run preview -- --port 4321`。按你环境的浏览器规则验收，并可运行已扩展的`npm --prefix site run test:gallery`。如要留截图，设置GALLERY_EVIDENCE_DIR为本目录下的新attempt，不写入旧R07。
5. 至少375px和1366px检查：首页无横溢出，首屏不因身份文字过高而淹没作品；三个媒体顺序不变；关于与辅助项目均可到达；六详情页有正文；KIN市场判断默认展开；其他详情折叠能操作；字体、断行、空白合适。必要时微调CSS，不重写已确认事实。
6. 检查三影片真实解码、切换场景、放大、Esc关闭、焦点恢复、减少动态设置；QQ提示访问权限；KIN独立体验、两个Notion、简历PDF、真实404。PDF检查一页、无缺字/裁切、所有文字可选、链接可用。
7. 终验通过后，在用户已授权的原Vercel项目完成集成和发布。如你也无权限，停止并说明，不新建替代站。不要用合并触发部署来绕过已经明确失败的权限。
8. 正式域名核验与本地dist一致，记录commit、Deployment ID、测试/截图证据和PDF SHA256，更新本维护REPORT/STATE。只在有证据后宣告“已上线”。

## 禁止回退的事实与表达

- KIN不能退回只讲H1/H2/H3和“尚未上市”；保留未接电话场景、生活状态解释、市场与入口判断。采用情景不写成现有用户数；不把MAU直接和DAU比较份额。
- SPPS整机方案、选件和接口由本人定义；跨专业协作者按要求配套交付。88%只适用于FEP样例，150万为约数资源规模。
- QQ约10天是累计集中投入，不是连续日历工期。对外统一ChatGPT，不把AI工程实现写成本人亲手编码。
- PET第一作者初稿、拟投JMC、预计两项专利申请；不得写成已投稿/录用/授权。68分钟半衰期、约4小时有效工作窗口，不写成4小时后放射性归零。
- 不新增公开实验结构、私人经历、工具密钥或简历外的联系方式字段。
