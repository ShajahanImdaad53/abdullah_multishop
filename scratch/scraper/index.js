const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Navigate to Promate on Daraz
  await page.goto('https://www.daraz.lk/promate-55114/', { waitUntil: 'networkidle2' });

  // Scroll down multiple times to lazy load products
  for(let i=0; i<5; i++) {
    await page.evaluate(() => window.scrollBy(0, 1000));
    await new Promise(r => setTimeout(r, 1000));
  }

  const products = await page.evaluate(() => {
    const items = [];
    // Daraz grid item selector is usually `.gridItem--Yd0sa` or similar
    // Let's use a broader approach by looking at elements with a title and image
    
    // Attempt 1: Target typical Daraz item wrapper
    const nodes = document.querySelectorAll('.gridItem--Yd0sa, [data-qa-locator="product-item"]');
    
    if (nodes.length > 0) {
      nodes.forEach(node => {
        const titleEl = node.querySelector('.title--wFj93, .title, a[title]');
        let name = titleEl ? (titleEl.innerText || titleEl.getAttribute('title')) : '';
        
        const imgEl = node.querySelector('img[src]');
        let image = imgEl ? imgEl.src : '';
        
        const priceEl = node.querySelector('.price--NVB62, .price');
        let priceStr = priceEl ? priceEl.innerText : '';
        let price = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
        
        const origPriceEl = node.querySelector('.origPrice--sZ_H8, .original-price, del');
        let origPriceStr = origPriceEl ? origPriceEl.innerText : '';
        let originalPrice = origPriceStr ? parseFloat(origPriceStr.replace(/[^0-9.]/g, '')) : null;
        
        if (name && price) {
          items.push({ name, image, price, originalPrice });
        }
      });
    } else {
       // fallback for older or different daraz UI
       const cards = document.querySelectorAll('.c2prKC');
       cards.forEach(card => {
          const title = card.querySelector('.c16H9d');
          const name = title ? title.innerText : '';
          
          const img = card.querySelector('.c1e2gb img');
          const image = img ? img.src : '';
          
          const priceSpan = card.querySelector('.c13VH6');
          const priceStr = priceSpan ? priceSpan.innerText : '';
          const price = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
          
          const origSpan = card.querySelector('.c1-B2V');
          const origPriceStr = origSpan ? origSpan.innerText : '';
          const originalPrice = origPriceStr ? parseFloat(origPriceStr.replace(/[^0-9.]/g, '')) : null;
          
          if (name && price) {
             items.push({ name, image, price, originalPrice });
          }
       });
    }

    return items;
  });

  fs.writeFileSync('promate.json', JSON.stringify(products, null, 2));
  console.log(`Scraped ${products.length} products`);

  await browser.close();
}

run();
