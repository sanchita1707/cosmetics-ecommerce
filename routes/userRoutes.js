const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ SIGNUP (REGISTER USER)
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔥 check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists ❌" });
    }

    // 🔥 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({ message: "User registered successfully ✅" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error ❌" });
  }
});


// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found ❌" });
    }

    // 🔥 compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: "Invalid credentials ❌" });
    }

    // 🔐 create token
    const token = jwt.sign(
      { id: user._id },
      "secretkey123",
      { expiresIn: "1d" }
    );

    res.json({
      user: {
        id: user._id,
        email: user.email,
      },
      token,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error ❌" });
  }
});

module.exports = router;