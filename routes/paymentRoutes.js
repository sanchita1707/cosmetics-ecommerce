const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_KEY_SECRET",
});

// create order
router.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // paise
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    const order = await razorpay.orders.create(options);
    res.json(order);

  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

module.exports = router;