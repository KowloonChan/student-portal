const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");

// PUT /api/students/profile
router.put("/profile", studentController.updateProfile);

module.exports = router;
