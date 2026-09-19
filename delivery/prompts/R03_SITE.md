# R03 — 一个完整网站，四个案例和教学作品

前置：R02 accepted，selected_design非null，R03已授权。只把选中的方向变成最终网站，不重开审美，也不按岗位复制网站。

## 必读

AGENTS、STATE、R02 review；CONTENT_ARCHITECTURE、CONTENT_CONTRACT、TECH_DECISION、MEDIA_POLICY、LINKS、publication、assets-manifest。

## 实施范围

1. 完整首页S1–S6；四个work详情；404；通用resume页面骨架。PDF尚未生成时明确“简历整理中”而不提供假下载按钮，R04替换。
2. KIN第一段及首卡突出H2；详情准确展示H1/H2/H3→产品表达/取舍，竞争证据后置。不要把竞品存在等同核心洞察被否定。
3. SPPS用有出处的实拍/运行片，标本人高层逻辑及机电协作。原始稿/屏幕图不能外泄。没有获准可用图时，将该媒体项列阻塞，继续其余页面。策划者可明确决定文字版/安全示意图版，实施者不得以占位宣告媒体交付完成。
4. QQ灵犀本地详情与公开GitHub链接必有；试图找到Demo时只用真实仓库信息，匿名测试成功且许可可公开才添optional_live_demos。不要生成伪地址、暴露BasicAuth或API key；不在本站重建后端。
5. 教学区两个Notion按钮必须可见，有名称与历史课程说明。外部页面不可控，本地摘要自足；不抓取课程全文。
6. PET仅高层经过与状态：一作稿件准备投稿、专利阶段未知；不贴结构/图谱，不扩大导师资源为本人关系开发。
7. 状态标签、贡献说明、证据链接、图片尺寸、focus、手机导航、reduce-motion均完善。正文取自publication，不复制一套到组件。

## 测试

check/build/test/e2e；四详情+首页+404+resume骨架都能直接访问。375/768/1440真实截图；320不溢出；键盘能到三条必需外链；无JS可读。媒体controls可用、首屏不下载MP4、无第三方字体/运行API。删除未选视觉方向的生产路由。

报告分开记录网站完成、媒体/外链限制、简历下载等待R04。不要以缺KIN独立网站或外部Demo不通为由让个人网站整体停摆，已确认仓库链接是有效fallback。只交codex/R03，不部署。
