# R05 事实、归属与公开范围复核

依据：默认分支 `5b1f48a99af87ee693f1b2c43d37756a418ac061` 的四轮 ACCEPT、CONTENT_CONTRACT、MEDIA_POLICY、publication 与 R04 variants。以下为实施者检查记录，策划结论仍待审。

| 对象 | 逐条核对的表达边界 | 来源 |
|---|---|---|
| 首屏/身份 | 北大硕士在读、2027届；化学/医学背景，不凭旁听加第二学位；固定 KIN/SPPS/QQ/PET 顺序 | profile.identity/pku/jlu、home.json |
| KIN | H1 状态未知、H2 普通日常关系价值、H3 相邻参照与自主授权均在；竞争检查位于后面；成熟硬件验证尚未开展；方案未上市，无虚构销量/留存 | kin.h1/h2/h3/product/ownership/ai/status；案例及 general/product/brand/AI variants |
| SPPS | 本人负责需求采购/接口集成/高层时序，机械及低层驱动有协作者；2024.03–08；据本人确认重复演示及交接；不列未核价金额、性能指标或当前所在地 | spps.period/ownership/scripts/collaboration/delivery/media |
| QQ 灵犀 | 产品定义、逻辑与验收属于本人；大量工程归 ChatGPT/Codex；原型样例不是真实 QQ 用户规模；仅复赛，不写获奖；不承诺在线 Demo | qq.thesis/ownership/prototype/competition |
| PET | 导师建立医院关系、大设备已有；本人补耗材/操作条件、执行实验及判断，同伴各有工作；一作稿已交导师、准备投稿，非已投/在审/录用；无未公开结构、数据、专利细节 | pet.setup/external/peers/ai/validation/status |
| 教学 | 两学期、至少19名核心学生、约8个实验，保持数量限定；教材未出版；两个 Notion 为历史课程入口，不声称仍被学校采用 | teaching.scope/design/feedback/material/links |
| 简历 | 四版选材不同，顺序与必要边界保留；教育、3.85/4.00、4/27 按已批 claim；电话/出生年月仅简历上下文；CET-6 未进入批准 claim，按 R04 ACCEPT 保持省略 | 四个 variants、publication/profile、R04-a01 |

## 公开安全检查方法与边界

不是只搜敏感词：对 dist **每一个文件**核对类型、来源、字节数和 SHA-256，再读七页实际可见内容、检查 CSS 无外部载入，并解析唯一 PDF 的文本、metadata、字体与所有动作/附件。自动合同负例验证非法资源、原稿标记、其他 PDF 和未批准内容被拒绝。浏览器同时检查无脚本/iframe/媒体及无外部运行请求。完整文件清单见 `attempt-01/dist-inventory.json`。

仅 general PDF 与 resume 页面包含许可的电话/出生年月；其余页面没有这两个字段。四版审查 PNG 为已许可 baseline；不提交其余三版 PDF、私有 JD 或 MATCH。审查证据不进入 dist。源码、事实层、STATE、publication 和已接受网站/PDF实现本轮均无改动。

媒体 manifest 六项均为 private_archive/pending/not_used，未发现任何获准衍生物，故没有可核对的公开媒体 hash/字幕或可播放视频。沿用 R03-a01、R04-a01 接受的文字降级，页面说明实拍整理中；零原片、零 poster、零空播放器。此结论不是对原片作安全认证，不自行签署许可。

浏览器/PDF 的实际截图、逐链接结果、文本稳定性与环境记录见 evidence.json。在线阅读器测试使用本地静态宿主；三个非通用 PDF 仅从独立测试映射读取 exports，未写入 dist。离线下载副本点击相对链接的失败如实记录。邮件不发送、电话不拨打；检查目标地址及许可字段即可。

未声称未知凭据绝对不存在于世界任何文件；结论限于完整列举并检查的静态产物。未将本地 localhost 测试说成公网可达或生产部署验收。
