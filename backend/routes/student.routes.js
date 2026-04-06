const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");
const { verifyToken } = require("../middlewares/auth.middleware"); // <-- ADD THIS

// PUT /api/students/profile
// <-- ADD verifyToken HERE
router.put("/profile", verifyToken, studentController.updateProfile);

module.exports = router;
