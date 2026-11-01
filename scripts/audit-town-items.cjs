/* Check actionable recipe acquisition paths, rather than name-only catalog coverage. */
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const context={window:{}};
vm.createContext(context);
for(const name of ['walkthrough','monsters','equipment','items','reference','locations','encounters','crafting','town-events-early','town-events-late','crafting-acquisition']){
  const filename=path.join(root,'data',name+'.js');
  vm.runInContext(fs.readFileSync(filename,'utf8'),context,{filename});
}
const d=JSON.parse(JSON.stringify(context.window));
const C=d.VP_CRAFTING;
const special=d.VP_CRAFTING_ACQUISITION;
const events=[...d.VP_TOWN_EARLY.events,...d.VP_TOWN_LATE.events];
const chapters=d.VP_WALKTHROUGH.chapters;
const stages=chapters.flatMap(chapter=>chapter.stages.map(s=>({...s,chapterId:chapter.id})));
const stageById=new Map(stages.map(s=>[s.id,s]));
const monsterById=new Map(d.VP_MONSTERS.map(m=>[m.id,m]));
const merchantById=new Map(C.merchants.map(m=>[m.id,m]));
const sources=[...(d.VP_MONSTER_SOURCES||[]),...Object.values(d).flatMap(value=>value?.sources||[])];
const sourceById=new Map(sources.map(s=>[s.id,s]));
function checkSources(record,label){
  assert.ok(record.sourceIds?.length,label+' has no factual source');
  for(const id of record.sourceIds)assert.ok(sourceById.has(id),label+' unknown source '+id);
}
const key=value=>String(value??'').normalize('NFKC').replace(/[\s・]/g,'').toLocaleLowerCase();
const aliasByKey=new Map();
for(const a of C.aliases){
  checkSources(a,'alias '+a.from);
  assert.ok(key(a.from)!==key(a.to),'self alias '+a.from);
  assert.ok(!aliasByKey.has(key(a.from))||aliasByKey.get(key(a.from))===a.to,'ambiguous alias '+a.from);
  aliasByKey.set(key(a.from),a.to);
}
function canonical(value){
  const visited=new Set();
  let current=String(value??'').trim();
  while(aliasByKey.has(key(current))){
    assert.ok(!visited.has(key(current)),'alias cycle '+value);
    visited.add(key(current));
    current=aliasByKey.get(key(current));
  }
  return current.normalize('NFKC').trim();
}
const same=(a,b)=>key(canonical(a))===key(canonical(b));
const currency=value=>/^(?:[\d,]+\s*)?(?:OTH|金錢|金貨)$/i.test(String(value));
const original=d.VP_ITEMS_EXTRA.shops;
const correctionById=new Map(C.recipeCorrections.map(c=>[c.shopId,c]));
const shops=[...original,...C.extraInventory,...C.extraRecipes].map(s=>({...s,...correctionById.get(s.id)}));
assert.equal(new Set(shops.map(s=>s.id)).size,shops.length,'duplicate shop record');
for(const correction of C.recipeCorrections)assert.ok(original.some(s=>s.id===correction.shopId),'orphan correction '+correction.shopId);
const catalog=[...d.VP_WEAPONS,...d.VP_EQUIPMENT_EXTRA.armor,...d.VP_ITEMS_EXTRA.accessories,...d.VP_ITEMS_EXTRA.items];
const catalogNames=new Set(catalog.map(r=>key(canonical(r.jp))));
for(const s of shops){
  assert.ok(merchantById.has(s.merchantId),'unknown merchant '+s.id);
  checkSources(s,s.id);
  assert.ok(Number.isFinite(s.price)&&s.price>0,'missing/invalid price '+s.id);
  for(const m of s.materials){
    assert.ok(Number.isInteger(m.quantity)&&m.quantity>0,'invalid recipe material quantity '+s.id+'/'+m.name);
    assert.ok(catalogNames.has(key(canonical(m.name))),'material has no identity '+m.name);
  }
}
for(const m of C.merchants){
  checkSources(m,'merchant '+m.id);
  assert.ok(m.location&&m.conditions,'merchant lacks practical location/conditions '+m.id);
}
assert.ok(!merchantById.get('traveller').townIds.includes('asgard'),'Asgard stock merged with human merchant');
assert.ok(merchantById.get('asgard-merchant').townIds.includes('asgard'));
assert.equal(new Set(events.map(e=>e.id)).size,events.length,'duplicate town event');
for(const e of events){
  checkSources(e,'event '+e.id);
  assert.ok(e.townId&&e.npc&&e.location&&e.chapters.length&&e.steps.length,'incomplete NPC instructions '+e.id);
  for(const chapter of e.chapters)assert.ok(chapters.some(c=>c.id===chapter),'event unknown chapter '+e.id+'/'+chapter);
  for(const row of [...e.requires,...e.rewards])assert.ok(row.item&&Number.isInteger(row.quantity)&&row.quantity>0,'invalid NPC item/currency count '+e.id);
}
for(const chapter of chapters.filter(c=>c.id!=='sg'))assert.ok(events.some(e=>e.chapters.includes(chapter.id)),'chapter lacks NPC coverage '+chapter.id);
const drops=Object.entries(d.VP_REGION_DROPS).flatMap(([stageId,rows])=>rows.map(r=>({...r,stageId})));
const treasures=d.VP_LOCATIONS.areas.flatMap(area=>area.treasures.flatMap(t=>{
  const parts=String(t.item||t.name||'').split(/[、；;]/).map(value=>value.trim()).filter(Boolean);
  return parts.map(value=>{
    const match=value.match(/^(.*?)(?:[×x]\s*(\d+))?$/);
    return {...t,item:match[1].trim(),quantity:match[2]?Number(match[2]):parts.length===1?t.quantity??null:null,area,
      stageIds:t.stageIds?.length?t.stageIds:area.stageIds};
  });
}));
const gifts=d.VP_EQUIPMENT_EXTRA.einherjar.flatMap(person=>person.releaseGifts.map(g=>({...g,person})));
for(const r of special.records){
  checkSources(r,'special acquisition '+r.id);
  assert.ok(r.item&&r.location&&r.method&&r.condition,'incomplete special acquisition '+r.id);
  assert.equal(stageById.get(r.stageId)?.chapterId,r.chapter,'wrong special acquisition chapter '+r.id);
  assert.ok(r.quantity==null||(Number.isInteger(r.quantity)&&r.quantity>0),'invalid special acquisition count '+r.id);
  if(r.monsterId)assert.ok(monsterById.has(r.monsterId),'unknown acquisition monster '+r.id);
}
const materials=[...new Set(shops.flatMap(s=>s.materials.map(m=>canonical(m.name))))].sort();
const products=[...new Set(shops.filter(s=>s.materials.length).map(s=>canonical(s.jp)))].sort();
assert.equal(materials.length,146,'material coverage baseline changed; review the report');
assert.equal(products.length,65,'recipe product baseline changed; review the report');
const coverage=materials.map(item=>({item,
  drops:drops.filter(r=>same(r.item,item)),
  treasures:treasures.filter(t=>same(t.item,item)),
  events:events.flatMap(e=>e.rewards.filter(r=>same(r.item,item)).map(r=>({...r,event:e}))),
  gifts:gifts.filter(g=>same(g.item,item)),
  shops:shops.filter(s=>same(s.jp,item)),
  special:special.records.filter(r=>same(r.item,item))
}));
for(const r of coverage){
  assert.ok(r.drops.length+r.treasures.length+r.events.length+r.gifts.length+r.shops.length+r.special.length,'no actionable acquisition '+r.item);
  for(const drop of r.drops){
    checkSources(drop,'material drop '+r.item);
    assert.ok(stageById.has(drop.stageId)&&monsterById.has(drop.monsterId),'material drop cannot route '+r.item);
    const region=d.VP_ENCOUNTERS.regions.find(region=>region.id===drop.stageId);
    assert.ok([...region.monsterIds,...region.bossIds].includes(drop.monsterId),'material routed to wrong visit/floor '+r.item);
  }
  for(const treasure of r.treasures){
    checkSources(treasure,'material treasure '+r.item);
    assert.ok(treasure.location&&treasure.stageIds.some(id=>stageById.has(id)),'material treasure has no route/location '+r.item);
    assert.ok(treasure.quantity==null||(Number.isInteger(treasure.quantity)&&treasure.quantity>0),'invalid material treasure count '+r.item);
  }
  for(const g of r.gifts)assert.ok(g.person.releaseLocation&&g.period,'incomplete released gift '+r.item);
}
// An item merely appearing in another recipe is insufficient: trace to external roots.
// Recipe/event edges require ALL prerequisite items; normal purchases, drops,
// located treasure, initial gear and released-character gifts are external roots.
const reachable=new Set();
const add=value=>reachable.add(key(canonical(value)));
for(const r of drops)add(r.item);
for(const t of treasures)if(t.location&&t.stageIds.some(id=>stageById.has(id)))add(t.item);
for(const g of gifts)if(g.person.releaseLocation&&g.period)add(g.item);
for(const r of special.records)add(r.item);
for(const s of shops.filter(s=>!s.materials.length))add(s.jp);
const edges=[...shops.filter(s=>s.materials.length).map(s=>({product:s.jp,needs:s.materials.map(m=>m.name)})),
  ...events.flatMap(e=>e.rewards.map(r=>({product:r.item,needs:e.requires.map(r=>r.item).filter(item=>!currency(item))})))];
