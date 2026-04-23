let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 🛒 ADD TO CART
function addToCart(id, name, price) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Login required!");
    return;
  }

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id,
      name,
      price,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
}
// ➖ DECREASE QUANTITY
function decreaseQty(id) {
  const item = cart.find(p => p.id === id);

  if (!item) return;

  item.quantity -= 1;

  if (item.quantity <= 0) {
    cart = cart.filter(p => p.id !== id);
  }

  saveCart();
  renderCart();
}

// ➕ INCREASE QUANTITY
function increaseQty(id) {
  const item = cart.find(p => p.id === id);

  if (item) {
    item.quantity += 1;
  }

  saveCart();
  renderCart();
}

// ❌ REMOVE ITEM
function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}
function renderCart() {
  const container = document.getElementById("cartItems");
  const totalBox = document.getElementById("totalPrice");

  container.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    container.innerHTML += `
      <div style="border:1px solid #ddd; padding:10px; margin:10px;">
        
        <h3>${item.name}</h3>
        <p>Price: ₹${item.price}</p>

        <div>
          <button onclick="decreaseQty('${item.id}')">➖</button>
          <span> ${item.quantity} </span>
          <button onclick="increaseQty('${item.id}')">➕</button>
        </div>

        <p>Subtotal: ₹${item.price * item.quantity}</p>

        <button onclick="removeItem('${item.id}')">❌ Remove</button>
      </div>
    `;
  });

  totalBox.innerText = "Total: ₹" + total;
}
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
// Load cart on page start
renderCart();