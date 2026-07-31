// compare.js

document.addEventListener("DOMContentLoaded", () => {
  renderCompareTable();
});

function renderCompareTable() {
  const container = document.getElementById("compareContainer");
  const compareIds = getCompareList(); // Function from storage.js

  // Filter products that are in the compare list
  const compareProducts = productsData.filter(p => compareIds.includes(p.id));

  // Empty Compare List State
  if (compareProducts.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-arrow-left-right display-1 text-muted"></i>
        <h4 class="mt-3 fw-bold">Your compare list is empty</h4>
        <p class="text-muted">Explore our shop and add products to compare their features.</p>
        <a href="shop.html" class="btn btn-primary px-4 py-2 mt-2 fw-semibold">Go to Shop</a>
      </div>
    `;
    return;
  }

  // Build Table Dynamically
  let tableHTML = `
    <table class="table table-bordered align-middle text-center mb-0">
      <tbody>
        <!-- 1. Product Image, Title, and Remove Action -->
        <tr>
          <th class="bg-light text-start text-uppercase fs-7 text-secondary" style="width: 180px;">Products</th>
          ${compareProducts.map(p => `
            <td style="min-width: 220px;">
              <div class="position-relative pt-3">
                <button onclick="removeFromCompare(${p.id})" class="btn-close position-absolute top-0 end-0 me-1 mt-1" aria-label="Remove"></button>
                <img src="${p.image}" alt="${p.title}" class="img-fluid mb-3" style="max-height: 140px; object-fit: contain;">
                <h6 class="fw-bold text-dark mb-1">${p.title}</h6>
              </div>
            </td>
          `).join('')}
        </tr>

        <!-- 2. Price -->
        <tr>
          <th class="bg-light text-start text-uppercase fs-7 text-secondary">Price</th>
          ${compareProducts.map(p => `
            <td>
              <span class="fs-5 fw-bold text-primary">$${p.price}</span>
              ${p.oldPrice ? `<del class="text-muted ms-2 fs-6">$${p.oldPrice}</del>` : ''}
            </td>
          `).join('')}
        </tr>

        <!-- 3. Rating -->
        <tr>
          <th class="bg-light text-start text-uppercase fs-7 text-secondary">Rating</th>
          ${compareProducts.map(p => `
            <td>
              <span class="text-warning"><i class="bi bi-star-fill"></i> ${p.rating}</span>
              <span class="text-muted fs-7">(${p.reviewsCount.toLocaleString()})</span>
            </td>
          `).join('')}
        </tr>

        <!-- 4. Brand -->
        <tr>
          <th class="bg-light text-start text-uppercase fs-7 text-secondary">Brand</th>
          ${compareProducts.map(p => `<td>${p.brand}</td>`).join('')}
        </tr>

        <!-- 5. Availability -->
        <tr>
          <th class="bg-light text-start text-uppercase fs-7 text-secondary">Availability</th>
          ${compareProducts.map(p => `
            <td>
              <span class="badge ${p.inStock ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'} px-3 py-2">
                ${p.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
              </span>
            </td>
          `).join('')}
        </tr>

        <!-- 6. Specs: Processor -->
        <tr>
          <th class="bg-light text-start text-uppercase fs-7 text-secondary">Processor</th>
          ${compareProducts.map(p => `<td>${p.specs?.processor || 'N/A'}</td>`).join('')}
        </tr>

        <!-- 7. Specs: RAM -->
        <tr>
          <th class="bg-light text-start text-uppercase fs-7 text-secondary">Memory (RAM)</th>
          ${compareProducts.map(p => `<td>${p.specs?.ram || 'N/A'}</td>`).join('')}
        </tr>

        <!-- 8. Action: Add to Cart -->
        <tr>
          <th class="bg-light text-start text-uppercase fs-7 text-secondary">Action</th>
          ${compareProducts.map(p => `
            <td>
              <button class="btn btn-warning w-100 fw-bold text-uppercase py-2">
                <i class="bi bi-cart-plus me-1"></i> Add to Cart
              </button>
            </td>
          `).join('')}
        </tr>
      </tbody>
    </table>
  `;

  container.innerHTML = tableHTML;
}

// Remove item from compare list and re-render
function removeFromCompare(id) {
  toggleCompare(id);
  renderCompareTable();
}