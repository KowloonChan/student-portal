const express = require("express");
const router = express.Router();
const documentController = require("../controllers/document.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware"); // 1. Removed the { } brackets

// 2. Changed 'upload' to 'upload.single("file")'
// 3. Make sure documentController actually has a function named 'uploadDocument'!
router.post(
  "/upload",
  verifyToken,
  upload.single("file"),
  documentController.uploadDocument,
);

module.exports = router;
