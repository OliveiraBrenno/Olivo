import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const port = 5189;
const base = `http://localhost:${port}`;
const server = spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--port',String(port),'--strictPort'],{stdio:'pipe'});
let browser;
const failures = [];
try {
  await new Promise((resolve,reject)=>{
    const timer=setTimeout(()=>reject(new Error('Preview did not start')),15000);
    server.stdout.on('data',data=>{if(data.toString().includes('localhost')){clearTimeout(timer);resolve();}});
    server.once('error',reject);
    server.once('exit',code=>{if(code)reject(new Error(`Preview exited ${code}`));});
  });
  browser = await chromium.launch({channel:'chrome',headless:true});
  const page = await browser.newPage({acceptDownloads:true});
  const errors = [];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('response',response=>{if(response.status()>=400)errors.push(`${response.status()} ${response.url()}`);});
  const ready = async()=>page.evaluate(async()=>{
    await document.fonts.ready;
    document.querySelectorAll('img').forEach(img=>img.loading='eager');
    await Promise.all([...document.images].map(img=>img.decode()));
  });
  // Every public route is exercised against the production build, including breakpoint edges.
  for(const width of [320,390,600,700,701,768,1024,1440,1920]) {
    await page.setViewportSize({width,height:900});
    for(const route of ['index','cardapio','programacao','galeria','contato']) {
      await page.goto(`${base}/${route}.html`); await ready();
      const measure = await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,shell:document.querySelector('.site-shell').getBoundingClientRect().width,heading:document.querySelectorAll('h1').length,emptyLinks:[...document.querySelectorAll('a[href]')].filter(a=>!a.getAttribute('href')).length}));
      if(measure.scrollWidth>width)failures.push(`${route}: overflow ${measure.scrollWidth-width}px at ${width}px`);
      assert.ok(measure.shell<=1120,`Content too wide: ${route}`);
      assert.equal(measure.heading,1,`Heading on ${route}`);
      assert.equal(measure.emptyLinks,0);
      assert.equal(await page.locator('nav [aria-current="page"]').getAttribute('href'),`./${route}.html`);
      if(route==='cardapio'&&width>=701&&width<=950) {
        const collision=await page.evaluate(()=>{
          const heading=document.querySelector('#author-title').getBoundingClientRect();
          const card=document.querySelector('.menu-drink').getBoundingClientRect();
          return heading.bottom>card.top&&heading.right>card.left&&heading.left<card.right;
        });
        assert.equal(collision,false,`Menu heading overlaps card at ${width}px`);
      }
      if(width<=700) {
        await page.locator('.menu-toggle').click();
        assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
      }
    }
    console.log(`Checked 5 pages at ${width}px`);
  }
  assert.deepEqual(failures,[],'Responsive layout failures');

  await page.setViewportSize({width:390,height:844});
  await page.goto(base); await ready();
  assert.equal(await page.locator('.drink-card').count(),6);
  const names=[];
  for(let i=0;i<6;i++) {
    names.push(await page.locator('.drink-card[data-position="0"] .drink-name').textContent());
    await page.locator('.next').click();
  }
  assert.equal(new Set(names).size,6);
  assert.match(await page.locator('#carousel-status').textContent(),/1 de 6/);
  await page.locator('.cocktail-deck').focus();
  await page.keyboard.press('ArrowRight');
  assert.match(await page.locator('#carousel-status').textContent(),/Bossa Dourada/);
  await page.locator('.drink-card[data-position="0"]').click();
  assert.equal(await page.locator('dialog').isVisible(),true);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('dialog').isVisible(),false);
  assert.equal(await page.locator('.drink-card[data-position="0"]').evaluate(el=>el===document.activeElement),true);

  await page.goto(`${base}/cardapio.html`); await ready();
  await page.locator('#menu-search').fill('limão');
  assert.ok(await page.locator('.searchable:visible').count()>=4,'Accent-sensitive search failed');
  await page.locator('#menu-search').fill('limAO');
  assert.ok(await page.locator('.searchable:visible').count()>=4,'Accent folding failed');
  await page.locator('#menu-search').fill('espresso');
  assert.equal(await page.locator('.searchable:visible').count(),1);
  assert.match(await page.locator('.searchable:visible').textContent(),/Última Sessão/);
  await page.locator('#menu-search').fill('qwerty-no-such-drink');
  assert.equal(await page.locator('.empty-state').isVisible(),true);
  await page.locator('[data-clear-menu]').click();
  await page.locator('[data-filter="petiscos"]').click();
  assert.equal(await page.locator('.menu-section:visible').count(),1);
  assert.equal(await page.locator('.menu-row:visible').count(),4);
  await page.locator('[data-filter="autorais"]').click();
  assert.equal(await page.locator('.menu-drink:visible').count(),6);
  await page.locator('.menu-drink').last().click();
  assert.match(await page.locator('#dialog-title').textContent(),/Última Sessão/);
  await page.keyboard.press('Escape');

  await page.goto(`${base}/programacao.html`); await ready();
  await page.locator('[data-filter="musica"]').click();
  assert.equal(await page.locator('.agenda-row:visible').count(),2);
  await page.locator('[data-date="jazz"]').click();
  assert.equal(await page.locator('.agenda-row:visible').count(),1);
  await page.locator('[data-filter="cinema"]').click();
  assert.equal(await page.locator('.empty-state').isVisible(),true);
  await page.locator('[data-clear-events]').click();
  assert.equal(await page.locator('.agenda-row:visible').count(),5);
  await page.locator('#samba .ticket-button').click();
  await page.waitForURL(/contato\.html/);
  assert.match(await page.locator('[name="message"]').inputValue(),/Roda de Samba/);

  await page.goto(`${base}/galeria.html`); await ready();
  await page.locator('[data-filter="coqueteis"]').click();
  assert.equal(await page.locator('.gallery-item:visible').count(),2);
  await page.locator('.gallery-item:visible').first().click();
  assert.equal(await page.locator('dialog').isVisible(),true);
  const firstTitle=await page.locator('#dialog-title').textContent();
  await page.keyboard.press('ArrowRight');
  assert.notEqual(await page.locator('#dialog-title').textContent(),firstTitle);
  await page.keyboard.press('Escape');
  await page.locator('[data-show-backstage]').click();
  assert.equal(await page.locator('.gallery-item:visible').count(),1);

  await page.goto(`${base}/contato.html`); await ready();
  await page.locator('[name="name"]').fill('Teste <img src=x onerror=alert(1)>');
  await page.locator('[name="phone"]').fill('21999998888');
  await page.locator('[name="email"]').fill('teste@example.com');
  const tomorrow=new Date(Date.now()+86400000);
  const date=`${tomorrow.getFullYear()}-${String(tomorrow.getMonth()+1).padStart(2,'0')}-${String(tomorrow.getDate()).padStart(2,'0')}`;
  await page.locator('[name="date"]').fill(date);
  await page.locator('[name="time"]').selectOption('19:00');
  await page.locator('[name="people"]').selectOption('4');
  await page.locator('[name="message"]').fill('Uma mesa para conversar.');
  await page.locator('form button[type="submit"]').click();
  assert.match(await page.locator('.prepared-message').textContent(),/Teste <img/);
  assert.equal(await page.locator('.prepared-message img').count(),0,'User input became HTML');
  const whatsapp=new URL(await page.locator('.whatsapp-link').getAttribute('href'));
  assert.equal(whatsapp.hostname,'wa.me');
  assert.equal(whatsapp.pathname,'/');
  assert.match(whatsapp.searchParams.get('text'),/4 pessoa/);
  const downloadPromise=page.waitForEvent('download');
  await page.locator('[data-calendar]').click();
  const download=await downloadPromise;
  assert.equal(download.suggestedFilename(),'visita-olivo.ics');
  const calendar=await readFile(await download.path(),'utf8');
  assert.match(calendar,/BEGIN:VEVENT/); assert.match(calendar,/não confirma uma reserva/);
  await page.locator('[name="message"]').fill('Alterei a mensagem.');
  assert.equal(await page.locator('.message-preview').isVisible(),false,'Stale message preview stayed visible');
  await page.locator('.faq details').nth(1).locator('summary').click();
  assert.equal(await page.locator('.faq details').nth(1).getAttribute('open'),'');
  assert.deepEqual(errors,[],'Browser or HTTP errors');

  // Check actual source pixels, including cover cropping, at a 2x device scale.
  const retina=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
  const imageAudit=[];
  for(const route of ['index','cardapio','programacao','galeria','contato']) {
    await retina.goto(`${base}/${route}.html`);
    await retina.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode()));});
    const images=await retina.locator('main img').evaluateAll(images=>images.filter(img=>img.getBoundingClientRect().width>0).map(img=>({url:img.currentSrc,width:img.getBoundingClientRect().width,height:img.getBoundingClientRect().height,alt:img.alt})));
    for(const img of images) {
      const metadata=await sharp(`dist${new URL(img.url).pathname}`).metadata();
      const density=Math.min(metadata.width/img.width,metadata.height/img.height);
      assert.ok(density>=1.5,`${route}: low-resolution image ${img.alt}: ${density.toFixed(2)}x`);
      imageAudit.push({route,alt:img.alt,density:Number(density.toFixed(2))});
    }
  }
  await retina.close();
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto(base);
  assert.equal(await page.locator('.drink-card').first().evaluate(el=>getComputedStyle(el).transitionDuration),'0s');
  const touchContext=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const touchPage=await touchContext.newPage();
  await touchPage.goto(base);
  await touchPage.locator('.cocktails').scrollIntoViewIfNeeded();
  const rect=await touchPage.locator('.cocktail-deck').boundingBox();
  const cdp=await touchContext.newCDPSession(touchPage);
  const swipe=async(x1,y1,x2,y2)=>{
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x1,y:y1}]});
    for(let i=1;i<=8;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x1+(x2-x1)*i/8,y:y1+(y2-y1)*i/8}]});
    await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  };
  await swipe(rect.x+230,rect.y+100,rect.x+70,rect.y+103);
  assert.match(await touchPage.locator('#carousel-status').textContent(),/Bossa Dourada/);
  assert.equal(await touchPage.locator('dialog').isVisible(),false);
  const scrollBefore=await touchPage.evaluate(()=>scrollY);
  await swipe(rect.x+100,rect.y+180,rect.x+102,rect.y+20);
  await touchPage.waitForFunction(previous=>scrollY>previous,scrollBefore);
  assert.match(await touchPage.locator('#carousel-status').textContent(),/Bossa Dourada/);
  await touchContext.close();
  await mkdir('.impeccable/review',{recursive:true});
  await writeFile('.impeccable/review/image-audit.json',JSON.stringify(imageAudit,null,2));
  console.log('PASS search, filters, 6 cocktails, touch swipes, dialog keyboard/focus, event links, gallery, message validation/escaping, WhatsApp draft, calendar, FAQ, reduced motion and 2x image resolution.');
} finally {await browser?.close();server.kill();}
