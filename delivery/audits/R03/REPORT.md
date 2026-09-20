# R03 报告

- round / attempt: R03 / 01
- branch: codex/R03
- base_commit: 361f52986231be597eb8ff241b100b051d2f0dea
- tested_commit: 636a951f87d473c19a64660269de08929b8400bd
- prompt_path: delivery/prompts/R03_SITE.md
- prompt_sha256 (Git blob): 8211d124336562555efd57ffec0df2c428f683077f7c11f725fb945c0583a76d
- implementation_status: completed
- reviewer_decision: pending
- PR: https://github.com/Zhangsfish/pre_training/pull/3

## 完成

沿用 A 完成首页 S1–S6、四详情、教学双 Notion、QQ 仓库、404 与 resume 骨架。正式组件只保留一种设计，R02候选实现移除，历史截图保留。正文直接取批准稿；KIN将竞争检查置于后段且保留原句，其他案例保留各自叙事与归属。事实层、STATE、链接和媒体登记未改。

## 实际验收

| 命令 | 结果 | 证据 |
|---|---|---|
| npm --prefix site run check | pass (0) | [日志](attempt-01/check.log) |
| npm --prefix site run build | pass (0) | [日志](attempt-01/build.log) |
| npm --prefix site run test | pass (0) | [日志](attempt-01/test.log) |
| npm --prefix site run audit:dist | pass (0) | [日志](attempt-01/audit-dist.log) |
| npm --prefix site run test:e2e | pass (0) | [日志](attempt-01/test-e2e.log) |
| node site/scripts/check-links.mjs | pass (0) | [日志](attempt-01/external-links.log) |

类型检查无错误；28项测试通过。56组浏览器检查覆盖7页×四宽度×JS开关，验证首屏、无溢出、键盘、正文、全部本地链接/锚点和导航往返；候选地址404。全站输出 36057 字节，自写客户端JS为0；无未授权媒体或私有字段。外链匿名核对 4/5 成功，KIN仓库匿名404，页面已提示，待策划处理权限。

## 真实截图

下列为未经编辑的浏览器截图，前三列宽度对应真实视口；全页图保留完整内容。

| 页面 | 手机375 | 平板768 | 桌面1440 |
|---|---|---|---|
| 404 | [375](attempt-01/404-375.png) | [768](attempt-01/404-768.png) | [1440](attempt-01/404-1440.png) |
| 首页 | [375](attempt-01/home-375.png) | [768](attempt-01/home-768.png) | [1440](attempt-01/home-1440.png) |
| KIN | [375](attempt-01/kin-375.png) | [768](attempt-01/kin-768.png) | [1440](attempt-01/kin-1440.png) |
| SPPS | [375](attempt-01/spps-375.png) | [768](attempt-01/spps-768.png) | [1440](attempt-01/spps-1440.png) |
| QQ 灵犀 | [375](attempt-01/qq-lingxi-375.png) | [768](attempt-01/qq-lingxi-768.png) | [1440](attempt-01/qq-lingxi-1440.png) |
| PET | [375](attempt-01/pet-375.png) | [768](attempt-01/pet-768.png) | [1440](attempt-01/pet-1440.png) |
| 简历骨架 | [375](attempt-01/resume-375.png) | [768](attempt-01/resume-768.png) | [1440](attempt-01/resume-1440.png) |
| 首页首屏 | [375](attempt-01/home-firstfold-375.png) | [768](attempt-01/home-firstfold-768.png) | [1440](attempt-01/home-firstfold-1440.png) |

## 缺口与交接

SPPS媒体仍待策划许可/桥接，已按规则用文字版与明确提示；不要求重传。详情遵循批准短稿，未为字数扩写事实。PDF留R04，无假下载；未知路径404在本地静态服务实测，最终host需发布轮核验。

[复现方式](../../../site/README.md) · [证据清单](evidence.json)。请策划审查，本轮停止，不进入R04、不部署。

<details><summary>逐文件 SHA256</summary>

