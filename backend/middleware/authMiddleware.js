const jwt = require("jsonwebtoken");

const SECRET = "SANIQUE_SECRET";

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json("No token");

  try {
    const data = jwt.verify(token.split(" ")[1], SECRET);
    req.user = data;
    next();
  } catch {
    res.status(401).json("Invalid token");
  }
};