const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
let sharp;try{sharp=require('sharp');}catch{sharp=require(path.join(path.dirname(process.execPath),'../node_modules/sharp'));}
const ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(root,'data/locations.js'),'utf8'),ctx);
const maps=[...new Map(ctx.window.VP_LOCATIONS.areas.flatMap(a=>a.maps||[]).filter(m=>m.imageUrl).map(m=>[m.imageUrl,m])).values()];
const out={};const failed=[];fs.mkdirSync(path.join(root,'assets/maps'),{recursive:true});
let cursor=0;
async function worker(){while(cursor<maps.length){const m=maps[cursor++];try{
  const ext=path.extname(new URL(m.imageUrl).pathname).toLowerCase();
  if(!['.png','.gif','.jpg','.jpeg','.webp'].includes(ext))throw Error('Unsupported map image extension');
  const src='assets/maps/'+crypto.createHash('sha256').update(m.imageUrl).digest('hex').slice(0,16)+ext;
  const file=path.join(root,src);let bytes;
  if(fs.existsSync(file))bytes=fs.readFileSync(file);
  else{const r=await fetch(m.imageUrl,{headers:{Referer:m.url||new URL(m.imageUrl).origin+'/', 'User-Agent':'Mozilla/5.0 (compatible; SilmeriaGuide/2.0)'},signal:AbortSignal.timeout(20000)});if(!r.ok)throw Error('HTTP '+r.status);bytes=Buffer.from(await r.arrayBuffer());}
  const metadata=await sharp(bytes).metadata();if(!metadata.width||!metadata.height)throw Error('Invalid image');
  if(!fs.existsSync(file))fs.writeFileSync(file,bytes);
  out[m.imageUrl]={src,width:metadata.width,height:metadata.height,sourceUrl:m.url,credit:m.credit||m.attribution||'',sha256:crypto.createHash('sha256').update(bytes).digest('hex')};
}catch(e){failed.push({url:m.imageUrl,title:m.title,error:e.message});}}}
(async()=>{await Promise.all(Array.from({length:4},worker));fs.writeFileSync(path.join(root,'data/map-assets.js'),'/* Original map images cached with source attribution; no generated geography. */\nwindow.VP_MAP_ASSETS = '+JSON.stringify(out,null,2)+';\n');console.log(JSON.stringify({expected:maps.length,cached:Object.keys(out).length,failed},null,2));if(failed.length)process.exitCode=1;})().catch(e=>{console.error(e.message);process.exitCode=1;});
