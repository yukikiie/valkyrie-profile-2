/* Source-checked merchant identities, recipe repairs and additional stock. */
window.VP_CRAFTING = {
  "version": "2026-11-01",
  "sources": [
    {
      "id": "cf-chulip-shops",
      "title": "chulip 原作者：八處商店價格與逐項素材配方",
      "url": "https://chulip.org/entry/2009/03/07/000000"
    },
    {
      "id": "cf-pluto-shops1",
      "title": "Pluto 原作者：索爾德、迪潘與移動行商人配方及素材來源",
      "url": "https://www.pluto-dm.com/vp2/shop03.html"
    },
    {
      "id": "cf-pluto-shops2",
      "title": "Pluto 原作者：維爾諾亞、克雷爾蒙費蘭、阿斯嘉特配方及素材來源",
      "url": "https://www.pluto-dm.com/vp2/shop04.html"
    },
    {
      "id": "cf-z-tech",
      "title": "ZAPAnet：熟客商品與指定店舖出售素材機制",
      "url": "https://zapanet.info/vp2/50.html"
    },
    {
      "id": "cf-z-shops",
      "title": "ZAPAnet：城鎮商店庫存與價格",
      "url": "https://zapanet.info/vp2/74.html"
    },
    {
      "id": "cf-gundam-items",
      "title": "Gundam4fun 原作者 Items Guide v2.2：配方、價格、移動商人與唯一品",
      "url": "https://www.supercheats.com/playstation2/walkthroughs/valkyrieprofile2silmeria-walkthrough09.txt"
    },
    {
      "id": "cf-fanboy-walkthrough",
      "title": "triAce_Fanboy 原作者：商店、城鎮位置與三種動物指環熟客門檻",
      "url": "https://gamefaqs.gamespot.com/ps2/931102-valkyrie-profile-2-silmeria/faqs/45045"
    },
    {
      "id": "cf-bahamut-villnore",
      "title": "Azrael 原作者實測：維爾諾亞配方、累計消費門檻及素材數量",
      "url": "https://forum.gamer.com.tw/G2.php?bsn=2967&lorder=5&parent=667&sn=1176"
    },
    {
      "id": "cf-gorilla-asgard",
      "title": "Gorilla wiki：阿斯嘉特商店與索羅門指環價格",
      "url": "https://valkyrieprofile2.gorillawiki.jp/entry/22"
    },
    {
      "id": "cf-gorilla-crell",
      "title": "Gorilla wiki：克雷爾蒙費蘭武器、防具及指環價格",
      "url": "https://valkyrieprofile2.gorillawiki.jp/entry/20"
    },
    {
      "id": "cf-gorilla-villnore",
      "title": "Gorilla wiki：維爾諾亞裝備及道具價格",
      "url": "https://valkyrieprofile2.gorillawiki.jp/entry/18"
    },
    {
      "id": "cf-manual",
      "title": "Square Enix 原版說明書：Valued Customer Items；每件商品依已售素材數量製作",
      "url": "https://www.scribd.com/document/1065675675/Valkyrie-Profile-2-Manual-PS2"
    }
  ],
  "mechanics": {
    "title": "熟客商品：材料、商人與累計消費要一起滿足",
    "paragraphs": [
      "表列材料數量是一件成品所需。先在指定商人處累計購物，讓問號商品名稱顯示；再把每項材料按需求數量賣給同一家店，最後另付成品價格購買。",
      "賣給別家店的素材不會跨店共用；每買一件會耗用該店一組素材庫存。材料可來自部位破壞、DA、寶箱、另一家店購得的裝備或城鎮事件，需依取得頁面的條件收集。",
      "人界移動行商人跨章節換位置，已出售的素材與熟客進度隨同一商人保留；阿斯嘉特是獨立商人。迪潘城下町的固定商店僅前期可用。",
      "售價與熟客門檻是兩筆不同金額。例如貓、犬、鳥指環各先累計消費 80,000 OTH，交齊各自四件動物報酬後，成品各付 1 OTH。索羅門指環再用三種指環各 1 件，加 900,000 OTH 製作。",
      "庫存總表包含後期追加品；素材可取得的進度也會限制製作。未找到可靠數值的熟客門檻不填入推測金額，請以遊戲內商品名稱是否顯示確認。"
    ],
    "sourceIds": [
      "cf-manual",
      "cf-z-tech",
      "cf-gundam-items",
      "cf-fanboy-walkthrough",
      "cf-pluto-shops1",
      "cf-gorilla-asgard"
    ]
  },
  "merchants": [
    {
      "id": "solde-armory",
      "name": "索爾德武器防具店",
      "townIds": [
        "solde"
      ],
      "shopNames": [
        "索爾德（ゾルデ）武器防具店",
        "港町索爾德（ゾルデ）"
      ],
      "matchingPatterns": [
        "ゾルデ",
        "索爾德"
      ],
      "location": "從港口沿主街向左，第一棟民宅再往左的武器防具店。",
      "chapters": [
        "ch1",
        "ch2",
        "ch3",
        "ch4",
        "ch5",
        "ch6"
      ],
      "conditions": "商品隨主線進度追加；此處是跨章節總表。貓指環需本店累計消費 80,000 OTH，並先出售四種貓報酬各 1 件，再付 1 OTH。",
      "sourceIds": [
        "cf-fanboy-walkthrough",
        "cf-chulip-shops",
        "cf-pluto-shops1"
      ]
    },
    {
      "id": "dipan-armory",
      "name": "迪潘城下町武器防具店",
      "townIds": [
        "dipan-town"
      ],
      "shopNames": [
        "迪潘（ディパン）武器防具店"
      ],
      "matchingPatterns": [
        "ディパン）武器防具店",
        "ディパン城下町"
      ],
      "location": "第 2 章從東側入口向左，經旅館與酒館，後街支路附近繼續向左；店舖左側民宅有第二段詩文。",
      "chapters": [
        "ch2"
      ],
      "conditions": "僅第 2 章前期可使用這家固定店。之後迪潘城庭院／入口的商人是移動行商人；勿把素材先賣在這裡，卻打算留到後期製作。",
      "sourceIds": [
        "cf-fanboy-walkthrough",
        "cf-pluto-shops1",
        "cf-chulip-shops"
      ]
    },
    {
      "id": "traveller",
      "name": "人界移動行商人",
      "townIds": [
        "coriander",
        "kalstad",
        "dipan-town",
        "dipan-castle"
      ],
      "shopNames": [
        "旅行商人",
        "科利安德爾村（コリアンドル村）旅行商人",
        "卡爾斯塔德（カルスタッド）旅行商人"
      ],
      "matchingPatterns": [
        "旅行商人",
        "コリアンドル",
        "カルスタッド"
      ],
      "location": "第 3 章先在科里安德村入口，後在卡爾斯塔德旅館內；第 4 章在迪潘城庭院；第 5 章取食屍鬼粉時在迪潘入口；第 6 章回到科里安德村。",
      "chapters": [
        "ch3",
        "ch4",
        "ch5",
        "ch6"
      ],
      "conditions": "同一商人移動，已售素材與熟客進度會保留；阿斯嘉特商人另計。鳥指環需向此商人累計消費 80,000 OTH、出售雞的四件報酬各 1 件，再付 1 OTH。",
      "visits": [
        {
          "chapter": "ch3",
          "townId": "coriander",
          "location": "入村首先遇到的商人。"
        },
        {
          "chapter": "ch3",
          "townId": "kalstad",
          "location": "旅館內。"
        },
        {
          "chapter": "ch4",
          "townId": "dipan-castle",
          "location": "迪潘城庭院。"
        },
        {
          "chapter": "ch5",
          "townId": "dipan-town",
          "location": "為取得食屍鬼粉返回迪潘時的入口。"
        },
        {
          "chapter": "ch6",
          "townId": "coriander",
          "location": "科里安德村。"
        }
      ],
      "sourceIds": [
        "cf-gundam-items",
        "cf-fanboy-walkthrough",
        "cf-pluto-shops1"
      ]
    },
    {
      "id": "villnore-armory",
      "name": "維爾諾亞武器防具店",
      "townIds": [
        "villnore"
      ],
      "shopNames": [
        "維爾諾亞（ヴィルノア）武器防具店",
        "維爾諾亞（ヴィルノア）"
      ],
      "matchingPatterns": [
        "ヴィルノア",
        "維爾諾亞"
      ],
      "location": "從城鎮入口的旅館向右，經花販與酒館，再繼續向東的武器防具店。",
      "chapters": [
        "ch3",
        "ch4",
        "ch5",
        "ch6"
      ],
      "conditions": "每項熟客商品有各自累計消費門檻；標示的 OTH 是向本店購物的累計額，商品售價另付。素材能取得的進度也會限制實際製作時點。",
      "sourceIds": [
        "cf-fanboy-walkthrough",
        "cf-bahamut-villnore",
        "cf-chulip-shops"
      ]
    },
    {
      "id": "crell-armory",
      "name": "克雷爾蒙費蘭武器防具店",
      "townIds": [
        "crell"
      ],
      "shopNames": [
        "克雷爾蒙費蘭（クレルモンフェラン）武器防具店",
        "克雷爾蒙費蘭（クレルモンフェラン）"
      ],
      "matchingPatterns": [
        "クレルモンフェラン",
        "克雷爾蒙費蘭"
      ],
      "location": "城鎮主街區的武器防具店；同城另有通往上層旅館與民宅的階梯。",
      "chapters": [
        "ch3",
        "ch4",
        "ch5",
        "ch6"
      ],
      "conditions": "製作犬指環的商店在本城，餵狗地點則在維爾諾亞。先向本店累計消費 80,000 OTH，出售四種犬報酬各 1 件，再付 1 OTH。",
      "sourceIds": [
        "cf-fanboy-walkthrough",
        "cf-pluto-shops2",
        "cf-chulip-shops"
      ]
    },
    {
      "id": "asgard-merchant",
      "name": "阿斯嘉特神界商人",
      "townIds": [
        "asgard"
      ],
      "shopNames": [
        "阿斯嘉特（アスガルド）旅行商人",
        "アスカルド旅行商人"
      ],
      "matchingPatterns": [
        "アスガルド",
        "アスカルド",
        "阿斯嘉特"
      ],
      "location": "第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "chapters": [
        "ch5",
        "ch6"
      ],
      "conditions": "與人界移動行商人是不同店，素材與熟客進度不共用。索羅門指環需要貓、犬、鳥指環各 1 件，出售給此商人後另付 900,000 OTH；須先讓熟客商品名稱顯示。",
      "sourceIds": [
        "cf-gundam-items",
        "cf-gorilla-asgard",
        "cf-pluto-shops2"
      ]
    }
  ],
  "aliases": [
    {
      "from": "ナイトグリープ",
      "to": "ナイトグリーブ",
      "note": "原作者表格拼字差異；與物品名冊及獨立配方表對齊。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ]
    },
    {
      "from": "メタポライザー",
      "to": "メタボライザー",
      "note": "原作者表格拼字差異；與物品名冊及獨立配方表對齊。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ]
    },
    {
      "from": "魔鏡の破片",
      "to": "魔鏡の欠片",
      "note": "原作者表格拼字差異；與物品名冊及獨立配方表對齊。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ]
    },
    {
      "from": "巻貝の弾丸",
      "to": "貝殻の弾丸",
      "note": "原作者表格拼字差異；與物品名冊及獨立配方表對齊。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ]
    },
    {
      "from": "子鬼の牙",
      "to": "小鬼の牙",
      "note": "原作者表格拼字差異；與物品名冊及獨立配方表對齊。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ]
    },
    {
      "from": "蛇矛バシリスク",
      "to": "蛇矛バジリスク",
      "note": "原作者表格拼字差異；與物品名冊及獨立配方表對齊。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ]
    },
    {
      "from": "アスカルド",
      "to": "アスガルド",
      "note": "原作者表格拼字差異；與物品名冊及獨立配方表對齊。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ]
    },
    {
      "from": "魚鱗",
      "to": "魚燐",
      "note": "原作者表格拼字差異；與物品名冊及獨立配方表對齊。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ]
    },
    {
      "from": "ダマスクス鉱",
      "to": "ダマスカス鉱",
      "note": "原作者表格拼字差異；與物品名冊及獨立配方表對齊。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ]
    },
    {
      "from": "スピリームガード",
      "to": "スプリームガーブ",
      "note": "原作者表格拼字差異；與物品名冊及獨立配方表對齊。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ]
    },
    {
      "from": "スプリームガード",
      "to": "スプリームガーブ",
      "note": "原作者表格拼字差異；與物品名冊及獨立配方表對齊。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ]
    },
    {
      "from": "薬師の秘薬",
      "to": "薬士の秘薬",
      "note": "原作者表格拼字差異；與物品名冊及獨立配方表對齊。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ]
    },
    {
      "from": "プラギの詩篇",
      "to": "ブラギの詩篇",
      "note": "原作者表格拼字差異；與物品名冊及獨立配方表對齊。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ]
    },
    {
      "from": "対炎の護符",
      "to": "耐炎の護符",
      "note": "原作者表格拼字差異；與物品名冊及獨立配方表對齊。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ]
    },
    {
      "from": "フロストベイン",
      "to": "フロストペイン",
      "note": "原作者表格拼字差異；與物品名冊及獨立配方表對齊。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ]
    },
    {
      "from": "矛槍バジリスク",
      "to": "蛇矛バジリスク",
      "note": "原作者表格拼字差異；與物品名冊及獨立配方表對齊。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ]
    },
    {
      "from": "シンクレアサーベル",
      "to": "シンクレアーサーベル",
      "note": "原作者表格拼字差異；與物品名冊及獨立配方表對齊。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ]
    },
    {
      "from": "ツヴァイハンター",
      "to": "ツヴァイハンダー",
      "note": "原作者表格拼字差異；與物品名冊及獨立配方表對齊。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ]
    },
    {
      "from": "コンフーズチェック",
      "to": "コンフューズチェック",
      "note": "原作者表格拼字差異；與物品名冊及獨立配方表對齊。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ]
    },
    {
      "from": "ロイヤルグリーブ",
      "to": "ロイヤルグローブ",
      "note": "原作者表格拼字差異；與物品名冊及獨立配方表對齊。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ]
    },
    {
      "from": "魔境の欠片",
      "to": "魔鏡の欠片",
      "note": "原作者表格拼字差異；與物品名冊及獨立配方表對齊。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ]
    },
    {
      "from": "怨念の魂",
      "to": "怨念の塊",
      "note": "原作者表格拼字差異；與物品名冊及獨立配方表對齊。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ]
    },
    {
      "from": "ヒットプレート",
      "to": "ヒートプレート",
      "note": "原作者表格拼字差異；與物品名冊及獨立配方表對齊。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ]
    },
    {
      "from": "ジェントルガード",
      "to": "ジェントルカード",
      "note": "原作者表格拼字差異；與物品名冊及獨立配方表對齊。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ]
    },
    {
      "from": "アマダンタイト",
      "to": "アダマンタイト",
      "note": "アイアンゴーレム（m079）手臂掉落原表的假名順序誤記；與Gundam4fun的Adamantite及Pluto材料表一致對齊，保留原掉落字形作深連結。",
      "sourceIds": [
        "cf-gundam-items",
        "cf-pluto-shops1",
        "cf-fanboy-walkthrough"
      ]
    }
  ],
  "recipeCorrections": [
    {
      "shopId": "shop001",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop002",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop003",
      "merchantId": "solde-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "名刀蜘蛛切り",
          "quantity": 1
        },
        {
          "name": "フルンティング",
          "quantity": 1
        },
        {
          "name": "アダマンタイト",
          "quantity": 2
        },
        {
          "name": "真紅の牙",
          "quantity": 3
        }
      ],
      "price": 76000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "eq-seiju-weapons",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop004",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop005",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop006",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop007",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop008",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop009",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop010",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop011",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop012",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop013",
      "merchantId": "solde-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "錬赤鉱",
          "quantity": 1
        },
        {
          "name": "羅針鱗",
          "quantity": 1
        },
        {
          "name": "魔物のうろこ",
          "quantity": 2
        }
      ],
      "price": 25000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "eq-seiju-armor",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop014",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop015",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop016",
      "merchantId": "solde-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ナイトグリーブ",
          "quantity": 1
        },
        {
          "name": "黒曜の爪",
          "quantity": 2
        },
        {
          "name": "紅蓮のうろこ",
          "quantity": 1
        }
      ],
      "price": 60000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop017",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop018",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop019",
      "merchantId": "solde-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ドクロの器",
          "quantity": 3
        },
        {
          "name": "漆黒の結晶",
          "quantity": 2
        },
        {
          "name": "壊れたアミュレット",
          "quantity": 2
        }
      ],
      "price": 1500,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "it-seiju-accessories",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop020",
      "merchantId": "solde-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "琥珀",
          "quantity": 2
        },
        {
          "name": "淀んだ水",
          "quantity": 2
        },
        {
          "name": "壊れたアミュレット",
          "quantity": 2
        }
      ],
      "price": 1500,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "it-seiju-accessories",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop021",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop022",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop023",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop024",
      "merchantId": "solde-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "赤銅の聖印",
          "quantity": 1
        },
        {
          "name": "ホーリィスピネル",
          "quantity": 1
        }
      ],
      "price": 6000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop025",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop026",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop027",
      "merchantId": "solde-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "フェイタルシード",
          "quantity": 1
        },
        {
          "name": "命の輝石",
          "quantity": 2
        },
        {
          "name": "トロルクレイ",
          "quantity": 2
        }
      ],
      "price": 5000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop028",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop029",
      "merchantId": "solde-armory",
      "materials": [],
      "type": "商店販售",
      "price": 3600,
      "effect": "一般回復品，無須交素材；不可與 40,000 OTH 的精霊の霊薬配方混為一談。",
      "note": "原資料把精靈靈藥的配方錯套到妖精靈藥，已拆回正確兩件商品。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ],
      "notes": "原資料把精靈靈藥的配方錯套到妖精靈藥，已拆回正確兩件商品。"
    },
    {
      "shopId": "shop030",
      "merchantId": "solde-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "命の輝石",
          "quantity": 2
        },
        {
          "name": "大粒の真珠",
          "quantity": 1
        },
        {
          "name": "メタボライザー",
          "quantity": 2
        }
      ],
      "price": 40000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop031",
      "merchantId": "solde-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "魚燐",
          "quantity": 2
        },
        {
          "name": "獣肉",
          "quantity": 1
        },
        {
          "name": "祭祀書",
          "quantity": 1
        }
      ],
      "price": 800,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop032",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop033",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop034",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop035",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop036",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop037",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop038",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop039",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop040",
      "merchantId": "solde-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "崩虚珠",
          "quantity": 2
        },
        {
          "name": "金のコイン",
          "quantity": 1
        },
        {
          "name": "銀のコイン",
          "quantity": 1
        },
        {
          "name": "銅のコイン",
          "quantity": 1
        }
      ],
      "price": 20000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop041",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop042",
      "merchantId": "solde-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "妖精の小箱",
          "quantity": 3
        },
        {
          "name": "命の輝石",
          "quantity": 1
        },
        {
          "name": "ブラッドジュエリー",
          "quantity": 1
        }
      ],
      "price": 20000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop043",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop044",
      "merchantId": "solde-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "羅針鱗",
          "quantity": 3
        },
        {
          "name": "風切羽",
          "quantity": 2
        },
        {
          "name": "契約の鎖",
          "quantity": 2
        }
      ],
      "price": 20000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop045",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop046",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop047",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop048",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop049",
      "merchantId": "solde-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ポルト酒",
          "quantity": 2
        },
        {
          "name": "ロイヤルゼリー",
          "quantity": 1
        },
        {
          "name": "海鮮肉",
          "quantity": 3
        },
        {
          "name": "ひまわりのたね",
          "quantity": 1
        }
      ],
      "price": 50000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop050",
      "merchantId": "solde-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop051",
      "merchantId": "solde-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "崩虚珠",
          "quantity": 1
        },
        {
          "name": "魔眼の宝珠",
          "quantity": 2
        },
        {
          "name": "魔鏡の欠片",
          "quantity": 2
        },
        {
          "name": "アダマンタイト",
          "quantity": 1
        }
      ],
      "price": 10000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop052",
      "merchantId": "solde-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "狩られたネズミ",
          "quantity": 1
        },
        {
          "name": "尻尾の切れたトカゲ",
          "quantity": 1
        },
        {
          "name": "不幸な青い鳥",
          "quantity": 1
        },
        {
          "name": "ねこのふん",
          "quantity": 1
        }
      ],
      "price": 1,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 80000,
      "conditions": "向此商人累計購物 80,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "stockLimit": 1,
      "note": "原版物品攻略列為唯一品；餵食里程碑各給素材 1 件，通常只能湊出一組。",
      "sourceIds": [
        "it-z-shops",
        "it-seiju-accessories",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-fanboy-walkthrough"
      ],
      "notes": "原版物品攻略列為唯一品；餵食里程碑各給素材 1 件，通常只能湊出一組。"
    },
    {
      "shopId": "shop053",
      "merchantId": "dipan-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop054",
      "merchantId": "dipan-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop055",
      "merchantId": "dipan-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop056",
      "merchantId": "dipan-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop057",
      "merchantId": "dipan-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop058",
      "merchantId": "dipan-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop059",
      "merchantId": "dipan-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop060",
      "merchantId": "dipan-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop061",
      "merchantId": "dipan-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop062",
      "merchantId": "dipan-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop063",
      "merchantId": "dipan-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop064",
      "merchantId": "dipan-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop065",
      "merchantId": "dipan-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ドクロの器",
          "quantity": 3
        },
        {
          "name": "漆黒の結晶",
          "quantity": 2
        },
        {
          "name": "壊れたアミュレット",
          "quantity": 2
        }
      ],
      "price": 1500,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop066",
      "merchantId": "dipan-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "琥珀",
          "quantity": 2
        },
        {
          "name": "淀んだ水",
          "quantity": 2
        },
        {
          "name": "壊れたアミュレット",
          "quantity": 2
        }
      ],
      "price": 1500,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop067",
      "merchantId": "dipan-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop068",
      "merchantId": "dipan-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop069",
      "merchantId": "dipan-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop070",
      "merchantId": "dipan-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop071",
      "merchantId": "dipan-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop072",
      "merchantId": "dipan-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop073",
      "merchantId": "dipan-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ],
      "price": 80,
      "note": "真珠草售價校正為 80 OTH；Gorilla 與 chulip 一致，原 ZAPAnet 此店列成 150。",
      "notes": "真珠草售價校正為 80 OTH；Gorilla 與 chulip 一致，原 ZAPAnet 此店列成 150。"
    },
    {
      "shopId": "shop074",
      "merchantId": "dipan-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop075",
      "merchantId": "dipan-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop076",
      "merchantId": "dipan-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop077",
      "merchantId": "dipan-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop078",
      "merchantId": "dipan-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop079",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop080",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "漆黒の結晶",
          "quantity": 2
        },
        {
          "name": "虚ろの殻",
          "quantity": 2
        },
        {
          "name": "契約の鎖",
          "quantity": 1
        },
        {
          "name": "するどい矛先",
          "quantity": 2
        }
      ],
      "price": 200,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop081",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop082",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "カリバーン",
          "quantity": 1
        },
        {
          "name": "翠炎の尖晶石",
          "quantity": 3
        },
        {
          "name": "不滅の炎",
          "quantity": 1
        },
        {
          "name": "ダークアミュレット",
          "quantity": 1
        }
      ],
      "price": 1000000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop083",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "聖槍セントハルバード",
          "quantity": 1
        },
        {
          "name": "貫通の刻印",
          "quantity": 3
        },
        {
          "name": "錬金術の書",
          "quantity": 1
        }
      ],
      "price": 700000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop084",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop085",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ルビーメイス",
          "quantity": 1
        },
        {
          "name": "ホーリィスピネル",
          "quantity": 1
        },
        {
          "name": "赤銅の聖印",
          "quantity": 2
        }
      ],
      "price": 83000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop086",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop087",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "クラウン",
          "quantity": 1
        },
        {
          "name": "ホーリィスピネル",
          "quantity": 1
        },
        {
          "name": "魔鏡の欠片",
          "quantity": 2
        }
      ],
      "price": 25000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop088",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop089",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ジャンクシールド",
          "quantity": 2
        },
        {
          "name": "金剛石",
          "quantity": 1
        },
        {
          "name": "雹の宝珠",
          "quantity": 1
        }
      ],
      "price": 17000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop090",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop091",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "獣の毛皮",
          "quantity": 1
        },
        {
          "name": "こうもりの羽",
          "quantity": 2
        }
      ],
      "price": 3500,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop092",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop093",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop094",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop095",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "コアスピネル",
          "quantity": 1
        },
        {
          "name": "魔鏡の欠片",
          "quantity": 1
        },
        {
          "name": "契約の鎖",
          "quantity": 1
        },
        {
          "name": "バラの刻印",
          "quantity": 1
        }
      ],
      "price": 300000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop096",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "甲虫の角",
          "quantity": 3
        },
        {
          "name": "小悪魔の心臓",
          "quantity": 1
        },
        {
          "name": "ガイストコア",
          "quantity": 1
        }
      ],
      "price": 4000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop097",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "こうもりの羽",
          "quantity": 5
        },
        {
          "name": "虚ろの殻",
          "quantity": 1
        },
        {
          "name": "琥珀",
          "quantity": 1
        }
      ],
      "price": 2500,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ],
      "note": "Gorilla 的部分庫存頁列 2,000 OTH；Pluto 與 chulip 配方表列 2,500 OTH，沿用後者。",
      "notes": "Gorilla 的部分庫存頁列 2,000 OTH；Pluto 與 chulip 配方表列 2,500 OTH，沿用後者。"
    },
    {
      "shopId": "shop098",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop099",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop100",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop101",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop102",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "怨念の塊",
          "quantity": 1
        },
        {
          "name": "漆黒の結晶",
          "quantity": 2
        }
      ],
      "price": 6000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop103",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop104",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop105",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "エリクサー",
          "quantity": 1
        },
        {
          "name": "ロイヤルゼリー",
          "quantity": 1
        },
        {
          "name": "大ワシの心臓",
          "quantity": 1
        },
        {
          "name": "メタボライザー",
          "quantity": 1
        }
      ],
      "price": 10000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop106",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop107",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop108",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop109",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop110",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop111",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop112",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop113",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop114",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop115",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop116",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop117",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop118",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop119",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop120",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ジャンクシールド",
          "quantity": 1
        },
        {
          "name": "堅牢骨",
          "quantity": 1
        },
        {
          "name": "甲虫の殻片",
          "quantity": 1
        }
      ],
      "price": 5000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop121",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop122",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ひよこのえさ",
          "quantity": 1
        },
        {
          "name": "野菜くず",
          "quantity": 1
        },
        {
          "name": "貝殻入りのえさ",
          "quantity": 1
        },
        {
          "name": "とりのふん",
          "quantity": 1
        }
      ],
      "price": 1,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 80000,
      "conditions": "向此商人累計購物 80,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "stockLimit": 1,
      "note": "原版物品攻略列為唯一品；餵食里程碑各給素材 1 件，通常只能湊出一組。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-fanboy-walkthrough"
      ],
      "notes": "原版物品攻略列為唯一品；餵食里程碑各給素材 1 件，通常只能湊出一組。"
    },
    {
      "shopId": "shop123",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop124",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ロングソード",
          "quantity": 1
        },
        {
          "name": "獣の毛皮",
          "quantity": 3
        },
        {
          "name": "鉄鉱石",
          "quantity": 3
        }
      ],
      "price": 7500,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 5500,
      "conditions": "向此商人累計購物 5,500 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "shop125",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "壊れた剣",
          "quantity": 2
        },
        {
          "name": "セイバートゥース",
          "quantity": 1
        },
        {
          "name": "大粒の真珠",
          "quantity": 1
        },
        {
          "name": "ホーリィクリスタル",
          "quantity": 1
        }
      ],
      "price": 700000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 100000,
      "conditions": "向此商人累計購物 100,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ],
      "note": "chulip 價格多一個 0；採 Azrael、Pluto 及其他商店表一致的 700,000 OTH。",
      "notes": "chulip 價格多一個 0；採 Azrael、Pluto 及其他商店表一致的 700,000 OTH。"
    },
    {
      "shopId": "shop126",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "猛禽の爪",
          "quantity": 1
        },
        {
          "name": "するどい矛先",
          "quantity": 2
        },
        {
          "name": "鉄鉱石",
          "quantity": 2
        }
      ],
      "price": 6000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 5500,
      "conditions": "向此商人累計購物 5,500 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "shop127",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop128",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop129",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "スリングトップ",
          "quantity": 1
        },
        {
          "name": "羽毛",
          "quantity": 3
        }
      ],
      "price": 5500,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 5500,
      "conditions": "向此商人累計購物 5,500 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "shop130",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop131",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop132",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop133",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "アイアンヘルム",
          "quantity": 1
        },
        {
          "name": "甲虫の角",
          "quantity": 1
        },
        {
          "name": "小鬼の牙",
          "quantity": 1
        }
      ],
      "price": 8000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 6000,
      "conditions": "向此商人累計購物 6,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "shop134",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "クラウン",
          "quantity": 1
        },
        {
          "name": "セイバートゥース",
          "quantity": 1
        },
        {
          "name": "レッドホーン",
          "quantity": 1
        }
      ],
      "price": 800000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 90000,
      "conditions": "向此商人累計購物 90,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "shop135",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "白い花弁",
          "quantity": 2
        },
        {
          "name": "コアルビー",
          "quantity": 1
        },
        {
          "name": "魔眼の宝珠",
          "quantity": 1
        }
      ],
      "price": 5000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 4000,
      "conditions": "向此商人累計購物 4,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "shop136",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop137",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "キュイラス",
          "quantity": 1
        },
        {
          "name": "鉄鉱石",
          "quantity": 2
        },
        {
          "name": "シルバーサレット",
          "quantity": 2
        }
      ],
      "price": 4500,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 4000,
      "conditions": "向此商人累計購物 4,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "shop138",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop139",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "スプリームガーブ",
          "quantity": 1
        },
        {
          "name": "赤雷の珠",
          "quantity": 1
        },
        {
          "name": "フレイムブレスコア",
          "quantity": 1
        },
        {
          "name": "ユミルの涙",
          "quantity": 1
        },
        {
          "name": "ハームシード",
          "quantity": 1
        }
      ],
      "price": 50000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 30000,
      "conditions": "向此商人累計購物 30,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "shop140",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "骨クズ",
          "quantity": 1
        },
        {
          "name": "猛禽の爪",
          "quantity": 2
        },
        {
          "name": "羽毛",
          "quantity": 1
        }
      ],
      "price": 3000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 2000,
      "conditions": "向此商人累計購物 2,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "shop141",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "飛燕鱗",
          "quantity": 2
        },
        {
          "name": "ヒートプレート",
          "quantity": 1
        }
      ],
      "price": 7000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 6000,
      "conditions": "向此商人累計購物 6,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "shop142",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ワニ皮",
          "quantity": 1
        },
        {
          "name": "竜胆石",
          "quantity": 1
        }
      ],
      "price": 3000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 2000,
      "conditions": "向此商人累計購物 2,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "shop143",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop144",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "視玉",
          "quantity": 2
        },
        {
          "name": "怨念の塊",
          "quantity": 1
        },
        {
          "name": "レイフォース",
          "quantity": 1
        }
      ],
      "price": 3000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 2000,
      "conditions": "向此商人累計購物 2,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "shop145",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ベラドンナ",
          "quantity": 1
        },
        {
          "name": "魔物のうろこ",
          "quantity": 3
        },
        {
          "name": "折れた爪",
          "quantity": 1
        }
      ],
      "price": 3000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 2000,
      "conditions": "向此商人累計購物 2,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "shop146",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "雹の宝珠",
          "quantity": 1
        },
        {
          "name": "大ワシの心臓",
          "quantity": 3
        },
        {
          "name": "鉄鉱石",
          "quantity": 3
        }
      ],
      "price": 30000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 10000,
      "conditions": "向此商人累計購物 10,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore",
        "it-seiju-accessories"
      ],
      "note": "大ワシの心臓需求：青珠與 chulip 皆列 3；Azrael 實測表列 1。此資料保留兩份完整配方表一致的 3，並標明歧異；其餘兩項為雹の宝珠×1、鉄鉱石×3。",
      "notes": "大ワシの心臓需求：青珠與 chulip 皆列 3；Azrael 實測表列 1。此資料保留兩份完整配方表一致的 3，並標明歧異；其餘兩項為雹の宝珠×1、鉄鉱石×3。"
    },
    {
      "shopId": "shop147",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop148",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop149",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop150",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop151",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop152",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop153",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop154",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop155",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop156",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop157",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop158",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop159",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop160",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop161",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop162",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop163",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop164",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop165",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop166",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop167",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop168",
      "merchantId": "villnore-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop169",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop170",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "漆黒の結晶",
          "quantity": 2
        },
        {
          "name": "虚ろの殻",
          "quantity": 2
        },
        {
          "name": "契約の鎖",
          "quantity": 1
        },
        {
          "name": "するどい矛先",
          "quantity": 2
        }
      ],
      "price": 200,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop171",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop172",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop173",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop174",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "カリバーン",
          "quantity": 1
        },
        {
          "name": "翠炎の尖晶石",
          "quantity": 3
        },
        {
          "name": "不滅の炎",
          "quantity": 1
        },
        {
          "name": "ダークアミュレット",
          "quantity": 1
        }
      ],
      "price": 1000000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop175",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "聖槍セントハルバード",
          "quantity": 1
        },
        {
          "name": "貫通の刻印",
          "quantity": 3
        },
        {
          "name": "錬金術の書",
          "quantity": 1
        }
      ],
      "price": 700000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop176",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop177",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop178",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop179",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ルビーメイス",
          "quantity": 1
        },
        {
          "name": "ホーリィスピネル",
          "quantity": 1
        },
        {
          "name": "赤銅の聖印",
          "quantity": 2
        }
      ],
      "price": 83000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop180",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop181",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop182",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop183",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "クラウン",
          "quantity": 1
        },
        {
          "name": "ホーリィスピネル",
          "quantity": 1
        },
        {
          "name": "魔鏡の欠片",
          "quantity": 2
        }
      ],
      "price": 25000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop184",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop185",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop186",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ジャンクシールド",
          "quantity": 2
        },
        {
          "name": "金剛石",
          "quantity": 1
        },
        {
          "name": "雹の宝珠",
          "quantity": 1
        }
      ],
      "price": 17000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop187",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop188",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "獣の毛皮",
          "quantity": 1
        },
        {
          "name": "こうもりの羽",
          "quantity": 2
        }
      ],
      "price": 3500,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop189",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop190",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop191",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop192",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop193",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop194",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop195",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "コアスピネル",
          "quantity": 1
        },
        {
          "name": "魔鏡の欠片",
          "quantity": 1
        },
        {
          "name": "契約の鎖",
          "quantity": 1
        },
        {
          "name": "バラの刻印",
          "quantity": 1
        }
      ],
      "price": 300000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop196",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "甲虫の角",
          "quantity": 3
        },
        {
          "name": "小悪魔の心臓",
          "quantity": 1
        },
        {
          "name": "ガイストコア",
          "quantity": 1
        }
      ],
      "price": 4000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop197",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "こうもりの羽",
          "quantity": 5
        },
        {
          "name": "虚ろの殻",
          "quantity": 1
        },
        {
          "name": "琥珀",
          "quantity": 1
        }
      ],
      "price": 2500,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ],
      "note": "Gorilla 的部分庫存頁列 2,000 OTH；Pluto 與 chulip 配方表列 2,500 OTH，沿用後者。",
      "notes": "Gorilla 的部分庫存頁列 2,000 OTH；Pluto 與 chulip 配方表列 2,500 OTH，沿用後者。"
    },
    {
      "shopId": "shop198",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop199",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop200",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop201",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop202",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop203",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "怨念の塊",
          "quantity": 1
        },
        {
          "name": "漆黒の結晶",
          "quantity": 2
        }
      ],
      "price": 6000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop204",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop205",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop206",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop207",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop208",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "エリクサー",
          "quantity": 1
        },
        {
          "name": "ロイヤルゼリー",
          "quantity": 1
        },
        {
          "name": "大ワシの心臓",
          "quantity": 1
        },
        {
          "name": "メタボライザー",
          "quantity": 1
        }
      ],
      "price": 10000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop209",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop210",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop211",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop212",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop213",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop214",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop215",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop216",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop217",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop218",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop219",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop220",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop221",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop222",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop223",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ジャンクシールド",
          "quantity": 1
        },
        {
          "name": "堅牢骨",
          "quantity": 1
        },
        {
          "name": "甲虫の殻片",
          "quantity": 1
        }
      ],
      "price": 5000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop224",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop225",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop226",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop227",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop228",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop229",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop230",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop231",
      "merchantId": "traveller",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop232",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ひよこのえさ",
          "quantity": 1
        },
        {
          "name": "野菜くず",
          "quantity": 1
        },
        {
          "name": "貝殻入りのえさ",
          "quantity": 1
        },
        {
          "name": "とりのふん",
          "quantity": 1
        }
      ],
      "price": 1,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 80000,
      "conditions": "向此商人累計購物 80,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "stockLimit": 1,
      "note": "原版物品攻略列為唯一品；餵食里程碑各給素材 1 件，通常只能湊出一組。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-fanboy-walkthrough"
      ],
      "notes": "原版物品攻略列為唯一品；餵食里程碑各給素材 1 件，通常只能湊出一組。"
    },
    {
      "shopId": "shop233",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop234",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop235",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop236",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "壊れた大剣",
          "quantity": 2
        },
        {
          "name": "ブラッドジュエリー",
          "quantity": 1
        },
        {
          "name": "バラの刻印",
          "quantity": 1
        },
        {
          "name": "魔鏡の欠片",
          "quantity": 1
        }
      ],
      "price": 120000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop237",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "壊れた大剣",
          "quantity": 2
        },
        {
          "name": "トロルクレイ",
          "quantity": 2
        },
        {
          "name": "腐った棍棒",
          "quantity": 2
        }
      ],
      "price": 30000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop238",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "スクレップ",
          "quantity": 1
        },
        {
          "name": "封雷の尾羽",
          "quantity": 5
        },
        {
          "name": "稲妻石",
          "quantity": 2
        }
      ],
      "price": 115000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop239",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop240",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "らせんの矢じり",
          "quantity": 1
        },
        {
          "name": "貫通の刻印",
          "quantity": 2
        },
        {
          "name": "ベラドンナ",
          "quantity": 2
        }
      ],
      "price": 25000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop241",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ストレングスボウ",
          "quantity": 1
        },
        {
          "name": "貫通の刻印",
          "quantity": 1
        },
        {
          "name": "魔眼の宝珠",
          "quantity": 1
        },
        {
          "name": "魔鏡の欠片",
          "quantity": 1
        }
      ],
      "price": 50000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop242",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "アーバレスト",
          "quantity": 1
        },
        {
          "name": "貝殻の弾丸",
          "quantity": 1
        },
        {
          "name": "風切羽",
          "quantity": 2
        },
        {
          "name": "ハームシード",
          "quantity": 1
        }
      ],
      "price": 100000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ],
      "note": "chulip 價格多一個 0；採 Gundam4fun、Pluto 與城鎮商店表一致的 100,000 OTH。配方中的巻貝の弾丸是貝殻の弾丸的誤記。",
      "notes": "chulip 價格多一個 0；採 Gundam4fun、Pluto 與城鎮商店表一致的 100,000 OTH。配方中的巻貝の弾丸是貝殻の弾丸的誤記。"
    },
    {
      "shopId": "shop243",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "アーマーピアス",
          "quantity": 1
        },
        {
          "name": "スティールウイング",
          "quantity": 1
        },
        {
          "name": "風切羽",
          "quantity": 2
        },
        {
          "name": "シルフィードアロートップ",
          "quantity": 1
        }
      ],
      "price": 900000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop244",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop245",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "壊れた杖",
          "quantity": 2
        },
        {
          "name": "メイスヘッド",
          "quantity": 1
        },
        {
          "name": "ゴーレムアイ",
          "quantity": 1
        }
      ],
      "price": 20000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop246",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop247",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "猛禽の爪",
          "quantity": 2
        },
        {
          "name": "虫のカギ爪",
          "quantity": 2
        },
        {
          "name": "ヴァンパイアクロー",
          "quantity": 2
        },
        {
          "name": "悪魔の右腕",
          "quantity": 1
        }
      ],
      "price": 600000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop248",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop249",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "錬赤鉱",
          "quantity": 1
        },
        {
          "name": "羊の前歯",
          "quantity": 1
        },
        {
          "name": "こうもりの羽",
          "quantity": 2
        }
      ],
      "price": 9000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop250",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop251",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "こうもりの羽",
          "quantity": 1
        },
        {
          "name": "ボーンメイス",
          "quantity": 1
        },
        {
          "name": "ギブリスケイル",
          "quantity": 1
        }
      ],
      "price": 20000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop252",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop253",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop254",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "仮面の欠片",
          "quantity": 2
        },
        {
          "name": "ボーンメイス",
          "quantity": 2
        },
        {
          "name": "粘着液",
          "quantity": 2
        }
      ],
      "price": 5000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop255",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop256",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "こうもりの耳",
          "quantity": 2
        },
        {
          "name": "こうもりの羽",
          "quantity": 2
        },
        {
          "name": "ベラドンナ",
          "quantity": 3
        }
      ],
      "price": 5000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "shop257",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop258",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop259",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop260",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop261",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop262",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop263",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop264",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop265",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop266",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop267",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop268",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop269",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop270",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop271",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop272",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop273",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop274",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop275",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop276",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop277",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop278",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop279",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop280",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop281",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop282",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop283",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "しゃぶった骨",
          "quantity": 1
        },
        {
          "name": "かじった靴",
          "quantity": 1
        },
        {
          "name": "ぼろぼろの布",
          "quantity": 1
        },
        {
          "name": "いぬのふん",
          "quantity": 1
        }
      ],
      "price": 1,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 80000,
      "conditions": "向此商人累計購物 80,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "stockLimit": 1,
      "note": "原版物品攻略列為唯一品；餵食里程碑各給素材 1 件，通常只能湊出一組。",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-fanboy-walkthrough"
      ],
      "notes": "原版物品攻略列為唯一品；餵食里程碑各給素材 1 件，通常只能湊出一組。"
    },
    {
      "shopId": "shop284",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "shop285",
      "merchantId": "crell-armory",
      "sourceIds": [
        "it-z-shops",
        "cf-chulip-shops"
      ]
    },
    {
      "shopId": "recipe286",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "漆黒の結晶",
          "quantity": 2
        },
        {
          "name": "虚ろの殻",
          "quantity": 2
        },
        {
          "name": "契約の鎖",
          "quantity": 1
        },
        {
          "name": "するどい矛先",
          "quantity": 2
        }
      ],
      "price": 200,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "eq-seiju-weapons",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe287",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ロングソード",
          "quantity": 1
        },
        {
          "name": "獣の毛皮",
          "quantity": 3
        },
        {
          "name": "鉄鉱石",
          "quantity": 3
        }
      ],
      "price": 7500,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 5500,
      "conditions": "向此商人累計購物 5,500 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "eq-seiju-weapons",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "recipe288",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ファルシオン",
          "quantity": 1
        },
        {
          "name": "漆黒の結晶",
          "quantity": 4
        },
        {
          "name": "貫通の刻印",
          "quantity": 1
        }
      ],
      "price": 50000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "eq-seiju-weapons",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe289",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "壊れた大剣",
          "quantity": 2
        },
        {
          "name": "ブラッドジュエリー",
          "quantity": 1
        },
        {
          "name": "バラの刻印",
          "quantity": 1
        },
        {
          "name": "魔鏡の欠片",
          "quantity": 1
        }
      ],
      "price": 120000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "eq-seiju-weapons",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe290",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "壊れた剣",
          "quantity": 2
        },
        {
          "name": "セイバートゥース",
          "quantity": 1
        },
        {
          "name": "大粒の真珠",
          "quantity": 1
        },
        {
          "name": "ホーリィクリスタル",
          "quantity": 1
        }
      ],
      "price": 700000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 100000,
      "conditions": "向此商人累計購物 100,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "eq-seiju-weapons",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ],
      "note": "chulip 價格多一個 0；採 Azrael、Pluto 及其他商店表一致的 700,000 OTH。",
      "notes": "chulip 價格多一個 0；採 Azrael、Pluto 及其他商店表一致的 700,000 OTH。"
    },
    {
      "shopId": "recipe291",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "猛禽の爪",
          "quantity": 1
        },
        {
          "name": "するどい矛先",
          "quantity": 2
        },
        {
          "name": "鉄鉱石",
          "quantity": 2
        }
      ],
      "price": 6000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 5500,
      "conditions": "向此商人累計購物 5,500 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "eq-seiju-weapons",
        "eq-gamefaqs-items",
        "it-bahamut-villnore",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "recipe292",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "壊れた大剣",
          "quantity": 2
        },
        {
          "name": "トロルクレイ",
          "quantity": 2
        },
        {
          "name": "腐った棍棒",
          "quantity": 2
        }
      ],
      "price": 30000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "eq-seiju-weapons",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe293",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "スクレップ",
          "quantity": 1
        },
        {
          "name": "封雷の尾羽",
          "quantity": 5
        },
        {
          "name": "稲妻石",
          "quantity": 2
        }
      ],
      "price": 115000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "eq-seiju-weapons",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe294",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "カリバーン",
          "quantity": 1
        },
        {
          "name": "翠炎の尖晶石",
          "quantity": 3
        },
        {
          "name": "不滅の炎",
          "quantity": 1
        },
        {
          "name": "ダークアミュレット",
          "quantity": 1
        }
      ],
      "price": 1000000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "eq-seiju-weapons",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe295",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "スリングトップ",
          "quantity": 1
        },
        {
          "name": "羽毛",
          "quantity": 3
        }
      ],
      "price": 5500,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 5500,
      "conditions": "向此商人累計購物 5,500 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "eq-seiju-weapons",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "recipe296",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "らせんの矢じり",
          "quantity": 1
        },
        {
          "name": "貫通の刻印",
          "quantity": 2
        },
        {
          "name": "ベラドンナ",
          "quantity": 2
        }
      ],
      "price": 25000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "eq-seiju-weapons",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe297",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ストレングスボウ",
          "quantity": 1
        },
        {
          "name": "貫通の刻印",
          "quantity": 1
        },
        {
          "name": "魔眼の宝珠",
          "quantity": 1
        },
        {
          "name": "魔鏡の欠片",
          "quantity": 1
        }
      ],
      "price": 50000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "eq-seiju-weapons",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe298",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "アーバレスト",
          "quantity": 1
        },
        {
          "name": "貝殻の弾丸",
          "quantity": 1
        },
        {
          "name": "風切羽",
          "quantity": 2
        },
        {
          "name": "ハームシード",
          "quantity": 1
        }
      ],
      "price": 100000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "eq-seiju-weapons",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-gundam-items"
      ],
      "note": "chulip 價格多一個 0；採 Gundam4fun、Pluto 與城鎮商店表一致的 100,000 OTH。配方中的巻貝の弾丸是貝殻の弾丸的誤記。",
      "notes": "chulip 價格多一個 0；採 Gundam4fun、Pluto 與城鎮商店表一致的 100,000 OTH。配方中的巻貝の弾丸是貝殻の弾丸的誤記。"
    },
    {
      "shopId": "recipe299",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "アーマーピアス",
          "quantity": 1
        },
        {
          "name": "スティールウイング",
          "quantity": 1
        },
        {
          "name": "風切羽",
          "quantity": 2
        },
        {
          "name": "シルフィードアロートップ",
          "quantity": 1
        }
      ],
      "price": 900000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "eq-seiju-weapons",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe300",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "壊れた杖",
          "quantity": 2
        },
        {
          "name": "メイスヘッド",
          "quantity": 1
        },
        {
          "name": "ゴーレムアイ",
          "quantity": 1
        }
      ],
      "price": 20000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "eq-seiju-weapons",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe301",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ルビーメイス",
          "quantity": 1
        },
        {
          "name": "ホーリィスピネル",
          "quantity": 1
        },
        {
          "name": "赤銅の聖印",
          "quantity": 2
        }
      ],
      "price": 83000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "eq-seiju-weapons",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe302",
      "merchantId": "asgard-merchant",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ロータスワンド",
          "quantity": 1
        },
        {
          "name": "ダークアミュレット",
          "quantity": 1
        },
        {
          "name": "魔眼の宝珠",
          "quantity": 3
        },
        {
          "name": "スティールウイング",
          "quantity": 1
        }
      ],
      "price": 600000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "eq-seiju-weapons",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe303",
      "merchantId": "traveller",
      "jp": "蛇矛バジリスク",
      "name": "蛇矛バジリスク",
      "type": "熟客製作",
      "materials": [
        {
          "name": "聖槍セントハルバード",
          "quantity": 1
        },
        {
          "name": "貫通の刻印",
          "quantity": 3
        },
        {
          "name": "錬金術の書",
          "quantity": 1
        }
      ],
      "price": 700000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "eq-seiju-weapons",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe304",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "猛禽の爪",
          "quantity": 2
        },
        {
          "name": "虫のカギ爪",
          "quantity": 2
        },
        {
          "name": "ヴァンパイアクロー",
          "quantity": 2
        },
        {
          "name": "悪魔の右腕",
          "quantity": 1
        }
      ],
      "price": 600000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "eq-seiju-weapons",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe305",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "錬赤鉱",
          "quantity": 1
        },
        {
          "name": "羊の前歯",
          "quantity": 1
        },
        {
          "name": "こうもりの羽",
          "quantity": 2
        }
      ],
      "price": 9000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "eq-seiju-armor",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe306",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "白い花弁",
          "quantity": 2
        },
        {
          "name": "コアルビー",
          "quantity": 1
        },
        {
          "name": "魔眼の宝珠",
          "quantity": 1
        }
      ],
      "price": 5000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 4000,
      "conditions": "向此商人累計購物 4,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "eq-seiju-armor",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "recipe307",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "アイアンヘルム",
          "quantity": 1
        },
        {
          "name": "甲虫の角",
          "quantity": 1
        },
        {
          "name": "小鬼の牙",
          "quantity": 1
        }
      ],
      "price": 8000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 6000,
      "conditions": "向此商人累計購物 6,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "eq-seiju-armor",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "recipe308",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "クラウン",
          "quantity": 1
        },
        {
          "name": "ホーリィスピネル",
          "quantity": 1
        },
        {
          "name": "魔鏡の欠片",
          "quantity": 2
        }
      ],
      "price": 25000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "eq-seiju-armor",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe309",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "クラウン",
          "quantity": 1
        },
        {
          "name": "セイバートゥース",
          "quantity": 1
        },
        {
          "name": "レッドホーン",
          "quantity": 1
        }
      ],
      "price": 800000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 90000,
      "conditions": "向此商人累計購物 90,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "eq-seiju-armor",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "recipe310",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ジャンクシールド",
          "quantity": 2
        },
        {
          "name": "金剛石",
          "quantity": 1
        },
        {
          "name": "雹の宝珠",
          "quantity": 1
        }
      ],
      "price": 17000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "eq-seiju-armor",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe311",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "キュイラス",
          "quantity": 1
        },
        {
          "name": "鉄鉱石",
          "quantity": 2
        },
        {
          "name": "シルバーサレット",
          "quantity": 2
        }
      ],
      "price": 4500,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 4000,
      "conditions": "向此商人累計購物 4,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "eq-seiju-armor",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "recipe312",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "獣の毛皮",
          "quantity": 1
        },
        {
          "name": "こうもりの羽",
          "quantity": 2
        }
      ],
      "price": 3500,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "eq-seiju-armor",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe313",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "スプリームガーブ",
          "quantity": 1
        },
        {
          "name": "赤雷の珠",
          "quantity": 1
        },
        {
          "name": "フレイムブレスコア",
          "quantity": 1
        },
        {
          "name": "ユミルの涙",
          "quantity": 1
        },
        {
          "name": "ハームシード",
          "quantity": 1
        }
      ],
      "price": 50000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 30000,
      "conditions": "向此商人累計購物 30,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "eq-seiju-armor",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "recipe314",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "シルバーメイル",
          "quantity": 1
        },
        {
          "name": "火ネズミの毛皮",
          "quantity": 1
        },
        {
          "name": "封嵐の尾羽",
          "quantity": 1
        },
        {
          "name": "ディープドゥーム",
          "quantity": 1
        },
        {
          "name": "翠氷珠",
          "quantity": 1
        }
      ],
      "price": 800000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "eq-seiju-armor",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe315",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "骨クズ",
          "quantity": 1
        },
        {
          "name": "猛禽の爪",
          "quantity": 2
        },
        {
          "name": "羽毛",
          "quantity": 1
        }
      ],
      "price": 3000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 2000,
      "conditions": "向此商人累計購物 2,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "eq-seiju-armor",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "recipe316",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "飛燕鱗",
          "quantity": 2
        },
        {
          "name": "ヒートプレート",
          "quantity": 1
        }
      ],
      "price": 7000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 6000,
      "conditions": "向此商人累計購物 6,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "eq-seiju-armor",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "recipe317",
      "merchantId": "asgard-merchant",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ダマスカス鉱",
          "quantity": 2
        },
        {
          "name": "黒曜の爪",
          "quantity": 3
        },
        {
          "name": "ブラッディクロス",
          "quantity": 1
        }
      ],
      "price": 500000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "eq-seiju-armor",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe318",
      "merchantId": "asgard-merchant",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ブリリアントピースメーカー",
          "quantity": 1
        },
        {
          "name": "ジェントルカード",
          "quantity": 1
        },
        {
          "name": "セイクリッドオーパーツ",
          "quantity": 1
        }
      ],
      "price": 1,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "eq-seiju-armor",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe319",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "こうもりの羽",
          "quantity": 1
        },
        {
          "name": "ボーンメイス",
          "quantity": 1
        },
        {
          "name": "ギブリスケイル",
          "quantity": 1
        }
      ],
      "price": 20000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "eq-seiju-armor",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe320",
      "merchantId": "solde-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ナイトグリーブ",
          "quantity": 1
        },
        {
          "name": "黒曜の爪",
          "quantity": 2
        },
        {
          "name": "紅蓮のうろこ",
          "quantity": 1
        }
      ],
      "price": 60000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "eq-seiju-armor",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe321",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ワニ皮",
          "quantity": 1
        },
        {
          "name": "竜胆石",
          "quantity": 1
        }
      ],
      "price": 3000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 2000,
      "conditions": "向此商人累計購物 2,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "eq-seiju-armor",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "recipe322",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "コアスピネル",
          "quantity": 1
        },
        {
          "name": "魔鏡の欠片",
          "quantity": 1
        },
        {
          "name": "契約の鎖",
          "quantity": 1
        },
        {
          "name": "バラの刻印",
          "quantity": 1
        }
      ],
      "price": 300000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-seiju-accessories",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe323",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "しゃぶった骨",
          "quantity": 1
        },
        {
          "name": "かじった靴",
          "quantity": 1
        },
        {
          "name": "ぼろぼろの布",
          "quantity": 1
        },
        {
          "name": "いぬのふん",
          "quantity": 1
        }
      ],
      "price": 1,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 80000,
      "conditions": "向此商人累計購物 80,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "stockLimit": 1,
      "note": "原版物品攻略列為唯一品；餵食里程碑各給素材 1 件，通常只能湊出一組。",
      "sourceIds": [
        "it-seiju-accessories",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-fanboy-walkthrough"
      ],
      "notes": "原版物品攻略列為唯一品；餵食里程碑各給素材 1 件，通常只能湊出一組。"
    },
    {
      "shopId": "recipe324",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "こうもりの耳",
          "quantity": 2
        },
        {
          "name": "こうもりの羽",
          "quantity": 2
        },
        {
          "name": "ベラドンナ",
          "quantity": 3
        }
      ],
      "price": 5000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-seiju-accessories",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe325",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "甲虫の角",
          "quantity": 3
        },
        {
          "name": "小悪魔の心臓",
          "quantity": 1
        },
        {
          "name": "ガイストコア",
          "quantity": 1
        }
      ],
      "price": 4000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-seiju-accessories",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe326",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ベラドンナ",
          "quantity": 1
        },
        {
          "name": "魔物のうろこ",
          "quantity": 3
        },
        {
          "name": "折れた爪",
          "quantity": 1
        }
      ],
      "price": 3000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 2000,
      "conditions": "向此商人累計購物 2,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "it-seiju-accessories",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    },
    {
      "shopId": "recipe327",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ベラドンナ",
          "quantity": 2
        },
        {
          "name": "小悪魔の心臓",
          "quantity": 3
        },
        {
          "name": "悪魔のひづめ",
          "quantity": 1
        }
      ],
      "price": 5000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-seiju-accessories",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe328",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "仮面の欠片",
          "quantity": 2
        },
        {
          "name": "ボーンメイス",
          "quantity": 2
        },
        {
          "name": "粘着液",
          "quantity": 2
        }
      ],
      "price": 5000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-seiju-accessories",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ]
    },
    {
      "shopId": "recipe329",
      "merchantId": "asgard-merchant",
      "type": "熟客製作",
      "materials": [
        {
          "name": "猫の指輪",
          "quantity": 1
        },
        {
          "name": "犬の指輪",
          "quantity": 1
        },
        {
          "name": "鳥の指輪",
          "quantity": 1
        }
      ],
      "price": 900000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "stockLimit": 1,
      "note": "原版物品攻略列為唯一品；餵食里程碑各給素材 1 件，通常只能湊出一組。",
      "sourceIds": [
        "it-seiju-accessories",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ],
      "notes": "原版物品攻略列為唯一品；餵食里程碑各給素材 1 件，通常只能湊出一組。"
    },
    {
      "shopId": "recipe330",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "ひよこのえさ",
          "quantity": 1
        },
        {
          "name": "野菜くず",
          "quantity": 1
        },
        {
          "name": "貝殻入りのえさ",
          "quantity": 1
        },
        {
          "name": "とりのふん",
          "quantity": 1
        }
      ],
      "price": 1,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 80000,
      "conditions": "向此商人累計購物 80,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "stockLimit": 1,
      "note": "原版物品攻略列為唯一品；餵食里程碑各給素材 1 件，通常只能湊出一組。",
      "sourceIds": [
        "it-seiju-accessories",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-fanboy-walkthrough"
      ],
      "notes": "原版物品攻略列為唯一品；餵食里程碑各給素材 1 件，通常只能湊出一組。"
    },
    {
      "shopId": "recipe331",
      "merchantId": "traveller",
      "type": "熟客製作",
      "materials": [
        {
          "name": "こうもりの羽",
          "quantity": 5
        },
        {
          "name": "虚ろの殻",
          "quantity": 1
        },
        {
          "name": "琥珀",
          "quantity": 1
        }
      ],
      "price": 2500,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "sourceIds": [
        "it-seiju-accessories",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2"
      ],
      "note": "Gorilla 的部分庫存頁列 2,000 OTH；Pluto 與 chulip 配方表列 2,500 OTH，沿用後者。",
      "notes": "Gorilla 的部分庫存頁列 2,000 OTH；Pluto 與 chulip 配方表列 2,500 OTH，沿用後者。"
    },
    {
      "shopId": "recipe332",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "雹の宝珠",
          "quantity": 1
        },
        {
          "name": "大ワシの心臓",
          "quantity": 3
        },
        {
          "name": "鉄鉱石",
          "quantity": 3
        }
      ],
      "price": 30000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 10000,
      "conditions": "向此商人累計購物 10,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "it-seiju-accessories",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ],
      "note": "大ワシの心臓需求：青珠與 chulip 皆列 3；Azrael 實測表列 1。此資料保留兩份完整配方表一致的 3，並標明歧異；其餘兩項為雹の宝珠×1、鉄鉱石×3。",
      "notes": "大ワシの心臓需求：青珠與 chulip 皆列 3；Azrael 實測表列 1。此資料保留兩份完整配方表一致的 3，並標明歧異；其餘兩項為雹の宝珠×1、鉄鉱石×3。"
    },
    {
      "shopId": "recipe333",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "materials": [
        {
          "name": "視玉",
          "quantity": 2
        },
        {
          "name": "怨念の塊",
          "quantity": 1
        },
        {
          "name": "レイフォース",
          "quantity": 1
        }
      ],
      "price": 3000,
      "resultQuantity": 1,
      "effect": "先向同一家店出售表列數量的素材；熟客門檻達成、商品名稱顯示後，再支付售價購買。每件成品耗用一組已售素材。",
      "unlockSpend": 2000,
      "conditions": "向此商人累計購物 2,000 OTH 才揭露商品名稱；另需交齊素材及支付售價。",
      "sourceIds": [
        "it-seiju-accessories",
        "cf-chulip-shops",
        "cf-pluto-shops1",
        "cf-pluto-shops2",
        "cf-bahamut-villnore"
      ]
    }
  ],
  "extraRecipes": [],
  "extraInventory": [
    {
      "id": "cf-stock-001",
      "name": "名刀蓮断ち",
      "jp": "名刀蓮断ち",
      "shop": "索爾德武器防具店",
      "merchantId": "solde-armory",
      "type": "商店販售",
      "price": 65000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "索爾德武器防具店；從港口沿主街向左，第一棟民宅再往左的武器防具店。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-002",
      "name": "リキュールポーション",
      "jp": "リキュールポーション",
      "shop": "索爾德武器防具店",
      "merchantId": "solde-armory",
      "type": "商店販售",
      "price": 2500,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "索爾德武器防具店；從港口沿主街向左，第一棟民宅再往左的武器防具店。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-003",
      "name": "チャージブレイク",
      "jp": "チャージブレイク",
      "shop": "索爾德武器防具店",
      "merchantId": "solde-armory",
      "type": "商店販售",
      "price": 2500,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "索爾德武器防具店；從港口沿主街向左，第一棟民宅再往左的武器防具店。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-004",
      "name": "マイトポーション",
      "jp": "マイトポーション",
      "shop": "索爾德武器防具店",
      "merchantId": "solde-armory",
      "type": "商店販售",
      "price": 2000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "索爾德武器防具店；從港口沿主街向左，第一棟民宅再往左的武器防具店。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-005",
      "name": "ガードポーション",
      "jp": "ガードポーション",
      "shop": "索爾德武器防具店",
      "merchantId": "solde-armory",
      "type": "商店販售",
      "price": 2000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "索爾德武器防具店；從港口沿主街向左，第一棟民宅再往左的武器防具店。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-006",
      "name": "スペルポーション",
      "jp": "スペルポーション",
      "shop": "索爾德武器防具店",
      "merchantId": "solde-armory",
      "type": "商店販售",
      "price": 2000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "索爾德武器防具店；從港口沿主街向左，第一棟民宅再往左的武器防具店。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-007",
      "name": "オーバードライブ",
      "jp": "オーバードライブ",
      "shop": "索爾德武器防具店",
      "merchantId": "solde-armory",
      "type": "商店販售",
      "price": 3000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "索爾德武器防具店；從港口沿主街向左，第一棟民宅再往左的武器防具店。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-008",
      "name": "大陸北部の地図",
      "jp": "大陸北部の地図",
      "shop": "索爾德武器防具店",
      "merchantId": "solde-armory",
      "type": "商店販售",
      "price": 10000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "索爾德武器防具店；從港口沿主街向左，第一棟民宅再往左的武器防具店。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-009",
      "name": "大陸西部の地図",
      "jp": "大陸西部の地図",
      "shop": "索爾德武器防具店",
      "merchantId": "solde-armory",
      "type": "商店販售",
      "price": 1000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "索爾德武器防具店；從港口沿主街向左，第一棟民宅再往左的武器防具店。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-010",
      "name": "大陸東部の地図",
      "jp": "大陸東部の地図",
      "shop": "索爾德武器防具店",
      "merchantId": "solde-armory",
      "type": "商店販售",
      "price": 5000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "索爾德武器防具店；從港口沿主街向左，第一棟民宅再往左的武器防具店。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-011",
      "name": "金銀花の露",
      "jp": "金銀花の露",
      "shop": "迪潘城下町武器防具店",
      "merchantId": "dipan-armory",
      "type": "商店販售",
      "price": 80,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "迪潘城下町武器防具店；第 2 章從東側入口向左，經旅館與酒館，後街支路附近繼續向左；店舖左側民宅有第二段詩文。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-012",
      "name": "スペクタクルズ",
      "jp": "スペクタクルズ",
      "shop": "迪潘城下町武器防具店",
      "merchantId": "dipan-armory",
      "type": "商店販售",
      "price": 150,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "迪潘城下町武器防具店；第 2 章從東側入口向左，經旅館與酒館，後街支路附近繼續向左；店舖左側民宅有第二段詩文。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-013",
      "name": "ホーリィソード",
      "jp": "ホーリィソード",
      "shop": "人界移動行商人",
      "merchantId": "traveller",
      "type": "商店販售",
      "price": 70000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "人界移動行商人；第 3 章先在科里安德村入口，後在卡爾斯塔德旅館內；第 4 章在迪潘城庭院；第 5 章取食屍鬼粉時在迪潘入口；第 6 章回到科里安德村。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-014",
      "name": "名剣ヴェインスレイ",
      "jp": "名剣ヴェインスレイ",
      "shop": "人界移動行商人",
      "merchantId": "traveller",
      "type": "商店販售",
      "price": 75000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "人界移動行商人；第 3 章先在科里安德村入口，後在卡爾斯塔德旅館內；第 4 章在迪潘城庭院；第 5 章取食屍鬼粉時在迪潘入口；第 6 章回到科里安德村。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-015",
      "name": "ヴァローヘルム",
      "jp": "ヴァローヘルム",
      "shop": "人界移動行商人",
      "merchantId": "traveller",
      "type": "商店販售",
      "price": 35000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "人界移動行商人；第 3 章先在科里安德村入口，後在卡爾斯塔德旅館內；第 4 章在迪潘城庭院；第 5 章取食屍鬼粉時在迪潘入口；第 6 章回到科里安德村。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-016",
      "name": "ヴァローアーマー",
      "jp": "ヴァローアーマー",
      "shop": "人界移動行商人",
      "merchantId": "traveller",
      "type": "商店販售",
      "price": 50000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "人界移動行商人；第 3 章先在科里安德村入口，後在卡爾斯塔德旅館內；第 4 章在迪潘城庭院；第 5 章取食屍鬼粉時在迪潘入口；第 6 章回到科里安德村。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-017",
      "name": "ホーリィジェム",
      "jp": "ホーリィジェム",
      "shop": "人界移動行商人",
      "merchantId": "traveller",
      "type": "商店販售",
      "price": 2000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "人界移動行商人；第 3 章先在科里安德村入口，後在卡爾斯塔德旅館內；第 4 章在迪潘城庭院；第 5 章取食屍鬼粉時在迪潘入口；第 6 章回到科里安德村。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-018",
      "name": "妖精の霊薬",
      "jp": "妖精の霊薬",
      "shop": "維爾諾亞武器防具店",
      "merchantId": "villnore-armory",
      "type": "商店販售",
      "price": 3600,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "維爾諾亞武器防具店；從城鎮入口的旅館向右，經花販與酒館，再繼續向東的武器防具店。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-019",
      "name": "エリクサー",
      "jp": "エリクサー",
      "shop": "維爾諾亞武器防具店",
      "merchantId": "villnore-armory",
      "type": "熟客製作",
      "price": 800,
      "materials": [
        {
          "name": "魚燐",
          "quantity": 2
        },
        {
          "name": "獣肉",
          "quantity": 1
        },
        {
          "name": "祭祀書",
          "quantity": 1
        }
      ],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "先向同一商人出售配方素材，達到熟客條件後另付售價購買。",
      "obtain": "維爾諾亞武器防具店；從城鎮入口的旅館向右，經花販與酒館，再繼續向東的武器防具店。",
      "sourceIds": [
        "cf-chulip-shops"
      ],
      "resultQuantity": 1
    },
    {
      "id": "cf-stock-020",
      "name": "リキュールポーション",
      "jp": "リキュールポーション",
      "shop": "維爾諾亞武器防具店",
      "merchantId": "villnore-armory",
      "type": "商店販售",
      "price": 2500,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "維爾諾亞武器防具店；從城鎮入口的旅館向右，經花販與酒館，再繼續向東的武器防具店。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-021",
      "name": "チャージブレイク",
      "jp": "チャージブレイク",
      "shop": "維爾諾亞武器防具店",
      "merchantId": "villnore-armory",
      "type": "商店販售",
      "price": 2500,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "維爾諾亞武器防具店；從城鎮入口的旅館向右，經花販與酒館，再繼續向東的武器防具店。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-022",
      "name": "マイトポーション",
      "jp": "マイトポーション",
      "shop": "維爾諾亞武器防具店",
      "merchantId": "villnore-armory",
      "type": "商店販售",
      "price": 2000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "維爾諾亞武器防具店；從城鎮入口的旅館向右，經花販與酒館，再繼續向東的武器防具店。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-023",
      "name": "ガードポーション",
      "jp": "ガードポーション",
      "shop": "維爾諾亞武器防具店",
      "merchantId": "villnore-armory",
      "type": "商店販售",
      "price": 2000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "維爾諾亞武器防具店；從城鎮入口的旅館向右，經花販與酒館，再繼續向東的武器防具店。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-024",
      "name": "スペルポーション",
      "jp": "スペルポーション",
      "shop": "維爾諾亞武器防具店",
      "merchantId": "villnore-armory",
      "type": "商店販售",
      "price": 2000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "維爾諾亞武器防具店；從城鎮入口的旅館向右，經花販與酒館，再繼續向東的武器防具店。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-025",
      "name": "オーバードライブ",
      "jp": "オーバードライブ",
      "shop": "維爾諾亞武器防具店",
      "merchantId": "villnore-armory",
      "type": "商店販售",
      "price": 3000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "維爾諾亞武器防具店；從城鎮入口的旅館向右，經花販與酒館，再繼續向東的武器防具店。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-026",
      "name": "大陸北部の地図",
      "jp": "大陸北部の地図",
      "shop": "維爾諾亞武器防具店",
      "merchantId": "villnore-armory",
      "type": "商店販售",
      "price": 10000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "維爾諾亞武器防具店；從城鎮入口的旅館向右，經花販與酒館，再繼續向東的武器防具店。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-027",
      "name": "フルンティング",
      "jp": "フルンティング",
      "shop": "克雷爾蒙費蘭武器防具店",
      "merchantId": "crell-armory",
      "type": "商店販售",
      "price": 45000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "克雷爾蒙費蘭武器防具店；城鎮主街區的武器防具店；同城另有通往上層旅館與民宅的階梯。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-028",
      "name": "スプリームガーブ",
      "jp": "スプリームガーブ",
      "shop": "克雷爾蒙費蘭武器防具店",
      "merchantId": "crell-armory",
      "type": "商店販售",
      "price": 9000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "克雷爾蒙費蘭武器防具店；城鎮主街區的武器防具店；同城另有通往上層旅館與民宅的階梯。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-029",
      "name": "耐炎の護符",
      "jp": "耐炎の護符",
      "shop": "克雷爾蒙費蘭武器防具店",
      "merchantId": "crell-armory",
      "type": "商店販售",
      "price": 1200,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "克雷爾蒙費蘭武器防具店；城鎮主街區的武器防具店；同城另有通往上層旅館與民宅的階梯。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-030",
      "name": "無欠の護符",
      "jp": "無欠の護符",
      "shop": "克雷爾蒙費蘭武器防具店",
      "merchantId": "crell-armory",
      "type": "熟客製作",
      "price": 5000,
      "materials": [
        {
          "name": "ジャンクシールド",
          "quantity": 1
        },
        {
          "name": "堅牢骨",
          "quantity": 1
        },
        {
          "name": "甲虫の殻片",
          "quantity": 1
        }
      ],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "先向同一商人出售配方素材，達到熟客條件後另付售價購買。",
      "obtain": "克雷爾蒙費蘭武器防具店；城鎮主街區的武器防具店；同城另有通往上層旅館與民宅的階梯。",
      "sourceIds": [
        "cf-chulip-shops"
      ],
      "resultQuantity": 1
    },
    {
      "id": "cf-stock-031",
      "name": "大陸北部の地図",
      "jp": "大陸北部の地図",
      "shop": "克雷爾蒙費蘭武器防具店",
      "merchantId": "crell-armory",
      "type": "商店販售",
      "price": 10000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "克雷爾蒙費蘭武器防具店；城鎮主街區的武器防具店；同城另有通往上層旅館與民宅的階梯。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-032",
      "name": "帝剣デュランダル",
      "jp": "帝剣デュランダル",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 200000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-033",
      "name": "瞬弓ブルーゲイル",
      "jp": "瞬弓ブルーゲイル",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 130000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-034",
      "name": "ホーリィガントレット",
      "jp": "ホーリィガントレット",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 50000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-035",
      "name": "マジックブーツ",
      "jp": "マジックブーツ",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 40000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-036",
      "name": "緑の子猫",
      "jp": "緑の子猫",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 10000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-037",
      "name": "闇の祭器",
      "jp": "闇の祭器",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 10000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-038",
      "name": "戦士の秘薬",
      "jp": "戦士の秘薬",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 150,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-039",
      "name": "薬士の秘薬",
      "jp": "薬士の秘薬",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 800,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-040",
      "name": "魔女の秘薬",
      "jp": "魔女の秘薬",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "熟客製作",
      "price": 5000,
      "materials": [
        {
          "name": "フェイタルシード",
          "quantity": 1
        },
        {
          "name": "命の輝石",
          "quantity": 2
        },
        {
          "name": "トロルクレイ",
          "quantity": 2
        }
      ],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "先向同一商人出售配方素材，達到熟客條件後另付售價購買。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ],
      "resultQuantity": 1
    },
    {
      "id": "cf-stock-041",
      "name": "小人の霊薬",
      "jp": "小人の霊薬",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 800,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-042",
      "name": "妖精の霊薬",
      "jp": "妖精の霊薬",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 3600,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-043",
      "name": "精霊の霊薬",
      "jp": "精霊の霊薬",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "熟客製作",
      "price": 40000,
      "materials": [
        {
          "name": "命の輝石",
          "quantity": 2
        },
        {
          "name": "大粒の真珠",
          "quantity": 1
        },
        {
          "name": "メタボライザー",
          "quantity": 2
        }
      ],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "先向同一商人出售配方素材，達到熟客條件後另付售價購買。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ],
      "resultQuantity": 1
    },
    {
      "id": "cf-stock-044",
      "name": "エリクサー",
      "jp": "エリクサー",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "熟客製作",
      "price": 800,
      "materials": [
        {
          "name": "魚燐",
          "quantity": 2
        },
        {
          "name": "獣肉",
          "quantity": 1
        },
        {
          "name": "祭祀書",
          "quantity": 1
        }
      ],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "先向同一商人出售配方素材，達到熟客條件後另付售價購買。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ],
      "resultQuantity": 1
    },
    {
      "id": "cf-stock-045",
      "name": "プライムエリクサー",
      "jp": "プライムエリクサー",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "熟客製作",
      "price": 10000,
      "materials": [
        {
          "name": "エリクサー",
          "quantity": 1
        },
        {
          "name": "ロイヤルゼリー",
          "quantity": 1
        },
        {
          "name": "大ワシの心臓",
          "quantity": 1
        },
        {
          "name": "メタボライザー",
          "quantity": 1
        }
      ],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "先向同一商人出售配方素材，達到熟客條件後另付售價購買。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ],
      "resultQuantity": 1
    },
    {
      "id": "cf-stock-046",
      "name": "金銀花の露",
      "jp": "金銀花の露",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 80,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-047",
      "name": "秩序の原理",
      "jp": "秩序の原理",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 80,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-048",
      "name": "ブラギの詩篇",
      "jp": "ブラギの詩篇",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 150,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-049",
      "name": "雪解け水",
      "jp": "雪解け水",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 80,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-050",
      "name": "真珠草",
      "jp": "真珠草",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 80,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-051",
      "name": "コカトリスの卵",
      "jp": "コカトリスの卵",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 150,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-052",
      "name": "イズンの林檎",
      "jp": "イズンの林檎",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 150,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-053",
      "name": "方位石",
      "jp": "方位石",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 200,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-054",
      "name": "ユニオンプラム",
      "jp": "ユニオンプラム",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 800,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-055",
      "name": "聖水",
      "jp": "聖水",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 150,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-056",
      "name": "耐炎の護符",
      "jp": "耐炎の護符",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 1200,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-057",
      "name": "防寒の護符",
      "jp": "防寒の護符",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 1200,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-058",
      "name": "砕土の護符",
      "jp": "砕土の護符",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 1200,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-059",
      "name": "避雷の護符",
      "jp": "避雷の護符",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 1200,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-060",
      "name": "無欠の護符",
      "jp": "無欠の護符",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "熟客製作",
      "price": 5000,
      "materials": [
        {
          "name": "ジャンクシールド",
          "quantity": 1
        },
        {
          "name": "堅牢骨",
          "quantity": 1
        },
        {
          "name": "甲虫の殻片",
          "quantity": 1
        }
      ],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "先向同一商人出售配方素材，達到熟客條件後另付售價購買。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ],
      "resultQuantity": 1
    },
    {
      "id": "cf-stock-061",
      "name": "リキュールポーション",
      "jp": "リキュールポーション",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 2500,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-062",
      "name": "チャージブレイク",
      "jp": "チャージブレイク",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 2500,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-063",
      "name": "マイトポーション",
      "jp": "マイトポーション",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 2000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-064",
      "name": "ガードポーション",
      "jp": "ガードポーション",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 2000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-065",
      "name": "スペルポーション",
      "jp": "スペルポーション",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 2000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-066",
      "name": "オーバードライブ",
      "jp": "オーバードライブ",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 3000,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-067",
      "name": "フレアクリスタル",
      "jp": "フレアクリスタル",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 3500,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-068",
      "name": "アイスクリスタル",
      "jp": "アイスクリスタル",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 3500,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-069",
      "name": "アースクリスタル",
      "jp": "アースクリスタル",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 3500,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-070",
      "name": "サンダークリスタル",
      "jp": "サンダークリスタル",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 3500,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    },
    {
      "id": "cf-stock-071",
      "name": "スペクタクルズ",
      "jp": "スペクタクルズ",
      "shop": "阿斯嘉特神界商人",
      "merchantId": "asgard-merchant",
      "type": "商店販售",
      "price": 150,
      "materials": [],
      "conditions": "跨章節庫存總表，商品會隨主線進度追加；並非首次到訪即全數出售。",
      "effect": "商店販售；每次購買的數量由玩家選擇。",
      "obtain": "阿斯嘉特神界商人；第 5 章通過比弗羅斯特彩虹橋後的阿斯嘉特據點，連往世界樹及瓦爾哈拉宮殿。",
      "sourceIds": [
        "cf-chulip-shops"
      ]
    }
  ],
  "conflicts": [
    {
      "item": "ヒールリング",
      "note": "大ワシの心臓需求：青珠與 chulip 皆列 3；Azrael 實測表列 1。此資料保留兩份完整配方表一致的 3，並標明歧異；其餘兩項為雹の宝珠×1、鉄鉱石×3。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-bahamut-villnore",
        "it-seiju-accessories"
      ]
    },
    {
      "item": "パラライチェック",
      "note": "Gorilla 的部分庫存頁列 2,000 OTH；Pluto 與 chulip 配方表列 2,500 OTH，沿用後者。",
      "sourceIds": [
        "cf-pluto-shops1",
        "cf-chulip-shops"
      ]
    },
    {
      "item": "名剣ムーンファルクス",
      "note": "chulip 價格多一個 0；採 Azrael、Pluto 及其他商店表一致的 700,000 OTH。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-bahamut-villnore",
        "cf-pluto-shops2"
      ]
    },
    {
      "item": "シャイニィラプチャー",
      "note": "chulip 價格多一個 0；採 Gundam4fun、Pluto 與城鎮商店表一致的 100,000 OTH。配方中的巻貝の弾丸是貝殻の弾丸的誤記。",
      "sourceIds": [
        "cf-chulip-shops",
        "cf-gundam-items",
        "cf-pluto-shops2"
      ]
    }
  ],
  "audit": {
    "originalShopRows": 333,
    "originalRecipeRows": 62,
    "extraInventoryRows": 71,
    "correctedShopRows": 333,
    "effectiveShopRows": 404,
    "recipeRows": 129,
    "distinctRecipeProducts": 65,
    "distinctMaterials": 146,
    "unresolvedMaterialNames": [],
    "invalidQuantities": 0
  }
};
