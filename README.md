# 女神戰記 2：希爾梅莉亞｜繁體中文攻略

供 GitHub Pages 使用的靜態 HTML 攻略，包含六章主線、支線迷宮、熾天使之門、可搜尋圖鑑與收集清單。核對日期：2026-11-01。

目前收錄 50 個流程區段、169 個步驟、10 項支線、234 筆敵人／戰鬥階段、114 件武器、96 件防具、50 項技能、66 顆封印石與 40 名英靈，另有 386 筆飾品／符文素材、140 筆道具、29 筆魔法及修正合併後的 404 筆商店與製作資料，共連結 165 個不同來源頁。

章節內新增 **地圖／寶藏／怪物／掉落** 四分頁，涵蓋 37 個實際地區、51 張配置圖、365 筆逐物寶藏位置與 118 個互動標記。42 個不同來源圖檔已快取，可在網站或離線版中直接放大閱讀；7 張城鎮設施圖依原作者逐戶攻略重繪，另有 1 張通道示意。各次到訪和樓層的怪物分開整理，提供 4,237 筆區域掉落紀錄。

**城鎮與 NPC** 按章節直接展示 61 項事件／補給，以及另列的 40 名條件再會 NPC。每章都有需求、餵食門檻、對話選項、數量、回報地點及期限；相關迷宮完成處也顯示回城領獎提醒。四位同伴的離隊贈禮列完整等級表；英靈則列招募、互斥候選、解放、所在地及最終存檔前後的不同報酬。來源未明列的 19 筆再會物品數量保留未知，沒有默認為 1。

點物品名稱可查寶藏、怪物部位、當地掉落、商店、NPC 與英靈再會來源；65 種不同製作配方的 146 種材料皆可追查取得方法。三種動物指環的商人、熟客門檻與成品售價分開說明。貓消失時點、低等級離隊門檻等來源歧異保留註記。

本機預覽：

```sh
node scripts/serve.cjs
```

瀏覽 `http://127.0.0.1:4173`。建立出版檔：

```sh
node scripts/build.cjs
```

`dist/valkyrie-profile-2.html` 為可直接開啟、離線使用的單一 HTML；`dist/site/` 為 GitHub Pages 版本。地圖、字體與必要圖片均已內嵌於單檔版；只有外部參考連結需要網路。

資料完整性檢查：`node scripts/audit.cjs` 與 `node scripts/audit-locations.cjs --require-locations`。桌面與手機瀏覽測試涵蓋搜尋、篩選、HP 差異表、圖鑑視窗、地圖／寶箱互動、區域掉落、進度匯入匯出與單檔版；驗證紀錄見 [research/validation.md](research/validation.md)。

城鎮與素材來源檢查：`node scripts/audit-town-items.cjs`。互動查找測試：`node scripts/smoke-town-items.cjs`，涵蓋食材、配方、怪物部位、NPC 與商人、章節期限、320／390px 手機版及離線單檔版。

逐章可讀性檢查：`node scripts/smoke-chapter-npcs.cjs` 不會強制打開收合區塊，驗證第二至六章與 SG 的事件初次開啟便可閱讀。資料分期檢查：`node scripts/audit-chapter-npcs.cjs`。

頁面頂部提供常駐搜尋框，支援中／日／英名稱、即時建議及空格組合關鍵字，可直接前往地點、寶藏位置、當地掉落與裝備資料。按 Enter 顯示完整結果，按 `/` 開啟全站搜尋。專用測試為 `node scripts/smoke-search.cjs`，可用 `VP_TEST_ORIGIN` 指定部署網址。

正式網站：**[開啟繁體中文攻略](https://yukikiie.github.io/valkyrie-profile-2/)**。原始碼位於 [`yukikiie/valkyrie-profile-2`](https://github.com/yukikiie/valkyrie-profile-2)，已啟用 GitHub Pages 自動部署；推送至 `main` 後，工作流程會檢查資料、建立網站及單檔版，再發布網站。

**[下載／開啟單一 HTML](https://yukikiie.github.io/valkyrie-profile-2/valkyrie-profile-2.html)**：另存後可離線閱讀內嵌資料、地圖、字體與圖片。

中文名稱為本站自譯，日名保留作遊戲選單對照。配置圖保留原作者地圖標號並附署名與來源；城鎮重繪圖明示比例與未確認位置。25 筆敵人圖像對照採有出處的社群成就徽章，其餘使用分類示意圖。部分敵人能力、掉落率及版本差異仍標為未核實，完整範圍見 [研究覆蓋紀錄](research/coverage.md)。字體與原創背景說明見 [改版紀錄](research/redesign.md)。

主要事實來源為 [ZAPAnet](https://zapanet.info/vp2/)、[青珠之星](https://www.seiju.info/vp2.html)、[GAME 大寶庫](https://game.daihouko.com/valkyrieprofile/2/)、[GorillaWiki](https://valkyrieprofile2.gorillawiki.jp/)，以及 [Gundam4Fun 物品攻略](https://www.neoseeker.com/valkyrie-profile-2-silmeria/faqs/143712-valkyrie-profile-2-item.html)、[YYugi51 SG 攻略](https://www.supercheats.com/playstation2/walkthroughs/valkyrieprofile2silmeria-walkthrough05.txt)等原作者資料；每項資料附有來源。官方原畫展示來源為 [RPGFan](https://www.rpgfan.com/gallery/valkyrie-profile-2-silmeria-artwork/)，敵人徽章對照來源為 [RetroAchievements](https://retroachievements.org/forums/topic/22725)。原遊戲與原畫權利屬 tri-Ace、Square Enix 及原權利人，地圖與攻略來源保留原作者署名。
