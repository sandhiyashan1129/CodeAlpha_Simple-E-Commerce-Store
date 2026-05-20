// Cart State
function getCart() {
  const cart = localStorage.getItem('cartItems');
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cartItems) {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartBadge();
}

function addToCart(item) {
  const cart = getCart();
  const existItem = cart.find(x => x.product === item.product);
  
  if (existItem) {
    const newCart = cart.map(x => x.product === existItem.product ? item : x);
    saveCart(newCart);
  } else {
    saveCart([...cart, item]);
  }
}

function updateCartItem(id, qty) {
  const cart = getCart();
  const newCart = cart.map(x => x.product === id ? { ...x, qty } : x);
  saveCart(newCart);
}

function removeFromCart(id) {
  const cart = getCart();
  const newCart = cart.filter(x => x.product !== id);
  saveCart(newCart);
}

function clearCart() {
  localStorage.removeItem('cartItems');
  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (badge) {
    const cart = getCart();
    const qty = cart.reduce((acc, item) => acc + item.qty, 0);
    badge.textContent = qty;
    if (qty > 0) {
      badge.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
    }
  }
}

// Home Page Products Fetching
async function fetchAndRenderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return; // Not on home page

  try {
    const products = await apiRequest('/products');
    
    if (products.length === 0) {
      grid.innerHTML = '<div class="text-center">No products found.</div>';
      return;
    }

    grid.innerHTML = products.map(p => `
      <div class="card">
        <a href="product.html?id=${p._id}">
          <img src="${p.image}" class="card-img" alt="${p.name}">
        </a>
        <div class="card-body">
          <h3 class="card-title"><a href="product.html?id=${p._id}">${p.name}</a></h3>
          <p class="card-text">${p.description.substring(0, 60)}...</p>
          <div class="card-price">$${p.price.toFixed(2)}</div>
          <a href="product.html?id=${p._id}" class="btn btn-block">View Details</a>
        </div>
      </div>
    `).join('');
    
  } catch (error) {
    const msgDiv = document.getElementById('message-container');
    if (msgDiv) {
      msgDiv.innerHTML = `<div class="alert alert-danger">Error loading products: ${error.message}</div>`;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  fetchAndRenderProducts();
});
