/* 解放英靈再會：40 名候選人物逐一記錄；互斥候選不代表單一存檔可全數招募。 */
(() => {
  'use strict';
  const sources = [
    {id:'reunion-seiju',title:'青珠之星原作者：40 名英靈、解放條件與三時期贈禮',url:'https://www.seiju.info/vp2/chara/ein.html',checked:'2026-11-01',language:'ja'},
    {id:'reunion-pluto',title:'Pluto 原作者：40 名英靈再會的民宅方位與最終存檔分期',url:'https://www.pluto-dm.com/vp2/get04.html',checked:'2026-11-01',language:'ja'},
    {id:'reunion-pluto-release',title:'Pluto 原作者：解放須達加入時等級加 5、裝備性能與所得數量',url:'https://www.pluto-dm.com/vp2/get03.html',checked:'2026-11-01',language:'ja'},
    {id:'reunion-zapa',title:'ZAPAnet：第三章起再會與逐人贈禮交叉核對（歧異另註）',url:'https://zapanet.info/vp2/97.html',checked:'2026-11-01',language:'ja'},
    {id:'reunion-pluto-party',title:'Pluto 原作者：遺物候選組與招募地點',url:'https://www.pluto-dm.com/vp2/party01.html',checked:'2026-11-01',language:'ja'},
    {id:'reunion-eclesis',title:'Eclesis 原作者英靈專題：解放永久離隊，武器防具帶走但飾品除外',url:'https://gamefaqs.gamespot.com/ps2/931102-valkyrie-profile-2-silmeria/faqs/43867',checked:'2026-11-01',language:'en'},
    {id:'reunion-triace',title:'triAce_Fanboy 原作者：第二章ミトラ再會、逐人贈禮的單件用語',url:'https://www.neoseeker.com/valkyrie-profile-2-silmeria/faqs/139776-valkyrie-profile-2-a.html',checked:'2026-11-01',language:'en'},
    {id:'reunion-gundam',title:'Gundam4fun 原作者 Items Guide：全人物三時段再會與ジェラルド歧異',url:'https://www.supercheats.com/playstation2/walkthroughs/valkyrieprofile2silmeria-walkthrough09.txt',checked:'2026-11-01',language:'en'}
  ];
  const people = window.VP_EQUIPMENT_EXTRA?.einherjar || [];
  const areas = window.VP_LOCATIONS?.areas || [];
  const phaseInfo = {
    early:{label:'第三～四章，第四章結束前',chapters:['ch3','ch4'],condition:'來源把早期時段統稱 C1～C4；一般再會從第三章起列出，但ミトラ已由第二章正文確認可在迪潘城回程領取。仍須實際招募、解放並能回到所在區域。'},
    late:{label:'第五～六章，最終存檔點存檔前',chapters:['ch5','ch6'],condition:'第五章起，直到第六章最終存檔點進行存檔、開放熾天使之門前；不是整個第六章都屬同一獎勵時段。'},
    sg:{label:'最終存檔點存檔、熾天使之門開放後',chapters:['sg'],condition:'第六章最終存檔點存檔後進入第三時段；不需要先擊倒最終首領，也不是下一輪遊戲。'}
  };
  // [人物 ID, 再會區域 ID, 同一區域內位置, [時段, 物品／金額]...]
  // 非金錢的原始再會表未列 ×N；quantity 留 null，不把表中一個名稱猜成已核定一件。
  const records = [
    ['e01','lost-forest','喪失之森出口附近',['early','ミトラの聖水'],['sg','ミトラの聖水']],
    ['e02','coriander','村內右側民宅',['late','ユミルの涙']],
    ['e03','coriander','村內右側民宅',['early',50000]],
    ['e04','coriander','村內右側民宅',['early','識者の経験']],
    ['e05','villnore','城內右側民宅',['early','シルバークラッド']],
    ['e06','villnore','城內右側民宅',['early',50000]],
    ['e07','solde','城內右側民宅',['sg',300000]],
    ['e08','solde','城內右側民宅',['late','無欠の護符']],
    ['e09','crawsus-manor','昏暗妄執之館入口附近',['early',50000]],
    ['e10','crawsus-manor','昏暗妄執之館入口附近',['early','無欠のタリスマン']],
    ['e11','kisena','奇瑟納草原地圖右側入口附近',['early',50000]],
    ['e12','kisena','奇瑟納草原地圖右側入口附近',['early','プリズムジェム'],['sg','聖衣ブリタニアガーブ']],
    ['e13','scavina','斯卡維亞溪谷地圖左側的高低差上方',['early','ノーブルエリクサー']],
    ['e14','solde','教會內'],
    ['e15','solde','教會內',['early','金の卵'],['sg',300000]],
    ['e16','crell','城鎮深處左側民宅',['early',50000]],
    ['e17','crell','城鎮深處左側民宅',['late','アースジェム']],
    ['e18','coriander','村內旅館',['early',50000]],
    ['e19','coriander','村內旅館',['sg','戦乙女のペンダント']],
    ['e20','coriander','村內旅館',['late','アースジェム']],
    ['e21','kalstad','城鎮深處左側民宅',['late',50000]],
    ['e22','kalstad','城鎮深處左側民宅'],
    ['e23','turgen','圖爾根礦山入口附近',['late','オーバードライブ']],
    ['e24','turgen','圖爾根礦山入口附近',['early','オーバードライブ']],
    ['e25','audoula','奧杜拉水上神殿入口',['sg','錬金術の書']],
    ['e26','kalstad','城內右側民宅',['early','クラッドメイル']],
    ['e27','kalstad','城內右側民宅',['late',50000]],
    ['e28','kalstad','城內右側民宅',['early','賢者の秘薬']],
    ['e29','villnore','城內左側民宅',['early','重戦士の知識']],
    ['e30','villnore','城內左側民宅',['sg','識者の経験']],
    ['e31','crell','城內右側民宅',['sg','アースジェム']],
    ['e32','crell','城內右側民宅'],
    ['e33','spirit-forest','精靈之森入口附近',['late','ノーブルエリクサー'],['sg',10]],
    ['e34','spirit-forest','精靈之森入口附近',['late','女神の霊薬']],
    ['e35','ancient-forest','蒼枯之森地圖西北側',['early',50000]],
    ['e36','ancient-forest','蒼枯之森地圖西北側',['late','プリズムジェム']],
    ['e37','ancient-forest','蒼枯之森地圖西北側',['sg','女神の霊薬']],
    ['e38','sahma','薩馬沙漠地圖右側入口附近'],
    ['e39','sahma','薩馬沙漠地圖右側入口附近',['early','プライムエリクサー']],
    ['e40','solde','城鎮深處右側民宅',['late','錬金術の書']]
  ];
  const recruitAreas = {
    A:'lost-forest',B:'royal-path',C:'royal-path',D:'serdberg',E:'serdberg',F:'ancient-forest',G:'audoula',H:'audoula',
    I:'turgen',J:'sahma',K:'surts',L:'surts',M:'crawsus-manor',N:'krosh',O:'krosh',P:'dragoncrypt',Q:'palace',R:'palace',S:'palace',T:'scavina'
  };
  const conflictNotes = {
    e07:['金額歧異：青珠與 Pluto 均列 SG 時段 300,000 OTH，ZAPAnet 解放頁列 30,000 OTH。此處採兩份原作者攻略一致的 300,000，保留異說供查核。'],
    e12:['名稱歧異：青珠再會表寫「プリズムジェル」，Pluto 與遊戲道具表寫「プリズムジェム」。此處用道具表正式名稱，方便點擊查來源。'],
    e26:['名稱歧異：ZAPAnet 解放頁寫「クラッドアーマー」；青珠與 Pluto 再會表均寫「クラッドメイル」，此處採後者。這件防具與クラッド贈送的シルバークラッド武器不同。'],
    e34:['名稱歧異：青珠再會表寫「女神の秘薬」；Pluto 再會表與遊戲道具表寫「女神の霊薬」。此處依道具表使用女神の霊薬。'],
    e36:['名稱歧異：青珠再會表寫「プリズムジェル」，Pluto 與遊戲道具表寫「プリズムジェム」。此處使用プリズムジェム。'],
    e37:['贈禮歧異：青珠與 Pluto 只列 SG 時段的女神系回復道具；ZAPAnet 與 Gundam4fun Items Guide 都另列第四章以前 50,000 OTH。兩組來源不一致，未把早期金錢列為保證報酬；若已招募並解放ジェラルド，可在第四章結束前到蒼枯之森西北側嘗試對話確認。','名稱歧異：青珠寫女神の秘薬，Pluto 與道具表寫女神の霊薬；本頁採正式道具名稱女神の霊薬。']
  };
  const legacyIds={e03:'coriander-reunion-sylphide',e04:'coriander-reunion-richelle',e05:'villnore-reunion-clad',e06:'villnore-reunion-roland',e26:'kalstad-reunion-kirke'};
  // 只有原作者正文明確以單數描述給予一個道具時，才把原表空白件數補成 1。
  const verifiedCounts={
    'e01:early':{quantity:1,sourceIds:['reunion-triace'],note:'原作者第二章回程正文明指交給玩家一個道具，即米特拉聖水；只核定此早期時段，未把相同件數套用 SG。'},
    'e04:early':{quantity:1,sourceIds:['reunion-eclesis'],note:'Eclesis 英靈正文以單數說明リシェル解放後會給一個經驗道具；對照三時段表確定為早期識者の経験。'},
    'e05:early':{quantity:1,sourceIds:['reunion-triace'],note:'原作者維爾諾亞正文明指クラッド給一把 Kraadicator，對應シルバークラッド。'},
    'e10:early':{quantity:1,sourceIds:['reunion-triace'],note:'原作者妄執之館正文以單數明指ウォルター給一個 Foolproof Talisman。'},
    'e12:early':{quantity:1,sourceIds:['reunion-triace'],note:'原作者蒼枯之森正文以單數明指紗紺再會時給一個 Prism Gem。'},
    'e15:early':{quantity:1,sourceIds:['reunion-triace'],note:'原作者水上神殿正文以單數明指フィレス解放後在索爾德教會給一個 Golden Egg。'},
    'e24:early':{quantity:1,sourceIds:['reunion-triace'],note:'原作者火山洞窟人物說明以單數明指ファーラント再會時給一個 Overdrive；本筆採其他三表一致的早期時段。'},
    'e26:early':{quantity:1,sourceIds:['reunion-triace'],note:'原作者森林遺跡正文明指キルケ給一件獨有綠色身體防具 Kraadmail。'},
    'e28:early':{quantity:1,sourceIds:['reunion-triace'],note:'原作者森林遺跡正文以單數明指ラシーカ給一個 Sage’s Arcanum。'}
  };
  function rewardsFor(row) {
    return row.slice(3).map(([phase,value]) => {
      const info=phaseInfo[phase], isMoney=typeof value==='number';
      const chapters=row[0]==='e13'&&phase==='early'?['ch4']:row[0]==='e01'&&phase==='early'?['ch2','ch3','ch4']:info.chapters.slice();
      const count=verifiedCounts[row[0]+':'+phase];
      return {at:row[0]==='e13'&&phase==='early'?'第四章，第四章結束前':row[0]==='e01'&&phase==='early'?'第二～四章，第四章結束前':info.label,
        phase,chapters,item:isMoney?'OTH':value,quantity:isMoney?value:count?.quantity??null,
        quantitySourceIds:count?.sourceIds||[],
        note:isMoney?'原攻略明列金額；前往再會地點對話領取，不需交素材。':count?.note||'原始再會表只列物品名稱，未明列件數；不將未標件數寫成已核定 1 件。'};
    });
  }
  const events=records.map(row => {
    const [characterId,townId,relative]=row;
    const p=people.find(person=>person.id===characterId);
    if(!p)throw new Error('缺少英靈資料：'+characterId);
    const area=areas.find(a=>a.id===townId);
    const group=people.filter(person=>person.group===p.group);
    const rewards=rewardsFor(row);
    const chapters=rewards.length?[...new Set(rewards.flatMap(r=>r.chapters))]:['ch3','ch4','ch5','ch6','sg'];
    const location=(area?.name||p.releaseLocation)+'；'+relative+'。'+(townId==='lost-forest'||townId==='scavina'||townId==='spirit-forest'||townId==='ancient-forest'||townId==='sahma'||townId==='kisena'||townId==='turgen'||townId==='audoula'||townId==='crawsus-manor'?'':'左右為原作者城鎮方位描述；未提供可核對的門牌或像素座標。');
    const recruitment={chapter:p.chapter,areaId:recruitAreas[p.group],areaName:areas.find(a=>a.id===recruitAreas[p.group])?.name||p.location,location:p.location,group:p.group,candidates:group.map(person=>person.jp),mutuallyExclusive:group.length>1};
    const candidateStep=group.length>1
      ?'先在'+p.location+'的 '+p.group+' 組英靈遺物抽到'+p.jp+'。同組候選為'+group.map(person=>person.jp).join('／')+'，同一遺物只加入一人；想指定人選應在調查前存檔。'
      :'先在'+p.location+'調查 '+p.group+' 組英靈遺物，招募'+p.jp+'。';
    const notes=[
      '這是「已招募且已解放」角色才有的條件事件。若本輪抽到同組其他人，此角色不會作為再會 NPC 出現；40 名是全部候選資料，不是單輪可領 40 人報酬。',
      '解放會永久失去該角色與其當時武器、防具，通關也不會使他／她重新加入；飾品會返還，不算入換取能力道具的裝備數值。解放當下依能力／裝備取得的炎石、知識等，與本頁再會贈禮分開計算。',
      '多時段列出贈禮的角色，可在相應時段各領該時段贈禮；同一時段沒有無限領取的證據。部分人物要連續對話數次。',
      ...(!rewards.length?['青珠、Pluto 與 ZAPAnet 都未列此人的再會贈禮；可對話，但不虛構免費武器、素材、金錢或交換需求。']:[]),
      ...(characterId==='e13'?['カノン第三章可招募，但再會地點斯卡維亞溪谷要第四章流程才到達；不把早期 C1～C4 欄誤寫成第三章即可在此領取。']:[]),
      ...(characterId==='e01'?['ミトラ是一般「第三章起再會」說明的已查得例外：triAce_Fanboy 原作者第二章流程明載，迪潘城回程經過喪失之森時，已解放的ミトラ就在這裡並會給聖水。據此本頁從第二章起列出；尚未據此推定第一章可領。']:[]),
      ...(townId==='spirit-forest'?['精靈之森第五章才開放；即使第三章奉龍殿已招募、解放，也不能把再會列在第三或第四章。']:[]),
      ...(conflictNotes[characterId]||[])
    ];
    return {
      id:legacyIds[characterId]||'reunion-'+characterId,kind:'reunion',characterId,townId,townName:area?.name||p.releaseLocation,
      title:p.jp+'：'+(rewards.length?rewards.map(r=>(r.item==='OTH'?r.quantity.toLocaleString()+' OTH':r.item)+'（'+r.at+'）').join('；'):'再會可對話，未列贈禮'),
      npc:p.jp+'（已解放英靈）',location,chapters,
      timing:'先完成第'+p.chapter+'章起的招募，再升到「加入時等級＋5」或以上並解放；'+(characterId==='e01'?'第二章迪潘城回程已可確認再會，其後在目的地可回訪時前往。':'第三章起、世界地圖及目的地可進入時前往再會。')+(rewards.length?'獎勵依下列時段分開；第六章最終存檔前後會換表。':'此人三個時段都沒有已核定贈禮。'),
      requires:[],recruitment,
      conditions:['本人已加入','本人已達加入時等級＋5或以上','本人已解放','再會地點已開放且可回訪','處於相應贈禮時段'],
      steps:[candidateStep,'育成到「本次加入時等級＋5」或以上，先確認將被帶走的武器、防具，再執行英靈解放；飾品會返還。不是所有人只要練到 Lv.5 就能解放。','前往'+location+'與'+p.jp+'交談；若只有普通台詞，可再交談數次。',rewards.length?'核對下列贈禮時段後領取；後期再訪的贈禮不會倒推補發錯過的早期贈禮。':'與本人對話即可；現有三份來源均未列可領物品，不必準備或交出任何素材。'],
      rewards,notes,sourceIds:sources.map(s=>s.id)
    };
  });
  const corrections=events.map(e=>({
    characterId:e.characterId,releaseLocation:e.location,
    releaseGifts:e.rewards.map(r=>({period:r.at,item:r.item==='OTH'?r.quantity+' OTH':r.item,quantity:r.quantity,quantitySourceIds:r.quantitySourceIds,phase:r.phase,chapters:r.chapters,note:r.note})),
    note:(conflictNotes[e.characterId]||[]).join(' '),sourceIds:e.sourceIds.slice()
  }));
  window.VP_REUNIONS={sources,events,corrections,periods:phaseInfo,
    supersedes:['coriander-reunion-richelle','coriander-reunion-sylphide','villnore-reunion-clad','villnore-reunion-roland','kalstad-reunion-kirke'],
    coverage:{candidateCharacters:40,hasGift:36,noGift:4,singleRunMaximum:20,verifiedQuantityRows:21,unknownQuantityRows:19,
      note:'20 個遺物組各加入 1 人；40 名候選互斥，不能在單輪取得所有人的再會報酬。'}
  };
})();
