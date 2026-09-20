# R04 报告

- round / attempt: R04 / 01
- PR: https://github.com/Zhangsfish/pre_training/pull/4
- branch: codex/R04
- base_commit: d6b2ff81f5400c9994cfac32050762f3e512fc3b
- tested_commit: fb94812872e4ce7910c5b1bb92c2901049a82f03
- prompt_sha256 (Git blob): 9a236ecc129c2772c7b0398b27f6e4fd6ed82f3aff81734b7307ce0667c6298c
- implementation_status: completed; reviewer_decision: pending

四份 baseline 从结构化选材生成 Markdown、print HTML、可选中文本 PDF，逐 bullet 有 claim_ids 和取舍理由；A4 单栏、10.5pt、14mm边距。通用版接入 /resume/ 和唯一公开 PDF，其他导出留本地忽略目录。首页、事实、STATE未改。

31项网站测试、9项选材/JD测试通过；56组浏览器检查含真实下载hash；4份baseline及2份TEST FIXTURE PDF均为一页，核对中文/阅读顺序/链接注释并渲染。四版完整页面已目视检查。

限制：PDF站内链接为相对URI，离线缺少基址时可能不可导航，发布轮核验阅读器；KIN仓库仍有R03的匿名404限制。现有批准claims未含CET-6，暂省略可选语言行；DOCX按约定暂缓。SPPS媒体仍待许可。不进入R05、不部署，交策划审查。

[复现与JD流程](../../../resume/README.md) · [evidence.json](evidence.json)

## 四份实际本地导出

| 版本 | PDF本地路径 | SHA256 | 公开审查证据 |
|---|---|---|---|
| general-zh | `E:/myself/pre_training/resume/exports/zhang-shuo_general-zh_20260920.pdf` | `9584697754adb1d5b7b67f85e3bfb458ca4c50bafb6ba8820babc685a158034e` | [一页渲染](attempt-01/pdf-general-zh.png) / [文本核对](attempt-01/pdf-general-zh-check.json) |
| product-commercial-zh | `E:/myself/pre_training/resume/exports/zhang-shuo_product-commercial-zh_20260920.pdf` | `a63084997a2ed68675c3c123c50ff54b000665fabac733b62749607f3dc3ff22` | [一页渲染](attempt-01/pdf-product-commercial-zh.png) / [文本核对](attempt-01/pdf-product-commercial-zh-check.json) |
| brand-insight-zh | `E:/myself/pre_training/resume/exports/zhang-shuo_brand-insight-zh_20260920.pdf` | `2a3a1707551f3a7c9724b2511d973888c1c2d94fc2171048dcd9e76da8bdd913` | [一页渲染](attempt-01/pdf-brand-insight-zh.png) / [文本核对](attempt-01/pdf-brand-insight-zh-check.json) |
| ai-product-zh | `E:/myself/pre_training/resume/exports/zhang-shuo_ai-product-zh_20260920.pdf` | `bed14317325b5997d8b119391b20cb5c6cc35e549635f6e000b6194f684b0a4f` | [一页渲染](attempt-01/pdf-ai-product-zh.png) / [文本核对](attempt-01/pdf-ai-product-zh-check.json) |

网页：[375](attempt-01/resume-375.png) / [768](attempt-01/resume-768.png) / [1440](attempt-01/resume-1440.png)。全部网页截图及本地MD/HTML/hash见 evidence。

## 实际命令

| 命令 | exit | 日志 |
|---|---|---|
| `npm.cmd --prefix site run check` | 0 | [日志](attempt-01/check.log) |
| `npm.cmd --prefix site run build` | 0 | [日志](attempt-01/build.log) |
| `npm.cmd --prefix site run test` | 0 | [日志](attempt-01/test.log) |
| `npm.cmd --prefix site run test:jd` | 0 | [日志](attempt-01/test-jd.log) |
| `npm.cmd --prefix site run audit:dist` | 0 | [日志](attempt-01/audit-dist.log) |
| `npm.cmd --prefix site run test:e2e` | 0 | [日志](attempt-01/test-e2e.log) |
| `npm.cmd --prefix site run resume:build -- --verify-published` | 0 | [日志](attempt-01/resume-build.log) |
| `npm.cmd --prefix site run resume:check` | 0 | [日志](attempt-01/resume-check.log) |
| `node resume/scripts/select-jd.mjs --jd resume/fixtures/product-commercial.json` | 0 | [日志](attempt-01/fixture-product-select.log) |
| `npm.cmd --prefix site run resume:build -- --variant-file resume/exports/fixture-product-commercial/variant.json` | 0 | [日志](attempt-01/fixture-product-build.log) |
| `npm.cmd --prefix site run resume:check -- --variant-file resume/exports/fixture-product-commercial/variant.json` | 0 | [日志](attempt-01/fixture-product-check.log) |
| `node resume/scripts/select-jd.mjs --jd resume/fixtures/consumer-insight.json` | 0 | [日志](attempt-01/fixture-insight-select.log) |
| `npm.cmd --prefix site run resume:build -- --variant-file resume/exports/fixture-consumer-insight/variant.json` | 0 | [日志](attempt-01/fixture-insight-build.log) |
| `npm.cmd --prefix site run resume:check -- --variant-file resume/exports/fixture-consumer-insight/variant.json` | 0 | [日志](attempt-01/fixture-insight-check.log) |

