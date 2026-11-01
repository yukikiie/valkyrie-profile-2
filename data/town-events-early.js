/* 城鎮事件明細：需求數量、累積門檻、交涉選項與回報地點分開記錄。 */
window.VP_TOWN_EARLY = {
  sources: [
    {id:'town-e-equipment-return',title:'Eclesis 原作者英靈專題：解放帶走武器防具，飾品返還',url:'https://gamefaqs.gamespot.com/ps2/931102-valkyrie-profile-2-silmeria/faqs/43867',checked:'2026-11-01',language:'en'},
    {id:'town-e-ring-spend',title:'triAce_Fanboy 原作者：三種動物指環各店累計消費 80,000 OTH',url:'https://www.neoseeker.com/valkyrie-profile-2-silmeria/faqs/139776-valkyrie-profile-2-a.html',checked:'2026-11-01',language:'en'},
    {id:'town-e-side',title:'GAME 大寶庫：動物餵食、任務回報、詩文、牧童',url:'https://game.daihouko.com/valkyrieprofile/2/50.html',checked:'2026-11-01',language:'ja'},
    {id:'town-e-z51',title:'ZAPAnet：動物餵食與城鎮回報',url:'https://zapanet.info/vp2/51.html',checked:'2026-11-01',language:'ja'},
    {id:'town-e-z75',title:'ZAPAnet：第三章前半城鎮逐項事件',url:'https://zapanet.info/vp2/75.html',checked:'2026-11-01',language:'ja'},
    {id:'town-e-z107',title:'ZAPAnet：第三章後半城鎮逐項事件',url:'https://zapanet.info/vp2/107.html',checked:'2026-11-01',language:'ja'},
    {id:'town-e-z118',title:'ZAPAnet：行商人移動與期間限定事件',url:'https://zapanet.info/vp2/118.html',checked:'2026-11-01',language:'ja'},
    {id:'town-e-s1',title:'青珠之星：第一、二章原作者流程與部位素材',url:'https://www.seiju.info/vp2/chart/chart1.html',checked:'2026-11-01',language:'ja'},
    {id:'town-e-s2',title:'青珠之星：第三章原作者流程',url:'https://www.seiju.info/vp2/chart/chart2.html',checked:'2026-11-01',language:'ja'},
    {id:'town-e-s3',title:'青珠之星：第四章城鎮與餵食限制',url:'https://www.seiju.info/vp2/chart/chart3.html',checked:'2026-11-01',language:'ja'},
    {id:'town-e-s4',title:'青珠之星：第五章貓消失的精確劇情節點',url:'https://www.seiju.info/vp2/chart/chart4.html',checked:'2026-11-01',language:'ja'},
    {id:'town-e-column',title:'青珠之星：詩文、花、金蛋、牧童',url:'https://www.seiju.info/vp2/column.html',checked:'2026-11-01',language:'ja'},
    {id:'town-e-d47',title:'GAME 大寶庫：索爾德商店與貓戒指配方',url:'https://game.daihouko.com/valkyrieprofile/2/47.html',checked:'2026-11-01',language:'ja'},
    {id:'town-e-d56',title:'GAME 大寶庫：迪潘城下町與守門士兵',url:'https://game.daihouko.com/valkyrieprofile/2/56.html',checked:'2026-11-01',language:'ja'},
    {id:'town-e-d64',title:'GAME 大寶庫：科里安德行商人與鳥戒指',url:'https://game.daihouko.com/valkyrieprofile/2/64.html',checked:'2026-11-01',language:'ja'},
    {id:'town-e-d66',title:'GAME 大寶庫：維爾諾亞商店與西部地圖',url:'https://game.daihouko.com/valkyrieprofile/2/66.html',checked:'2026-11-01',language:'ja'},
    {id:'town-e-d73',title:'GAME 大寶庫：卡爾斯塔德行商人與鳥戒指',url:'https://game.daihouko.com/valkyrieprofile/2/73.html',checked:'2026-11-01',language:'ja'},
    {id:'town-e-d77',title:'GAME 大寶庫：克雷爾蒙費蘭商店與犬戒指',url:'https://game.daihouko.com/valkyrieprofile/2/77.html',checked:'2026-11-01',language:'ja'},
    {id:'town-e-ein',title:'青珠之星：解放英靈的再會地點與分期贈禮',url:'https://www.seiju.info/vp2/chara/ein.html',checked:'2026-11-01',language:'ja'},
    {id:'town-e-pluto5',title:'Pluto 原作者流程：第五章城鎮支線期限的另一記載',url:'https://www.pluto-dm.com/vp2/chart05.html',checked:'2026-11-01',language:'ja'}
  ],
  events: [
    {
      id:'solde-cat-feeding',townId:'solde',townName:'港町索爾德',title:'貓的餵食：15 份海鮮肉換齊四種材料',npc:'貓',
      location:'索爾德城內；第五章移到教會前左側。第一章精確街序未查得，不把後期位置當作第一章位置。',
      chapters:['ch1','ch2','ch3','ch5'],timing:'第一章初訪先記下這條支線。一般流程第二章奇瑟納草原開始可採集海鮮肉。為保留收集機會，請在第五章取得グールパウダー後、再次回精靈之森前完成；第四章不能餵食。各攻略對第五章消失的精確節點記載不同，見下方說明。',
      requires:[{item:'海鮮肉',quantity:15,consumed:true,note:'完整四獎勵合計需要 15 份，每次餵 1 份。1／5／10／15 是累計數，不是各另交 1＋5＋10＋15 份。'}],
      steps:['第二章可在奇瑟納草原（キセナ草原）打フライングフィッシュ，繞背破壞尾鰭取得海鮮肉；屬機率掉落，沒有保證每戰一份。','帶海鮮肉回索爾德，反覆對貓交談，每次選擇餵食並消耗 1 份。','依累計 1、5、10、15 份各獲一種材料，四件都保留，下一步到本城武器防具店製作猫の指輪。'],
      rewards:[{at:1,item:'狩られたネズミ',quantity:1,note:'累計第 1 份。'},{at:5,item:'尻尾の切れたトカゲ',quantity:1,note:'在首次餵食後再餵 4 份。'},{at:10,item:'不幸な青い鳥',quantity:1,note:'第 5 份後再餵 5 份。'},{at:15,item:'ねこのふん',quantity:1,note:'第 10 份後再餵 5 份。'}],
      notes:['餵貓取得的是製作材料；猫の指輪與ソロモンの指輪是兩次不同商店交易。','期限有來源差異：青珠第五章正文說再次回精靈之森的事件後消失；Pluto 第五章則在世界樹通關後、前往瓦爾哈拉前仍提醒可回城餵貓。本攻略採較早的保守完成點，不把兩個說法合併為已驗證的同一觸發。','15 份後沒有額外餵食獎勵，不必繼續消耗食物。'],sourceIds:['town-e-side','town-e-z51','town-e-z118','town-e-s1','town-e-s3','town-e-s4','town-e-pluto5']
    },
    {
      id:'solde-cat-ring',townId:'solde',townName:'港町索爾德',title:'貓之指環：四種材料交給索爾德店主',npc:'武器防具店店主',location:'港町索爾德的武器防具店',chapters:['ch1','ch2','ch3','ch4','ch5','ch6'],
      timing:'餵貓取得四種材料後；材料可及性取決於流程，第一章商店已列配方不表示此時已拿得到全部材料。',
      requires:[{item:'狩られたネズミ',quantity:1,consumed:true,note:'餵貓累計 1 份。'},{item:'尻尾の切れたトカゲ',quantity:1,consumed:true,note:'餵貓累計 5 份。'},{item:'不幸な青い鳥',quantity:1,consumed:true,note:'餵貓累計 10 份。'},{item:'ねこのふん',quantity:1,consumed:true,note:'餵貓累計 15 份。'},{item:'OTH',quantity:1,consumed:true,note:'購買猫の指輪的價格；另需符合店家的熟客商品條件。'}],
      steps:['先確認向索爾德本店累計購物達 80,000 OTH，讓熟客商品名稱顯示；不是把 80,000 OTH 當作戒指售價。','將四種餵貓材料各 1 件賣給索爾德的這間武器防具店。','在熟客商品中確認猫の指輪，再支付 1 OTH 購買 1 個。'],rewards:[{at:'熟客商品購買',item:'猫の指輪',quantity:1,note:'不是餵貓直接送出的戒指。'}],
      notes:['日後要製作ソロモンの指輪，必須另備犬の指輪、鳥の指輪各 1 個，於阿斯嘉特行商人處交三戒指並支付 900,000 OTH。','賣料與買成品是商店流程；只把材料放在背包不算完成。'],sourceIds:['town-e-ring-spend','town-e-d47','town-e-z51']
    },
    {
      id:'solde-poem-first',townId:'solde',townName:'港町索爾德',title:'詩文之一：一定要調查書架',npc:'民宅書架',location:'ソール通り深處左側、教會旁民宅內的書架',chapters:['ch1','ch2','ch3','ch4','ch5','ch6'],timing:'第一章即可讀；此段可後補，建議初訪就讀。',requires:[],
      steps:['進入指定民宅，靠近書架按調查；單純走進房子不計算。','第二章在迪潘讀第二段、第三章起在克雷爾蒙費蘭讀第三段。三段都讀後，第六章返回這間民宅再調查。'],
      rewards:[],notes:['本步只有支線進度，沒有立即取得物品。完成三段閱讀後，第六章在本宅詩文右側／書架再調查可領トライエンブレム 1 個。','永久容易漏掉的是第二章迪潘那一段，原城鎮劇情後無法補讀。'],sourceIds:['town-e-s1','town-e-column','town-e-side']
    },
    {
      id:'dipan-poem-second',townId:'dipan-town',townName:'迪潘城下町',title:'詩文之二：第二章限定，進城前完成',npc:'民宅書架',location:'マーニ通り左側、武器防具店旁的民宅內',chapters:['ch2'],timing:'只限第二章迪潘城劇情前可探索的原城下町；完成迪潘城地下事件後不能補讀。',requires:[],
      steps:['進入武器防具店旁民宅，調查書架閱讀第二段。','確認讀到詩文再去城堡；保留進城前存檔可避免漏讀後無法挽回。'],rewards:[],notes:['這是第六章トライエンブレム 1 個的必要前置，閱讀當下不給物品。'],sourceIds:['town-e-s1','town-e-column','town-e-z118']
    },
    {
      id:'dipan-back-entrance',townId:'dipan-town',townName:'迪潘城下町',title:'守門士兵：先偷聽正門，再走後門',npc:'城堡正門前士兵',location:'迪潘城正門前；之後轉往城堡後門',chapters:['ch2'],timing:'第二章首次到城下町、進城前。',requires:[],
      steps:['先在城堡正門前觸發士兵交談事件。','看完後移動到城堡後門，從已開啟的入口進入。'],rewards:[],notes:['沒有物品獎勵；對話觸發後門通行。先完成限定詩文，再推進這一步。'],sourceIds:['town-e-d56','town-e-s1']
    },
    {
      id:'coriander-adventurer-gift',townId:'coriander',townName:'科里安德村',title:'行商人旁居民：免費領兩種練技能素材',npc:'行商人旁的居民／冒險者',location:'村內行商人身旁',chapters:['ch3'],timing:'第三章初訪即可交談。',requires:[],
      steps:['找到村內行商人，對身旁的居民交談。','領取虫のトゲ及ブルーソウルフレイム各 1 件。'],rewards:[{at:'首次領取',item:'虫のトゲ',quantity:1,note:'免費對話贈品。'},{at:'首次領取',item:'ブルーソウルフレイム',quantity:1,note:'免費對話贈品。'}],notes:['原攻略列兩種道具各一項，未列額外複數；此處按各 1 件記錄。'],sourceIds:['town-e-s2','town-e-z75','town-e-d64']
    },
    {
      id:'coriander-chicken-feeding',townId:'coriander',townName:'科里安德村',title:'雞的餵食：15 份骨屑與鳥之指環材料',npc:'村內的雞',location:'科里安德村內；來源未提供可靠街序，與行商人是不同互動對象。',chapters:['ch3','ch5','ch6'],timing:'第三章起可完成。第四章不能餵食；指定章節金之卵另見獨立事件。',
      requires:[{item:'骨クズ',quantity:15,consumed:true,note:'每次 1 份，完整領完四件合計 15 份。'}],
      steps:['第一、二章可先在喪失之森或王家地下道打スケルトン、スケルトンアーミー，破壞手腳取得骨クズ。','回科里安德村反覆餵雞，每次消耗 1 份骨クズ。','達成 1／5／10／15 累計門檻後保留四種材料，交給行商人製作鳥の指輪。'],
      rewards:[{at:1,item:'ひよこのえさ',quantity:1,note:'累計餵食第 1 份。'},{at:5,item:'野菜くず',quantity:1,note:'累計餵食第 5 份。'},{at:10,item:'貝殻入りのえさ',quantity:1,note:'累計餵食第 10 份。'},{at:15,item:'とりのふん',quantity:1,note:'累計餵食第 15 份。'}],
      notes:['金の卵不是第 15 次餵食的報酬；它是按章節、條件另行交談領取的事件。','15 份後不會繼續給新的餵食材料。'],sourceIds:['town-e-side','town-e-z51','town-e-z75','town-e-s1','town-e-s3']
    },
    {
      id:'coriander-bird-ring',townId:'coriander',townName:'科里安德村',title:'鳥之指環：跟著會搬家的行商人購買',npc:'行商人',location:'第三章卡爾斯塔德到達前在科里安德村；到達後移往卡爾斯塔德旅館。',chapters:['ch3'],timing:'餵雞達到 15 份、四材料齊備後。第三章途中店主會移動。',
      requires:[{item:'ひよこのえさ',quantity:1,consumed:true,note:'餵雞累計 1 份。'},{item:'野菜くず',quantity:1,consumed:true,note:'餵雞累計 5 份。'},{item:'貝殻入りのえさ',quantity:1,consumed:true,note:'餵雞累計 10 份。'},{item:'とりのふん',quantity:1,consumed:true,note:'餵雞累計 15 份。'},{item:'OTH',quantity:1,consumed:true,note:'成品購買價；仍需達成熟客條件。'}],
      steps:['先向同一位人界移動行商人累計購物達 80,000 OTH；搬家後熟客進度保留。','把四種雞給的材料各 1 件賣給行商人。','從同一行商人的熟客商品購買鳥の指輪 1 個，價格 1 OTH。','村內找不到行商人時，檢查卡爾斯塔德旅館；不是材料失效或事件失敗。'],rewards:[{at:'熟客商品購買',item:'鳥の指輪',quantity:1,note:'日後與貓、犬戒指各 1 個合成ソロモンの指輪。'}],notes:['行商人後續：第四、五章在迪潘；第六章回科里安德村。可再買的時機以當期商品表及熟客條件為準。'],sourceIds:['town-e-ring-spend','town-e-d64','town-e-d73','town-e-z118','town-e-z51']
    },
    {
      id:'coriander-ruins-report',townId:'coriander',townName:'科里安德村',title:'遺跡少女：回報時回答「無かった」',npc:'旅館前少女',location:'村口區域東側／旅館前',chapters:['ch3'],timing:'先聽取山岳遺跡消息；完成セルドベルグ山岳遺跡後回村。',requires:[],
      steps:['初訪先與旅館前少女交談，聽取山岳遺跡情報。','完成セルドベルグ山岳遺跡的ワイバーン戰後回村。','再次和少女交談，對寶物問題選「無かった」（沒有找到）。'],rewards:[{at:'正確選項回報',item:'ロイヤルゼリー',quantity:1,note:'回答「沒有」才給；不是在迷宮裡開箱。'}],notes:['這件材料另有配方用途；想製作物品時，先點ロイヤルゼリー查看來源再決定是否出售。'],sourceIds:['town-e-s2','town-e-z75','town-e-side']
    },
    {
      id:'coriander-golden-egg-ch3',townId:'coriander',townName:'科里安德村',title:'第三章金之卵：山岳遺跡通關後再找雞',npc:'村內的雞',location:'科里安德村內的雞',chapters:['ch3'],timing:'第三章完成セルドベルグ山岳遺跡、擊破ワイバーン後。',requires:[],
      steps:['完成山岳遺跡後回科里安德村。','和雞交談，取得本章的金の卵 1 個。'],rewards:[{at:'第三章通關後交談',item:'金の卵',quantity:1,note:'本章一份，不是無限領取。'}],notes:['這筆事件來源沒有要求先餵滿 15 份，不把餵雞材料事件當作前置。','第四章改找卡爾斯塔德的雞；第五、六章回科里安德村的雞，各有獨立領取時機。'],sourceIds:['town-e-column','town-e-z75','town-e-s2']
    },
    {
      id:'coriander-forest-report',townId:'coriander',townName:'科里安德村',title:'蒼枯之森情報與首次討伐回報',npc:'釣竿男子與旁邊女性／街上居民',location:'旅館旁；另一原攻略描述為入口稍前進的民宅前居民，確切畫面序未統一。',chapters:['ch3'],timing:'山岳遺跡通關後聽取情報，擊敗蒼枯之森グリフォン後回報。',requires:[],
      steps:['山岳遺跡後回村，詢問森林情報，使蒼枯の森出現在世界地圖。','進森林打倒グリフォン，取得翠の封陣器。','回村向提供情報的居民再次交談。'],rewards:[{at:'首次森林討伐回報',item:'マイトポーション',quantity:1,note:'由村民贈送；翠の封陣器是迷宮首領的另一項固定獎勵。'}],notes:['第四章起的コボルトキング續篇是另一次事件，回報物是識者の経験；不要和本次首次獎勵混算。'],sourceIds:['town-e-s2','town-e-z75','town-e-side']
    },
    {
      id:'villnore-dog-feeding',townId:'villnore',townName:'維爾諾亞',title:'旅館前的狗：15 份帶骨肉換四種材料',npc:'旅館前的狗',location:'維爾諾亞旅館前',chapters:['ch3','ch5','ch6'],timing:'第三章起可完成；第四章不能餵食。',
      requires:[{item:'骨付き肉',quantity:15,consumed:true,note:'每次 1 份，完整四材料共 15 份。'}],
      steps:['早期可在喪失之森、王家地下道或奇瑟納草原打ダイアウルフ，破壞尾部取得骨付き肉；奇瑟納草原的ジャイアントバット身體也可掉落。','回旅館前餵狗，按累計門檻收齊四種材料。','帶四材料到克雷爾蒙費蘭武器防具店，製作犬の指輪。'],
      rewards:[{at:1,item:'しゃぶった骨',quantity:1,note:'累計第 1 份。'},{at:5,item:'かじった靴',quantity:1,note:'累計第 5 份。'},{at:10,item:'ぼろぼろの布',quantity:1,note:'累計第 10 份。'},{at:15,item:'いぬのふん',quantity:1,note:'累計第 15 份。'}],
      notes:['犬之指環材料在維爾諾亞取得，但成品在克雷爾蒙費蘭購買。','克雷爾蒙費蘭另有一隻可餵的狗，獎品與門檻不同，不能把兩隻狗混在一起。'],sourceIds:['town-e-side','town-e-z75','town-e-s1','town-e-s3','town-e-d77']
    },
    {
      id:'villnore-flower-ch3',townId:'villnore',townName:'維爾諾亞',title:'第三章花販：小花只在本章販售',npc:'花販少女',location:'維爾諾亞街道；可查來源未給可靠建築門序。',chapters:['ch3'],timing:'第三章離開本章前購買；每章花種不同。',requires:[{item:'OTH',quantity:10,consumed:true,note:'一朵的價格。'}],
      steps:['與花販少女交談，支付 10 OTH 購買ちいさな花 1 朵。','要收齊四種花，第四、五、六章分別再回來各買該章花種。'],rewards:[{at:'第三章購買',item:'ちいさな花',quantity:1,note:'配件效果為最大 HP +10%。'}],notes:['後續依章節依序為リリィ、スズラン、グラジオラス，每朵 10 OTH；四種各買一朵共 40 OTH。','原作者指出只有リリィ另有其他來源，其餘三種須注意各自章節的花販時機。'],sourceIds:['town-e-column','town-e-z118','town-e-z75']
    },
    {
      id:'villnore-house-money',townId:'villnore',townName:'維爾諾亞',title:'民宅的 2,000 OTH：選擇道歉並珍惜使用',npc:'民宅居民',location:'維爾諾亞民宅內；來源未指定可靠門號。',chapters:['ch3'],timing:'第三章初訪探索民宅時。',requires:[],
      steps:['進入城內民宅並觸發對話。','出現選項時選「ごめんなさい、大切に使います」（對不起，我會珍惜使用）。'],rewards:[{at:'對話選項',item:'OTH',quantity:2000,note:'金錢獎勵；不是一把武器或配件。'}],notes:['另一民宅的砕土の護符是不同收集點，可由本區寶藏表查找。'],sourceIds:['town-e-z75']
    },
    {
      id:'villnore-mine-report',townId:'villnore',townName:'維爾諾亞',title:'礦山情報與女王蜂首輪討伐：10,000 OTH',npc:'酒館附近的礦山情報人／礦工',location:'維爾諾亞酒館入口旁；來源也簡稱酒館商人或街上礦工。',chapters:['ch3'],timing:'先詢問トゥルゲン鉱山，完成首次クイーンワスプ討伐後回報。',requires:[],
      steps:['在酒館入口旁聽取礦山情報，開放トゥルゲン鉱山。','進礦山取鉱山の鍵、開通首領路，擊敗クイーンワスプ。','返回維爾諾亞，和提供礦山情報的人交談領報酬。'],rewards:[{at:'女王蜂討伐回報',item:'OTH',quantity:10000,note:'需要回城領；礦山裡的 15,000 OTH 寶箱另算。'}],notes:['第四章續篇的巨大蜂報酬メタボライザー與本次不同；本次不會拿到緋の封陣器。'],sourceIds:['town-e-z75','town-e-side','town-e-z51']
    },
    {
      id:'villnore-temple-report',townId:'villnore',townName:'維爾諾亞',title:'水上神殿情報：通關回覆「行った」',npc:'旅館旁、行商人附近青年',location:'維爾諾亞旅館旁，站在行商人附近的男子',chapters:['ch3'],timing:'首次交談開放アウドゥーラ水上神殿；通關後返回回報。',requires:[],
      steps:['與青年交談，讓アウドゥーラ水上神殿顯示在世界地圖。','完成神殿クラーケン戰，取得時渡りの神器。','回維爾諾亞與青年再交談，回答「行った」（去過）。'],rewards:[{at:'神殿通關回報',item:'プリズムクリスタル',quantity:1,note:'需答對選項；不是神殿首領固定掉落。'}],notes:['神殿主線結束後仍要回到提供情報的人，才領得到這份贈禮。'],sourceIds:['town-e-s2','town-e-z75','town-e-side']
    },
    {
      id:'villnore-west-map',townId:'villnore',townName:'維爾諾亞',title:'西部地圖：在武器防具店購買',npc:'武器防具店店主',location:'維爾諾亞武器防具店',chapters:['ch3','ch4','ch5','ch6'],timing:'第三章起商店商品。',requires:[{item:'OTH',quantity:1000,consumed:true,note:'普通商品，無需材料配方。'}],
      steps:['在武器防具店普通商品中選大陸西部の地図。','支付 1,000 OTH 購買 1 份。'],rewards:[{at:'購買',item:'大陸西部の地図',quantity:1,note:'世界地圖資訊道具；不是本站迷宮房間圖。'}],notes:['此購買不需要怪物素材。'],sourceIds:['town-e-d66','town-e-s2']
    },
    {
      id:'kalstad-boy-donation',townId:'kalstad',townName:'卡爾斯塔德',title:'牧童捐款：每次 10 OTH，第六章依總額贈劍',npc:'要錢的少年／牧童',location:'卡爾斯塔德入口進入後，立即轉入後方路徑的深處。',chapters:['ch3'],timing:'第三章先捐款；第六章以後回來和同一少年交談領取武器。',requires:[{item:'OTH',quantity:300,consumed:true,note:'光剣クラウソナス路線：每次 10 OTH，至少 30 次，共 300 OTH。較低捐款分支見獎勵表。'}],
      steps:['與牧童反覆對話，每次交出 10 OTH，累計次數。','想拿光剣クラウソナス：至少給 30 次，總額 300 OTH；想選名刀五月雨：給 10～29 次，總額 100～290 OTH。','第六章以後再來交談，依累計捐款得到對應的一把劍。'],
      rewards:[{at:'累計 100～290 OTH，第六章領取',item:'名刀五月雨',quantity:1,note:'10～29 次；單手劍，與高額分支擇一。'},{at:'累計至少 300 OTH，第六章領取',item:'光剣クラウソナス',quantity:1,note:'至少 30 次；大劍，與低額分支擇一。'}],
      notes:['只給 0～9 次、合計不超過 90 OTH，沒有武器；兩把武器依金額擇一，不是累計連續發兩把。','建議第三章就捐足；Pluto 第五章仍允許在世界樹通關後、前往瓦爾哈拉前補辦，但繼續推進後捐款事件會消失。第六章是領取時機，不當作捐款機會。','名刀五月雨另可在索爾德製作；光剣クラウソナス另可在雷札德之塔寶箱取得。'],sourceIds:['town-e-z51','town-e-side','town-e-column','town-e-z75','town-e-pluto5']
    },
    {
      id:'kalstad-volcano-charm',townId:'kalstad',townName:'卡爾斯塔德',title:'火山護身符委託：把お守り交還青年',npc:'火山情報冒險者／入口附近青年',location:'先在卡爾斯塔德旅館聽火山情報；交還對象在城鎮入口附近。',chapters:['ch3'],timing:'通過蘇爾斯火山洞窟、完成エヴォルブ戰後。',requires:[{item:'お守り',quantity:1,consumed:true,note:'火山最深處首領房後方台座調查取得 1 個，必須先拿再回城。'}],
      steps:['在卡爾斯塔德旅館聽取スルス火山洞窟情報。','擊敗火山首領後不要直接離開；往首領區後方最深處，調查台座拿お守り 1 個。','回卡爾斯塔德入口附近找青年，交還お守り。'],rewards:[{at:'交還お守り',item:'無欠のタリスマン',quantity:1,note:'不是無欠の護符，兩者是不同道具。'}],notes:['關鍵物品來自首領後方台座，單純擊倒首領不會自動完成交還。'],sourceIds:['town-e-s2','town-e-z107','town-e-side','town-e-z51']
    },
    {
      id:'kalstad-merchant-arrival',townId:'kalstad',townName:'卡爾斯塔德',title:'行商人搬到旅館：鳥戒指與熟客商品繼續辦理',npc:'從科里安德村搬來的行商人',location:'卡爾斯塔德旅館內',chapters:['ch3'],timing:'首次到達卡爾斯塔德起，直到第三章結束。',requires:[],
      steps:['到達卡爾斯塔德後，在旅館內尋找行商人。','雞的四材料齊備時，仍可賣給他並以 1 OTH 購買鳥の指輪；完整需求見鳥戒指事件。','武器需求材料逐項點開查來源，再決定要出售哪些裝備或部位素材。'],rewards:[],notes:['第四、五章行商人移往迪潘，第六章回科里安德村。到達新城後在舊村找不到他，是正常劇情移動。'],sourceIds:['town-e-z118','town-e-d73']
    },
    {
      id:'crell-poem-third',townId:'crell',townName:'克雷爾蒙費蘭',title:'詩文之三：旅館旁民宅的書架',npc:'民宅書架',location:'克雷爾蒙費蘭旅館旁民宅；青珠原作者明寫旅館左側。',chapters:['ch3','ch4','ch5','ch6'],timing:'第三章起可讀，三詩文的最後一段。',requires:[],
      steps:['進入旅館旁的詩文民宅，調查書架閱讀第三段。','如果第一、二段也都讀過，第六章返回索爾德第一段詩文所在民宅，再調查領獎。'],rewards:[],notes:['本步不立即給物品。三段合計的獎勵是第六章トライエンブレム 1 個。','若漏了第二章迪潘段，讀完本段仍無法補齊條件。'],sourceIds:['town-e-s2','town-e-column','town-e-z107']
    },
    {
      id:'crell-old-woman-gifts',townId:'crell',townName:'克雷爾蒙費蘭',title:'老婦贈品：趁她走入屋內前交談',npc:'旅館右側民宅的老婦',location:'克雷爾蒙費蘭旅館右側民宅內',chapters:['ch3'],timing:'初次進入此民宅時立即交談；原作者提醒老婦會往深處走。',requires:[],
      steps:['進入旅館右側民宅後，立即找老婦交談，別先在門口停留太久。','領壊れた杖及メイスヘッド各 1 件。','另向同屋老人詢問クローサス森林遺跡情報。'],rewards:[{at:'老婦交談',item:'壊れた杖',quantity:1,note:'可作商店素材；來源未列複數。'},{at:'老婦交談',item:'メイスヘッド',quantity:1,note:'可作商店素材；來源未列複數。'}],notes:['免費材料用途可點名稱查詢；兩件都不是「一聽到名字便已取得」。'],sourceIds:['town-e-s2','town-e-z107']
    },
    {
      id:'crell-forest-information',townId:'crell',townName:'克雷爾蒙費蘭',title:'森林遺跡情報：和民宅居民交談',npc:'旅館右側民宅老人／老婦',location:'克雷爾蒙費蘭旅館右側民宅',chapters:['ch3'],timing:'第三章初訪。',requires:[],
      steps:['進入旅館右側民宅，聽取クローサス森林遺跡的情報。','離城返回世界地圖，確認森林遺跡已出現。'],rewards:[],notes:['青珠原作者稱老人，大寶庫稱老女；兩者都指民宅情報，不把姓名或性別差異當作兩份獎勵。'],sourceIds:['town-e-s2','town-e-d77']
    },
    {
      id:'crell-manor-report',townId:'crell',townName:'克雷爾蒙費蘭',title:'妄執之館回報：答案選「魔物」',npc:'旅館內提供館邸情報的居民',location:'克雷爾蒙費蘭旅館內',chapters:['ch3'],timing:'先聽取昏き妄執の館消息；打倒レディ・クレイオ後回報。',requires:[],
      steps:['在旅館內與居民交談，開放昏き妄執の館。','完成館邸討伐，再返回同一旅館。','回報時選「魔物」，取得賢者の秘薬。'],rewards:[{at:'正確答案回報',item:'賢者の秘薬',quantity:1,note:'選「魔物」才給。'}],notes:['選「幽霊」不會給這份獎品。迷宮首領的藍の封陣器是另一份固定獎勵。'],sourceIds:['town-e-s2','town-e-z107','town-e-side']
    },
    {
      id:'crell-dog-feeding',townId:'crell',townName:'克雷爾蒙費蘭',title:'本城另一隻狗：3 份與 10 份獎勵',npc:'克雷爾蒙費蘭的狗',location:'克雷爾蒙費蘭城內；來源沒有可靠門序。',chapters:['ch3','ch5','ch6'],timing:'第三章起；第四章不能餵食。這隻不是維爾諾亞旅館前給戒指素材的狗。',
      requires:[{item:'骨付き肉',quantity:10,consumed:true,note:'兩份獎勵總計 10 份，每次 1 份；不必餵到 15 份。'}],
      steps:['從ダイアウルフ尾部或奇瑟納草原ジャイアントバット身體取得骨付き肉。','餵本城的狗到累計 3 份，領フレアクリスタル。','繼續再餵 7 份，總計 10 份，領女神の霊薬。'],rewards:[{at:3,item:'フレアクリスタル',quantity:1,note:'門檻為第 3 份，並非第 1 份。'},{at:10,item:'女神の霊薬',quantity:1,note:'累計 10 份。'}],notes:['沒有犬の指輪素材獎勵。若目標是ソロモンの指輪，優先餵維爾諾亞的狗 15 份。','四種動物事件都做：貓海鮮肉 15 份、雞骨クズ 15 份、維爾諾亞狗骨付き肉 15 份、本城狗骨付き肉 10 份；帶骨肉合計 25 份。'],sourceIds:['town-e-side','town-e-s3']
    },
    {
      id:'crell-dog-ring',townId:'crell',townName:'克雷爾蒙費蘭',title:'犬之指環：材料來自維爾諾亞，製作在本城',npc:'克雷爾蒙費蘭武器防具店店主',location:'克雷爾蒙費蘭武器防具店',chapters:['ch3','ch4','ch5','ch6'],timing:'維爾諾亞的狗餵滿 15 份、四材料齊備後。',
      requires:[{item:'しゃぶった骨',quantity:1,consumed:true,note:'維爾諾亞的狗累計餵 1 份。'},{item:'かじった靴',quantity:1,consumed:true,note:'維爾諾亞的狗累計餵 5 份。'},{item:'ぼろぼろの布',quantity:1,consumed:true,note:'維爾諾亞的狗累計餵 10 份。'},{item:'いぬのふん',quantity:1,consumed:true,note:'維爾諾亞的狗累計餵 15 份。'},{item:'OTH',quantity:1,consumed:true,note:'成品價；另需符合熟客條件。'}],
      steps:['向克雷爾蒙費蘭的本店累計購物達 80,000 OTH，讓熟客商品名稱顯示；成品售價 1 OTH 另付。','把四種維爾諾亞狗的贈品各 1 件賣給本城武器防具店。','在熟客商品中支付 1 OTH 購買犬の指輪 1 個。'],rewards:[{at:'熟客商品購買',item:'犬の指輪',quantity:1,note:'配合猫の指輪、鳥の指輪，各 1 個。'}],notes:['不要把本城餵狗的フレアクリスタル、女神の霊薬誤當成戒指材料。'],sourceIds:['town-e-ring-spend','town-e-d77','town-e-side']
    },
    {
      id:'crell-east-map',townId:'crell',townName:'克雷爾蒙費蘭',title:'東部地圖：本城店主販售',npc:'武器防具店店主',location:'克雷爾蒙費蘭武器防具店',chapters:['ch3','ch4','ch5','ch6'],timing:'第三章起商店商品。',requires:[{item:'OTH',quantity:5000,consumed:true,note:'每份普通購買價，無素材需求。'}],
      steps:['在普通商品選大陸東部の地図，支付 5,000 OTH 購買 1 份。'],rewards:[{at:'購買',item:'大陸東部の地図',quantity:1,note:'本店也賣大陸西部の地図，價格 1,000 OTH。'}],notes:['購買的是遊戲內世界地圖道具，不是迷宮配置攻略圖。'],sourceIds:['town-e-d77','town-e-s2']
    },
    {
      id:'coriander-reunion-richelle',townId:'coriander',townName:'科里安德村',title:'解放英靈再會：リシェル',npc:'リシェル',location:'科里安德村民宅內',chapters:['ch3','ch4'],timing:'已招募並解放リシェル，第四章結束前到村內再會。',requires:[],
      steps:['王家地下道同一輕戰士遺品需抽到リシェル；ジェシカ、シルフィード是同組另兩名候選，一次遊玩不能從同一遺品全招。','達到可解放等級後解放リシェル，再到科里安德村民宅交談；若未觸發繼續交談。'],rewards:[{at:'第四章以前再會',item:'識者の経験',quantity:1,note:'NPC 再會贈品，與森林續篇回報是兩個來源。'}],notes:['解放會讓該英靈離隊，武器與防具會帶走、飾品返還；先檢查裝備再決定。'],sourceIds:['town-e-equipment-return','town-e-ein','town-e-d64']
    },
    {
      id:'coriander-reunion-sylphide',townId:'coriander',townName:'科里安德村',title:'解放英靈再會：シルフィード',npc:'シルフィード',location:'科里安德村民宅內',chapters:['ch3','ch4'],timing:'已招募並解放シルフィード，第四章結束前再會。',requires:[],
      steps:['王家地下道輕戰士遺品需抽到シルフィード，再育成至可解放等級。','解放後到村內民宅反覆交談，領取金錢。'],rewards:[{at:'第四章以前再會',item:'OTH',quantity:50000,note:'同組候選リシェル的識者の経験、ジェシカ後期贈禮不能全數取得。'}],notes:['解放時該角色離隊，武器與防具會帶走、飾品返還。'],sourceIds:['town-e-equipment-return','town-e-ein']
    },
    {
      id:'villnore-reunion-clad',townId:'villnore',townName:'維爾諾亞',title:'解放英靈再會：クラッド與稀有シルバークラッド',npc:'クラッド',location:'維爾諾亞民宅內',chapters:['ch3','ch4'],timing:'已招募並解放クラッド，第四章結束前到城內再會。',requires:[],
      steps:['王家地下道重戰士遺品需抽到クラッド，與ローランド為同組候選。','育成至可解放等級並解放後，到維爾諾亞民宅與他交談。'],rewards:[{at:'第四章以前再會',item:'シルバークラッド',quantity:1,note:'不是同名普通商店商品。'}],notes:['先核對裝備再解放；解放角色及其當時武器、防具不會留在隊伍，飾品會返還。'],sourceIds:['town-e-equipment-return','town-e-ein','town-e-s1']
    },
    {
      id:'villnore-reunion-roland',townId:'villnore',townName:'維爾諾亞',title:'解放英靈再會：ローランド',npc:'ローランド',location:'維爾諾亞民宅內',chapters:['ch3','ch4'],timing:'已招募並解放ローランド，第四章結束前再會。',requires:[],
      steps:['王家地下道重戰士遺品需抽到ローランド；不能同時由該遺品取得クラッド。','育成至可解放等級並解放，回維爾諾亞民宅交談。'],rewards:[{at:'第四章以前再會',item:'OTH',quantity:50000,note:'金錢贈禮。'}],notes:['解放時武器與防具會帶走、飾品返還。'],sourceIds:['town-e-equipment-return','town-e-ein']
    },
    {
      id:'kalstad-reunion-kirke',townId:'kalstad',townName:'卡爾斯塔德',title:'解放英靈再會：キルケ與稀有クラッドメイル',npc:'キルケ',location:'卡爾斯塔德民宅內',chapters:['ch3','ch4'],timing:'第三章森林遺跡招募並解放後，第四章結束前再會。',requires:[],
      steps:['クローサス森林遺跡輕戰士遺品需抽到キルケ；同組為フローディア、ラスカ。','育成至可解放等級並解放，回卡爾斯塔德民宅找她交談。'],rewards:[{at:'第四章以前再會',item:'クラッドメイル',quantity:1,note:'與クラッド的シルバークラッド不同。'}],notes:['解放角色的武器與防具會帶走、飾品返還；此條只適用實際抽到キルケ的存檔。'],sourceIds:['town-e-equipment-return','town-e-ein']
    }
  ]
};
