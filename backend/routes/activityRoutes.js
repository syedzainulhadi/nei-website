const express     = require("express");
const router      = express.Router();
const {
  getAll, getOne, create, update, pin, remove
} = require("../controllers/activityController");
const verifyToken = require("../middleware/authMiddleware");
const upload      = require("../middleware/uploadMiddleware");

router.get("/",          getAll);
router.get("/:id",       getOne);
router.post("/",         verifyToken, upload.single("image"), create);
router.put("/:id",       verifyToken, upload.single("image"), update);
router.patch("/:id/pin", verifyToken, pin);   // ← PIN route
router.delete("/:id",    verifyToken, remove);

module.exports = router;