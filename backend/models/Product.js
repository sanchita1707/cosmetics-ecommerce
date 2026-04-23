const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  countInStock: Number
});

module.exports = mongoose.model("Product", productSchema);