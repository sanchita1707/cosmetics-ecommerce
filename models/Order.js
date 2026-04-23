const mongoose = require("mongoose");
const Order = require("./models/Order");
const orderSchema = new mongoose.Schema({
  items: Array,
  totalAmount: Number,
  paymentId: String,
  orderId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);