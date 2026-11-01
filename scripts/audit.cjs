const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname,'..');
const context = {window:{}};vm.createContext(context);
for(const file of ['walkthrough','monsters','equipment','items','images','reference'])vm.runInContext(fs.readFileSync(path.join(root,'data',file+'.js'),'utf8'),context,{filename:file+'.js'});
const d=context.window,w=d.VP_WALKTHROUGH,e=d.VP_EQUIPMENT_EXTRA,i=d.VP_ITEMS_EXTRA;
const allSources=[...w.sources,...d.VP_MONSTER_SOURCES,...e.sources,...i.sources,...d.VP_REFERENCE.sources];
const sources=new Map(allSources.map(s=>[s.id,s]));
for(const s of allSources){assert.ok(s.id&&s.title&&s.url);assert.match(s.url,/^https?:\/\//);new URL(s.url);}
const sets={monsters:d.VP_MONSTERS,weapons:d.VP_WEAPONS,stages:w.chapters.flatMap(c=>c.stages),missables:w.missables,sidequests:w.sidequests,armor:e.armor,skills:e.skills,sealstones:e.sealstones,einherjar:e.einherjar,accessories:i.accessories,items:i.items,magic:i.magic,shops:i.shops};
for(const[label,records]of Object.entries(sets)){assert.ok(records.length>0,label+' empty');assert.equal(new Set(records.map(r=>r.id)).size,records.length,label+' duplicate IDs');for(const r of records){assert.ok(r.sourceIds?.length,label+' '+r.id+' no sources');for(const s of r.sourceIds)assert.ok(sources.has(s),label+' '+r.id+' unknown source '+s);}}
assert.equal(w.chapters.length,7);assert.equal(e.einherjar.length,40);assert.equal(e.sealstones.length,66);assert.equal(new Set(d.VP_WEAPONS.map(r=>r.type)).size,7);
for(const m of d.VP_MONSTERS){for(const k of ['hp','atk','mag','hit','avd','rdm','rst'])assert.ok(m[k]==null||(typeof m[k]==='number'&&m[k]>=0),m.jp+' invalid '+k);for(const v of m.hpVariants||[])assert.ok(sources.has(v.sourceId));}
for(const [jp,img] of Object.entries(d.VP_MONSTER_IMAGES)){assert.ok(d.VP_MONSTERS.some(m=>m.jp===jp),'Image name has no matching enemy: '+jp);assert.ok(fs.existsSync(path.join(root,img.file)),'Missing image '+img.file);}
const rhino=d.VP_MONSTERS.find(m=>m.jp==='バリスティックライノ');assert.ok(rhino.hpVariants.some(v=>v.value===680));assert.ok(rhino.hpVariants.some(v=>v.value===816));
for(const n of ['レオーネ','アリューゼ'])assert.ok(d.VP_WEAPONS.some(w=>String(w.obtain).includes(n)));
const result={checkedAt:new Date().toISOString(),counts:Object.fromEntries(Object.entries(sets).map(([k,v])=>[k,v.length])),sources:new Set(allSources.map(s=>s.url)).size,treasureCheckpoints:sets.stages.reduce((n,s)=>n+(s.treasures?.length||0),0),images:Object.keys(d.VP_MONSTER_IMAGES).length,status:'passed'};
fs.mkdirSync(path.join(root,'artifacts'),{recursive:true});fs.writeFileSync(path.join(root,'artifacts','data-audit.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
