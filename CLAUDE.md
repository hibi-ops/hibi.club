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
- **全族锁死一个色相角 ≈197°**（wordmark 的 `--sky` 是 196.8°）。任何新蓝先量色相，
  偏出 ±2° 就是另一个颜色，不是"亮一点"——曾经用过 `#0b5cff`（220.1°），用户原话
  "太冷了看上去毫无关联"，差了 23 度。三支各有职务，不许混：
  - `--sky #52b6dd` 信息：结算卡金额、wordmark 面。**不动**。
  - `--hibi #00a1e0` 标记：**只做底，永远配墨字**（ink 压它 6.3:1，白字只有 2.9:1）。
    落点：hero eyebrow、hero payoff 行（常亮）、`.hl:hover`、`.btn-primary:hover`、
    `::selection`、`.tone-hibi` 整屏。
  - `--act #007ba8` 行动：按钮底（白字 4.8:1）、label 文字（白底上 4.8:1）、section 编号。
  数据色和行动色必须分开，否则结算卡看起来可点。深色底一律用 sky，`--act` 压 ink 只有 3.84:1。
- **`.tone-hibi` = 浅色 tone**，不是深色的。因为 `#00a1e0` 只能配墨字，默认的墨色标题／
  正文／发丝线原样成立，只需要救灰字（`--gray-s` 在它上面 1.7:1 → 换 `--ink-2` 7.06:1）
  和两处 hibi 压 hibi。首页只有"三方，同一笔交易"用它——一页需要 hero 之后的第二个锚点。
- **顶栏保持浅色毛玻璃**。做过墨色实心 masthead，用户否掉了。
- **入场是扫，不是淡入**：`.rise` 用 clip-path 左→右揭开，全程不透明度不变，对齐全站硬切
  语汇。必须 `backwards` 不能 `both`——`both` 会把 clip-path 永久留在元素上，
  `.cta-row` 里按钮的 focus ring 会被裁掉。
- **顶栏是墨色实心 masthead**，不是毛玻璃（globals.css 头部第一行规则就写着 no glass）。
  不加 blur：底下内容滚过去时颜色会变，会闪的横条不叫 masthead。
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
