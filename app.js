(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const plain = v => v == null ? '' : typeof v === 'object' ? (Array.isArray(v) ? v.map(plain).join('、') : Object.entries(v).map(([k,x]) => `${({name:'名稱',item:'道具',quantity:'數量',period:'時期',chapter:'章節',value:'數值',context:'情境',level:'等級',effect:'效果',part:'部位',rate:'機率',kind:'分類'})[k]||k}：${plain(x)}`).join('；')) : String(v);
  const show = v => v == null || v === '' ? '未載明' : esc(plain(v));
  const num = v => v == null || v === '' ? '—' : typeof v === 'number' ? v.toLocaleString('zh-TW') : esc(v);
  const W = window.VP_WALKTHROUGH || {chapters:[],missables:[],sources:[]};
  const M = window.VP_MONSTERS || [];
  const A = window.VP_WEAPONS || [];
  const X = {...(window.VP_EQUIPMENT_EXTRA || {}),...(window.VP_ITEMS_EXTRA || {})};
  X.sources = [...(window.VP_EQUIPMENT_EXTRA?.sources||[]),...(window.VP_ITEMS_EXTRA?.sources||[])];
  const R = window.VP_REFERENCE || {systems:[],sources:[]};
  const L = window.VP_LOCATIONS || {areas:[],sources:[]};
  const E = window.VP_ENCOUNTERS || {regions:[],sources:[]};
  const T = {events:[...(window.VP_TOWN_EARLY?.events||[]),...(window.VP_TOWN_LATE?.events||[])],sources:[...(window.VP_TOWN_EARLY?.sources||[]),...(window.VP_TOWN_LATE?.sources||[])]};
  const C = window.VP_CRAFTING || {sources:[],merchants:[]};
  X.shops=[...(X.shops||[]),...(C.extraInventory||[]),...(C.extraRecipes||[])].map(row=>{
    const patch=(C.recipeCorrections||[]).find(p=>p.shopId===row.id);if(!patch)return row;
    const {shopId,note,sourceIds,...fields}=patch;
    return {...row,...fields,notes:[...new Set([row.notes,fields.notes,note].filter(Boolean))].join('；'),sourceIds:[...new Set([...(row.sourceIds||[]),...(sourceIds||[])])]};
  });
  const chapters = W.chapters || [];
  const stages = chapters.flatMap(c => (c.stages || []).map(s => ({...s,chapterId:c.id,chapterTitle:c.title})));
  const sourceList = [...(W.sources||[]),...(window.VP_MONSTER_SOURCES||[]),...(X.sources||[]),...(R.sources||[]),...(L.sources||[]),...(E.sources||[]),...T.sources,...(C.sources||[]),...(window.VP_CRAFTING_ACQUISITION?.sources||[])];
  const sources = new Map(sourceList.map(s => [s.id,s]));
  const uniqueSources = [...new Map(sourceList.map(s => [s.url,s])).values()];
  const paths = {
    compass:'<circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6 6-2Z"/>',
    book:'<path d="M3 4h6a4 4 0 0 1 3 1 4 4 0 0 1 3-1h6v16h-6a4 4 0 0 0-3 1 4 4 0 0 0-3-1H3V4Zm9 1v16"/>',
    map:'<path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2V5Zm6-2v16m6-14v16"/>',
    dragon:'<path d="m3 18 3-4-1-5 4 2 3-7 2 5 5-3-1 5 4 2-6 2-2 5-4-2-3 3H3m9-8 3-1m0 4 3 3M5 9 2 5l7 3m3-4 1-3"/>',
    beast:'<path d="m6 8-2-5 6 4h4l6-4-2 5 2 5-3 7H7l-3-7 2-5Zm2 5h1m6 0h1m-6 4 2 1 2-1m-2 1v3"/>',
    bird:'<path d="m12 15-3 6 1-8-7-2-2-7 8 5 3 2 3-2 8-5-2 7-7 2 1 8-3-6Zm-1-5 1-5 3 4-3 2"/>',
    insect:'<path d="M9 9a3 3 0 0 1 6 0v8a3 3 0 0 1-6 0V9Zm3-6v3M7 5l2 3m8-3-2 3M4 9l5 3m11-3-5 3M3 16l6-1m12 1-6-1M5 21l4-3m10 3-4-3m-3-6v9"/>',
    plant:'<path d="M12 22V11m0 6C3 18 2 13 2 9c6 0 10 2 10 8Zm0-4C12 5 18 2 22 2c0 7-3 11-10 11Zm-2-4C3 8 5 2 6 1c5 3 5 5 4 8Z"/>',
    undead:'<path d="M5 11a7 7 0 1 1 14 0v5l-3 1v4H8v-4l-3-1v-5Zm3 0h2v2H8Zm6 0h2v2h-2Zm-3 5 1-2 1 2m-3 2v3m4-3v3"/>',
    ghost:'<path d="M5 21V10a7 7 0 0 1 14 0v11l-4-3-3 3-3-3-4 3Zm4-11h1m4 0h1m-4 4h2"/>',
    humanoid:'<circle cx="12" cy="5" r="3"/><path d="m5 13 7-4 7 4m-7-4v8m-5 5 5-5 5 5M3 10v10m-2-4h4"/>',
    fish:'<path d="M4 12c4-7 10-7 14-2l5-4v12l-5-4c-4 5-10 5-14-2Zm0 0H1m11-5 3-4 1 6m-4 8 3 4 1-6M8 10h.1"/>',
    magic:'<path d="m12 2 3 6 7 1-5 5 1 8-6-4-6 4 1-8-5-5 7-1 3-6Z"/>',
    sword:'<path d="m4 20 5-5m-3-3 6 6m-4-4L18 3l3 0v3L10 16m-7 5 2-2"/>',
    greatsword:'<path d="m4 21 5-6m-4-4 8 8m-5-5L17 2l5 0-1 5L10 17M3 19l2 3"/>',
    bow:'<path d="M5 2c17 1 17 19 0 20L14 12 5 2Zm-3 10h19m-3-3 3 3-3 3"/>',
    staff:'<path d="M6 22 16 8m0 0c-5 0-5-7 0-7 6 0 6 8 0 7Zm0-4h.1M5 17l4 3"/>',
    spear:'<path d="M3 22 17 7m-2-1 4-5 4 0-1 5-5 3-2-3Z"/>',
    fist:'<path d="M6 12V6a2 2 0 0 1 4 0v5-7a2 2 0 0 1 4 0v7-6a2 2 0 0 1 4 0v7-3a2 2 0 0 1 4 0v6l-5 7H9L3 13c-2-3 1-5 3-1Z"/>',
    rune:'<path d="m12 2 9 10-9 10L3 12 12 2Zm0 5v10m-4-7 4 3 4-3"/>',
    gate:'<path d="M4 22V11a8 8 0 0 1 16 0v11M8 22V11a4 4 0 0 1 8 0v11M1 22h22M4 10h4m8 0h4M7 4l3 4m7-4-3 4"/>',
    check:'<path d="M19 12v8H4V4h11m-6 7 4 4L22 4"/>',
    search:'<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/>',
    print:'<path d="M6 8V2h12v6M6 17H3V8h18v9h-3M6 14h12v8H6v-8Zm11-3h1"/>',
    shield:'<path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Zm0 4v12"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.1"/>'
  };
  const icon = name => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.magic}</svg>`;
  const fillIcons = root => $$('[data-icon]',root || document).forEach(e => {e.innerHTML=icon(e.dataset.icon);});
  let progress;
  try{progress=JSON.parse(localStorage.getItem('vp2-guide-progress') || '{}');if(!progress||typeof progress!=='object'||Array.isArray(progress))progress={};}catch{progress={};}
  const saveProgress = () => {try{localStorage.setItem('vp2-guide-progress',JSON.stringify(progress));}catch{toast('瀏覽器未允許儲存，請使用匯出進度備份。');}};
  const toast = message => {const e=$('#toast');e.textContent=message;e.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>e.classList.remove('show'),3000);};
  const srcLinks = ids => `<div class="source-links">${[...new Set(ids || [])].map(id=>{const s=sources.get(id);return s?`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a>`:'';}).join('')}</div>`;
  const pageHead = (label,title,description) => `<div class="page-head"><div class="eyebrow">${esc(label)}</div><h1>${esc(title)}</h1><p>${esc(description)}</p></div>`;
  const titleOf = r => r.name || r.title || r.jp || r.en || '未命名';
  const searchText = r => plain(r).toLocaleLowerCase();
  const typeOf = m => plain(m.type || m.race || m.kind || '未分類');
  const areaOf = m => plain(m.area || m.areas || m.locations || '未載明區域');
  const monsterIcon = m => {if(paths[m.icon]) return m.icon;const t=plain([m.icon,m.type,m.jp,m.name,m.en]);if(/ドラゴン|リザード|ワイバーン|ヒドラ|龍|竜|dragon|scale/i.test(t))return 'dragon';if(/鳥|翼|ホーク|バード|飛|bird|bat|蝙|コウモリ/i.test(t))return 'bird';if(/蟲|昆虫|蟻|蜂|インセクト|スカラベ|ワスプ|ビートル|insect/i.test(t))return 'insect';if(/不死|骸|アンホーリ|ゾンビ|スケルトン|undead/i.test(t))return 'undead';if(/ゴースト|霊|幽|ghost/i.test(t))return 'ghost';if(/プラント|植物|フラワー|ローパー|花|plant/i.test(t))return 'plant';if(/魚|クラブ|フィッシュ|水棲|fish/i.test(t))return 'fish';if(/人|神|エインフェリア|ウォーリア|兵|騎士|メイジ|ゴッド|マジック|human|aesir/i.test(t))return 'humanoid';return 'beast';};
  const weaponIcon = w => {const t=plain(w.type);if(/大剣|重|great/i.test(t))return'greatsword';if(/弓|bow/i.test(t))return'bow';if(/杖|staff/i.test(t))return'staff';if(/槍|spear/i.test(t))return'spear';if(/拳|ナックル|fist/i.test(t))return'fist';if(/透器|ether/i.test(t))return'magic';return'sword';};
  const badgeMap = window.VP_MONSTER_IMAGES || {};
  const visual = (m,detail=false) => {const image=badgeMap[m.jp]||badgeMap[m.name];return image?`<div class="monster-visual">${m.boss?'<span class="pill gold">BOSS</span>':''}<img class="badge-image" src="${esc(image.file||image)}" alt="${esc(titleOf(m))}的 RetroAchievements 成就圖示" loading="lazy"><span class="visual-label">RA 成就圖示</span></div>`:`<div class="monster-visual">${m.boss?'<span class="pill gold">BOSS</span>':''}${icon(monsterIcon(m))}<span class="visual-label">分類示意圖</span></div>`;};
  const routeBox = map => {if(!map?.nodes?.length)return '';return `<div class="route-box"><span class="route-label">ROUTE NOTE ／ 流程示意・非實際地形與比例</span><div class="route-nodes">${map.nodes.map((n,i)=>`${i?'<span class="route-arrow">→</span>':''}<span class="route-node ${n.type==='boss'?'boss':''}">${esc(typeof n==='string'?n:n.label||n.name)}</span>`).join('')}</div></div>`;};
  const worldArt = `<svg class="world-illustration" viewBox="0 0 320 210" fill="none" aria-hidden="true"><path d="m15 200 55-99 25 23L151 20l58 112 27-39 73 107H15Z" fill="#93a27c22" stroke="#a7b28b" stroke-width=".7"/><path d="m57 128 13-27 25 23m35-65 21-39 27 52m45 41 13-20 17 25" stroke="#d4c99c"/><path d="M38 184c46-5 49-43 82-43s23 30 49 30 25-35 63-35 29 38 63 35" stroke="#cbbd8c" stroke-dasharray="3 5"/><circle cx="105" cy="146" r="3" fill="#d4bc80"/><circle cx="198" cy="150" r="3" fill="#d4bc80"/><circle cx="274" cy="167" r="3" fill="#d4bc80"/><path d="M150 145v-39m-12 7 12-16 12 16m-18 10h12m-9 5h6" stroke="#b2be92"/><circle cx="265" cy="40" r="17" stroke="#a7b28b" stroke-width=".5"/><path d="M265 20v40m-20-20h40m-24-5 4-8 4 8-4 17-4-17Z" stroke="#bfae7d" stroke-width=".7"/></svg>`;
  const itemGuide = window.VP_CREATE_ITEM_GUIDE({weapons:A,extras:X,monsters:M,stages,locations:L,towns:T,crafting:C,esc,plain,num,icon,srcLinks,openDetail,openItem:openItemByName});
  const locationUI = window.VP_CREATE_LOCATION_UI({stages,monsters:M,extras:X,esc,plain,num,icon,visual,srcLinks,getProgress:()=>progress,saveProgress,toast,openItem:openItemByName,itemGuide});
  function openItemByName(name){
    const normalize=x=>String(x||'').normalize('NFKC').replace(/[\s・\-]/g,'');
    const n=normalize(name);const weapon=A.find(w=>[w.jp,w.name,w.en,...(w.aliases||[])].some(v=>normalize(v)===n));if(weapon){weaponDetail(weapon.id);return;}
    itemGuide.open(name);
  }
  function home(){
    $('#main').innerHTML=`<section class="hero"><div class="hero-symbol">ᛉ</div><img src="assets/key-art-002.jpg" class="hero-art" alt="Silmeria 官方角色原畫"><span class="hero-edition">PS2 ORIGINAL · GUIDEBOOK</span><div class="hero-text"><div class="eyebrow">VALKYRIE PROFILE 2 — SILMERIA</div><h1>命運，<br>由此<em>改寫。</em></h1><p class="hero-sub">女神戰記 2：希爾梅莉亞</p><p class="hero-desc">從港都佐爾德到世界樹的彼端。<br>帶著這本攻略，走過人與神交織的旅程。</p><div class="hero-buttons"><a class="button" href="#walkthrough">開始閱讀攻略 <span>→</span></a><a class="button secondary" href="#checklist">查看重要提醒 <span>↗</span></a></div></div><span class="hero-caption">原創奇幻背景 · 地圖與遊戲資料請見各地攻略</span></section>
    <div class="metrics"><div class="metric">${icon('book')}<div><b>06 <small style="font:12px var(--sans)">+ SG</small></b><span>主線章節・紅蓮迷宮</span></div></div><div class="metric">${icon('map')}<div><b>${stages.length}</b><span>流程區段與路線</span></div></div><div class="metric">${icon('dragon')}<div><b>${M.length}</b><span>魔物與頭目條目</span></div></div><div class="metric">${icon('sword')}<div><b>${A.length}</b><span>武器資料</span></div></div></div>
    <div class="section-heading"><h2>每一段旅程，都有指引。<small>YOUR JOURNEY THROUGH MIDGARD</small></h2><a class="text-link" href="#walkthrough">全部流程 <span>→</span></a></div>
    <div class="home-grid"><section class="panel"><h3 class="panel-title">${icon('book')}主線攻略<span class="pill" style="margin-left:auto">CHAPTER GUIDE</span></h3>${chapters.filter(c=>c.id!=='sg').slice(0,6).map((c,i)=>`<a class="chapter-row" href="#walkthrough/${esc(c.id)}"><span class="chapter-number">0${i+1}</span><div class="chapter-info">${esc(c.title)}<small>${esc(c.subtitle||`CHAPTER 0${i+1}`)}</small></div><span>→</span></a>`).join('')}</section><div><section class="world-preview"><div class="eyebrow">EXPLORE THE WORLD</div><h3>世界的另一端</h3><p>查看各章路線、迷宮機關與地圖參考，找到下一個目的地。</p><a class="text-link" href="#maps">打開世界與迷宮 <span>→</span></a>${worldArt}</section><div class="note-list"><strong>✧ 冒險前，先留一份存檔。</strong>第三、四章的角色離隊獎勵、限定對話與英靈候選，都值得提前確認。<br><a class="text-link" href="#checklist">前往不可錯過清單 →</a></div></div></div>
    <div class="section-heading"><h2>做好準備，再迎戰。<small>KNOWLEDGE IS YOUR STRONGEST WEAPON</small></h2></div><div class="quick-grid"><a class="quick-card" href="#monsters">${icon('dragon')}<strong>魔物圖鑑</strong><p>數值、抗性、部位與素材掉落。</p><span>↗</span></a><a class="quick-card" href="#weapons">${icon('sword')}<strong>武器與裝備</strong><p>七類武器、取得方式與決め技。</p><span>↗</span></a><a class="quick-card" href="#systems">${icon('rune')}<strong>戰鬥與養成</strong><p>連段、符文、封印石與英靈。</p><span>↗</span></a></div>
    <div class="research-note">${icon('info')}<span>以 PS2 原作為範圍，保留日文名稱供遊戲內對照，中文為說明性譯名。每筆資料可回查來源；數值差異與缺漏另行標明。各城鎮與迷宮均整合配置圖、寶藏位置、當地怪物與掉落。魔物圖示與武器類型示意另有標示。<a href="#sources">閱讀資料說明 ↗</a></span></div>`;
  }
  function chapterNav(current){return `<div class="tabs">${chapters.map((c,i)=>`<a class="tab ${current===c.id?'active':''}" href="#walkthrough/${esc(c.id)}">${c.id==='sg'?'紅蓮迷宮':`第 ${i+1} 章`}</a>`).join('')}</div>`;}
  function renderStage(s,i){const tips=Array.isArray(s.tips)?s.tips: s.tips?[s.tips]:[];const boss=s.boss;return `<details class="stage" id="stage-${esc(s.id)}" ${i===0?'open':''}><summary><span class="stage-index">${String(i+1).padStart(2,'0')}</span><span class="stage-name">${esc(s.name)}<small>${esc([s.jp,s.en].filter(Boolean).join(' / '))}</small></span></summary><div class="stage-body"><div class="stage-top"><span class="pill ${/optional|選|支線/.test(s.kind)?'gold':''}">${esc(s.kind||'主線')}</span><label class="stage-complete"><input type="checkbox" data-progress="stage:${esc(s.id)}" ${progress['stage:'+s.id]?'checked':''}>已完成這個區段</label></div>${itemGuide.eventsForTown(s.id,s.chapterId)}${locationUI.render(s)}<section class="location-walkthrough"><h3 class="location-group-title">${icon('book')} 通關步驟與機關解法</h3><ol>${(s.steps||[]).map(step=>`<li>${itemGuide.rich(step)}</li>`).join('')}</ol></section>${boss?`<div class="boss-note">${icon('dragon')}<div><strong>頭目戰 ／ ${esc(plain(boss.name||boss))}</strong><p>${esc(plain(boss.tactic||boss.strategy||''))}</p><button class="text-link" style="border:0;background:none;padding:8px 0 0" data-find-monster="${esc(plain(boss.name||boss))}">查看圖鑑與抗性 →</button></div></div>`:''}${tips.length?`<div class="tips">${tips.map(t=>`<p>${itemGuide.rich(t)}</p>`).join('')}</div>`:''}${s.map?.reference?`<div class="map-reference"><a href="${esc(s.map.reference.url)}" target="_blank" rel="noopener noreferrer">${icon('map')} 開啟原作者實際地圖與寶箱標記 ↗</a><span class="external-note">　外部日文攻略</span></div>`:''}${srcLinks(s.sourceIds)}</div></details>`;}
  function walkthrough(chapterId,stageId){const c=chapters.find(x=>x.id===chapterId)||chapters[0];$('#main').innerHTML=pageHead('STORY WALKTHROUGH','全章節流程攻略','選擇地點後，即可在同一區段查看地圖、寶藏配置、怪物與掉落，再閱讀通關步驟。內容包含劇情與頭目名稱。')+chapterNav(c?.id)+(c?`<h2 class="chapter-title">${esc(c.title)}</h2><p class="chapter-intro">${esc(c.intro||c.description||'')}</p><nav class="dossier-toc" aria-label="本章地點">${(c.stages||[]).map(s=>`<a href="#walkthrough/${esc(c.id)}/${esc(s.id)}">${esc(s.name)}</a>`).join('')}</nav><div class="chapter-progress">${(c.stages||[]).filter(s=>progress['stage:'+s.id]).length} / ${(c.stages||[]).length} 區段已完成</div>${itemGuide.chapterPanel(c.id)}${(c.stages||[]).map(renderStage).join('')}`:'<p class="empty">尚無流程資料。</p>');if(stageId){requestAnimationFrame(()=>{const e=document.getElementById('stage-'+stageId);if(e){e.open=true;e.scrollIntoView({block:'start'});}});}}
  function maps(){const options=chapters.map((c,i)=>`<option value="${esc(c.id)}">${c.id==='sg'?'紅蓮迷宮':`第 ${i+1} 章：${esc(c.title)}`}</option>`).join('');$('#main').innerHTML=pageHead('WORLD ATLAS','世界與迷宮','從城鎮到紅蓮迷宮，依章節查找各地配置圖。點選完整攻略可放大地圖，並查對寶藏位置、當地怪物與部位掉落。')+`<section class="panel"><h2 class="panel-title">${icon('map')}冒險路線總覽</h2><div class="full-map">${worldMap()}</div><div class="world-legend"><span><i></i>主線流程</span><span><i class="optional"></i>支線與挑戰</span><span>按章節節點直接閱讀攻略 · 節點位置不代表世界座標</span></div></section><div class="filters"><label for="map-chapter" class="text-link">篩選章節</label><select id="map-chapter" class="map-select"><option value="all">全部區域</option>${options}</select><input id="map-query" placeholder="搜尋地名／機關／頭目" aria-label="搜尋地圖區域"></div><div id="map-results" class="map-grid"></div>`;const update=()=>{const c=$('#map-chapter').value;const q=$('#map-query').value.trim().toLowerCase();const arr=stages.filter(s=>(c==='all'||s.chapterId===c)&&(!q||searchText(s).includes(q)));$('#map-results').innerHTML=arr.map(s=>`<article class="panel map-card"><span class="eyebrow">${esc(s.chapterTitle)}</span><h3>${esc(s.name)}</h3><p>${esc([s.jp,s.en].filter(Boolean).join(' / '))}</p>${locationUI.preview(s)}${routeBox(s.map)||'<p class="notice">此區以事件與對話為主，請查看流程說明。</p>'}<div class="map-actions"><a href="#walkthrough/${esc(s.chapterId)}/${esc(s.id)}">閱讀完整流程 →</a>${s.map?.reference?`<a href="${esc(s.map.reference.url)}" target="_blank" rel="noopener noreferrer">原作者實際地圖 ↗</a>`:''}${s.map?.reference?.imageUrl?`<a href="${esc(s.map.reference.imageUrl)}" target="_blank" rel="noopener noreferrer">地圖原圖 ↗</a>`:''}</div>${srcLinks(s.sourceIds)}</article>`).join('')||'<p class="empty">沒有符合條件的區域。</p>';};$('#map-chapter').onchange=update;$('#map-query').oninput=update;update();}
  function worldMap(){const n=chapters.length;return `<svg viewBox="0 0 1080 280" role="img" aria-label="第一章到第六章與紅蓮迷宮的章節流程示意圖"><defs><pattern id="map-grid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="#b5c29f" stroke-opacity=".16"/></pattern></defs><rect x="0" y="0" width="1080" height="280" fill="#eef1e6" rx="4"/><rect width="1080" height="280" fill="url(#map-grid)"/><path d="M50 225 140 100l70 83L340 40l100 140 70-82 100 120L735 60l95 90 100-60 100 130" fill="none" stroke="#c2cbb4" stroke-width="1"/><path d="M70 150 C150 40 215 45 250 140 S390 230 420 140 S560 45 590 140 S730 230 760 140 S900 45 940 140" fill="none" stroke="#91a67c" stroke-width="1.5" stroke-dasharray="4 7"/>${chapters.map((c,i)=>{const x=75+i*(920/Math.max(n-1,1)),y=i%2?165:100;return `<a href="#walkthrough/${esc(c.id)}"><g><circle cx="${x}" cy="${y}" r="22" fill="${c.id==='sg'?'#c1a16a':'#254f40'}"/><text x="${x}" y="${y+5}" fill="#fff9e6" text-anchor="middle" font-size="12">${c.id==='sg'?'SG':String(i+1).padStart(2,'0')}</text><text x="${x}" y="${y+46}" text-anchor="middle" font-size="11" fill="#5c7350">${esc(c.id==='sg'?'紅蓮迷宮':c.title.replace(/^第.章[：：\s]*/,''))}</text><text x="${x}" y="${y+65}" text-anchor="middle" font-size="8" fill="#8b9a7d">${(c.stages||[]).length} 個攻略區段</text></g></a>`;}).join('')}</svg>`;}
  let monsterState={query:'',type:'all',area:'all',boss:'all',page:1};
  function monsters(initialQuery){if(initialQuery!=null)monsterState={...monsterState,query:initialQuery,page:1};const types=[...new Set(M.map(typeOf))].sort();const areas=[...new Set(M.flatMap(m=>Array.isArray(m.area)?m.area:Array.isArray(m.areas)?m.areas:[areaOf(m)]))].filter(Boolean).sort();$('#main').innerHTML=pageHead('BESTIARY','魔物圖鑑','查詢出沒地點、能力、元素抗性與部位掉落。HP 依原來源列示；隊長加成、周回與封印石可能改變實際值，存在差異時請閱讀詳細註記。')+`<div class="notice">魔物圖示：已辨識頭目使用 RetroAchievements 成就圖示；其餘使用標明「分類示意圖」的原創圖標。圖標不代表遊戲內的完整模型。空白數值代表來源未提供，並非 0。</div><div class="filters"><input id="monster-query" value="${esc(monsterState.query)}" aria-label="搜尋魔物" placeholder="搜尋魔物、素材或部位…"><select id="monster-type" aria-label="篩選種類"><option value="all">所有種類</option>${types.map(t=>`<option ${monsterState.type===t?'selected':''}>${esc(t)}</option>`).join('')}</select><select id="monster-area" aria-label="篩選出沒地區"><option value="all">所有區域</option>${areas.map(t=>`<option ${monsterState.area===t?'selected':''}>${esc(t)}</option>`).join('')}</select><select id="monster-boss" aria-label="篩選頭目"><option value="all">全部魔物</option><option value="boss" ${monsterState.boss==='boss'?'selected':''}>頭目</option><option value="normal" ${monsterState.boss==='normal'?'selected':''}>一般魔物</option></select></div><div class="result-count" id="monster-count" aria-live="polite"></div><div class="monster-grid" id="monster-results"></div><div id="monster-pagination"></div>`;['query','type','area','boss'].forEach(k=>{$('#monster-'+k)['on'+(k==='query'?'input':'change')]=e=>{monsterState[k]=e.target.value;monsterState.page=1;updateMonsters();};});updateMonsters();}
  function updateMonsters(){const st=monsterState,q=st.query.trim().toLowerCase();const arr=M.filter(m=>(!q||searchText(m).includes(q))&&(st.type==='all'||typeOf(m)===st.type)&&(st.area==='all'||areaOf(m).includes(st.area))&&(st.boss==='all'||(st.boss==='boss'?m.boss:!m.boss)));const pages=Math.max(1,Math.ceil(arr.length/24));st.page=Math.min(st.page,pages);$('#monster-count').textContent=`${arr.length} / ${M.length} 筆魔物資料`;$('#monster-results').innerHTML=arr.slice((st.page-1)*24,st.page*24).map(m=>`<button class="monster-card" data-monster="${esc(m.id)}" aria-label="查看${esc(titleOf(m))}詳細資料">${visual(m)}<div class="monster-info"><h3>${esc(titleOf(m))}</h3><p class="jp">${esc(m.jp||m.en||'')} ${m.boss?'· BOSS':''}</p><div class="monster-stats"><span title="HP 為來源基礎表，詳情附其他遭遇值">HP* <b>${num(m.hp)}</b></span><span>ATK <b>${num(m.atk)}</b></span></div><p class="area">${esc(areaOf(m))}</p></div></button>`).join('')||'<p class="empty">沒有符合條件的魔物，請調整關鍵字或篩選條件。</p>';$('#monster-pagination').innerHTML=pagination(st.page,pages,'monster');}
  const pagination=(page,pages,scope)=>`<div class="pagination"><button data-page="${page-1}" data-scope="${scope}" ${page<=1?'disabled':''}>← 上一頁</button><span>${page} / ${pages}</span><button data-page="${page+1}" data-scope="${scope}" ${page>=pages?'disabled':''}>下一頁 →</button></div>`;
  const detailSection=(title,content)=>`<section class="detail-section"><h3>${esc(title)}</h3>${content}</section>`;
  function hpVariantsTable(m){
    if(!m.hpVariants?.length)return '';
    return detailSection('HP 對照與來源情境',`<div class="table-wrap"><table><thead><tr><th>來源記錄 HP</th><th>地區／情境</th><th>資料來源</th></tr></thead><tbody>${m.hpVariants.map(v=>{const source=sources.get(v.sourceId);return `<tr><td class="number">${num(v.value)}</td><td>${show(v.context||'來源未區分遭遇條件')}</td><td>${source?`<a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.title)} ↗</a>`:'未載明'}</td></tr>`;}).join('')}</tbody></table></div><p class="details-explain">各表記錄可能屬不同遭遇或加成；不將差異一律套用為固定倍率。</p>`);
  }
  function sidequests(){
    $('#main').innerHTML=pageHead('SIDE STORIES & COLLECTIONS','支線與收集攻略','三社詩文、動物餵食、城鎮委託與限定獎勵。先查看期限，再依序完成；道具日文名保留供原作對照。')+`<div class="tabs"><a class="tab" href="#checklist">不可錯過清單 →</a><a class="tab" href="#walkthrough">主線與迷宮 →</a></div>${(W.sidequests||[]).map((q,i)=>`<article class="panel" style="margin:16px 0" id="quest-${esc(q.id)}"><span class="eyebrow">SIDE QUEST ${String(i+1).padStart(2,'0')}</span><h2 class="panel-title">${esc(q.title)}</h2>${q.deadline?`<p class="notice">期限／條件：${esc(q.deadline)}</p>`:''}<ol class="quest-steps">${(q.steps||[]).map(t=>`<li>${itemGuide.rich(t)}</li>`).join('')}</ol>${q.rewards?.length?`<div class="tips">已知獎勵：${q.rewards.map(itemGuide.rich).join('、')}</div>`:''}${srcLinks(q.sourceIds)}</article>`).join('')}`;
  }
  function openDetail(html){$('#detail-body').innerHTML=html;const d=$('#detail-dialog');if(!d.open)d.showModal();d.scrollTop=0;}
  function towns(townId='all',chapterId='all',eventId=''){
    $('#main').innerHTML=pageHead('TOWNS, PEOPLE & SUPPLIES','城鎮與 NPC','依章節確認交付數量、對話選項、餵食門檻、獎勵與期限，再查商人及商品配方。')+itemGuide.townPage(townId,chapterId);
    const update=()=>{location.hash=itemGuide.townHref($('#town-select').value,$('#town-chapter').value);};
    $('#town-select').onchange=update;$('#town-chapter').onchange=update;
    if(eventId)requestAnimationFrame(()=>{const card=document.getElementById('town-event-'+eventId);if(card){card.classList.add('highlight');card.setAttribute('tabindex','-1');card.focus({preventScroll:true});card.scrollIntoView({block:'start'});}});
  }
  function monsterDetail(id){const m=M.find(m=>m.id===id);if(!m)return;const stats=[['HP（來源基礎表）',m.hp],['LV',m.level??m.lv],['ATK',m.atk],['MAG',m.mag],['HIT',m.hit],['AVD',m.avd],['RDM',m.rdm],['RST',m.rst]];const drops=Array.isArray(m.drops)?m.drops:[];const res=m.resist||m.resistance||m.resistances;const resNames={fire:'炎',ice:'冰',thunder:'雷',lightning:'雷',earth:'土',holy:'聖',dark:'闇',darkness:'闇'};openDetail(`<span class="eyebrow">BESTIARY ／ ${esc(typeOf(m))}</span><h2 class="detail-title" id="detail-title">${esc(titleOf(m))}</h2><p class="detail-jp">${esc([m.jp,m.en].filter(Boolean).join(' / '))}</p>${visual(m,true)}<div class="detail-stats">${stats.map(([k,v])=>`<div class="detail-stat"><span>${k}</span><b>${num(v)}</b></div>`).join('')}</div><p class="details-explain">數值以此條目來源表為準，不保證代表無加成的基礎值。隊長、主線／SG 周回及場地封印石可能影響實戰數值。</p>${hpVariantsTable(m)}${m.fieldSourceIds?srcLinks(Object.values(m.fieldSourceIds)):''}${detailSection('出沒區域',`<p>${esc(areaOf(m))}</p>`)}${detailSection('弱點與抗性',`<p>${show(m.weakness||m.weaknesses)}</p>${m.weakParts?`<p>弱點部位：${show(m.weakParts)}</p>`:''}${res&&typeof res==='object'?`<div class="resist-grid">${Object.entries(res).map(([k,v])=>`<div class="resist-chip ${Number(v)<0?'weak':''}">${esc(resNames[k]||k)}<b>${show(v)}${typeof v==='number'?'%':''}</b></div>`).join('')}</div><p class="details-explain">正值為抗性、負值為弱點；吸收或特殊狀態以來源與註記為準。</p>`:`<p>${show(res)}</p>`}`)}${detailSection('部位與掉落',drops.length?`<div class="table-wrap"><table><thead><tr><th>道具／素材</th><th>目標部位／條件</th><th>來源分類</th><th>機率</th></tr></thead><tbody>${drops.map(d=>typeof d==='string'?`<tr><td>${esc(d)}</td><td>未載明</td><td>未載明</td><td>—</td></tr>`:`<tr><td>${itemGuide.link(d.item||d.name)}</td><td>${show(d.part||d.condition)}</td><td>${show(d.kind)}</td><td>${d.rate==null?'未載明':show(d.rate)+(typeof d.rate==='number'?'%':'')}</td></tr>`).join('')}</tbody></table></div>`:'<p>目前來源未列明此魔物的逐部位掉落。</p>')}${m.leaderDrop||m.directAssault?detailSection('隊長獎勵／Direct Assault',`<p>${show(m.leaderDrop||m.directAssault)}</p>`):''}${m.tactic?detailSection('應對方式',`<p>${show(m.tactic)}</p>`):''}${m.notes||m.hpNote||m.statsNote||m.statNotes||m.variants?detailSection('資料差異與註記',`<p>${show(m.notes||m.statNotes||'')}</p>${m.statsNote?`<p>${show(m.statsNote)}</p>`:''}${m.hpNote?`<p>${show(m.hpNote)}</p>`:''}${m.variants?`<p>${show(m.variants)}</p>`:''}`):''}${srcLinks(m.sourceIds)}<p class="details-explain">${badgeMap[m.jp]?'圖片為 RetroAchievements 玩家製作成就圖示；來源列於研究來源。'+(badgeMap[m.jp].note||''):'圖像為原創分類示意，非此敵人的官方造型。'}</p>`);}
  let weaponState={query:'',type:'all',sort:'original',page:1};
  function weapons(kind='weapons'){const labels={weapons:'全部武器',armor:'防具',accessories:'飾品／素材',items:'道具',magic:'魔法',skills:'技能符文',sealstones:'封印石',einherjar:'英靈',shops:'商店與製作'};$('#main').innerHTML=pageHead('ARMORY & CHARACTER DATA','武器與裝備','保留原作日文名稱與數據，中文作為解說。武器圖標表示武器類型；取得方式、素材配方與特殊效果請開啟詳細資料查看。')+`<div class="tabs">${Object.entries(labels).map(([k,v])=>`<a class="tab ${kind===k?'active':''}" href="#weapons/${k}">${v} <small>${(k==='weapons'?A:X[k]||[]).length}</small></a>`).join('')}</div><div id="equipment-content"></div>`;if(kind!=='weapons'){referenceList(kind);return;}const types=[...new Set(A.map(w=>plain(w.type)))];$('#equipment-content').innerHTML=`<div class="filters"><input id="weapon-query" value="${esc(weaponState.query)}" placeholder="搜尋武器、效果或獲得途徑…" aria-label="搜尋武器"><select id="weapon-type" aria-label="篩選武器類型"><option value="all">所有武器類型</option>${types.map(t=>`<option ${weaponState.type===t?'selected':''}>${esc(t)}</option>`).join('')}</select><select id="weapon-sort" aria-label="武器排序"><option value="original">原始分類順序</option><option value="atk" ${weaponState.sort==='atk'?'selected':''}>ATK 由高至低</option><option value="mag" ${weaponState.sort==='mag'?'selected':''}>MAG 由高至低</option></select></div><div id="weapon-count" class="result-count" aria-live="polite"></div><div class="table-wrap"><table><thead><tr><th>武器名稱／類型</th><th>ATK</th><th>MAG</th><th>攻擊次數</th><th>決め技</th><th>獲得途徑摘要</th></tr></thead><tbody id="weapon-results"></tbody></table></div><div id="weapon-pagination"></div>`;['query','type','sort'].forEach(k=>{$('#weapon-'+k)['on'+(k==='query'?'input':'change')]=e=>{weaponState[k]=e.target.value;weaponState.page=1;updateWeapons();};});updateWeapons();}
  const soulText=v=>v===true?'可':v===false?'不可':plain(v)||'未載明';
  function updateWeapons(){const st=weaponState,q=st.query.trim().toLowerCase();let arr=A.filter(w=>(!q||searchText(w).includes(q))&&(st.type==='all'||plain(w.type)===st.type));if(st.sort!=='original')arr=[...arr].sort((a,b)=>(Number(b[st.sort])||0)-(Number(a[st.sort])||0));const pages=Math.max(1,Math.ceil(arr.length/25));st.page=Math.min(st.page,pages);$('#weapon-count').textContent=`${arr.length} / ${A.length} 筆武器資料 · 點選或按 Enter 查看詳情`;$('#weapon-results').innerHTML=arr.slice((st.page-1)*25,st.page*25).map(w=>`<tr data-item="${esc(w.id)}" tabindex="0" role="button" aria-label="查看${esc(titleOf(w))}"><td><span class="weapon-name">${icon(weaponIcon(w))}<span>${esc(titleOf(w))}<small>${esc(w.jp||'')} · ${esc(w.type)}</small></span></span></td><td class="number">${num(w.atk)}</td><td class="number">${num(w.mag)}</td><td>${num(w.attacks)}</td><td><span class="pill ${w.soulCrush===false?'gold':''}">${esc(soulText(w.soulCrush))}</span></td><td class="table-obtain">${esc(plain(w.obtain)).slice(0,125)}${plain(w.obtain).length>125?'…':''}</td></tr>`).join('')||'<tr><td colspan="6" class="empty">沒有符合條件的武器。</td></tr>';$('#weapon-pagination').innerHTML=pagination(st.page,pages,'weapon');}
  function weaponDetail(id){const w=A.find(w=>w.id===id);if(!w)return;openDetail(`<span class="eyebrow">ARMORY ／ ${esc(w.type)}</span><h2 class="detail-title" id="detail-title">${esc(titleOf(w))}</h2><p class="detail-jp">${esc([w.jp,w.en].filter(Boolean).join(' / '))}</p><div class="detail-weapon-icon">${icon(weaponIcon(w))}</div><p class="details-explain">此圖為武器類型示意，非遊戲內武器模型。</p><div style="clear:both"></div><div class="detail-stats">${[['ATK',w.atk],['MAG',w.mag],['攻擊次數',w.attacks],['決め技',soulText(w.soulCrush)]].map(([k,v])=>`<div class="detail-stat"><span>${k}</span><b>${num(v)}</b></div>`).join('')}</div>${detailSection('屬性與特殊效果',`<p>${show(w.element)}</p><p>${show(w.effect)}</p>`)}${detailSection('符文、能力與價格',`<p>符文顏色：${show(w.color)} ／ 符文：${show(w.rune)}</p><p>其他能力：${show(w.stats)}</p><p>耐性：${show(w.resist)}</p><p>價格：${num(w.price)} OTH（未記錄時以遊戲商店為準）</p>`)}${detailSection('獲得方式',`<p>${itemGuide.rich(w.obtain)}</p>`)}${itemGuide.acquisition(w.jp)}${itemGuide.recipes(w.jp)}${itemGuide.uses(w.jp)}${w.materials||w.recipe?detailSection('製作素材',`<p>${show(w.materials||w.recipe)}</p>`):''}${w.notes?detailSection('註記',`<p>${show(w.notes)}</p>`):''}${srcLinks(w.sourceIds)}`);}
  function referenceList(kind){
    const arr=X[kind]||[];
    const explanations={shops:'點商品或素材名稱可查看取得位置。熟客配方需要把正確數量的材料賣給指定店家，再達成熟客條件並支付購買價格；人類旅行商人與阿斯嘉特商人是不同店家。',accessories:'飾品與素材的能力、符文及取得方式；點名稱可查當地怪物、目標部位、寶藏和商店。',items:'各類道具與重要物品的用途及取得方式。點名稱可查逐地點來源。',magic:'魔法數值、屬性與習得資料依來源列示。',armor:'防具圖標為種類示意；點名稱可查能力、取得位置與製作配方。',skills:'同色符文連結滿足配方後，還需透過戰鬥學習。CP 為已學技能的配置成本。',sealstones:'晶石數為封印石返還成本。效果會隨攜帶或台座位置作用於不同對象。',einherjar:'同一遺物的候選英靈互斥；40 名角色無法在單輪全部加入。解放後的再會地點與時期另列，城鎮頁亦可查。'};
    $('#equipment-content').innerHTML='<div class="notice">'+esc(explanations[kind]||'')+'</div><div class="filters"><input id="reference-query" aria-label="搜尋資料" placeholder="搜尋名稱、地點、符文、效果…"><span class="result-count" id="reference-count"></span></div><div id="reference-results" class="equipment-grid"></div>';
    const labels={chapter:'加入／取得章節',initialSkill:'初始技能',releaseLocation:'解放後所在地',releaseGifts:'重逢贈禮與時期',classes:'可裝備職業',price:'價格',element:'屬性',ap:'AP',power:'威力',learn:'習得條件',target:'對象',shop:'商店',hits:'命中數',heat:'決め技熱量',cp:'CP',color:'符文顏色',runes:'符文配方',rune:'符文',effect:'效果',obtain:'取得方式',cost:'返還晶石',crystals:'返還晶石',area:'所在區域',type:'類型',class:'職業',level:'初始等級',chance:'加入機率',candidates:'同遺物候選',release:'解放',location:'所在地',rdm:'RDM',rst:'RST',notes:'註記',equipment:'裝備',gender:'性別',materials:'素材',stats:'能力',probability:'機率',relic:'遺物',group:'候選組',category:'分類',rarity:'備註'};
    const omit=new Set(['id','sourceIds','name','title','jp','en','icon']);
    const update=()=>{
      const q=$('#reference-query').value.trim().toLowerCase(),result=arr.filter(r=>!q||searchText(r).includes(q));
      $('#reference-count').textContent=result.length+' / '+arr.length+' 筆';
      $('#reference-results').innerHTML=result.map(r=>{
        if(kind==='shops')return '<div class="reference-card shop-reference">'+itemGuide.recipeCard(r)+'</div>';
        const title=['armor','accessories','items','magic','sealstones'].includes(kind)?itemGuide.link(r.jp||r.name,titleOf(r)):esc(titleOf(r));
        return '<article class="reference-card"><div class="eyebrow">'+icon(kind==='skills'?'rune':kind==='sealstones'?'gate':kind==='armor'?'shield':'humanoid')+' '+esc(r.type||r.class||r.color||kind.toUpperCase())+'</div><h3>'+title+'</h3>'+(r.jp||r.en?'<p class="detail-jp">'+esc([r.jp,r.en].filter(Boolean).join(' / '))+'</p>':'')+'<dl>'+Object.entries(r).filter(([k,v])=>!omit.has(k)&&v!=null&&v!=='').map(([k,v])=>'<dt>'+esc(labels[k]||k)+'</dt><dd>'+itemGuide.rich(v)+'</dd>').join('')+'</dl>'+srcLinks(r.sourceIds)+'</article>';
      }).join('')||'<p class="empty">沒有符合條件的資料。</p>';
    };
    $('#reference-query').oninput=update;update();
  }
  function systems(){const all=[...(R.systems||[]),...(W.systems||[])];$('#main').innerHTML=pageHead('BATTLE & GROWTH','戰鬥與養成','先理解操作與資源，再安排連段、技能和封印石。以下為原創整理的操作圖解，詳細配方可直接查詢資料庫。')+`<div class="tabs"><a class="tab" href="#weapons/skills">技能配方 →</a><a class="tab" href="#weapons/sealstones">封印石總表 →</a><a class="tab" href="#weapons/einherjar">40 名英靈 →</a></div><div class="systems-grid">${all.map((s,i)=>`<article class="reference-card" id="system-${esc(s.id||i)}"><div class="eyebrow">SYSTEM ${String(i+1).padStart(2,'0')}</div><h3>${icon(s.icon||'rune')} ${esc(s.title||s.name)}</h3>${s.diagram?`<figure class="system-figure"><div class="system-diagram">${s.diagram.map((label,j)=>`${j?'<span class="route-arrow">→</span>':''}<div class="diagram-step">${icon(['compass','rune','sword','check'][j%4])}${esc(label)}</div>`).join('')}</div><figcaption class="external-note">原創操作流程示意</figcaption></figure>`:''}<div class="system-content">${(s.paragraphs||s.steps||[s.description||s.text||'']).map(p=>`<p>${esc(plain(p))}</p>`).join('')}</div>${srcLinks(s.sourceIds)}</article>`).join('')}</div>`;}
  const missables=()=> (W.missables||[]).map((x,i)=> typeof x==='string'?{id:'m'+i,title:x}:x);
  function checklist(){const list=missables();const complete=list.filter(x=>progress['missable:'+x.id]).length;$('#main').innerHTML=pageHead('THE MISSABLES CHECKLIST','不可錯過清單','在重大事件前逐一確認。進度僅儲存在這台裝置的瀏覽器；更換裝置前可匯出備份。這份清單不是遊戲存檔。')+`<section class="panel"><div class="check-status"><b>${complete}</b> / ${list.length} 項已確認</div><div class="progress-track"><span style="width:${list.length?complete/list.length*100:0}%"></span></div><div class="check-tools"><button id="export-progress">匯出進度</button><button id="import-progress">匯入進度</button><input type="file" id="progress-file" accept="application/json,.json" hidden></div><div>${list.map(x=>`<label class="check-item ${progress['missable:'+x.id]?'done':''}"><input type="checkbox" data-progress="missable:${esc(x.id)}" ${progress['missable:'+x.id]?'checked':''}><div><span class="pill gold">${esc(x.chapter||x.deadline||x.timing||x.when||'重要檢查')}</span><h3>${esc(x.title||x.name)}</h3>${[x.description,x.detail,x.action,x.condition,x.reward].filter(Boolean).map(v=>`<p>${esc(plain(v))}</p>`).join('')}${Array.isArray(x.steps)?x.steps.map(v=>`<p>${esc(plain(v))}</p>`).join(''):''}${srcLinks(x.sourceIds)}</div></label>`).join('')}</div></section>`;$('#export-progress').onclick=()=>{const blob=new Blob([JSON.stringify({version:1,game:'vp2-silmeria',savedAt:new Date().toISOString(),progress},null,2)],{type:'application/json'});const link=document.createElement('a');const u=URL.createObjectURL(blob);link.href=u;link.download='vp2-guide-progress.json';link.click();setTimeout(()=>URL.revokeObjectURL(u),1000);};$('#import-progress').onclick=()=>$('#progress-file').click();$('#progress-file').onchange=async e=>{try{const f=e.target.files[0];if(!f)return;const d=JSON.parse(await f.text());if(d.game!=='vp2-silmeria'||!d.progress||typeof d.progress!=='object'||Array.isArray(d.progress))throw Error();const valid={};for(const[k,v]of Object.entries(d.progress))if(/^(stage|missable|treasure):[\w-]+$/.test(k)&&typeof v==='boolean')valid[k]=v;progress={...progress,...valid};saveProgress();checklist();toast('已匯入攻略進度。');}catch{toast('無法匯入，請選擇本攻略匯出的 JSON 檔。');}};}
  function sourcePage(){const counts=[['城鎮、NPC 與事件',`${T.events.length} 項事件、${(C.merchants||[]).length} 個商人身分`,'按章節列出交付物、需求數量、報酬門檻、正確選項與期限；素材可連到實際掉落、寶藏、NPC 或商店。'],['各地配置圖',`${(L.areas||[]).length} 個地區，${(L.areas||[]).reduce((n,a)=>n+(a.maps?.length||0),0)} 張配置圖`,'迷宮原圖已內嵌並保留來源；城鎮設施圖依攻略文字重繪，互動標記對應圖上編號。'],['區域怪物與掉落',`${(E.regions||[]).length} 個流程區段`,'初訪、再訪與樓層分開，普通掉落、部位破壞、領袖及一次獎勵分列。'],['主線與紅蓮迷宮',`${chapters.length} 個章節群組，${stages.length} 個流程區段`,'包含城鎮、主線、可選迷宮、重返事件與 SG；每個地點整合配置圖、寶藏位置及當地遭遇。'],['魔物與頭目',`${M.length} 筆，${M.filter(m=>m.hp!=null).length} 筆附 HP`,'來源缺漏的能力值、機率與部位不補猜；不同遭遇型態可能分列。'],['武器',`${A.length} 筆，${new Set(A.map(w=>w.type)).size} 類`,'保留原日文名；中文名為便於閱讀的說明性譯名。'],['防具／技能／封印石',`${(X.armor||[]).length} / ${(X.skills||[]).length} / ${(X.sealstones||[]).length}`,'原來源不一致處附註記；特殊效果須配合持有／場地條件。'],['飾品／道具／魔法',`${(X.accessories||[]).length} / ${(X.items||[]).length} / ${(X.magic||[]).length}`,'收錄日文物品名稱、中文效果、能力與取得方式。'],['商店與製作',`${(X.shops||[]).length} 筆商品與配方`,'素材數量與店舖來源逐項列示；庫存隨劇情及熟客條件變化。'],['英靈',`${(X.einherjar||[]).length} 名`,'同一遺物只能取得一名候選；不能單輪全收集。'],['圖片',`${Object.keys(badgeMap).length} 個頭目名稱圖示對照`,'部分為同圖對照；其他魔物、武器採原創分類圖示，非官方模型圖鑑。']];$('#main').innerHTML=pageHead('RESEARCH & CREDITS','研究來源與資料說明','整理日期：2026 年 11 月 1 日。攻略以 PlayStation 2《Valkyrie Profile 2: Silmeria》為範圍；以多個日文與英文原作者資料交叉核對重要條件。')+`<div class="notice">本頁可核查資料範圍，並非聲稱所有細節均已經由實機逐項驗證。未取得可靠數值的欄位標為「未載明」；無法解釋的來源差異保留註記，請以遊戲實際顯示為最終依據。</div><div class="section-heading"><h2>收錄範圍與限制</h2></div><div class="table-wrap"><table class="coverage-table"><thead><tr><th>項目</th><th>收錄數量</th><th>閱讀方式</th></tr></thead><tbody>${counts.map(row=>`<tr>${row.map(cell=>`<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div><div class="intro-cards"><div class="panel"><strong>數值依來源呈現</strong><p>隊長加成、封印石、主線周回與 SG 周回都可能影響數值；不同表格的數字不逕自當成同一難度。</p></div><div class="panel"><strong>圖片與地圖</strong><p>首頁背景為 imagegen 生成的原創奇幻裝飾，並非遊戲場景或地圖。部分頭目使用 RA 成就圖示；其餘為原創類型圖標。配置圖已整合於章節，保留原作者來源；城鎮設施圖依文字攻略重繪並標示。</p></div><div class="panel"><strong>原創中文整理</strong><p>流程、說明與圖解以繁體中文重新編寫；日文名稱和數值用來核對原作。原攻略文章及地圖未整站轉載。</p></div></div><div class="section-heading"><h2>參考資料<small>${uniqueSources.length} SOURCE PAGES</small></h2></div><div class="sources-list">${uniqueSources.map((s,i)=>`<article class="source-card"><span class="source-number">${String(i+1).padStart(2,'0')}</span><div><h3><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a></h3><p>${esc(s.language||'')} ${esc(s.url)}</p>${s.note||s.notes?`<p>${esc(plain(s.note||s.notes))}</p>`:''}</div></article>`).join('')}</div><div class="notice">本網站為非官方玩家攻略，與 Square Enix、tri-Ace 及各資料來源網站無隸屬關係。遊戲與角色原畫權利屬原權利人；成就圖示由 RetroAchievements 社群製作。外部來源可能改版或失效。</div>`;}
  const searchKey = value => plain(value).normalize('NFKC').toLocaleLowerCase().trim();
  const stageById = new Map(stages.map(s=>[s.id,s]));
  const monsterById = new Map(M.map(m=>[m.id,m]));
  const searchItemNames = new Map([...A,...['armor','accessories','items','magic','sealstones'].flatMap(k=>X[k]||[])].filter(r=>r.jp&&r.name).map(r=>[r.jp,r.name]));
  const itemSearchLabel = item => searchItemNames.get(item)||plain(item);
  const referenceLabels = {armor:'防具',accessories:'飾品與素材',items:'道具',magic:'魔法',skills:'技能',sealstones:'封印石',einherjar:'英靈',shops:'商店與製作'};
  const treasureSearch = (L.areas||[]).flatMap(area=>(area.treasures||[]).flatMap(t=>{
    const stage=(t.stageIds||area.stageIds||[]).map(id=>stageById.get(id)).find(Boolean);
    if(!stage)return [];
    return [{kind:'treasure',title:itemSearchLabel(t.item),sub:`寶藏 · ${area.name} · ${plain(t.location)}${t.condition?' · '+plain(t.condition):''}`,route:`#walkthrough/${stage.chapterId}/${stage.id}/treasures/${encodeURIComponent(t.id)}`,icon:'check',text:plain([t,area.name,area.jp,area.en,itemSearchLabel(t.item),'寶藏 寶箱'])}];
  }));
  const dropSearch = (E.regions||[]).flatMap(region=>{
    const stage=(region.stageIds||[region.id]).map(id=>stageById.get(id)).find(Boolean);
    if(!stage)return [];
    const grouped=new Map();
    for(const d of window.VP_REGION_DROPS?.[region.id]||[]){
      const key=d.monsterId+'|'+d.item;
      if(!grouped.has(key))grouped.set(key,{...d,parts:[],kinds:[]});
      const row=grouped.get(key);row.parts.push(d.part);row.kinds.push(d.kind);
    }
    return [...grouped.values()].map(d=>{
      const monster=monsterById.get(d.monsterId),parts=[...new Set(d.parts)].join('／'),kinds=[...new Set(d.kinds)].join('／');
      return {kind:'drop',title:itemSearchLabel(d.item),sub:`掉落 · ${stage.name} · ${monster?.name||d.monsterId} · ${parts} · ${kinds}`,route:`#walkthrough/${stage.chapterId}/${stage.id}/drops/${encodeURIComponent(d.item)}/${d.monsterId}`,icon:'check',text:plain([d,stage.name,stage.jp,stage.en,monster?.name,monster?.jp,monster?.en,itemSearchLabel(d.item),'掉落 素材'])};
    });
  });
  const searchIndex=[
    ...stages.map(s=>({kind:'stage',id:s.id,title:s.name,sub:'地點 · '+[s.jp,s.en,s.chapterTitle].filter(Boolean).join(' / '),route:`#walkthrough/${s.chapterId}/${s.id}`,icon:'map',text:plain(s)})),
    ...M.map(m=>({kind:'monster',id:m.id,title:titleOf(m),sub:'魔物 · '+plain(m.jp)+' · '+areaOf(m),icon:monsterIcon(m),text:plain(m)})),
    ...A.map(w=>({kind:'weapon',id:w.id,title:titleOf(w),sub:'武器 · '+w.jp+' · '+w.type,icon:weaponIcon(w),text:plain(w)})),
    ...Object.keys(referenceLabels).flatMap(k=>(X[k]||[]).map(r=>({kind:'reference',title:titleOf(r),sub:referenceLabels[k]+' · '+plain([r.jp,r.type,r.effect]),route:'#weapons/'+k+'/'+encodeURIComponent(r.jp||r.name||r.title||''),icon:k==='skills'?'rune':k==='sealstones'?'gate':k==='armor'?'shield':'humanoid',text:plain(r)}))),
    ...T.events.map(e=>({kind:'town',title:e.title,sub:'NPC／城鎮事件 · '+plain([e.townName,e.npc,e.location,e.timing]),route:itemGuide.townHref(e.townId,'all',e.id),icon:'humanoid',text:plain(e)})),
    ...treasureSearch,...dropSearch
  ].map((r,index)=>({...r,index,text:searchKey([r.title,r.sub,r.text]),titleKey:searchKey(r.title)}));
  function findSearch(query){
    const q=searchKey(query),terms=q.split(/\s+/).filter(Boolean);
    if(!terms.length)return [];
    const priority={stage:6,monster:5,weapon:7,reference:7,treasure:4,drop:0,town:8};
    const score=r=>(r.titleKey===q?100:r.titleKey.includes(q)?60:terms.every(t=>r.titleKey.includes(t))?45:0)+priority[r.kind];
    return searchIndex.filter(r=>terms.every(term=>r.text.includes(term))).sort((a,b)=>score(b)-score(a)||a.index-b.index).map(r=>{
      const visible=searchKey([r.title,r.sub]),missing=terms.filter(term=>!visible.includes(term));
      if(!missing.length)return r;
      const excerpts=missing.slice(0,2).map(term=>{const at=r.text.indexOf(term);return r.text.slice(Math.max(0,at-15),at+term.length+40);});
      return {...r,matchSub:r.sub.slice(0,65)+' · '+excerpts.join(' … ')};
    });
  }
  const searchResult = r => `<button type="button" class="search-result" data-search-index="${r.index}">${icon(r.icon)}<span>${esc(r.title)}<small>${esc((r.matchSub||r.sub).slice(0,180))}</small></span></button>`;
  function closeSuggestions(){ $('#search-suggestions').hidden=true; }
  function updateSuggestions(){
    const input=$('#site-search-input'),panel=$('#search-suggestions'),query=input.value.trim();
    if(!query){closeSuggestions();$('#site-search-status').textContent='';return;}
    const results=findSearch(query);
    panel.innerHTML=`<div class="result-count">${results.length} 筆結果 · 快速前往</div>`+results.slice(0,8).map(searchResult).join('')+(results.length?'':'<p class="empty">找不到符合的資料，試試日文原名或較短關鍵字。</p>')+'<button type="button" class="search-all" data-search-all>查看完整搜尋結果 →</button>';
    panel.hidden=false;$('#site-search-status').textContent=`找到 ${results.length} 筆結果；按 Enter 查看完整結果，或按向下鍵選取建議。`;
  }
  function updateSearch(){
    const query=$('#global-search').value.trim();$('#site-search-input').value=query;
    if(!query){$('#search-results').innerHTML='<p class="search-hint">搜尋中／日／英名稱、地點、寶藏、怪物、掉落素材與裝備。<br>可用空格組合關鍵字，例如：王家 骨クズ。</p>';return;}
    const results=findSearch(query);
    $('#search-results').innerHTML=`<div class="result-count">${results.length} 筆結果${results.length>120?'，顯示前 120 筆；可加入地名縮小範圍':''}</div>`+results.slice(0,120).map(searchResult).join('')+(results.length?'':'<p class="empty">找不到符合的資料，試試日文原名或較短關鍵字。</p>');
  }
  function openSearch(query=$('#site-search-input').value){
    closeSuggestions();$('#global-search').value=query;updateSearch();
    if(!$('#search-dialog').open)$('#search-dialog').showModal();
    $('#global-search').focus();
  }
  function route(){
    const parts=(location.hash.slice(1)||'home').split('/').map(part=>{try{return decodeURIComponent(part);}catch{return part;}});
    const [page,id,stage,tab,target,monsterId]=parts;
    closeSuggestions();$('#sidebar').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');
    if($('#detail-dialog').open)$('#detail-dialog').close();if($('#search-dialog').open)$('#search-dialog').close();
    $$('[data-nav]').forEach(a=>{const active=a.dataset.nav===page;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    if(page==='walkthrough'){
      walkthrough(id,stage);
      if(stage&&['map','treasures','monsters','drops'].includes(tab))requestAnimationFrame(()=>{
        locationUI.showTab(stage,tab);
        if(tab==='treasures'&&target){
          const card=document.getElementById(`treasure-${stage}-${target}`);
          if(card){card.classList.add('highlight');card.setAttribute('tabindex','-1');card.focus({preventScroll:true});card.scrollIntoView({block:'center'});}
        }
        if(tab==='drops'&&target){
          const root=document.getElementById(`loc-${stage}-drops`),query=$('[data-regional-drop-search]',root||document),select=$('[data-regional-drop-monster]',root||document);
          if(select){select.value=monsterId||'all';select.dispatchEvent(new Event('change',{bubbles:true}));}
          if(query){query.value=target;query.dispatchEvent(new Event('input',{bubbles:true}));}
          root?.scrollIntoView({block:'start'});
        }
      });
    }else if(page==='maps')maps();else if(page==='towns')towns(id||'all',stage||'all',tab);else if(page==='monsters')monsters();else if(page==='weapons'){
      weapons(id||'weapons');
      if(stage){const input=$('#reference-query')||$('#weapon-query');if(input){input.value=stage;input.dispatchEvent(new Event('input',{bubbles:true}));}}
    }else if(page==='systems')systems();else if(page==='checklist')checklist();else if(page==='sidequests')sidequests();else if(page==='sources')sourcePage();else home();
    fillIcons();document.title=`${({home:'攻略首頁',walkthrough:'全章節流程',maps:'世界與迷宮',towns:'城鎮與 NPC',monsters:'魔物圖鑑',weapons:'武器與裝備',systems:'戰鬥與養成',checklist:'不可錯過清單',sidequests:'支線與收集',sources:'研究來源'})[page]||'攻略首頁'}｜女神戰記 2 Silmeria`;
    if((page!=='walkthrough'||!stage)&&(page!=='towns'||!tab))window.scrollTo(0,0);
  }
  document.addEventListener('click',e=>{
    if(!e.target.closest('#site-search-form'))closeSuggestions();
    if(e.target.closest('[data-search-all]')){openSearch();return;}
    const m=e.target.closest('[data-monster]');if(m){monsterDetail(m.dataset.monster);return;}
    const w=e.target.closest('[data-item]');if(w){weaponDetail(w.dataset.item);return;}
    const p=e.target.closest('[data-page]');if(p&&!p.disabled){if(p.dataset.scope==='monster'){monsterState.page=Number(p.dataset.page);updateMonsters();$('#monster-count').scrollIntoView({block:'start'});}else{weaponState.page=Number(p.dataset.page);updateWeapons();$('#weapon-count').scrollIntoView({block:'start'});}return;}
    const f=e.target.closest('[data-find-monster]');if(f){const q=f.dataset.findMonster;const hits=M.filter(m=>[m.name,m.jp,m.en].some(n=>n&&(q.includes(n)||n.includes(q))));if(hits.length===1)monsterDetail(hits[0].id);else{monsterState={query:q,type:'all',area:'all',boss:'all',page:1};if(location.hash==='#monsters')monsters();else location.hash='monsters';}return;}
    const s=e.target.closest('[data-search-index]');if(s){const r=searchIndex[Number(s.dataset.searchIndex)];if(!r)return;closeSuggestions();if($('#search-dialog').open)$('#search-dialog').close();if(r.kind==='monster')monsterDetail(r.id);else if(r.kind==='weapon')weaponDetail(r.id);else if(location.hash===r.route)route();else location.hash=r.route;}
  });
  document.addEventListener('change',e=>{if(e.target.dataset.progress){progress[e.target.dataset.progress]=e.target.checked;saveProgress();if(location.hash.startsWith('#checklist'))checklist();}});
  document.addEventListener('keydown',e=>{
    if(e.isComposing&&e.key==='Enter'){e.preventDefault();return;}
    if(e.key==='Escape'&&!$('#search-suggestions').hidden){e.preventDefault();$('#site-search-input').focus();closeSuggestions();return;}
    if(e.target.closest('#site-search-form')&&['ArrowDown','ArrowUp'].includes(e.key)){
      if(e.target.id==='site-search-input'&&$('#search-suggestions').hidden)updateSuggestions();
      const buttons=$$('#search-suggestions button');
      if(buttons.length&&!$('#search-suggestions').hidden){e.preventDefault();const i=buttons.indexOf(e.target),next=i+(e.key==='ArrowDown'?1:-1);if(next<0)$('#site-search-input').focus();else buttons[Math.min(next,buttons.length-1)].focus();}return;
    }
    if((e.key==='Enter'||e.key===' ')&&e.target.matches('tr[data-item]')){e.preventDefault();weaponDetail(e.target.dataset.item);}
    if(e.key==='/'&&!/input|textarea|select/i.test(document.activeElement?.tagName)&&!document.activeElement?.isContentEditable){e.preventDefault();openSearch();}
  });
  $('#site-search-form').onsubmit=e=>{e.preventDefault();if(!e.isComposing)openSearch();};
  $('#site-search-input').oninput=updateSuggestions;$('#site-search-input').onfocus=()=>{if(!$('#search-dialog').open)updateSuggestions();};
  $('#site-search-form').addEventListener('focusout',e=>{if(!e.currentTarget.contains(e.relatedTarget))closeSuggestions();});
  $('#search-close').onclick=()=>$('#search-dialog').close();$('#global-search').oninput=updateSearch;
  $('#search-dialog').addEventListener('close',closeSuggestions);
  $('.dialog-close').onclick=()=>$('#detail-dialog').close();[$('#detail-dialog'),$('#search-dialog')].forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const b=d.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)d.close();}}));
  $('#menu-toggle').onclick=()=>{const open=$('#sidebar').classList.toggle('open');$('#menu-toggle').setAttribute('aria-expanded',String(open));};
  $('#print-button').onclick=()=>{$$('details.stage').forEach(d=>d.open=true);window.print();};
  $('#nav-monsters').textContent=M.length;$('#nav-weapons').textContent=A.length;
  window.addEventListener('hashchange',route);fillIcons();updateSearch();route();
})();
