let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadCheckout() {
  const box = document.getElementById("orderSummary");
  let total = 0;

  box.innerHTML = "";

  cart.forEach(item => {
    total += item.price * item.quantity;

    box.innerHTML += `
      <p>
        ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}
      </p>
    `;
  });

  document.getElementById("total").innerText = "Total: ₹" + total;
}

async function placeOrder() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Login required!");
    return;
  }

  let total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const res = await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({
      items: cart,
      totalPrice: total
    })
  });

  if (res.ok) {
    alert("Order placed successfully 🎉");

    // clear cart
    localStorage.removeItem("cart");

    window.location.href = "shop.html";
  } else {
    alert("Order failed");
  }
}

loadCheckout();
async function payNow(totalAmount) {
  const res = await fetch("http://localhost:5000/api/payment/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: totalAmount })
  });

  const order = await res.json();

  const options = {
    key: "YOUR_KEY_ID",
    amount: order.amount,
    currency: "INR",
    name: "Sanique Cosmetics",
    order_id: order.id,
    handler: function () {
      alert("Payment Successful 🎉");
      placeOrder(); // save order after payment
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
}