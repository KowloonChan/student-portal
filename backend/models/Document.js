const db = require("../config/db");

module.exports = {
  uploadDocument: async (studentId, filePath, fileType, documentType) => {
    const result = await db.query(
      `INSERT INTO documents (student_id, file_path, file_type, document_type)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [studentId, filePath, fileType, documentType],
    );
    return result.rows[0];
  },

  getPendingDocuments: async () => {
    const result = await db.query(
      "SELECT * FROM documents WHERE status = 'pending'",
    );
    return result.rows;
  },

  updateDocumentStatus: async (documentId, status) => {
    await db.query("UPDATE documents SET status = $1 WHERE id = $2", [
      status,
      documentId,
    ]);
    return { message: "Status updated" };
  },
};
