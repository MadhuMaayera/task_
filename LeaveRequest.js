const db = require("../config/db.config");

const LeaveRequest = {
  submitLeaveRequest: (leaveRequest, callback) => {
    const { user_id, leave_type, start_date, end_date, reason } = leaveRequest;
    const sql =
      "INSERT INTO leave_requests (user_id, leave_type, start_date, end_date, reason) VALUES (?, ?, ?, ?, ?)";
    db.query(
      sql,
      [user_id, leave_type, start_date, end_date, reason],
      callback
    );
  },
  approveLeaveRequest: (id, status, manager_comment, callback) => {
    const sql =
      "UPDATE leave_requests SET status = ?, manager_comment = ?, approved_at = CURRENT_TIMESTAMP WHERE id = ?";
    db.query(sql, [status, manager_comment, id], callback);
  },
};

module.exports = LeaveRequest;
