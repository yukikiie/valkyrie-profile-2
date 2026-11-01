/* Browser checks follow real player journeys: town task -> item -> exact place. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {pathToFileURL} = require('node:url');
let playwright;
try { playwright = require('playwright'); }
catch { playwright = require(path.join(path.dirname(process.execPath), '../node_modules/playwright')); }

const root = path.resolve(__dirname, '..');
const origin = (process.env.VP_TEST_ORIGIN || 'http://127.0.0.1:4173/').replace(/\/?$/, '/');
const out = path.join(root, 'artifacts');
fs.mkdirSync(out, {recursive: true});
let browser;

(async () => {
  browser = await playwright.chromium.launch({channel: 'msedge', headless: true});
  const context = await browser.newContext({viewport: {width: 1440, height: 1000}});
  const page = await context.newPage();
  page.setDefaultTimeout(12000);
  const errors = [], badRequests = [], checks = [], failures = [], details = {};
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => {
    if (response.url().startsWith(origin) && response.status() >= 400) {
      badRequests.push([response.status(), response.url()]);
    }
  });
  async function check(name, fn) {
    try { await fn(); checks.push(name); console.log('PASS ' + name); }
    catch (error) { failures.push({name, error: error.message}); console.error('FAIL ' + name + ': ' + error.message); }
  }
  async function go(hash) {
    // A same-hash visit may reuse the document; dismiss any detail from the
    // preceding independent journey before interacting with the underlying page.
    if (await page.locator('#detail-dialog[open]').count()) await page.keyboard.press('Escape');
    if (await page.locator('#search-dialog[open]').count()) await page.keyboard.press('Escape');
    await page.goto(origin + hash, {waitUntil: 'domcontentloaded'});
    await page.waitForFunction(() => window.VP_TOWN_EARLY && window.VP_TOWN_LATE && document.querySelector('#main')?.children.length);
  }
  const event = id => page.locator('[data-town-event="' + id + '"]').first();
  const detail = () => page.locator('#detail-body');
  async function showDetail(trigger) {
    await reveal(trigger);
    await trigger.click();
    await page.locator('#detail-dialog[open]').waitFor();
  }
  async function closeDetail() {
    if (await page.locator('#detail-dialog').evaluate(element => element.open)) await page.keyboard.press('Escape');
  }
  async function reveal(locator) {
    await locator.evaluate(element => {
      for (let parent = element.parentElement; parent; parent = parent.parentElement) {
        if (parent.tagName === 'DETAILS') parent.open = true;
      }
    });
  }
  function itemLink(container, name) {
    return container.locator('[data-guide-item="' + name + '"]');
  }
  function itemRow(container, name) {
    return container.locator('li').filter({has: itemLink(page, name)}).first();
  }
  async function openWeapon(name) {
    await go('#weapons/weapons');
    await page.locator('#weapon-query').fill(name);
    await showDetail(page.locator('#weapon-results tr[data-item]').first());
  }
  function recipeFor(container, name) {
    return container.locator('.recipe-card').filter({has: page.locator('.recipe-heading [data-guide-item="' + name + '"]')}).first();
  }
  async function assertQuantity(container, item, quantity) {
    const row = itemRow(container, item);
    await row.waitFor({state: 'attached'});
    assert.match(await row.locator('.item-quantity').innerText(), new RegExp('×\\s*' + quantity + '$'), item + ' quantity');
  }

  await check('Chapter one visibly explains all four cat rewards and the total 15-food requirement', async () => {
    await go('#walkthrough/ch1/solde');
    const card = page.locator('#stage-solde [data-town-event="solde-cat-feeding"]');
    await reveal(card);
    await card.waitFor({state: 'visible'});
    assert.equal(await card.count(), 1, 'The first town must contain the task itself');
    await assertQuantity(card, '海鮮肉', 15);
    assert.match(await card.innerText(), /每次.{0,12}1\s*(?:份|個)/);
    const rows = await card.locator('.event-rewards tbody tr').evaluateAll(rows => rows.map(row => {
      const cells = [...row.cells];
      return {threshold: Number(cells[0].textContent.match(/\d+/)?.[0]), item: cells[1].querySelector('[data-guide-item]')?.dataset.guideItem, quantity: Number(cells[2].textContent)};
    }));
    assert.deepEqual(rows, [
      {threshold: 1, item: '狩られたネズミ', quantity: 1},
      {threshold: 5, item: '尻尾の切れたトカゲ', quantity: 1},
      {threshold: 10, item: '不幸な青い鳥', quantity: 1},
      {threshold: 15, item: 'ねこのふん', quantity: 1}
    ]);
    assert.match(await card.innerText(), /累計/);
    assert.match(await card.innerText(), /第二章|第\s*2\s*章/);
    details.catRewards = rows;
  });

  await check('Clicking cat food reveals Flying Fish tail drops and navigates to that exact chapter encounter', async () => {
    await go('#towns/solde/ch1/solde-cat-feeding');
    await showDetail(itemLink(event('solde-cat-feeding').locator('.material-list'), '海鮮肉').first());
    assert.match(await detail().innerText(), /怪物掉落|部位/);
    const source = detail().locator('.acquisition-row').filter({has: page.locator('[data-monster="m011"]')}).filter({hasText: /尾/}).first();
    await reveal(source);
    assert.match(await source.innerText(), /フライングフィッシュ/);
    assert.match(await source.innerText(), /部位：.*尾/);
    assert.match(await source.innerText(), /機率：.*未載明/);
    const place = source.locator('a[href*="#walkthrough/ch2/kisena/drops/"]').first();
    await place.click();
    const pane = page.locator('[data-dossier="kisena"] [data-location-pane="drops"]');
    await pane.waitFor({state: 'visible'});
    assert.equal(await pane.locator('[data-regional-drop-search]').inputValue(), '海鮮肉');
    assert.equal(await pane.locator('[data-regional-drop-monster]').inputValue(), 'm011');
    assert.deepEqual(new URL(page.url()).hash.slice(1).split('/').map(decodeURIComponent), ['walkthrough', 'ch2', 'kisena', 'drops', '海鮮肉', 'm011']);
    assert.ok(await pane.locator('tbody tr').count() > 0);
    assert.ok((await pane.locator('.drop-enemy-link').evaluateAll(links => links.map(link => link.dataset.monster))).every(id => id === 'm011'));
    await page.reload({waitUntil: 'domcontentloaded'});
    await pane.waitFor({state: 'visible'});
    assert.equal(await pane.locator('[data-regional-drop-monster]').inputValue(), 'm011');
  });

  await check('Weapon details show each recipe quantity and its actual vendor before material lookup', async () => {
    await openWeapon('名刀五月雨');
    assert.match(await detail().locator('.detail-title').innerText(), /五月雨/);
    const recipe = recipeFor(detail(), '名刀五月雨');
    await recipe.waitFor();
    assert.match(await recipe.locator('.recipe-price').innerText(), /76,000\s*OTH/);
    assert.match(await recipe.innerText(), /索爾德|ゾルデ/);
    assert.equal(await recipe.locator('.material-list > li').count(), 4);
    await assertQuantity(recipe, '名刀蜘蛛切り', 1);
    await assertQuantity(recipe, 'フルンティング', 1);
    await assertQuantity(recipe, 'アダマンタイト', 2);
    await assertQuantity(recipe, '真紅の牙', 3);
  });

  await check('A weapon material opens Iron Golem arm sources in the correct Dragon Palace visit', async () => {
    await openWeapon('名刀五月雨');
    await showDetail(itemLink(recipeFor(detail(), '名刀五月雨'), 'アダマンタイト').first());
    assert.match(await detail().locator('.detail-title').innerText(), /アダマンタイト/);
    const iron = detail().locator('.acquisition-row').filter({has: page.locator('[data-monster="m079"]')}).filter({hasText: /手臂|腕/}).first();
    await reveal(iron);
    assert.match(await iron.innerText(), /アイアンゴーレム/);
    assert.match(await iron.innerText(), /奉龍|奉竜/);
    const place = iron.locator('a[href*="#walkthrough/ch3/palace-"][href*="/drops/"]').first();
    await place.click();
    const pane = page.locator('[data-location-pane="drops"]:visible');
    await pane.waitFor();
    assert.equal(await pane.locator('[data-regional-drop-monster]').inputValue(), 'm079');
    assert.match(await pane.locator('[data-regional-drop-search]').inputValue(), /^(?:アダマンタイト|アマダンタイト)$/,
      'A source spelling alias may remain in the exact regional filter');
    assert.ok(await pane.locator('tbody tr').count() > 0, 'The normalized material link must retain real drop rows');
  });

  await check('Cat, bird and dog rings lead to three distinct vendors with four exact materials each', async () => {
    const fixtures = [
      {town: 'solde', event: 'solde-cat-ring', item: '猫の指輪', vendor: 'solde', materials: ['狩られたネズミ', '尻尾の切れたトカゲ', '不幸な青い鳥', 'ねこのふん']},
      {town: 'coriander', event: 'coriander-bird-ring', item: '鳥の指輪', vendor: 'traveller', materials: ['ひよこのえさ', '野菜くず', '貝殻入りのえさ', 'とりのふん']},
      {town: 'crell', event: 'crell-dog-ring', item: '犬の指輪', vendor: 'crell', materials: ['しゃぶった骨', 'かじった靴', 'ぼろぼろの布', 'いぬのふん']}
    ];
    const vendors = [];
    for (const fixture of fixtures) {
      await go('#towns/' + fixture.town + '/all/' + fixture.event);
      await showDetail(itemLink(event(fixture.event).locator('.event-rewards'), fixture.item).first());
      const recipe = recipeFor(detail(), fixture.item);
      await recipe.waitFor();
      assert.match(await recipe.locator('.recipe-price').innerText(), /(?:^|\D)1\s*OTH/);
      const vendor = await recipe.locator('a[href^="#towns/"]').first().getAttribute('href');
      assert.equal(vendor, '#towns/' + fixture.vendor + '/all');
      vendors.push(vendor);
      assert.equal(await recipe.locator('.material-list > li').count(), 4);
      for (const material of fixture.materials) await assertQuantity(recipe, material, 1);
      await closeDetail();
    }
    assert.equal(new Set(vendors).size, 3, 'Animal-ring vendors must not collapse into a single store');
    details.animalRingVendors = vendors;
  });

  await check('Solomon ring requires all three rings, 900000 OTH and the separate Asgard merchant', async () => {
    await go('#weapons/accessories');
    await page.locator('#reference-query').fill('ソロモンの指輪');
    await showDetail(page.locator('#reference-results h3 [data-guide-item="ソロモンの指輪"]').first());
    const recipe = recipeFor(detail(), 'ソロモンの指輪');
    await recipe.waitFor();
    assert.match(await recipe.locator('.recipe-price').innerText(), /900,000\s*OTH/);
    assert.equal(await recipe.locator('a[href^="#towns/"]').first().getAttribute('href'), '#towns/asgard/all');
    assert.equal(await recipe.locator('.material-list > li').count(), 3);
    for (const ring of ['猫の指輪', '犬の指輪', '鳥の指輪']) await assertQuantity(recipe, ring, 1);
    await showDetail(itemLink(recipe, '猫の指輪').first());
    assert.ok(await recipeFor(detail(), '猫の指輪').count() === 1, 'Recipe ingredients remain recursively clickable');
    assert.match(await detail().innerText(), /狩られたネズミ/);
  });

  await check('Town and chapter selectors preserve a direct NPC event link across reload', async () => {
    await go('#towns/coriander/ch3/coriander-ruins-report');
    const card = event('coriander-ruins-report');
    await card.waitFor();
    assert.equal(await page.locator('#town-select').inputValue(), 'coriander');
    assert.equal(await page.locator('#town-chapter').inputValue(), 'ch3');
    assert.match(await card.innerText(), /無かった/);
    assert.match(await card.innerText(), /旅館前/);
    const row = card.locator('.event-rewards tbody tr').filter({hasText: 'ロイヤルゼリー'});
    assert.equal((await row.locator('td').last().innerText()).trim(), '1');
    await page.reload({waitUntil: 'domcontentloaded'});
    await card.waitFor();
    await page.waitForFunction(() => document.querySelector('#town-event-coriander-ruins-report')?.classList.contains('highlight'));
    assert.equal(await card.getAttribute('id'), 'town-event-coriander-ruins-report');
    await page.locator('#town-chapter').selectOption('ch4');
    await page.waitForURL(/#towns\/coriander\/ch4$/);
    assert.equal(await card.count(), 0, 'The chapter-three quest must not masquerade as a chapter-four new reward');
    await page.locator('#town-select').selectOption('villnore');
    await page.waitForURL(/#towns\/villnore\/ch4$/);
  });

  await check('Later chapters separate paused feeding, uncertain cat deadline, poem, flowers and donation rewards', async () => {
    await go('#towns/solde/ch4');
    assert.equal(await event('solde-cat-feeding').count(), 0);
    assert.match(await event('town-solde-feeding-pause-ch4').innerText(), /不能|無法|暫停/);
    await go('#towns/solde/ch5');
    const cat = event('town-solde-cat-final-ch5');
    assert.match(await cat.innerText(), /精靈之森/);
    assert.match(await cat.innerText(), /Pluto/);
    assert.match(await cat.innerText(), /差異|不同|不能保證/);
    await go('#towns/solde/ch6');
    assert.equal(await event('solde-cat-feeding').count(), 0);
    const poem = event('town-solde-triemblem-ch6');
    assert.match(await poem.innerText(), /右側/);
    assert.ok(await itemLink(poem.locator('.event-rewards'), 'トライエンブレム').count() === 1);
    await go('#towns/villnore/ch6');
    const flower = page.locator('.town-event-card').filter({has: itemLink(page.locator('.event-rewards'), 'グラジオラス')}).first();
    assert.match(await flower.innerText(), /10/);
    assert.equal(await itemLink(flower.locator('.event-rewards'), 'ちいさな花').count(), 0);
    await go('#towns/kalstad/ch6');
    const boy = event('town-kalstad-boy-reward-ch6');
    assert.match(await boy.innerText(), /100[～–-]290|100～290/);
    assert.match(await boy.innerText(), /300/);
    assert.match(await boy.innerText(), /擇一|其中一把/);
    assert.ok(await itemLink(boy.locator('.event-rewards'), '名刀五月雨').count() === 1);
    assert.ok(await itemLink(boy.locator('.event-rewards'), '光剣クラウソナス').count() === 1);
  });

  await check('Shop reference cards expose clickable ingredients and the selling-to-the-correct-shop rule', async () => {
    await go('#weapons/shops');
    await page.locator('#reference-query').fill('名刀五月雨');
    const recipe = recipeFor(page.locator('#reference-results'), '名刀五月雨');
    await recipe.waitFor();
    assert.match(await page.locator('#equipment-content > .notice').innerText(), /指定店家|正確數量|熟客/);
    await assertQuantity(recipe, 'アダマンタイト', 2);
    await showDetail(itemLink(recipe, 'アダマンタイト').first());
    assert.ok(await detail().locator('.acquisition-row [data-monster]').count() > 0);
    assert.match(await detail().innerText(), /部位/);
    await closeDetail();
    await go('#towns/solde/all');
    await page.locator('.town-shop-list > summary').click();
    assert.ok(await recipeFor(page.locator('.town-shop-list'), '猫の指輪').count() === 1);
    await page.locator('.crafting-rules > summary').click();
    const rules = await page.locator('.crafting-rules').innerText();
    assert.match(rules, /80,000/);
    assert.match(rules, /同一家|同一.*店|指定.*商人/);
    assert.match(rules, /跨店|別家/);
  });

  await check('All 146 recipe ingredients open every independently audited acquisition category', async () => {
    const {coverage}=require('./audit-town-items.cjs');
    await go('#weapons/shops');
    const expected={drops:'怪物掉落',treasures:'寶藏與場景拾取',events:'NPC 與事件獎勵',gifts:'解放英靈後再會',shops:'商店、價格與製作素材',special:'角色初期裝備與特殊取得'};
    for(const material of coverage){
      const rendered=await page.evaluate(name=>{
        const trigger=[...document.querySelectorAll('#reference-results .material-list [data-guide-item]')].find(button=>button.dataset.guideItem===name);
        if(!trigger)return null;
        trigger.click();
        return {open:document.querySelector('#detail-dialog').open,title:document.querySelector('#detail-title')?.textContent,headings:[...document.querySelectorAll('#detail-body h3')].map(h=>h.textContent)};
      },material.item);
      assert.ok(rendered?.open,'Ingredient link must open: '+material.item);
      for(const [kind,title] of Object.entries(expected))if(material[kind].length)assert.ok(rendered.headings.some(h=>h.includes(title)),material.item+' missing rendered '+kind+' sources');
    }
    details.ingredientSourceCoverage=coverage.length;
    await closeDetail();
  });

  await check('Early released Einherjar are conditional NPCs with explicit item rewards and incompatible candidates', async () => {
    await go('#towns/villnore/ch3');
    const clad = event('villnore-reunion-clad');
    const roland = event('villnore-reunion-roland');
    assert.match(await clad.innerText(), /解放/);
    assert.match(await clad.innerText(), /ローランド/);
    assert.equal(await itemLink(clad.locator('.event-rewards'), 'シルバークラッド').count(), 1);
    assert.match(await roland.innerText(), /50,000|50000/);
    await page.locator('.town-reunions > summary').click();
    assert.match(await page.locator('.town-reunions').innerText(), /同一輪|候選/);
    assert.match(await page.locator('.town-reunions').innerText(), /第 1–4 章/);
  });

  await check('Town quests and item source dialogs fit 390px and 320px screens with primary text at least 16px', async () => {
    const mobile = [];
    for (const width of [390, 320]) {
      await page.setViewportSize({width, height: 844});
      await go('#towns/solde/ch1/solde-cat-feeding');
      const card = event('solde-cat-feeding');
      await card.waitFor();
      const bodyResult = await card.evaluate(element => ({
        width: innerWidth, documentWidth: document.documentElement.scrollWidth,
        sizes: [...element.querySelectorAll('dd, .quest-steps > li, .material-list > li, .event-rewards td')]
          .filter(node => node.getClientRects().length).map(node => parseFloat(getComputedStyle(node).fontSize))
      }));
      assert.ok(bodyResult.sizes.length > 0);
      assert.ok(bodyResult.sizes.every(size => size >= 16), width + 'px: town primary text smaller than 16px: ' + Math.min(...bodyResult.sizes));
      assert.ok(bodyResult.documentWidth <= width + 1, width + 'px: document overflow ' + bodyResult.documentWidth);
      await showDetail(itemLink(card.locator('.material-list'), '海鮮肉').first());
      const dialogResult = await page.locator('#detail-dialog').evaluate(element => ({
        client: element.clientWidth, scroll: element.scrollWidth,
        sizes: [...element.querySelectorAll('.acquisition-row p, .acquisition-links a')]
          .filter(node => node.getClientRects().length).map(node => parseFloat(getComputedStyle(node).fontSize))
      }));
      assert.ok(dialogResult.sizes.length > 0);
      assert.ok(dialogResult.sizes.every(size => size >= 16), width + 'px: material-source primary text smaller than 16px: ' + Math.min(...dialogResult.sizes));
      assert.ok(dialogResult.scroll <= dialogResult.client + 1, width + 'px: item dialog horizontal overflow');
      mobile.push({...bodyResult, dialog: dialogResult});
      await closeDetail();
    }
    details.mobile = mobile;
    await page.screenshot({path: path.join(out, 'town-cat-mobile-320.png')});
    await page.setViewportSize({width: 1440, height: 1000});
  });

  await check('Downloaded standalone HTML keeps town tasks, linked food drops and recipes usable offline', async () => {
    const offline = await browser.newContext({viewport: {width: 1280, height: 900}, offline: true});
    const p = await offline.newPage();
    p.setDefaultTimeout(12000);
    p.on('pageerror', error => errors.push('offline: ' + error.message));
    try {
      await p.goto(pathToFileURL(path.join(root, 'dist', 'valkyrie-profile-2.html')).href + '#towns/solde/ch1/solde-cat-feeding', {waitUntil: 'domcontentloaded'});
      const cat = p.locator('[data-town-event="solde-cat-feeding"]');
      await cat.waitFor();
      assert.equal(await cat.locator('.event-rewards tbody tr').count(), 4);
      await cat.locator('.material-list [data-guide-item="海鮮肉"]').first().click();
      await p.locator('#detail-dialog[open]').waitFor();
      const fish = p.locator('#detail-body .acquisition-row').filter({has: p.locator('[data-monster="m011"]')}).filter({hasText: /尾/}).first();
      assert.match(await fish.innerText(), /フライングフィッシュ/);
      await p.keyboard.press('Escape');
      await p.locator('#town-select').selectOption('crell');
      await p.locator('#town-chapter').selectOption('all');
      await p.locator('.town-shop-list > summary').click();
      const dog = p.locator('.town-shop-list .recipe-card').filter({has: p.locator('.recipe-heading [data-guide-item="犬の指輪"]')}).first();
      assert.equal(await dog.locator('.material-list > li').count(), 4);
      assert.equal(await p.evaluate(() => typeof window.VP_CREATE_ITEM_GUIDE), 'function');
    } finally { await offline.close(); }
  });

  await check('No JavaScript exceptions or missing site resources', async () => {
    assert.deepEqual(errors, []);
    assert.deepEqual(badRequests, []);
  });
  const report = {status: failures.length ? 'failed' : 'passed', origin, checks, failures, details, errors, badRequests, checkedAt: new Date().toISOString()};
  fs.writeFileSync(path.join(out, 'town-item-browser-checks.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({status: report.status, passed: checks.length, failed: failures.length, failures}, null, 2));
  await browser.close();
  if (failures.length) process.exitCode = 1;
})().catch(async error => {
  console.error(error);
  await browser?.close();
  process.exitCode = 1;
});
