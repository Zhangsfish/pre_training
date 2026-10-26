# 粘贴到新对话的启动语

我要给现有个人主页增加英文版本和中文 / English 入口。请先读取下面的交接文档，再给出具体实施范围和需要确认的最少选择；本条先完成接手、基线检查与方案，不自行部署。

仓库：`Zhangsfish/pre_training`
交接分支：`docs/english-portfolio-handoff`
交接文件：`delivery/handoffs/english-portfolio-20261008/HANDOFF.md`
同机完整路径：`E:/myself/pre_training-english-handoff/delivery/handoffs/english-portfolio-20261008/HANDOFF.md`
正式中文站：`https://zhang-shuo-portfolio.vercel.app/`

先 fetch 并读取最新默认分支的 AGENTS.md、START_HERE.md、delivery/STATE.json、publication/AGENTS.md、site/AGENTS.md。不要把旧 R04 工作区当最新 main。PR #26 已合并；交接所核对的 main 为 b43128fdbdedb3b54e0e3ea0da9046bf4d154e70，后续有新提交时审查 diff，不回退。

方向是沿用现有结构和视觉，推荐 `/` 保留中文、`/en/` 增加英文，共用组件与媒体。翻译现有已确认公开表达，不重新采访、不重新策划经历、不把完整简历堆回首页。首页保持 Lecture Asset / Everwhile 宽屏同排、窄屏换行，然后 QQ → SPPS → KIN；保留双语 Lecture 影片、英文 Everwhile 影片和截图交互；不恢复推广构想。

中文站和锁定简历/PDF 保持稳定；不自行生成英文 PDF。先复核 main 已存在的 PET source_blob_sha 漂移，审查具体来源映射，不直接替换 SHA 或放宽测试。最新 PET 一作稿件由用户更新为“在投”，确切系统状态未独立核实；不要误写录用/发表，也不能机械套用旧“拟投”母稿。

只操作 pre_training，不进入 KIN、QQ 或两款 App 的源仓库改代码。保留未提交修改，不 reset --hard、不 force push。实施获确认后用独立英文分支，提交翻译、实际双语回归测试、浏览器截图与报告，创建 PR 供我看版。合并、生产发布和英文 PDF 如需执行，按我之后的明确授权办理，不把旧中文发布授权当本次新授权。

未来发布只能用现有 Vercel 项目 prj_CfECSSKoBni34VGDTa89UhKu4n09、scope zhangsfishs-projects、原域名和免费方案；不得新建站点、改 DNS/认证或付费。权限失败准确报告，不绕过。
