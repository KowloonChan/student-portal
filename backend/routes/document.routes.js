const express = require("express");
const router = express.Router();
const documentController = require("../controllers/document.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

// Security measure: require a valid token to upload documents
router.post(
  "/upload",
  verifyToken,
  upload.single("file"),
  documentController.uploadDocument,
);

module.exports = router;
