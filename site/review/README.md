# R02 本地视觉审阅

三个小型方向读取同一份已批准 publication 数据：A 编辑式作品档案并排展示两项目；B 产品案例展厅采用大展示区和逐项叙事；C 简洁研究札记采用侧栏、编号与紧凑正文。推荐 A，因为同屏可以对照 KIN 的产品判断和 SPPS 的工程交付。这是实施建议，用户尚未选择。

从 site 目录运行 `npm run review:build`，然后 `npm run review:preview`，打开终端所示本地地址的 `/review/a/`、`/review/b/`、`/review/c/`。预览结束运行 `node node_modules/astro/bin/astro.mjs preview stop`。仅用于本地审阅，不部署。

运行 `npm run build` 后，生产 dist 只有正式首页，不含候选页面、样式或导航。候选路由仅在审阅构建时通过 integration 注入，不加入生产 getStaticPaths 或 sitemap。

浏览器复现：设置 PLAYWRIGHT_MODULE 为已安装 playwright 模块目录（或使用可解析的 playwright 包），CHROME_EXECUTABLE 为本机 Chrome 可执行文件；依次运行 `npm run check`、`npm test`、`npm run review:build`、`npm run build`、`npm run test:e2e`。e2e 自行启动并关闭两个回环地址静态服务器，写出六张指定尺寸截图与 browser-results.json；不访问外部站点。外链只验证来源、可见性及 href，不声称线上可用。

SPPS 公开媒体仍待审查，使用“实拍素材整理中”开发占位，不含设备照片。B 的 KIN 大字仅为排版。后续获得用户选择与下一轮授权后，再保留一套正式布局与 tokens；当前不开展完整案例。
