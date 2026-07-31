// ==================== TRACK ORDER DETAILS LOGIC ====================

// Get order ID from URL
function getOrderId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// ==================== STORAGE FUNCTIONS ====================
function getOrders() {
  try {
    const stored = localStorage.getItem('clicon_orders');
    if (stored) {
      return JSON.parse(stored);
    }
    return [];
  } catch (e) {
    return [];
  }
}

function getOrderById(id) {
  const orders = getOrders();
  return orders.find(order => order.id === id);
}

// ==================== RENDER TIMELINE ====================
function renderTimeline(order) {
  const container = document.getElementById('orderTimeline');
  if (!container) return;
  
  if (!order || !order.timeline) {
    container.innerHTML = '<p class="text-muted">No timeline available.</p>';
    return;
  }
  
  container.innerHTML = order.timeline.map(item => `
    <div class="timeline-item">
      <div class="d-flex flex-wrap justify-content-between align-items-start">
        <div class="d-flex align-items-start gap-3">
          <i class="fa-solid fa-circle-check text-success mt-1 fs-5"></i>
          <p class="description mb-0">${item.description}</p>
        </div>
        <div class="time text-nowrap ms-4">
          ${item.date} at ${item.time}
        </div>
      </div>
    </div>
  `).join('');
}

// ==================== UPDATE ORDER INFO ====================
function updateOrderInfo() {
  const orderId = getOrderId();
  if (!orderId) {
    document.querySelector('.card').innerHTML = `
      <div class="text-center py-5">
        <i class="fa-regular fa-circle-exclamation fa-3x text-warning mb-3"></i>
        <h5 class="fw-bold">Order Not Found</h5>
        <p class="text-muted">The order you're looking for doesn't exist.</p>
        <a href="track-order.html" class="btn btn-outline-orange">
          <i class="fa-solid fa-arrow-left me-2"></i> Back to Track Order
        </a>
      </div>
    `;
    return;
  }
  
  const order = getOrderById(orderId);
  if (!order) {
    document.querySelector('.card').innerHTML = `
      <div class="text-center py-5">
        <i class="fa-regular fa-circle-exclamation fa-3x text-danger mb-3"></i>
        <h5 class="fw-bold">Order Not Found</h5>
        <p class="text-muted">Order ${orderId} could not be found.</p>
        <a href="track-order.html" class="btn btn-outline-orange">
          <i class="fa-solid fa-arrow-left me-2"></i> Back to Track Order
        </a>
      </div>
    `;
    return;
  }
  
  // Update header
  const header = document.querySelector('.fw-bold.text-dark.mb-1');
  if (header) {
    header.textContent = order.id;
  }
  
  // Update products info
  const productsInfo = document.querySelector('.text-muted.fs-7.mb-0');
  if (productsInfo) {
    productsInfo.textContent = `${order.products} Products · Order Placed in ${order.date} at ${order.time}`;
  }
  
  // Update expected delivery badge
  const badge = document.querySelector('.badge.bg-success');
  if (badge) {
    badge.textContent = `Order expected arrival ${order.expectedDelivery}`;
  }
  
  // Update progress steps
  const statuses = ['Order Placed', 'Packaging', 'On The Road', 'Delivered'];
  const steps = document.querySelectorAll('.step-item');
  const statusIndex = statuses.indexOf(order.status);
  
  steps.forEach((step, index) => {
    if (index <= statusIndex) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });
  
  // Render timeline
  renderTimeline(order);
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', function() {
  updateOrderInfo();
  
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