# 英文主页译稿：语言与原意复核

复核日期：2026-10-08。范围：`publication/en/` 下 12 份 Markdown，逐份对照其 `source_path` 对应的中文公开文案；同时核对 `delivery/handoffs/english-portfolio-20261008/HANDOFF.md` 的状态、数字和 ownership 边界。只审查译稿，未修改译文，也未审查尚未实现的英文网页渲染。

## 二次复核结论（2026-10-08）

下列首次审查意见均已在译稿中修复：QQ `Finalist round` 改为 `Second round`，SPPS 名称明确 `Solid-Phase`，PET 小标题不再用含混的 `launch`，画廊标题和两处生硬短语已调整。两款 App 新增 `image_note: "Screenshots show the Chinese interface."` 可供网页显示；`ui.md` 现列出全部相关 Astro/TypeScript 中文源文件与基线 commit。抽查修复后的相邻句子，未发现新增的原意偏移或数字、状态、ownership 问题。**译稿审查已无阻断项，可以进入英文页面实现。** 网页实现仍需验证 `image_note` 确实对访客可见，以及所有 UI/辅助功能文案被英文页面使用。下列“需要修改”保留为第一次审查的历史记录，状态均为已解决。

## 需要修改

### P1 · QQ 竞赛阶段被写成决赛阶段

- 位置：`publication/en/projects/qq-lingxi.md:7` 的 `status_label`。
- 现稿：`Finalist round, Tencent PCG Campus AI Product Ideas Competition`。
- 中文：`腾讯PCG校园AI产品创意大赛复赛`。`复赛`是第二轮，不能由 `Finalist round` 暗示进入决赛或成为 finalist。
- 建议：`Second round, Tencent PCG Campus AI Product Ideas Competition`，或 `Advanced to the second round ...`。同文件第 11、30 行和 `publication/en/resume.md:23` 的 `next round` 未夸大，但与准确的 `second round` 统一会更清楚。

### P2 · SPPS 英文名称未显示固相合成这一技术属性

- 位置：`publication/en/projects/spps.md:6`、`publication/en/gallery.md:14`、`publication/en/resume.md:9`。
- 现稿：`Automated Flow-Based Peptide Synthesis Platform`。中文案例标题是「智能化流动多肽合成仪」，但同一公开中文 `publication/gallery.json` 已登记完整英文名 `Development of an Automated Solid-Phase Peptide Synthesis Platform Based on Flow Chemistry`。只写 `Peptide Synthesis` 会让 SPPS 的 `solid-phase peptide synthesis`（固相多肽合成）含义消失。
- 建议：短标题用 `Automated Flow Solid-Phase Peptide Synthesis Platform`，首次正文可用已登记的完整英文名；核对最终选择与现有图片/简历用名一致。

### P2 · PET 标题中的 launch 容易误读为产品发布

- 位置：`publication/en/projects/pet.md:20`。
- 现稿：`Plan the launch before committing to the full experiment`。中文「像发射火箭一样，把准备放在正式实验之前」借的是发射火箭的比喻；英文单独说 `the launch` 在个人主页语境中容易指产品上线，与本节科研实验不合。
- 建议：`Prepare like a rocket launch before the full experiment`，或直接 `Plan thoroughly before the full experiment`。后者更适合不想保留比喻的英文页面。

### P3 · 首页画廊短标题有直译感

- 位置：`publication/en/gallery.md:5`，同文案重复于 `publication/en/ui.md:7`。
- 现稿：`Made real. Here to see.` 对「做出来，给你看」逐词靠近，但英文不像自然的邀请语。
- 建议：`Built to be seen.`、`Made real. See for yourself.` 等；确定后两处保持一致。

### P3 · 个别产品/科研短语不够自然

- `publication/en/apps-showcase.md:15` 的 `AI ZIP` 像内部文件名；面向访客可写 `ZIP package for an external AI tool`，与同文 `product` 对齐。`A package for an external AI` 也可补 `tool` 或 `assistant`。
- `publication/en/projects/pet.md:18` 的 `AI taught me much of the unfamiliar knowledge` 是中文「由 AI 逐项教会」的生硬直译，且弱化本人的主动学习。可写 `I used AI to work through unfamiliar topics step by step`，随后保留文献和实验判断的主语。

## 覆盖与通过项

- PET 保留了**初稿、拟投 JMC、预计两项专利申请**，没有把 2026-10-07 的新事实状态混入此次旧公开文案；约 68 分钟半衰期、约四小时有效窗口、单次约 RMB 4,000 的口径正确。`gallium-68` 是可读的英文写法；实现 HTML 时仍应按交接要求使用 `<sup>68</sup>Ga`，不要渲染成不允许的 Unicode 上标或 `^68Ga`。
- SPPS 的约 RMB 1.5 million、近同规格 FEP 管单项约 88%、单次偶联操作约 97% 均保留限定；机械/CAD/底层驱动归协作者，核心方案、技术指标、集成和高层脚本归本人。网页简历源中文写了「接口定义」，英译用 `component requirements and how the machine should operate`，符合已批准案例的较窄 ownership 边界。
- KIN 的 285 million × 10% = 28.5 million DAU、Xiaomi Home 117 million MAU 参照，以及独立的长期 500 million / 10% / 25% / 50% 情景都正确，没有写成实际用户量或混用 DAU/MAU。父母自主分享、演示数据和核心需求待验证的含义保留。
- QQ 明确把代码/工程实现归 ChatGPT，累计约十天及初赛、复赛两轮迭代保留；除上述 `Finalist round` 外无明显竞赛成绩夸大。
- 两款 App 译文保留了各自尚未公开发布的状态。Lecture 的 PDF 供人阅读、ZIP 交给外部 AI，未声称 App 自行生成 AI 摘要；Everwhile 是提醒和事后回看，选择由用户决定。
- 全合成的时间、约 100 g 仅为前两步中间体、约五人核心组和累计约十名本科生；教学的 19 名学生、5 名助教、约 8 个实验、3 条流程、91 个样品瓶、书稿及第四学期继任者独立运行，都与中文一致。
- 首页、个人资料、画廊、网页简历的主体内容与原意总体一致；未发现其他明显数字或单位错误、科研成果状态抬升、把协作者工作归本人、或把中文 PDF 标成英文 PDF 的问题。

## 限制与后续核对

- 这是文本对照审查，未验证运行页面中是否完整使用这些文案，也未验证实时 App Store 状态、外链或媒体字幕。交接文档要求在正式发布前重新查两款 App 的实时上架状态。
- `publication/en/ui.md` 将多个 Astro 文件的 UI 文案汇成一份，`source_path` 却只指向 `site/src/pages/index.astro` 且 `source_sha256` 为 `null`；实施时应有逐键原文映射或覆盖检查，尤其是 `aria-label`、弹窗和视频控件，以免漏译。此项是追溯/覆盖风险，不能据此认定当前译文含义有误。
- 两款 App 目前沿用中文截图。`publication/en/apps-showcase.md` 的说明记录了此事，但这段说明不是网页字段；英文页面若展示这些截图，应在访客可见处说明截图为中文，以免误认为产品英文界面已存在。
