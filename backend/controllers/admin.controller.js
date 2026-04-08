const User = require("../models/User");
const Document = require("../models/Document");

exports.getPendingDocuments = async (req, res) => {
  try {
    // Fetch the real documents from database
    const docs = await Document.getPendingDocuments();

    // Format the database rows to match exactly what React expects
    const formattedDocs = docs.map((doc) => ({
      documentId: doc.id.toString(),
      studentId: doc.student_id.toString(),
      studentName: `${doc.first_name} ${doc.last_name}`,
      documentType: doc.document_type,
      uploadDate: doc.uploaded_at,
      fileUrl: doc.file_path,
      status: doc.status,
    }));

    res.status(200).json(formattedDocs);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ message: "Error fetching documents" });
  }
};

exports.updateDocumentStatus = async (req, res) => {
  try {
    const { documentId } = req.params;
    const { status, comments } = req.body;

    // Call the database update function with the comments parameter
    await Document.updateDocumentStatus(documentId, status, comments || "");

    res.status(200).json({
      message: `Document status updated to ${status}.`,
      documentId: documentId,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Error updating document status" });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.getAllStudents();

    // Format the database rows to match exactly what React expects
    const formattedStudents = students.map((student) => ({
      userId: student.id.toString(),
      name: `${student.first_name} ${student.last_name}`,
      email: student.email,
      major: "Computer Science", // Placeholder
      joinDate: "2026-01-01", // Placeholder
    }));

    res.status(200).json(formattedStudents);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching student list" });
  }
};
