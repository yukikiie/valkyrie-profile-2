# 裝備、道具與魔法資料研究紀錄

整理日期：2026-11-01。目標為 PS2《Valkyrie Profile 2: Silmeria》，未混入一代 Lenneth 或《咎を背負う者》數值。

## 交付資料與範圍

- `data/equipment.js`：114 把武器，包含輕劍 36、大劍 26、槍 5、弓 24、法杖 17、拳套 5、透器 1；50 種技能；66 顆封印石；96 件防具；40 名英靈候選與 20 組遺物候選群；15 筆來源。
- `data/items.js`：386 件飾品／符文素材；140 件道具（74 消耗及能力道具、28 其他素材、38 關鍵道具）；23 種一般魔法與 6 種大魔法；333 筆商店庫存與製作資料。
- 每筆紀錄附 `sourceIds`。專有物品名保留 `jp` 欄；武器與一般魔法並提供英文版對照。武器及消耗品的中文名稱是作者辨識譯名，不宣稱官方中文定名。
- 中文效果、機制解說與導航用地名由本攻略重新撰寫，未轉載原站的物品風味描述或整段攻略文字。名字、能力值、部位／掉落、配方是遊戲事實資料。

這裡的「完整名冊」指與列出的來源整表對齊；不宣稱已由遊戲程式逐項反編譯證實全部參數。存在來源不明符號或不同實測記載時，保留備註而不杜撰數值。

## 主要來源與核對方法