let changed=true;
while(changed){
  changed=false;
  for(const edge of edges)if(!reachable.has(key(canonical(edge.product)))&&edge.needs.every(n=>reachable.has(key(canonical(n))))){add(edge.product);changed=true;}
}
const unrooted=materials.filter(item=>!reachable.has(key(canonical(item))));
assert.deepEqual(unrooted,[],'ingredient is trapped in a closed source cycle or missing a prerequisite root');
const byEvent=new Map(events.map(e=>[e.id,e]));
const animalSpecs=[['solde-cat-feeding','海鮮肉',['狩られたネズミ','尻尾の切れたトカゲ','不幸な青い鳥','ねこのふん']],
  ['coriander-chicken-feeding','骨クズ',['ひよこのえさ','野菜くず','貝殻入りのえさ','とりのふん']],
  ['villnore-dog-feeding','骨付き肉',['しゃぶった骨','かじった靴','ぼろぼろの布','いぬのふん']]];
for(const [id,food,rewards] of animalSpecs){
  const e=byEvent.get(id);
  assert.equal(e.requires.find(r=>r.item===food)?.quantity,15,id+' food total must be 15, not 31');
  assert.deepEqual(e.rewards.map(r=>r.at),[1,5,10,15],id+' cumulative milestones');
  assert.deepEqual(e.rewards.map(r=>r.item),rewards);
  assert.ok(e.rewards.every(r=>r.quantity===1));
}
for(const [item,merchant] of [['猫の指輪','solde-armory'],['犬の指輪','crell-armory'],['鳥の指輪','traveller']]){
  const rows=shops.filter(s=>same(s.jp,item));
  assert.ok(rows.length);
  for(const s of rows){assert.equal(s.merchantId,merchant);assert.equal(s.price,1);assert.equal(s.unlockSpend,80000);assert.equal(s.materials.length,4);assert.ok(s.materials.every(m=>m.quantity===1));}
}
for(const s of shops.filter(s=>same(s.jp,'ソロモンの指輪'))){
  assert.equal(s.merchantId,'asgard-merchant');assert.equal(s.price,900000);
  assert.deepEqual(s.materials.map(m=>m.name).sort(),['猫の指輪','犬の指輪','鳥の指輪'].sort());
  assert.ok(s.materials.every(m=>m.quantity===1));
}
assert.equal(byEvent.get('town-asgard-solomon').requires.find(r=>currency(r.item)).quantity,900000);
assert.ok(!coverage.find(r=>r.item==='聖槍セントハルバード').drops.length,'Saint’s Halberd is initial gear, not a Chapter 4 boss drop');
assert.ok(coverage.find(r=>r.item==='聖槍セントハルバード').special.some(r=>r.chapter==='ch6'&&r.stageId==='tower-1'&&r.quantity===1));
assert.ok(same('アマダンタイト','アダマンタイト'));
for(const visit of ['palace-sun','palace-moon'])assert.ok(coverage.find(r=>r.item==='アダマンタイト').drops.some(r=>r.monsterId==='m079'&&r.stageId===visit&&r.part==='手臂'));
assert.ok(coverage.find(r=>r.item==='真紅の牙').special.some(r=>r.monsterId==='m089'&&r.stageId==='scavina'&&r.part==='頭部'));
const result={checkedAt:new Date().toISOString(),events:events.length,merchants:C.merchants.length,shopRows:shops.length,
  recipeRows:shops.filter(s=>s.materials.length).length,distinctRecipeProducts:products.length,distinctMaterials:materials.length,
  actionableMaterials:coverage.length,dropMaterials:coverage.filter(r=>r.drops.length).length,
  treasureMaterials:coverage.filter(r=>r.treasures.length).length,eventRewardMaterials:coverage.filter(r=>r.events.length).length,
  releasedGiftMaterials:coverage.filter(r=>r.gifts.length).length,shopMaterials:coverage.filter(r=>r.shops.length).length,
  specialMaterials:coverage.filter(r=>r.special.length).length,unrootedMaterials:unrooted,unknownSourceIds:[],invalidQuantities:0};
if(require.main===module){
  console.log(JSON.stringify(result,null,2));
  if(process.argv.includes('--write-report')){
    const out=path.join(root,'artifacts','town-item-audit.json');
    fs.mkdirSync(path.dirname(out),{recursive:true});
    fs.writeFileSync(out,JSON.stringify({result,coverage},null,2)+'\n');
  }
}
module.exports={result,coverage,canonical};
