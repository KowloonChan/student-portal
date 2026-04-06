const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Check for token in the Authorization header
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied: No Token Provided" });
  }

  try {
    // Remove 'Bearer ' if present and verify
    const bearerToken = token.split(" ")[1] || token;
    const verified = jwt.verify(
      bearerToken,
      process.env.JWT_SECRET || "your_secret_key",
    );
    req.user = verified; // Store user info (id, role) in the request object
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or Expired Token" });
  }
};

module.exports = { verifyToken };
