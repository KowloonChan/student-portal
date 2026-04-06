const express = require("express");
const router = express.Router();
const documentController = require("../controllers/document.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { upload } = require("../middlewares/upload.middleware");

// 1. Verify user, 2. Process file with Multer, 3. Run controller logic
router.post("/upload", verifyToken, upload, documentController.uploadDocument);

module.exports = router;
