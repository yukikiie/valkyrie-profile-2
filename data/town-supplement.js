/* 非貓事件獨立覆核：補充章節城鎮短事件、北部地圖及離隊贈禮的完整等級分支。 */
window.VP_TOWN_SUPPLEMENT = {
  sources: [
    {id:'town-sup-seiju4',title:'青珠之星：第四章城鎮短事件、北部地圖與離隊贈禮',url:'https://www.seiju.info/vp2/chart/chart3.html',checked:'2026-11-01',language:'ja'},
    {id:'town-sup-z4',title:'ZAPAnet：第四章迪潘與離隊贈禮完整等級表',url:'https://zapanet.info/vp2/88.html',checked:'2026-11-01',language:'ja'},
    {id:'town-sup-zitems',title:'ZAPAnet：北部地圖價格、販售章節與店家',url:'https://zapanet.info/vp2/65.html',checked:'2026-11-01',language:'ja'},
    {id:'town-sup-pluto-departure',title:'Pluto：四位同伴離隊贈禮日文完整表',url:'https://www.pluto-dm.com/vp2/get01.html',checked:'2026-11-01',language:'ja'},
    {id:'town-sup-neoseeker-departure',title:'triAce_Fanboy 原作者：離隊低等級門檻的英文另一記載',url:'https://www.neoseeker.com/valkyrie-profile-2-silmeria/faqs/139776-valkyrie-profile-2-a.html',checked:'2026-11-01',language:'en'},
    {id:'town-sup-seiju-column',title:'青珠之星：離隊武器條件與兩把並得的說明',url:'https://www.seiju.info/vp2/column.html',checked:'2026-11-01',language:'ja'}
  ],
  events: [
    ...[
      {id:'leone',name:'蕾歐娜',jp:'レオーネ',knowledge:'剣士の知識',potion:'マイトポーション',weapon35:'裂刀ファーウェル',weapon40:'ヴァルキリーフェイバー'},
      {id:'arngrim',name:'亞琉哲',jp:'アリューゼ',knowledge:'重戦士の知識',potion:'ガードポーション',weapon35:'ドラゴンスレイヤー改',weapon40:'バハムートティア'}
    ].map(c=>({
      id:'town-palace-'+c.id+'-departure-levels',townId:'palace-moon',townName:'奉龍殿後半',stageIds:['palace-moon'],
      title:'第三章'+c.name+'離隊：完整贈禮分支與兩把武器並得',npc:c.jp+'／'+c.name,
      location:'奉龍殿ドラゴンゾンビ戰後，進入深處房間發生的離隊事件；不在克雷爾蒙費蘭商店領取。',chapters:['ch3'],
      timing:'在奉龍殿離隊事件前完成育成。想收齊兩把武器，'+c.name+'本人必須至少 Lv40。',requires:[],
      steps:['在奉龍殿章末事件前確認'+c.name+'的等級；保留首領前存檔，以免事件後無法補練。','Lv35～39 取得 '+c.weapon35+' 1 把；Lv40 以上除了該把，再加 '+c.weapon40+' 1 把。','下列低等級表依日文 Pluto 記載，各等級區間擇一，不是把所有低檔的道具累加。英文原作者低檔另有不同表，詳見註記。','事件後檢查道具與武器欄；屬自動發放，不必帶素材回城換取。'],
      rewards:[
        {at:'日文表 Lv21～25',item:'識者の経験',quantity:1,note:'日文表 Lv20 以下無贈禮；低檔有英文來源差異。'},
        {at:'日文表 Lv26～29',item:'識者の経験',quantity:2,note:'本檔總計 2 個。'},
        {at:'日文表 Lv30～34',item:'識者の経験',quantity:2,note:'另有'+c.knowledge+' 1 個。'},
        {at:'日文表 Lv30～34',item:c.knowledge,quantity:1,note:'與識者經驗 2 個一起取得。'},
        {at:'Lv35～39',item:'識者の経験',quantity:1,note:'本檔總計 1 個；不是所有低檔經驗道具累加。'},
        {at:'Lv35～39',item:c.knowledge,quantity:1,note:'本檔另有識者經驗 1 個及 '+c.weapon35+' 1 把。'},
        {at:'Lv35～39',item:c.weapon35,quantity:1,note:'不需要製作素材。'},
        {at:'Lv40 以上',item:'識者の経験',quantity:1,note:'最高檔合計四件贈禮。'},
        {at:'Lv40 以上',item:c.knowledge,quantity:1,note:'與識者經驗及兩把武器一併取得。'},
        {at:'Lv40 以上',item:c.weapon35,quantity:1,note:'最高檔仍包括這把 Lv35 武器。'},
        {at:'Lv40 以上',item:c.weapon40,quantity:1,note:'Lv40 以上額外一把，與上一列並得。'}
      ],
      notes:['英文原作者的低檔另一記載：Lv1～19 '+c.potion+' 1；Lv20～24 識者の経験 1＋'+c.potion+' 1；Lv25～27 識者の経験 2；Lv28～34 識者の経験 2＋'+c.knowledge+' 1。Lv35～39／Lv40 以上的武器及道具兩方一致。尚不能憑攻略差異推定遊戲版本或實際程式規則。','兩位角色各自檢查等級：兩人都達 Lv40 才能合計取得四把武器；只練其中一人不能領另一人的武器。','離隊時裝備會留在玩家物品欄；與解放一般英靈時裝備隨人物離開的規則不同。'],
      sourceIds:['town-sup-pluto-departure','town-sup-neoseeker-departure','town-sup-seiju-column']
    })),
    {
      id:'town-solde-north-map',townId:'solde',townName:'港町索爾德',title:'第四章起：北部地圖 10,000 OTH，免繞回程迷宮',npc:'武器防具店店主',
      location:'索爾德武器防具店；第四章以後其他武器防具店也有出售，不是只限本店。',chapters:['ch4','ch5','ch6'],
      timing:'第四章由斯卡畢亞溪谷回到索爾德時即可購買。',
      requires:[{item:'OTH',quantity:10000,consumed:true,note:'購買 1 份的價格；普通商品，不需要素材或另解熟客條件。'}],
      steps:['在第四章起的武器防具店商品中找大陸北部の地図。','支付 10,000 OTH 購買 1 份，之後在世界地圖切換到已開放的北部地區移動。'],
      rewards:[{at:'購買 1 次',item:'大陸北部の地図',quantity:1,note:'索爾德、迪潘一帶的區域移動道具；不是迷宮內房間配置圖。'}],
      notes:['只需持有 1 份即可使用，不須每次移動重新購買。西部 1,000 OTH、東部 5,000 OTH 是另外兩件地圖，不可互相代替。'],
      sourceIds:['town-sup-seiju4','town-sup-zitems']
    },
    {
      id:'town-crell-dipan-news-ch4',townId:'crell',townName:'克雷爾蒙費蘭',title:'第四章返城短事件：離城時聽取迪潘消息',npc:'城鎮出入口的劇情人物',
      location:'第四章返回克雷爾蒙費蘭後，再由城鎮出口離開。',chapters:['ch4'],
      timing:'第四章初期，可在繼續經斯卡畢亞溪谷返回索爾德前觀看。',requires:[],
      steps:['進入克雷爾蒙費蘭。','再離開城鎮，觀看與迪潘相關的短劇情。'],rewards:[],
      notes:['沒有交付物、金錢支出或物品報酬；原作者註明不影響主線。此筆用來區分可選劇情與領獎任務。'],
      sourceIds:['town-sup-seiju4','town-sup-z4']
    },
    {
      id:'town-solde-dipan-port-news-ch4',townId:'solde',townName:'港町索爾德',title:'第四章港口短事件：返回碼頭確認迪潘消息',npc:'港口劇情人物',
      location:'索爾德港口／碼頭方向。',chapters:['ch4'],
      timing:'第四章經斯卡畢亞溪谷返抵索爾德後、往喪失之森前可觀看。',requires:[],
      steps:['回索爾德後往港口走，觸發迪潘相關事件。','看完可回武器防具店補給、買北部地圖，再完成詩文與其他返鄉事項。'],rewards:[],
      notes:['沒有固定物品獎勵，也不要求付船費；原作者註明不影響主線。勿把觀看短事件當成已完成書架調查。'],
      sourceIds:['town-sup-seiju4','town-sup-z4']
    },
    {
      id:'town-dipan-dylan-departure-levels',townId:'dipan-town',townName:'迪潘城下町',title:'第四章迪蘭離隊：完整贈禮分支與來源差異',npc:'ディラン／迪蘭',stageIds:['dipan-hrist'],
      location:'迪潘城玉座區亞莉與亞琉哲戰之後的離隊事件；進城下町只是準備補給，獎品不向店主領。',chapters:['ch4'],
      timing:'進入第四章末首領連戰前確認等級；離隊事件發生後無法回頭替他升級補領。',requires:[],
      steps:['想取得兩把大劍，須在離隊前將迪蘭升到至少 Lv45；可在進入迪潘城末段連戰前存檔確認。','通過亞莉與亞琉哲戰後，依迪蘭離隊當時等級自動取得該檔贈禮。','等級檔位互斥，只看符合的最高一檔，不把所有低檔的識者經驗再累加。'],
      rewards:[
        {at:'日文表 Lv26～30',item:'識者の経験',quantity:1,note:'Lv25 以下沒有離隊贈禮。'},
        {at:'日文表 Lv31～34',item:'識者の経験',quantity:2,note:'此檔總數 2 個，不再加 Lv26 檔。'},
        {at:'日文表 Lv35～39',item:'識者の経験',quantity:2,note:'同時有アンブロシア 1 個。'},
        {at:'日文表 Lv35～39',item:'アンブロシア',quantity:1,note:'此檔合計識者の経験 2 個、アンブロシア 1 個。'},
        {at:'Lv40～44',item:'識者の経験',quantity:1,note:'本檔經驗道具總數變為 1 個；不是前檔全部累加。'},
        {at:'Lv40～44',item:'アンブロシア',quantity:1,note:'另有識者の経験 1 個及不死者の剣 1 把。'},
        {at:'Lv40～44',item:'不死者の剣',quantity:1,note:'本檔固定離隊武器。'},
        {at:'Lv45 以上',item:'識者の経験',quantity:1,note:'Lv45 檔合計四件贈禮。'},
        {at:'Lv45 以上',item:'アンブロシア',quantity:1,note:'與識者經驗及兩把大劍一起取得。'},
        {at:'Lv45 以上',item:'不死者の剣',quantity:1,note:'Lv45 檔仍包含這把 Lv40 武器。'},
        {at:'Lv45 以上',item:'虐げられし者の剣',quantity:1,note:'ATK 850 的大劍；不需要向 NPC 交材料。'}
      ],
      notes:['上表的 Lv26／31／35 分級依日文 Pluto、ZAPAnet。英文原作者另一表為：Lv1～24 チャージブレイク 1；Lv25～29 識者の経験 1＋チャージブレイク 1；Lv30～32 識者の経験 2；Lv33～39 識者の経験 2＋アンブロシア 1。Lv40／45 的兩檔武器與數量兩方一致。這是來源衝突，尚無版本／實機證據可判定成因，不宣稱低等級表適用所有版本。','第四章入口士兵的識者の経験 1 個、第五章開頭回程寶箱的識者の経験 2 個是其他取得物，與本表的條件贈禮分開。','本筆屬主線同伴的劇情離隊，與玩家選擇解放英靈、再到城鎮重逢的機制不同。'],
      sourceIds:['town-sup-z4','town-sup-pluto-departure','town-sup-neoseeker-departure','town-sup-seiju4']
    },
    {
      id:'town-dipan-lezard-departure-levels',townId:'dipan-town',townName:'迪潘城下町',title:'第四章雷札德離隊：完整贈禮分支與來源差異',npc:'レザード／雷札德',stageIds:['dipan-hrist'],
      location:'迪潘城玉座區亞莉與亞琉哲戰之後的離隊事件；無需找城鎮居民交換。',chapters:['ch4'],
      timing:'第四章末首領連戰前確認雷札德等級；事件發生後不能回頭補足離隊前等級。',requires:[],
      steps:['要同時取得賢者の石の破片及ホムンクルスの種，離隊前須達至少 Lv45。','通過亞莉與亞琉哲戰後，依雷札德離隊當時等級取得對應贈禮。','只取最高符合的一檔；例如 Lv45 並不是把 Lv26～44 各檔經驗道具全部相加。'],
      rewards:[
        {at:'日文表 Lv26～30',item:'識者の経験',quantity:1,note:'Lv25 以下沒有離隊贈禮。'},
        {at:'日文表 Lv31～34',item:'識者の経験',quantity:2,note:'本檔總計 2 個。'},
        {at:'日文表 Lv35～39',item:'識者の経験',quantity:2,note:'另有魔術師の知識 1 個。'},
        {at:'日文表 Lv35～39',item:'魔術師の知識',quantity:1,note:'本檔合計識者の経験 2 個、魔術師の知識 1 個。'},
        {at:'Lv40～44',item:'識者の経験',quantity:1,note:'本檔總數 1 個。'},
        {at:'Lv40～44',item:'魔術師の知識',quantity:1,note:'另有識者の経験 1 個及賢者の石の破片 1 個。'},
        {at:'Lv40～44',item:'賢者の石の破片',quantity:1,note:'MAG +100 的配件；不是製作素材交付獎勵。'},
        {at:'Lv45 以上',item:'識者の経験',quantity:1,note:'Lv45 檔合計四件贈禮。'},
        {at:'Lv45 以上',item:'魔術師の知識',quantity:1,note:'與識者經驗及兩件配件一起取得。'},
        {at:'Lv45 以上',item:'賢者の石の破片',quantity:1,note:'Lv45 檔仍包含這件 Lv40 配件。'},
        {at:'Lv45 以上',item:'ホムンクルスの種',quantity:1,note:'全屬性耐性 +20% 的配件。'}
      ],
      notes:['上表的 Lv26／31／35 分級依日文 Pluto、ZAPAnet。英文原作者另一表為：Lv1～24 スペルポーション 1；Lv25～29 識者の経験 1＋スペルポーション 1；Lv30～32 識者の経験 2；Lv33～39 識者の経験 2＋魔術師の知識 1。Lv40／45 的兩檔配件與數量兩方一致。低等級來源歧異尚未經版本或實機比對，不推測成因。','上述等級只檢查雷札德本人；迪蘭等級達標不能替代他的條件。','兩人皆 Lv45 時，兩份最高檔合計識者の経験 2 個、アンブロシア 1 個、魔術師の知識 1 個、武器 2 把、配件 2 個；另加劇情回程寶箱時須分開計算。'],
      sourceIds:['town-sup-z4','town-sup-pluto-departure','town-sup-neoseeker-departure','town-sup-seiju4']
    }
  ],
  corrections: []
};
