# R05 成品验收

本目录保存可复用验收脚本与工具依赖。继承根规则；只验收或修缺陷，不改事实/授权，不部署。

- package.json/package-lock.json：独立固定 Playwright 测试依赖，不进入网站运行时。
- requirements.txt：PDF 检查依赖；使用本地 .venv（忽略）或 RESUME_PYTHON 指定环境。
- 浏览器与 Poppler 为宿主先决条件，路径用环境变量或 PATH，不固定个人机器路径。
- ../delivery/audits/R05：报告与实际证据；tmp为忽略的探测、独立配置及缓存。

干净验收必须证明开始时没有 node_modules/.astro/dist/exports；执行 npm ci、网站/简历检查后生成资源清单。任何未证实项目保留为限制/阻塞，不自签策划ACCEPT。
