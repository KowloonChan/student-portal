const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

// Security measure: require a valid token to update profile
router.put("/profile", verifyToken, studentController.updateProfile);

// Security measure: require a valid token to upload documents
router.post(
  "/documents",
  verifyToken,
  upload.single("file"),
  studentController.uploadDocument,
);

module.exports = router;
