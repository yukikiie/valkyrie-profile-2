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
  const errors = [], badRequests = [], checks = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => {
    if (response.url().startsWith(origin) && response.status() >= 400) {
      badRequests.push([response.status(), response.url()]);
    }
  });
  const passed = name => { checks.push(name); console.log('PASS ' + name); };
  const input = page.locator('#site-search-input');
  const suggestions = page.locator('#search-suggestions');
  const dialog = page.locator('#search-dialog');
  const globalInput = page.locator('#global-search');
  const results = page.locator('#search-results');
  async function go(hash = '#home') {
    await page.goto(origin + hash, {waitUntil: 'domcontentloaded'});
    await page.locator('#main > :first-child').waitFor();
  }
  async function search(query) {
    await input.fill(query);
    await input.press('Enter');
    await dialog.locator('#global-search').waitFor();
    assert.equal(await globalInput.inputValue(), query);
  }
  async function close() {
    if (await dialog.evaluate(element => element.open)) await page.locator('#search-close').click();
  }

  await go();
  await input.waitFor({state: 'visible'});
  assert.equal(await input.isEditable(), true);
  assert.equal(await page.locator('#site-search-form').getAttribute('role'), 'search');
  await input.fill('Royal Underground Path');
  await suggestions.locator('.search-result').first().waitFor();
  assert.match(await suggestions.innerText(), /王家地下道/);
  await input.fill('rOyAl uNdErGrOuNd pAtH');
  assert.match(await suggestions.innerText(), /王家地下道/);
  await input.fill('Ｒｏｙａｌ　Ｕｎｄｅｒｇｒｏｕｎｄ　Ｐａｔｈ');
  await suggestions.locator('.search-result').first().waitFor();
  assert.match(await suggestions.innerText(), /王家地下道/);
  passed('Visible desktop search input searches English names, case variants and fullwidth text');

  await input.press('Escape');
  assert.equal(await suggestions.isVisible(), false);
  await input.fill('Solde');
  await suggestions.locator('.search-result').first().waitFor();
  await input.press('ArrowDown');
  assert.equal(await page.evaluate(() => !!document.activeElement?.matches('#search-suggestions .search-result')), true);
  await page.keyboard.press('Escape');
  assert.equal(await suggestions.isVisible(), false);
  await search('Royal Underground Path');
  await results.locator('.search-result').filter({hasText: '王家地下道'}).first().click();
  await page.locator('#stage-royal-path[open]').waitFor();
  assert.equal(await dialog.evaluate(element => element.open), false);
  passed('Suggestion keyboard controls and Enter search route to the matching chapter stage');

  await search('ポルト酒');
  const treasureResult = results.locator('.search-result').filter({hasText: '寶藏'}).filter({hasText: 'ポルト酒'}).first();
  await treasureResult.waitFor();
  await treasureResult.click();
  const treasurePane = page.locator('[data-dossier="solde"] [data-location-pane="treasures"]');
  await treasurePane.waitFor({state: 'visible'});
  assert.match(await treasurePane.innerText(), /ポルト酒/);
  assert.equal(await page.locator('#stage-solde').getAttribute('open'), '');
  assert.equal(await page.locator('#treasure-solde-solde-t1').evaluate(element => element.classList.contains('highlight')), true);
  await page.reload({waitUntil: 'domcontentloaded'});
  await treasurePane.waitFor({state: 'visible'});
  assert.equal(await page.locator('#treasure-solde-solde-t1').evaluate(element => element.classList.contains('highlight')), true);
  passed('Treasure search opens and preserves the correct town, tab and highlighted chest on reload');

  await search('王家 骨クズ');
  const multiwordResults = await results.locator('.search-result').allTextContents();
  assert.ok(multiwordResults.length > 0);
  assert.ok(multiwordResults.every(text => text.includes('王家')), 'Combined query must restrict every result to the requested area');
  const dropResult = results.locator('.search-result').filter({hasText: '掉落'}).filter({hasText: '骨クズ'}).first();
  await dropResult.waitFor();
  await dropResult.click();
  const dropPane = page.locator('[data-dossier="royal-path"] [data-location-pane="drops"]');
  await dropPane.waitFor();
  const dropQuery = dropPane.locator('[data-regional-drop-search]');
  const dropMonster = dropPane.locator('[data-regional-drop-monster]');
  async function assertExactDrops() {
    assert.equal(await dropQuery.inputValue(), '骨クズ');
    assert.equal(await dropMonster.inputValue(), 'm001');
    const rows = dropPane.locator('tbody tr');
    assert.ok(await rows.count() > 0);
    assert.ok((await rows.locator('.loot-item').allTextContents()).every(text => text.trim() === '骨クズ'));
    assert.ok((await rows.locator('.drop-enemy-link').evaluateAll(links => links.map(link => link.dataset.monster))).every(id => id === 'm001'));
  }
  assert.deepEqual(new URL(page.url()).hash.slice(1).split('/').map(decodeURIComponent), ['walkthrough', 'ch1', 'royal-path', 'drops', '骨クズ', 'm001']);
  await assertExactDrops();
  passed('Multiword material search restricts the area and filters the exact Japanese item and monster');

  // Revisiting an unchanged hash must still restore the selected search result.
  const dropUrl = page.url();
  await dropQuery.fill('vp2-no-such-item');
  await dropMonster.selectOption('all');
  await search('王家 骨クズ');
  await dropResult.click();
  await dropPane.waitFor();
  assert.equal(page.url(), dropUrl);
  await assertExactDrops();
  await page.reload({waitUntil: 'domcontentloaded'});
  await dropPane.waitFor();
  await assertExactDrops();
  passed('Reselecting the same drop result and reloading its deep link preserve exact filters');

  await search('ポルト酒');
  const referenceResult = results.locator('.search-result').filter({has: page.locator('small', {hasText: /^道具 ·/})}).filter({hasText: 'ポルト酒'}).first();
  await referenceResult.waitFor();
  await referenceResult.click();
  await page.locator('#reference-query').waitFor();
  assert.equal(await page.locator('#reference-query').inputValue(), 'ポルト酒');
  assert.equal(await page.locator('#reference-results .reference-card').count(), 1);
  assert.equal(await page.locator('#reference-results .reference-card h3').innerText(), 'ポルト酒');
  await page.reload({waitUntil: 'domcontentloaded'});
  await page.locator('#reference-query').waitFor();
  assert.equal(await page.locator('#reference-query').inputValue(), 'ポルト酒');
  assert.equal(await page.locator('#reference-results .reference-card').count(), 1);
  passed('Reference search routes directly to the matching filtered record and survives reload');

  await search('バハムートティア');
  const weaponResult = results.locator('.search-result').filter({hasText: '武器'}).first();
  await weaponResult.waitFor();
  await weaponResult.click();
  await page.locator('#detail-dialog[open]').waitFor();
  assert.match(await page.locator('#detail-body').innerText(), /600/);
  await page.keyboard.press('Escape');
  await input.fill('');
  await page.locator('#print-button').focus();
  await page.keyboard.press('/');
  await globalInput.waitFor();
  await globalInput.fill('ヒドラ');
  await results.locator('.search-result').filter({hasText: '魔物'}).first().click();
  await page.locator('#detail-dialog[open]').waitFor();
  assert.match(await page.locator('#detail-body').innerText(), /ヒドラ/);
  await page.keyboard.press('Escape');
  passed('Weapon and monster results retain detail views and the slash shortcut');

  await search('vp2-no-such-entry-7638');
  assert.equal(await results.locator('.search-result').count(), 0);
  assert.match(await results.innerText(), /找不到|沒有符合|無符合/);
  await globalInput.fill('<img src=x onerror=alert(1)>');
  assert.equal(await results.locator('img').count(), 0);
  assert.equal(await results.locator('.search-result').count(), 0);
  await close();
  passed('Empty results are clear and markup entered in the search box stays inert');

  for (const width of [390, 320]) {
    await page.setViewportSize({width, height: 844});
    await go();
    await input.waitFor({state: 'visible'});
    const box = await input.boundingBox();
    assert.ok(box.width >= 100 && box.x >= 0 && box.x + box.width <= width, `Usable input at ${width}px`);
    assert.ok(await input.evaluate(element => parseFloat(getComputedStyle(element).fontSize)) >= 16, 'Mobile search font must remain readable');
    await input.fill('ポルト酒');
    await suggestions.locator('.search-result').first().waitFor();
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `No search overflow at ${width}px`);
    await page.locator('#search-open').click();
    await globalInput.waitFor();
    assert.equal(await globalInput.inputValue(), 'ポルト酒');
    assert.ok(await results.locator('.search-result').count() > 0);
    await close();
    await input.press('Escape');
  }
  await page.screenshot({path: path.join(out, 'search-mobile-320.png')});
  passed('Search input, live suggestions and submit remain usable at 390px and 320px');

  const standaloneFile = path.join(root, 'dist', 'valkyrie-profile-2.html');
  if (fs.existsSync(standaloneFile)) {
    const standalone = await context.newPage();
    standalone.on('pageerror', error => errors.push('single-file: ' + error.message));
    await standalone.goto(pathToFileURL(standaloneFile).href, {waitUntil: 'domcontentloaded'});
    await standalone.locator('#site-search-input').fill('ポルト酒');
    await standalone.locator('#site-search-input').press('Enter');
    await standalone.locator('#search-results .search-result').filter({hasText: '寶藏'}).first().click();
    await standalone.locator('[data-dossier="solde"] [data-location-pane="treasures"]').waitFor({state: 'visible'});
    passed('Downloaded standalone HTML supports the same treasure search');
  }

  assert.deepEqual(errors, [], 'Browser JavaScript errors');
  assert.deepEqual(badRequests, [], 'Missing site resources');
  const report = {status: 'passed', origin, checks, errors, badRequests, checkedAt: new Date().toISOString()};
  fs.writeFileSync(path.join(out, 'search-browser-checks.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
})().catch(async error => {
  console.error(error);
  await browser?.close();
  process.exitCode = 1;
});
