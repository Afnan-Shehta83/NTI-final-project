// ==================== TRACK ORDER LOGIC ====================

// ==================== INITIAL ORDERS DATA ====================
const defaultOrders = [
  {
    id: "CL-2024-001",
    email: "customer@example.com",
    status: "Delivered",
    date: "17 Jan, 2021",
    time: "7:32 PM",
    total: "$1,699.00",
    products: 4,
    expectedDelivery: "23 Jan, 2021",
    items: [
      { name: "2020 Apple MacBook Pro M1", quantity: 1, price: "$1,699.00", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100" },
      { name: "USB-C Adapter", quantity: 1, price: "$29.00", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100" }
    ],
    timeline: [
      { date: "23 Jan, 2021", time: "7:32 PM", description: "Your order has been delivered. Thank you for shopping at Clicon!", status: "completed" },
      { date: "23 Jan, 2021", time: "2:00 PM", description: "Our delivery man (John Wick) Has picked-up your order for delivery.", status: "completed" },
      { date: "22 Jan, 2021", time: "8:00 AM", description: "Your order has reached at last mile hub.", status: "completed" },
      { date: "21 Jan, 2021", time: "5:32 AM", description: "Your order on the way to (last mile) hub.", status: "completed" },
      { date: "20 Jan, 2021", time: "7:32 PM", description: "Your order is successfully verified.", status: "completed" },
      { date: "19 Jan, 2021", time: "2:16 PM", description: "Your order has been confirmed.", status: "completed" }
    ]
  },
  {
    id: "CL-2024-002",
    email: "customer@example.com",
    status: "Shipped",
    date: "15 Jan, 2021",
    time: "10:30 AM",
    total: "$800.00",
    products: 2,
    expectedDelivery: "20 Jan, 2021",
    items: [
      { name: "Samsung Galaxy S21 5G", quantity: 1, price: "$800.00", img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100" }
    ],
    timeline: [
      { date: "18 Jan, 2021", time: "9:00 AM", description: "Your order has been shipped.", status: "completed" },
      { date: "16 Jan, 2021", time: "2:00 PM", description: "Your order is being packed.", status: "completed" },
      { date: "15 Jan, 2021", time: "10:30 AM", description: "Your order has been confirmed.", status: "completed" }
    ]
  },
  {
    id: "CL-2024-003",
    email: "john@example.com",
    status: "Processing",
    date: "12 Jan, 2021",
    time: "3:15 PM",
    total: "$120.00",
    products: 1,
    expectedDelivery: "19 Jan, 2021",
    items: [
      { name: "Portable Washing Machine 11lbs", quantity: 1, price: "$120.00", img: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=100" }
    ],
    timeline: [
      { date: "13 Jan, 2021", time: "8:00 AM", description: "Your order is being processed.", status: "completed" },
      { date: "12 Jan, 2021", time: "3:15 PM", description: "Your order has been confirmed.", status: "completed" }
    ]
  },
  {
    id: "CL-2024-004",
    email: "sarah@example.com",
    status: "Delivered",
    date: "10 Jan, 2021",
    time: "11:00 AM",
    total: "$50.00",
    products: 2,
    expectedDelivery: "15 Jan, 2021",
    items: [
      { name: "Wired Over-Ear Gaming Headphones", quantity: 2, price: "$50.00", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100" }
    ],
    timeline: [
      { date: "14 Jan, 2021", time: "6:00 PM", description: "Your order has been delivered.", status: "completed" },
      { date: "12 Jan, 2021", time: "10:00 AM", description: "Your order is on the way.", status: "completed" },
      { date: "10 Jan, 2021", time: "11:00 AM", description: "Your order has been confirmed.", status: "completed" }
    ]
  },
  {
    id: "CL-2024-005",
    email: "mike@example.com",
    status: "Cancelled",
    date: "8 Jan, 2021",
    time: "9:00 AM",
    total: "$150.00",
    products: 1,
    expectedDelivery: "12 Jan, 2021",
    items: [
      { name: "4K UHD LED Smart TV", quantity: 1, price: "$150.00", img: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=100" }
    ],
    timeline: [
      { date: "9 Jan, 2021", time: "10:00 AM", description: "Your order has been cancelled.", status: "completed" },
      { date: "8 Jan, 2021", time: "9:00 AM", description: "Your order has been confirmed.", status: "completed" }
    ]
  }
];

// ==================== STORAGE FUNCTIONS ====================
function getOrders() {
  try {
    const stored = localStorage.getItem('clicon_orders');
    if (stored) {
      return JSON.parse(stored);
    }
    // First time - save default orders
    localStorage.setItem('clicon_orders', JSON.stringify(defaultOrders));
    return defaultOrders;
  } catch (e) {
    return defaultOrders;
  }
}

function saveOrders(orders) {
  localStorage.setItem('clicon_orders', JSON.stringify(orders));
}

function getOrdersByEmail(email) {
  const orders = getOrders();
  return orders.filter(order => order.email.toLowerCase() === email.toLowerCase());
}

function getOrderById(id) {
  const orders = getOrders();
  return orders.find(order => order.id === id);
}

function saveOrder(order) {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === order.id);
  if (index > -1) {
    orders[index] = order;
  } else {
    orders.push(order);
  }
  saveOrders(orders);
  return orders;
}

// ==================== DOM REFS ====================
const form = document.getElementById('trackOrderForm');
const orderIdInput = document.getElementById('orderIdInput');
const emailInput = document.getElementById('emailInput');
const loadingSpinner = document.getElementById('loadingSpinner');
const notFoundContainer = document.getElementById('orderNotFound');
const recentOrdersList = document.getElementById('recentOrdersList');
const trackBtn = document.getElementById('trackBtn');
const btnText = document.getElementById('btnText');
const btnIcon = document.getElementById('btnIcon');
const recentOrdersContainer = document.getElementById('recentOrdersContainer');

// ==================== RENDER RECENT ORDERS ====================
function renderRecentOrders(email) {
  if (!recentOrdersList) return;
  
  // If email is provided, filter orders by email
  let orders = getOrders();
  if (email) {
    orders = orders.filter(order => order.email.toLowerCase() === email.toLowerCase());
  }
  
  // Show only last 5 orders
  orders = orders.slice(0, 5);
  
  if (orders.length === 0) {
    recentOrdersList.innerHTML = `
      <div class="text-center text-muted py-4 fs-7">
        <i class="fa-regular fa-receipt fa-2x mb-2 d-block"></i>
        No orders found${email ? ' for this email' : ''}. 
        ${!email ? 'Please enter your email to see your orders.' : ''}
      </div>
    `;
    return;
  }
  
  recentOrdersList.innerHTML = orders.map(order => `
    <div class="recent-order-item border rounded p-3 d-flex flex-wrap align-items-center justify-content-between" 
         onclick="window.location.href='track-order-details.html?id=${order.id}'">
      <div>
        <div class="fw-bold text-dark">${order.id}</div>
        <div class="text-muted fs-8">${order.products} Products · ${order.date}</div>
      </div>
      <div class="text-end">
        <div class="fw-bold text-brand-blue">${order.total}</div>
        <span class="badge ${order.status === 'Delivered' ? 'bg-success' : order.status === 'Shipped' ? 'bg-info text-dark' : order.status === 'Cancelled' ? 'bg-danger' : 'bg-warning text-dark'} fs-8">
          ${order.status}
        </span>
      </div>
      <div class="w-100 mt-2">
        <i class="fa-solid fa-arrow-right text-brand-blue"></i>
        <span class="text-muted fs-8">Click to view details</span>
      </div>
    </div>
  `).join('');
}

// ==================== TRACK ORDER FUNCTION ====================
function trackOrder(event) {
  event.preventDefault();
  
  const orderId = orderIdInput.value.trim();
  const email = emailInput.value.trim();
  
  if (!orderId) {
    alert('Please enter your Order ID.');
    orderIdInput.focus();
    return false;
  }
  
  if (!email) {
    alert('Please enter your Billing Email.');
    emailInput.focus();
    return false;
  }
  
  // Show loading
  loadingSpinner.classList.remove('d-none');
  notFoundContainer.classList.add('d-none');
  trackBtn.disabled = true;
  btnText.textContent = 'Searching...';
  btnIcon.className = 'fa-solid fa-spinner fa-spin ms-2';
  
  // Simulate API call
  setTimeout(() => {
    const orders = getOrders();
    const order = orders.find(o => 
      o.id.toLowerCase() === orderId.toLowerCase() && 
      o.email.toLowerCase() === email.toLowerCase()
    );
    
    loadingSpinner.classList.add('d-none');
    trackBtn.disabled = false;
    btnText.textContent = 'Track Order';
    btnIcon.className = 'fa-solid fa-arrow-right ms-2';
    
    if (order) {
      // Redirect to details page with order ID
      window.location.href = `track-order-details.html?id=${order.id}`;
    } else {
      notFoundContainer.classList.remove('d-none');
      notFoundContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 1000);
  
  return false;
}

// ==================== LOAD ORDERS BY EMAIL ====================
function loadOrdersByEmail() {
  const email = emailInput.value.trim();
  if (email) {
    renderRecentOrders(email);
    // Update heading
    const heading = document.querySelector('#recentOrdersContainer h5');
    if (heading) {
      heading.textContent = `Orders for ${email}`;
    }
  } else {
    renderRecentOrders();
    const heading = document.querySelector('#recentOrdersContainer h5');
    if (heading) {
      heading.textContent = 'Your Recent Orders';
    }
  }
}

// ==================== RESET FORM ====================
function resetForm() {
  notFoundContainer.classList.add('d-none');
  loadingSpinner.classList.add('d-none');
  orderIdInput.value = '';
  emailInput.value = '';
  orderIdInput.focus();
  trackBtn.disabled = false;
  btnText.textContent = 'Track Order';
  btnIcon.className = 'fa-solid fa-arrow-right ms-2';
  // Reload orders
  renderRecentOrders();
  const heading = document.querySelector('#recentOrdersContainer h5');
  if (heading) {
    heading.textContent = 'Your Recent Orders';
  }
}

// ==================== SEARCH FUNCTIONALITY ====================
document.addEventListener('DOMContentLoaded', function() {
  // Render initial orders
  renderRecentOrders();
  
  // Email input - load orders when typing
  emailInput.addEventListener('input', function() {
    const email = this.value.trim();
    if (email.length > 3) {
      renderRecentOrders(email);
      const heading = document.querySelector('#recentOrdersContainer h5');
      if (heading) {
        heading.textContent = `Orders for ${email}`;
      }
    } else {
      renderRecentOrders();
      const heading = document.querySelector('#recentOrdersContainer h5');
      if (heading) {
        heading.textContent = 'Your Recent Orders';
      }
    }
  });
  
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
  
  orderIdInput.focus();
});

// ==================== EXPOSE FUNCTIONS ====================
window.trackOrder = trackOrder;
window.resetForm = resetForm;
window.loadOrdersByEmail = loadOrdersByEmail;