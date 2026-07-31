document.addEventListener("DOMContentLoaded", () => {
  initFilters();
  filterProducts();
});

function initFilters() {
  const categories = ["All Products", ...new Set(productsData.map(p => p.category))];
  const brands = [...new Set(productsData.map(p => p.brand))];

  const categoryContainer = document.getElementById("categoryFilter");
  if (categoryContainer) {
    categoryContainer.innerHTML = categories.map((cat, idx) => `
      <div class="form-check">
        <input class="form-check-input" type="radio" name="category" id="cat-${idx}" value="${cat === 'All Products' ? 'all' : cat}" ${idx === 0 ? 'checked' : ''} onchange="filterProducts()">
        <label class="form-check-label fs-7" for="cat-${idx}">${cat}</label>
      </div>
    `).join('');
  }

  const brandContainer = document.getElementById("brandFilter");
  if (brandContainer) {
    brandContainer.innerHTML = brands.map((brand, idx) => `
      <div class="col">
        <div class="form-check">
          <input class="form-check-input brand-checkbox" type="checkbox" id="brand-${idx}" value="${brand}" onchange="filterProducts()">
          <label class="form-check-label fs-7 text-truncate" for="brand-${idx}">${brand}</label>
        </div>
      </div>
    `).join('');
  }
}

function syncPriceInputs() {
  const rangeVal = document.getElementById("priceRange").value;
  document.getElementById("maxPriceInput").value = rangeVal;
  filterProducts();
}

function filterProducts() {
  const searchInput = document.getElementById("searchInput");
  const searchQuery = searchInput ? searchInput.value.toLowerCase() : "";
  
  const selectedCategory = document.querySelector('input[name="category"]:checked')?.value || "all";
  const minPrice = parseFloat(document.getElementById("minPriceInput").value) || 0;
  const maxPrice = parseFloat(document.getElementById("maxPriceInput").value) || 2000;
  const selectedBrands = Array.from(document.querySelectorAll('.brand-checkbox:checked')).map(cb => cb.value);
  const sortOption = document.getElementById("sortSelect").value;

  let filtered = productsData.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery);
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);

    return matchesSearch && matchesCategory && matchesPrice && matchesBrand;
  });

  if (sortOption === "price-low") filtered.sort((a, b) => a.price - b.price);
  if (sortOption === "price-high") filtered.sort((a, b) => b.price - a.price);
  if (sortOption === "rating") filtered.sort((a, b) => b.rating - a.rating);

  const countElem = document.getElementById("resultsCount");
  if (countElem) countElem.innerText = `${filtered.length} Results found`;

  renderActiveTags(selectedCategory, selectedBrands, maxPrice);
  renderProductsGrid(filtered);
}

function renderActiveTags(category, brands, maxPrice) {
  const container = document.getElementById("activeFiltersContainer");
  if (!container) return;

  let tagsHTML = '';

  if (category !== 'all') {
    tagsHTML += `<span class="badge bg-light text-dark border p-2 fw-normal">${category} <i class="bi bi-x ms-1 cursor-pointer" onclick="resetCategory()"></i></span>`;
  }
  brands.forEach(b => {
    tagsHTML += `<span class="badge bg-light text-dark border p-2 fw-normal">${b} <i class="bi bi-x ms-1 cursor-pointer" onclick="uncheckBrand('${b}')"></i></span>`;
  });
  if (maxPrice < 2000) {
    tagsHTML += `<span class="badge bg-light text-dark border p-2 fw-normal">Under $${maxPrice} <i class="bi bi-x ms-1 cursor-pointer" onclick="resetPrice()"></i></span>`;
  }

  container.innerHTML = tagsHTML;
}


