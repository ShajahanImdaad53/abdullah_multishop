const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://www.daraz.lk/promate-55114/';

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1'
  }
};

https.get(url, options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync(path.join(__dirname, 'daraz.html'), data);
    console.log('HTML saved to daraz.html');
    
    // Check if we have pageData
    if (data.includes('window.pageData')) {
      console.log('Found window.pageData!');
      const match = data.match(/window\.pageData\s*=\s*(\{.*?\});/);
      if (match) {
        fs.writeFileSync(path.join(__dirname, 'daraz.json'), match[1]);
        console.log('Saved pageData to daraz.json');
      }
    } else {
      console.log('No window.pageData found. Length:', data.length);
      console.log(data.substring(0, 500));
    }
  });
}).on('error', (err) => {
  console.log('Error:', err.message);
});
