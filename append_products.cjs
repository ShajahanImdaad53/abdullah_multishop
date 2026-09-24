const fs = require('fs');
const productsFile = 'src/data/products.ts';
const newProducts = JSON.parse(fs.readFileSync('new_products.json', 'utf8'));

let productsCode = fs.readFileSync(productsFile, 'utf8');

const lastBracket = productsCode.lastIndexOf('];');
if (lastBracket !== -1) {
  let toInsert = '';
  for (const p of newProducts) {
    toInsert += `,\n  {
    id: ${JSON.stringify(p.id)},
    name: ${JSON.stringify(p.name)},
    price: ${p.price},
    image: ${JSON.stringify(p.image)},
    category: ${JSON.stringify(p.category)},
    brand: ${JSON.stringify(p.brand)},
    description: ${JSON.stringify(p.description)}
  }`;
  }
  
  productsCode = productsCode.substring(0, lastBracket) + toInsert + '\n];\n';
  fs.writeFileSync(productsFile, productsCode);
  console.log('Appended successfully');
}
