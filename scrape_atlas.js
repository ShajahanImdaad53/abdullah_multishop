const fs = require('fs');
const cheerio = require('cheerio');

async function scrapeAtlas() {
  const atlasProducts = [];
  let page = 1;
  let keepScraping = true;
  
  while (keepScraping) {
    console.log(`Scraping Atlas page ${page}...`);
    try {
      const url = page === 1 ? 'https://www.atlas.lk/myshop/shop/' : `https://www.atlas.lk/myshop/shop/page/${page}/`;
      const res = await fetch(url);
      
      const html = await res.text();
      const $ = cheerio.load(html);
      
      const productsOnPage = $('.product');
      if (productsOnPage.length === 0) {
        console.log(`No products found on page ${page}. Stopping scrape.`);
        break;
      }
      
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
            id: `atlas_p${page}_${i}`,
            name,
            image: image || '',
            price: price || 100,
            brand: 'Atlas',
            category: 'Books & Supplies'
        });
      });
      page++;
      
      // Safety break
      if (page > 30) {
        console.log("Hit safety limit of 30 pages.");
        break;
      }
    } catch (err) {
      console.error(err);
      keepScraping = false;
    }
  }

  console.log(`Finished! Scraped ${atlasProducts.length} total Atlas products.`);

  fs.writeFileSync('scratch/temp_atlas.json', JSON.stringify(atlasProducts, null, 2), 'utf8');
  console.log(`Temp atlas products saved: ${atlasProducts.length}`);
}

scrapeAtlas();
