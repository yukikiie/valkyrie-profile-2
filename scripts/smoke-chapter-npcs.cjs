/* Regression: later-chapter NPC facts must be readable in the walkthrough itself.
 * Never force open <details>: doing so masked the original missing-content UX. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {pathToFileURL} = require('node:url');
let playwright;
try { playwright = require('playwright'); }
catch { playwright = require(path.join(path.dirname(process.execPath), '../node_modules/playwright')); }

const root = path.resolve(__dirname, '..');
const origin = (process.env.VP_TEST_ORIGIN || 'http://127.0.0.1:4173/').replace(/\/?$/, '/');
const output = path.join(root, 'artifacts');
fs.mkdirSync(output, {recursive: true});
let browser;

(async () => {
  browser = await playwright.chromium.launch({channel: 'msedge', headless: true});
  const context = await browser.newContext({viewport: {width: 1440, height: 1000}});
  const page = await context.newPage();
  page.setDefaultTimeout(12000);
  const checks = [], failures = [], errors = [], badRequests = [], details = {};
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => {
    if (response.url().startsWith(origin) && response.status() >= 400) badRequests.push([response.status(), response.url()]);
  });
  async function check(name, fn) {
    try { await fn(); checks.push(name); console.log('PASS ' + name); }
    catch (error) { failures.push({name, error: error.message}); console.error('FAIL ' + name + ': ' + error.message); }
  }
  async function go(chapter, stage = '') {
    if (await page.locator('#detail-dialog[open]').count()) await page.keyboard.press('Escape');
    await page.goto(origin + '#walkthrough/' + chapter + (stage ? '/' + stage : ''), {waitUntil: 'domcontentloaded'});
    await page.locator('.chapter-npc-guide').waitFor();
  }
  const card = id => page.locator('.chapter-npc-guide [data-town-event="' + id + '"]').first();
  async function readable(locator) {
    await locator.waitFor({state: 'attached'});
    assert.equal(await locator.evaluate(element => !!element.closest('details:not([open])')), false,
      'NPC facts must not be concealed inside closed details');
    assert.equal(await locator.isVisible(), true, 'NPC facts must be immediately readable');
    assert.ok((await locator.innerText()).trim().length > 30);
    assert.ok((await locator.locator('dd').first().innerText()).trim().length > 3, 'NPC and position must be stated');
  }
  async function requirement(locator, name, quantity) {
    const row = name === 'OTH'
      ? locator.locator('.material-list > li').filter({hasText: /OTH/}).first()
      : locator.locator('.material-list > li').filter({has: page.locator('[data-guide-item="' + name + '"]')}).first();
    await row.waitFor();
    assert.match(await row.locator('.item-quantity').innerText(), new RegExp('×\\s*' + quantity.toLocaleString('en-US') + '$'));
  }
  async function rewardRows(locator) {
    return locator.locator('.event-rewards tbody tr').evaluateAll(rows => rows.map(row => ({
      threshold: row.cells[0].textContent.trim(),
      item: row.cells[1].querySelector('[data-guide-item]')?.dataset.guideItem || (/OTH/.test(row.cells[1].textContent) ? 'OTH' : null),
      quantity: Number(row.cells[2].textContent.replace(/,/g, '').trim())
    })));
  }
  async function hasReward(locator, name, quantity) {
    const rows = await rewardRows(locator);
    assert.ok(rows.some(row => row.item === name && row.quantity === quantity), name + ' reward × ' + quantity + ' must be explicit');
  }

  await check('Chapter two directly explains the missable second poem before entering Dipan Castle', async () => {
    await go('ch2');
    const poem = card('dipan-poem-second');
    await readable(poem);
    assert.match(await poem.innerText(), /第二章|第\s*2\s*章/);
    assert.match(await poem.innerText(), /書架/);
    assert.match(await poem.innerText(), /進城|城堡|限定|離開/);
    assert.match(await poem.locator('dd').first().innerText(), /民宅/);
  });

  await check('Chapter three chicken shows 15 bone scraps, four cumulative thresholds and exact rewards', async () => {
    await go('ch3');
    const chicken = card('coriander-chicken-feeding');
    await readable(chicken);
    await requirement(chicken, '骨クズ', 15);
    const rows = await rewardRows(chicken);
    assert.deepEqual(rows.map(row => [Number(row.threshold.match(/\d+/)?.[0]), row.item, row.quantity]), [
      [1, 'ひよこのえさ', 1], [5, '野菜くず', 1], [10, '貝殻入りのえさ', 1], [15, 'とりのふん', 1]
    ]);
    assert.match(await chicken.innerText(), /スケルトン|骷髏/);
    details.chickenRewards = rows;
  });

  await check('Chapter three distinguishes Villnore 15-meat ring dog from Crell 3/10-meat medicine dog', async () => {
    await go('ch3');
    const first = card('villnore-dog-feeding'), second = card('crell-dog-feeding');
    await readable(first); await readable(second);
    await requirement(first, '骨付き肉', 15);
    await requirement(second, '骨付き肉', 10);
    assert.deepEqual((await rewardRows(first)).map(row => [Number(row.threshold.match(/\d+/)?.[0]), row.item, row.quantity]), [
      [1, 'しゃぶった骨', 1], [5, 'かじった靴', 1], [10, 'ぼろぼろの布', 1], [15, 'いぬのふん', 1]
    ]);
    assert.deepEqual((await rewardRows(second)).map(row => [Number(row.threshold.match(/\d+/)?.[0]), row.item, row.quantity]), [
      [3, 'フレアクリスタル', 1], [10, '女神の霊薬', 1]
    ]);
    assert.match(await first.innerText(), /ダイアウルフ/);
    assert.match(await second.innerText(), /ダイアウルフ/);
  });

  await check('Chapter three explicitly shows free NPC gifts and choice-dependent return rewards', async () => {
    await go('ch3');
    for (const [id, name, quantity] of [
      ['coriander-adventurer-gift', '虫のトゲ', 1],
      ['coriander-adventurer-gift', 'ブルーソウルフレイム', 1],
      ['crell-old-woman-gifts', '壊れた杖', 1],
      ['crell-old-woman-gifts', 'メイスヘッド', 1],
      ['villnore-mine-report', 'OTH', 10000],
      ['coriander-ruins-report', 'ロイヤルゼリー', 1],
      ['villnore-temple-report', 'プリズムクリスタル', 1],
      ['crell-manor-report', '賢者の秘薬', 1]
    ]) { await readable(card(id)); await hasReward(card(id), name, quantity); }
    assert.match(await card('coriander-ruins-report').innerText(), /無かった/);
    assert.match(await card('villnore-temple-report').innerText(), /行った/);
    assert.match(await card('crell-manor-report').innerText(), /魔物/);
  });

  await check('Chapter four makes feeding pause, timed chest, flower, egg and return-NPC rewards readable', async () => {
    await go('ch4');
    assert.equal(await card('coriander-chicken-feeding').count(), 0, 'Chapter four must not promise available feeding');
    for (const id of ['town-coriander-feeding-pause-ch4', 'town-villnore-feeding-pause-ch4', 'town-crell-feeding-pause-ch4']) {
      await readable(card(id)); assert.match(await card(id).innerText(), /暫停|不能|無法/);
    }
    for (const [id, name] of [
      ['town-coriander-box-ch4', 'コアエメラルド'], ['town-kalstad-egg-ch4', '金の卵'],
      ['town-villnore-flower-ch4', 'リリィ'], ['town-coriander-forest-return', '識者の経験'],
      ['town-villnore-mine-return', 'メタボライザー'], ['town-dipan-soldier-ch4', '識者の経験']
    ]) { await readable(card(id)); await hasReward(card(id), name, 1); }
    await requirement(card('town-villnore-flower-ch4'), 'OTH', 10);
  });

  await check('Chapter five shows distinct flower and egg, two experience items, merchant and donation deadline', async () => {
    await go('ch5');
    for (const [id, name, quantity] of [
      ['town-villnore-flower-ch5', 'スズラン', 1], ['town-coriander-egg-ch5', '金の卵', 1],
      ['town-dipan-start-ch5', '識者の経験', 2]
    ]) { await readable(card(id)); await hasReward(card(id), name, quantity); }
    await requirement(card('town-villnore-flower-ch5'), 'OTH', 10);
    await readable(card('town-dipan-merchant-ch4-5'));
    assert.match(await card('town-dipan-merchant-ch4-5').innerText(), /迪潘/);
    await readable(card('town-kalstad-donation-last-ch5'));
    assert.match(await card('town-kalstad-donation-last-ch5').innerText(), /30/);
    assert.match(await card('town-kalstad-donation-last-ch5').innerText(), /300/);
  });

  await check('Chapter six shows poem finish, conditional sword branches, corpse weapon and chapter flower', async () => {
    await go('ch6');
    for (const [id, name, quantity] of [
      ['town-solde-triemblem-ch6', 'トライエンブレム', 1],
      ['town-dipan-captain-ch6', '誓剣オートクレイル', 1],
      ['town-villnore-flower-ch6', 'グラジオラス', 1],
      ['town-coriander-egg-ch6', '金の卵', 1]
    ]) { await readable(card(id)); await hasReward(card(id), name, quantity); }
    assert.match(await card('town-solde-triemblem-ch6').innerText(), /右側/);
    const boy = card('town-kalstad-boy-reward-ch6'); await readable(boy);
    await hasReward(boy, '名刀五月雨', 1); await hasReward(boy, '光剣クラウソナス', 1);
    assert.match(await boy.innerText(), /100[～–-]290|100～290/);
    assert.match(await boy.innerText(), /300/);
    assert.match(await boy.innerText(), /擇一|其中一把|一把/);
  });

  await check('SG explains music pricing and the external equipment and supply merchant', async () => {
    await go('sg');
    const music = card('town-sg-music'); await readable(music);
    await requirement(music, 'OTH', 1000);
    assert.match(await music.innerText(), /2,?000/);
    assert.match(await music.innerText(), /音樂房/);
    await readable(card('town-asgard-merchant'));
    assert.match(await card('town-asgard-merchant').innerText(), /沒有.*店|補給/);
  });

  await check('Every chapter exposes all applicable regular town events and links to the other chapters', async () => {
    const coverage = {};
    for (const chapter of ['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'sg']) {
      await go(chapter);
      const expected = await page.evaluate(chapterId => [window.VP_TOWN_EARLY, window.VP_TOWN_LATE, window.VP_TOWN_SUPPLEMENT]
        .flatMap(dataset => dataset.events || [])
        .filter(event => event.chapters?.includes(chapterId) && !/-reunion-/.test(event.id))
        .map(event => event.id), chapter);
      for (const id of expected) await readable(card(id));
      const summary = page.locator('#chapter-npc-summary');
      await summary.waitFor(); assert.equal(await summary.isVisible(), true);
      for (const id of ['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'sg']) {
        assert.ok(await summary.locator('a[href="#walkthrough/' + id + '"]').count(), 'Missing chapter link ' + id);
      }
      coverage[chapter] = expected.length;
    }
    details.visibleRegularEvents = coverage;
  });

  await check('Released-Einherjar NPCs are separate conditional candidates and each chapter shows only its reward phase', async () => {
    await go('ch3');
    const conditional = page.locator('.chapter-reunion-guide');
    await conditional.waitFor();
    assert.match(await conditional.innerText(), /招募/);
    assert.match(await conditional.innerText(), /解放/);
    assert.match(await conditional.innerText(), /互斥/);
    assert.match(await conditional.innerText(), /20/);
    const earlyMoney = conditional.locator('[data-reunion-character="e03"]');
    assert.match(await earlyMoney.innerText(), /50,000/);
    assert.equal(await conditional.locator('[data-reunion-character="e02"]').count(), 0, 'Late-only gift must not be promised in chapter three');
    assert.equal(await conditional.locator('[data-reunion-character="e07"]').count(), 0, 'SG-only gift must not be promised in chapter three');
    const earlyItem = conditional.locator('[data-reunion-character="e04"]');
    assert.match(await earlyItem.innerText(), /識者の経験/);
    assert.match(await earlyItem.innerText(), /×\s*1/, 'The Eclesis singular-item account verifies one early Richelle reward');
    const more = earlyItem.locator('a[href^="#towns/"]').first();
    await more.click();
    const detailsCard = page.locator('[data-town-event="coriander-reunion-richelle"]').first();
    await readable(detailsCard);
    assert.match(await detailsCard.innerText(), /ジェシカ|シルフィード/);
    await go('ch6');
    const late = page.locator('.chapter-reunion-guide');
    assert.match(await late.locator('[data-reunion-character="e02"]').innerText(), /ユミルの涙/);
    assert.match(await late.locator('[data-reunion-character="e02"]').innerText(), /數量未載明/, 'Unstated counts must remain distinct from newly verified single-item gifts');
    assert.equal(await late.locator('[data-reunion-character="e03"]').count(), 0, 'Early-only money must not reappear in chapter six');
    await go('sg');
    const sg = page.locator('.chapter-reunion-guide');
    assert.match(await sg.locator('[data-reunion-character="e07"]').innerText(), /300,000/);
  });

  await check('Forest and mine completions directly remind players whom to revisit and show exact return rewards', async () => {
    for (const [stage, town, id, reward] of [
      ['forest-return', 'coriander', 'town-coriander-forest-return', '識者の経験'],
      ['mine-return', 'villnore', 'town-villnore-mine-return', 'メタボライザー']
    ]) {
      await go('ch4', stage);
      const reminder = page.locator('#stage-' + stage + ' .stage-npc-reminders');
      await reminder.waitFor(); assert.equal(await reminder.isVisible(), true);
      assert.match(await reminder.innerText(), /回|委託|回報/);
      assert.match(await reminder.innerText(), new RegExp(reward));
      assert.match(await reminder.innerText(), /(?:×\s*1|1\s*(?:個|件|份))/);
      const href = '#towns/' + town + '/ch4/' + id;
      assert.ok(await reminder.locator('a[href="' + href + '"]').count(), 'Reminder must link to the exact NPC task');
    }
  });

  await check('A later-chapter food requirement opens real monster sources without leaving the walkthrough first', async () => {
    await go('ch3');
    const chicken = card('coriander-chicken-feeding');
    await chicken.locator('.material-list [data-guide-item="骨クズ"]').first().click();
    await page.locator('#detail-dialog[open]').waitFor();
    const body = page.locator('#detail-body');
    assert.match(await body.innerText(), /怪物掉落|部位/);
    assert.match(await body.innerText(), /スケルトン/);
    assert.ok(await body.locator('a[href*="#walkthrough/"][href*="/drops/"]').count());
    assert.match(new URL(page.url()).hash, /^#walkthrough\/ch3$/);
    await page.keyboard.press('Escape');
  });

  await check('Chapter guides and detailed rewards fit 390px and 320px screens with readable primary text', async () => {
    const results = [];
    for (const width of [390, 320]) {
      await page.setViewportSize({width, height: 844});
      await go('ch6');
      const boy = card('town-kalstad-boy-reward-ch6'); await readable(boy);
      const result = await boy.evaluate(element => ({
        width: innerWidth, documentWidth: document.documentElement.scrollWidth,
        sizes: [...element.querySelectorAll('dd, .quest-steps > li, .material-list > li, .event-rewards td')]
          .map(node => parseFloat(getComputedStyle(node).fontSize))
      }));
      assert.ok(result.documentWidth <= width + 1, width + 'px document overflow: ' + result.documentWidth);
      assert.ok(result.sizes.length > 0 && result.sizes.every(size => size >= 16), 'Primary NPC text below 16px');
      assert.ok(await boy.locator('.event-rewards').evaluate(element => element.clientWidth <= innerWidth), 'Reward table must have a bounded scroll container');
      results.push(result);
    }
    details.mobile = results;
    await page.screenshot({path: path.join(output, 'chapter-six-npcs-mobile-320.png'), fullPage: true});
    await page.setViewportSize({width: 1440, height: 1000});
  });

  await check('Offline HTML exposes chapter-six tasks and linked weapon details without network access', async () => {
    const offline = await browser.newContext({offline: true, viewport: {width: 1280, height: 900}});
    const p = await offline.newPage(); p.setDefaultTimeout(12000);
    p.on('pageerror', error => errors.push('offline: ' + error.message));
    try {
      await p.goto(pathToFileURL(path.join(root, 'dist', 'valkyrie-profile-2.html')).href + '#walkthrough/ch6', {waitUntil: 'domcontentloaded'});
      const boy = p.locator('.chapter-npc-guide [data-town-event="town-kalstad-boy-reward-ch6"]').first();
      await readable(boy);
      const trigger = boy.locator('.event-rewards [data-guide-item="光剣クラウソナス"]').first();
      await trigger.click();
      await p.locator('#detail-dialog[open]').waitFor();
      assert.match(await p.locator('#detail-body').innerText(), /クラウソナス/);
      assert.match(await p.locator('#detail-body').innerText(), /300|少年|牧童/);
    } finally { await offline.close(); }
  });

  await check('No browser exceptions or missing website resources', async () => {
    assert.deepEqual(errors, []); assert.deepEqual(badRequests, []);
  });
  const report = {status: failures.length ? 'failed' : 'passed', origin, checks, failures, details, errors, badRequests, checkedAt: new Date().toISOString()};
  fs.writeFileSync(path.join(output, 'chapter-npc-browser-checks.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({status: report.status, passed: checks.length, failed: failures.length, failures}, null, 2));
  await browser.close();
  if (failures.length) process.exitCode = 1;
})().catch(async error => { console.error(error); await browser?.close(); process.exitCode = 1; });
