const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Load cart from session storage or initialize an empty cart
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render products and update cart display
function renderProducts() {
  productList.innerHTML = "";
  products.forEach(product => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  renderCart();
}

function renderCart() {
  cartList.innerHTML = "";
  cart.forEach(product => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price}`;
    cartList.appendChild(li);
  });

  updateCartTotal();
}

function updateCartTotal() {
  const total = cart.reduce((acc, product) => acc + product.price, 0);
  console.log("Total:", total); // For debugging
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

function clearCart() {
  cart = [];
  sessionStorage.removeItem("cart");
  renderCart();
}

// Event listeners
productList.addEventListener("click", event => {
  if (event.target.classList.contains("add-to-cart")) {
    addToCart(parseInt(event.target.dataset.id));
  }
});

clearCartBtn.addEventListener("click", clearCart);

// Initial rendering
renderProducts();