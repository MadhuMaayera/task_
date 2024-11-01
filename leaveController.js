const db = require("c:/Users/Madhu/Desktop/employee-leave/config/db.config");
exports.submitLeaveRequest = (req, res) => {
  const { user_id, leave_type, start_date, end_date, reason } = req.body;
  const sql =
    "INSERT INTO leave_requests (user_id, leave_type, start_date, end_date, reason) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [user_id, leave_type, start_date, end_date, reason],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(201)
        .json({ message: "Leave request submitted", id: result.insertId });
    }
  );
};

exports.getLeaveRequestsForApproval = (req, res) => {
  const sql = "SELECT * FROM leave_requests WHERE status = 'pending'";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
exports.approveLeaveRequest = (req, res) => {
  const { id } = req.params;
  const { status, manager_comment } = req.body;
  const sql =
    "UPDATE leave_requests SET status = ?, manager_comment = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
  db.query(sql, [status, manager_comment, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: `Leave request ${status} successfully` });
  });
};

exports.getLeaveCalendar = (req, res) => {
  const { startDate, endDate } = req.query;
  const sql = `
    SELECT user_id, start_date, end_date, status
    FROM leave_requests
    WHERE status = 'approved' AND start_date <= ? AND end_date >= ?
  `;

  db.query(sql, [endDate, startDate], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
