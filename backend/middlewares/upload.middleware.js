const multer = require("multer");
const path = require("path");

// Configure storage and naming
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Security: Limit file size to 2MB (to match frontend) and restrict types
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Exactly 2MB
  fileFilter: (req, file, cb) => {
    // It is safer to check both the file extension AND the mimetype
    const filetypes = /pdf|jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Error: Only PDFs and Images are allowed!"));
  },
});

// Export the multer instance directly
module.exports = upload;
