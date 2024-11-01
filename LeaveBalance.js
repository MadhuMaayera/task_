const db = require("../config/db.config");
const LeaveBalance = {
  getLeaveBalance: (user_id, callback) => {
    const sql = "SELECT * FROM leave_balances WHERE user_id = ?";
    db.query(sql, [user_id], callback);
  },
  updateLeaveBalance: (user_id, balance, callback) => {
    const { vacation_days, sick_days, unpaid_days } = balance;
    const sql =
      "UPDATE leave_balances SET vacation_days = ?, sick_days = ?, unpaid_days = ? WHERE user_id = ?";
    db.query(sql, [vacation_days, sick_days, unpaid_days, user_id], callback);
  },
};

module.exports = LeaveBalance;
