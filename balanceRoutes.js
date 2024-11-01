const express = require("express");
const router = express.Router();
const balanceController = require("../controllers/balanceController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/:user_id", verifyToken, balanceController.getLeaveBalance);
router.put("/:user_id", verifyToken, balanceController.updateLeaveBalance);

module.exports = router;