<details><summary>每个公开证据文件 SHA256</summary>

| 文件 | SHA256 |
|---|---|
| [attempt-01/404-1440.png](attempt-01/404-1440.png) | 1689fe9d79b34b263a1e722eed49d37f362b75593c81fd92572987f0d3206373 |
| [attempt-01/404-375.png](attempt-01/404-375.png) | c811a791c11dbe47f9424a3a179649d9d3d460ef298caa27f9b682b62b86c121 |
| [attempt-01/404-768.png](attempt-01/404-768.png) | a279b7b5a2b39536c1de1250564fa5bd4a8a503e04edf16f23bab2821ad7178a |
| [attempt-01/audit-dist.log](attempt-01/audit-dist.log) | 34a1201a132f91a848b95bd15dfd0b715b551c74c359984b8c409e1a690dc9ef |
| [attempt-01/browser-results.json](attempt-01/browser-results.json) | 1c91b98ff484773807fd8cdd012c3cb8a9cb457ebc52fb6119f62d99d5b3413f |
| [attempt-01/build.log](attempt-01/build.log) | ee7c50851d02d0076f37d490cfdf588b76d1d88fac3ae15bd2f2fa6350b40e12 |
| [attempt-01/check.log](attempt-01/check.log) | ebb74a2f064aa686a12cb73975e306c7b180c310b0c72d10ac7060773bc5c1f1 |
| [attempt-01/fixture-insight-build.log](attempt-01/fixture-insight-build.log) | 56aada431cf3009b05d9833e5e2068b27333b589a66a7a2e4bae458b14dd502f |
| [attempt-01/fixture-insight-check.log](attempt-01/fixture-insight-check.log) | f29e43a7bca0f4f93f458cb978825ccfd595bf208adb5dc76b3b4cd1d1d6d656 |
| [attempt-01/fixture-insight-select.log](attempt-01/fixture-insight-select.log) | 0dad1974ba8401d17deed72e771e6466ac05fce4e934de6a16698d1b86483f04 |
| [attempt-01/fixture-product-build.log](attempt-01/fixture-product-build.log) | 3ecc0533026a02896426c7930bb88857046cf962d6c51002e7f1262bdfd504de |
| [attempt-01/fixture-product-check.log](attempt-01/fixture-product-check.log) | 4c456f428244772b5f124087a72a35b22788f2297e52a9aa055b5e2ce3c88ff6 |
| [attempt-01/fixture-product-select.log](attempt-01/fixture-product-select.log) | cc91371636722597d142612850d4ee0e055a0bdde11a00a38e194db534f2070e |
| [attempt-01/home-1440.png](attempt-01/home-1440.png) | 4969b985bd2e7712fe5af6fa16e334cad533eced0bc6c74132023de3c496069d |
| [attempt-01/home-375.png](attempt-01/home-375.png) | b06880a58e05e5c419f7226c66331d7a564cbd38ef186f8e62678a66c16faf75 |
| [attempt-01/home-768.png](attempt-01/home-768.png) | d5067d7a6901f89544df596d7f1a58482f27df41ae6566cb2616786f71ab472e |
| [attempt-01/home-firstfold-1440.png](attempt-01/home-firstfold-1440.png) | 4cac3d90cbf2674082563a0ec975a0f4ecc89965c078b800ca676d33abd81e66 |
| [attempt-01/home-firstfold-375.png](attempt-01/home-firstfold-375.png) | 7128af1b1e8a1f148ccdc95c754312915816beb3434ad9b75e08f4520fa2cbda |
| [attempt-01/home-firstfold-768.png](attempt-01/home-firstfold-768.png) | 268b5bdc87433a633f98b052999ed10a05491f8071ff7959bae8e52ac405656b |
| [attempt-01/kin-1440.png](attempt-01/kin-1440.png) | 03411247b1eae19b3d168031168d19d444689870a5246c9d6c36ad3e52287905 |
| [attempt-01/kin-375.png](attempt-01/kin-375.png) | cdb05a39cc492e74b31f337f3589f3c32fe7fbdc3168d490670ed71f125632d8 |
| [attempt-01/kin-768.png](attempt-01/kin-768.png) | ce7e919b385da1742214e799a2ddc43ea4d286d85d3448ccf0c63fe14e57d5d5 |
| [attempt-01/pdf-ai-product-zh-check.json](attempt-01/pdf-ai-product-zh-check.json) | 77d5b807afa599ce9c26799be7b7d7dd93e2e981cad1ee1e30014acc41de94b8 |
| [attempt-01/pdf-ai-product-zh.png](attempt-01/pdf-ai-product-zh.png) | 34003c633bc5316791c8e5aee44ac980cfb00df5d45bca3542e4e8078af7a026 |
| [attempt-01/pdf-brand-insight-zh-check.json](attempt-01/pdf-brand-insight-zh-check.json) | 2fecc2b7854879326f1c1933135d7844365ec5b427b9ab3f08a59e5739ff0619 |
| [attempt-01/pdf-brand-insight-zh.png](attempt-01/pdf-brand-insight-zh.png) | d2cf2f8fea264267c281d7737c41e7b9886129b7f9cbfcea6059876c0e7e1cc4 |
| [attempt-01/pdf-general-zh-check.json](attempt-01/pdf-general-zh-check.json) | 4bf59bf639e0679933b95a1055802e3e9f8472b0deba1d96506071117f53edff |
| [attempt-01/pdf-general-zh.png](attempt-01/pdf-general-zh.png) | c01f297648d2cc4a3f3dfe3a13e228118117341d1aaa0b15b9f9fc2c1cf375b2 |
| [attempt-01/pdf-product-commercial-zh-check.json](attempt-01/pdf-product-commercial-zh-check.json) | cb69cdd3ee6d4fb782c7f290959fb3103386bd1a20eaa7652695d22df448cfd4 |
| [attempt-01/pdf-product-commercial-zh.png](attempt-01/pdf-product-commercial-zh.png) | 003d903501ec78cc88036ee510ca1680339a19de15352cc61485e2c0195ec04d |
| [attempt-01/pet-1440.png](attempt-01/pet-1440.png) | d233af78712b6703b2231464f9bd55559d4bfcd417cdf9cbebf49e9bbb2016f2 |
| [attempt-01/pet-375.png](attempt-01/pet-375.png) | 8e70f9fcb9d40dfe345b0e6b0a7d70ee0191cea6ed2427bf13b4989620df55b6 |
| [attempt-01/pet-768.png](attempt-01/pet-768.png) | 29e9ba7a93a323e30a27b4ba7a3c22f261ecfc3ca265f561b2e754083ba31293 |
| [attempt-01/qq-lingxi-1440.png](attempt-01/qq-lingxi-1440.png) | fcdf0c4871dfcf3fd875885e4e1397f2221a4d46b006be5d80224afe85102f3e |
| [attempt-01/qq-lingxi-375.png](attempt-01/qq-lingxi-375.png) | d756ff8557d386d8d88a62f589c9be52669ca66ef53771c61c81be3a9b900868 |
| [attempt-01/qq-lingxi-768.png](attempt-01/qq-lingxi-768.png) | 8007981c55e130858c7d14ec079ba002559795a5934d49f625447c7ff09ae8f9 |
| [attempt-01/resume-1440.png](attempt-01/resume-1440.png) | 79161821ef70ad59d32765691e8c0cd50c472057e629bc9ad13e5b88e2240fe6 |
| [attempt-01/resume-375.png](attempt-01/resume-375.png) | ff3116d4716f9a8dabf05ca98615de17215c920a6790016db7efe9d36bd1af61 |
| [attempt-01/resume-768.png](attempt-01/resume-768.png) | 4b57d535abc03d2178273e73a1c3b2bedb13345141d21c82ce670a5b5473420e |
| [attempt-01/resume-build.log](attempt-01/resume-build.log) | ce59b130e82303b3fbc50a87935fc790cfb4ebd932d0be8bfcaf2da9c1555ff5 |
| [attempt-01/resume-check.log](attempt-01/resume-check.log) | 4c63b3f41e133bb6d9f8444f001beec3e945f2a12e7622feb4d7b5a2a8a22a4e |
| [attempt-01/spps-1440.png](attempt-01/spps-1440.png) | df4f3ebb279ffb6e4940614c533cecb6075ee37f50fca3618b986bc68197e9e6 |
| [attempt-01/spps-375.png](attempt-01/spps-375.png) | 352ef1de5f6acd6840c33122dceeaa392c54d97329cd55d5b1f865764833e124 |
| [attempt-01/spps-768.png](attempt-01/spps-768.png) | f161083674d1a9cb9f8b8103aef13b7374950fdbcab723ba79e1879a418e3389 |
| [attempt-01/test-e2e.log](attempt-01/test-e2e.log) | f9fdf5b4cfdbdc4a0c5b3cee1e093239f3dc5c2d6a20d65ead1713cf7378081d |
| [attempt-01/test-jd.log](attempt-01/test-jd.log) | 1e7a3b6376497dd83223df32159e99497ed7d9d51ff67ed8fa15475a3e939e94 |
| [attempt-01/test.log](attempt-01/test.log) | 71781312743b0c63b150b6d5430ed486bec0a01fc42a017ba3695a2f03f2661a |

</details>
