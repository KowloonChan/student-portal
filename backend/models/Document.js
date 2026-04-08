const db = require("../config/db");

module.exports = {
  // Handles the initial upload from the student
  uploadDocument: async (
    studentId,
    filePath,
    fileType,
    documentType,
    comments,
  ) => {
    const result = await db.query(
      `INSERT INTO documents (student_id, file_path, file_type, document_type, admin_comments)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [studentId, filePath, fileType, documentType, comments],
    );
    return result.rows[0];
  },

  // Fetch pending docs FOR THE ADMIN
  getPendingDocuments: async () => {
    const result = await db.query(`
      SELECT d.*, u.first_name, u.last_name 
      FROM documents d
      JOIN users u ON d.student_id = u.id
      WHERE d.status = 'pending'
    `);
    return result.rows;
  },

  // Admin updates the status
  updateDocumentStatus: async (documentId, status, comments) => {
    await db.query(
      "UPDATE documents SET status = $1, admin_comments = $2 WHERE id = $3",
      [status, comments, documentId],
    );
    return { message: "Status and comments updated" };
  },
};
