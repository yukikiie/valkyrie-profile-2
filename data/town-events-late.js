/* 城鎮再訪、限時贈禮與商人位置：逐項保留章節、數量與可查來源。 */
(() => {
  'use strict';
  const sources = [
    {id:'town-late-seiju4',title:'青珠之星：第四章城鎮變化與委託續篇',url:'https://www.seiju.info/vp2/chart/chart3.html',checked:'2026-11-01'},
    {id:'town-late-seiju5',title:'青珠之星：第五章補給、索爾德貓的期限',url:'https://www.seiju.info/vp2/chart/chart4.html',checked:'2026-11-01'},
    {id:'town-late-seiju6',title:'青珠之星：第六章返鄉與衛兵長遺物',url:'https://www.seiju.info/vp2/chart/chart5.html',checked:'2026-11-01'},
    {id:'town-late-column',title:'青珠之星：各章金之卵、花販、少年回禮與詩文',url:'https://www.seiju.info/vp2/column.html',checked:'2026-11-01'},
    {id:'town-late-z4',title:'ZAPAnet：第四章城鎮、士兵與再訪',url:'https://zapanet.info/vp2/88.html',checked:'2026-11-01'},
    {id:'town-late-z5',title:'ZAPAnet：第五章城鎮、金之卵與補給',url:'https://zapanet.info/vp2/89.html',checked:'2026-11-01'},
    {id:'town-late-z6',title:'ZAPAnet：第六章返鄉、詩文與委託回報',url:'https://zapanet.info/vp2/90.html',checked:'2026-11-01'},
    {id:'town-late-zlimited',title:'ZAPAnet：行商人移動、限定花與動物位置',url:'https://zapanet.info/vp2/118.html',checked:'2026-11-01'},
    {id:'town-late-dside',title:'GAME 大寶庫：城鎮支線、少年捐款與詩文',url:'https://game.daihouko.com/valkyrieprofile/2/50.html',checked:'2026-11-01'},
    {id:'town-late-dtips',title:'GAME 大寶庫：SG 入口音樂服務與價格變更',url:'https://game.daihouko.com/valkyrieprofile/2/28.html',checked:'2026-11-01'},
    {id:'town-late-pluto5',title:'Pluto：第五章動物與捐款支線的後期提醒',url:'https://www.pluto-dm.com/vp2/chart05.html',checked:'2026-11-01'},
    {id:'town-late-pluto6',title:'Pluto：第六章返鄉取得物',url:'https://www.pluto-dm.com/vp2/chart06.html',checked:'2026-11-01'},
    {id:'town-late-sg',title:'青珠之星：SG 前的採購與入口服務',url:'https://www.seiju.info/vp2/chart/seraphic.html',checked:'2026-11-01'},
    {id:'town-late-world',title:'青珠之星：世界地圖與商店所在區域',url:'https://www.seiju.info/vp2/world.html',checked:'2026-11-01'},
    {id:'town-late-zweapons',title:'ZAPAnet：武器取得條件與衛兵長的誓劍',url:'https://zapanet.info/vp2/63.html',checked:'2026-11-01'},
    {id:'town-late-triace',title:'Tri-Ace Fanboy：城鎮逐戶位置、續篇回報與倒下士兵',url:'https://www.neoseeker.com/valkyrie-profile-2-silmeria/faqs/139776-valkyrie-profile-2-a.html',checked:'2026-11-01'},
    {id:'town-late-enwalk',title:'Neoseeker 原作者流程：礦山續篇回村領 1 個 Metabolizer',url:'https://www.neoseeker.com/valkyrie-profile-2-silmeria/faqs/150966-valkyrie-profile-2-b.html',checked:'2026-11-01'},
    {id:'town-late-asgard-shop',title:'GorillaWiki：阿斯嘉特商人與索羅門指環配方',url:'https://valkyrieprofile2.gorillawiki.jp/entry/22',checked:'2026-11-01'},
    {id:'town-late-gundam-items',title:'Gundam4fun：Items Guide，熟客條件與三種動物指環',url:'https://www.supercheats.com/playstation2/walkthroughs/valkyrieprofile2silmeria-walkthrough09.txt',checked:'2026-11-01'}
  ];
  const events = [];
  function add(id,townId,townName,title,npc,location,chapters,timing,requires,steps,rewards,notes,sourceIds){
    events.push({id,townId,townName,title,npc,location,chapters,timing,requires,steps,rewards,notes,sourceIds});
  }

  [
    ['solde','港町索爾德','貓','教會支路；第五章會移到教會前左側','海鮮肉'],
    ['coriander','科里安德村','雞','旅館以東的街道','骨クズ'],
    ['villnore','維爾諾亞','狗','旅館附近的人行道','骨付き肉'],
    ['crell','克雷爾蒙費蘭','狗','上行支路的空屋右側一帶','骨付き肉']
  ].forEach(([townId,townName,npc,location,food])=>add(
    'town-'+townId+'-feeding-pause-ch4',townId,townName,'第四章：動物暫停接受餵食',npc,location,['ch4'],
    '第四章整章暫停；不應在這一章要求玩家餵滿 15 次。',[],
    ['本章先完成其他城鎮贈禮、委託及採購。','保留 '+food+'，在可餵食的章節接續既有累計紀錄。'],[],
    [townId==='solde'?'貓的四件報酬務必在第五章期限內補齊；第六章已不在城內。':'動物餵食的累計獎勵與「交談領金之卵」是不同事件。'],
    ['town-late-seiju4','town-late-zlimited']
  ));

  add('town-coriander-box-ch4','coriander','科里安德村','第四章限定箱內物：核心翡翠','原先擋住寶箱的居民已離開',
    '由入口行商人處向右的第一棟民宅；初訪時被居民擋住的同一只寶箱',['ch4'],
    '本章開箱為コアエメラルド；留到第五章以後才首次開箱會改成 10 OTH。',[],
    ['進入口附近原本有婦人的民宅。','走到先前無法調查的寶箱，在第四章立即開啟。'],
    [{at:'第四章首次開啟這只箱',item:'コアエメラルド',quantity:1,note:'同一只箱只開一次；不能再領下一章的 10 OTH。'}],
    ['入口後第一棟民宅的位置依既有城鎮逐戶配置；章節內容變更有日文流程交叉確認。'],
    ['town-late-seiju4','town-late-z4']);
  add('town-coriander-box-late','coriander','科里安德村','未開章節變化寶箱：第五章後只剩 10 OTH','原先擋住寶箱的居民已離開',
    '入口附近民宅，同一只第四章可取得核心翡翠的寶箱',['ch5','ch6'],
    '只有第四章沒有開過，現在才能首次開啟；已開過者不會重生。',[],
    ['檢查是否已於第四章取得コアエメラルド。','若仍未開箱，調查同箱取得 10 OTH。'],
    [{at:'第五章起，且此前未開此箱',item:'OTH',quantity:10,note:'與第四章的コアエメラルド互斥。'}],[],
    ['town-late-seiju4','town-late-z5']);

  add('town-coriander-forest-return','coriander','科里安德村','蒼枯之森續篇：接案、討伐與回報','入口附近民宅前的居民',
    '村口向內走一小段，民宅前；回報時找同一位委託人',['ch4','ch5','ch6'],
    '第四章起可接；首領太強可留待第五章後完成。',[],
    ['先完成第三章的蒼枯之森事件。','第四章起回村與民宅前居民交談，確認新魔物消息。','前往蒼枯之森舊首領區，擊敗コボルトキング及 5 名コボルトウォーリアー。','回科里安德村找原委託人交談，另領任務報酬。'],
    [{at:'續篇討伐後，回村交談',item:'識者の経験',quantity:1,note:'英文原作者流程明記回村得到一個 Expert\'s Experience；不是首領部位掉落。'}],
    ['第三章首篇的マイトポーション與本次續篇回報分開；不可將兩筆視作同一獎勵。'],
    ['town-late-seiju4','town-late-z6','town-late-triace']);
  add('town-villnore-mine-return','villnore','維爾諾亞','礦山續篇：封陣器與礦工回禮','酒館附近的礦工／居民',
    '酒館附近街道；續篇委託人在酒館右側、東側出口附近活動',['ch4','ch5','ch6'],
    '第三章トゥルゲン鉱山首篇完成後，第四章起接續篇。',[],
    ['回城找酒館附近居民，取得礦山新魔物的情報。','再次進入トゥルゲン鉱山，擊敗ギガントワスプ。','確認戰後取得緋の封陣器，這會讓可持有的封印石增加 1。','再回維爾諾亞找原委託人交談，領取メタボライザー。'],
    [{at:'續篇ギガントワスプ擊破時',item:'緋の封陣器',quantity:1,note:'一次性固定戰後取得。'},
     {at:'打倒續篇首領後，回城向礦工回報',item:'メタボライザー',quantity:1,note:'英文原作者流程明記 a Metabolizer；與第三章首篇的 10,000 OTH 分開。'}],
    ['首篇女王蜂、續篇巨大蜂、城鎮回禮是三種不同取得時機。'],
    ['town-late-seiju4','town-late-z6','town-late-enwalk']);

  add('town-kalstad-egg-ch4','kalstad','卡爾斯塔德','第四章：與盡頭的雞交談領金之卵','雞',
    '由城鎮入口沿街直走至盡頭；攻略另稱最深處高台的雞',['ch4'],
    '第四章離開前回訪；不需要餵骨クズ。',[],
    ['第四章回卡爾斯塔德。','找入口直走盡頭的雞直接交談，確認取得訊息。'],
    [{at:'第四章該次交談事件',item:'金の卵',quantity:1,note:'與科里安德雞的餵食累計、其他章節金蛋分開記錄。'}],[],
    ['town-late-seiju4','town-late-z4','town-late-column']);
  ['ch5','ch6'].forEach(ch=>add('town-coriander-egg-'+ch,'coriander','科里安德村',
    (ch==='ch5'?'第五章':'第六章')+'：雞的章節金之卵','雞','旅館以東，沿街前進找到的雞',[ch],
    '本章另外交談領取；前一章拿過不代表本章已領。',[],
    ['回科里安德村找雞。','直接交談領章節金蛋；這次取得不要求另餵 15 個骨クズ。'],
    [{at:(ch==='ch5'?'第五章':'第六章')+'交談事件',item:'金の卵',quantity:1,note:'章節贈禮；不是可以靠反覆交談無限取得的庫存。'}],[],
    ch==='ch5'?['town-late-column','town-late-z5','town-late-pluto5']:['town-late-column','town-late-pluto6']));

  [['ch4','第四章','リリィ'],['ch5','第五章','スズラン'],['ch6','第六章','グラジオラス']].forEach(([ch,label,flower])=>add(
    'town-villnore-flower-'+ch,'villnore','維爾諾亞',label+'花販：'+flower,'花販少女',
    '旅館區向右，第一棟民宅之後、酒館之前的街道',[ch],label+'限定販售；章節切換後品項更新。',
    [{item:'OTH',quantity:10,consumed:true,note:'每朵 10 OTH；此列按購買 1 朵記。'}],
    ['在'+label+'回到花販少女處。','支付 10 OTH 購買 1 朵'+flower+'，確認收入配件欄。'],
    [{at:'向少女購買',item:flower,quantity:1,note:'配件效果：最大 HP +10%。'}],
    [flower==='リリィ'?'リリィ另有蒼枯之森トキシックフラワー的 Leader Assault 取得途徑；錯過第四章花販並非永久無法取得。':'目前列示來源將此花列為該章花販限定取得，想收齊請在本章購買。'],
    ['town-late-column','town-late-zlimited',...(ch==='ch5'?['town-late-pluto5']:ch==='ch6'?['town-late-pluto6']:[])]
  ));

  add('town-solde-poem-return-ch4','solde','港町索爾德','第四章返鄉：重讀已變化的詩文','教會左側民宅的書架／詩文',
    '索爾街教會支路最左側，教會左邊的詩文民宅',['ch4','ch5'],
    '三地原詩文讀過後再回訪；此時只是後續提示，第六章才領配件。',[],
    ['確認索爾德、第二章迪潘、克雷爾蒙費蘭三段都已調查。','第四章回索爾德時進同一民宅，再讀變化後的提示。','保留讀取紀錄，第六章再回來搜尋房內右側。'],[],
    ['第二章迪潘的原詩文已無法補讀。Pluto 以「詩 1～4」稱這段流程；其中第 4 次是回到索爾德讀變化的詩，並非第四個城鎮。'],
    ['town-late-z4','town-late-dside','town-late-pluto6']);
  add('town-solde-triemblem-ch6','solde','港町索爾德','第六章：完成詩文支線，搜尋三叉徽章','詩文民宅',
    '索爾街教會左側民宅；先讀左側詩文，再檢查房內右側地面',['ch6'],
    '進入第六章後可用水鏡返回人界；三段原詩文必須都讀過。',[],
    ['用第六章取得的水鏡回到人界。','回索爾德教會左側民宅，確認變化後的詩文。','接著向房內右側搜尋，拾取トライエンブレム。'],
    [{at:'第六章且詩文條件齊備，房內右側拾取',item:'トライエンブレム',quantity:1,note:'只有閱讀提示還不算領取，需查看右側地面。'}],
    ['此物是トライエンブレム原版，與 SG 首領部位的トライエンブレムα／β不同。','第二段只能在第二章原迪潘城下町可進入時調查，缺漏無法在本章補回。'],
    ['town-late-z6','town-late-seiju6','town-late-column','town-late-pluto6']);

  add('town-solde-cat-final-ch5','solde','港町索爾德','第五章：餵貓素材最後補齊與位置變更','貓',
    '第五章移到教會前的左側；先前章節的位置不可直接套用',['ch5'],
    '最穩妥做法：拿到グールパウダー後，第二次前往精靈之森推進事件之前完成；各來源對消失觸發點記載不同。',
    [{item:'海鮮肉',quantity:15,consumed:true,note:'從未餵過時總共 15 個；已餵 n 個則只需補至累計 15，每次消耗 1 個。キセナ草原フライングフィッシュ的尾鰭、奉龍殿ギガントクロウ的腳部可取。'}],
    ['在第五章前段找教會前左側的貓。','核對先前累計次數；每次給 1 個海鮮肉，補到 15 次。','四個門檻各拿一次報酬，保留素材以製作猫の指輪。'],
    [{at:'累計第 1 次',item:'狩られたネズミ',quantity:1,note:'此前已領者不會再重複。'},
     {at:'累計第 5 次',item:'尻尾の切れたトカゲ',quantity:1,note:'與第一章起的餵食累計共用。'},
     {at:'累計第 10 次',item:'不幸な青い鳥',quantity:1,note:'同一累計支線。'},
     {at:'累計第 15 次',item:'ねこのふん',quantity:1,note:'四件各 1 個；之後再餵不會重發這批固定獎品。'}],
    ['期限差異：青珠之星第五章流程寫第二次精靈之森事件後消失；Pluto 記載世界樹後、進瓦爾哈拉宮殿前仍可完成；ZAPAnet 明確記第六章貓已消失。本站以較早時點安排提醒，不能保證較晚仍可補。','第四章整章不能餵，請勿把補齊工作安排在第四章。'],
    ['town-late-seiju5','town-late-pluto5','town-late-zlimited','town-late-dside']);
  add('town-kalstad-donation-last-ch5','kalstad','卡爾斯塔德','第五章：少年捐款在前往宮殿前補齊','捐款少年／牧童',
    '旅館右側民宅旁的上行支路，上去後向左找少年',['ch4','ch5'],
    'Pluto 記載世界樹後、瓦爾哈拉宮殿前須補完；第六章是回報期。',
    [{item:'OTH',quantity:10,consumed:true,note:'每次捐 10；目標光剣クラウソナス需累計 30 次，即 300 OTH；扣除此前已捐部分。'}],
    ['與少年交談，選擇給予 10 OTH。','想領大劍時，累計捐滿 30 次；只領名刀時是 10～29 次。','在第五章後段前完成捐款，第六章再來領回禮。'],[],
    ['0～9 次沒有武器；10～29 次對應名刀五月雨；30 次起對應光剣クラウソナス。兩把按總額擇一，並非同時取得。'],
    ['town-late-pluto5','town-late-column','town-late-dside']);
  add('town-kalstad-boy-reward-ch6','kalstad','卡爾斯塔德','第六章：少年依累計捐款贈劍','先前接受捐款的少年',
    '旅館右側民宅旁支路上去後的左側',['ch6'],
    '先前已有捐款紀錄；本章回去對話領取。',[],
    ['核對之前每次 10 OTH 的累計捐款。','第六章回卡爾斯塔德找同一少年交談。','依總額領其中一把武器；領取後確認裝備欄。'],
    [{at:'累計 10～29 次，即 100～290 OTH',item:'名刀五月雨',quantity:1,note:'條件回禮，與下列大劍擇一。'},
     {at:'累計至少 30 次，即至少 300 OTH',item:'光剣クラウソナス',quantity:1,note:'大劍，ATK 350；不是兩把一併送。'}],
    ['累計 0～9 次，即 0～90 OTH，沒有贈劍。','名刀五月雨另有索爾德熟客商品管道；光剣クラウソナス另可在雷札德之塔寶箱取得。'],
    ['town-late-column','town-late-dside','town-late-pluto6']);

  add('town-dipan-soldier-ch4','dipan-town','迪潘城下町','第四章進城後：倒下士兵的識者經驗','倒下的士兵',
    '從城下町進入迪潘城內後，入口區最左側的倒下士兵；在城內，不在民宅街道',['ch4'],
    '城內推進雙賢者戰之前。',[],
    ['經王家地下道到迪潘，進城後先查看入口區左側。','與倒下士兵對話／調查，確認取得識者の経験。','再往行商人與後續首領方向前進。'],
    [{at:'第四章城內入口左側士兵',item:'識者の経験',quantity:1,note:'英文原作者流程明記 an Expert\'s Experience。'}],
    ['與第五章開頭另可取得的 2 個識者の経験分開。'],
    ['town-late-z4','town-late-seiju4','town-late-triace']);
  add('town-dipan-start-ch5','dipan-town','迪潘城下町','第五章開頭：離城前拾取 2 個識者經驗','第四章結束事件後的取得物',
    '迪潘城內，第四章末事件後／第五章開頭的回程路段；先確認取得物再離城',['ch5'],
    '第五章開始，經王家地下道離開迪潘以前。',[],
    ['第四章末兩場首領事件結束後，沿城內回程檢查兩只寶箱。','離城前確認已取識者の経験共 2 個。'],
    [{at:'第五章開頭，城內回程',item:'識者の経験',quantity:2,note:'青珠之星明列 ×2，Pluto 亦列兩筆。'}],
    ['來源未提供兩個取得點的精確像素或房間坐標；不把它們畫成已核定座標。','ディラン、レザード依離隊等級留下的特殊武器／配件是另一組條件獎勵。'],
    ['town-late-seiju5','town-late-z5','town-late-pluto5','town-late-enwalk']);
  add('town-dipan-captain-ch6','dipan-town','迪潘城下町','第六章返鄉：調查衛兵長遺體取得誓劍','迪潘衛兵長',
    '迪潘城下町處刑台／處刑場附近，倒下的衛兵長遺體',['ch6'],
    '進入第六章後返回迪潘；由喪失之森、王家地下道前往。',[],
    ['用水鏡返回人界，經原地下道路線到迪潘。','到處刑台附近找衛兵長遺體並調查。','確認誓剣オートクレイル已收入大劍欄。'],
    [{at:'第六章，調查處刑台附近衛兵長',item:'誓剣オートクレイル',quantity:1,note:'大劍，ATK 250，雷屬性；不是行商人售賣或寶箱內容。'}],[],
    ['town-late-seiju6','town-late-zweapons','town-late-pluto6']);

  add('town-dipan-merchant-ch4-5','dipan-town','迪潘城下町','第四至第五章：人界行商人移到迪潘','人界行商人',
    '第四章迪潘城內流程向左可遇到；第五章由地下道返抵迪潘時，可在城下町／城入口一帶補給',['ch4','ch5'],
    '章節 4～5 的人界行商人；第三章卡爾斯塔德舊位置不再適用。',[],
    ['第四章進城後，先在行商人處購買裝備與回復品。','第五章回迪潘取グールパウダー時再補給。','第二次精靈之森事件之後，要通過狹間洞窟與比弗雷斯特才能在阿斯嘉特買東西，請在此補足。'],[],
    ['同一行商人的庫存隨劇情變更。商品需要素材時，必須先完成熟客商品條件，再付標價購買。','阿斯嘉特行商人是另一處神界商店，不應把其庫存當作迪潘行商人的常駐商品。'],
    ['town-late-zlimited','town-late-z4','town-late-z5','town-late-pluto5']);
  add('town-coriander-merchant-ch6','coriander','科里安德村','第六章：人界行商人返回科里安德','人界行商人',
    '科里安德村入口一帶；第三章初訪的行商人所在街區',['ch6','sg'],
    '第六章起至結局前，移回科里安德村。',[],
    ['第六章用水鏡返回人界。','到科里安德村入口街區找行商人，查看當前進度的商品表。','想製作特殊商品時，點材料名稱先核對所需數量與取得處，再準備素材。'],[],
    ['位置回到初期村莊不代表商品表退回第三章；庫存與特殊商品條件仍取決於進度。'],
    ['town-late-zlimited','town-late-z6']);
  add('town-asgard-merchant','asgard','阿斯嘉特','神界商人：世界樹、宮殿與 SG 前補給','阿斯嘉特行商人',
    '比弗雷斯特通過後的阿斯嘉特據點；世界樹與瓦爾哈拉宮殿之間的補給區',['ch5','ch6','sg'],
    '第五章初抵阿斯嘉特後可使用；SG 探索前也可回來採購。',[],
    ['抵達阿斯嘉特據點，與行商人交談。','需要破部位組合時，查看瞬弓ブルーゲイル；必定暴擊可配合ボディパッセージ，但其即斷部位機制不適用人型與首領。','依隊伍需要購買マイトポーション、スペルポーション、オーバードライブ、リキュールポーション。','SG 內沒有裝備／道具店，先在這裡補給再出發。'],[],
    ['此列是採購提醒，沒有固定免費報酬，也沒有強制每種購買數量；實際價格與素材請看商店商品列。','神界商人與在迪潘／科里安德移動的人界行商人分開。'],
    ['town-late-seiju5','town-late-sg','town-late-world']);
  add('town-asgard-solomon','asgard','阿斯嘉特','索羅門指環：先做三種動物指環，再向神界商人購買','阿斯嘉特行商人',
    '阿斯嘉特據點的神界商人，查看熟客／特殊商品',['ch5','ch6','sg'],
    '第五章起可到商人處處理；貓的餵食素材須在貓消失前事先收齊。',
    [{item:'猫の指輪',quantity:1,consumed:true,note:'索爾德武器防具店製作；先餵貓海鮮肉共 15 個，四種門檻報酬各 1 個。'},
     {item:'犬の指輪',quantity:1,consumed:true,note:'克雷爾蒙費蘭武器防具店製作；原料來自維爾諾亞狗餵骨付き肉共 15 個，並非克雷爾蒙費蘭另一隻狗。'},
     {item:'鳥の指輪',quantity:1,consumed:true,note:'人界行商人製作；先餵科里安德雞骨クズ共 15 個，四種門檻報酬各 1 個。'},
     {item:'OTH',quantity:900000,consumed:true,note:'索羅門指環的購買價，另加前三枚指環各自的熟客解鎖支出。'}],
    ['先讓索爾德武器店、克雷爾蒙費蘭武器店、人界行商人的累計消費各達 80,000 OTH，顯示相應動物指環的熟客商品名稱。','將對應的四件動物門檻素材各 1 個賣給正確商店，各花 1 OTH 購買猫の指輪、犬の指輪、鳥の指輪。','到阿斯嘉特神界商人處，確認ソロモンの指輪商品名稱已顯示；將三種指環各 1 枚賣給這一位商人。','再支付 900,000 OTH 購買ソロモンの指輪；素材只是解鎖商品，不會自動免費合成。'],
    [{at:'阿斯嘉特特殊商品，材料與熟客條件完成後購買',item:'ソロモンの指輪',quantity:1,note:'三枚動物指環與 900,000 OTH 共同構成這次購買所需。'}],
    ['神界商人的熟客進度與人界行商人分開，不會因人界已花滿而自動滿足；此處不填尚未交叉核定的神界解鎖金額。','想保留動物指環收藏時，還要另備所需素材與購買費用，不能把當作原料賣掉的同一枚視作仍持有。'],
    ['town-late-asgard-shop','town-late-gundam-items','town-late-triace']);
  add('town-sg-music','sg','紅蓮迷宮入口','入口音樂家：付費播放已開放樂曲','音樂家',
    '紅蓮迷宮入口地圖向左走的音樂房；向右才是ディルナ・ハミルトン與迷宮進路',['sg'],
    'SG 開放後；最終首領及結局音樂需下一輪條件。',
    [{item:'OTH',quantity:1000,consumed:true,note:'通常每首 1,000 OTH；觸發價格變更後每首 2,000 OTH。'}],
    ['從 SG 入口向左到音樂房。','與音樂家互動，選擇已開放樂曲並支付該首價格。'],[],
    ['聽過倉鼠戰鬥音樂後再來，音樂家會站到台上，每首價格改為 2,000 OTH。','依 GAME 大寶庫記載，最終首領戰與結局曲在第二輪才開放；這是付費聆聽服務，不發放裝備或消耗品。'],
    ['town-late-dtips','town-late-sg']);

  /* 精確街道關係沿用已核對的原作者逐戶說明，事件頁另列章節條件來源。 */
  events.filter(e=>['solde','coriander','villnore','kalstad','crell'].includes(e.townId)).forEach(e=>{
    if(!e.sourceIds.includes('town-late-triace'))e.sourceIds.push('town-late-triace');
  });
  window.VP_TOWN_LATE={sources,events};
})();
