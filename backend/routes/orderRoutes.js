const express = require("express");
const Order = require("../models/Order");
const auth = require("../middleware/auth");

const router = express.Router();

// 🟢 CREATE ORDER (CHECKOUT)
router.post("/", auth, async (req, res) => {
  try {
    const order = await Order.create({
      userId: req.user.id,
      items: req.body.items,
      totalPrice: req.body.totalPrice
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Order failed", err });
  }
});

// 🟡 GET USER ORDERS
router.get("/", auth, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
});
// 🚚 UPDATE ORDER STATUS (ADMIN)
router.put("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);

  order.status = req.body.status;
  await order.save();

  res.json(order);
});
module.exports = router;