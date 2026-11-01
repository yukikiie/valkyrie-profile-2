/* 補足配方材料中「主線角色初期裝備」的取得路線，非敵人掉落。 */
window.VP_CRAFTING_ACQUISITION = {
  sources: [
    {id:'craft-acq-gundam',title:'Gundam4fun Items Guide：Saint’s Halberd 為 Hrist 初期武器及唯一品',url:'https://www.supercheats.com/playstation2/walkthroughs/valkyrieprofile2silmeria-walkthrough09.txt',checked:'2026-11-01'},
    {id:'craft-acq-seiju-ch6',title:'青珠原作者：第六章第一層加入亞莉，並提醒轉移其裝備',url:'https://www.seiju.info/vp2/chart/chart5.html',checked:'2026-11-01'},
    {id:'craft-acq-pluto-party',title:'Pluto 原作者：亞莉加入地點為雷札德・瓦雷斯之塔',url:'https://www.pluto-dm.com/vp2/party01.html',checked:'2026-11-01'}
  ],
  records: [
    {
      id:'saints-halberd-hrist-initial',item:'聖槍セントハルバード',chapter:'ch6',stageId:'tower-1',character:'亞莉／アーリィ（Hrist）',quantity:1,
      location:'第六章開始，雷札德・瓦雷斯之塔第一層的主線加入事件。',
      method:'取得ドラゴンオーブ與水鏡、亞莉加入隊伍後，打開裝備選單，把她初期裝備的聖槍セントハルバード卸下。這把槍是蛇矛バジリスク配方所需的 1 把武器。',
      condition:'需先完成第五章瓦爾哈拉宮殿，進入第六章並讓亞莉正式加入；第四章敵方亞莉戰不能取得這把初期武器。',
      notes:'原作者列為唯一品。出售給人界移動行商人製作蛇矛バジリスク會消耗這把槍；若要保留聖槍收藏，請先保留獨立存檔，再決定是否製作。蛇矛配方另外需要貫通の刻印×3、錬金術の書×1及700,000 OTH。',
      sourceIds:['craft-acq-gundam','craft-acq-seiju-ch6','craft-acq-pluto-party']
    },
    {
      id:'scarlet-fang-winter-wolf-head',item:'真紅の牙',chapter:'ch4',stageId:'scavina',monsterId:'m089',part:'頭部',quantity:null,
      location:'第四章斯卡維亞溪谷（スカビア渓谷），通常敵人冬狼ウインターウルフ。',
      method:'對冬狼破壞頭部可取得真紅の牙（Scarlet Fang）。名刀五月雨配方需要 3 個，請收集到足量再回索爾德交料。',
      condition:'第四章通過斯卡維亞溪谷時可開始收集；本筆只補原掉落表未寫明的部位，不把機率掉落當成必掉。',
      notes:'原作者 Items Guide 的 Scarlet Fang 項目與 Winter Wolf 部位表都指定 Head；未提供可核實的單次數量與機率，因此留空。',
      sourceIds:['craft-acq-gundam']
    }
  ]
};
