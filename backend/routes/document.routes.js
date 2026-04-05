const express = require("express");
const router = express.Router();
const documentController = require("../controllers/document.controller");

// TODO (Person 3): Add Multer middleware here -> router.post('/upload', upload.single('file'), documentController.uploadDocument);
// POST /api/documents/upload
router.post("/upload", documentController.uploadDocument);

module.exports = router;
