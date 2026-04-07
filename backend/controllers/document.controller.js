// /backend/controllers/document.controller.js

exports.uploadDocument = async (req, res) => {
  try {
    // 1. Check if Multer rejected the file (wrong size/type or missing)
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded or invalid file type." });
    }

    // 2. Extract the extra text data sent from the React frontend
    const documentType = req.body.documentType || "certification";
    const comments = req.body.comment || ""; // Your React app sends this as 'comment'

    // 3. Get the student ID from the token (populated by verifyToken)
    const studentId = req.user ? req.user.userId : "101";

    // 4. Create the final URL path where the file is securely stored on your server
    const fileUrl = `/uploads/${req.file.filename}`;

    // TODO (Person 1): Replace with actual Database insertion:
    // await Document.create({ studentId, documentType, fileUrl, comments, status: 'pending' });

    // 5. Send back the real file data to the React app
    res.status(201).json({
      message: "File uploaded successfully. Pending admin review.",
      document: {
        documentId: Math.floor(Math.random() * 1000).toString(), // Temporary mock ID
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
