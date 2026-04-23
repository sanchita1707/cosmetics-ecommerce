const API_PRODUCTS = "http://localhost:5000/api/products";
const API_ORDERS = "http://localhost:5000/api/orders/admin/all";

// ---------------- LOAD PRODUCTS ----------------
async function loadProducts() {
  const res = await fetch(API_PRODUCTS);
  const data = await res.json();

  document.getElementById("totalProducts").innerText =
    "Total Products: " + data.length;

  const box = document.getElementById("products");
  box.innerHTML = "";

  data.forEach(p => {
    box.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
      </div>
    `;
  });
}

// ---------------- LOAD ORDERS ----------------
async function loadOrders() {
  const token = localStorage.getItem("token");

  const res = await fetch(API_ORDERS, {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const data = await res.json();

  document.getElementById("totalOrders").innerText =
    "Total Orders: " + data.length;

  const box = document.getElementById("orders");
  box.innerHTML = "";

  data.forEach(o => {
    box.innerHTML += `
      <div class="card">
        <p>Order ID: ${o._id}</p>
        <p>Total: ₹${o.totalPrice}</p>
      </div>
    `;
  });
}
async function loadStats() {
  const res = await fetch("http://localhost:5000/api/admin/stats");
  const data = await res.json();

  document.getElementById("stats").innerHTML = `
    <h3>Total Orders: ${data.totalOrders}</h3>
    <h3>Total Sales: ₹${data.totalSales}</h3>
  `;
}
async function updateStatus(id, status) {
  await fetch("http://localhost:5000/api/orders/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });

  alert("Order updated");
}