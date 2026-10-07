# 给接手 AI：组装张朔的产品与商业化简历

这份说明对应用户在 **2026-10-07** 审阅通过的一页简历。先读同目录 [`selected_projects.json`](selected_projects.json)：它保存了这版的完整抬头、教育背景、六个项目的顺序、标题、日期、正文与链接。**要复现这一版，直接用该快照，不要从聊天记录或仓库旧 PDF 拼回正文。** 本文件解释怎样取用和核对；它不是要求把这一版变成所有岗位的默认简历。

## 五分钟组装

1. 读取仓库根 [`AGENTS.md`](../../../AGENTS.md)、[`resume/STYLE.md`](../../STYLE.md) 和本目录 JSON。只需这些文件就能取得这一版的全部文字；若要核查事实，再读取下方来源。
2. 按 JSON 的 `education` 输出教育背景。按 `projects` 数组顺序输出项目：前三项属于「核心项目」，后三项属于「补充经历」。每项显示 `title`、右侧 `date`、下一行 `meta`，再把每个 `bullets` 元素写成「**标签｜**正文」。正文和数字不要自行改写。
3. `links` 给出可点击的项目入口。两款 App 和 KIN + QQ 灵犀是合并展示，但各自的名称要分别链接；其他项目使用其对应链接。不要把 QQ 比赛项目或未上架 App 写成已经产生销售、下载或用户增长。
4. 排成 A4、一页、单栏，教育在前；正文保持可读，不靠缩小到难读字号硬塞。生成 PDF 后检查中文能提取、无截断、项目日期正确、所有链接可点击。当前快照共有六个显示项目、十条 bullet、九个链接（含抬头作品集）。
5. 投递前核对会变化的状态：两款 App 是否仍在美区审核、中国大陆备案进度、JMC 稿件及人体研究伦理申报进度。JSON 记录的是用户在 2026-10-07 给出的口径，不代表现在仍然成立。若变化，先确认事实，再产生一个**新版本**；不要静默覆盖此快照。

简历版式可参考 [`resume/STYLE.md`](../../STYLE.md) 和 [`resume/ASSEMBLY.md`](../../ASSEMBLY.md)。仓库现有的 `npm --prefix site run resume:build` 使用另一套 `resume/variants` 与 `publication/claims.json`，**不会自动生成这份 2026-10-07 快照**；不要运行它后误以为得到本版，也不要为组装私人投递版执行 `--publish` 或部署网站。

## 怎样交给另一个 AI

把本 README 的 [GitHub 链接](https://github.com/Zhangsfish/pre_training/blob/main/resume/assembly-guides/general-product-apps-20261007/README.md)和目标 JD 一起发给它。可以直接使用这段启动语：

> 先读链接中的 README 和同目录 `selected_projects.json`。这是我在 2026-10-07 确认的一页简历内容快照。请先指出该 JD 最需要的能力，再从快照和 README 索引的单项定稿中选材、排序；保留我的实际贡献和原有事实，不根据旧网站 PDF 猜测最新进度。先给我可审阅的中文项目顺序与正文，再排版成一页 PDF。App 审核、PAP 稿件和伦理状态如未核实，请明确标出待核实项。

若对方只需复现当前版，不提供 JD，并告诉它“六项和原顺序全部保留”。若要申请某家公司，附上该公司**具体岗位 JD**，而不只是公司名称。可以让 AI 读取公开 GitHub 文件；不需要把本地 `resume/exports/` 或旧 PDF 当作输入。

## 按岗位排列组合

- 保留 `selected_projects.json` 作为本版原件。在 Git 忽略的 `resume/exports/` 下复制选材，针对 JD 调整项目顺序、选择部分项目或调整应聘方向；不要修改个人网站的固定身份与首页顺序。
- 两款 App 的**单项定稿短句**分别在 [`Lecture Asset`](../../../skills/zhang-shuo-experience-writing/references/approved-lecture-asset-resume.md) 和 [`Everwhile`](../../../skills/zhang-shuo-experience-writing/references/approved-everwhile-resume.md)。可一起放，也可只选一款。共同的[进度与推广](../../../skills/zhang-shuo-experience-writing/references/approved-independent-apps-progress-20261007.md)是日期快照，不能不核实就长期复用。
- KIN 与 QQ 灵犀在本版被压成一项，两条成稿在 JSON 中。要分开展示时，先看写作技能中的 [`KIN`](../../../skills/zhang-shuo-experience-writing/references/approved-kin-resume-b.md) 与 [`QQ 灵犀`](../../../skills/zhang-shuo-experience-writing/references/approved-qq-lingxi-resume-b.md) 单项版本；它们与当前合并版并非逐字一致，不要机械拆句。
- SPPS、教学、Jiadifenin、PAP/ACP3 在本版各自独立。旧六项参考文案可从 [`写作技能索引`](../../../skills/zhang-shuo-experience-writing/SKILL.md)找到，但**复现本版时以此目录 JSON 为准**：旧版 PAP 稿件状态等内容可能早于用户 2026-10-07 的更新。
- 一个岗位不要求六项全上。先读真实 JD，选能证明该岗位能力的经历，再检查删减后是否还保留个人判断、真实贡献和可核实结果。Selection Dictionary、早期科研训练及旁听学习默认不占这页，可在明确相关时从经历库重新评估。

## 来源与边界

- [`experience/`](../../../experience/README.md) 保存事实和贡献边界；两款 App 各有[事实记录](../../../experience/lecture-asset.md)与[事实记录](../../../experience/everwhile.md)，实现细节还需看各自项目仓库。`publication/` 是网站公开表达，不是简历定稿；`resume/variants/` 是旧 baseline，不是本版快照。
- Lecture Asset 把照片生成供人回看的 PDF 和供外部 AI 处理的资料包；App 不内置 ChatGPT、不会自行建立知识库。Everwhile 是过程提醒，不是强制锁 App。两款均不能写成已上架或已有增长，除非后来有新证据。
- SPPS 的机械加工和底层电控由协作者完成；PAP 的外部医院关系由导师建立。本版 PAP 的临床前链路、在投 JMC 和准备伦理申报来自用户最新口述，不等于伦理获批、人体研究已开始、论文录用或专利已申请。
- 这份 JSON 是**经用户确认的一页文字快照**，并未接入仓库现有 claim-ID 生成器。若要让现有生成器自动选材，应先同步事实、claim 映射与 variant，再运行对应检查；不能只改 PDF 或 README。

本次入库缘由与文件分工见同目录 [`AGENTS.md`](AGENTS.md)。
