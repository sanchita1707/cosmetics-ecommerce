function addToCart(id, name, price) {
  const token = localStorage.getItem("token");

  // 🔐 AUTH CHECK
  if (!token) {
    alert("Login required!");
    return;
  }

  // 🛒 Get existing cart
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // 🔎 Check if product already exists
  const existingProduct = cart.find(item => item.id === id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id,
      name,
      price,
      quantity: 1
    });
  }

  // 💾 Save updated cart
  localStorage.setItem("cart", JSON.stringify(cart));

  alert(`${name} added to cart 🛒`);
}