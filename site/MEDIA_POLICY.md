# Media policy and bridge

## 原件已收到，Codex未必可读

SPPS四图两视频在私有Library中；原始名字与校验见SPPS_ASSETS。当前ChatGPT容器能访问，不等于Codex工作区拥有同一 `/mnt/data`。不得要求用户重新上传，也不得把Library路径写成浏览器URL。

独立记录三个维度：availability（private_archive/codex_ready/missing）、publication（pending/approved/rejected）、integration（not_used/integrated/verified）。原件已存档不能推出后两项PASS。

## 策划端负责桥接

1. 从已归档素材恢复到自己的工作环境；若Library自动改名，用SPPS_ASSETS里的名字/大小/哈希匹配。
2. 审查照片与视频的可见标签、终端路径、实验数据、音轨及人员信息。用户曾说明涉保密项目；上传不等于证明项目方许可。不能只靠“看起来没问题”推断保密许可。
3. 生成最小公开候选：正面图、一个角度图、一个10–30s操作片段+poster。裁切/遮罩/转码应可追溯；不以生成式AI替换真实仪器或伪造数据。原片不改。
4. 未确认可以公开的候选只存私有Library，不进入公开分支、PR、Actions日志或public。如许可确实不能从现有信息解决，集中问用户一次“哪些整机外观/运行画面可以公开”，不重问经历、不让用户重传。
5. 获准后通过可用的二进制Git提交能力/Blob API把小体积衍生物交到专用媒体分支，再由审查者合入；记录原片SHA256、处理步骤、衍生物SHA256、批准范围。工具无法传大视频时如实标bridge blocked；先交获准静帧，视频延后需要明确记录，不能写视频已交。
6. Codex只消费GitHub可读的审核后文件；核对哈希后更新assets-manifest的codex_ready。公共网页绝不引用临时签名URL、sandbox路径或私有仓库token。

## 与轮次关系

R01不依赖媒体，可做内容与工程底座。R02三案可使用真实可用图；未有公开许可时只用中性占位并明确development only，不自动上传原片。R03要求完成可用媒体整合或由审查者选择无涉密图片的文字/示意图版；R05不能留下空视频播放器、伪造实拍或标成已运行的占位。

素材问题只阻塞相关媒体，不阻塞简历内容与其他案例。用户已上传的资料只取一次，后续使用归档。

## 公开媒体登记（R01建立assets-manifest.json）

每项字段：id/project/type/path或null/source_filename/source_sha256/derived_sha256或null/availability/publication/integration/alt/caption/permission_note。

网站使用构建时sanitize后的字段，不能把原片存储路径和内部许可讨论导出。图片显示真实器件关系；操作视频证明设备动作，不能由此声称特定纯度、稳定性或临床性能。
