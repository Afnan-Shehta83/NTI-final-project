// ==================== STORAGE FUNCTIONS ====================
function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem('clicon_wishlist')) || [];
  } catch (e) {
    return [];
  }
}

function saveWishlist(wishlist) {
  localStorage.setItem('clicon_wishlist', JSON.stringify(wishlist));
}

function addToWishlist(productId) {
  let wishlist = getWishlist();
  const id = Number(productId);
  if (!wishlist.includes(id)) {
    wishlist.push(id);
    saveWishlist(wishlist);
    showToast('Added to wishlist ❤️');
  }
  updateWishlistUI();
  return wishlist;
}

function removeFromWishlist(productId) {
  let wishlist = getWishlist();
  const id = Number(productId);
  wishlist = wishlist.filter(item => item !== id);
  saveWishlist(wishlist);
  showToast('Removed from wishlist');
  updateWishlistUI();
  return wishlist;
}

function isInWishlist(productId) {
  return getWishlist().includes(Number(productId));
}

function clearWishlist() {
  if (confirm('Are you sure you want to clear your wishlist?')) {
    saveWishlist([]);
    updateWishlistUI();
    showToast('Wishlist cleared');
  }
}

// دالة التبديل الموحدة
function toggleWishlist(productId) {
  const id = Number(productId);
  if (isInWishlist(id)) {
    removeFromWishlist(id);
    return false;
  } else {
    addToWishlist(id);
    return true;
  }
}

// ==================== UPDATE WISHLIST UI & COUNT ====================
function updateWishlistUI() {
  const wishlist = getWishlist();
  const count = wishlist.length;

  // 1. تحديث العداد في Header
  const badge = document.getElementById('wishlistCount');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-block' : 'none';
  }

  // 2. تحديث شكل كل أزرار القلوب في الصفحة
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    const btnId = Number(btn.getAttribute('data-id'));
    const icon = btn.querySelector('i');
    
    if (icon) {
      if (wishlist.includes(btnId)) {
        icon.className = 'fa-solid fa-heart text-danger';
      } else {
        icon.className = 'fa-regular fa-heart';
      }
    }
  });

  // 3. إعادة رندر الجدول لو إحنا في صفحة wishlist.html
  renderWishlist();
}

// ==================== PRODUCTS DATA ====================
const wishlistProducts = [
  {
    id: 1,
    title: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear Headphones for Workouts and Running, Triple Black",
    price: "$1,299.00",
    originalPrice: "$999.00",
    inStock: true,
    img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200"
  },
  {
    id: 2,
    title: "Simple Mobile 5G LTE Galaxy 12 Mini 512GB Gaming Phone",
    price: "$2,300.00",
    originalPrice: null,
    inStock: true,
    img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200"
  },
  {
    id: 3,
    title: "Portable Washing Machine, 11lbs capacity Model 18NMFIAM",
    price: "$70.00",
    originalPrice: null,
    inStock: true,
    img: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=200"
  },
  {
    id: 4,
    title: "TOZO T6 True Wireless Earbuds Bluetooth Headphones Touch Control with Wireless Charging Case IPX8 Waterproof Stereo Earphones in-Ear",
    price: "$250.00",
    originalPrice: "$220.00",
    inStock: false,
    img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200"
  },
  {
    id: 5,
    title: "Wyze Cam Pan v2 1080p Pan/Tilt/Zoom Wi-Fi Indoor Smart Home Camera with Color Night Vision, 2-Way Audio",
    price: "$1,499.99",
    originalPrice: null,
    inStock: true,
    img: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=200"
  }
];

