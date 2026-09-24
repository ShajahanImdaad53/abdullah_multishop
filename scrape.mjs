import fs from 'fs';
import * as cheerio from 'cheerio';

async function scrapeCategory(url, category, brand) {
  const products = [];
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    $('.product-grid-item').each((i, el) => {
      const $el = $(el);
      const name = $el.find('h3.wd-entities-title a').text().trim();
      const image = $el.find('img').first().attr('src');
      let priceStr = $el.find('.price .woocommerce-Price-amount bdi').first().text().trim();
      if (!priceStr) {
        priceStr = $el.find('.price .amount').first().text().trim();
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
          id: `${category.toLowerCase().replace(/ /g, '-')}-${idStr}`,
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
  const allProducts = [];
  
  // Scrape EDU Toys
  console.log("Scraping EDU Toys...");
  for (let page = 1; page <= 5; page++) {
    const url = page === 1 
      ? 'https://www.atlas.lk/myshop/product-category/edu-toys/'
      : `https://www.atlas.lk/myshop/product-category/edu-toys/page/${page}/`;
    const p = await scrapeCategory(url, 'EDU Toys', 'Atlas');
    if (p.length === 0) break;
    allProducts.push(...p);
  }

  // Scrape Innovate
  console.log("Scraping Innovate...");
  for (let page = 1; page <= 5; page++) {
    const url = page === 1 
      ? 'https://www.atlas.lk/myshop/brand/innovate/'
      : `https://www.atlas.lk/myshop/brand/innovate/page/${page}/`;
    const p = await scrapeCategory(url, 'Innovate', 'Innovate');
    if (p.length === 0) break;
    allProducts.push(...p);
  }
  
  console.log(`Found ${allProducts.length} new products.`);
  fs.writeFileSync('new_products.json', JSON.stringify(allProducts, null, 2));
}

main();
