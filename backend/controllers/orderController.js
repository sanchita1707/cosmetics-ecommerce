const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const order = await Order.create({
    userId: req.user.id,
    items: req.body.items,
    totalPrice: req.body.totalPrice,
    status: "Pending"
  });

  res.json(order);
};

exports.getUserOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

exports.updateStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  order.status = req.body.status;
  await order.save();

  res.json(order);
};