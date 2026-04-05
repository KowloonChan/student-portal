const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

// TODO (Person 3): Add isAdmin role authorization middleware to both of these routes
// Example: router.get('/documents/pending', verifyToken, isAdmin, adminController.getPendingDocuments);

// GET /api/admin/documents/pending
router.get("/documents/pending", adminController.getPendingDocuments);

// PUT /api/admin/documents/:documentId/status
router.put(
  "/documents/:documentId/status",
  adminController.updateDocumentStatus,
);

module.exports = router;