1. [ZAPAnet 武器表](https://zapanet.info/vp2/63.html)、[防具表](https://zapanet.info/vp2/64.html)、[技能表](https://zapanet.info/vp2/68.html)、[封印石表](https://zapanet.info/vp2/93.html)、[英靈名冊](https://zapanet.info/vp2/115.html)。
2. 青珠の星々作者整理的[武器／製作素材](https://www.seiju.info/vp2/item/weapon.html)、[防具與職業](https://www.seiju.info/vp2/item/protector.html)、[386 件飾品](https://www.seiju.info/vp2/item/accessory.html)、[技能](https://www.seiju.info/vp2/skill.html)、[封印石](https://www.seiju.info/vp2/stone.html)、[解放與贈禮](https://www.seiju.info/vp2/chara/ein.html)、[英靈魔法 AP](https://www.seiju.info/vp2/chara/einherjar.html)。
3. [Gundam4fun 原作者 Items Guide v2.2](https://gamefaqs.gamespot.com/ps2/931102-valkyrie-profile-2-silmeria/faqs/46213)：以職業、主能力值、攻擊次數、可否決技、MAG 配對全部 114 把日／英武器，確認一對一、不重複。整表比對 ATK／MAG 與攻擊次數；補齊 HIT、副能力、武器屬性倍率及英文名稱。其[同作者純文字鏡像](https://www.supercheats.com/playstation2/walkthroughs/valkyrieprofile2silmeria-walkthrough09.txt)供下載解析。
4. [RealXaenith 完整攻略](https://gamefaqs.gamespot.com/ps2/931102-valkyrie-profile-2-silmeria/faqs/74344)、[Monistic_Turtle 完整攻略](https://gamefaqs.gamespot.com/ps2/931102-valkyrie-profile-2-silmeria/faqs/48850)：核對永久離隊門檻、技能符文與裝備使用時機。
5. [Gorilla wiki 刀劍表](https://valkyrieprofile2.gorillawiki.jp/entry/29)、[chulip 作者決技表](https://chulip.org/entry/2009/03/11/000000)、[RPGDL 原作者實測](https://www.rpgdl.com/forums/index.php?topic=62.0)：處理少數交叉來源歧異。
6. [巴哈姆特 Azrael 維爾諾亞交易品整理](https://forum.gamer.com.tw/G2.php?bsn=2967&lorder=5&parent=667&sn=1176)：確認 Elemental Edge 的尖銳矛頭需求為 2 個。

## 已修正的來源錯誤與避免混淆的地方

| 項目 | 本資料處理 |
|---|---|
| 霊剣カールスナウト 掉落 | 採クラスティゴーレム；ZAPAnet 武器表的リザードマン與另外兩份日文表不一致。 |
| ブラッディダスター | 紅蓮第 1 層；ZAPAnet 武器頁誤列第 2 層，青珠及 Gundam4fun 一致為第 1 層。 |
| 魔剣グラム | 闇屬性；青珠漏列，以 ZAPAnet 與 Gundam4fun 的 0.1 Darkness 交叉確認。 |
| 神剣ランドグリーズ | 無武器屬性；青珠列聖，以 ZAPAnet 與 Gundam4fun 一致結果為準。 |
| 竜杖ドラゴンロア | RST10；青珠列 8，以其餘兩份一致結果為準。 |
| 誓剣オートクレイル／イグニートソード | 增加決技「傷害」30%，非增加量表；青珠及原作者英文攻略一致。 |
| イグニートソード／シルバークラッド | 補齊前者炎屬性與 RDM-20、後者 HIT20；ZAPAnet 副能力不完整。 |
| 閃刀シルヴァンス | 校正 ZAPAnet 的シルヴィンス拼字；原錯字保留為 `sourceAlias`。 |
| Double Edge／Triple Edge | 每次攻擊重複命中 2／3 次；不增加可設定通常技的欄位數。 |
| Protect Magic | CP2；ZAPAnet 誤列 3。 |
| Dragon Slayer 技能 | CP5；ZAPAnet 未填。 |
| Psychosoma／フェイント | 紅色：頭＋腕＋發揮＋冰。青珠此列誤記為腳；依 ZAPAnet 與英文攻略校正。 |
| Normalize／オーディナリーシェイプ | AP12，非 ZAPAnet 的 15。 |
| Reflect Sorcery／リフレクトソーサリー | AP22，非 ZAPAnet 的 20。 |
| Elemental Edge 素材 | 猛禽の爪×1、するどい矛先×2、鉄鉱石×2；青珠矛頭數量誤列 1。 |

所有武器配方的需求數量多重集合另與 Gundam4fun 對比；唯一數量歧異為上表 Elemental Edge，已校正。一般魔法 AP 另與青珠各職業魔法表比對，兩項歧異如上。

飾品原表有三個耐性符號寫成 `?` 的情況：漆黒の竜鱗、シャープシザーの翼、トリックスターの刻印。這些含糊的耐性加減數值未當成確定值，對應紀錄保留備註；其他確定效果仍完整列出。

ペイルフレアー 的決技量表增加量在來源間為 42／45，本資料 `heat` 留空並明確註記；未任選其一。

## 永久離隊獎勵核對

| 時限 | 角色 | 門檻與額外獎勵 |
|---|---|---|
| 第 3 章奉龍殿最後事件前 | レオーネ／Leone | Lv35：裂刀ファーウェル；Lv40：再加ヴァルキリーフェイバー。 |
| 同上 | アリューゼ／Arngrim | Lv35：ドラゴンスレイヤー改；Lv40：再加バハムートティア。 |
| 第 4 章結束前 | ディラン／Dylan | Lv40：不死者の剣；Lv45：再加虐げられし者の剣。 |
| 同上 | レザード／Lezard | Lv40：賢者の石の破片；Lv45：再加ホムンクルスの種。兩者都是飾品。 |

高階獎勵會同時保有上述較低門檻的獎勵。Lezard 的碎片有 MAG+100 與機率傳送敵人效果；種子為六屬性耐性 +20%。不要把它們誤寫成法杖。

英靈解放則是另一個系統：加入後提高 5 級可解放，永久離隊；武器、防具隨人離開，飾品會退回。飾品例外依 Eclesis 原作者 [Einherjar List 的 RELEASE 段落](https://gamefaqs.gamespot.com/ps2/931102-valkyrie-profile-2-silmeria/faqs/43867)校正。40 名候選分屬 20 組遺物，每組隨機選 1 人，所以單輪不能同時招募 40 人。解放瞬間能力道具與日後在現世對話贈禮分開列述。

## 驗證

- `node --check data/equipment.js`、`node --check data/items.js`。
- 在 Node 中建立 `window` 後載入兩檔，驗證所有陣列可讀、所有主要欄位非空、每組 ID 唯一、來源 ID 可在來源集合中解決。
- 全 114 把武器英文對照各配對一次，基本能力及攻擊次數無殘餘衝突。
- 50 種技能均含 CP、顏色、符文組合與中文效果；66 顆封印石均含中文效果。
- 386 件飾品效果無殘留日文語句；日文專有物品與人物名稱保留作對照。
