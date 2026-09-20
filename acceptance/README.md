# 本地维护与最终验收

网站和四份简历共用 `publication/` 的批准事实。视觉沿用 A。这里只提供本地构建与维护方法；R05 通过工程检查不等于策划 ACCEPT，更不等于发布许可。

## 在新目录重建

需要 Git、Node 24（项目也支持 22.12+ 的 22.x）、npm、Chrome、Python 3.12+pypdf、Poppler `pdftoppm`，以及支持中文的系统字体。本轮使用 Windows / Microsoft YaHei；其他系统的字体或 Chrome 版本不同可能改变 PDF 字节，必须重新检查一页排版和文本，不能跳过失败的校验。没有任何 Codex 私有缓存或个人绝对路径是源码依赖。

从新 checkout 的仓库根执行（PowerShell；工具先安装在自己的环境）：

```powershell
npm --prefix site ci
npm --prefix acceptance ci
python -m venv acceptance/.venv
acceptance/.venv/Scripts/python.exe -m pip install --no-cache-dir -r acceptance/requirements.txt
$env:PLAYWRIGHT_MODULE = (Resolve-Path acceptance/node_modules/playwright).Path
$env:RESUME_PYTHON = (Resolve-Path acceptance/.venv/Scripts/python.exe).Path
$env:CHROME_EXECUTABLE = (Get-Command chrome.exe -ErrorAction Stop).Source
# Chrome 不在 PATH 时，改为本机已安装 Chrome 的绝对路径。
# pdftoppm 不在 PATH 时，设置 $env:PDFTOPPM 为其可执行文件路径。
$env:PYTHONIOENCODING = 'utf-8'
$env:CI = 'true'
$env:ASTRO_TELEMETRY_DISABLED = '1'
./acceptance/run.ps1 -OutputDirectory ../r05-local-evidence
```

验收运行器顺序执行类型/合同检查、四版 PDF 重建/提取/渲染、网站构建、网站与 JD 单测、dist 审计、56 组浏览器矩阵、额外缩放/键盘/PDF 阅读器检查、外链检查；每条命令记录退出码及日志。外链不可达如实写入结果，不用网络偶发失败冒充本地功能缺陷。人工仍需看截图、逐条事实与许可清单。

执行前记录 `git rev-parse HEAD`、`git status --porcelain`、OS/工具版本、两个 lockfile SHA-256，并确认没有 `site/node_modules`、`site/.astro`、`site/dist`、`resume/exports`、`acceptance/node_modules`、`acceptance/.venv`。新 worktree + 新 npm cache 可以证明没有复用旧产物。报告与证据可写到独立作者工作区；不能往待测源码塞旧截图。脚本的本地服务器只绑定 127.0.0.1，不创建线上预览。

日常网站预览：`npm --prefix site run check`、`npm --prefix site run build`、`npm --prefix site run preview`。产物仅 `site/dist/`；浏览器手工打开预览 URL。不要上传仓库根。

## 修改一次事实，再更新受影响的选材

1. 经历变化先交策划更新事实层和公开许可。维护者不能自行把新增事实标为 approved。策划批准后更新 `publication/profile.json`、`claims.json`、`projects/*.md` 中受影响内容/来源 blob；不向模板另塞第三套文案。
2. 网页自动读取 publication。简历 variants 只是有取舍的选材：按批准的 claim 更新受影响 bullet、claim_ids 和 source_snapshot，保留状态/ownership 必要边界。`resume/scripts/model.mjs` 会拒绝失效快照；不能为通过检查而不审内容地改 hash。逐份专用简历不必包含所有网页文字。
3. 只重做一个方向：`npm --prefix site run resume:build -- --variant ai-product-zh`，随后 `npm --prefix site run resume:check -- --variant ai-product-zh`。同一 JSON 生成 Markdown/HTML/PDF，结果在忽略的 `resume/exports/`。不要手改 PDF 或再维护一份独立正文。全部校验用 `npm --prefix site run test:jd`。
4. 若更改影响 general，按下一节更新唯一公开副本。私人 JD/MATCH/投递定向稿不进入公开 PR，不能因 gitignored 就认为分享整个文件夹安全。

