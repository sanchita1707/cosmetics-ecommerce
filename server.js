const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

// 🔗 MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/cosmetics");

// ================= MODELS =================
const Product = require("./models/Product");
const User = require("./models/User");
const Order = require("./models/Order");

// ================= PRODUCTS =================

// Get all products
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add product (ADMIN)
app.post("/api/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// Delete product (ADMIN)
app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

// ================= USER AUTH =================

// Register (hashed password)
app.post("/api/users/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role: "user",
  });

  await user.save();
  res.json({ message: "User registered successfully" });
});

// Login (JWT)
app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Wrong password" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "secretkey",
    { expiresIn: "1d" }
  );

  res.json({ token, user });
});

// ================= ORDERS =================

// Save order after payment
app.post("/api/orders", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ message: "Order saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 📦 Get all orders (ADMIN DASHBOARD)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ================= SERVER START =================
app.listen(5000, () => {
  console.log("Backend running on port 5000 🚀");
});