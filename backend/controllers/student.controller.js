exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, contactEmail } = req.body;
    // TODO (Person 3): Get studentId from verified token (req.user.id)

    // TODO (Person 1): Replace with DB update: await User.findByIdAndUpdate(studentId, { firstName, lastName, contactEmail });

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

exports.uploadDocument = async (req, res) => {
  try {
    // 1. Check if Multer rejected the file (wrong size/type)
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded or invalid file type." });
    }

    // 2. Extract the extra text data sent from the React frontend
    const { documentType, comments } = req.body;

    // 3. Get the student ID from the token (Assuming verifyToken sets req.user)
    const studentId = req.user ? req.user.userId : "101";

    // 4. Create the final URL path where the file is stored
    const fileUrl = `/uploads/${req.file.filename}`;

    // TODO (Person 1): Replace with DB insertion:
    // await Document.create({ studentId, documentType, fileUrl, comments, status: 'pending' });

    res.status(201).json({
      message: "Document uploaded successfully and is awaiting review.",
      fileUrl: fileUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error during upload." });
  }
};
