const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/role.middleware");

// Notice how middlewares are chained: First verify they are logged in, THEN verify they are an admin
router.get(
  "/documents/pending",
  verifyToken,
  isAdmin,
  adminController.getPendingDocuments,
);

router.put(
  "/documents/:documentId/status",
  verifyToken,
  isAdmin,
  adminController.updateDocumentStatus,
);

router.get("/students", verifyToken, isAdmin, adminController.getAllStudents);

module.exports = router;
