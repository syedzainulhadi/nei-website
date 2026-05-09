const express = require("express");
const router = express.Router();

const {
  getAll,
  create,
  update,
  pin,
  remove
} = require("../controllers/videoController");

const verifyToken = require("../middleware/authMiddleware");

// ✅ USE CLOUDINARY MIDDLEWARE
const upload = require("../middleware/uploadMiddleware");

// GET
router.get("/", getAll);

// CREATE
router.post(
  "/",
  verifyToken,
  upload.single("video"),
  create
);

// UPDATE
router.put(
  "/:id",
  verifyToken,
  upload.single("video"),
  update
);

// PIN
router.patch("/:id/pin", verifyToken, pin);

// DELETE
router.delete("/:id", verifyToken, remove);

module.exports = router;