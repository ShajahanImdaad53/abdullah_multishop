const fs = require('fs');

const path = 'src/data/products.ts';
let content = fs.readFileSync(path, 'utf8');

// We have 10 products with /logo.jpg. Let's replace them with nice stock images.
const images = [
  'https://images.unsplash.com/photo-1544473244-f6895e69da8e?w=800&q=80', // zip file
  'https://images.unsplash.com/photo-1628126235206-5260b9ea6441?w=800&q=80', // organizer
  'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80', // bill holder
  'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80', // box file green
  'https://images.unsplash.com/photo-1544473244-f6895e69da8e?w=800&q=80', // certificate file
  'https://images.unsplash.com/photo-1628126235206-5260b9ea6441?w=800&q=80', // expanding file
  'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80', // maroon box file
  'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80', // black box file
  'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80', // exec black
  'https://images.unsplash.com/photo-1544473244-f6895e69da8e?w=800&q=80'  // mini zip
];

let counter = 0;
content = content.replace(/"image": "\/logo\.jpg"/g, () => {
  const newImage = images[counter] || 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80';
  counter++;
  return `"image": "${newImage}"`;
});

fs.writeFileSync(path, content, 'utf8');
console.log(`Replaced ${counter} missing images.`);
