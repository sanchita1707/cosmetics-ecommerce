const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const Order = require("./models/Order");
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
app.use(cors());
app.use(express.json());
app.use("/api/orders", require("./routes/orderRoutes"));
// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
mongoose.connect("mongodb://127.0.0.1:27017/sanique")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));