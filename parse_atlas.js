const fs = require('fs');
const cheerio = require('cheerio');

function parseAtlas() {
  const atlasProducts = [];
  
  const html = fs.readFileSync('atlas_all.html', 'utf8');
  const $ = cheerio.load(html);
  
  const productsOnPage = $('.product');
  console.log(`Found ${productsOnPage.length} products in atlas_all.html`);
  
  productsOnPage.each((i, el) => {
    const titleEl = $(el).find('.woocommerce-loop-product__title, .product-title, h3 a').first();
    let name = titleEl.text().trim();
    if (!name) return;
    name = name.replace(/[^\x00-\x7F]/g, "").trim();

    const imgEl = $(el).find('img').first();
    let image = imgEl.attr('src');
    if (imgEl.attr('data-src')) {
        image = imgEl.attr('data-src');
    }
    // We leave the image URL as is because stripping dimensions causes 404s on the original images.

    const priceEl = $(el).find('.woocommerce-Price-amount bdi').first();
    let priceText = priceEl.text().trim();
    let price = 0; 
    if (priceText) {
        const match = priceText.match(/[\d,]+(\.\d+)?/);
        if (match) {
            price = parseFloat(match[0].replace(/,/g, ''));
        }
    }

    atlasProducts.push({
        id: `atlas_p_all_${i}`,
        name,
        image: image || '',
        price: price || 100,
        brand: 'Atlas',
        category: 'Books & Supplies'
    });
  });

  // Keep unique only (since maybe pagination overlapped or repeated)
  const uniqueProducts = Array.from(new Map(atlasProducts.map(item => [item.name, item])).values());
  
  console.log(`Scraped ${uniqueProducts.length} unique Atlas products.`);

  // Merge with existing promate products
  let existingProducts = [];
  if (fs.existsSync('promate_products.json')) {
    existingProducts = JSON.parse(fs.readFileSync('promate_products.json', 'utf8'));
  }

  const allProducts = [...existingProducts, ...uniqueProducts];
  
  const fileContent = `export const products = \n${JSON.stringify(allProducts, null, 2)};\n`;
  fs.writeFileSync('src/data/products.ts', fileContent, 'utf8');
  console.log(`Total combined products saved: ${allProducts.length}`);
}

parseAtlas();
