import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const url = process.env.OLIVO_URL || 'http://localhost:5176';
const output = '.impeccable/review';
await mkdir(output,{recursive:true});
const browser = await chromium.launch({channel:'chrome',headless:true});
const report = [];
try {
  for (const [device,width,height] of [['desktop',1440,900],['mobile',390,844],['tablet',768,1024],['boundary',701,900]]) {
    const page = await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
    for (const route of ['index','cardapio','programacao','galeria','contato']) {
      if(device==='boundary'&&route!=='cardapio')continue;
      await page.goto(`${url}/${route}.html`);
      await page.evaluate(async () => {
        await document.fonts.ready;
        document.querySelectorAll('img').forEach(img=>img.loading='eager');
        await Promise.all([...document.images].map(img=>img.decode().catch(()=>{})));
      });
      await page.screenshot({path:`${output}/${route}-${device}.png`,fullPage:true});
      report.push(await page.evaluate(({device,route})=>({device,route,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.body.scrollHeight,broken:[...document.images].filter(img=>!img.naturalWidth).map(img=>img.src),overflow:[...document.querySelectorAll('main *')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&(r.left< -1||r.right>innerWidth+1)&&!el.closest('.cocktail-deck,.sr-only,.svg-library,.date-options')}).slice(0,8).map(el=>el.className)}),{device,route}));
    }
    await page.close();
  }
  await writeFile(`${output}/layout.json`,JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
} finally {await browser.close();}
