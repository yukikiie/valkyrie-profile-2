const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
let playwright;try{playwright=require('playwright');}catch{playwright=require(path.join(path.dirname(process.execPath),'../node_modules/playwright'));}
const root=path.resolve(__dirname,'..');
const origin=process.env.VP_TEST_ORIGIN||'http://127.0.0.1:4173/';
let browser;
(async()=>{
  browser=await playwright.chromium.launch({channel:'msedge',headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:1050}});
  const page=await context.newPage();page.setDefaultTimeout(10000);
  const errors=[],badRequests=[],checks=[],failures=[],details={};
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.url().startsWith(origin)&&r.status()>=400)badRequests.push([r.status(),r.url()]);});
  async function check(name,fn){try{await fn();checks.push(name);console.log('PASS '+name);}catch(e){failures.push({name,error:e.message});console.error('FAIL '+name+': '+e.message);}}
  async function go(hash){await page.goto(origin+hash,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.VP_ENCOUNTERS&&window.VP_LOCATIONS&&document.querySelector('#main')?.children.length);}
  const dossier=id=>page.locator(`[data-dossier="${id}"]`);
  async function open(id){await page.locator('#stage-'+id).evaluate(e=>e.open=true);return dossier(id);}
  async function tab(id,type){await open(id);await dossier(id).locator(`[data-location-tab="${type}"]`).click();return dossier(id).locator(`[data-location-pane="${type}"]`);}
  async function imageLoaded(locator){await locator.scrollIntoViewIfNeeded();await locator.evaluate(img=>img.complete&&img.naturalWidth>0?true:new Promise((resolve,reject)=>{img.addEventListener('load',()=>resolve(true),{once:true});img.addEventListener('error',()=>reject(Error('Map image failed: '+img.src)),{once:true});setTimeout(()=>reject(Error('Map image load timeout: '+img.src)),8000);}));}
  await go('#walkthrough/ch1');
  details.currentTreasureRows=await page.evaluate(()=>window.VP_LOCATIONS.areas.reduce((n,a)=>n+a.treasures.length,0));
  const chapters=await page.evaluate(()=>window.VP_WALKTHROUGH.chapters.map(c=>({id:c.id,stageIds:c.stages.map(s=>s.id)})));
  await check('Every one of 50 stage dossiers exposes four tabs and correct local data counts',async()=>{
    let stageTotal=0;
    for(const chapter of chapters){
      await go('#walkthrough/'+chapter.id);
      assert.equal(await page.locator('.location-dossier').count(),chapter.stageIds.length);
      const result=await page.evaluate(stageIds=>{
        const fail=[];let visited=0;
        for(const id of stageIds){
          const root=document.querySelector(`[data-dossier="${id}"]`);root.closest('details').open=true;
          const stages=window.VP_WALKTHROUGH.chapters.flatMap(c=>c.stages),stage=stages.find(s=>s.id===id);
          const areas=window.VP_LOCATIONS.areas.filter(a=>a.stageIds.includes(id));
          const uniq=(arr)=>[...new Map(arr.map(r=>[r.id,r])).values()];
          const maps=uniq(areas.flatMap(a=>a.maps)).filter(m=>!m.stageIds?.length||m.stageIds.includes(id));
          const treas=uniq(areas.flatMap(a=>a.treasures)).filter(t=>!t.stageIds?.length||t.stageIds.includes(id));
          const region=window.VP_ENCOUNTERS.regions.find(r=>r.stageIds.includes(id));
          const monsterIds=[...new Set([...region.monsterIds,...region.bossIds])];
          const drops=window.VP_REGION_DROPS[region.id];
          const expected=[maps.length,treas.length||stage.treasures?.length||0,monsterIds.length,drops.length];
          const actual=[...root.querySelectorAll('.area-chips span')].map(s=>Number(s.textContent.match(/\d+/)?.[0]));
          if(JSON.stringify(actual)!==JSON.stringify(expected))fail.push({id,kind:'counts',actual,expected});
          const tabs=[...root.querySelectorAll('[data-location-tab]')];
          if(tabs.length!==4)fail.push({id,kind:'tabs',actual:tabs.length});
          for(const type of ['map','treasures','monsters','drops']){
            root.querySelector(`[data-location-tab="${type}"]`).click();
            const panel=root.querySelector(`[data-location-pane="${type}"]`);
            if(panel.hidden||!panel.children.length)fail.push({id,kind:'empty visible panel',type});
            if(type==='monsters'){
              const actualIds=[...panel.querySelectorAll('.location-monster-open')].map(b=>b.dataset.monster).sort();
              if(JSON.stringify(actualIds)!==JSON.stringify([...monsterIds].sort()))fail.push({id,kind:'rendered monsters',actualIds,monsterIds});
            }
            if(type==='drops'&&drops.length){
              const count=Number(panel.querySelector('.regional-drop-count')?.textContent.match(/\d+/)?.[0]);
              if(count!==drops.length)fail.push({id,kind:'drop count',actual:count,expected:drops.length});
            }
          }
          root.querySelector('[data-location-tab="map"]').click();visited++;
        }
        return {fail,visited};
      },chapter.stageIds);
      assert.deepEqual(result.fail,[],chapter.id+' local dossier data mismatch');stageTotal+=result.visited;
    }
    assert.equal(stageTotal,50);details.stages=stageTotal;
  });
  await check('All cached source-map images load with their recorded natural dimensions',async()=>{
    const result=await page.evaluate(async()=>{
      const unique=[...new Map(Object.values(window.VP_MAP_ASSETS).map(m=>[m.src,m])).values()];
      const results=await Promise.all(unique.map(m=>new Promise(resolve=>{
        const img=new Image();const timer=setTimeout(()=>resolve({src:m.src,error:'timeout'}),10000);
        img.onload=()=>{clearTimeout(timer);resolve({src:m.src,width:img.naturalWidth,height:img.naturalHeight,expectedWidth:m.width,expectedHeight:m.height});};
        img.onerror=()=>{clearTimeout(timer);resolve({src:m.src,error:'load error'});};img.src=m.src;
      })));
      const missing=window.VP_LOCATIONS.areas.flatMap(a=>a.maps).filter(m=>m.kind==='source'&&!window.VP_MAP_ASSETS[m.imageUrl]).map(m=>m.imageUrl);
      return {count:results.length,missing,fail:results.filter(r=>r.error||r.width!==r.expectedWidth||r.height!==r.expectedHeight)};
    });
    assert.ok(result.count>=42);assert.deepEqual(result.missing,[]);assert.deepEqual(result.fail,[]);details.cachedMaps=result.count;
  });
  await check('Source-map selector, local cached image, zoom and reset work',async()=>{
    await go('#walkthrough/ch6/tower-lezard');await tab('tower-lezard','map');
    const select=dossier('tower-lezard').locator('[data-map-select]');assert.ok(await select.locator('option').count()>=2);
    const first=await dossier('tower-lezard').locator('.map-image').getAttribute('src');
    await select.selectOption('1');const image=dossier('tower-lezard').locator('.map-image');await imageLoaded(image);
    const next=await image.getAttribute('src');assert.notEqual(next,first);assert.match(next,/^assets\/maps\//);
    await dossier('tower-lezard').locator('[data-map-zoom="25"]').click();assert.equal(await dossier('tower-lezard').locator('[data-zoom-label]').innerText(),'125%');
    assert.equal(await dossier('tower-lezard').locator('[data-map-image-wrap]').evaluate(e=>e.style.width),'125%');
    await dossier('tower-lezard').locator('[data-map-zoom="reset"]').click();assert.equal(await dossier('tower-lezard').locator('[data-zoom-label]').innerText(),'100%');
  });
  await check('Pin selects the matching treasure within the clicked shared-area stage, and returns to its map',async()=>{
    await go('#walkthrough/ch6/tower-lezard');
    // A shared area can render identical treasure data in several story-stage dossiers.
    // Populate the earlier stage too, so a global duplicate-ID lookup cannot accidentally pass.
    await tab('tower-homunculi','treasures');await tab('tower-lezard','treasures');await tab('tower-lezard','map');
    const marker=await page.evaluate(()=>{
      const area=window.VP_LOCATIONS.areas.find(a=>a.stageIds.includes('tower-lezard'));
      const map=area.maps.find(m=>(m.pins||[]).some(p=>p.treasureIds?.length));
      const pin=map.pins.find(p=>p.treasureIds?.length);return {mapIndex:area.maps.indexOf(map),mapId:map.id,pinId:pin.id,treasureId:pin.treasureIds[0]};
    });
    await dossier('tower-lezard').locator('[data-map-select]').selectOption(String(marker.mapIndex));
    await dossier('tower-lezard').locator(`[data-map-pin="${marker.pinId}"]`).click();
    assert.equal(await dossier('tower-lezard').locator('[data-location-tab="treasures"]').getAttribute('aria-selected'),'true');
    const target=dossier('tower-lezard').locator(`[id="treasure-tower-lezard-${marker.treasureId}"]`);assert.equal(await target.count(),1);
    assert.ok((await target.getAttribute('class')).includes('highlight'),'Pin highlighted a treasure in a different stage dossier');
    const checkbox=target.locator('[data-progress]');const progressKey=await checkbox.getAttribute('data-progress');await checkbox.check();
    assert.equal(await dossier('tower-homunculi').locator(`[data-progress="${progressKey}"]`).isChecked(),true,'Shared physical treasure checkbox must sync across mounted stage copies');await checkbox.uncheck();
    await target.locator('[data-treasure-map]').click();
    assert.equal(await dossier('tower-lezard').locator('[data-location-tab="map"]').getAttribute('aria-selected'),'true');
    assert.equal(await dossier('tower-lezard').locator('[data-map-select]').inputValue(),String(marker.mapIndex));
    await page.waitForFunction(({id,pin})=>document.querySelector(`[data-dossier="${id}"] [data-map-pin="${pin}"]`)?.classList.contains('highlight'),{id:'tower-lezard',pin:marker.pinId});
    details.pinRoundTrip=marker;
  });
  await check('Treasure search narrows locally and acquired checkbox survives reload',async()=>{
    await go('#walkthrough/ch1/lost-forest');await tab('lost-forest','treasures');
    const pane=dossier('lost-forest').locator('[data-location-pane="treasures"]');
    const search=pane.locator('[data-treasure-search]');await search.fill('no-such-treasure-876');assert.equal(await pane.locator('[data-treasure-card]:visible').count(),0);
    await search.fill('ドクロの器');assert.ok(await pane.locator('[data-treasure-card]:visible').count()>=1);
    const checkbox=pane.locator('[data-treasure-card]:visible [data-progress]').first();const progressKey=await checkbox.getAttribute('data-progress');await checkbox.check();
    await page.reload({waitUntil:'domcontentloaded'});await tab('lost-forest','treasures');
    assert.equal(await dossier('lost-forest').locator(`[data-progress="${progressKey}"]`).isChecked(),true);
    await dossier('lost-forest').locator(`[data-progress="${progressKey}"]`).uncheck();
  });
  await check('Regional drops support item modal, local search, enemy filter and 30-row pagination',async()=>{
    await go('#walkthrough/ch1/royal-path');await tab('royal-path','drops');
    let pane=dossier('royal-path').locator('[data-location-pane="drops"]');
    assert.equal(await pane.locator('tbody tr').count(),30);const first=await pane.locator('tbody tr').first().innerText();
    await pane.locator('[data-regional-drop-page]').last().click();assert.match(await pane.locator('.pagination span').innerText(),/^2 \/ /);assert.notEqual(await pane.locator('tbody tr').first().innerText(),first);
    await pane.locator('[data-regional-drop-search]').fill('ドクロの器');assert.equal(await pane.locator('.pagination span').innerText(),'1 / 1');
    for(const item of await pane.locator('.loot-item').evaluateAll(nodes=>nodes.map(e=>e.dataset.lootItem)))assert.equal(item,'ドクロの器');
    await pane.locator('[data-regional-drop-search]').fill('');await pane.locator('[data-regional-drop-monster]').selectOption('m006');
    assert.ok(await pane.locator('tbody tr').count()>0);for(const id of await pane.locator('.drop-enemy-link').evaluateAll(a=>a.map(e=>e.dataset.monster)))assert.equal(id,'m006');
    await pane.locator('[data-regional-drop-monster]').selectOption('all');await pane.locator('[data-regional-drop-search]').fill('戦士の秘薬');
    await pane.locator('[data-loot-item="戦士の秘薬"]').first().click();await page.locator('#detail-dialog[open]').waitFor();assert.match(await page.locator('#detail-body').innerText(),/戦士の秘薬/);await page.keyboard.press('Escape');
    await tab('royal-path','monsters');await dossier('royal-path').locator('[data-regional-monster-drops="m006"]').click();assert.equal(await dossier('royal-path').locator('[data-regional-drop-monster]').inputValue(),'m006');
  });
  await check('First visits and revisits show distinct bosses; main and SG mages show exact regional drops',async()=>{
    await go('#walkthrough/ch3');await tab('ancient-forest','monsters');await tab('turgen','monsters');
    assert.equal(await dossier('ancient-forest').locator('.location-monster-open[data-monster="m027"]').count(),1);assert.equal(await dossier('ancient-forest').locator('.location-monster-open[data-monster="m029"]').count(),0);
    assert.equal(await dossier('turgen').locator('.location-monster-open[data-monster="m034"]').count(),1);assert.equal(await dossier('turgen').locator('.location-monster-open[data-monster="m036"]').count(),0);
    await go('#walkthrough/ch4');await tab('forest-return','monsters');await tab('mine-return','monsters');
    assert.equal(await dossier('forest-return').locator('.location-monster-open[data-monster="m029"]').count(),1);assert.equal(await dossier('forest-return').locator('.location-monster-open[data-monster="m027"]').count(),0);
    assert.equal(await dossier('mine-return').locator('.location-monster-open[data-monster="m036"]').count(),1);assert.equal(await dossier('mine-return').locator('.location-monster-open[data-monster="m034"]').count(),0);
    await tab('dipan-mages','drops');let pane=dossier('dipan-mages').locator('[data-location-pane="drops"]');
    assert.deepEqual((await pane.locator('.loot-item').evaluateAll(nodes=>nodes.map(e=>e.dataset.lootItem))).sort(),['デルージュセプター','氷衣クリスタルガーブ'].sort());
    await go('#walkthrough/sg/sg-5');await tab('sg-5','drops');pane=dossier('sg-5').locator('[data-location-pane="drops"]');
    for(const id of ['m096','m097']){await pane.locator('[data-regional-drop-monster]').selectOption(id);assert.deepEqual(await pane.locator('.loot-item').evaluateAll(nodes=>nodes.map(e=>e.dataset.lootItem)),['エーテルクラウン']);}
  });
  await check('Local Chinese body and title fonts finish loading',async()=>{
    const fonts=await page.evaluate(async()=>{await document.fonts.ready;return {faces:[...document.fonts].map(f=>({family:f.family,status:f.status})),body:getComputedStyle(document.body).fontFamily,sans:document.fonts.check('18px "Guide Sans"','中文攻略'),title:document.fonts.check('24px "Guide WenKai"','章節地圖')};});
    assert.ok(fonts.sans&&fonts.title);assert.match(fonts.body,/Guide Sans/);for(const name of ['Guide Sans','Guide WenKai'])assert.ok(fonts.faces.some(f=>f.family.replace(/["']/g,'')===name&&f.status==='loaded'),'Font face not loaded: '+name);details.fonts=fonts;
  });
  await check('320px and 390px chapter tabs remain readable without document overflow',async()=>{
    const dimensions=[],violations=[];
    for(const width of [320,390]){
      await page.setViewportSize({width,height:844});await go('#walkthrough/ch6/tower-1');
      for(const type of ['map','treasures','monsters','drops']){
        await tab('tower-1',type);
        const result=await dossier('tower-1').evaluate((el,type)=>({width:innerWidth,documentWidth:document.documentElement.scrollWidth,type,fontSizes:[...el.querySelectorAll('[data-location-pane="'+type+'"] .location-pane-heading p,[data-location-pane="'+type+'"] .treasure-card dd,[data-location-pane="'+type+'"] td')].filter(e=>e.getClientRects().length).map(e=>parseFloat(getComputedStyle(e).fontSize))}),type);
        if(result.documentWidth>width+1)violations.push(`${width}px ${type}: document width ${result.documentWidth}`);
        if(!result.fontSizes.every(size=>size>=16))violations.push(`${width}px ${type}: primary text below 16px (${Math.min(...result.fontSizes)})`);dimensions.push({width:result.width,documentWidth:result.documentWidth,type,minimumPrimaryFont:result.fontSizes.length?Math.min(...result.fontSizes):null});
      }
    }
    details.mobile=dimensions;await page.setViewportSize({width:1440,height:1050});assert.deepEqual(violations,[]);
  });
  await check('Standalone HTML works offline with embedded map, treasure, drop and Chinese font data',async()=>{
    const offline=await browser.newContext({viewport:{width:1280,height:900},offline:true});const p=await offline.newPage();p.setDefaultTimeout(10000);p.on('pageerror',e=>errors.push('offline: '+e.message));
    try{
      await p.goto(pathToFileURL(path.join(root,'dist','valkyrie-profile-2.html')).href+'#walkthrough/ch6/tower-1',{waitUntil:'domcontentloaded'});await p.locator('[data-dossier="tower-1"]').waitFor();
      const image=p.locator('[data-dossier="tower-1"] .map-image');await imageLoaded(image);assert.match(await image.getAttribute('src'),/^data:image\//);
      await p.locator('[data-dossier="tower-1"] [data-location-tab="treasures"]').click();assert.ok(await p.locator('[data-dossier="tower-1"] [data-treasure-card]').count()>=3);
      await p.locator('[data-dossier="tower-1"] [data-location-tab="drops"]').click();assert.ok(await p.locator('[data-dossier="tower-1"] .loot-item').count()>0);
      const result=await p.evaluate(async()=>{await document.fonts.ready;return {stages:window.VP_ENCOUNTERS.regions.length,treasures:window.VP_LOCATIONS.areas.reduce((n,a)=>n+a.treasures.length,0),sans:document.fonts.check('18px "Guide Sans"','中文攻略'),maps:Object.values(window.VP_MAP_ASSETS).every(m=>m.src.startsWith('data:image/'))};});
      assert.equal(result.stages,50);assert.equal(result.treasures,details.currentTreasureRows,'Standalone contains stale location data');assert.ok(result.sans&&result.maps);details.offline=result;
    }finally{await offline.close();}
  });
  await check('No JavaScript exceptions or missing local resources',async()=>{assert.deepEqual(errors,[]);assert.deepEqual(badRequests,[]);});
  const report={status:failures.length?'failed':'passed',checks,failures,details,errors,badRequests,checkedAt:new Date().toISOString()};
  fs.mkdirSync(path.join(root,'artifacts'),{recursive:true});fs.writeFileSync(path.join(root,'artifacts','location-browser-checks.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify({status:report.status,passed:checks.length,failed:failures.length,failures,details},null,2));await browser.close();
  if(failures.length)process.exitCode=1;
})().catch(async e=>{console.error(e);await browser?.close();process.exitCode=1;});
