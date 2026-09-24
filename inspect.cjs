const fs = require('fs');
const html = fs.readFileSync('debug.html', 'utf8');
const cheerio = require('cheerio');
const $ = cheerio.load(html);

console.log('product class:', $('.product').length);
console.log('product-grid-item:', $('.product-grid-item').length);
console.log('wd-product:', $('.wd-product').length);
console.log('type-product:', $('.type-product').length);

$('.product-grid-item').slice(0, 1).each((i, el) => {
  console.log($(el).html());
});
