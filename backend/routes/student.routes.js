const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");
const { verifyToken } = require("../middlewares/auth.middleware"); // <-- Notice the 's' in middlewares
const upload = require("../middlewares/upload.middleware"); // <-- Notice NO 's' in middleware

// PUT /api/students/profile
router.put("/profile", verifyToken, studentController.updateProfile);

// POST /api/students/documents  <-- NEW UPLOAD ROUTE
// Notice we add upload.single("file") here. "file" matches the frontend form data.
router.post(
  "/documents",
  verifyToken,
  upload.single("file"),
  studentController.uploadDocument,
);

module.exports = router;
