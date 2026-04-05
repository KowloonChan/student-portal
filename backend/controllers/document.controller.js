exports.uploadDocument = async (req, res) => {
  try {
    // TODO (Person 3): req.file will be populated by the Multer middleware
    const documentType = req.body.documentType;

    // TODO (Person 1): Save document metadata to DB: await Document.create({ studentId, path: req.file.path, type })

    res.status(201).json({
      message: "File uploaded successfully. Pending admin review.",
      document: {
        documentId: "505",
        fileName: "mock_uploaded_file.pdf",
        status: "pending",
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error uploading document" });
  }
};
