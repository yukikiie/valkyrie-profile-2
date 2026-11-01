# 地區攻略與介面改版

依使用者回饋，章節不再只提供事件順序與外部地圖入口。每個地點新增地圖、寶藏、怪物、掉落四個分頁；各次到訪與樓層的遭遇分開，逐筆連回完整圖鑑。實際數量由網站資料自動統計，來源與未核實欄位保留。

迷宮配置圖按來源快取於 `assets/maps/`，保留作者、原圖與攻略頁入口。城鎮失效原圖不以破圖顯示，改依可核對的文字與相對位置製作設施導覽。地圖上的互動標記對應作者的寶藏編號，不是遊戲世界座標；有疑問的位置不補猜標記。

視覺採用受《原神》圖鑑介面啟發的深藍星空、象牙白內容面板、金色邊框與圓角分頁。正文以 17px 為主，手機維持至少 16px；標題使用文楷。這是非官方玩家攻略，與《原神》及其開發商沒有關係。

字體為本機提供的開源子集：`assets/fonts/guide-sans.woff2` 源自 [Noto Sans TC](https://github.com/google/fonts/tree/main/ofl/notosanstc)，`assets/fonts/guide-wenkai.woff2` 源自 [LXGW WenKai TC](https://github.com/lxgw/LxgwWenkaiTC)。已保留 SIL Open Font License 全文，子集內部名稱改為 Silmeria Guide Sans／Silmeria Guide WenKai。

原創裝飾背景使用內建 imagegen 生成，專案位置為 `assets/celestial-landscape.webp`。它不是遊戲截圖或地理配置圖。生成提示如下：

> Wide 16:9 original anime fantasy environment for a Valkyrie Profile 2 guide, inspired by airy painterly worldbuilding and celestial elegance. A distant ancient pale stone palace with slender spires on floating mountainous islands; blue sky shading toward midnight at the upper edge, soft ivory clouds, subtle golden light, emerald cliffs. Place architecture on the right and quiet blue cloud haze on the left for headings. No characters, text, UI, official logos, treasure chests or map claims. Palette: cornflower blue, indigo, ivory and muted champagne gold.

生成原稿保留於 Codex 的 generated_images 目錄，專案版僅做 WebP 壓縮。地圖素材均來自有署名的實際攻略來源，沒有以生成圖片代替真實位置資料。