// ==================== RENDER WISHLIST ====================
function renderWishlist() {
  const wishlistIds = getWishlist();
  const tbody = document.getElementById('wishlistTableBody');
  const emptyState = document.getElementById('emptyWishlist');
  const continueShopping = document.getElementById('continueShopping');
  const totalItems = document.getElementById('wishlistTotalItems');
  
  if (!tbody) return;
  
  const items = wishlistProducts.filter(p => wishlistIds.includes(p.id));
  
  if (totalItems) {
    totalItems.textContent = `${items.length} Item${items.length !== 1 ? 's' : ''}`;
  }
  
  if (items.length === 0) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.classList.remove('d-none');
    if (continueShopping) continueShopping.style.display = 'none';
    return;
  }
  
  if (emptyState) emptyState.classList.add('d-none');
  if (continueShopping) continueShopping.style.display = 'block';
  
  tbody.innerHTML = items.map((product, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>
        <div class="d-flex align-items-center gap-3">
          <img src="${product.img}" alt="${product.title}" class="wishlist-product-img" 
               onerror="this.src='https://placehold.co/200x200/E4E7E9/191C1F?text=Product'">
          <div>
            <div class="fw-semibold text-dark fs-7 wishlist-product-title">${product.title}</div>
          </div>
        </div>
      </td>
      <td>
        <div>
          <span class="fw-bold text-brand-blue">${product.price}</span>
          ${product.originalPrice ? `<span class="text-decoration-line-through text-muted fs-8 ms-1">${product.originalPrice}</span>` : ''}
        </div>
      </td>
      <td>
        <span class="badge ${product.inStock ? 'bg-success' : 'bg-danger'}">
          ${product.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
        </span>
      </td>
      <td>
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-orange btn-sm" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
            <i class="fa-regular fa-cart-shopping me-1"></i> ADD TO CART
          </button>
          <button class="btn btn-outline-danger btn-sm" onclick="removeFromWishlistUI(${product.id})" title="Remove from wishlist">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// ==================== REMOVE FROM WISHLIST UI ====================
function removeFromWishlistUI(productId) {
  removeFromWishlist(productId);
}

// ==================== ADD TO CART ====================
function addToCart(productId) {
  const product = wishlistProducts.find(p => p.id === Number(productId));
  if (!product) return;
  
  let cart = JSON.parse(localStorage.getItem('clicon_cart')) || [];
  
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      img: product.img
    });
  }
  
  localStorage.setItem('clicon_cart', JSON.stringify(cart));
  updateCartCount();
  showToast('Product added to cart! 🛒');
}

// ==================== UPDATE CART COUNT ====================
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('clicon_cart')) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const badge = document.querySelector('.position-relative .badge');
  if (badge) {
    badge.textContent = count;
  }
}

// ==================== TOAST NOTIFICATION ====================
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast align-items-center text-white bg-dark border-0 show mb-2';
  toast.role = 'alert';
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <i class="fa-regular fa-circle-check me-2 text-success"></i> ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" onclick="this.parentElement.parentElement.remove()"></button>
    </div>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ==================== GLOBAL EXPORTS & EVENT LISTENERS ====================
window.clearWishlist = clearWishlist;
window.removeFromWishlistUI = removeFromWishlistUI;
window.addToCart = addToCart;
window.updateWishlistCount = updateWishlistUI;
window.toggleWishlist = toggleWishlist;
window.addToWishlistGlobal = function(productId) { addToWishlist(productId); };
window.removeFromWishlistGlobal = function(productId) { removeFromWishlist(productId); };

// Listening للضغط على القلوب في الصفحة كلها
document.addEventListener('click', function (e) {
  const wishlistBtn = e.target.closest('.wishlist-btn');
  if (wishlistBtn) {
    e.preventDefault();
    e.stopPropagation();
    
    const productId = wishlistBtn.getAttribute('data-id');
    if (productId) {
      toggleWishlist(productId);
    }
  }
});

// INITIALIZE
document.addEventListener('DOMContentLoaded', function() {
  updateWishlistUI();
  updateCartCount();
  
  // Top search functionality
  const topSearchBtn = document.querySelector('.search-bar-main .btn');
  const topSearchInput = document.getElementById('topSearchInput');
  
  if (topSearchBtn && topSearchInput) {
    topSearchBtn.addEventListener('click', function() {
      const query = topSearchInput.value.trim();
      if (query) {
        window.location.href = `index.html?search=${encodeURIComponent(query)}`;
      }
    });
    
    topSearchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        const query = this.value.trim();
        if (query) {
          window.location.href = `index.html?search=${encodeURIComponent(query)}`;
        }
      }
    });
  }
});