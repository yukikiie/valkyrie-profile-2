# 女神戰記 2：希爾梅莉亞｜繁體中文攻略

供 GitHub Pages 使用的靜態 HTML 攻略，包含六章主線、支線迷宮、熾天使之門、可搜尋圖鑑與收集清單。核對日期：2026-11-01。

目前收錄 50 個流程區段、169 個步驟、157 組財寶核對點、10 項支線、234 筆敵人／戰鬥階段、114 件武器、96 件防具、50 項技能、66 顆封印石與 40 名英靈，另有 386 筆飾品／符文素材、140 筆道具、29 筆魔法及 333 筆商店與製作資料，共連結 127 個不同來源頁。

本機預覽：

```sh
node scripts/serve.cjs
```

瀏覽 `http://127.0.0.1:4173`。建立出版檔：

```sh
node scripts/build.cjs
```

`dist/valkyrie-profile-2.html` 為可直接開啟、離線使用的單一 HTML；`dist/site/` 為 GitHub Pages 版本。原作者實際地圖與來源連結需要網路。

資料完整性檢查：`node scripts/audit.cjs`。桌面與手機瀏覽測試涵蓋搜尋、篩選、HP 差異表、圖鑑視窗、所有參考資料頁、進度匯入匯出與單檔版；驗證紀錄見 [research/validation.md](research/validation.md)。

預定儲存庫為 [`yukikiie/valkyrie-profile-2`](https://github.com/yukikiie/valkyrie-profile-2)，Pages 預定網址為 `https://yukikiie.github.io/valkyrie-profile-2/`。部署狀態為待 GitHub 授權與實際發布；本機完成不代表網址已上線。將出版檔部署至該儲存庫的 GitHub Pages，並依儲存庫設定啟用 Pages 工作流程。

中文名稱為本站自譯，日名保留作遊戲選單對照。所有流程小圖都是原創順序示意；精確房間幾何請使用遊戲內地圖或各區連結的原作者地圖。25 筆敵人圖像對照採有出處的社群成就徽章，其餘使用分類示意圖。部分敵人能力、掉落率及版本差異仍標為未核實，完整範圍見 [研究覆蓋紀錄](research/coverage.md)。

主要事實來源為 [ZAPAnet](https://zapanet.info/vp2/)、[青珠之星](https://www.seiju.info/vp2.html)、[GAME 大寶庫](https://game.daihouko.com/valkyrieprofile/2/)、[GorillaWiki](https://valkyrieprofile2.gorillawiki.jp/)，以及 [Gundam4Fun 物品攻略](https://www.neoseeker.com/valkyrie-profile-2-silmeria/faqs/143712-valkyrie-profile-2-item.html)、[YYugi51 SG 攻略](https://www.supercheats.com/playstation2/walkthroughs/valkyrieprofile2silmeria-walkthrough05.txt)等原作者資料；每項資料附有來源。官方原畫展示來源為 [RPGFan](https://www.rpgfan.com/gallery/valkyrie-profile-2-silmeria-artwork/)，敵人徽章對照來源為 [RetroAchievements](https://retroachievements.org/forums/topic/22725)。原遊戲與原畫權利屬 tri-Ace、Square Enix 及原權利人，地圖與攻略來源保留原作者署名。
