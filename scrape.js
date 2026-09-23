const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('promate_products.html', 'utf16le');
const $ = cheerio.load(html);

const products = [];

$('.ps-product').each((i, el) => {
    // Only grab the first anchor text for title
    const titleEl = $(el).find('.ps-product__title').first();
    let name = titleEl.text().trim();
    
    // Fix unicode issues
    name = name.replace(/[^\x00-\x7F]/g, "").replace(' | ', '').trim();
    if (!name) return; // Skip empty names

    const imgEl = $(el).find('img').first();
    let image = imgEl.attr('src');
    // We leave the image URL as is because stripping dimensions causes 404s on the original images.

    const priceEl = $(el).find('.ps-product__price').first();
    let priceText = priceEl.text().trim();
    let price = 500; // default
    if (priceText) {
        const match = priceText.match(/[\d,.]+/);
        if (match) {
            price = parseFloat(match[0].replace(/,/g, ''));
        }
    }

    products.push({
        id: 'promate_' + i,
        name,
        image,
        price,
        brand: 'Promate',
        category: 'Stationery'
    });
});

fs.writeFileSync('promate_products.json', JSON.stringify(products, null, 2), 'utf-8');
console.log(`Found ${products.length} products`);
