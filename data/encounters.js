/* 區域與造訪階段對照。名單逐區核對原始攻略表，不以地名包含關係推算樓層。 */
(() => {
  'use strict';
  const M = window.VP_MONSTERS || [];
  const stages = (window.VP_WALKTHROUGH?.chapters || []).flatMap(c => c.stages);
  const ids = numbers => numbers.map(n => 'm' + String(n).padStart(3, '0'));
  const range = (a,b) => Array.from({length:b-a+1},(_,i)=>a+i);
  const sources = [
    {id:'enc-ch1',title:'青珠之星：第 1、2 章區域敵人、部位素材表',url:'https://www.seiju.info/vp2/chart/chart1.html'},
    {id:'enc-ch3',title:'青珠之星：第 3 章各迷宮敵人、部位素材表',url:'https://www.seiju.info/vp2/chart/chart2.html'},
    {id:'enc-ch4',title:'青珠之星：第 4 章再訪敵人與新增首領',url:'https://www.seiju.info/vp2/chart/chart3.html'},
    {id:'enc-ch5',title:'青珠之星：第 5 章區域敵人、部位素材表',url:'https://www.seiju.info/vp2/chart/chart4.html'},
    {id:'enc-ch6',title:'青珠之星：雷札德之塔各層敵人、部位素材表',url:'https://www.seiju.info/vp2/chart/chart5.html'},
    {id:'enc-sg',title:'青珠之星：熾天使之門各層、稀有遭遇及犬小屋',url:'https://www.seiju.info/vp2/chart/seraphic.html'},
    {id:'enc-tower-rare',title:'Raye Penber：雷札德之塔四層稀有敵人',url:'https://rayepenber.nusutto.jp/valkyrieprofile/map/lezard.html'},
    {id:'enc-chulip',title:'chulip.org：各區域與 SG 樓層敵人名單交叉核對',url:'https://chulip.org/entry/2009/03/14/000000'},
    {id:'enc-boss-repeat',title:'ZAPAnet：首領再戰可否與部位掉落',url:'https://zapanet.info/vp2/108.html'}
  ];
  const defs = [];
  function add(id, ordinary, bosses, note, sourceId, extra={}) {
    const stage = stages.find(s=>s.id===id);
    if (!stage) throw new Error('Unknown walkthrough stage: '+id);
    defs.push({id,stageIds:[id],name:stage.name,jp:stage.jp,aliases:[],monsterIds:ids(ordinary),bossIds:ids(bosses),note,sourceIds:[sourceId,...(stage.sourceIds||[])],...extra});
  }
  const townNote='城鎮／整備區，沒有通常敵人符號；此區的固定道具、商店及對話事件請看地圖與寶物清單。';
  add('solde',[],[],townNote,'enc-ch1',{peaceful:true});
  add('lost-forest',[1,2,3],[],'前期可反覆採集骨類與肉類；後續章節經此處通行時，勿套用王家地下道再訪後的新敵表。','enc-ch1');
  add('royal-path',[1,2,3,4,5],[6],'首次進入的配置。彈射犀牛擊破後，可在原處調查並選「奥へ行く」再戰；第四章的地下道新敵表另列。','enc-ch1',{encounterNotes:{m006:'可再戰首領；擊破處調查「奥へ行く」'}});
  add('dipan-town',[],[],townNote+' 第四章的雙賢者與王座戰另列為獨立流程。','enc-ch1',{peaceful:true});
  add('dipan-castle',[1,4,5,7,8],[9],'第二章初訪配置。混沌黏怪是劇情首領；第五章地下敵表與此處不同。','enc-ch1');
  add('kisena',[3,4,7,8,10,11],[],'通常敵人，可在主線允許通行時重訪採集。飛魚的海鮮肉可用於索爾德餵貓支線。','enc-ch1');
  add('coriander',[],[],townNote,'enc-ch3',{peaceful:true});
  add('serdberg',range(12,19),[20,21,22],'雙足飛龍由上半與下半組成；ワイバーン、アッパーリザード是全體／上半的稱呼，並非另外三場首領戰。','enc-ch3',{encounterNotes:{m020:'複合首領總稱',m021:'上半部位／分離後名稱',m022:'下半部位／分離後名稱'}});
  add('ancient-forest',[12,16,17,19,23,24,25,26],[27],'首次討伐的首領為獅鷲；狗頭人王與戰士隨從是第四章起委託續篇，未混入本次名單。','enc-ch3');
  add('villnore',[],[],townNote,'enc-ch3',{peaceful:true});
  add('audoula',[30,37,38,39,40,41],[42],'克拉肯是本次流程首領；巨蟹等通常敵人的部位素材可在可重訪時採集。','enc-ch3');
  add('turgen',[30,31,32,33],[34],'首次委託首領為黃蜂女王；隕星蜂群與巨型黃蜂屬第四章起的續篇。女王尾部素材應在本次擊破前回收。','enc-ch3');
  add('kalstad',[],[],townNote,'enc-ch3',{peaceful:true});
  add('sahma',[43,44,45],[],'此區沒有獨立流程首領；大型敵符號仍可能比通常敵人強。','enc-ch3');
  add('surts',[45,46,47,48,49,50,51],[52,53],'艾沃爾布分兩戰，第二戰不是可在地圖反覆遇見的另一種通常敵人。','enc-ch3');
  add('crell',[],[],townNote,'enc-ch3',{peaceful:true});
  add('crawsus-manor',range(54,60),[61,62],'克蕾奧女士為迷宮首領；狂戰士為館內大型／強敵，另列提醒，並非額外一次性劇情首領。','enc-ch3',{encounterNotes:{m061:'館內大型強敵',m062:'委託首領'}});
  add('krosh',range(63,73),[74],'九頭蛇為流程首領。巨型、龍類等通常敵符號仍需依封印石效果判斷難度。','enc-ch3');
  add('dragoncrypt',[75,76],[],'前往奉龍殿的通路，沒有獨立劇情首領。','enc-ch3');
  add('palace-sun',range(77,85),[],'本表是整座奉龍殿通常敵人名單；原始資料未逐房劃分遭遇，不能視為本半區每一房都會遇到全部敵人。殭屍龍位於後半流程。','enc-ch3',{rosterScope:'dungeon',rosterScopeLabel:'奉龍殿全區名單'});
  add('palace-moon',range(77,85),[86],'通常敵人採奉龍殿全區表，非逐房保證遭遇；殭屍龍與最後劇情事件位於後半。殭屍龍可再戰，陽月離隊事件則須先確認角色等級。','enc-ch3',{rosterScope:'dungeon',rosterScopeLabel:'奉龍殿全區名單'});
  add('scavina',[87,88,89],[],'通常通路敵人；冰惡魔具有炎耐性，不能將所有冰系外觀敵人一律當作弱火。','enc-ch4');
  add('forest-return',[12,16,17,19,23,24,25,26],[28,29],'第四章起先在科里安德接續篇。普通敵人與初訪相同；新增戰鬥為狗頭人王與狗頭人戰士 ×5，獅鷲不會因再訪而重生。','enc-ch4',{encounterNotes:{m028:'狗頭人王戰隨從 ×5',m029:'續篇委託首領'}});
  add('mine-return',[30,31,32,33],[35,36],'第四章起在維爾諾亞接續篇。通常敵人不變，新增巨型黃蜂與隕星蜂群；女王蜂沒有隨普通重訪一起重生。','enc-ch4',{encounterNotes:{m035:'續篇首領隨從；領袖獎勵與地下道配置不同',m036:'續篇委託首領'}});
  add('royal-return',[1,2,3,35,90,91,92,93],[94,95],'第四章路線包含喪失之森原有 3 種敵人與王家地下道更換後的敵人。烏爾與護衛兵為出口事件戰，不沿用首次地下道敵表。','enc-ch4',{encounterNotes:{m001:'喪失之森通路',m002:'喪失之森通路',m003:'喪失之森通路',m094:'烏爾事件戰隨從',m095:'本次劇情首領'}});
  add('dipan-mages',[],[96,97],'第四章雙賢者一次性事件戰；此處只顯示本篇的氷衣クリスタルガーブ、デルージュセプター，SG 稀有再現的エーテルクラウン另列第五層。','enc-ch4');
  add('dipan-hrist',[],[98,99],'第四章王座事件戰。亞莉與亞琉哲為同一場敵方組合；離隊等級與贈禮請在觸發前確認。','enc-ch4');
  const spirit=[28,...range(100,109)];
  add('spirit-forest',spirit,[110],'精靈之森第一次探索：亞雷克塔利斯是本次首領。狗頭人戰士在這裡屬通常遭遇，不沿用蒼枯續篇的隨從分類；巡邏班強制戰在回訪流程。','enc-ch5');
  add('dipan-powder',[112,113,114,115],[],'第五章迪潘地下取粉末的配置。紳士為稀有敵人；不會再次觸發第二章混沌黏怪或第四章雙賢者。','enc-ch5',{encounterNotes:{m114:'稀有遭遇'}});
  add('spirit-return',spirit,[111],'取回粉末後再訪。通常敵人保持森林配置；深處強制戰為亞斯神族巡邏班 ×4，亞雷克塔利斯不會因回訪重生。','enc-ch5',{encounterNotes:{m111:'強制事件戰 ×4'}});
  add('ravine-caverns',[106,109,111,114,115,116,117,118],[],'巡邏班與射擊班在洞窟列為通常／固定遭遇；恐龍王為持封印石的大型敵符號，須先處理封印石才能接戰。八分鐘逃離期間可先通過，後續再回收。','enc-ch5',{encounterNotes:{m114:'稀有遭遇',m118:'持封印石大型符號'}});
  add('bifrost',[],[94,119,120,121],'連續事件戰：救護班與護衛兵 → 次元魔物 → 海姆達爾與護衛兵。沒有供反覆刷怪的通常敵人符號。','enc-ch5',{encounterNotes:{m094:'事件戰護衛兵',m119:'首場救護班',m120:'第二場首領',m121:'第三場首領'}});
  add('asgard',[],[],townNote,'enc-ch5',{peaceful:true});
  add('yggdrasil',range(122,137),[138,139],'奧丁有前後事件戰，之後另有白龍。通常敵表屬整座世界樹；巨型食蟲、龍與大型敵符號並非額外劇情首領。','enc-ch5');
  add('valhalla',range(140,148),[149],'芙蕾是劇情強制戰；通常符號可依主線開放狀態重訪。紅龍的聖剣アスカロン是後續採集準備之一。','enc-ch5');
  add('tower-1',[150,151,152,153,155,156],[],'第一層專屬名單。輕惡魔與巨型巨魔為大型固定符號；不要把第二至第四層敵人混入第一層。','enc-ch6',{encounterNotes:{m155:'台座前大型符號',m156:'第二層入口前大型符號'}});
  add('tower-2',[150,152,153,154,157,158,159,160,162,163],[],'第二層專屬名單。不潔者、吸血鬼王、王蝙蝠為本層大型／固定配置；吸血鬼王的ヴァンパイアソード屬低機率擊破掉落。','enc-ch6',{encounterNotes:{m160:'台座前大型符號',m163:'通往第三層前固定強敵'}});
  add('tower-3',[151,152,153,157,161,164,165,168],[],'第三層專屬名單。城堡加農砲是大型符號；進入第四層立即接人造人戰，先做好回復。','enc-ch6',{encounterNotes:{m168:'台座前大型符號'}});
  const tower4=[152,157,158,159,164,165,170];
  add('tower-homunculi',tower4,[166,167],'第四層入口人造人雙戰；下列通常敵人為第四層全區名單，並非人造人戰追加隨從。火焰九頭蛇為本層稀有遭遇。','enc-ch6',{encounterNotes:{m170:'第四層稀有符號'},sourceIds:['enc-ch6','enc-tower-rare',...stages.find(s=>s.id==='tower-homunculi').sourceIds]});
  add('tower-lezard',tower4,[169],'第四層普通敵人沿用本層名單；雷札德為存檔點後的劇情首領。火焰九頭蛇是稀有遭遇，並非此戰隨從。','enc-ch6',{encounterNotes:{m170:'第四層稀有符號'},sourceIds:['enc-ch6','enc-tower-rare',...stages.find(s=>s.id==='tower-lezard').sourceIds]});
  add('sealed-crystal',[],[171],'最終連戰前半僅列本場敵人。封印晶石為事件目標，沒有獨立魔物資料列；不把整塔通常敵人當作本場隨從。','enc-ch6');
  add('final-boss',[],[172],'最終連戰後半單一首領。本篇沒有結局後通常存檔；部位回復道具是戰中補給，不是能帶回世界地圖的通關農場。','enc-ch6');
  add('sg-entry',[],[173],'首次進門守門戰。認真模式迪爾娜與半影屬女王擊破後的入口事件，另見周回段落。','enc-sg');
  add('sg-1',range(174,179),[180],'第一層確實記載的通常敵人與守層首領。入口迪爾娜、認真模式與本篇雷札德之塔敵人不列入此層普通遭遇。','enc-sg');
  add('sg-2',[183,184,185,186,187,188,189,190,191,192,193,194,195,196],[197],'第二層含稀有符號與犬小屋事件 (1)、(2)。蒼白克拉肯是稀有敵人，沃坦才是守層首領；稀有敵須切換地圖重新抽選。','enc-sg',{encounterNotes:{m189:'蟲型稀有；首領前右側符號較易找',m194:'人型稀有；大房間符號',m195:'人型稀有；大房間符號',m196:'蟲型稀有；首領前左側符號較易找',m191:'犬小屋 (1) 事件',m192:'犬小屋 (1) 事件',m193:'犬小屋 (2) 事件'}});
  add('sg-3',[191,192,193,...range(198,208),239],[209],'第三層含犬小屋事件 (3)、(4) 與完成前 9 個劇場後才開放的 (10)。人造亞莉與人造複製體是稀有敵；人造希爾梅莉亞／雷札德是本篇塔首領，沒有混入此層。','enc-sg',{encounterNotes:{m202:'人型稀有；有鏡子的房間',m203:'大型稀有另有較高 HP 變體',m204:'人型稀有；鏡房之外',m205:'浮遊／蟲型稀有',m191:'犬小屋事件',m192:'犬小屋事件',m193:'犬小屋事件',m206:'犬小屋 (3) 事件',m207:'犬小屋 (3)、(4) 事件',m208:'犬小屋 (4) 事件',m239:'犬小屋 (10)；先完成全部 9 個劇場'}});
  add('sg-4',[...range(210,221),191,193,207,208,238],[222],'第四層含稀有敵、倉鼠事件與犬小屋 (5)–(7)。回歸的亞雷克塔利斯、黑暗苦痛、提亞馬特與背包客都有符號／房間條件；不套用本篇同外觀敵人的掉落。','enc-sg',{encounterNotes:{m191:'犬小屋 (7) 事件',m193:'犬小屋 (7) 事件',m207:'犬小屋 (5) 事件',m208:'犬小屋 (6) 事件',m216:'犬小屋 (6) 事件',m217:'浮遊型稀有；寶箱 46 的敵符號',m218:'蟲型稀有；寶箱 51 房間',m219:'蟲型稀有；寶箱 51 房間',m220:'調查 ★13 旁空箱後追逐符號',m221:'倉鼠符號的稀有遭遇',m238:'人型稀有；寶箱 55 旁'}});
  add('sg-5',[96,97,191,192,193,206,207,...range(223,231)],[232],'第五層含犬小屋 (8)、(9)，以及前 9 劇場完成後回第三層開放的 (10)。雙賢者為靈型稀有，僅此配置掉以太王冠；上半蜥龍與神秘蜥龍是分離／整體稱呼。','enc-sg',{encounterNotes:{m096:'靈型稀有；寶箱 58 房間一帶',m097:'靈型稀有；寶箱 58 房間一帶',m191:'犬小屋 (8) 事件',m192:'部分來源列於本層；犬小屋事件型',m193:'犬小屋 (9) 事件',m206:'犬小屋 (9) 事件',m207:'犬小屋 (9) 事件',m223:'犬小屋 (8) 事件',m224:'犬小屋 (8) 事件',m228:'複合敵人總稱',m229:'上半部位／分離後名稱',m230:'下半部位／分離後名稱',m231:'寶箱 57 房間大型符號'}});
  add('sg-dogs',[191,192,193,206,207,208,216,223,224,239],[],'這是事件總索引，不是額外的地圖。犬小屋 1–2 在第二層，3–4 在第三層，5–7 在第四層，8–9 在第五層；完成前 9 個後回第三層開放第 10 個犬雷札德戰。每件素材仍需破壞對應部位。','enc-sg',{rosterScope:'events',rosterScopeLabel:'跨樓層劇場總表',encounterNotes:{m239:'第三層犬小屋 (10)；前 9 個完成後'}});
  add('sg-repeat',[],[181,182],'女王後返回入口，與認真模式迪爾娜及半影 ×3 交戰；後續提高 SG 輪次，敵人數值改變。此處沒有新增普通野怪名單。','enc-sg',{encounterNotes:{m181:'認真模式戰隨從 ×3',m182:'女王後入口事件首領'}});

  // Explicit replay states are taken from the boss roster; absence does not mean "not replayable".
  const repeatable={m006:'可再戰；擊破處選「奥へ行く」',m020:'可再戰；複合首領總稱',m021:'可再戰；雙足飛龍分離後上半',m022:'可再戰；雙足飛龍分離後下半',m042:'可再戰首領',m052:'首戰階段；再戰僅出現第二戰形態',m053:'可再戰；第二戰形態',m074:'可再戰；適合回收尾部代謝器',m086:'可再戰首領'};
  const once={m009:'不可再戰劇情首領',m027:'不可再戰委託首領',m029:'不可再戰續篇首領',m034:'不可再戰委託首領；先回收尾部',m036:'不可再戰續篇首領'};
  for(const region of defs) {
    for(const monsterId of region.bossIds) {
      const replay=repeatable[monsterId]||once[monsterId];
      if(!replay) continue;
      region.encounterNotes ||= {};
      region.encounterNotes[monsterId]=[region.encounterNotes[monsterId],replay].filter(Boolean).join('；');
      if(!region.sourceIds.includes('enc-boss-repeat')) region.sourceIds.push('enc-boss-repeat');
    }
  }

  // Correct known context leakage from older source-table parsing. Do not infer SG appearances
  // merely because the chapter-6 article mentions the optional dungeon near its final save point.
  const areaCorrections=M.filter(m=>Number(m.id.slice(1))>=150&&Number(m.id.slice(1))<=172)
    .map(m=>({monsterId:m.id,removeAreas:m.area.filter(a=>/熾天使|セラフィック/.test(a)),note:'本篇塔敵表與 SG 各層名單交叉核對；原 SG 區域標籤為章節上下文誤併。',sourceIds:['enc-ch6','enc-sg','enc-chulip']}))
    .filter(c=>c.removeAreas.length);
  areaCorrections.push({monsterId:'m239',removeAreas:['熾天使之門・第5層'],addAreas:['熾天使之門・第3層'],note:'犬雷札德第 10 劇場位於第三層；完成前 9 劇場後返回，並非第五層地點。',sourceIds:['enc-sg']});
  areaCorrections.push({monsterId:'m191',removeAreas:[],addAreas:['熾天使之門・第5層'],note:'青珠的第五層犬小屋 (8) 事件明列犬亞莉莎；補上原名單遺漏樓層。',sourceIds:['enc-sg']});
  const byId=new Map(M.map(m=>[m.id,m]));
  // These are confirmed encounter-context differences in a shared bestiary record.
  function allowedDrop(region,monster,drop) {
    if(monster.id==='m096') return region.id.startsWith('sg-') ? drop.item==='エーテルクラウン' : drop.item==='氷衣クリスタルガーブ';
    if(monster.id==='m097') return region.id.startsWith('sg-') ? drop.item==='エーテルクラウン' : drop.item==='デルージュセプター';
    if(monster.id==='m035' && region.id==='mine-return' && /領袖|Assault/i.test(drop.kind)) return false;
    if(monster.id==='m028' && region.id==='forest-return' && /秘薬|ユニオンプラム/.test(drop.item)) return false;
    return true;
  }
  function normaliseDrop(drop) {
    const d={...drop};
    d.item=d.item.replace(/^\(アッパーリザードから\)/,'');
    if(d.item==='羅針盤 (ロウアーリザードから)竜赤胆') return null; // Two unrelated cells concatenated by the old import.
    d.part=d.part.replace('頭部部','頭部').replace('胴身體部','胴體').replace('胴身體','胴體');
    if(d.part==='後足)竜赤胆(尾部') d.part='後足';
    return d;
  }
  const regionDrops={};
  for(const region of defs) {
    const seen=new Set();
    regionDrops[region.id]=[...region.monsterIds,...region.bossIds].flatMap(monsterId=>{
      const monster=byId.get(monsterId);
      if(!monster) throw new Error('Unknown regional monster: '+monsterId);
      return monster.drops.filter(d=>allowedDrop(region,monster,d)).map(normaliseDrop).filter(Boolean).map(d=>{
        const event=region.bossIds.includes(monsterId);
        const eventCondition=region.id.startsWith('sg-')?'此階段守層／入口事件戰；可否重戰依 SG 進度':'本篇首領／事件戰；擊破前回收部位';
        const row={item:d.item,monsterId,part:d.part||'未標示',kind:d.kind||'來源未細分',rate:d.rate??null,quantity:d.quantity??null,condition:region.encounterNotes?.[monsterId]||(event?eventCondition:'此區通常遭遇'),sourceIds:monster.sourceIds||[]};
        const key=JSON.stringify([row.monsterId,row.item,row.part,row.kind,row.rate,row.quantity,row.condition]);
        if(seen.has(key)) return null;
        seen.add(key);return row;
      }).filter(Boolean);
    });
    region.dropCount=regionDrops[region.id].length;
  }
  window.VP_ENCOUNTERS={regions:defs,sources,areaCorrections,meta:{checked:'2026-11-01',stageCount:defs.length,policy:'地區名單依章節、再訪與樓層分開；掉落種類／部位的不同記載保留，不將領袖獎勵等同每次擊殺掉落。',dropNotice:'掉落表承接已附來源的魔物資料；未標示部位／機率即代表來源未提供。相同道具不同部位、領袖獎勵與擊破條件分別列出。',nameNotice:'中譯為本站編輯譯名；日文原名方便對照遊戲。'}};
  window.VP_REGION_DROPS=regionDrops;
})();
