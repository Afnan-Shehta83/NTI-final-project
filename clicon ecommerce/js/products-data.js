const productsData = [
  {
    id: 1,
    title: "TOZO T6 True Wireless Earbuds Bluetooth Headphones",
    category: "Headphones",
    brand: "TOZO",
    price: 70,
    oldPrice: 99,
    discount: "25% OFF",
    rating: 4.5,
    reviewsCount: 523,
    image: "https://via.placeholder.com/200x160?text=Earbuds",
    description: "Ergonomic design with touch control and wireless charging case."
  },
  {
    id: 2,
    title: "Samsung Electronics Galaxy S21 Ultra 5G",
    category: "SmartPhone",
    brand: "Samsung",
    price: 899,
    oldPrice: 1199,
    discount: "HOT",
    rating: 4.8,
    reviewsCount: 1200,
    image: "https://via.placeholder.com/200x160?text=Galaxy+S21",
    description: "Dynamic AMOLED 2X, 108MP camera, and 8K video recording."
  },
  {
    id: 3,
    title: "Amazon Basics 4K UHD Smart TV 43-Inch",
    category: "TV & Home Appliances",
    brand: "Amazon",
    price: 299,
    oldPrice: 350,
    discount: "14% OFF",
    rating: 4.2,
    reviewsCount: 310,
    image: "https://via.placeholder.com/200x160?text=Smart+TV",
    description: "Crisp 4K Ultra HD resolution with built-in Alexa voice remote."
  },
  {
    id: 4,
    title: "Apple MacBook Pro 16-inch M1 Max",
    category: "Computer & Laptop",
    brand: "Apple",
    price: 1999,
    oldPrice: 2199,
    discount: "BEST SELLER",
    rating: 4.9,
    reviewsCount: 850,
    image: "https://via.placeholder.com/200x160?text=MacBook+Pro",
    description: "Supercharged for pros with M1 Max chip and Liquid Retina XDR display."
  },
  {
    id: 5,
    title: "Sony WH-1000XM4 Wireless Noise Canceling",
    category: "Headphones",
    brand: "Sony",
    price: 348,
    oldPrice: 399,
    discount: "12% OFF",
    rating: 4.7,
    reviewsCount: 940,
    image: "https://via.placeholder.com/200x160?text=Sony+Headphones",
    description: "Industry-leading noise canceling with Dual Noise Sensor technology."
  },
  {
    id: 6,
    title: "Dell XPS 13 Laptop Intel Core i7",
    category: "Computer & Laptop",
    brand: "Dell",
    price: 1250,
    oldPrice: 1400,
    discount: "10% OFF",
    rating: 4.6,
    reviewsCount: 410,
    image: "https://via.placeholder.com/200x160?text=Dell+XPS",
    description: "Stunning InfinityEdge display and 11th Gen Intel Core processing."
  }
];
/* */
:root {
  --c-blue: #1B6392;
  --c-orange: #FA8231;
  --c-dark-footer: #191C1F;
  --c-gray-bg: #F2F4F5;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  color: #191C1F;
}

.fs-7 { font-size: 0.825rem; }
.fs-8 { font-size: 0.75rem; }
.cursor-pointer { cursor: pointer; }

/* NAV & HEADER BLUE */
.top-header-blue, .main-header-blue {
  background-color: var(--c-blue);
}

.text-brand-blue {
  color: var(--c-blue);
}

.bg-light-gray {
  background-color: #F2F4F5;
}

/* Footer Dark */
.footer-dark {
  background-color: var(--c-dark-footer);
}

.btn-dark-store {
  background-color: #1C1F23;
  border-color: #303639;
  transition: all 0.3s ease;
}

.btn-dark-store:hover {
  background-color: #2C2F33;
  border-color: #404649;
  color: #fff;
}

/* Tag Badges Dark */
.tag-badge-dark {
  border: 1px solid #303639;
  padding: 4px 8px;
  border-radius: 2px;
  color: #929FA5;
  font-size: 0.75rem;
  transition: all 0.2s;
  cursor: pointer;
}

.tag-badge-dark:hover,
.tag-badge-dark.active {
  border-color: #fff;
  color: #fff;
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: var(--c-orange);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #e06d1f;
}
const productsData = [
  {
    id: 1,
    slug: "tozo-t6-earbuds",  // 👈 أضيفي دي لكل منتج
    title: "TOZO T6 True Wireless Earbuds Bluetooth Headphones",
    category: "Headphones",
    brand: "TOZO",
    price: 70,
    oldPrice: 99,
    discount: "25% OFF",
    rating: 4.5,
    reviewsCount: 523,
    image: "https://via.placeholder.com/200x160?text=Earbuds",
    description: "Ergonomic design with touch control and wireless charging case."
  },
  {
    id: 2,
    slug: "samsung-galaxy-s21-ultra",  // 👈
    title: "Samsung Electronics Galaxy S21 Ultra 5G",
    category: "SmartPhone",
    brand: "Samsung",
    price: 899,
    oldPrice: 1199,
    discount: "HOT",
    rating: 4.8,
    reviewsCount: 1200,
    image: "https://via.placeholder.com/200x160?text=Galaxy+S21",
    description: "Dynamic AMOLED 2X, 108MP camera, and 8K video recording."
  },
  {
    id: 3,
    slug: "amazon-4k-smart-tv",  // 👈
    title: "Amazon Basics 4K UHD Smart TV 43-Inch",
    category: "TV & Home Appliances",
    brand: "Amazon",
    price: 299,
    oldPrice: 350,
    discount: "14% OFF",
    rating: 4.2,
    reviewsCount: 310,
    image: "https://via.placeholder.com/200x160?text=Smart+TV",
    description: "Crisp 4K Ultra HD resolution with built-in Alexa voice remote."
  },
  {
    id: 4,
    slug: "macbook-pro-m1-max",  // 👈
    title: "Apple MacBook Pro 16-inch M1 Max",
    category: "Computer & Laptop",
    brand: "Apple",
    price: 1999,
    oldPrice: 2199,
    discount: "BEST SELLER",
    rating: 4.9,
    reviewsCount: 850,
    image: "https://via.placeholder.com/200x160?text=MacBook+Pro",
    description: "Supercharged for pros with M1 Max chip and Liquid Retina XDR display."
  },
  {
    id: 5,
    slug: "sony-wh1000xm4",  // 👈
    title: "Sony WH-1000XM4 Wireless Noise Canceling",
    category: "Headphones",
    brand: "Sony",
    price: 348,
    oldPrice: 399,
    discount: "12% OFF",
    rating: 4.7,
    reviewsCount: 940,
    image: "https://via.placeholder.com/200x160?text=Sony+Headphones",
    description: "Industry-leading noise canceling with Dual Noise Sensor technology."
  },
  {
    id: 6,
    slug: "dell-xps-13",  // 👈
    title: "Dell XPS 13 Laptop Intel Core i7",
    category: "Computer & Laptop",
    brand: "Dell",
    price: 1250,
    oldPrice: 1400,
    discount: "10% OFF",
    rating: 4.6,
    reviewsCount: 410,
    image: "https://via.placeholder.com/200x160?text=Dell+XPS",
    description: "Stunning InfinityEdge display and 11th Gen Intel Core processing."
  }
];