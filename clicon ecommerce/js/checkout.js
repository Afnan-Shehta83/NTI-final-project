// ==================== CHECKOUT LOGIC ====================

// ==================== STORAGE FUNCTIONS ====================
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('clicon_cart')) || [];
  } catch (e) {
    return [];
  }
}

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem('clicon_wishlist')) || [];
  } catch (e) {
    return [];
  }
}

function clearCart() {
  localStorage.removeItem('clicon_cart');
  updateCartBadge();
}

// ==================== UPDATE BADGES ====================
function updateCartBadge() {
  const cart = getCart();
  const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const badges = document.querySelectorAll('#cartCount');
  badges.forEach(badge => {
    if (badge) badge.textContent = count;
  });
}

function updateWishlistBadge() {
  const count = getWishlist().length;
  const badges = document.querySelectorAll('#wishlistCount');
  badges.forEach(badge => {
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-block' : 'none';
    }
  });
}

// ==================== RENDER ORDER SUMMARY ====================
function renderOrderSummary() {
  const cart = getCart();
  const container = document.getElementById('orderItemsSummary');
  
  if (!container) return;
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-3">
        <p class="text-muted fs-7">Your cart is empty</p>
        <a href="index.html" class="btn btn-sm btn-orange">Start Shopping</a>
      </div>
    `;
    updateTotals();
    return;
  }
  
  container.innerHTML = cart.map(item => `
    <div class="order-item-checkout">
      <div class="item-info">
        <img src="${item.img || 'https://placehold.co/200x200/E4E7E9/191C1F?text=Product'}" 
             alt="${item.title}"
             onerror="this.src='https://placehold.co/200x200/E4E7E9/191C1F?text=Product'">
        <div>
          <div class="item-name">${item.title}</div>
          <div class="item-qty">${item.quantity || 1} x ${item.price}</div>
        </div>
      </div>
      <div class="item-price">$${(parseFloat(item.numericPrice || 0) * (item.quantity || 1)).toFixed(2)}</div>
    </div>
  `).join('');
  
  updateTotals();
}

// ==================== UPDATE TOTALS ====================
function updateTotals() {
  const cart = getCart();
  
  let subtotal = cart.reduce((total, item) => {
    const price = parseFloat(item.numericPrice) || 0;
    return total + (price * (item.quantity || 1));
  }, 0);
  
  const shipping = subtotal > 100 ? 0 : 19.99;
  const shippingDisplay = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
  const tax = subtotal * 0.10;
  
  let discount = 0;
  const couponApplied = localStorage.getItem('clicon_coupon');
  if (couponApplied) {
    try {
      const coupon = JSON.parse(couponApplied);
      if (coupon.code === 'SAVE20') discount = subtotal * 0.20;
      else if (coupon.code === 'SAVE10') discount = subtotal * 0.10;
      else if (coupon.code === 'FREE50') discount = 50;
      discount = Math.min(discount, subtotal * 0.50);
    } catch (e) {}
  }
  
  const total = subtotal + shipping + tax - discount;
  
  document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('checkoutShipping').textContent = shippingDisplay;
  document.getElementById('checkoutDiscount').textContent = `-$${discount.toFixed(2)}`;
  document.getElementById('checkoutTax').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)} USD`;
}

// ==================== PAYMENT SELECTION ====================
function selectPayment(value) {
  document.querySelectorAll('.payment-option').forEach(el => {
    el.classList.remove('active');
  });
  
  const labels = document.querySelectorAll('.payment-option');
  labels.forEach(label => {
    const radio = label.querySelector('input[type="radio"]');
    if (radio && radio.value === value) {
      label.classList.add('active');
      radio.checked = true;
    }
  });
}

// ==================== TOGGLE SHIPPING ADDRESS ====================
function toggleShippingAddress() {
  const checked = document.getElementById('differentAddress').checked;
  const container = document.getElementById('shippingAddressContainer');
  if (checked) {
    container.classList.remove('d-none');
  } else {
    container.classList.add('d-none');
  }
}

