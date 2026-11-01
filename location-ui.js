/* Location dossiers: maps, position-based treasure notes and encounter-specific drops. */
window.VP_CREATE_LOCATION_UI = function createLocationUI(env) {
  'use strict';
  const {stages, monsters, extras, esc, plain, num, icon, visual, srcLinks, getProgress, saveProgress, toast, openItem} = env;
  const catalog = window.VP_LOCATIONS || {areas:[]};
  const encounters = window.VP_ENCOUNTERS || {regions:[]};
  const allDrops = window.VP_REGION_DROPS || {};
  const images = window.VP_MAP_ASSETS || {};
  const monsterById = new Map(monsters.map(m=>[m.id,m]));
  const stageById = new Map(stages.map(s=>[s.id,s]));
  const areaByStage = new Map();
  for(const area of catalog.areas||[])for(const id of area.stageIds||[]){if(!areaByStage.has(id))areaByStage.set(id,[]);areaByStage.get(id).push(area);}
  const regionByStage = new Map((encounters.regions||[]).flatMap(r=>(r.stageIds||[r.id]).map(id=>[id,r])));
  const states = new Map();
  const itemNames=new Map([...(window.VP_WEAPONS||[]),...['armor','items','accessories','sealstones'].flatMap(type=>extras[type]||[])].filter(r=>r.jp&&r.name&&r.jp!==r.name).map(r=>[r.jp,r.name]));
  const itemLabel=value=>{const original=plain(value),name=itemNames.get(original);return name?esc(name)+'<small class="item-original">'+esc(original)+'</small>':esc(original);};
  const key = text => plain(text).normalize('NFKC').toLocaleLowerCase();
  const $ = (selector,root=document)=>root.querySelector(selector);
  const $$ = (selector,root=document)=>[...root.querySelectorAll(selector)];
  const safe = url => typeof url==='string' && (/^https?:\/\//.test(url)||/^assets\/[\w./-]+$/.test(url)||/^data:image\/(?:png|gif|webp|jpeg|svg\+xml);base64,/.test(url));
  const stageArea = s => {
    const matches=areaByStage.get(s.id)||[];
    if(matches.length===1)return matches[0];
    if(!matches.length)return {id:s.id,name:s.name,jp:s.jp,maps:[],treasures:[],notes:[],sourceIds:s.sourceIds||[]};
    const unique=(values,keyer)=>[...new Map(values.map(v=>[keyer(v),v])).values()];
    return {id:s.id,name:s.name,jp:s.jp,maps:unique(matches.flatMap(a=>a.maps||[]),m=>m.id),treasures:unique(matches.flatMap(a=>a.treasures||[]),t=>t.id),npc:unique(matches.flatMap(a=>a.npc||[]),n=>n.id||n.name),notes:[...new Set(matches.flatMap(a=>a.notes||[]))],sourceIds:[...new Set(matches.flatMap(a=>a.sourceIds||[]))]};
  };
  const stageRegion = s => regionByStage.get(s.id) || {id:s.id,monsterIds:[],bossIds:[],note:'此地點的遭遇資料尚未核對。'};
  const lootFor = s => allDrops[stageRegion(s).id] || allDrops[s.id] || [];
  const treasuresFor = (s,a) => {
    const found=(a.treasures||[]).filter(t=>!t.stageIds?.length||t.stageIds.includes(s.id));
    return found.length?found:(s.treasures||[]).map((item,i)=>({id:`${s.id}-${i+1}`,item:plain(item),location:'請對照此地點的圖上標號與以下位置說明。',sourceIds:s.sourceIds}));
  };
  const mapsFor = (s,a) => (a.maps||[]).filter(m=>!m.stageIds?.length||m.stageIds.includes(s.id));
  function state(id){if(!states.has(id))states.set(id,{tab:'map',map:0,zoom:100,dropQuery:'',dropMonster:'all',dropPage:1});return states.get(id);}
  function credits(map){const links=[];if(safe(map.url))links.push(`<a href="${esc(map.url)}" target="_blank" rel="noopener noreferrer">攻略與原始圖例 ↗</a>`);if(safe(map.imageUrl))links.push(`<a href="${esc(map.imageUrl)}" target="_blank" rel="noopener noreferrer">原尺寸地圖 ↗</a>`);return `<div class="map-credit"><span>${esc(map.credit||map.attribution||'依已引用攻略整理')}</span>${links.join('')}</div>`;}
  function townMap(map,area,compact=false){
    const nodes=map.nodes||map.facilities||area.npc||[];
    if(!nodes.length)return `<div class="map-empty">${icon('map')}<p>${esc(map.note||'城鎮設施與拾取位置詳列於寶藏頁。')}</p></div>`;
    return `<div class="town-map ${compact?'compact':''}" role="group" aria-label="${esc(map.title||area.name)}設施配置示意"><div class="town-map-caption">${icon('compass')} ${esc(map.layoutLabel||'設施位置導覽')}<span>非等比例重繪</span></div><div class="town-street">${nodes.map((n,i)=>{const name=typeof n==='string'?n:n.label||n.name;const note=typeof n==='string'?'':n.relative||n.location||n.detail||n.description||'';const type=typeof n==='string'?'house':n.kind||n.type||'house';return `<div class="town-building ${esc(type)}"><span class="town-building-roof" aria-hidden="true"></span><span class="town-building-number">${esc(n.marker||n.pinId||String(i+1).padStart(2,'0'))}</span>${icon(/shop|商|武器/.test(type)?'sword':/inn|宿/.test(type)?'book':/church|教会|教堂/.test(type)?'gate':/exit|入口|出口/.test(type)?'compass':'humanoid')}<strong>${esc(name)}</strong>${note&&!compact?`<p>${esc(note)}</p>`:''}${n.items?.length&&!compact?`<small>${esc(plain(n.items))}</small>`:''}</div>`;}).join('')}</div>${!compact?`<p class="map-note">${esc(map.note||'依來源文字重繪設施與收集位置；未確認實際比例與距離。')}</p>`:''}</div>`;
  }
  function mapContent(s,a,map,index){
    if(!map)return `<div class="map-empty">${icon('map')}<h4>此處為劇情或連續戰鬥區段</h4><p>${esc(a.mapUnavailable||'可對照同一地區前一區段的配置圖；此區段的事件與戰鬥仍獨立列示。')}</p></div>`;
    if(map.kind==='town'||(map.kind==='schematic'&&(map.nodes||map.facilities)))return townMap(map,a);
    const src=images[map.imageUrl]?.src||map.localImageUrl||map.imageUrl;
    if(!safe(src))return `<div class="map-empty">${icon('map')}<p>${esc(map.note||'此區尚未找到可核實的配置原圖。')}</p></div>`;
    const pins=(map.pins||[]).filter(p=>Number.isFinite(p.x)&&Number.isFinite(p.y));
    return `<div class="map-canvas" tabindex="0" aria-label="${esc(map.title)}，可水平與垂直捲動"><div class="map-image-wrap" data-map-image-wrap="${esc(s.id)}" style="width:${state(s.id).zoom}%"><img class="map-image" src="${esc(src)}" alt="${esc(map.title||a.name)}配置地圖；寶箱標號請對照下方寶藏分頁" loading="lazy" decoding="async" data-map-image="${esc(s.id)}">${pins.map(p=>`<button class="map-pin ${esc(p.kind||'treasure')}" style="left:${p.x}%;top:${p.y}%" data-map-pin="${esc(p.id)}" data-location="${esc(s.id)}" aria-label="地圖標記 ${esc(p.label)}：${esc(p.item||p.detail||'')}">${esc(p.label)}</button>`).join('')}</div></div><div class="map-load-error" hidden>地圖暫時無法載入，請使用下方原始地圖連結。</div>${map.note?`<p class="map-note">${esc(map.note)}</p>`:''}`;
  }
  function mapPane(s,a){
    const maps=mapsFor(s,a), st=state(s.id);if(st.map>=maps.length)st.map=0;const map=maps[st.map];
    return `<div class="map-viewer" data-viewer="${esc(s.id)}"><div class="map-toolbar"><label>配置圖 <select data-map-select="${esc(s.id)}" aria-label="選擇${esc(s.name)}地圖">${maps.length?maps.map((m,i)=>`<option value="${i}" ${i===st.map?'selected':''}>${esc(m.title||`地圖 ${i+1}`)}</option>`).join(''):'<option>事件區段</option>'}</select></label><div class="map-zoom-controls"><button data-map-zoom="-25" data-location="${esc(s.id)}" aria-label="縮小地圖">−</button><output data-zoom-label="${esc(s.id)}">${st.zoom}%</output><button data-map-zoom="25" data-location="${esc(s.id)}" aria-label="放大地圖">＋</button><button data-map-zoom="reset" data-location="${esc(s.id)}">重設</button><button data-map-expand="${esc(s.id)}" aria-label="展開地圖">${icon('map')} 展開</button></div></div><div class="map-display" id="location-map-${esc(s.id)}">${mapContent(s,a,map,st.map)}</div><div class="map-legend"><span>◆ 寶箱／物品請對照原圖編號</span><span>★ 機關　A／a 遺物標記</span><span>可放大至 300% 查看文字</span></div>${map?credits(map):''}</div>${a.notes?.length?`<div class="location-area-notes">${a.notes.filter(n=>!/404|fetch|本次核對/.test(plain(n))).map(n=>`<p>${esc(plain(n))}</p>`).join('')}</div>`:''}${srcLinks(a.sourceIds)}`;
  }
  function treasurePane(s,a){
    const list=treasuresFor(s,a),npc=(a.npc||[]).filter(n=>!n.stageIds?.length||n.stageIds.includes(s.id));
    return `<div class="location-pane-heading"><h4>${icon('check')} 寶藏配置與拾取方法 <span>${list.length}</span></h4><p>先看圖上編號，再對照位置、取得方法與章節條件。完成記錄會保留在此瀏覽器。</p></div>${list.length?`<div class="filters"><input data-treasure-search="${esc(s.id)}" placeholder="搜尋物品、圖號、房間或機關…" aria-label="搜尋此地點寶藏"></div><div class="treasure-grid">${list.map((t,i)=>{const id=t.id||`${a.id}-${i+1}`,pkey='treasure:'+id,marker=t.marker||t.mapLabel||mapsFor(s,a).flatMap(m=>m.pins||[]).find(p=>p.id===t.pinId)?.label||String(i+1).padStart(2,'0');return `<article class="treasure-card ${getProgress()[pkey]?'completed':''}" data-treasure-card data-treasure-key="${esc(key(t))}" id="treasure-${esc(s.id)}-${esc(id)}"><div class="treasure-card-top"><span class="treasure-marker">${esc(marker)}</span>${t.kind?`<span class="pill">${esc(({chest:'寶箱',eventPickup:'場景拾取',npc:'居民獎勵',battleReward:'戰後獎勵'})[t.kind]||t.kind)}</span>`:''}<label><input type="checkbox" data-progress="${esc(pkey)}" ${getProgress()[pkey]?'checked':''}> 已取得</label></div><h5>${itemLabel(t.item||t.items||t.name)}</h5><dl>${t.location?`<dt>位置</dt><dd>${esc(plain(t.location))}</dd>`:''}${t.method?`<dt>取得方法</dt><dd>${esc(plain(t.method))}</dd>`:''}${t.trap?`<dt>陷阱</dt><dd class="treasure-warning">${esc(plain(t.trap))}</dd>`:''}${t.condition?`<dt>時期／條件</dt><dd>${esc(plain(t.condition))}</dd>`:''}</dl>${t.mapId?`<button class="text-link" data-treasure-map="${esc(t.mapId)}" data-location="${esc(s.id)}" data-pin="${esc(t.pinId||'')}">在配置圖中對照 →</button>`:''}${srcLinks(t.sourceIds)}</article>`;}).join('')}</div>`:`<div class="map-empty">${icon('check')}<p>${esc(a.noTreasureNote||'此區段沒有另外記錄可拾取的寶箱；劇情贈禮與地區委託請參考下列設施或通關步驟。')}</p></div>`}${npc.length?`<div class="location-pane-heading"><h4>${icon('humanoid')} 設施、居民與城鎮獎勵</h4></div><div class="treasure-grid">${npc.map(n=>`<article class="treasure-card"><h5>${esc(n.name||n.label)}</h5><dl>${[['位置',n.location||n.relative],['互動',n.action||n.detail],['獎勵',n.reward],['條件',n.condition]].filter(([,v])=>v).map(([label,value])=>`<dt>${label}</dt><dd>${esc(plain(value))}</dd>`).join('')}</dl>${srcLinks(n.sourceIds)}</article>`).join('')}</div>`:''}`;
  }
  function monstersPane(s,r){
    const ordinary=(r.monsterIds||[]).map(id=>monsterById.get(id)).filter(Boolean);
    const bosses=(r.bossIds||[]).map(id=>monsterById.get(id)).filter(Boolean);
    const card=m=>`<article class="location-monster-card"><button class="location-monster-open" data-monster="${esc(m.id)}" aria-label="查看${esc(m.name)}完整數值">${visual(m)}<span class="location-monster-info"><strong>${esc(m.name)}</strong><small>${esc(m.jp)}</small><span class="pill">HP ${num(m.hp)} · 來源表記錄</span></span></button>${r.encounterNotes?.[m.id]?`<p class="location-encounter-note">${esc(r.encounterNotes[m.id])}</p>`:''}<div class="location-monster-actions"><button data-regional-monster-drops="${esc(m.id)}" data-location="${esc(s.id)}">查看此處掉落 →</button><button data-monster="${esc(m.id)}">能力與抗性 ↗</button></div></article>`;
    return `<div class="location-pane-heading"><h4>${icon('dragon')} ${r.peaceful?'城鎮遭遇說明':'當地怪物與頭目'}</h4><p>${esc(r.note||'同一地區的首次與再訪、各樓層及頭目戰分開整理。')}</p></div>${r.peaceful?`<div class="map-empty">${icon('shield')}<h4>此處沒有一般魔物遭遇</h4><p>商店、居民與拾取物請查「寶藏」分頁。鄰近迷宮的怪物不混列到城鎮。</p></div>`:`${ordinary.length?`<h5 class="location-group-title">一般遭遇 <span>${ordinary.length}</span></h5><div class="location-monsters">${ordinary.map(card).join('')}</div>`:''}${bosses.length?`<h5 class="location-group-title">頭目／固定或特殊戰 <span>${bosses.length}</span></h5><div class="location-monsters">${bosses.map(card).join('')}</div>`:''}${!ordinary.length&&!bosses.length?'<p class="map-empty">此事件區段的敵人配置請參考相鄰地點與下方劇情戰說明。</p>':''}`}${r.rosterScopeLabel?`<p class="map-note">${esc(r.rosterScopeLabel)}</p>`:''}${srcLinks(r.sourceIds)}`;
  }
  function dropRows(s){
    const st=state(s.id),list=lootFor(s),q=key(st.dropQuery);
    const filtered=list.filter(d=>(st.dropMonster==='all'||d.monsterId===st.dropMonster)&&(!q||key([d,monsterById.get(d.monsterId)?.name,monsterById.get(d.monsterId)?.jp]).includes(q)));
    const pageSize=30,pages=Math.max(1,Math.ceil(filtered.length/pageSize));st.dropPage=Math.min(st.dropPage,pages);
    return `<div class="regional-drop-count" aria-live="polite">${filtered.length} 筆符合的部位／掉落紀錄${st.dropMonster!=='all'?' · 已限定敵人':''}</div><div class="table-wrap location-drop-table"><table><thead><tr><th>道具／素材</th><th>敵人</th><th>部位／條件</th><th>掉落類型</th><th>機率</th></tr></thead><tbody>${filtered.slice((st.dropPage-1)*pageSize,st.dropPage*pageSize).map(d=>{const m=monsterById.get(d.monsterId);return `<tr><td><button class="loot-item" data-loot-item="${esc(d.item)}">${itemLabel(d.item)}</button>${d.quantity?`<small class="drop-quantity"> ×${esc(d.quantity)}</small>`:''}</td><td><button class="drop-enemy-link" data-monster="${esc(d.monsterId)}">${esc(m?.name||d.monsterId)}<small>${esc(m?.jp||'')}</small></button></td><td>${esc(d.part||'原資料未指定部位')}${d.condition?`<small class="drop-condition">${esc(d.condition)}</small>`:''}</td><td><span class="pill ${/領袖|戰後|初回/.test(d.kind)?'gold':''}">${esc(d.kind||'來源未註明')}</span></td><td>${d.rate==null?'未載明':esc(d.rate)+(typeof d.rate==='number'?'%':'')}</td></tr>`;}).join('')||'<tr><td colspan="5" class="empty">沒有符合條件的掉落資料。</td></tr>'}</tbody></table></div><div class="pagination"><button data-regional-drop-page="${st.dropPage-1}" data-location="${esc(s.id)}" ${st.dropPage===1?'disabled':''}>← 上一頁</button><span>${st.dropPage} / ${pages}</span><button data-regional-drop-page="${st.dropPage+1}" data-location="${esc(s.id)}" ${st.dropPage===pages?'disabled':''}>下一頁 →</button></div>`;
  }
  function dropsPane(s,r){
    const list=lootFor(s),ids=[...new Set(list.map(d=>d.monsterId))];
    if(!list.length)return `<div class="location-pane-heading"><h4>${icon('check')} 當地掉落</h4></div><div class="map-empty">${icon(r.peaceful?'humanoid':'check')}<p>${r.peaceful?'城鎮沒有一般魔物掉落；拾取物、對話與委託獎勵請看「寶藏」分頁。':'此劇情區段沒有另外確認的素材掉落紀錄；請參考同地點前後區段。'}</p></div>`;
    return `<div class="location-pane-heading"><h4>${icon('check')} 當地掉落與素材採集</h4><p>已按本次到訪與樓層整理，區分部位破壞、擊破、領袖獎勵與一次性戰後獎勵。</p></div><div class="filters"><input data-regional-drop-search="${esc(s.id)}" value="${esc(state(s.id).dropQuery)}" placeholder="搜尋素材、敵人或部位…" aria-label="搜尋此地點掉落"><select data-regional-drop-monster="${esc(s.id)}" aria-label="篩選此地點敵人"><option value="all">所有當地怪物</option>${ids.map(id=>`<option value="${esc(id)}" ${state(s.id).dropMonster===id?'selected':''}>${esc(monsterById.get(id)?.name||id)}</option>`).join('')}</select></div><div class="regional-drop-results" data-regional-drop-results="${esc(s.id)}">${dropRows(s)}</div><p class="map-note">未載明機率不是 0%，也不代表必掉。首次劇情獎勵不能當成可重複刷取的部位素材。</p>${srcLinks(r.sourceIds)}`;
  }
  function pane(s,type){const a=stageArea(s),r=stageRegion(s);return type==='map'?mapPane(s,a):type==='treasures'?treasurePane(s,a):type==='monsters'?monstersPane(s,r):dropsPane(s,r);}
  function render(s){
    const a=stageArea(s),r=stageRegion(s),st=state(s.id),chests=treasuresFor(s,a).length,monsterCount=new Set([...(r.monsterIds||[]),...(r.bossIds||[])]).size;
    return `<section class="location-dossier" data-dossier="${esc(s.id)}"><div class="dossier-heading"><div><span class="eyebrow">LOCATION ARCHIVE</span><h3>${icon('compass')} ${esc(a.name||s.name)}探索資料</h3></div><div class="area-chips"><span>配置圖 ${mapsFor(s,a).length}</span><span>寶藏 ${chests}</span><span>怪物 ${monsterCount}</span><span>掉落 ${lootFor(s).length}</span></div></div><div class="location-tabs" role="tablist" aria-label="${esc(s.name)}攻略分類">${[['map','地圖',icon('map')],['treasures','寶藏',icon('check')],['monsters','怪物',icon('dragon')],['drops','掉落',icon('sword')]].map(([id,label,symbol])=>`<button class="${st.tab===id?'active':''}" role="tab" aria-selected="${st.tab===id}" aria-controls="loc-${esc(s.id)}-${id}" id="tab-${esc(s.id)}-${id}" data-location-tab="${id}" data-location="${esc(s.id)}">${symbol}<span>${label}</span></button>`).join('')}</div>${['map','treasures','monsters','drops'].map(type=>`<div class="location-section" role="tabpanel" id="loc-${esc(s.id)}-${type}" aria-labelledby="tab-${esc(s.id)}-${type}" data-location-pane="${type}" ${st.tab!==type?'hidden':''}>${st.tab===type?pane(s,type):''}</div>`).join('')}</section>`;
  }
  function showTab(id,type){
    const s=stageById.get(id),root=$(`[data-dossier="${id}"]`);if(!s||!root)return;
    const st=state(id);st.tab=type;
    $$('[data-location-tab]',root).forEach(b=>{const on=b.dataset.locationTab===type;b.classList.toggle('active',on);b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1;});
    $$('[data-location-pane]',root).forEach(p=>{const active=p.dataset.locationPane===type;p.hidden=!active;if(active&&!p.childElementCount)p.innerHTML=pane(s,type);});
  }
  function refreshMap(id){const s=stageById.get(id),panel=$(`#loc-${id}-map`);if(s&&panel)panel.innerHTML=mapPane(s,stageArea(s));}
  function refreshDrops(id){const s=stageById.get(id),root=$(`[data-regional-drop-results="${id}"]`);if(s&&root)root.innerHTML=dropRows(s);}
  document.addEventListener('click',e=>{
    const tab=e.target.closest('[data-location-tab]');if(tab){showTab(tab.dataset.location,tab.dataset.locationTab);return;}
    const zoom=e.target.closest('[data-map-zoom]');if(zoom){const id=zoom.dataset.location,st=state(id);st.zoom=zoom.dataset.mapZoom==='reset'?100:Math.min(300,Math.max(75,st.zoom+Number(zoom.dataset.mapZoom)));const wrap=$(`[data-map-image-wrap="${id}"]`);if(wrap)wrap.style.width=st.zoom+'%';const output=$(`[data-zoom-label="${id}"]`);if(output)output.textContent=st.zoom+'%';return;}
    const expand=e.target.closest('[data-map-expand]');if(expand){const viewer=$(`[data-viewer="${expand.dataset.mapExpand}"]`);if(document.fullscreenElement)document.exitFullscreen?.();else viewer?.requestFullscreen?.().catch(()=>viewer.classList.toggle('expanded'));return;}
    const mapLink=e.target.closest('[data-treasure-map]');if(mapLink){const id=mapLink.dataset.location,s=stageById.get(id),maps=mapsFor(s,stageArea(s)),index=maps.findIndex(m=>m.id===mapLink.dataset.treasureMap);if(index>=0)state(id).map=index;showTab(id,'map');refreshMap(id);$(`#loc-${id}-map`)?.scrollIntoView({block:'start',behavior:'smooth'});if(mapLink.dataset.pin)setTimeout(()=>{$(`#loc-${id}-map [data-map-pin="${mapLink.dataset.pin}"]`)?.classList.add('highlight');},100);return;}
    const pin=e.target.closest('[data-map-pin]');if(pin){const s=stageById.get(pin.dataset.location);const marker=mapsFor(s,stageArea(s)).flatMap(m=>m.pins||[]).find(p=>p.id===pin.dataset.mapPin);const id=marker?.treasureIds?.[0]||pin.dataset.mapPin;showTab(pin.dataset.location,'treasures');const target=document.getElementById('treasure-'+s.id+'-'+id);target?.scrollIntoView({block:'center',behavior:'smooth'});target?.classList.add('highlight');return;}
    const dropLink=e.target.closest('[data-regional-monster-drops]');if(dropLink){const id=dropLink.dataset.location,st=state(id);st.dropMonster=dropLink.dataset.regionalMonsterDrops;st.dropPage=1;showTab(id,'drops');const select=$(`[data-regional-drop-monster="${id}"]`);if(select)select.value=st.dropMonster;refreshDrops(id);return;}
    const dropPage=e.target.closest('[data-regional-drop-page]');if(dropPage&&!dropPage.disabled){state(dropPage.dataset.location).dropPage=Number(dropPage.dataset.regionalDropPage);refreshDrops(dropPage.dataset.location);return;}
    const item=e.target.closest('[data-loot-item]');if(item){openItem?.(item.dataset.lootItem);return;}
  });
  document.addEventListener('input',e=>{
    const input=e.target;if(input.dataset.treasureSearch){const root=$(`#loc-${input.dataset.treasureSearch}-treasures`),q=key(input.value);$$('[data-treasure-card]',root).forEach(card=>card.hidden=q&&!card.dataset.treasureKey.includes(q));}
    if(input.dataset.regionalDropSearch){const id=input.dataset.regionalDropSearch;state(id).dropQuery=input.value;state(id).dropPage=1;refreshDrops(id);}
  });
  document.addEventListener('change',e=>{const input=e.target;if(input.dataset.mapSelect){state(input.dataset.mapSelect).map=Number(input.value);state(input.dataset.mapSelect).zoom=100;refreshMap(input.dataset.mapSelect);}if(input.dataset.regionalDropMonster){state(input.dataset.regionalDropMonster).dropMonster=input.value;state(input.dataset.regionalDropMonster).dropPage=1;refreshDrops(input.dataset.regionalDropMonster);}if(input.dataset.progress?.startsWith('treasure:'))$$('[data-progress]').filter(node=>node.dataset.progress===input.dataset.progress).forEach(node=>{node.checked=input.checked;node.closest('.treasure-card')?.classList.toggle('completed',input.checked);});});
  document.addEventListener('keydown',e=>{if(e.target.matches('[data-location-tab]')&&['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const tabs=$$('[data-location-tab]',e.target.closest('.location-tabs')),i=tabs.indexOf(e.target);const next=e.key==='Home'?tabs[0]:e.key==='End'?tabs.at(-1):tabs[(i+(e.key==='ArrowLeft'?-1:1)+tabs.length)%tabs.length];showTab(next.dataset.location,next.dataset.locationTab);next.focus();}});
  document.addEventListener('error',e=>{if(e.target.matches?.('[data-map-image]')){const v=e.target.closest('.map-viewer'),error=$('.map-load-error',v);if(error)error.hidden=false;}},true);
  function preview(s){const a=stageArea(s),map=mapsFor(s,a)[0];if(!map)return `<div class="map-thumb empty">${icon('map')}<span>劇情區段配置</span></div>`;if(map.kind==='town'||map.kind==='schematic')return `<div class="map-thumb town-preview">${townMap(map,a,true)}</div>`;const src=images[map.imageUrl]?.src||map.localImageUrl||map.imageUrl;return safe(src)?`<div class="map-thumb"><img src="${esc(src)}" loading="lazy" alt="${esc(a.name)}配置圖預覽"></div>`:'<div class="map-thumb empty">配置圖請查看章節</div>';}
  function counts(s){const a=stageArea(s),r=stageRegion(s);return {maps:mapsFor(s,a).length,treasures:treasuresFor(s,a).length,monsters:new Set([...(r.monsterIds||[]),...(r.bossIds||[])]).size,drops:lootFor(s).length};}
  return {render,showTab,preview,counts,area:stageArea,region:stageRegion};
};
