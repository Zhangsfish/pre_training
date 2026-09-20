# Content contract — 从事实到发布

## 1. 单向数据流

`PROFILE + experience → publication（人工/策划审查后的公开选材）→ site + resume variants`。

网站构建只读 publication 和已审核媒体；不直接 glob 整个 experience，不在浏览器调用GitHub API，不从项目仓库动态拉取会变化的事实。框架模板禁止硬编码项目事实。资料导入时间不当项目发生时间。

## 2. R01建立的数据

`publication/profile.json`：只放姓名、已确认教育、公开邮箱、GitHub等所需字段；首页与简历字段由两个明确allowlist选择。完整生日不导出；年月、电话只用于简历。记录source_path，不携带私有文件ID或存储token。

`publication/claims.json`：每条可复用的事实是一个Claim：

```json
{
  "id": "pet.manuscript_status",
  "text": "第一作者稿件已交导师，准备投稿",
  "source_path": "experience/pku-pap-pet-project.md",
  "source_heading": "Identity",
  "source_blob_sha": "从读取结果填写真实值",
  "basis": "user_confirmed",
  "certainty": "confirmed",
  "publication": "approved",
  "allowed_contexts": ["site", "resume"],
  "as_of": "2026-09-20"
}
```

basis只用user_confirmed / artifact_observed / analysis；certainty只用confirmed / approximate / unknown；publication只用draft / approved / excluded。`user_confirmed`不是独立审计。分析性定位不能伪装成历史事实。示例SHA占位不得进入实际数据。

`publication/projects/*.md`：四个主案例及teaching的公开短稿，frontmatter含id/title/status_label/period（可null）/claim_ids/link_ids/media_ids。既有经历是事实权威；公开稿是有版本的表达。每个数字、作者顺位、比赛阶段、职责边界都必须能追到claim。无需逐词追踪普通连接词。

`publication/home.json`：稳定顺序kin/spps/qq-lingxi/pet；首屏/方法/教学等短文案及claim引用。不得出现岗位切换开关。

链接唯一源为 `site/LINKS.json`。素材派生物登记在 `site/assets-manifest.json`（R01创建）。运行时仅编译公开字段，不能把整个claim审查对象或Library定位写入HTML。

## 3. 不同“状态”不能混用

- 有代码 ≠ 当前部署可用；已有文稿 ≠ 已投稿；拟申请 ≠ 已申请 ≠ 已授权。
- 有原片 ≠ 可以公开 ≠ Codex工作区拿得到 ≠ 已集成。
- 有课程资料 ≠ 取得该课学分；保存代码/课件 ≠ 自己写过。
- 有研究方案 ≠ 真实客户/销量/留存；运行视频 ≠ 定量纯度与稳定性已验证。

## 4. 选材红线

KIN核心先H1/H2/H3，尤其H2；相邻行为只提供机制线索。PET团队不是本人下属；外部合作来自导师；大件已有。SPPS不是用户独力写所有驱动/机械CAD。QQ是本人+AI，不是人类工程团队；样例数据不得改成真实QQ数据或用户增长。

未经核价的150万元/10倍价差、受质疑95%纯度默认excluded。未明确公开许可的论文细节、原片、人员批评不复制到publication。不要把敏感词本身写入公开黑名单以“防泄漏”。

## 5. 事实变更

用户更正/成果状态更新时，策划先更新experience，再更新相关claims与公开稿/简历。检验source_blob_sha漂移：提示需要核对，不自动覆盖原稿，不自动宣布全部失效。变更只传播到引用的作品/简历，不重新生成所有东西。

## 6. 编译校验

R01至少实现：ID唯一、source_path存在、引用都可解析、未知字段不能包装成数字、默认排除项目不会进入home、三条必需外链存在、未approved内容不能进入production build。缺正式项目日期可省略，不能猜。

R04新增每条简历bullet的claim_ids侧表。R05检查dist只含公开allowlist，没有experience、审计、原稿、候选方向路由或具体投递分析。noindex只用于去索引，不能代替保密。


## R07 current user override — 2026-09-20
The user explicitly requested a media-first redesign and publication in the current Work conversation. The old text-only visual freeze and R06 round lock are superseded for this scoped change. Homepage public copy comes from publication/gallery.json; project fact records and résumé are preserved. Selected derivatives are authorized; original masters stay excluded. New local media interaction JavaScript is permitted, with a hash-based output allowlist and no analytics. Existing Vercel/free-only/no-DNS scope applies.
