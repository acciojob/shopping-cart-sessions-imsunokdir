// This is the boilerplate code given for you
// You can modify this code
// Product data

const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
	const cartList = document.getElementById("cart-list");
	cartList.innerHTML=""
	
	const cart = JSON.parse(sessionStorage.getItem('cart'))||[];
	console.log("cart",cart)
	cart.forEach(product=>{
		const li = document.createElement("li");
		li.innerHTML = `${product.name} 
		<button class="remove-btn" onClick="removeFromCart(${product.id})">Remove</buton>`;
		cartList.append(li);
	})
	
}

// Add item to cart
function addToCart(productId) {
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];


  const selectedProduct = products.find(p => p.id == productId);


  cart.push(selectedProduct);

  sessionStorage.setItem('cart', JSON.stringify(cart));

  renderCart();
}


// Remove item from cart
function removeFromCart(productId) {
	let cart = JSON.parse(sessionStorage.getItem('cart'))||[];
	cart = cart.filter((pro)=>pro.id != productId);
	sessionStorage.setItem('cart', JSON.stringify(cart));
	renderCart();
}

// Clear cart
function clearCart() {
	sessionStorage.removeItem('cart');
	renderCart()
}
document.getElementById("clear-cart-btn").addEventListener('click',()=>clearCart())

// Initial render
renderProducts(); 
document.querySelectorAll(".add-to-cart-btn").forEach((product)=>{
	product.addEventListener('click',(event)=>{
		addToCart(event.target.getAttribute('data-id'));
	})
})
renderCart();



















