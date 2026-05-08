// =====================================================
// middleware/uploadMiddleware.js
// Handles image file uploads using Multer
// =====================================================

const multer = require("multer");
const path = require("path");

// ---- STORAGE CONFIGURATION ----
// Tells multer WHERE and HOW to save files
const storage = multer.diskStorage({
  
  // Save files in the 'uploads' folder
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },

  // Create a unique filename to avoid overwriting
  // Example: 1712345678901-photo.jpg
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
    cb(null, uniqueName);
  }
});

// ---- FILE FILTER ----
// Only allow image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // accept the file
  } else {
    cb(new Error("❌ Only JPEG, PNG, and WEBP images are allowed."), false);
  }
};

// ---- FINAL MULTER SETUP ----
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // max 5MB per image
  }
});

module.exports = upload;