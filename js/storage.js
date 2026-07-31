function getStorageItem(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function setStorageItem(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function toggleWishlist(productId) {
  let wishlist = getStorageItem('wishlist');
  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter(id => id !== productId);
  } else {
    wishlist.push(productId);
  }
  setStorageItem('wishlist', wishlist);
}

function toggleCompare(productId) {
  let compareList = getStorageItem('compare');
  if (compareList.includes(productId)) {
    compareList = compareList.filter(id => id !== productId);
  } else {
    compareList.push(productId);
  }
  setStorageItem('compare', compareList);
}