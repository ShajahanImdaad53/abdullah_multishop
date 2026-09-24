import fs from 'fs';
import * as cheerio from 'cheerio';

async function scrapeCategory(url, category, brand) {
  const products = [];
  try {
    const response = await fetch(url);
    const html = await response.text();
    fs.writeFileSync('debug.html', html);
    const $ = cheerio.load(html);

    $('li.product').each((i, el) => {
      const $el = $(el);
      const name = $el.find('.woocommerce-loop-product__title').text().trim();
      const image = $el.find('img.attachment-woocommerce_thumbnail').attr('src');
      let priceStr = $el.find('.price .woocommerce-Price-amount bdi').last().text().trim();
      if (!priceStr) {
        priceStr = $el.find('.price .amount').last().text().trim();
      }
      
      const price = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
      
      let idStr = $el.find('.add_to_cart_button').attr('data-product_id');
      if (!idStr) {
        const classes = $el.attr('class') || '';
        const match = classes.match(/post-(\d+)/);
        if (match) idStr = match[1];
      }
      
      if (name && price && idStr) {
        products.push({
          id: `${category}-${idStr}`,
          name: name,
          price: price,
          image: image,
          category: category,
          brand: brand,
          description: name
        });
      }
    });
    
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
  }
  return products;
}

async function main() {
  const p = await scrapeCategory('https://www.atlas.lk/myshop/brand/innovate/', 'Innovate', 'Innovate');
  console.log(`Found ${p.length} products.`);
  if (p.length > 0) {
    console.log(p[0]);
  }
}

main();
