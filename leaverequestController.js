import LeaveRequest from "../models/LeaveRequest.js";

const addLeaves = async (req, res) => {
  const { leaveType, startDate, endDate, reason } = req.body;

  try {
    const newLeaveRequest = await LeaveRequest.create({
      leaveType,
      startDate,
      endDate,
      reason,
    });

    return res.status(200).json({
      success: true,
      leaveRequest: newLeaveRequest,
    });
  } catch (error) {
    console.error("Error in addLeave:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getLeaves = async (req, res) => {
  try {
    // Fetch all leave requests from the database
    const leaveRequests = await LeaveRequest.findAll();

    if (leaveRequests.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No leave requests found",
      });
    }

    return res.status(200).json({
      success: true,
      leaveRequests,
    });
  } catch (error) {
    console.error("Error in getLeaves:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export { addLeaves, getLeaves };
