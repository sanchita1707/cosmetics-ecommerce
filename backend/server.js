const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// MONGODB CONNECTION (IMPORTANT)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✔"))
  .catch(err => console.log(err));

// START SERVER (ONLY ONCE)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});