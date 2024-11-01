const db = require("c:/Users/Madhu/Desktop/employee-leave/config/db.config");
exports.getLeaveBalance = (req, res) => {
  const { user_id } = req.params;
  const sql = "SELECT * FROM leave_balances WHERE user_id = ?";

  db.query(sql, [user_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
};

exports.updateLeaveBalance = (req, res) => {
  const { user_id } = req.params;
  const { vacation_days, sick_days, unpaid_days } = req.body;
  const sql =
    "UPDATE leave_balances SET vacation_days = ?, sick_days = ?, unpaid_days = ? WHERE user_id = ?";

  db.query(
    sql,
    [vacation_days, sick_days, unpaid_days, user_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Leave balance updated successfully" });
    }
  );
};

exports.getLeaveBalance = (req, res) => {
  const { userId } = req;
  const sql = "SELECT * FROM leave_balances WHERE user_id = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
};

exports.updateLeaveBalance = (req, res) => {
  const { userId } = req;
  const { vacation_days, sick_days, unpaid_days } = req.body;
  const sql =
    "UPDATE leave_balances SET vacation_days = ?, sick_days = ?, unpaid_days = ? WHERE user_id = ?";

  db.query(
    sql,
    [vacation_days, sick_days, unpaid_days, userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Leave balance updated successfully" });
    }
  );
};
