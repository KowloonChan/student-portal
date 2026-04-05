exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // TODO (Person 1): Replace this with Database query: const user = await User.findOne({ email });
    // TODO (Person 3): Replace this with bcrypt check: await bcrypt.compare(password, user.password);

    // --- MOCK LOGIC START ---
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    if (email === "student@college.edu" && password === "securePassword123") {
      // TODO (Person 3): Generate real JWT here instead of hardcoded string
      return res.status(200).json({
        message: "Login successful",
        token: "mock_jwt_token_12345",
        user: { userId: "101", role: "Student" },
      });
    }

    return res.status(401).json({ message: "Invalid credentials" });
    // --- MOCK LOGIC END ---
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error during login", error: error.message });
  }
};
