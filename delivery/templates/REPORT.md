# Rxx 报告

本模板是结构，不是完成证明；占位字段必须替换。正文尽量≤600中文字。

- round / attempt:
- branch / PR:
- base_commit / tested_commit:
- prompt_path / prompt_sha256:
- implementation_status: completed | partial | blocked
- reviewer_decision: pending（实施者不能改为ACCEPT）

## 完成了什么

最多5项，指向实际文件/页面。

## 实际验收

| 命令或检查 | 结果 | 证据路径 |
|---|---|---|
| 如npm run check | pass/fail/not_run | 实际日志 |

附 `evidence.json`，含每条命令的working_directory、exit_code、运行环境版本、log_path，以及screenshots/path/viewport/sha256。不可手填从未执行的exit_code。

## 事实、媒体与外链

仅报告变化/异常；链接测试记时间和所处网络环境。注明模拟数据、开发占位、未获许可素材；不能把原始资料未送达Codex写成用户未提供。

## 阻塞与交接

具体未完成项、责任方、是否影响本轮。附公开安全的预览方式与下一步，但不要自行开下一轮。

## evidence.json 最小结构

```json
{
  "round":"Rxx",
  "attempt":1,
  "tested_commit":"REAL_COMMIT",
  "environment":{"os":"ACTUAL","node":"ACTUAL","browser":"ACTUAL"},
  "commands":[{"command":"ACTUAL","cwd":"REPO_RELATIVE","exit_code":0,"log_path":"attempt-01/check.log","sha256":"ACTUAL"}],
  "screenshots":[{"path":"attempt-01/home-375.png","viewport":{"width":375,"height":812},"sha256":"ACTUAL"}],
  "known_gaps":[],
  "implementation_status":"completed",
  "reviewer_decision":"pending"
}
```

上面是示例字段，不允许复制为“测试结果”。未运行命令用exit_code:null和reason。真实实现测试后才提交报告；如只有报告变化，可保留tested_commit并列明报告后新增文件。返工使用attempt-02，报告入口指向最新，旧证据保留。
