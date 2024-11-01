const db = require("../config/db.config");

const Role = {
  createRole: (role_name, callback) => {
    const sql = "INSERT INTO roles (role_name) VALUES (?)";
    db.query(sql, [role_name], callback);
  },
};

module.exports = Role;
