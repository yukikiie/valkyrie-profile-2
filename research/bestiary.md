# 《女神戰記 2：希爾梅莉亞》怪物資料核對紀錄

核對日：2026-11-01。成品：`data/monsters.js`。

目前整理 234 個不同敵人／階段紀錄，涵蓋主線第 1–6 章、可選迷宮、熾天使之門五層、稀有敵人與犬小屋事件。46 個紀錄標為 Boss／固定戰敵人。231 筆有至少一種查得的 HP 紀錄，166 筆有戰鬥能力值；未取得的欄位保留 `null`，沒有推算補零。掉落分類經交叉審核後保留 2,898 列，修正紀錄見 `audit.md`。

中文名稱是本站自譯，不冒充官方中文譯名；日文名稱是搜尋、對照裝備製作與辨識敵人的依據。常見的來源錯字與半形／全形差異已合併，第二場艾沃爾布與第一場分開保留。

## 來源與取捨

- [攻略大寶庫敵ステータス](https://game.daihouko.com/valkyrieprofile/2/54.html)：一般敵人的 16 欄能力與六屬性抗性。
- [攻略大寶庫ボス攻略](https://game.daihouko.com/valkyrieprofile/2/29.html)：Boss 能力及分階段資料。部分前期 Boss 表格的標題有位移，不能直接照標題取值，已與下一項的明確成對欄位核對。
- [VP2 攻略站山岳遺跡](https://vp2.kouryaku.red/entry4.html)、[森林遺跡](https://vp2.kouryaku.red/entry14.html)、[奉龍殿](https://vp2.kouryaku.red/entry16.html)與各章／SG頁：獨立核對 Boss 數值及補充 SG 能力值。每筆數據引用的實際頁面都列於 `VP_MONSTER_SOURCES`。
- [ZAPAnet 怪物](https://zapanet.info/vp2/55.html)、[Boss](https://zapanet.info/vp2/108.html)、[SG](https://zapanet.info/vp2/187.html)及 20 個迷宮頁：弱點部位、HP 另一紀錄、掉落與攻略機制。沒有複製其攻略敘述，中文戰術重新撰寫。
- [chulip 全區域怪物紀錄](https://chulip.org/entry/2009/03/14/000000)：完整名稱、種類、出現區域及入手品盤點。其數值明顯處於強化環境，因此未當成初周基礎數值。
- [青珠の星々各章](https://www.seiju.info/vp2/chart/chart1.html)與[熾天使之門](https://www.seiju.info/vp2/chart/seraphic.html)：大範圍基礎 HP、部位素材與領袖獎勵。
- Pluto [序盤](https://www.pluto-dm.com/vp2/enm01.html)、[中盤](https://www.pluto-dm.com/vp2/enm02.html)、[終盤](https://www.pluto-dm.com/vp2/enm03.html)、[SG](https://www.pluto-dm.com/vp2/enm04.html)：各地區敵人盤點、部位、指定掉落率及稀有遭遇資訊。

本地抽取只保留事實性欄位，不收錄第三方攻略文章全文。暫存 HTML 不屬於出版成品。

## 必須在前端呈現的差異

1. `hp` 優先採用青珠基礎表，`hpVariants` 保留其他來源的實際遭遇數字。例如彈射犀牛有 680 與 816，雙足飛龍有 1600 與 1920。領袖、封印石及周目會影響實戰值，不能只放一個 HP 又宣稱所有情況固定相同。
2. `hpVariants` 有 `sourceId` 與可查得的 `context`。蓋因與沃爾札在主線與 SG 第五層同名，能力及 HP 不同；主欄為主線值，SG 的 HP 另保留來源及上下文。
3. 前期 Boss 數值表存在實質標題錯誤：例如原站把飛龍 MAG 80 放在 AVD 標題後。另一站明列 ATK 95／MAG 80／HIT 34／AVD 28／RDM 23／RST 5，故以可核對的對應欄位修正。殭屍龍以後的原站欄位並未全部位移，不能全表套用同一修正。
4. 抗性用負數表示弱點、正數表示減傷；`吸收` 獨立表示。不存在的欄位是未核實，不是抗性 0。
5. `drops[].kind` 區分領袖獎勵、部位破壞及未細分的入手表。未有來源的精確機率保留 `null`；只有來源明列 100% 等數字才填入。來源對物品漢字／片假名有少數異記，保留供遊戲對照。
6. `weakParts` 是來源記載的部位；中文戰術提供採集及屬性方向，不把所有部位都誤稱為必定暴擊或額外傷害的固定弱點。
7. 上半蜥龍、上半神祕蜥龍與炎之九頭蛇沒有獨立確證的初周 HP，保留未核實。分裂前後 HP 不能直接以猜測複製。

## 圖像狀態

所有 `icon` 目前為種族示意圖的分類鍵（`dragon`、`insect`、`plant`、`undead`、`demon`、`god`、`beast`、`scaled`、`magic`、`giant`、`unknown`），不是宣稱為怪物原圖。

Carpsoft 舊圖鑑 `http://www.carpsoft.com.br/vp2/` 無法連線。[RetroAchievements 社群頁](https://retroachievements.org/forums/topic/22725) 明確把 Boss 名稱連到該敵人的成就徽章，是可考慮的有來源小圖；需在成品標明為社群成就徽章。實際素材的引用與下載交由主代理統一處理，避免把通用圖案冒充遊戲敵人立繪。

## 成品欄位

`window.VP_MONSTERS`：`id`, `name`（繁中自譯）, `jp`, `en`, `aliases`, `area[]`, `type[]`（繁中）, `typeJp[]`, `level`, `hp`, `atk`, `mag`, `hit`, `avd`, `rdm`, `rst`, `resist{}`, `weakness`, `weakParts`, `drops[]`, `tactic`, `boss`, `rare?`, `sourceIds[]`, `fieldSourceIds{}`, `hpVariants[]`, `hpNote?`, `statsNote?`, `icon`。

`window.VP_MONSTER_SOURCES`：每個來源的 `id`, `title`, `url`, `kind`, `note?`。

`window.VP_MONSTER_META`：覆蓋數量、核對日及譯名／數值／圖示的說明。此圖鑑是涵蓋各區域的資料彙整，仍不可聲稱所有怪物的所有能力與所有條件機率均已完整確證。
