const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// 📊 DASHBOARD STATS
router.get("/stats", async (req, res) => {
  const orders = await Order.find();

  const totalSales = orders.reduce((sum, o) => sum + o.totalPrice, 0);

  res.json({
    totalOrders: orders.length,
    totalSales
  });
});

module.exports = router;