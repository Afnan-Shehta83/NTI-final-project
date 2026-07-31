// ==================== ORDER SUCCESS LOGIC ====================

// ==================== STORAGE FUNCTIONS ====================
function getOrders() {
  try {
    return JSON.parse(localStorage.getItem('clicon_orders')) || [];
  } catch (e) {
    return [];
  }
}

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

// ==================== GET LATEST ORDER ====================
function getLatestOrder() {
  const orders = getOrders();
  return orders.length > 0 ? orders[0] : null;
}

// ==================== DISPLAY ORDER INFO ====================
function displayOrderInfo() {
  const latestOrder = getLatestOrder();
  
  if (latestOrder) {
    // Update order ID
    const orderIdDisplay = document.getElementById('orderIdDisplay');
    if (orderIdDisplay) {
      orderIdDisplay.textContent = latestOrder.id;
    }
    
    // Update view order button
    const viewOrderBtn = document.getElementById('viewOrderBtn');
    if (viewOrderBtn) {
      viewOrderBtn.href = `track-order-details.html?id=${latestOrder.id}`;
    }
    
    // Calculate estimated delivery
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    const estimatedDelivery = document.getElementById('estimatedDelivery');
    if (estimatedDelivery) {
      estimatedDelivery.textContent = deliveryDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }
  }
}

// ==================== RENDER RECENT ORDERS ====================
function renderRecentOrders() {
  const orders = getOrders();
  const container = document.getElementById('recentOrdersList');
  
  if (!container) return;
  
  // Show only last 3 orders
  const recentOrders = orders.slice(0, 3);
  
  if (recentOrders.length === 0) {
    container.innerHTML = `
      <div class="text-muted fs-7 text-center py-3">
        <i class="fa-regular fa-receipt fa-2x d-block mb-2"></i>
        No orders yet
      </div>
    `;
    return;
  }
  
  container.innerHTML = recentOrders.map(order => `
    <div class="recent-order-item d-flex flex-wrap align-items-center justify-content-between" 
         onclick="window.location.href='track-order-details.html?id=${order.id}'">
      <div>
        <span class="order-id">${order.id}</span>
        <span class="text-muted fs-8 ms-2">${order.date}</span>
      </div>
      <div>
        <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
        <span class="order-total ms-2">${order.total || '$0.00'}</span>
      </div>
      <div class="w-100 mt-1">
        <span class="text-muted fs-8">${order.items ? order.items.length : 0} items</span>
        <i class="fa-solid fa-arrow-right text-brand-blue ms-2"></i>
      </div>
    </div>
  `).join('');
}

// ==================== SEARCH FUNCTIONALITY ====================
document.addEventListener('DOMContentLoaded', function() {
  displayOrderInfo();
  renderRecentOrders();
  updateCartBadge();
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
});