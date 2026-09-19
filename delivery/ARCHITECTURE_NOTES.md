# Architecture baseline notes

2026-09-20策划轮形成architecture-v1，实施尚未开始。

## 本次固定的决定

- 一站多简历。一个身份、一个首页顺序；定向只发生在简历选择层。
- 首页先KIN/SPPS两个互补强证据，其后QQ/PET；教学区独立展示两个Notion。
- KIN原始洞察优先；H2的人的生活/参与价值不被改写成单纯市场查漏，竞争检查后置。state已存在不自动证伪关系消费。
- 网站静态、无后端/账号/大模型API。公开表达与原始经历分离；只发布allowlist。
- 6轮单步实现，报告不是批准；策划根据真实提交/截图/日志裁决。用户不承担日常工程审查。
- R02仅三组局部视觉样例，选定后只有一个正式站。
- SPPS原片归档已存在，Codex素材桥接尚未完成；不能把两个状态混为一谈。

## 来源核对范围

本轮读取了pre_training现有结构、PROFILE、原则、页面/技术稿、QQ与教学经历、READINESS、ONBOARDING、SPPS素材登记；另外核对KIN仓库MARKET_COMPETITION_THESIS中的H1/H2/H3。

Library已列出4张照片/2段视频；已对当前挂载原文件实算SHA256并读取分辨率/时长，写入SPPS_ASSETS。Library自动改过图片显示名，因此记录了新旧名映射。

官方技术资料：
- https://docs.astro.build/en/guides/content-collections/
- https://docs.astro.build/en/install-and-setup/
- https://docs.astro.build/en/guides/deploy/edgeone-pages/
- https://playwright.dev/docs/api/class-page
- https://playwright.dev/docs/test-snapshots

## 尚未做，不能宣称通过

网站实现、Astro安装、页面截图、PDF输出、Notion匿名可达性、运行视频内容/音轨审查、媒体公开许可与Git传递、线上部署。当前容器没有可用外网DNS，不能以此判断用户公开网站不可达；GitHub/Library连接器读取正常。

## 检查衔接

R01公开稿draft用本地review:build；生产build必须拒绝未批内容。R01报告实证中应包含这个预期失败，不把它误判成可以绕过许可。

审查者若取得的截图是base64/二进制引用，必须恢复像素查看，而不是仅看文件名或报告描述。取不到关键像素则明确证据不足。

部署成本/账户/地区在R06核实；没有域名不阻塞前5轮。原始素材保密许可若不足，集中问一次公开范围，不让用户重新提供已归档内容。