// ==================== PLACE ORDER ====================
function placeOrder(event) {
  event.preventDefault();
  
  const cart = getCart();
  if (cart.length === 0) {
    showToast('Your cart is empty! Please add items first.', 'warning');
    return false;
  }
  
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const country = document.getElementById('country').value;
  const city = document.getElementById('city').value.trim();
  const zipCode = document.getElementById('zipCode').value.trim();
  
  if (!firstName || !lastName) {
    showToast('Please enter your full name.', 'warning');
    return false;
  }
  
  if (!email || !isValidEmail(email)) {
    showToast('Please enter a valid email address.', 'warning');
    return false;
  }
  
  if (!phone) {
    showToast('Please enter your phone number.', 'warning');
    return false;
  }
  
  if (!country || !city || !zipCode) {
    showToast('Please fill in all address fields.', 'warning');
    return false;
  }
  
  const paymentMethod = document.querySelector('input[name="payment"]:checked');
  if (!paymentMethod) {
    showToast('Please select a payment method.', 'warning');
    return false;
  }
  
  if (paymentMethod.value === 'card') {
    const cardName = document.getElementById('cardName').value.trim();
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const cardExpire = document.getElementById('cardExpire').value.trim();
    const cardCvv = document.getElementById('cardCvv').value.trim();
    
    if (!cardName || !cardNumber || !cardExpire || !cardCvv) {
      showToast('Please fill in all card details.', 'warning');
      return false;
    }
  }
  
  const orderId = `#CL-${Date.now().toString().slice(-6)}`;
  document.getElementById('orderIdDisplay').textContent = orderId;
  
  saveOrder({
    id: orderId,
    email: email,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    total: document.getElementById('checkoutTotal').textContent,
    items: cart,
    status: 'Processing'
  });
  
  const modal = new bootstrap.Modal(document.getElementById('successModal'));
  modal.show();
  
  clearCart();
  updateCartBadge();
  renderOrderSummary();
  
  showToast('Order placed successfully! 🎉', 'success');
  
  return false;
}

// ==================== SAVE ORDER ====================
function saveOrder(order) {
  try {
    let orders = JSON.parse(localStorage.getItem('clicon_orders')) || [];
    orders.unshift(order);
    if (orders.length > 20) orders.pop();
    localStorage.setItem('clicon_orders', JSON.stringify(orders));
  } catch (e) {}
}

// ==================== VALIDATE EMAIL ====================
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ==================== TOAST ====================
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(container);
  }
  
  const colors = {
    success: 'bg-brand-blue',
    warning: 'bg-warning text-dark',
    danger: 'bg-danger',
    info: 'bg-info text-dark'
  };
  
  const icons = {
    success: 'fa-regular fa-circle-check',
    warning: 'fa-regular fa-circle-exclamation',
    danger: 'fa-regular fa-circle-xmark',
    info: 'fa-regular fa-circle-info'
  };
  
  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-white ${colors[type] || colors.success} border-0 show`;
  toast.role = 'alert';
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <i class="${icons[type] || icons.success} me-2"></i> ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;
  
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ==================== CARD INPUT FORMATTING ====================
document.addEventListener('DOMContentLoaded', function() {
  renderOrderSummary();
  updateCartBadge();
  updateWishlistBadge();
  
  const cardNumber = document.getElementById('cardNumber');
  if (cardNumber) {
    cardNumber.addEventListener('input', function(e) {
      let value = this.value.replace(/\D/g, '');
      if (value.length > 16) value = value.slice(0, 16);
      let formatted = '';
      for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) formatted += ' ';
        formatted += value[i];
      }
      this.value = formatted;
    });
  }
  
  const cardExpire = document.getElementById('cardExpire');
  if (cardExpire) {
    cardExpire.addEventListener('input', function(e) {
      let value = this.value.replace(/\D/g, '');
      if (value.length > 4) value = value.slice(0, 4);
      if (value.length >= 2) {
        const month = parseInt(value.slice(0, 2));
        if (month > 12) {
          this.value = '12/' + value.slice(2);
          return;
        }
        this.value = value.slice(0, 2) + (value.length > 2 ? '/' + value.slice(2) : '');
      } else {
        this.value = value;
      }
    });
  }
  
  const cardCvv = document.getElementById('cardCvv');
  if (cardCvv) {
    cardCvv.addEventListener('input', function(e) {
      this.value = this.value.replace(/\D/g, '').slice(0, 4);
    });
  }
  
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
});

// ==================== EXPOSE GLOBALLY ====================
window.selectPayment = selectPayment;
window.toggleShippingAddress = toggleShippingAddress;
window.placeOrder = placeOrder;