const User = require("../models/User"); // Moved to the very top!

exports.getPendingDocuments = async (req, res) => {
  try {
    // TODO (Person 1): Replace with DB query: const docs = await Document.find({ status: 'pending' }).populate('studentId');

    res.status(200).json([
      {
        documentId: "505",
        studentId: "101",
        studentName: "John Doe",
        documentType: "certification",
        uploadDate: "2026-04-04T14:30:00Z",
        fileUrl: "/uploads/mock_cert.pdf",
        status: "pending",
      },
    ]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching documents" });
  }
};

exports.updateDocumentStatus = async (req, res) => {
  try {
    const { documentId } = req.params;
    const { status, comments } = req.body;

    // TODO (Person 1): Replace with DB update: await Document.findByIdAndUpdate(documentId, { status, adminComments: comments });

    res.status(200).json({
      message: `Document status updated to ${status}.`,
      documentId: documentId,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating document status" });
  }
}; // <-- Notice this bracket! This properly closes updateDocumentStatus before the next one begins.

exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.getAllStudents();

    // Format the database rows to match exactly what the React frontend expects
    const formattedStudents = students.map((student) => ({
      userId: student.id.toString(),
      name: `${student.first_name} ${student.last_name}`,
      email: student.email,
      major: "Computer Science", // Placeholder until you add this column to the DB
      joinDate: "2026-01-01", // Placeholder until you add this column to the DB
    }));

    res.status(200).json(formattedStudents);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching student list" });
  }
};
