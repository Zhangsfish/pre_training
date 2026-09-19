# R06 — 授权后发布并核验

硬前置：R05 accepted；STATE.deployment_approval非null，且明确host、是否公网、域名/DNS/费用范围。缺任何一项时停止外部操作，向策划者报一个精确缺口。不因prompt文件存在视为用户同意发布。

## 计划

沿用host-neutral静态站。EdgeOne Pages是既定候选而非已买服务；部署当天核对官方文档、计划限制、所选地区/域名及必要要求。不能承诺无备案或中国网络保证；无中国实际测试位置就标中国访问未实测。

## 操作

部署根site，构建npm ci和build（按host实际根目录映射），输出dist。先确认发布allowlist、仅通用PDF、无未批媒体。设置真实site URL/canonical/OG/sitemap后重建；不发localhost或example.com为生产。密钥只走宿主secret，不写仓库/日志/截图。

部署后用未登录浏览器独立访问主页、四详情、两Notion和QQ入口、通用PDF；核验HTTPS、手机版、资源/视频响应与下载。第三方站点问题单独标，不误报本地已损坏。记录实际生产URL、部署ID、commit、验证时间、未测环境。

建立回滚方式：上一可用静态部署/commit，关闭自动生产发布的默认规则；未来仅经审查的变更发布。不改仓库可见性或新增analytics。

## 交付

REPORT给真实网址和实测证据；部署失败说明实际状态和回滚情况，不能把构建成功当上线成功。完成后由审查者写published_and_verified，并将唯一生产URL加入LINKS的站点字段。一个站，不为每个JD另建host。
