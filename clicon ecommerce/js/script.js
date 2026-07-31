// ==================== FULL PRODUCTS DATABASE ====================
const fullProducts = [
  // Page 1 Products (Updated with exact Category, Brand, numericPrice, and Tags)
  { id: 1, title: "TOZO T6 True Wireless Earbuds Bluetooth", price: "$70", numericPrice: 70, category: "Headphone", brand: "Other", tags: ["Speaker"], rating: 5, reviews: 733, badge: "HOT", badgeBg: "bg-danger", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300", desc: "High quality wireless earbuds." },
  { id: 2, title: "Samsung Galaxy S21 5G Unlocked", price: "$800", numericPrice: 800, category: "SmartPhone", brand: "Samsung", tags: ["Samsung", "iPhone"], rating: 5, reviews: 535, badge: "", badgeBg: "", img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300", desc: "Pro-grade camera and high performance." },
  { id: 3, title: "Amazon Basics High-Speed HDMI Cable", price: "$15", numericPrice: 15, category: "Mobile Accessories", brand: "Other", tags: ["TV"], rating: 5, reviews: 423, badge: "BEST DEALS", badgeBg: "bg-primary", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300", desc: "Durable high-speed HDMI cable." },
  { id: 4, title: "Portable Washing Machine 11lbs", price: "$120", numericPrice: 120, category: "TV & Homes Appliances", brand: "Panasonic", tags: ["Microwave"], rating: 4, reviews: 816, badge: "", badgeBg: "", img: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300", desc: "Compact washer for small apartments." },
  { id: 5, title: "Wired Over-Ear Gaming Headphones", price: "$50", numericPrice: 50, category: "Headphone", brand: "Sony", tags: ["Game", "Speaker"], rating: 5, reviews: 647, badge: "", badgeBg: "", img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300", desc: "Immersive sound with noise-canceling mic." },
  { id: 6, title: "Polaroid 57-Inch Photo/Video Tripod", price: "$30", oldPrice: "$45", numericPrice: 30, category: "Camera & Photo", brand: "Other", tags: [], rating: 4, reviews: 871, badge: "25% OFF", badgeBg: "bg-warning text-dark", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300", desc: "Lightweight tripod with adjustable legs." },
  { id: 7, title: "Dell Optiplex 7000 All-in-One Monitor", price: "$250", numericPrice: 250, category: "Computer & Laptop", brand: "Dell", tags: ["Macbook", "Asus Laptops"], rating: 5, reviews: 420, badge: "", badgeBg: "", img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300", desc: "Sleek desktop for business needs." },
  { id: 8, title: "4K UHD LED Smart TV Built-in", price: "$320", numericPrice: 320, category: "TV & Homes Appliances", brand: "LG", tags: ["TV", "Smart TV"], rating: 5, reviews: 683, badge: "SALE", badgeBg: "bg-success", img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300", desc: "Crystal clear picture quality." },
  { id: 9, title: "Logitech MX Master 3S Wireless Mouse", price: "$99", numericPrice: 99, category: "Computer Accessories", brand: "Other", tags: ["Game"], rating: 5, reviews: 1200, badge: "NEW", badgeBg: "bg-info text-dark", img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300", desc: "Ergonomic quiet click mouse." },
  { id: 10, title: "Apple MacBook Pro 16-inch M2", price: "$2,499", numericPrice: 2499, category: "Computer & Laptop", brand: "Apple", tags: ["Macbook", "Asus Laptops"], rating: 5, reviews: 980, badge: "HOT", badgeBg: "bg-danger", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300", desc: "Ultimate performance laptop." },
  { id: 11, title: "Sony WH-1000XM5 Wireless Headphones", price: "$398", numericPrice: 398, category: "Headphone", brand: "Sony", tags: ["Speaker"], rating: 5, reviews: 2150, badge: "BEST SELLER", badgeBg: "bg-success", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300", desc: "Industry-leading noise canceling." },
  { id: 12, title: "Mechanical RGB Gaming Keyboard", price: "$120", oldPrice: "$150", numericPrice: 120, category: "Computer Accessories", brand: "Other", tags: ["Game"], rating: 4, reviews: 640, badge: "20% OFF", badgeBg: "bg-warning text-dark", img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300", desc: "Tactile mechanical switches." },
  { id: 13, title: "Apple iPad Air 10.9-inch Tablet", price: "$599", numericPrice: 599, category: "Computer & Laptop", brand: "Apple", tags: ["Tablet", "iPhone"], rating: 5, reviews: 890, badge: "", badgeBg: "", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300", desc: "Versatile tablet powered by M1 chip." },
  { id: 14, title: "Canon EOS Rebel T7 DSLR Camera", price: "$479", numericPrice: 479, category: "Camera & Photo", brand: "Other", tags: [], rating: 4, reviews: 310, badge: "SALE", badgeBg: "bg-success", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300", desc: "High quality DSLR camera." },
  { id: 15, title: "PlayStation 5 Console Wireless Controller", price: "$69", numericPrice: 69, category: "Gaming Console", brand: "Sony", tags: ["Game"], rating: 5, reviews: 4500, badge: "HOT", badgeBg: "bg-danger", img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300", desc: "Next-gen gaming console controller." },
  { id: 16, title: "Xiaomi Mi Smart Band 7 Tracker", price: "$45", numericPrice: 45, category: "Watchs & Accessories", brand: "Xiaomi", tags: ["Tablet"], rating: 4, reviews: 620, badge: "", badgeBg: "", img: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300", desc: "Fitness tracker with AMOLED screen." },
  { id: 17, title: "Anker PowerCore 20,000mAh Power Bank", price: "$50", numericPrice: 50, category: "Mobile Accessories", brand: "Other", tags: ["Power Bank"], rating: 5, reviews: 1100, badge: "BEST DEALS", badgeBg: "bg-primary", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300", desc: "High-capacity portable charger." },
  { id: 18, title: "Bose QuietComfort 45 Bluetooth Headphones", price: "$329", numericPrice: 329, category: "Headphone", brand: "Other", tags: ["Speaker"], rating: 5, reviews: 940, badge: "", badgeBg: "", img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300", desc: "Premium wireless headphones." },
  { id: 19, title: "Asus ROG Swift 27-inch 4K Laptop & Monitor", price: "$799", oldPrice: "$999", numericPrice: 799, category: "Computer & Laptop", brand: "HP", tags: ["Asus Laptops", "Game"], rating: 5, reviews: 312, badge: "20% OFF", badgeBg: "bg-warning text-dark", img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300", desc: "Ultra-fast gaming monitor." },
  { id: 20, title: "HyperX SoloCast USB Microphone", price: "$60", numericPrice: 60, category: "Computer Accessories", brand: "Other", tags: ["Speaker"], rating: 4, reviews: 520, badge: "NEW", badgeBg: "bg-info text-dark", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300", desc: "Plug-and-play USB microphone." },
  { id: 21, title: "GoPro HERO11 Black Action Camera", price: "$399", numericPrice: 399, category: "Camera & Photo", brand: "Other", tags: [], rating: 5, reviews: 1430, badge: "HOT", badgeBg: "bg-danger", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300", desc: "Rugged action camera." },
  { id: 22, title: "Nintendo Switch OLED Model Console", price: "$349", numericPrice: 349, category: "Gaming Console", brand: "Other", tags: ["Game"], rating: 5, reviews: 3890, badge: "BEST SELLER", badgeBg: "bg-success", img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300", desc: "Vibrant 7-inch OLED screen." },
  { id: 23, title: "Samsung T7 Shield SSD 2TB Portable Storage", price: "$160", numericPrice: 160, category: "Computer Accessories", brand: "Samsung", tags: ["SSD", "Samsung"], rating: 5, reviews: 780, badge: "", badgeBg: "", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300", desc: "Superfast external solid-state drive." },
  { id: 24, title: "Apple Watch Series 8 GPS 45mm", price: "$429", oldPrice: "$499", numericPrice: 429, category: "Watchs & Accessories", brand: "Apple", tags: ["iPhone"], rating: 5, reviews: 1650, badge: "SALE", badgeBg: "bg-success", img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300", desc: "Advanced health sensors." },

  // Page 2 & 3 Additional Products
  { id: 25, title: "Razer DeathAdder V2 Gaming Mouse", price: "$70", numericPrice: 70, category: "Computer Accessories", brand: "Other", tags: ["Game"], rating: 5, reviews: 400, badge: "", badgeBg: "", img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300", desc: "Ergonomic gaming mouse." },
  { id: 26, title: "Corsair Vengeance LPX 16GB RAM Graphics Card", price: "$55", numericPrice: 55, category: "Computer Accessories", brand: "Intel", tags: ["Graphics Card"], rating: 4, reviews: 320, badge: "SALE", badgeBg: "bg-success", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300", desc: "High performance memory." },
  { id: 27, title: "JBL Flip 5 Waterproof Portable Speaker", price: "$90", numericPrice: 90, category: "Headphone", brand: "Other", tags: ["Speaker"], rating: 5, reviews: 1200, badge: "", badgeBg: "", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300", desc: "Portable Bluetooth speaker." },
  { id: 28, title: "Kindle Paperwhite (8GB) E-Reader Tablet", price: "$140", numericPrice: 140, category: "Wearable Technology", brand: "Other", tags: ["Tablet"], rating: 5, reviews: 800, badge: "BEST DEALS", badgeBg: "bg-primary", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300", desc: "Waterproof e-reader with high-res display." },
  { id: 29, title: "LG 27GN750-B UltraGear Smart TV 55-inch", price: "$280", numericPrice: 280, category: "TV & Homes Appliances", brand: "LG", tags: ["TV", "Smart TV"], rating: 5, reviews: 510, badge: "", badgeBg: "", img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300", desc: "Full HD IPS Smart Display." },
  { id: 30, title: "NVIDIA GeForce RTX 3060 Graphics Card", price: "$350", numericPrice: 350, category: "Computer Accessories", brand: "Other", tags: ["Graphics Card", "Game"], rating: 5, reviews: 1120, badge: "HOT", badgeBg: "bg-danger", img: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300", desc: "Ultra-fast gaming GPU." },
  { id: 31, title: "Samsung Countertop Microwave Oven 1000W", price: "$145", numericPrice: 145, category: "TV & Homes Appliances", brand: "Samsung", tags: ["Microwave", "Samsung"], rating: 4, reviews: 430, badge: "", badgeBg: "", img: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300", desc: "Smart sensor cooking microwave." },
  { id: 32, title: "Apple iPhone 14 Pro 128GB Space Black", price: "$999", numericPrice: 999, category: "SmartPhone", brand: "Apple", tags: ["iPhone", "Samsung"], rating: 5, reviews: 3100, badge: "HOT", badgeBg: "bg-danger", img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300", desc: "Dynamic Island and A16 Bionic." }
];

// Dynamically generate extra dummy items to test multi-pages
for (let i = 33; i <= 65; i++) {
  const base = fullProducts[(i % 24)];
  fullProducts.push({
    ...base,
    id: i,
    title: `${base.title} (Edition ${i})`,
    numericPrice: base.numericPrice + (i % 7) * 5,
    price: `$${base.numericPrice + (i % 7) * 5}`
  });
}

// ==================== STATE MANAGEMENT ====================
let currentCategory = "all";
let minPriceFilter = 0;
let maxPriceFilter = 10000;
let selectedBrands = [];
let activeTagFilter = "all";
let searchQuery = "";
let sortBy = "popular";
let currentPage = 1;

// Filter Execution Function
function getFilteredProducts() {
  return fullProducts.filter(product => {
    // 1. Category Filter
    if (currentCategory !== "all" && product.category !== currentCategory) {
      return false;
    }

    // 2. Price Range Filter
    if (product.numericPrice < minPriceFilter || product.numericPrice > maxPriceFilter) {
      return false;
    }

    // 3. Brand Filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }

    // 4. Tag Filter
    if (activeTagFilter !== "all") {
      const tagMatch = product.tags.some(t => t.toLowerCase() === activeTagFilter.toLowerCase());
      const titleMatch = product.title.toLowerCase().includes(activeTagFilter.toLowerCase());
      if (!tagMatch && !titleMatch) return false;
    }

    // 5. Search Bar Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const titleMatch = product.title.toLowerCase().includes(q);
      const descMatch = product.desc.toLowerCase().includes(q);
      if (!titleMatch && !descMatch) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.numericPrice - b.numericPrice;
    if (sortBy === "price-high") return b.numericPrice - a.numericPrice;
    return a.id - b.id; // default popular
  });
}

// Render UI Components
function renderUI() {
  const filtered = getFilteredProducts();
  const container = document.getElementById("productsContainer");
  const paginationContainer = document.getElementById("paginationContainer");
  const countLabel = document.getElementById("resultsCount");
  const catBadge = document.getElementById("catBadge");
  const breadcrumbCategory = document.getElementById("breadcrumbCategory");

  // Update Counters & Breadcrumbs
  countLabel.textContent = filtered.length.toLocaleString();
  breadcrumbCategory.textContent = currentCategory === "all" ? "Electronics Devices" : currentCategory;
  
  if (catBadge) {
    catBadge.childNodes[0].nodeValue = (currentCategory === "all" ? "Electronics Devices" : currentCategory) + " ";
  }

  // Handle Empty State
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="fa-solid fa-box-open fa-3x text-muted mb-3"></i>
        <h5 class="fw-bold">No products match your selected filters!</h5>
        <p class="text-muted fs-7">Try broadening your price range, clearing tags or brand filters.</p>
        <button class="btn btn-orange btn-sm mt-2 px-4" onclick="resetAllFilters()">Clear All Filters</button>
      </div>`;
    paginationContainer.innerHTML = "";
    return;
  }

  // Calculate Pagination Slicing (24 on page 1, 20 on page 2+)
  let start = 0;
  let end = 0;

  if (currentPage === 1) {
    start = 0;
    end = Math.min(24, filtered.length);
  } else {
    start = 24 + (currentPage - 2) * 20;
    end = Math.min(start + 20, filtered.length);
  }

  const currentBatch = filtered.slice(start, end);

  // Render Product Cards (Matches exact HTML structure provided by user)
  container.innerHTML = currentBatch.map(p => `
    <div class="col">
      <div class="product-card p-3 h-100 d-flex flex-column">
        <div class="product-img-box mb-3">
          ${p.badge ? `<span class="badge ${p.badgeBg} position-absolute top-0 start-0 m-2 font-normal fs-8">${p.badge}</span>` : ''}
          <img src="${p.img}" alt="${p.title}" class="img-fluid" style="max-height: 120px; object-fit: contain;">


          <div class="product-hover-overlay">
          <button class="overlay-btn" onclick="event.stopPropagation(); toggleWishlist(${p.id})">
    <i class="${isInWishlist(p.id) ? 'fa-solid text-danger' : 'fa-regular'} fa-heart"></i>
</button>
<button class="overlay-btn" onclick="event.stopPropagation(); addToCart(${p.id})">
    <i class="fa-solid fa-cart-shopping"></i>
</button>
            <button class="overlay-btn"><i class="fa-solid fa-eye"></i></button>
          </div>


        </div>
        <div class="text-warning fs-8 mb-1">
          <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
          <span class="text-muted ms-1">(${p.reviews})</span>
        </div>
<h6 class="fs-7 fw-semibold text-dark mb-2"
    style="line-height: 1.4; height: 38px; overflow: hidden; cursor:pointer;"
    onclick="window.location.href='product-detail.html?id=${p.id}'">
    ${p.title}
</h6>        <div class="mt-auto d-flex align-items-center gap-2">
          <span class="fw-bold text-brand-blue fs-6">${p.price}</span>
          ${p.oldPrice ? `<span class="text-muted text-decoration-line-through fs-7">${p.oldPrice}</span>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  // Dynamic Pagination Buttons Output
  let totalPages = 1;
  if (filtered.length > 24) {
    totalPages = 1 + Math.ceil((filtered.length - 24) / 20);
  }

  // Clamp current page if overflow
  if (currentPage > totalPages) currentPage = totalPages;

  let paginationHTML = `
    <button class="pagination-circle cursor-pointer" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled style="opacity:0.5"' : ''}><i class="fa-solid fa-arrow-left"></i></button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
      <button class="pagination-circle cursor-pointer ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i < 10 ? '0' + i : i}</button>
    `;
  }

  paginationHTML += `
    <button class="pagination-circle cursor-pointer" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled style="opacity:0.5"' : ''}><i class="fa-solid fa-arrow-right"></i></button>
  `;

  paginationContainer.innerHTML = paginationHTML;
}

// Change Page Handler
function changePage(page) {
  const filtered = getFilteredProducts();
  let totalPages = 1;
  if (filtered.length > 24) {
    totalPages = 1 + Math.ceil((filtered.length - 24) / 20);
  }

  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    renderUI();
    document.getElementById("productsContainer").scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Reset Category Specific
function resetCategory() {
  currentCategory = "all";
  document.querySelectorAll(".cat-radio").forEach(r => r.checked = (r.value === "all"));
  currentPage = 1;
  renderUI();

}

// Reset All Filters
function resetAllFilters() {
  currentCategory = "all";
  minPriceFilter = 0;
  maxPriceFilter = 10000;
  selectedBrands = [];
  activeTagFilter = "all";
  searchQuery = "";
  sortBy = "popular";
  currentPage = 1;

  // Reset Form Elements
  document.querySelectorAll(".cat-radio").forEach(r => r.checked = (r.value === "all"));
  document.querySelectorAll(".price-radio").forEach(r => r.checked = (r.value === "all"));
  document.querySelectorAll(".brand-checkbox").forEach(b => b.checked = false);
  document.querySelectorAll(".tag-badge").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".tag-badge-dark").forEach(t => t.classList.remove("active"));

  document.getElementById("minPriceInput").value = "";
  document.getElementById("maxPriceInput").value = "";
  document.getElementById("topSearchInput").value = "";
  document.getElementById("innerSearchInput").value = "";
  document.getElementById("sortSelect").value = "popular";

  updateRangeSlider(0, 10000);
  renderUI();
}

// Update Range Visualizer Line
function updateRangeSlider(min, max) {
  const line = document.getElementById("rangeLine");
  const leftDot = document.getElementById("rangeDotLeft");
  const rightDot = document.getElementById("rangeDotRight");

  let minPercent = Math.min(100, (min / 1000) * 100);
  let maxPercent = Math.min(100, (max / 1000) * 100);

  if (max > 1000) maxPercent = 100;
  if (min === 0 && max === 10000) {
    minPercent = 0;
    maxPercent = 100;
  }

  line.style.left = `${minPercent}%`;
  line.style.right = `${100 - maxPercent}%`;
  leftDot.style.left = `${minPercent}%`;
  rightDot.style.left = `${maxPercent}%`;
}

// Document Ready Initialization
document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Category Radio Filters
  document.querySelectorAll(".cat-radio").forEach(radio => {
    radio.addEventListener("change", (e) => {
      currentCategory = e.target.value;
      currentPage = 1;
      renderUI();
    });
  });

  // Dropdown Categories Navigation
  document.querySelectorAll(".category-dropdown-item, .category-link").forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const cat = e.target.getAttribute("data-cat");
      currentCategory = cat;
      document.querySelectorAll(".cat-radio").forEach(r => r.checked = (r.value === cat));
      currentPage = 1;
      renderUI();
    });
  });

  // 2. Price Radio Filters
  document.querySelectorAll(".price-radio").forEach(radio => {
    radio.addEventListener("change", (e) => {
      const val = e.target.value;
      if (val === "all") {
        minPriceFilter = 0;
        maxPriceFilter = 10000;
      } else {
        const parts = val.split("-");
        minPriceFilter = parseFloat(parts[0]);
        maxPriceFilter = parseFloat(parts[1]);
      }
      document.getElementById("minPriceInput").value = minPriceFilter === 0 ? "" : minPriceFilter;
      document.getElementById("maxPriceInput").value = maxPriceFilter === 10000 ? "" : maxPriceFilter;
      
      updateRangeSlider(minPriceFilter, maxPriceFilter);
      currentPage = 1;
      renderUI();
    });
  });

  // Price Min/Max Manual Input Listeners
  const minInput = document.getElementById("minPriceInput");
  const maxInput = document.getElementById("maxPriceInput");

  function handleManualPriceInput() {
    minPriceFilter = parseFloat(minInput.value) || 0;
    maxPriceFilter = parseFloat(maxInput.value) || 10000;
    
    // Uncheck price radios when custom typed
    document.querySelectorAll(".price-radio").forEach(r => r.checked = false);
    updateRangeSlider(minPriceFilter, maxPriceFilter);
    currentPage = 1;
    renderUI();
  }

  minInput.addEventListener("input", handleManualPriceInput);
  maxInput.addEventListener("input", handleManualPriceInput);

  // 3. Brand Checkboxes
  document.querySelectorAll(".brand-checkbox").forEach(cb => {
    cb.addEventListener("change", () => {
      selectedBrands = Array.from(document.querySelectorAll(".brand-checkbox:checked")).map(el => el.value);
      currentPage = 1;
      renderUI();
    });
  });

  // 4. Popular Tags (Sidebar & Footer)
  document.querySelectorAll(".tag-badge, .footer-tag").forEach(tagElem => {
    tagElem.addEventListener("click", (e) => {
      const tagValue = e.target.getAttribute("data-tag");

      if (activeTagFilter === tagValue) {
        activeTagFilter = "all"; // Toggle off
        document.querySelectorAll(".tag-badge, .footer-tag").forEach(t => t.classList.remove("active"));
      } else {
        activeTagFilter = tagValue;
        document.querySelectorAll(".tag-badge, .footer-tag").forEach(t => {
          if (t.getAttribute("data-tag") === tagValue) t.classList.add("active");
          else t.classList.remove("active");
        });
      }

      currentPage = 1;
      renderUI();
    });
  });

  // 5. Search Bars Handling
  const topSearchInput = document.getElementById("topSearchInput");
  const innerSearchInput = document.getElementById("innerSearchInput");

  function triggerSearch(val) {
    searchQuery = val;
    topSearchInput.value = val;
    innerSearchInput.value = val;
    currentPage = 1;
    renderUI();
  }

  document.getElementById("topSearchBtn").addEventListener("click", () => triggerSearch(topSearchInput.value));
  document.getElementById("innerSearchBtn").addEventListener("click", () => triggerSearch(innerSearchInput.value));
  
  topSearchInput.addEventListener("keyup", (e) => { if (e.key === "Enter") triggerSearch(topSearchInput.value); });
  innerSearchInput.addEventListener("keyup", (e) => { if (e.key === "Enter") triggerSearch(innerSearchInput.value); });

  // 6. Sort Select Handler
  document.getElementById("sortSelect").addEventListener("change", (e) => {
    sortBy = e.target.value;
    renderUI();
  });

  // Initial First Render
  renderUI();
});
//////////////////
// ==================== WISHLIST FUNCTIONS ====================
function toggleWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem('clicon_wishlist')) || [];
  const index = wishlist.indexOf(productId);
  
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast('Removed from wishlist 💔');
  } else {
    wishlist.push(productId);
    showToast('Added to wishlist ❤️');
  }
  
  localStorage.setItem('clicon_wishlist', JSON.stringify(wishlist));
  renderUI(); 
  
  updateCartBadge();// Re-render to update heart icons
}

function isInWishlist(productId) {
  const wishlist = JSON.parse(localStorage.getItem('clicon_wishlist')) || [];
  return wishlist.includes(productId);
}

function updateWishlistBadge() {
  const wishlist = JSON.parse(localStorage.getItem('clicon_wishlist')) || [];
  const count = wishlist.length;
  const badge = document.querySelector('.fa-regular.fa-heart + .badge');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-block' : 'none';
  }
}

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

/* */
// ==================== CART FUNCTIONS ====================

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("clicon_cart")) || [];

    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity++;
        showToast("Quantity Updated 🛒");
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
        showToast("Added to Cart 🛒");
    }

    localStorage.setItem("clicon_cart", JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("clicon_cart")) || [];

    const badge = document.getElementById("cartBadge");

    if (!badge) return;

    const total = cart.reduce((sum, item) => sum + item.quantity, 0);

    badge.textContent = total;

    if (total > 0) {
        badge.style.display = "inline-block";
    } else {
        badge.style.display = "none";
    }
}

