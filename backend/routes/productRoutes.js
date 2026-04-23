const express = require("express");
const Product = require("../models/Product");
const auth = require("../middleware/auth");

const router = express.Router();


// 🟢 GET ALL PRODUCTS (PUBLIC)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});


// 🔵 ADD PRODUCT (ADMIN ONLY)
router.post("/", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Admin only access" });
    }

    const product = await Product.create(req.body);
    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
});


// 🔴 DELETE PRODUCT (ADMIN ONLY)
router.delete("/:id", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Admin only access" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});

module.exports = router;