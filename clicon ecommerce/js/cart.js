// ==================== CART LOGIC ====================

// ==================== STORAGE FUNCTIONS ====================
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('clicon_cart')) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('clicon_cart', JSON.stringify(cart));
  updateCartBadges();
}

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem('clicon_wishlist')) || [];
  } catch (e) {
    return [];
  }
}

// ==================== UPDATE BADGES ====================
function updateCartBadges() {
  const cart = getCart();
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const badges = document.querySelectorAll('#cartCount');
  badges.forEach(badge => {
    badge.textContent = count;
  });
}

function updateWishlistBadge() {
  const count = getWishlist().length;
  const badges = document.querySelectorAll('#wishlistCount');
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-block' : 'none';
  });
}

// ==================== RENDER CART ====================
function renderCart() {
  const cart = getCart();
  const tbody = document.getElementById('cartTableBody');
  const emptyCart = document.getElementById('emptyCart');
  const cartActions = document.getElementById('cartActions');
  const itemsCount = document.getElementById('cartItemsCount');
  
  if (!tbody) return;
  
  if (cart.length === 0) {
    tbody.innerHTML = '';
    if (emptyCart) emptyCart.classList.remove('d-none');
    if (cartActions) cartActions.style.display = 'none';
    if (itemsCount) itemsCount.textContent = '0 items in your cart';
    updateTotals();
    return;
  }
  
  if (emptyCart) emptyCart.classList.add('d-none');
  if (cartActions) cartActions.style.display = 'flex';
  if (itemsCount) itemsCount.textContent = `${cart.reduce((t, i) => t + i.quantity, 0)} items in your cart`;
  
  tbody.innerHTML = cart.map((item, index) => `
    <tr>
      <td>
        <div class="d-flex align-items-center gap-3">
          <img src="${item.img || 'https://placehold.co/200x200/E4E7E9/191C1F?text=Product'}" 
               alt="${item.title}" 
               class="cart-product-img"
               onerror="this.src='https://placehold.co/200x200/E4E7E9/191C1F?text=Product'">
          <div>
            <div class="fw-semibold text-dark cart-product-title">${item.title}</div>
          </div>
        </div>
      </td>
      <td>
        <span class="fw-bold text-brand-blue">${item.price}</span>
      </td>
      <td>
        <div class="quantity-wrapper">
          <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">
            <i class="fa-solid fa-minus"></i>
          </button>
          <input type="text" class="qty-input" value="${item.quantity}" 
                 onchange="updateQuantityInput(${item.id}, this.value)" 
                 id="qty_${item.id}">
          <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </td>
      <td>
        <span class="fw-bold text-dark">$${(parseFloat(item.numericPrice || 0) * item.quantity).toFixed(2)}</span>
      </td>
      <td>
        <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove item">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </td>
    </tr>
  `).join('');
  
  updateTotals();
}

// ==================== UPDATE QUANTITY ====================
function changeQuantity(productId, change) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  
  const newQty = item.quantity + change;
  if (newQty < 1) {
    removeFromCart(productId);
    return;
  }
  
  item.quantity = newQty;
  saveCart(cart);
  renderCart();
  showToast('Cart updated!');
}

function updateQuantityInput(productId, value) {
  const qty = parseInt(value);
  if (isNaN(qty) || qty < 1) {
    document.getElementById(`qty_${productId}`).value = 1;
    return;
  }
  
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity = qty;
    saveCart(cart);
    renderCart();
  }
}

// ==================== REMOVE FROM CART ====================
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  renderCart();
  updateCartBadges();
  showToast('Item removed from cart');
}

// ==================== CLEAR CART ====================
function clearCartConfirm() {
  if (confirm('Are you sure you want to clear your entire cart?')) {
    saveCart([]);
    renderCart();
    updateCartBadges();
    showToast('Cart cleared!');
  }
}

function updateCart() {
  renderCart();
  showToast('Cart updated!');
}

// ==================== UPDATE TOTALS ====================
function updateTotals() {
  const cart = getCart();
  
  // Calculate subtotal
  let subtotal = cart.reduce((total, item) => {
    const price = parseFloat(item.numericPrice) || 0;
    return total + (price * item.quantity);
  }, 0);
  
  // Shipping (free if subtotal > 100)
  const shipping = subtotal > 100 ? 0 : 19.99;
  const shippingDisplay = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
  
  // Tax (10%)
  const tax = subtotal * 0.10;
  
  // Discount (if coupon applied)
  let discount = 0;
  const couponApplied = localStorage.getItem('clicon_coupon');
  if (couponApplied) {
    try {
      const coupon = JSON.parse(couponApplied);
      if (coupon.code === 'SAVE20') {
        discount = subtotal * 0.20;
      } else if (coupon.code === 'SAVE10') {
        discount = subtotal * 0.10;
      } else if (coupon.code === 'FREE50') {
        discount = 50;
      }
      // Max discount 50% of subtotal
      discount = Math.min(discount, subtotal * 0.50);
    } catch (e) {
      // Invalid coupon
    }
  }
  
  const total = subtotal + shipping + tax - discount;
  
  // Update DOM
  document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('cartShipping').textContent = shippingDisplay;
  document.getElementById('cartDiscount').textContent = `-$${discount.toFixed(2)}`;
  document.getElementById('cartTax').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
}

// ==================== COUPON CODE ====================
function applyCoupon() {
  const input = document.getElementById('couponInput');
  const code = input.value.trim().toUpperCase();
  const message = document.getElementById('couponMessage');
  
  const validCoupons = {
    'SAVE20': '20% off your entire order!',
    'SAVE10': '10% off your entire order!',
    'FREE50': '$50 off your order!'
  };
  
  if (!code) {
    message.innerHTML = '<span class="text-danger">Please enter a coupon code.</span>';
    return;
  }
  
  if (validCoupons[code]) {
    localStorage.setItem('clicon_coupon', JSON.stringify({ code: code, appliedAt: new Date().toISOString() }));
    message.innerHTML = `<span class="text-success">✓ Coupon applied! ${validCoupons[code]}</span>`;
    updateTotals();
    showToast('Coupon applied successfully! 🎉');
    input.value = '';
  } else {
    message.innerHTML = '<span class="text-danger">✗ Invalid coupon code. Try SAVE20, SAVE10, or FREE50</span>';
    localStorage.removeItem('clicon_coupon');
    updateTotals();
  }
}

// ==================== TOAST ====================
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast align-items-center text-white bg-brand-blue border-0 show';
  toast.role = 'alert';
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <i class="fa-regular fa-circle-check me-2"></i> ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;
  
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ==================== SEARCH FUNCTIONALITY ====================
document.addEventListener('DOMContentLoaded', function() {
  renderCart();
  updateCartBadges();
  updateWishlistBadge();
  
  // Top search
  const topSearchBtn = document.getElementById('topSearchBtn');
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
  
  // Check for coupon on load
  const coupon = localStorage.getItem('clicon_coupon');
  if (coupon) {
    try {
      const data = JSON.parse(coupon);
      document.getElementById('couponMessage').innerHTML = 
        `<span class="text-success">✓ Coupon "${data.code}" applied!</span>`;
      updateTotals();
    } catch (e) {
      localStorage.removeItem('clicon_coupon');
    }
  }
});

// ==================== EXPOSE GLOBALLY ====================
window.changeQuantity = changeQuantity;
window.updateQuantityInput = updateQuantityInput;
window.removeFromCart = removeFromCart;
window.clearCartConfirm = clearCartConfirm;
window.updateCart = updateCart;
window.applyCoupon = applyCoupon;
window.renderCart = renderCart;