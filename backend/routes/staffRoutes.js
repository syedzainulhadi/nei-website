// =====================================================
// routes/staffRoutes.js
// =====================================================

const express = require("express");
const router = express.Router();
const {
  getAll, getOne, create, update, remove
} = require("../controllers/staffController");
const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Public routes
router.get("/", getAll);
router.get("/:id", getOne);

// Protected routes (admin only)
router.post("/", verifyToken, upload.single("image"), create);
router.put("/:id", verifyToken, upload.single("image"), update);
router.delete("/:id", verifyToken, remove);

module.exports = router;