# Hibi website — working notes

纯静态导出（`output:'export'`）双语营销站。`npm run dev` 起本地，`npm run build` 出 `out/`。

## Design invariants — 用户点名保留，改版前先问
- **整行反色 highlight**：hover 文字变墨色硬底白字，零过渡。落在 `.hero-title .line:hover`
  与 `.hl:hover`（全站 section 标题）。用户原话："超喜欢这个，多应用记住要保留"。
- 空心描边 = 缺席：`$0`、`.wi-ord`、头奖时的 `$68.00`、大 marquee、日々署名共用此语义。
- 大 marquee 用 FoodDelicious（拉丁）+ CJK 回退（日々）；全站仅此一条 + 顶部数据 ticker，不加第三条滚动物。
- **等高线场**（Wash.tsx）：用户点名保留——"非常好这个等高线"。单色墨线、发丝、每五条一根
  计曲线、指针处地面隆起、CSS .lit 为回退。它成立的原因是**和全站同一支笔**（规线／套准十字／
  描边字／空心零），并呼应产品的街区语义。
- **彩色流体渐变已被否决——"太古早"**：2019 的语言，和本站描边/hairline/硬切语汇冲突。
  three.js 判据 = **"有职务 + 同笔触"，两条缺一不可**。历史拆除：隐形点阵场、开盒粒子、
  线框日々展品、彩色 wash。
- 自定义光标 `mix-blend-difference`；触屏 / reduced-motion 不启动。
- **按钮 hover 禁止位移**（磁性已按用户要求拆除，"太 ai"）。hover 只变色/变底；箭头在钮内滑动可以。
- `.field` 类名属于表单字段。任何全屏定位层严禁再用这个名字（撞名事故记录在 globals.css 注释）。

## 结构速查
- 文案：`content/{en,zh}.ts`，结构 `content/types.ts`。中文文案受外部禁词表约束，改前问。
- 字体：Noto Sans SC 自托管分片（`scripts/fetch-noto-sc.sh` 再生）；FoodDelicious 只做 display。
- 交互组件：LedgerLive（活账本）、WalkIn（可玩核销，真概率盲盒）、Estimator（?cap= 传进表单）、
  WeekStats（听 `hibi:redeem/reset` 事件）、Cursor、Pointer（磁性+日々视差+sheen）。
