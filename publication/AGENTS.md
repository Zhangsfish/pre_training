# 公开内容草稿

依据根 AGENTS.md、site/CONTENT_CONTRACT.md 和 delivery/prompts/R01_FOUNDATION.md。

- `profile.json`：最小身份与教育字段；site/resume 显式白名单。
- `claims.json`：从 PROFILE 和五个指定 experience 文件选取的可公开事实及真实 Git blob SHA；user_confirmed 不代表独立核验。
- `home.json`：唯一身份、固定项目顺序、教学和方法文案。
- `projects/*.md`：四个案例与教学短稿，JSON 形式的 YAML frontmatter 便于无额外解析依赖读取。

R01-a01 审查单明确批准：完成其指定修正后，将本批 profile/home/projects/claims 标为 approved。本次状态变更依据 `delivery/reviews/R01-a01.md` 第5项，并非实施者自签；新内容仍须单独审查。出生年月与电话仅在 resume allowlist，网站白名单不变。不收录未知专利状态、未核价金额、科研细节或受限制原片。KIN 的竞争检查不代替原始 H1/H2/H3，也不证明 H2 已验证或证伪。