function renderProductsGrid(products) {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="bi bi-emoji-frown display-4 text-muted"></i>
        <h5 class="mt-3 fw-bold">No products match your criteria</h5>
        <p class="text-muted fs-7">Try resetting your filters or search terms.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map(p => `
    <div class="col">
      <div class="card h-100 product-card p-2 bg-white position-relative border shadow-sm">
        
        ${p.discount ? `<span class="badge bg-danger position-absolute top-0 start-0 m-2">${p.discount}</span>` : ''}
        
        <div class="position-relative text-center p-2">
          <img src="${p.image}" class="img-fluid" alt="${p.title}" style="height: 160px; object-fit: contain;">
        </div>

        <div class="card-body d-flex flex-column p-2 pt-0">
          <div class="text-warning fs-8 mb-1">
            <i class="bi bi-star-fill"></i> ${p.rating} <span class="text-muted">(${p.reviewsCount})</span>
          </div>
          <a href="#" class="text-decoration-none text-dark">
            <h6 class="card-title text-truncate fs-7 fw-normal mb-2" title="${p.title}">${p.title}</h6>
          </a>
          <div class="mt-auto d-flex align-items-center gap-2">
            <span class="fw-bold text-primary fs-6">$${p.price}</span>
            ${p.oldPrice ? `<del class="text-muted fs-8">$${p.oldPrice}</del>` : ''}
          </div>
        </div>

        <div class="card-footer bg-white border-0 d-flex justify-content-between gap-1 p-2">
          <button onclick="openQuickView(${p.id})" class="btn btn-outline-secondary btn-sm flex-fill" title="Quick View">
            <i class="bi bi-eye"></i> Quick View
          </button>
          <button onclick="handleCompare(${p.id})" class="btn btn-outline-primary btn-sm" title="Compare">
            <i class="bi bi-arrow-left-right"></i>
          </button>
          <button onclick="handleWishlist(${p.id})" class="btn btn-outline-danger btn-sm" title="Wishlist">
            <i class="bi bi-heart"></i>
          </button>
        </div>

      </div>
    </div>
  `).join('');
}

function openQuickView(productId) {
  const p = productsData.find(item => item.id === productId);
  if (!p) return;

  const content = document.getElementById("quickViewContent");
  content.innerHTML = `
    <div class="row g-4 align-items-center">
      <div class="col-md-6 text-center">
        <img src="${p.image}" class="img-fluid" style="max-height: 250px; object-fit: contain;">
      </div>
      <div class="col-md-6">
        <span class="badge bg-light text-dark border mb-2">${p.brand}</span>
        <h5 class="fw-bold mb-2">${p.title}</h5>
        <div class="text-warning fs-7 mb-2"><i class="bi bi-star-fill"></i> ${p.rating} (${p.reviewsCount} reviews)</div>
        <div class="h4 text-primary fw-bold mb-3">$${p.price} ${p.oldPrice ? `<del class="fs-6 text-muted">$${p.oldPrice}</del>` : ''}</div>
        <p class="fs-7 text-muted mb-4">${p.description}</p>
        <div class="d-flex gap-2">
          <button class="btn btn-warning flex-fill fw-bold"><i class="bi bi-cart-plus me-1"></i> ADD TO CART</button>
          <button onclick="handleWishlist(${p.id})" class="btn btn-outline-danger"><i class="bi bi-heart"></i></button>
        </div>
      </div>
    </div>
  `;

  const modal = new bootstrap.Modal(document.getElementById("quickViewModal"));
  modal.show();
}

function resetCategory() {
  const catZero = document.getElementById("cat-0");
  if (catZero) catZero.checked = true;
  filterProducts();
}

function uncheckBrand(brand) {
  const checkboxes = document.querySelectorAll('.brand-checkbox');
  checkboxes.forEach(cb => { if(cb.value === brand) cb.checked = false; });
  filterProducts();
}

function resetPrice() {
  document.getElementById("priceRange").value = 2000;
  document.getElementById("maxPriceInput").value = 2000;
  filterProducts();
}

function handleWishlist(id) {
  toggleWishlist(id);
  alert("Wishlist updated!");
}

function handleCompare(id) {
  toggleCompare(id);
  alert("Compare list updated!");
}