| 证据 | SHA256 |
|---|---|
| [attempt-01/check.log](attempt-01/check.log) | 6c77684beeee6a49ef57c7ed78af4a2f9025bd46fb3c1524467559c2ba0271f0 |
| [attempt-01/build.log](attempt-01/build.log) | 6948abf220142fb1e4227aa5c8527bf5c406f8f277614bf2b25724ee720e1af4 |
| [attempt-01/test.log](attempt-01/test.log) | 18b36d41d56b6cd7399409ef4987677d5f2a5244a90a241a79a2ebb671cf5cc3 |
| [attempt-01/audit-dist.log](attempt-01/audit-dist.log) | 8942c0a2d43588279709cf9076ed771cf793507b80b9ced4e79632b02a278f59 |
| [attempt-01/test-e2e.log](attempt-01/test-e2e.log) | 48c213a6d427e8972541b8c4b32c76d03fe915c1319acb5ea781f4c564d924ff |
| [attempt-01/external-links.log](attempt-01/external-links.log) | 51ce5b69b02371f394b8a1d3ea507b8c52722db4c39745de163a4fe17d80ce03 |
| [attempt-01/home-1440.png](attempt-01/home-1440.png) | 4969b985bd2e7712fe5af6fa16e334cad533eced0bc6c74132023de3c496069d |
| [attempt-01/home-firstfold-1440.png](attempt-01/home-firstfold-1440.png) | 4cac3d90cbf2674082563a0ec975a0f4ecc89965c078b800ca676d33abd81e66 |
| [attempt-01/home-768.png](attempt-01/home-768.png) | d5067d7a6901f89544df596d7f1a58482f27df41ae6566cb2616786f71ab472e |
| [attempt-01/home-firstfold-768.png](attempt-01/home-firstfold-768.png) | 268b5bdc87433a633f98b052999ed10a05491f8071ff7959bae8e52ac405656b |
| [attempt-01/home-375.png](attempt-01/home-375.png) | b06880a58e05e5c419f7226c66331d7a564cbd38ef186f8e62678a66c16faf75 |
| [attempt-01/home-firstfold-375.png](attempt-01/home-firstfold-375.png) | 7128af1b1e8a1f148ccdc95c754312915816beb3434ad9b75e08f4520fa2cbda |
| [attempt-01/kin-1440.png](attempt-01/kin-1440.png) | 03411247b1eae19b3d168031168d19d444689870a5246c9d6c36ad3e52287905 |
| [attempt-01/kin-768.png](attempt-01/kin-768.png) | ce7e919b385da1742214e799a2ddc43ea4d286d85d3448ccf0c63fe14e57d5d5 |
| [attempt-01/kin-375.png](attempt-01/kin-375.png) | cdb05a39cc492e74b31f337f3589f3c32fe7fbdc3168d490670ed71f125632d8 |
| [attempt-01/spps-1440.png](attempt-01/spps-1440.png) | df4f3ebb279ffb6e4940614c533cecb6075ee37f50fca3618b986bc68197e9e6 |
| [attempt-01/spps-768.png](attempt-01/spps-768.png) | f161083674d1a9cb9f8b8103aef13b7374950fdbcab723ba79e1879a418e3389 |
| [attempt-01/spps-375.png](attempt-01/spps-375.png) | 352ef1de5f6acd6840c33122dceeaa392c54d97329cd55d5b1f865764833e124 |
| [attempt-01/qq-lingxi-1440.png](attempt-01/qq-lingxi-1440.png) | fcdf0c4871dfcf3fd875885e4e1397f2221a4d46b006be5d80224afe85102f3e |
| [attempt-01/qq-lingxi-768.png](attempt-01/qq-lingxi-768.png) | 8007981c55e130858c7d14ec079ba002559795a5934d49f625447c7ff09ae8f9 |
| [attempt-01/qq-lingxi-375.png](attempt-01/qq-lingxi-375.png) | d756ff8557d386d8d88a62f589c9be52669ca66ef53771c61c81be3a9b900868 |
| [attempt-01/pet-1440.png](attempt-01/pet-1440.png) | d233af78712b6703b2231464f9bd55559d4bfcd417cdf9cbebf49e9bbb2016f2 |
| [attempt-01/pet-768.png](attempt-01/pet-768.png) | 29e9ba7a93a323e30a27b4ba7a3c22f261ecfc3ca265f561b2e754083ba31293 |
| [attempt-01/pet-375.png](attempt-01/pet-375.png) | 8e70f9fcb9d40dfe345b0e6b0a7d70ee0191cea6ed2427bf13b4989620df55b6 |
| [attempt-01/resume-1440.png](attempt-01/resume-1440.png) | f5386f869b5a8c563f80d9297c9720b4b4dad073230ad4ce0d9b683eb239c9b5 |
| [attempt-01/resume-768.png](attempt-01/resume-768.png) | 0be5f2e73b2149fa06554ae17e87e1dc6937bbd82b68cea01e955d12c824ce7f |
| [attempt-01/resume-375.png](attempt-01/resume-375.png) | 1e1e3ec1b4b7bbb4c05bfae0d84ac105f5a33cd1be42539e926ed45c7e16c0fa |
| [attempt-01/404-1440.png](attempt-01/404-1440.png) | 1689fe9d79b34b263a1e722eed49d37f362b75593c81fd92572987f0d3206373 |
| [attempt-01/404-768.png](attempt-01/404-768.png) | a279b7b5a2b39536c1de1250564fa5bd4a8a503e04edf16f23bab2821ad7178a |
| [attempt-01/404-375.png](attempt-01/404-375.png) | c811a791c11dbe47f9424a3a179649d9d3d460ef298caa27f9b682b62b86c121 |
| [attempt-01/browser-results.json](attempt-01/browser-results.json) | 17f1b8b5e7d548d1e9b61457a5e8db3928a6acd7be3051bed70628e2704e8697 |
| [attempt-01/external-links.json](attempt-01/external-links.json) | f94b42ff9cdc3b7853f644c705e1022bd4721c8aed1f0211cdfa0287856910fd |

</details>
