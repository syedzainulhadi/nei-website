const express  = require("express");
const router   = express.Router();
const {
  getAll, create, update, pin, remove
} = require("../controllers/videoController");
const verifyToken = require("../middleware/authMiddleware");
const multer      = require("multer");
const path        = require("path");

const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "-"));
  }
});

const videoUpload = multer({
  storage: videoStorage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["video/mp4", "video/webm", "video/ogg"];
    allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error("Invalid file type"), false);
  }
});

router.get("/",          getAll);
router.post("/",         verifyToken, videoUpload.single("video"), create);
router.put("/:id",       verifyToken, update);
router.patch("/:id/pin", verifyToken, pin);   // ← PIN route
router.delete("/:id",    verifyToken, remove);

module.exports = router;