const multer = require("multer");
const path = require("path");

// Configure storage and naming
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Security: Limit file size to 5MB and restrict to PDFs/Images
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    if (extname) {
      return cb(null, true);
    }
    cb(new Error("Error: Only PDFs and Images are allowed!"));
  },
}).single("file"); // Matches API contract 'file' field

module.exports = { upload };
