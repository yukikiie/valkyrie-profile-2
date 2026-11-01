/* Independently check the chapter/timing coverage of ordinary and conditional NPCs. */
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const context={window:{}};vm.createContext(context);
for(const name of ['walkthrough','monsters','equipment','items','reference','locations','encounters','town-events-early','town-events-late','crafting','crafting-acquisition','town-supplement','reunion-events']){
  vm.runInContext(fs.readFileSync(path.join(root,'data',name+'.js'),'utf8'),context,{filename:name+'.js'});
}
const d=JSON.parse(JSON.stringify(context.window));
const N=d.VP_REUNIONS,U=d.VP_TOWN_SUPPLEMENT;
const base=[...d.VP_TOWN_EARLY.events,...d.VP_TOWN_LATE.events];
const regular=base.filter(e=>!N.supersedes.includes(e.id)).concat(U.events);
const events=regular.concat(N.events);
const sourceRows=[...d.VP_MONSTER_SOURCES,...Object.values(d).flatMap(value=>value?.sources||[])];
const sources=new Map(sourceRows.map(s=>[s.id,s]));
const chapters=d.VP_WALKTHROUGH.chapters;
const chapterIds=new Set(chapters.map(c=>c.id));
const stageIds=new Set(chapters.flatMap(c=>c.stages.map(s=>s.id)));
const areaIds=new Set(d.VP_LOCATIONS.areas.map(a=>a.id));
const people=new Map(d.VP_EQUIPMENT_EXTRA.einherjar.map(p=>[p.id,p]));
function factual(record,label){
  assert.ok(record.sourceIds?.length,label+' needs sources');
  for(const id of record.sourceIds)assert.ok(sources.has(id),label+' unknown source '+id);
}
assert.equal(regular.length,61,'Review ordinary event coverage if the baseline changes');
assert.equal(N.events.length,40,'Each candidate needs a reunion entry, including people without gifts');
assert.equal(new Set(events.map(e=>e.id)).size,events.length,'Duplicate effective event IDs');
for(const e of events){
  factual(e,e.id);
  assert.ok(e.npc&&e.location&&e.timing&&e.steps.length,e.id+' lacks practical instructions');
  assert.ok(areaIds.has(e.townId)||stageIds.has(e.townId)||['sg','traveller'].includes(e.townId),e.id+' has no routable location');
  for(const id of e.chapters)assert.ok(chapterIds.has(id),e.id+' unknown chapter');
  for(const id of e.stageIds||[])assert.ok(stageIds.has(id),e.id+' unknown reminder stage');
  for(const r of e.requires||[])assert.ok(r.item&&Number.isInteger(r.quantity)&&r.quantity>0,e.id+' invalid required quantity');
  for(const r of e.rewards||[]){
    assert.ok(r.item&&r.at!=null,e.id+' reward lacks identity/timing');
    assert.ok(r.quantity==null||(Number.isInteger(r.quantity)&&r.quantity>0),e.id+' invalid reward quantity');
    if(r.quantity==null)assert.match(r.note||'',/未.*(?:件數|數量)|不.*(?:猜|填)/,e.id+' unknown count must be explained');
  }
}
assert.equal(new Set(N.events.map(e=>e.characterId)).size,40);
assert.equal(new Set(d.VP_EQUIPMENT_EXTRA.einherjar.map(p=>p.group)).size,20);
for(const e of N.events){
  assert.equal(e.kind,'reunion');assert.ok(people.has(e.characterId));
  assert.ok(e.conditions.some(c=>c.includes('加入時等級＋5')),e.id+' must distinguish release from simply reaching Lv5');
  assert.ok(e.notes.some(n=>/候選|同組/.test(n)&&/不能|不會|不是/.test(n)),e.id+' must explain mutual exclusion');
  assert.ok(stageIds.has(e.recruitment.areaId)||areaIds.has(e.recruitment.areaId),e.id+' recruitment cannot route');
  assert.equal(e.chapters.includes('ch1'),false,e.id+' must not imply Chapter1 reunion access');
  if(e.characterId!=='e01')assert.equal(e.chapters.includes('ch2'),false,e.id+' unexpected Chapter2 access');
  for(const r of e.rewards){
    assert.ok(r.chapters.every(c=>e.chapters.includes(c)),e.id+' gift outside candidate window');
    if(r.phase==='sg')assert.deepEqual(r.chapters,['sg'],e.id+' final-save reward must be in its own phase');
    if(r.item==='OTH')assert.ok(Number.isInteger(r.quantity)&&r.quantity>0,e.id+' money must state exact amount');
  }
}
assert.equal(N.corrections.length,40);
assert.equal(new Set(N.corrections.map(c=>c.characterId)).size,40);
for(const correction of N.corrections){assert.ok(people.has(correction.characterId));factual(correction,correction.characterId);}
for(const id of N.supersedes){assert.ok(base.some(e=>e.id===id));assert.ok(N.events.some(e=>e.id===id),'Preserve the existing NPC deep link '+id);}
const byCharacter=new Map(N.events.map(e=>[e.characterId,e]));
assert.deepEqual(byCharacter.get('e13').rewards[0].chapters,['ch4'],'Kanon location first opens in Chapter4');
assert.ok(byCharacter.get('e07').rewards.some(r=>r.phase==='sg'&&r.item==='OTH'&&r.quantity===300000));
assert.ok(byCharacter.get('e07').notes.some(n=>n.includes('30,000')),'Celes conflicting amount must remain visible');
assert.ok(byCharacter.get('e02').rewards.every(r=>r.chapters.every(c=>['ch5','ch6'].includes(c))));
assert.equal(N.events.filter(e=>!e.rewards.length).length,4,'Do not invent rewards for the four ungifted candidates');
for(const id of ['town-palace-leone-departure-levels','town-palace-arngrim-departure-levels','town-dipan-dylan-departure-levels','town-dipan-lezard-departure-levels']){
  const event=U.events.find(e=>e.id===id);assert.ok(event,'Missing full departure table '+id);
  assert.ok(event.rewards.length>8);assert.ok(event.notes.some(note=>note.includes('英文')&&note.includes('不同')||note.includes('另一')),'Low-level source differences must be disclosed');
}
const result={status:'passed',ordinaryEvents:regular.length,reunionCandidates:N.events.length,totalEvents:events.length,
  peopleWithGifts:N.events.filter(e=>e.rewards.length).length,peopleWithoutGifts:4,
  knownReunionQuantities:N.events.flatMap(e=>e.rewards).filter(r=>r.quantity!=null).length,
  unstatedReunionQuantities:N.events.flatMap(e=>e.rewards).filter(r=>r.quantity==null).length,
  chapters:chapters.map(c=>({id:c.id,ordinaryEvents:regular.filter(e=>e.chapters.includes(c.id)).length,reunionCandidates:N.events.filter(e=>e.chapters.includes(c.id)).length})),
  sourcePages:new Set(sourceRows.map(s=>s.url)).size};
console.log(JSON.stringify(result,null,2));
if(process.argv.includes('--write-report')){fs.mkdirSync(path.join(root,'artifacts'),{recursive:true});fs.writeFileSync(path.join(root,'artifacts','chapter-npc-audit.json'),JSON.stringify(result,null,2));}
