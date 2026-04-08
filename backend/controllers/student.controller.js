const User = require("../models/User");
const Document = require("../models/Document");
const path = require("path"); // Extract the file extension (pdf, png, etc.)

exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, contactEmail } = req.body;

    // Get the studentId from the verified token
    const studentId = req.user.userId;

    // Call your database function
    await User.updateProfile(studentId, firstName, lastName, contactEmail);

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};

exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded or invalid file type." });
    }

    const documentType = req.body.documentType || "certification";
    // Using req.body.comment because React frontend sends it as 'comment'
    const comments = req.body.comment || "";

    // Get the studentId from the verified token
    const studentId = req.user.userId;

    // Create the final URL path where the file is stored
    const fileUrl = `/uploads/${req.file.filename}`;

    // Extract the file extension
    const fileType = path
      .extname(req.file.originalname)
      .substring(1)
      .toLowerCase();

    // Call the database function
    await Document.uploadDocument(
      studentId,
      fileUrl,
      fileType,
      documentType,
      comments,
    );

    res.status(201).json({
      message: "Document uploaded successfully and is awaiting review.",
      fileUrl: fileUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error during upload." });
  }
};
