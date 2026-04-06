// /backend/controllers/auth.controller.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import Person 1's DB Model

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      console.warn("Login attempt with missing email or password");
      return res.status(400).json({ message: "Email and password required" });
    }

    // 2. Find the user in the PostgreSQL database
    const user = await User.findUserByEmail(email);
    if (!user) {
      console.warn(`Login attempt with non-existent email: ${email}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Compare the typed password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      console.warn(`Login attempt with incorrect password for email: ${email}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4. Generate a real JWT
    // (Using the same secret key from your auth.middleware.js)
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "2h" },
    );

    // 5. Send the token and user data back to the React frontend
    return res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        userId: user.id.toString(), // Convert numeric ID to string for frontend consistency
        role: user.role,
        name: `${user.first_name} ${user.last_name}`,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res
      .status(500)
      .json({ message: "Server error during login", error: error.message });
  }
};
