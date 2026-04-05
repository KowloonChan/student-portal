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
};
