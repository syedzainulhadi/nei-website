const express     = require("express");
const router      = express.Router();
const {
  getAll, create, update, pin, remove
} = require("../controllers/nccNssController");
const verifyToken = require("../middleware/authMiddleware");
const upload      = require("../middleware/uploadMiddleware");

router.get("/",          getAll);
router.post("/",         verifyToken, upload.single("image"), create);
router.put("/:id",       verifyToken, upload.single("image"), update);
router.patch("/:id/pin", verifyToken, pin);   // ← PIN route
router.delete("/:id",    verifyToken, remove);

module.exports = router;