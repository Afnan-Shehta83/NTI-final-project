// Product Detail Page Logic
let basePrice = 1699;
let currentQty = 1;

// Color images mapping
const colorImages = {
  'space-gray': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600',
  'silver': 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600',
  'gold': 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600'
};

// Update Dynamic Price
function updateTotalPrice() {
  const memorySelect = document.getElementById('memorySelect');
  const storageSelect = document.getElementById('storageSelect');

  let extraPrice = 0;
  if (memorySelect) extraPrice += parseFloat(memorySelect.value) || 0;
  if (storageSelect) extraPrice += parseFloat(storageSelect.value) || 0;

  const singleUnitPrice = basePrice + extraPrice;
  const totalPrice = singleUnitPrice * currentQty;

  const priceElement = document.getElementById('productPrice');
  if (priceElement) {
    priceElement.textContent = `$${totalPrice.toLocaleString()}`;
  }
}

// Change Main Image via Thumbnails safely without breaking layout
function changeImage(element, src) {
  const mainImg = document.getElementById('mainProductImg');
  if (mainImg) {
    mainImg.src = src;
  }
  
  const thumbs = document.querySelectorAll('.thumb-img');
  thumbs.forEach(img => img.classList.remove('active'));
  element.classList.add('active');
}

// Change Color & Update Main Image
function selectColor(element, colorKey) {
  const dots = document.querySelectorAll('.color-dot');
  dots.forEach(dot => dot.classList.remove('active'));
  element.classList.add('active');

  if (colorImages[colorKey]) {
    const mainImg = document.getElementById('mainProductImg');
    if (mainImg) {
      mainImg.src = colorImages[colorKey];
    }
  }
}

// Quantity Counter Functions
function increaseQty() {
  currentQty++;
  const qtyInput = document.getElementById('qtyInput');
  if (qtyInput) {
    qtyInput.value = String(currentQty).padStart(2, '0');
  }
  updateTotalPrice();
}

function decreaseQty() {
  if (currentQty > 1) {
    currentQty--;
    const qtyInput = document.getElementById('qtyInput');
    if (qtyInput) {
      qtyInput.value = String(currentQty).padStart(2, '0');
    }
    updateTotalPrice();
  }
}

// Attach Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  const memorySelect = document.getElementById('memorySelect');
  const storageSelect = document.getElementById('storageSelect');

  if (memorySelect) memorySelect.addEventListener('change', updateTotalPrice);
  if (storageSelect) storageSelect.addEventListener('change', updateTotalPrice);
});