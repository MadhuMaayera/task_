const db = require("../config/db.config");
const User = {
  findByEmail: (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], callback);
  },
  createUser: (user, callback) => {
    const { name, email, password, role_id } = user;
    const sql =
      "INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, password, role_id], callback);
  },
};

module.exports = User;
