const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController");
const { verifyToken, isManager } = require("../middleware/authMiddleware");

router.get("/calendar", leaveController.getLeaveCalendar);

router.post("/submit", verifyToken, leaveController.submitLeaveRequest);
router.get(
  "/pending",
  verifyToken,
  isManager,
  leaveController.getLeaveRequestsForApproval
);
router.put(
  "/approve/:id",
  verifyToken,
  isManager,
  leaveController.approveLeaveRequest
);

module.exports = router;
