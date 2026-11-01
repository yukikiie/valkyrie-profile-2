/* Linked acquisition, crafting and chapter-specific town dossiers. */
window.VP_CREATE_ITEM_GUIDE = function createItemGuide(env) {
  'use strict';
  const {weapons,extras,monsters,stages,locations,towns,crafting,esc,plain,num,icon,srcLinks,openDetail,openItem} = env;
  const $ = selector => document.querySelector(selector);
  const key = value => String(value??'').normalize('NFKC').replace(/[\s・]/g,'').toLocaleLowerCase();
  const stageById = new Map(stages.map(s=>[s.id,s]));
  const monsterById = new Map(monsters.map(m=>[m.id,m]));
  const catalog = [...weapons,...['armor','accessories','items','magic','sealstones'].flatMap(k=>extras[k]||[])];
  const byName = new Map();
  for(const r of catalog)for(const name of [r.jp,r.name,r.en,...(r.aliases||[])].filter(Boolean))if(!byName.has(key(name)))byName.set(key(name),r);
  const aliases = new Map((crafting.aliases||[]).map(a=>[key(a.from),a.to]));
  const canonical = name => {let current=String(name??'').trim();const seen=new Set();while(aliases.has(key(current))&&!seen.has(key(current))){seen.add(key(current));current=aliases.get(key(current));}return byName.get(key(current))?.jp||current;};
  const same = (a,b) => key(canonical(a))===key(canonical(b));
  const currency = name => /^(?:[\d,]+\s*)?(?:OTH|金貨|金錢)$/i.test(String(name));
  const label = name => byName.get(key(canonical(name)))?.name||String(name??'');
  function link(name,text){if(!name)return '—';if(currency(name))return esc(text||name);return `<button type="button" class="item-link" data-guide-item="${esc(canonical(name))}" title="查看取得位置、商店與配方">${esc(text||name)}</button>`;}
  function amount(row){const item=row.item||row.name||'';return `${link(item)} ${row.quantity==null?'<small>（數量未載明）</small>':`<b class="item-quantity">× ${num(row.quantity)}</b>`}`;}
  const shopRows = extras.shops||[];
  const events = towns.events||[];
  const allNames = new Set(catalog.flatMap(r=>[r.jp,r.name,r.en,...(r.aliases||[])]).filter(Boolean));
  for(const r of shopRows){allNames.add(r.jp||r.name);for(const m of r.materials||[])allNames.add(m.name||m.item);}
  for(const m of monsters)for(const d of m.drops||[])if(d.item)allNames.add(d.item);
  for(const e of events)for(const r of [...(e.requires||[]),...(e.rewards||[])])if(r.item)allNames.add(r.item);
  const escapedPattern = value => String(value).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const itemPattern = new RegExp([...allNames].filter(n=>String(n).length>=2&&!currency(n)).sort((a,b)=>b.length-a.length).map(escapedPattern).join('|'),'g');
  function rich(value){const text=plain(value);let html='',end=0;for(const match of text.matchAll(itemPattern)){html+=esc(text.slice(end,match.index))+link(match[0]);end=match.index+match[0].length;}return html+esc(text.slice(end));}
  const townNames = new Map((locations.areas||[]).filter(a=>a.kind==='城鎮').map(a=>[a.id,a.name]));
  Object.entries({asgard:'阿斯嘉特',traveller:'移動旅行商人',sg:'紅蓮迷宮入口'}).forEach(([id,name])=>townNames.set(id,name));
  for(const e of events)if(e.townId&&!townNames.has(e.townId))townNames.set(e.townId,e.townName||e.location||e.townId);
  const townPatterns = [['solde',/ゾルデ|索爾德|佐爾德/],['dipan-town',/ディパン|迪潘/],['coriander',/コリアンドル|科利安德|科里安德/],['villnore',/ヴィルノア|維爾諾亞/],['kalstad',/カルスタッド|卡爾斯塔德/],['crell',/クレルモンフェラン|克雷爾蒙費蘭/],['asgard',/アスガルド|アスカルド|阿斯嘉特/]];
  function townForShop(shop){const text=plain(shop);if(/旅行商人/.test(text)&&!/アスガルド|アスカルド|阿斯嘉特/.test(text))return 'traveller';return townPatterns.find(([,re])=>re.test(text))?.[0]||'traveller';}
  const townHref = (townId,chapter='all',event='') => `#towns/${encodeURIComponent(townId)}/${chapter}${event?'/'+encodeURIComponent(event):''}`;
  const townLink = (townId,text,chapter='all',event='') => `<a class="acquisition-link" href="${townHref(townId,chapter,event)}">${esc(text||townNames.get(townId)||townId)} →</a>`;
  const stageLink = (s,tab='map',target='',monster='') => s?`#walkthrough/${s.chapterId}/${s.id}/${tab}${target?'/'+encodeURIComponent(target):''}${monster?'/'+monster:''}`:'#maps';
  function recipeCard(r){const mats=r.materials||[],town=townForShop(r.shop);return `<article class="recipe-card" data-recipe-id="${esc(r.id)}" data-merchant-id="${esc(r.merchantId||'')}"><div class="recipe-heading"><strong>${link(r.jp||r.name,label(r.jp||r.name))}</strong><span class="pill ${mats.length?'gold':''}">${esc(r.type||'商店商品')}</span></div><p>${townLink(town,r.shop||townNames.get(town))}</p><p class="recipe-price">購買價格：<b>${r.price==null?'來源未載明':num(r.price)+' OTH'}</b></p>${mats.length?`<h5>先出售給這間店的素材</h5><ul class="material-list">${mats.map(m=>`<li>${amount(m)}</li>`).join('')}</ul>`:''}${r.resultQuantity?`<p>每份配方成品：<b>× ${num(r.resultQuantity)}</b></p>`:''}${r.unlockSpend!=null?`<p>熟客累計消費門檻：<b>${num(r.unlockSpend)} OTH</b>（售價另付）</p>`:''}${r.stockLimit!=null?`<p>來源記載庫存上限：<b>${num(r.stockLimit)}</b></p>`:''}${r.conditions||r.effect?`<p class="recipe-condition">${rich(r.conditions||r.effect)}</p>`:''}${r.notes?`<p class="map-note">${rich(r.notes)}</p>`:''}${srcLinks(r.sourceIds)}</article>`;}
  function recipes(name){const arr=shopRows.filter(r=>same(r.jp||r.name,name));return arr.length?`<section class="detail-section item-recipes"><h3>商店、價格與製作素材</h3><p class="details-explain">點素材名稱可查取得地點。配方數量是交給指定店家的所需數量；商品仍須符合該店熟客及劇情條件。</p><div class="recipe-grid">${arr.map(recipeCard).join('')}</div></section>`:'';}
  const treasureRows=[];
  for(const area of locations.areas||[])for(const t of area.treasures||[]){
    const stageIds=t.stageIds?.length?t.stageIds:area.stageIds||[];
    const names=plain(t.item||t.name).split(/[、；;]/).map(text=>{const match=text.trim().match(/^(.*?)(?:[×x]\s*(\d+))?$/);return {item:match?.[1]?.trim(),quantity:match?.[2]?Number(match[2]):null};});
    for(const n of names)if(n.item)treasureRows.push({...t,...n,quantity:n.quantity??(names.length===1?t.quantity:null),area,stageIds});
  }
  const regionalRows=[];
  for(const [stageId,rows] of Object.entries(window.VP_REGION_DROPS||{})){const s=stageById.get(stageId);if(s)for(const d of rows)regionalRows.push({...d,stage:s});}
  function splitMore(rows,render,limit=10){return rows.slice(0,limit).map(render).join('')+(rows.length>limit?`<details class="acquisition-more"><summary>展開其餘 ${rows.length-limit} 筆取得紀錄</summary>${rows.slice(limit).map(render).join('')}</details>`:'');}
  const section = (title,html) => html?`<section class="detail-section acquisition-section"><h3>${title}</h3>${html}</section>`:'';
  function acquisition(name){
    const target=canonical(name),treasures=treasureRows.filter(t=>same(t.item,target));
    const groups=new Map();
    for(const d of regionalRows.filter(d=>same(d.item,target))){const id=JSON.stringify([d.monsterId,d.part,d.kind,d.rate,d.quantity]);if(!groups.has(id))groups.set(id,{...d,visits:[]});groups.get(id).visits.push({...d.stage,condition:d.condition});}
    const drops=[...groups.values()];
    const rewards=events.flatMap(e=>(e.rewards||[]).filter(r=>same(r.item,target)).map(r=>({e,r})));
    const reunion=(extras.einherjar||[]).flatMap(person=>(person.releaseGifts||[]).filter(g=>same(g.item,target)).map(g=>({person,g})));
    let html='';
    const special=(window.VP_CRAFTING_ACQUISITION?.records||[]).filter(r=>same(r.item,target));
    if(special.length)html+=section('角色初期裝備與特殊取得',special.map(r=>`<article class="acquisition-row"><strong>${esc(r.character||monsterById.get(r.monsterId)?.name||'特殊取得')}</strong><p>${esc(r.location)}${r.quantity==null?'':' · × '+num(r.quantity)}</p><p>${rich(r.method)}</p>${r.condition?`<p class="treasure-warning">${rich(r.condition)}</p>`:''}${r.notes?`<p>${rich(r.notes)}</p>`:''}${r.stageId&&stageById.has(r.stageId)?`<a class="acquisition-link" href="${stageLink(stageById.get(r.stageId),r.monsterId?'drops':'map',r.monsterId?r.item:'',r.monsterId||'')}">${r.monsterId?'前往此怪物的當地掉落':'前往該章加入地點'} →</a>`:''}${srcLinks(r.sourceIds)}</article>`).join(''));
    if(treasures.length)html+=section('寶藏與場景拾取',splitMore(treasures,t=>`<article class="acquisition-row"><strong>${esc(t.area.name)}</strong><p>${esc(t.location||'位置未細分')}${t.quantity==null?'':' · × '+num(t.quantity)}</p>${t.method?`<p>${rich(t.method)}</p>`:''}${t.condition?`<p class="treasure-warning">時期／條件：${rich(t.condition)}</p>`:''}<div class="acquisition-links">${t.stageIds.map(id=>stageById.get(id)).filter(Boolean).map(s=>`<a href="${stageLink(s,'treasures',t.id)}">${esc(s.chapterTitle)}：前往寶藏位置 →</a>`).join('')}</div>${srcLinks(t.sourceIds)}</article>`));
    if(drops.length)html+=section('怪物掉落：所在地與目標部位',`<p class="details-explain">同一敵人的初訪、再訪及樓層分開標示；未記錄機率不代表必掉。</p>`+splitMore(drops,d=>{const m=monsterById.get(d.monsterId);return `<article class="acquisition-row"><strong><button type="button" class="item-link" data-monster="${esc(d.monsterId)}">${esc(m?.name||d.monsterId)}${m?.jp?' · '+esc(m.jp):''}</button></strong><p>部位：${esc(d.part||'未載明')} · ${esc(d.kind||'來源未分類')} · 機率：${d.rate==null?'未載明':esc(d.rate)+(typeof d.rate==='number'?'%':'')}${d.quantity==null?'':' · 數量 × '+num(d.quantity)}</p><div class="acquisition-links">${[...new Map(d.visits.map(s=>[s.id,s])).values()].map(s=>`<a href="${stageLink(s,'drops',d.item,d.monsterId)}">${esc(s.name)} · ${esc(s.chapterTitle)} →</a>${s.condition?'<small>'+esc(s.condition)+'</small>':''}`).join('')}</div>${srcLinks(d.sourceIds)}</article>`;}));
    if(rewards.length)html+=section('NPC 與事件獎勵',rewards.map(({e,r})=>`<article class="acquisition-row"><strong>${townLink(e.townId,e.townName||townNames.get(e.townId),'all',e.id)}</strong><p>${esc(e.npc||e.title)} · ${esc(e.location||'')}</p><p>${r.at!=null?'門檻／時機：'+esc(typeof r.at==='number'?`累計 ${r.at} 次`:r.at)+' · ':''}獎勵數量：${r.quantity==null?'來源未載明':num(r.quantity)}${r.note?' · '+rich(r.note):''}</p>${srcLinks(e.sourceIds)}</article>`).join(''));
    if(reunion.length)html+=section('解放英靈後再會',reunion.map(({person,g})=>`<article class="acquisition-row"><strong>${esc(person.name)}</strong><p>${esc(person.releaseLocation)} · ${esc(g.period)}</p><p>先讓此英靈加入並解放，再依時期尋找本人。每個遺物的候選互斥；不是所有人都能在同一輪出現。</p>${srcLinks(person.sourceIds)}</article>`).join(''));
    return html;
  }
  function uses(name){const rows=shopRows.flatMap(r=>(r.materials||[]).filter(m=>same(m.name||m.item,name)).map(m=>({r,m})));return rows.length?section('這個素材可以製作甚麼',splitMore(rows,({r,m})=>`<div class="acquisition-row">${link(r.jp||r.name)} · 每次配方需 <b>${num(m.quantity)}</b> 個<p>${townLink(townForShop(r.shop),r.shop)}</p></div>`)):'';}
  function open(name){
    const original=canonical(name),r=byName.get(key(original));
    const labels={type:'分類',effect:'效果',stats:'能力',rune:'符文',color:'符文顏色',resist:'抗性',price:'資料表價格',notes:'註記',cost:'返還晶石'};
    const facts=r?Object.entries(r).filter(([k,v])=>labels[k]&&v!=null&&v!=='').map(([k,v])=>`<dt>${labels[k]}</dt><dd>${rich(v)}${k==='price'?' OTH':''}</dd>`).join(''):'';
    const paths=acquisition(original),shops=recipes(original);
    openDetail(`<span class="eyebrow">ITEM & MATERIAL GUIDE</span><h2 class="detail-title" id="detail-title">${esc(r?.name||original)}</h2>${r?.jp&&r.jp!==r.name?`<p class="detail-jp">${esc(r.jp)}</p>`:''}${facts?`<dl class="item-facts">${facts}</dl>`:''}${paths}${shops}${uses(original)}${r?.obtain?section('原資料取得註記',`<p>${rich(r.obtain)}</p>`):''}${!paths&&!shops&&!r?.obtain?'<p class="notice">現有來源未提供可核實的取得位置，暫不推測；可從下方用途確認所需配方。</p>':''}${srcLinks(r?.sourceIds)}`);
  }
  const chapterLabel = id => id==='sg'?'紅蓮迷宮':/^ch\d$/.test(id)?`第 ${id.slice(2)} 章`:id;
  function eventCard(e,compact=false,namespace=''){return `<article class="town-event-card" id="town-event-${namespace?esc(namespace)+'-':''}${esc(e.id)}" data-town-event="${esc(e.id)}"><div class="eyebrow">${esc(e.townName||townNames.get(e.townId)||'城鎮事件')} · ${esc((e.chapters||[]).map(chapterLabel).join('／'))}</div><h3>${esc(e.title)}</h3><dl><dt>對象／位置</dt><dd><strong>${esc(e.npc||'居民')}</strong> · ${esc(e.location||'來源未細分位置')}</dd>${e.timing?`<dt>時期與期限</dt><dd class="event-timing">${rich(e.timing)}</dd>`:''}</dl>${e.requires?.length?`<h4>需要準備</h4><ul class="material-list">${e.requires.map(r=>`<li>${amount(r)}${r.note?`<p>${rich(r.note)}</p>`:''}${r.consumed===false?'<small>只需持有／確認；不交付消耗。</small>':''}</li>`).join('')}</ul>`:''}${e.steps?.length?`<ol class="quest-steps">${e.steps.map(step=>`<li>${rich(step)}</li>`).join('')}</ol>`:''}${e.rewards?.length?`<div class="table-wrap event-rewards"><table><thead><tr><th>門檻／時機</th><th>獎勵</th><th>數量</th></tr></thead><tbody>${e.rewards.map(r=>`<tr><td>${esc(r.at==null?'達成上述條件':typeof r.at==='number'?`累計 ${r.at} 次`:r.at)}</td><td>${link(r.item)}${r.note?`<small>${rich(r.note)}</small>`:''}</td><td>${r.quantity==null?'未載明':num(r.quantity)}</td></tr>`).join('')}</tbody></table></div>`:''}${e.notes?.length?`<div class="tips">${e.notes.map(note=>`<p>${rich(note)}</p>`).join('')}</div>`:''}${compact?townLink(e.townId,'查看此城 NPC、商人與商品','all',e.id):''}${srcLinks(e.sourceIds)}</article>`;}
  function chapterPanel(chapterId){
    const list=events.filter(e=>(e.chapters||[]).includes(chapterId));
    return '<section class="chapter-town-panel"><div class="section-heading"><h2>'+icon('humanoid')+' 本章城鎮、NPC 與補給</h2><a class="text-link" href="'+townHref('all',chapterId)+'">全部城鎮資料 →</a></div><p>含本章初訪提示與後續回城事件；請依每項時期、需求和門檻安排。點物品名稱可查實際來源。</p><div class="chapter-town-links">'+list.map(e=>'<details class="chapter-town-detail"><summary><span>'+esc(e.townName||townNames.get(e.townId))+'</span><strong>'+esc(e.title)+'</strong></summary>'+eventCard(e,true,'chapter-'+chapterId)+'</details>').join('')+'</div></section>';
  }
  function eventsForTown(townId,chapterId){const list=events.filter(e=>e.townId===townId&&(!chapterId||(e.chapters||[]).includes(chapterId)));return list.length?`<section class="town-local-events"><h4 class="location-group-title">${icon('humanoid')} NPC、餵食與章節事件</h4>${list.map(e=>eventCard(e,false,'stage-'+townId)).join('')}</section>`:'';}
  function merchantsAt(townId,chapterId='all'){
    return (crafting.merchants||[]).filter(m=>{
      if(m.id!==townId&&!(m.townIds||[]).includes(townId))return false;
      if(chapterId==='all')return true;
      if(m.id==='traveller'&&townId!=='traveller')return (m.visits||[]).some(v=>v.townId===townId&&v.chapter===(chapterId==='sg'?'ch6':chapterId));
      return (m.chapters||[]).includes(chapterId)||(chapterId==='sg'&&(m.chapters||[]).includes('ch6'));
    });
  }
  function merchantInfo(townId,chapterId='all'){
    const list=merchantsAt(townId,chapterId);
    return list.length?'<div class="merchant-grid">'+list.map(m=>'<article class="merchant-card"><h3>'+esc(m.name)+'</h3><p>'+rich(m.location||m.locations||'位置依劇情改變')+'</p><p>出現章節：'+esc((m.chapters||[]).map(chapterLabel).join('／'))+'</p>'+(m.conditions?'<p>'+rich(m.conditions)+'</p>':'')+(m.notes?'<p>'+rich(m.notes)+'</p>':'')+(m.id==='traveller'?townLink('traveller','查看同一行商人的完整庫存與配方',chapterId):'')+srcLinks(m.sourceIds)+'</article>').join('')+'</div>':'';
  }
  function shopsForTown(townId,chapterId='all'){
    const available=new Set(merchantsAt(townId,chapterId).map(m=>m.id));
    const rows=shopRows.filter(r=>townForShop(r.shop)===townId&&(chapterId==='all'||available.has(r.merchantId)));
    return rows.length?'<details class="town-shop-list"><summary>商店商品與製作配方 · '+rows.length+' 筆</summary><p class="map-note">此處合併列出這位商人不同進度的已知庫存，並非初到此章即可購齊；請依商品與商人的條件確認。</p><div class="recipe-grid">'+rows.map(recipeCard).join('')+'</div></details>':'';
  }
  function reunionForTown(townId){const pattern=townPatterns.find(([id])=>id===townId)?.[1];if(!pattern)return '';const rows=(extras.einherjar||[]).filter(r=>pattern.test(r.releaseLocation||''));return rows.length?`<details class="town-reunions"><summary>解放英靈後的再會 NPC · ${rows.length} 名候選</summary><p class="map-note">先讓對應英靈加入並解放，再於列明時期找本人。相同遺物的候選不能在同一輪全部加入，章節外的禮物不可當成本章固定獎勵。</p>${rows.map(r=>`<article class="acquisition-row"><h4>${esc(r.name)}</h4><p>${esc(r.releaseLocation)}</p>${r.id==='e07'?'<p class="treasure-warning">セレス 的 SG 再會金額有來源差異：青珠列 300,000 OTH，ZAPAnet 列 30,000 OTH；本表採青珠數值，未當作所有記載一致的實測值。</p>':''}<ul>${(r.releaseGifts||[]).map(g=>`<li>${esc(g.period)}：${rich(g.item)}</li>`).join('')}</ul>${srcLinks(r.sourceIds)}</article>`).join('')}</details>`:'';}
  function townPage(townId='all',chapterId='all'){
    if(!townNames.has(townId)&&townId!=='all')townId='all';
    const choices=[...townNames];const selected=townId==='all'?choices:choices.filter(([id])=>id===townId);
    return `<div class="notice">NPC 交付物、獎勵和製作素材都可以點擊查來源。動物獎勵以累計次數計算；打完迷宮後，仍需回城找原委託人領獎。</div><div class="filters"><label for="town-select">城鎮／商人</label><select id="town-select"><option value="all">全部地點</option>${choices.map(([id,name])=>`<option value="${esc(id)}" ${id===townId?'selected':''}>${esc(name)}</option>`).join('')}</select><label for="town-chapter">章節</label><select id="town-chapter"><option value="all">全部章節</option>${['ch1','ch2','ch3','ch4','ch5','ch6','sg'].map(id=>`<option value="${id}" ${chapterId===id?'selected':''}>${chapterLabel(id)}</option>`).join('')}</select></div>${crafting.mechanics?.paragraphs?.length?`<details class="crafting-rules"><summary>熟客商品、素材交付與購買方式</summary>${crafting.mechanics.paragraphs.map(p=>`<p>${rich(p)}</p>`).join('')}${srcLinks(crafting.mechanics.sourceIds)}</details>`:''}${selected.map(([id,name])=>{const rows=events.filter(e=>e.townId===id&&(chapterId==='all'||(e.chapters||[]).includes(chapterId)));return `<section class="town-dossier" data-town="${esc(id)}"><div class="section-heading"><h2>${esc(name)}</h2></div>${merchantInfo(id,chapterId)}${rows.map(e=>eventCard(e)).join('')}${!rows.length?'<p class="map-note">所選章節未列新增對話獎勵；商品和解放英靈再會仍需依各自條件確認。</p>':''}${shopsForTown(id,chapterId)}${reunionForTown(id)}</section>`;}).join('')}`;
  }
  document.addEventListener('click',event=>{const target=event.target.closest('[data-guide-item]');if(target){event.preventDefault();event.stopPropagation();openItem(target.dataset.guideItem);}});
  return {link,rich,open,recipes,recipeCard,acquisition,uses,eventCard,chapterPanel,eventsForTown,merchantInfo,shopsForTown,townPage,townHref,townLink,canonical,events};
};
