const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// PLACE ORDER
router.post("/place", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ message: "Order placed successfully ✅", order });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER ORDERS
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;