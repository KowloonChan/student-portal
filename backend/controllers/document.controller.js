exports.uploadDocument = async (req, res) => {
  try {
    // Check if Multer rejected the file (wrong size/type or missing)
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded or invalid file type." });
    }

    // Extract the extra text data sent from React
    const documentType = req.body.documentType || "certification";
    const comments = req.body.comment || "";

    // Get the student ID from the token
    const studentId = req.user ? req.user.userId : "1";

    // Create the final URL path where the file is stored
    const fileUrl = `/uploads/${req.file.filename}`;

    // Send back the file data to React
    res.status(201).json({
      message: "File uploaded successfully. Pending admin review.",
      document: {
        documentId: Math.floor(Math.random() * 1000).toString(),
        fileName: req.file.originalname,
        fileUrl: fileUrl,
        status: "pending",
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Error uploading document" });
  }
};
