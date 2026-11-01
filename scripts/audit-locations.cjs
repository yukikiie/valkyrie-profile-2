/* Cross-file data integrity checks for chapter-local maps, treasure pins and encounters. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const context = {window:{}};
vm.createContext(context);
for (const file of ['walkthrough','monsters','encounters','locations']) {
  const filename = path.join(root,'data',file+'.js');
  if (fs.existsSync(filename)) vm.runInContext(fs.readFileSync(filename,'utf8'),context,{filename});
}
const d=context.window;
const stages=d.VP_WALKTHROUGH.chapters.flatMap(c=>c.stages);
const stageIds=new Set(stages.map(s=>s.id));
const monsters=new Map(d.VP_MONSTERS.map(m=>[m.id,m]));
const encounters=d.VP_ENCOUNTERS;
const regions=encounters.regions;
const regionById=new Map(regions.map(r=>[r.id,r]));
const sourceIds=new Set([...d.VP_WALKTHROUGH.sources,...d.VP_MONSTER_SOURCES,...encounters.sources,...(d.VP_LOCATIONS?.sources||[])].map(s=>s.id));
const url=value=>{assert.equal(typeof value,'string');assert.match(value,/^https?:\/\//);new URL(value);};
const checkSources=(record,label)=>{
  assert.ok(record.sourceIds?.length,label+' lacks sources');
  for(const id of record.sourceIds) assert.ok(sourceIds.has(id),label+' has unknown source '+id);
};
assert.equal(regionById.size,regions.length,'duplicate regional ID');
assert.equal(regions.length,stages.length,'one encounter section is required for every chapter stage');
for(const stage of stages) assert.ok(regions.some(r=>r.stageIds.includes(stage.id)),'stage lacks encounter section: '+stage.id);
for(const region of regions) {
  assert.ok(region.name&&region.jp&&region.note,'regional identity/note missing: '+region.id);
  checkSources(region,region.id);
  for(const id of region.stageIds) assert.ok(stageIds.has(id),'region points at unknown stage '+id);
  const ids=[...region.monsterIds,...region.bossIds];
  assert.equal(new Set(ids).size,ids.length,'duplicate regional monster or ordinary/boss overlap: '+region.id);
  for(const id of ids) assert.ok(monsters.has(id),'unknown regional monster '+id);
  if(region.peaceful) assert.equal(ids.length,0,'peaceful region has enemies: '+region.id);
  const drops=d.VP_REGION_DROPS[region.id];
  assert.ok(Array.isArray(drops),'regional drop index missing: '+region.id);
  assert.equal(region.dropCount,drops.length,'stale regional drop count: '+region.id);
  for(const drop of drops) {
    assert.ok(ids.includes(drop.monsterId),'drop belongs to monster outside '+region.id);
    assert.ok(drop.item&&drop.part&&drop.kind&&drop.condition,'incomplete drop record: '+region.id);
    assert.ok(drop.rate===null||(typeof drop.rate==='number'&&drop.rate>=0&&drop.rate<=100),'invalid drop probability');
    assert.ok(drop.quantity===null||(Number.isInteger(drop.quantity)&&drop.quantity>0),'invalid drop quantity');
    checkSources(drop,'drop '+region.id+'/'+drop.monsterId+'/'+drop.item);
  }
}
const allUsed=new Set(regions.flatMap(r=>[...r.monsterIds,...r.bossIds]));
for(const id of monsters.keys()) assert.ok(allUsed.has(id),'monster missing from every regional guide: '+id);
// Meaningful regression checks: shared names/areas must not merge different story visits.
const present=(stage,id)=>[...regionById.get(stage).monsterIds,...regionById.get(stage).bossIds].includes(id);
assert.ok(present('ancient-forest','m027')&&!present('ancient-forest','m029'));
assert.ok(present('forest-return','m029')&&!present('forest-return','m027'));
assert.ok(present('turgen','m034')&&!present('turgen','m036')&&!present('turgen','m035'));
assert.ok(present('mine-return','m036')&&!present('mine-return','m034'));
assert.ok(present('spirit-forest','m110')&&!present('spirit-forest','m111'));
assert.ok(present('spirit-return','m111')&&!present('spirit-return','m110'));
assert.ok(present('tower-1','m156')&&!present('tower-1','m163'));
assert.ok(present('tower-2','m163')&&!present('tower-2','m165'));
assert.ok(present('tower-3','m165')&&!present('tower-3','m170'));
assert.ok(present('tower-lezard','m170'));
assert.match(regionById.get('palace-moon').encounterNotes.m086,/可再戰/);
assert.match(regionById.get('turgen').encounterNotes.m034,/不可再戰/);
assert.ok(present('sg-entry','m173')&&!present('sg-1','m173'));
assert.ok(present('sg-repeat','m182')&&!present('sg-1','m182'));
for(const region of regions.filter(r=>/^sg-[1-5]$/.test(r.id))) {
  for(const id of [...region.monsterIds,...region.bossIds]) {
    const n=Number(id.slice(1));
    assert.ok(n<150||n>172,'main-story tower monster leaked into SG: '+id);
  }
}
for(const id of ['m096','m097']) {
  assert.ok(!d.VP_REGION_DROPS['dipan-mages'].some(x=>x.monsterId===id&&x.item==='エーテルクラウン'));
  assert.ok(d.VP_REGION_DROPS['sg-5'].some(x=>x.monsterId===id&&x.item==='エーテルクラウン'));
  assert.ok(!d.VP_REGION_DROPS['sg-5'].some(x=>x.monsterId===id&&/氷衣クリスタルガーブ|デルージュセプター/.test(x.item)));
}
for(const source of encounters.sources) url(source.url);
for(const correction of encounters.areaCorrections) {
  assert.ok(monsters.has(correction.monsterId));
  assert.ok(correction.removeAreas.length||(correction.addAreas||[]).length);
  checkSources(correction,'area correction '+correction.monsterId);
}
const result={checkedAt:new Date().toISOString(),stageCount:stages.length,regionalSections:regions.length,combatSections:regions.filter(r=>r.monsterIds.length+r.bossIds.length).length,peacefulSections:regions.filter(r=>r.peaceful).length,regionalMonsterCoverage:allUsed.size,regionalDropRows:Object.values(d.VP_REGION_DROPS).reduce((n,a)=>n+a.length,0),correctedAreaContexts:encounters.areaCorrections.length};
if(d.VP_LOCATIONS) {
  const areas=d.VP_LOCATIONS.areas;
  assert.ok(Array.isArray(areas)&&areas.length,'location catalog empty');
  assert.equal(new Set(areas.map(a=>a.id)).size,areas.length,'duplicate physical area ID');
  for(const stage of stages) assert.ok(areas.some(a=>a.stageIds.includes(stage.id)),'stage lacks location guide: '+stage.id);
  const allTreasures=new Set();
  let mapCount=0,sourceMaps=0,townMaps=0,schematics=0,pinCount=0,treasureCount=0;
  for(const source of d.VP_LOCATIONS.sources) url(source.url);
  for(const area of areas) {
    assert.ok(area.id&&area.name&&area.jp,'location identity missing');
    checkSources(area,'location '+area.id);
    assert.ok(area.stageIds.length,'location lacks chapter stage: '+area.id);
    for(const id of area.stageIds) assert.ok(stageIds.has(id),'location has unknown stage: '+id);
    assert.ok(area.maps?.length,'location lacks map/explicit diagram: '+area.id);
    const maps=new Map(area.maps.map(m=>[m.id,m]));
    assert.equal(maps.size,area.maps.length,'duplicate map ID within '+area.id);
    const treasures=new Map(area.treasures.map(t=>[t.id,t]));
    assert.equal(treasures.size,area.treasures.length,'duplicate treasure ID within '+area.id);
    for(const map of area.maps) {
      mapCount++;
      assert.ok(map.id&&map.title&&map.kind,'map identity missing: '+area.id);
      assert.ok(map.note&&map.credit,'map must identify scope and attribution: '+map.id);
      if(map.sourceIds?.length) checkSources(map,'map '+map.id);
      for(const id of map.stageIds||[]) assert.ok(area.stageIds.includes(id),'map points outside its location stages');
      if(map.kind==='source') {
        sourceMaps++;url(map.url);url(map.imageUrl);
        assert.match(new URL(map.imageUrl).pathname,/\.(gif|png|jpe?g|webp|svg)$/i,'source map image URL has unexpected file type: '+map.id);
      } else {
        assert.ok(['town','schematic'].includes(map.kind),'unknown map kind: '+map.kind);
        map.kind==='town'?townMaps++:schematics++;
        assert.ok(map.nodes?.length,'town/route diagram has no nodes: '+map.id);
        for(const node of map.nodes) assert.ok(node.label,'diagram node lacks label: '+map.id);
      }
      const pins=map.pins||[];
      assert.equal(new Set(pins.map(p=>p.id)).size,pins.length,'duplicate pin ID in '+map.id);
      for(const pin of pins) {
        pinCount++;
        assert.ok(pin.id,'map pin requires stable ID: '+map.id);
        for(const axis of ['x','y']) if(pin[axis]!==undefined) assert.ok(Number.isFinite(pin[axis])&&pin[axis]>=0&&pin[axis]<=100,'map pin coordinate outside 0–100: '+pin.id);
        for(const tid of [pin.treasureId,...(pin.treasureIds||[])].filter(Boolean)) assert.ok(treasures.has(tid),'map pin refers to unknown treasure '+tid);
      }
    }
    for(const treasure of area.treasures) {
      treasureCount++;
      assert.ok(treasure.id&&treasure.item&&treasure.location,'treasure lacks identity/item/location in '+area.id);
      assert.ok(!allTreasures.has(treasure.id),'treasure IDs must be globally unique: '+treasure.id);
      allTreasures.add(treasure.id);
      checkSources(treasure,'treasure '+treasure.id);
      assert.ok(maps.has(treasure.mapId),'treasure points at unknown map: '+treasure.id+'/'+treasure.mapId);
      for(const id of treasure.stageIds||[]) assert.ok(area.stageIds.includes(id),'treasure points outside its location stages');
      if(treasure.pinId) assert.ok((maps.get(treasure.mapId).pins||[]).some(p=>p.id===treasure.pinId),'treasure points at unknown map pin: '+treasure.id+'/'+treasure.pinId);
    }
    for(const npc of area.npc||[]) {
      assert.ok(npc.name&&npc.location&&npc.action,'NPC record lacks actionable position: '+area.id);
      checkSources(npc,'NPC '+area.id+'/'+npc.name);
    }
  }
  Object.assign(result,{physicalAreas:areas.length,maps:mapCount,sourceMaps,townMaps,routeDiagrams:schematics,mapPins:pinCount,locatedTreasureRows:treasureCount,locations:'passed'});
} else {
  result.locations='pending data/locations.js';
  if(process.argv.includes('--require-locations')) throw new Error('data/locations.js is required');
}
result.status='passed';
console.log(JSON.stringify(result,null,2));
