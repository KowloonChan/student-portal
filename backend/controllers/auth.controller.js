const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      console.warn("Login attempt with missing email or password");
      return res.status(400).json({ message: "Email and password required" });
    }

    // Find the user in the database
    const user = await User.findUserByEmail(email);
    if (!user) {
      console.warn(`Login attempt with non-existent email: ${email}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the typed password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      console.warn(`Login attempt with incorrect password for email: ${email}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a real JWT
    // Using the same secret key from auth.middleware.js
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "2h" },
    );

    // Send the token and user data back to React
    return res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        userId: user.id.toString(),
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
