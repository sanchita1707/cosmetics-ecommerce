require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// DEBUG ENV (IMPORTANT)
console.log("MONGO_URI:", process.env.MONGO_URI);

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// ROOT ROUTE (to avoid 502 / blank page)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// MONGODB CONNECTION
mongoose.connect("mongodb+srv://sanchita:Ut_AxrQNFJN9HRe@cluster0.x3dwapj.mongodb.net/sanique")
  .then(() => console.log("MongoDB Connected ✔"))
  .catch(err => console.log("Mongo Error ❌", err));

// PORT
const PORT = process.env.PORT || 5000;

// START SERVER (ONLY ONCE)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});