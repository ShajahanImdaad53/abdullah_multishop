// Paste this into your browser's Developer Console on the Daraz page
let items = [];
document.querySelectorAll('[data-qa-locator="product-item"]').forEach(node => {
  let titleEl = node.querySelector('a[title]');
  let name = titleEl ? titleEl.getAttribute('title') : '';
  
  let imgEl = node.querySelector('img[src]');
  let image = imgEl ? imgEl.src : '';
  
  let priceEl = node.querySelector('.price--NVB62, .price, span.currency');
  let priceStr = priceEl ? priceEl.innerText : '';
  let price = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
  
  let origPriceEl = node.querySelector('.origPrice--sZ_H8, del');
  let origPriceStr = origPriceEl ? origPriceEl.innerText : '';
  let originalPrice = origPriceStr ? parseFloat(origPriceStr.replace(/[^0-9.]/g, '')) : null;
  
  if (name && price) {
    items.push({ name, image, price, originalPrice });
  }
});
console.log(JSON.stringify(items, null, 2));
// To download the JSON file:
let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(items, null, 2));
let downloadAnchorNode = document.createElement('a');
downloadAnchorNode.setAttribute("href",     dataStr);
downloadAnchorNode.setAttribute("download", "promate.json");
document.body.appendChild(downloadAnchorNode);
downloadAnchorNode.click();
downloadAnchorNode.remove();
