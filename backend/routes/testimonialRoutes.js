// =====================================================
// routes/testimonialRoutes.js
// =====================================================

const express = require("express");
const router = express.Router();
const {
  getAll, create, update, remove
} = require("../controllers/testimonialController");
const verifyToken = require("../middleware/authMiddleware");

// Public
router.get("/", getAll);

// Admin only
router.post("/", verifyToken, create);
router.put("/:id", verifyToken, update);
router.delete("/:id", verifyToken, remove);

module.exports = router;