## 替换通用 PDF

```powershell
npm --prefix site run resume:build -- --variant general-zh --date YYYY-MM-DD --publish
npm --prefix site run resume:check -- --variant general-zh
npm --prefix site run resume:build -- --verify-published
npm --prefix site run build
npm --prefix site run audit:dist
```

日期替换为真实生成日期。`--publish` 仅更新本地 `site/public/downloads/zhang-shuo-resume.pdf` 和 `publication/resume-manifest.json`，不联网部署；把两者一起审查，不能手填 hash 遮盖不同输入。其他三个方向的 PDF 保留在 exports。下载 href 保持 `/downloads/zhang-shuo-resume.pdf`；`/resume/` 与 general 共用投影。电话/出生年月只在批准的简历上下文，不能扩散到首页/案例/网页 metadata。

`--verify-published` 在本轮固定环境可逐字节复现。换 Chrome/字体后即使正文没变也可能失败：先提取比对、渲染审查，再在授权维护轮重生成公开 PDF/manifest，不能伪称旧 PDF 与新环境输出相同。

## 增加已批准媒体

先按 `site/MEDIA_POLICY.md` 由策划完成许可、去标识处理和桥接。只接收获准衍生物，核对衍生 SHA-256 后放入 `site/public/media/`；在 assets-manifest 登记正确 path、derived_sha256、许可范围、alt/caption、codex_ready/approved 状态，并在实际浏览器验证后登记 integration。现有未许可原片不能直接复用。视频必须验证实际播放、控件、说明/字幕与移动端；poster 不算交付视频。构建白名单不允许未登记资源。

当前四图两视频仍 pending，继续已被 R03/R04 审查接受的文字降级：无空播放器，不声称实拍已经交付。未经许可不能取消降级或要求用户重传原件。

## 阅读器与外链限制

PDF 标题注释为 `../work/.../`，Chrome 在线从 `/downloads/` 打开时按站点基址跳转。验收脚本在真实 Chrome PDF viewer 中用注释矩形点击并核对最终网页，不用 URI 字符串拼接冒充点击成功。独立下载的离线 PDF 没有站点基址，其项目链接不可用；QQ/Notion 的绝对链接仍需联网。待 R06 确认真实域名后再决定绝对链接策略，不填假域名。

缩放测试使用临时 profile 内仅有 tabs 权限的测试扩展，调用 Chrome [setZoom/getZoom](https://developer.chrome.com/docs/extensions/reference/api/tabs) 设为 2，记录真实 innerWidth；不是仅改变 DPR。扩展经 [CDP loadUnpacked](https://chromedevtools.github.io/devtools-protocol/tot/Extensions/) 装入独立进程，不碰日常浏览器配置。

KIN 仓库匿名不可达时保留诚实说明，网站本地案例仍能阅读；外链状态以本次日志为准。两 Notion 为历史课程页面，不是网站运行依赖。邮件只核对地址与 mailto，不自动发送邮件；普通电话文本与批准简历数据核对，不拨号。

## 未来发布前清单（另行授权）

- 策划先审 R05 的截图/日志/事实边界并决定 ACCEPT；R06 授权、账号、域名、地区和费用另行确认。
- 静态宿主只接收完整且匹配清单的 dist；目录路由返回 index.html，缺失路径返回自定义 404 且状态为 404，PDF 为 application/pdf，CSS 为 text/css。
- 不配置自动发布生产分支；不加假 canonical、第三方跟踪或私有资源。域名明确后检查真实地址/metadata、TLS、缓存及在线 PDF 链接。
- 正式上线后另做真实移动网络、下载、外链和 404 检查。当前本地结果不代表中国各运营商网络可达性，也不代表已上线。
