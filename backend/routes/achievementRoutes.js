// =====================================================
// routes/achievementRoutes.js
// =====================================================

const express = require("express");
const router = express.Router();
const {
  getAll, getOne, create, update, remove
} = require("../controllers/achievementController");
const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Public
router.get("/", getAll);
router.get("/:id", getOne);

// Admin only
router.post("/", verifyToken, upload.single("image"), create);
router.put("/:id", verifyToken, upload.single("image"), update);
router.delete("/:id", verifyToken, remove);

module.exports = router;